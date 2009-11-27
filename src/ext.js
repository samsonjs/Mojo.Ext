Mojo.Ext = {};

(function(){
     var sources = [
	 'mojo-ext/ext/typeof.js',
	 'mojo-ext/ext/pretty-print.js',
	 'mojo-ext/ext/scene-assistant-base.js'
     ];
     for (var i = 0; i < sources.length; ++i) {
	 var script = document.createElement('script');
	 script.type = 'text/javascript';
	 script.src = sources[i];
	 document.getElementsByTagName('head')[0].appendChild(script);	 
     }
})();