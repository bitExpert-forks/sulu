define(["type/default"],function(a){"use strict";var b=function(a,b){App.emit("sulu.preview.update",b,a),App.emit("sulu.content.changed")};return function(c,d){var e={},f={initializeSub:function(){var a="sulu.snippets."+d.instanceName+".data-changed";App.off(a,b),App.on(a,b)},setValue:function(a){var b={ids:[]};$.each(a,function(a,c){b.ids.push(c.uuid)}),App.dom.data(c,"snippets",b)},getValue:function(){return App.dom.data(c,"snippets")},needsValidation:function(){return!1},validate:function(){return!0}};return new a(c,e,d,"snippet",f)}});