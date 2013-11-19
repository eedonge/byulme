requirejs.config({baseUrl:Cornerstone.App.baseUrl,paths:{jquery:Cornerstone.PATH_LIB+"jquery-1.8.1.min",underscore:Cornerstone.PATH_LIB+"underscore-min",backbone:Cornerstone.PATH_LIB+"backbone-min",handlebars:Cornerstone.PATH_LIB+"handlebars-1.0.0.beta.6",bootstrap:Cornerstone.PATH_LIB+"bootstrap/js/bootstrap.min",lawnchair:Cornerstone.PATH_LIB+"lawnchair-0.6.1.min",hammer:Cornerstone.PATH_LIB+"hammer","jquery.hammer":Cornerstone.PATH_LIB+"jquery.hammer",enquire:Cornerstone.PATH_LIB+"enquire.min",blackbird:Cornerstone.PATH_LIB+"blackbirdjs/blackbird",template:Cornerstone.PATH+"loader/template",style:Cornerstone.PATH+"loader/style",sync:Cornerstone.PATH+"mvc/model/sync","form-view":Cornerstone.PATH+"mvc/view/form","validation-view":Cornerstone.PATH+"mvc/view/validation","gesture-view":Cornerstone.PATH+"mvc/view/gesture","multipage-router":Cornerstone.PATH+"mvc/router/multipage","socket.io":"/socket.io/socket.io",transition:Cornerstone.PATH+"util/transition",device:Cornerstone.PATH+"util/srt-1.0",jsonp:Cornerstone.PATH+"util/jsonp",skt:Cornerstone.PATH+"util/skt",logging:Cornerstone.PATH+"util/logging","widget-plugins":Cornerstone.PATH+"ui/widget-plugins","widget-chart":Cornerstone.PATH+"ui/widget-chart","widget-datatable":Cornerstone.PATH+"ui/widget-datatable","widget-editor":Cornerstone.PATH+"ui/widget-editor","widget-listview":Cornerstone.PATH+"ui/widget-listview","widget-media":Cornerstone.PATH+"ui/widget-media","widget-scrollview":Cornerstone.PATH+"ui/widget-scrollview"},shim:{jquery:{exports:"jQuery",init:function(){return this.jQuery.noConflict(!0)}},underscore:{exports:"_",init:function(){return this._.noConflict()}},backbone:{deps:["underscore","jquery"],exports:"Backbone",init:function(){return this.Backbone.noConflict()}},bootstrap:{deps:["jquery"]},lawnchair:{exports:"Lawnchair"},handlebars:{exports:"Handlebars"},template:{deps:["handlebars"]},"jquery.hammer":{deps:["hammer","jquery"]},enquire:{exports:"enquire"},blackbird:{deps:["style!"+Cornerstone.PATH_LIB+"blackbirdjs/blackbird"],exports:"log"},"socket.io":{exports:"io"},transition:{deps:["jquery"],exports:"Transition"},jsonp:{deps:["jquery"]},skt:{deps:["jquery"]},logging:{deps:["blackbird"]},"gesture-view":{deps:["backbone","jquery.hammer"]},"widget-plugins":{deps:["jquery"]},"widget-editor":{deps:["jquery"]},"widget-media":{deps:["jquery"]},"widget-scrollview":{deps:["jquery"]},"widget-chart":{deps:["backbone"]},"widget-datatable":{deps:["backbone"]},"widget-listview":{deps:["backbone"]}}}),require([Cornerstone.App.mainModule],function(e){e.launch()})
