<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\SnippetBundle\Snippet;

use Sulu\Bundle\SnippetBundle\Document\SnippetDocument;
use Sulu\Bundle\WebsiteBundle\Resolver\StructureResolverInterface;
use Sulu\Component\Content\Compat\Structure\SnippetBridge;
use Sulu\Component\Content\Mapper\ContentMapperInterface;
use Sulu\Component\DocumentManager\Exception\DocumentNotFoundException;

/**
 * Resolves snippets by UUIDs.
 */
class SnippetResolver implements SnippetResolverInterface
{
    /**
     * @var array
     */
    private $snippetCache = [];

    /**
     * @var ContentMapperInterface
     */
    private $contentMapper;

    /**
     * @var StructureResolverInterface
     */
    private $structureResolver;

    public function __construct(
        ContentMapperInterface $contentMapper,
        StructureResolverInterface $structureResolver
    ) {
        $this->contentMapper = $contentMapper;
        $this->structureResolver = $structureResolver;
    }

    public function resolve($uuids, $webspaceKey, $locale, $shadowLocale = null, $loadExcerpt = false)
    {
        $snippets = [];
        foreach ($uuids as $uuid) {
            if (!\array_key_exists($uuid, $this->snippetCache)) {
                try {
                    $snippet = $this->contentMapper->load($uuid, $webspaceKey, $locale);
                } catch (DocumentNotFoundException $e) {
                    continue;
                }

                if (!$snippet->getHasTranslation() && null !== $shadowLocale) {
                    /** @var SnippetBridge $snippet */
                    $snippet = $this->contentMapper->load($uuid, $webspaceKey, $shadowLocale);
                    /** @var SnippetDocument $document */
                    $document = $snippet->getDocument();
                    $document->setLocale($shadowLocale);
                    $document->setOriginalLocale($locale);
                }

                $snippet->setIsShadow(null !== $shadowLocale);
                $snippet->setShadowBaseLanguage($shadowLocale);

                $resolved = $this->structureResolver->resolve($snippet, $loadExcerpt);
                if ($loadExcerpt) {
                    $resolved['content']['taxonomies'] = [
                        'categories' => $resolved['extension']['excerpt']['categories'],
                        'tags' => $resolved['extension']['excerpt']['tags'],
                    ];
                }
                $resolved['view']['template'] = $snippet->getKey();
                $resolved['view']['uuid'] = $snippet->getUuid();

                $this->snippetCache[$uuid] = $resolved;
            }

            $snippets[] = $this->snippetCache[$uuid];
        }

        return $snippets;
    }
}
