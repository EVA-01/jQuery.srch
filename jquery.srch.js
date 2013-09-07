jQuery.srch=function(options) {
 if(!options.selector || !options) {
  console.error('jQuery.srch doesn\'t have a registered selector');
 } else {
  options=$.extend({selector:"", not:"", hit:null, nohit:null, partialhit:null, reset:null}, options);
  ret=function(search) {
   search=search.split(' ');
   removet=[];
   jQuery.each(search, function(i) {
	if(this=="") {
	 removet.push(i);
	}
   });
   removet.reverse();
   jQuery.each(removet, function() {
	search.splice(this, 1);
   });
   if(search.length!=0) {
	options=this.options;
	hits=[];
	partials=[];
	nohits=[];
    jQuery(options.selector).not(options.not).each(function() {
	 elem=this;
     hasItAll=0;
	 hasWhat=[];
     jQuery.each(search, function() {
	  var escaped = ''
      for (var i = 0; i < this.length; ++i) {
       var hex = this.charCodeAt(i).toString(16).toUpperCase();
       escaped += "\\u" + "0000".substr(hex.length) + hex;
      }
      if(new RegExp(escaped, 'i').test(jQuery(elem).text())) {
       hasItAll++;
	   hasWhat.push(this);
      }
     });
	 if(hasItAll==0) {
	  nohits.push(this);
	  if(options.nohit!=null) {
	   options.nohit(jQuery(elem), hasWhat, search.join(' '));
	  }
	 } else if(hasItAll!=search.length && 0<hasItAll<search.length) {
	  partials.push(this);
	  if(options.partialhit!=null) {
	   options.partialhit(jQuery(elem), hasWhat, search.join(' '));
	  } else if(options.partialhit==null && options.nohit!=null) {
	   options.nohit(jQuery(elem), hasWhat, search.join(' '));
	  }
	 } else if(hasItAll==search.length) {
	  hits.push(this);
	  if(options.hit!=null) {
	   options.hit(jQuery(elem), hasWhat, search.join(' '));
	  } else if(options.hit==null && options.partialhit!=null) {
	   options.partialhit(jQuery(elem), hasWhat, search.join(' '));
	  }
	 }
    });
	return {hits:hits, partials:partials, nohits:nohits};
   } else if(search.length==0) {
    if(this.options.reset!=null) {
     this.options.reset(jQuery(options.selector).not(options.not), search);
	 return false;
	}
   }
  }
  return {search:ret, options:options};
 }
}
