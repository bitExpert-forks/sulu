define(["sulumedia/collection/collections","sulumedia/model/collection"],function(a,b){"use strict";var c={visibleItems:6,instanceName:null,url:"",idsParameter:"ids",preselected:{ids:[],displayOption:null,config:{}},idKey:"id",titleKey:"title",thumbnailKey:"thumbnails",thumbnailSize:"50x50",resultKey:"media",positionSelectedClass:"selected",hidePositionElement:!1,defaultDisplayOption:"top",displayOptions:{leftTop:!0,top:!0,rightTop:!0,left:!0,middle:!0,right:!0,leftBottom:!0,bottom:!0,rightBottom:!0},translations:{noMediaSelected:"media-selection.nomedia-selected",addImages:"media-selection.add-images",choose:"public.choose",collections:"media-selection.collections",visible:"public.visible",of:"public.of",upload:"media-selection.upload-new",collection:"media-selection.upload-to-collection",createNewCollection:"media-selection.create-new-collection",newCollection:"media-selection.new-collection",viewall:"public.view-all",viewless:"public.view-less"}},d={ids:[],displayOption:null,config:{}},e={lastVisitedCollectionKey:"last-visited-collection"},f="sulu.media-selection.",g=function(){return m.call(this,"input-retrieved")},h=function(){return m.call(this,"data-changed")},i=function(){return m.call(this,"data-request")},j=function(){return m.call(this,"data-retrieved")},k=function(){return m.call(this,"record-selected")},l=function(){return m.call(this,"record-deselected")},m=function(a){return f+(this.options.instanceName?this.options.instanceName+".":"")+a},n={skeleton:function(a,b){return['<div class="white-box form-element" id="',a.ids.container,'">','   <div class="header">','       <span class="fa-plus-circle icon left action" id="',a.ids.addButton,'"></span>','       <div class="position ',b,'">','<div class="husky-position" id="',a.ids.displayOption,'">','    <div class="top left ',a.displayOptions.leftTop?"":"inactive",'" data-position="leftTop"></div>','    <div class="top middle ',a.displayOptions.top?"":"inactive",'" data-position="top"></div>','    <div class="top right ',a.displayOptions.rightTop?"":"inactive",'" data-position="rightTop"></div>','    <div class="middle left ',a.displayOptions.left?"":"inactive",'" data-position="left"></div>','    <div class="middle middle ',a.displayOptions.middle?"":"inactive",'" data-position="middle"></div>','    <div class="middle right ',a.displayOptions.right?"":"inactive",'" data-position="right"></div>','    <div class="bottom left ',a.displayOptions.leftBottom?"":"inactive",'" data-position="leftBottom"></div>','    <div class="bottom middle ',a.displayOptions.bottom?"":"inactive",'" data-position="bottom"></div>','    <div class="bottom right ',a.displayOptions.rightBottom?"":"inactive",'" data-position="rightBottom"></div>',"</div>","       </div>",'       <span class="fa-cog icon right border" id="',a.ids.configButton,'" style="display:none"></span>',"   </div>",'   <div class="content" id="',a.ids.content,'"></div>',"</div>"].join("")},noContent:function(a){return['<div class="no-content">','   <span class="fa-coffee icon"></span>','   <div class="text">',a,"</div>","</div>"].join("")},addTab:function(a,b){return['<div id="',a.ids.chooseTab,'">','   <div class="heading">',"       <h3>",b,"</h3>","   </div>",'   <div id="',a.ids.gridGroup,'"/>','   <div class="overlay-loader" id="',a.ids.loader,'"></div>',"</div>"].join("")},uploadTab:function(a,b){return['<div id="',a.ids.uploadTab,'">','   <div class="grid-row">',"       <label>",b,"</label>",'       <div id="',a.ids.collectionSelect,'"></div>',"   </div>",'   <div class="grid-row">','       <div id="',a.ids.dropzone,'"></div>',"   </div>","</div>"].join("")},contentItem:function(a,b,c,d){return['<li data-id="',a,'">','   <span class="num">',b,"</span>",'   <img src="',d,'"/>','   <span class="value">',c,"</span>",'   <span class="fa-times remove"></span>',"</li>"].join("")}},o=function(a){return"#"+this.options.ids[a]},p=function(){if(this.collections=new a,this.newCollection=new b,this.collectionArray=null,this.newCollectionId=null,this.gridGroupDeprecated=!1,this.viewAll=!1,this.options.ids={container:"media-selection-"+this.options.instanceName+"-container",addButton:"media-selection-"+this.options.instanceName+"-add",configButton:"media-selection-"+this.options.instanceName+"-config",displayOption:"media-selection-"+this.options.instanceName+"-display-option",content:"media-selection-"+this.options.instanceName+"-content",chooseTab:"media-selection-"+this.options.instanceName+"-choose-tab",uploadTab:"media-selection-"+this.options.instanceName+"-upload-tab",gridGroup:"media-selection-"+this.options.instanceName+"-grid-group",loader:"media-selection-"+this.options.instanceName+"-loader",collectionSelect:"media-selection-"+this.options.instanceName+"-collection-select",dropzone:"media-selection-"+this.options.instanceName+"-dropzone"},this.options.hidePositionElement?this.sandbox.dom.html(this.$el,n.skeleton(this.options,"hidden")):this.sandbox.dom.html(this.$el,n.skeleton(this.options,"")),this.$container=this.sandbox.dom.find(o.call(this,"container"),this.$el),this.$content=this.sandbox.dom.find(o.call(this,"content"),this.$el),this.$addButton=this.sandbox.dom.find(o.call(this,"addButton"),this.$el),this.$configButton=this.sandbox.dom.find(o.call(this,"configButton"),this.$el),this.sandbox.dom.data(this.$el,"media-selection")){var c=this.sandbox.util.extend(!0,{},d,this.sandbox.dom.data(this.$el,"media-selection"));N.call(this,c)}else this.options.preselected.displayOption=this.options.defaultDisplayOption,N.call(this,this.options.preselected);q.call(this),t.call(this),this.itemsVisible=this.options.visibleItems,this.uploadCollection=null,this.URI={str:"",hasChanged:!1},O.call(this),Q.call(this),H.call(this),L.call(this),C.call(this)},q=function(){var a=this.sandbox.translate(this.options.translations.noMediaSelected);this.sandbox.dom.html(this.$content,n.noContent(a))},r=function(){var a=this.$find(o.call(this,"loader"));a.length&&this.sandbox.start([{name:"loader@husky",options:{el:a,size:"100px",color:"#cccccc"}}])},s=function(){this.sandbox.stop(o.call(this,"loader"))},t=function(){this.sandbox.on("husky.tabs.overlaymedia-selection."+this.options.instanceName+".add.initialized",function(){r.call(this),this.collections.fetchSorted("title",{success:function(a){this.collectionArray=a.toJSON(),s.call(this),w.call(this),x.call(this),y.call(this)}.bind(this)})}.bind(this)),this.sandbox.on("husky.overlay.media-selection."+this.options.instanceName+".add.opened",function(){this.gridGroupDeprecated===!0&&(v.call(this),this.gridGroupDeprecated=!1)}.bind(this)),this.sandbox.on(g.call(this),function(){O.call(this),L.call(this)}.bind(this)),this.sandbox.on(j.call(this),function(){F.call(this)}.bind(this)),this.sandbox.on("sulu.grid-group."+this.options.instanceName+".height-changed",function(){this.sandbox.emit("husky.overlay.media-selection."+this.options.instanceName+".add.set-position")}.bind(this)),this.sandbox.on("sulu.grid-group."+this.options.instanceName+".initialized",function(){this.sandbox.emit("husky.overlay.media-selection."+this.options.instanceName+".add.set-position")}.bind(this)),this.sandbox.on("husky.select.media-selection-"+this.options.instanceName+".selected.item",u.bind(this)),this.sandbox.on("husky.dropzone.media-selection-"+this.options.instanceName+".files-added",B.bind(this)),this.sandbox.on("sulu.grid-group."+this.options.instanceName+".record-selected",function(a){this.sandbox.emit(k.call(this),a)}.bind(this)),this.sandbox.on("sulu.grid-group."+this.options.instanceName+".record-deselected",function(a){this.sandbox.emit(l.call(this),a)}.bind(this))},u=function(a){this.uploadCollection=a,this.sandbox.emit("husky.dropzone.media-selection-"+this.options.instanceName+".change-url","/admin/api/media?collection="+a)},v=function(){this.sandbox.emit("sulu.grid-group."+this.options.instanceName+".reload",{data:this.collectionArray,preselected:this.data.ids})},w=function(){var a,b={};""!=this.options.types?(a="filterByTypes",b={types:this.options.types}):a="all",this.sandbox.start([{name:"grid-group@suluadmin",options:{data:this.collectionArray,el:this.sandbox.dom.find(o.call(this,"gridGroup")),instanceName:this.options.instanceName,gridUrl:a,urlParameter:b,preselected:this.data.ids,resultKey:this.options.resultKey,dataGridOptions:{view:"table",viewOptions:{table:{excludeFields:["id"],showHead:!1,cssClass:"minimal"}},pagination:!1,matchings:[{name:"id"},{name:"thumbnails",translation:"thumbnails",type:"thumbnails"},{name:"title",translation:"title"}]}}}])},x=function(){var a=this.sandbox.util.extend([],!0,this.collectionArray),b=this.sandbox.sulu.getUserSetting(e.lastVisitedCollectionKey)||"new";a.unshift({id:"new",title:this.sandbox.translate(this.options.translations.createNewCollection)}),u.call(this,b),this.sandbox.start([{name:"select@husky",options:{el:o.call(this,"collectionSelect"),instanceName:"media-selection-"+this.options.instanceName,valueName:"title",data:a,preSelectedElements:[b]}}])},y=function(){this.sandbox.start([{name:"dropzone@husky",options:{el:o.call(this,"dropzone"),url:"/admin/api/media?collection="+this.uploadCollection,method:"POST",paramName:"fileVersion",showOverlay:!1,instanceName:"media-selection-"+this.options.instanceName,afterDropCallback:z.bind(this),keepFilesAfterSuccess:!0}}])},z=function(){var a=this.sandbox.data.deferred();return"new"===this.uploadCollection?this.newCollectionId?(this.uploadCollection=this.newCollectionId,u.call(this,this.uploadCollection),a.resolve()):(this.newCollection.set({title:A.call(this)}),this.newCollection.save(null,{success:function(b){b=b.toJSON(),this.newCollectionId=b.id,u.call(this,b.id),this.collectionArray.push(b),a.resolve()}.bind(this),error:function(){this.sandbox.logger.log("Error while saving collection")}.bind(this)})):a.resolve(),a.promise()},A=function(){var a=this.sandbox.translate(this.options.translations.newCollection),b=0;return this.sandbox.util.foreach(this.collectionArray,function(c){-1!==c.title.indexOf(a)&&b++}.bind(this)),b>0&&(a=a+" ("+b+")"),a},B=function(a){a.length&&(this.sandbox.util.foreach(a,function(a){this.data.ids.push(a.id)}.bind(this)),this.sandbox.emit("sulu.labels.success.show","labels.success.media-upload-desc","labels.success"),v.call(this))},C=function(){this.sandbox.dom.on(o.call(this,"displayOption")+" > div:not(.inactive)","click",P.bind(this)),this.sandbox.dom.on(o.call(this,"content"),"click",D.bind(this),"li .remove"),this.sandbox.dom.on(this.$el,"click",function(){this.viewAll=!0,F.call(this)}.bind(this),".view-all"),this.sandbox.dom.on(this.$el,"click",function(){this.viewAll=!1,F.call(this)}.bind(this),".view-less")},D=function(a){var b=this.sandbox.dom.parents(a.currentTarget,"li"),c=this.sandbox.dom.data(b,"id");this.sandbox.dom.remove(b),E.call(this,c),this.data.ids.splice(this.data.ids.indexOf(c),1),this.itemsVisible--,K.call(this),0===this.items.length?q.call(this):G.call(this),this.gridGroupDeprecated=!0,this.sandbox.emit(h.call(this),this.data,this.$el),this.sandbox.emit(l.call(this),c)},E=function(a){for(var b=-1,c=this.items.length;++b<c;)if(this.items[b].id===a)return this.items.splice(b,1),!0;return!1},F=function(){if(this.itemsVisible=this.viewAll===!0?this.items.length:this.items.length<this.options.visibleItems?this.items.length:this.options.visibleItems,0!==this.items.length){for(var a,b=this.sandbox.dom.createElement('<ul class="items-list"/>'),c=-1,d=this.items.length;++c<d&&c<this.itemsVisible;)a=this.items[c][this.options.thumbnailKey][this.options.thumbnailSize],this.sandbox.dom.append(b,n.contentItem(this.items[c][this.options.idKey],c+1,this.items[c][this.options.titleKey],a));this.sandbox.dom.html(this.$content,b),G.call(this)}else q.call(this),K.call(this)},G=function(){(null===this.$footer||void 0===this.$footer)&&(this.$footer=this.sandbox.dom.createElement('<div class="footer"/>')),this.sandbox.dom.html(this.$footer,["<span>","<strong>"+this.itemsVisible+" </strong>",this.sandbox.translate(this.options.translations.of)," ","<strong>"+this.items.length+" </strong>",this.sandbox.translate(this.options.translations.visible),"</span>"].join("")),this.itemsVisible<this.items.length?this.sandbox.dom.append(this.sandbox.dom.find("span",this.$footer),'<strong class="view-all pointer"> ('+this.sandbox.translate(this.options.translations.viewall)+")</strong>"):this.itemsVisible>this.options.visibleItems&&this.sandbox.dom.append(this.sandbox.dom.find("span",this.$footer),'<strong class="view-less pointer"> ('+this.sandbox.translate(this.options.translations.viewless)+")</strong>"),this.sandbox.dom.append(this.$container,this.$footer)},H=function(){var a=n.addTab(this.options,this.sandbox.translate(this.options.translations.collections)),b=n.uploadTab(this.options,this.sandbox.translate(this.options.translations.collection)),c=this.sandbox.dom.createElement("<div/>");this.sandbox.dom.append(this.$el,c),this.sandbox.start([{name:"overlay@husky",options:{triggerEl:this.$addButton,cssClass:"media-selection-overlay",el:c,removeOnClose:!1,container:this.$el,draggable:!1,instanceName:"media-selection."+this.options.instanceName+".add",skin:"medium",slides:[{title:this.sandbox.translate(this.options.translations.addImages),okCallback:I.bind(this),cssClass:"media-selection-overlay-add",tabs:[{title:this.sandbox.translate(this.options.translations.choose),data:a},{title:this.sandbox.translate(this.options.translations.upload),data:b}]}]}}])},I=function(){var a=this.sandbox.data.deferred();this.sandbox.emit("sulu.grid-group."+this.options.instanceName+".get-selected-ids",function(b){N.call(this,{ids:b}),a.resolve()}.bind(this)),a.then(function(){this.sandbox.emit(g.call(this))}.bind(this))},J=function(){K.call(this);var a=this.sandbox.dom.createElement('<div class="loader"/>');this.sandbox.dom.html(this.$content,a),this.sandbox.start([{name:"loader@husky",options:{el:a,size:"100px",color:"#e4e4e4"}}])},K=function(){null!==this.$footer&&this.sandbox.dom.remove(this.$footer)},L=function(){this.URI.hasChanged===!0&&(this.sandbox.emit(i.call(this)),J.call(this),this.itemsVisible=this.options.visibleItems,this.data.ids.length>0?this.sandbox.util.load(this.URI.str).then(function(a){M.call(this,a._embedded[this.options.resultKey])}.bind(this)).then(function(a){this.sandbox.logger.log(a)}.bind(this)):M.call(this,[]))},M=function(a){this.items=a,this.sandbox.emit(j.call(this))},N=function(a){for(var b in a)a.hasOwnProperty(b)&&(this.data[b]=a[b]);this.sandbox.dom.data(this.$el,"media-selection",this.data)},O=function(){var a=-1===this.options.url.indexOf("?")?"?":"&",b=[this.options.url,a,this.options.idsParameter,"=",(this.data.ids||[]).join(",")].join("");b!==this.URI.str?(""!==this.URI.str&&this.sandbox.emit(h.call(this),this.data,this.$el),this.URI.str=b,this.URI.hasChanged=!0):this.URI.hasChanged=!1},P=function(a){this.sandbox.dom.removeClass(this.sandbox.dom.find("."+this.options.positionSelectedClass,o.call(this,"displayOption")),this.options.positionSelectedClass),this.sandbox.dom.addClass(a.currentTarget,this.options.positionSelectedClass),N.call(this,{displayOption:this.sandbox.dom.data(a.currentTarget,"position")}),this.sandbox.emit(h.call(this),this.data,this.$el)},Q=function(){var a=this.$find(o.call(this,"displayOption")),b=this.sandbox.dom.find('[data-position="'+this.data.displayOption+'"]',a);b.length&&this.sandbox.dom.addClass(b,this.options.positionSelectedClass)};return{historyClosed:!0,initialize:function(){this.options=this.sandbox.util.extend({},c,this.options),this.data={},p.call(this)}}});