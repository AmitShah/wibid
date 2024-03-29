/*! URI.js v1.9.1 http://medialize.github.com/URI.js/ */
/* build contains: IPv6.js, URI.js, URITemplate.js, jquery.URI.js */
(function(f,h){"object"===typeof exports?module.exports=h():"function"===typeof define&&define.amd?define(h):f.IPv6=h()})(this,function(){return{best:function(f){f=f.toLowerCase().split(":");var h=f.length,j=8;""===f[0]&&""===f[1]&&""===f[2]?(f.shift(),f.shift()):""===f[0]&&""===f[1]?f.shift():""===f[h-1]&&""===f[h-2]&&f.pop();h=f.length;-1!==f[h-1].indexOf(".")&&(j=7);var c;for(c=0;c<h&&""!==f[c];c++);if(c<j)for(f.splice(c,1,"0000");f.length<j;)f.splice(c,0,"0000");for(c=0;c<j;c++){for(var h=f[c].split(""),
k=0;3>k;k++)if("0"===h[0]&&1<h.length)h.splice(0,1);else break;f[c]=h.join("")}var h=-1,r=k=0,m=-1,b=!1;for(c=0;c<j;c++)b?"0"===f[c]?r+=1:(b=!1,r>k&&(h=m,k=r)):"0"==f[c]&&(b=!0,m=c,r=1);r>k&&(h=m,k=r);1<k&&f.splice(h,k,"");h=f.length;j="";""===f[0]&&(beststr=":");for(c=0;c<h;c++){j+=f[c];if(c===h-1)break;j+=":"}""===f[h-1]&&(j+=":");return j}}});
(function(f,h){"object"===typeof exports?module.exports=h(require("./punycode"),require("./IPv6"),require("./SecondLevelDomains")):"function"===typeof define&&define.amd?define(["./punycode","./IPv6","./SecondLevelDomains"],h):f.URI=h(f.punycode,f.IPv6,f.SecondLevelDomains)})(this,function(f,h,j){function c(a,d){if(!(this instanceof c))return new c(a,d);void 0===a&&(a="undefined"!==typeof location?location.href+"":"");this.href(a);return void 0!==d?this.absoluteTo(d):this}function k(a){return a.replace(/([.*+?^=!:${}()|[\]\/\\])/g,
"\\$1")}function r(a){return"[object Array]"===String(Object.prototype.toString.call(a))}function m(a){return encodeURIComponent(a).replace(/[!'()*]/g,escape).replace(/\*/g,"%2A")}var b=c.prototype,t=Object.prototype.hasOwnProperty;c._parts=function(){return{protocol:null,username:null,password:null,hostname:null,urn:null,port:null,path:null,query:null,fragment:null,duplicateQueryParameters:c.duplicateQueryParameters}};c.duplicateQueryParameters=!1;c.protocol_expression=/^[a-z][a-z0-9-+-]*$/i;c.idn_expression=
/[^a-z0-9\.-]/i;c.punycode_expression=/(xn--)/i;c.ip4_expression=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;c.ip6_expression=/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
c.find_uri_expression=/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))/ig;c.defaultPorts={http:"80",https:"443",ftp:"21",gopher:"70",ws:"80",wss:"443"};c.invalid_hostname_characters=/[^a-zA-Z0-9\.-]/;c.encode=m;c.decode=decodeURIComponent;c.iso8859=function(){c.encode=escape;c.decode=unescape};c.unicode=function(){c.encode=
m;c.decode=decodeURIComponent};c.characters={pathname:{encode:{expression:/%(24|26|2B|2C|3B|3D|3A|40)/ig,map:{"%24":"$","%26":"&","%2B":"+","%2C":",","%3B":";","%3D":"=","%3A":":","%40":"@"}},decode:{expression:/[\/\?#]/g,map:{"/":"%2F","?":"%3F","#":"%23"}}},reserved:{encode:{expression:/%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,map:{"%3A":":","%2F":"/","%3F":"?","%23":"#","%5B":"[","%5D":"]","%40":"@","%21":"!","%24":"$","%26":"&","%27":"'","%28":"(","%29":")","%2A":"*","%2B":"+",
"%2C":",","%3B":";","%3D":"="}}}};c.encodeQuery=function(a){return c.encode(a+"").replace(/%20/g,"+")};c.decodeQuery=function(a){return c.decode((a+"").replace(/\+/g,"%20"))};c.recodePath=function(a){a=(a+"").split("/");for(var d=0,e=a.length;d<e;d++)a[d]=c.encodePathSegment(c.decode(a[d]));return a.join("/")};c.decodePath=function(a){a=(a+"").split("/");for(var d=0,e=a.length;d<e;d++)a[d]=c.decodePathSegment(a[d]);return a.join("/")};var s={encode:"encode",decode:"decode"},g,n=function(a,d){return function(e){return c[d](e+
"").replace(c.characters[a][d].expression,function(e){return c.characters[a][d].map[e]})}};for(g in s)c[g+"PathSegment"]=n("pathname",s[g]);c.encodeReserved=n("reserved","encode");c.parse=function(a,d){var e;d||(d={});e=a.indexOf("#");-1<e&&(d.fragment=a.substring(e+1)||null,a=a.substring(0,e));e=a.indexOf("?");-1<e&&(d.query=a.substring(e+1)||null,a=a.substring(0,e));"//"===a.substring(0,2)?(d.protocol="",a=a.substring(2),a=c.parseAuthority(a,d)):(e=a.indexOf(":"),-1<e&&(d.protocol=a.substring(0,
e),d.protocol&&!d.protocol.match(c.protocol_expression)?d.protocol=void 0:"file"===d.protocol?a=a.substring(e+3):"//"===a.substring(e+1,e+3)?(a=a.substring(e+3),a=c.parseAuthority(a,d)):(a=a.substring(e+1),d.urn=!0)));d.path=a;return d};c.parseHost=function(a,d){var e=a.indexOf("/"),c;-1===e&&(e=a.length);"["===a.charAt(0)?(c=a.indexOf("]"),d.hostname=a.substring(1,c)||null,d.port=a.substring(c+2,e)||null):a.indexOf(":")!==a.lastIndexOf(":")?(d.hostname=a.substring(0,e)||null,d.port=null):(c=a.substring(0,
e).split(":"),d.hostname=c[0]||null,d.port=c[1]||null);d.hostname&&"/"!==a.substring(e).charAt(0)&&(e++,a="/"+a);return a.substring(e)||"/"};c.parseAuthority=function(a,d){a=c.parseUserinfo(a,d);return c.parseHost(a,d)};c.parseUserinfo=function(a,d){var e=a.indexOf("@"),p=a.indexOf("/");-1<e&&(-1===p||e<p)?(p=a.substring(0,e).split(":"),d.username=p[0]?c.decode(p[0]):null,p.shift(),d.password=p[0]?c.decode(p.join(":")):null,a=a.substring(e+1)):(d.username=null,d.password=null);return a};c.parseQuery=
function(a){if(!a)return{};a=a.replace(/&+/g,"&").replace(/^\?*&*|&+$/g,"");if(!a)return{};var d={};a=a.split("&");for(var e=a.length,p,b,g=0;g<e;g++)p=a[g].split("="),b=c.decodeQuery(p.shift()),p=p.length?c.decodeQuery(p.join("=")):null,d[b]?("string"===typeof d[b]&&(d[b]=[d[b]]),d[b].push(p)):d[b]=p;return d};c.build=function(a){var d="";a.protocol&&(d+=a.protocol+":");if(!a.urn&&(d||a.hostname))d+="//";d+=c.buildAuthority(a)||"";"string"===typeof a.path&&("/"!==a.path.charAt(0)&&"string"===typeof a.hostname&&
(d+="/"),d+=a.path);"string"===typeof a.query&&a.query&&(d+="?"+a.query);"string"===typeof a.fragment&&a.fragment&&(d+="#"+a.fragment);return d};c.buildHost=function(a){var d="";if(a.hostname)c.ip6_expression.test(a.hostname)?d=a.port?d+("["+a.hostname+"]:"+a.port):d+a.hostname:(d+=a.hostname,a.port&&(d+=":"+a.port));else return"";return d};c.buildAuthority=function(a){return c.buildUserinfo(a)+c.buildHost(a)};c.buildUserinfo=function(a){var d="";a.username&&(d+=c.encode(a.username),a.password&&(d+=
":"+c.encode(a.password)),d+="@");return d};c.buildQuery=function(a,d){var e="",p,b,g,f;for(b in a)if(t.call(a,b)&&b)if(r(a[b])){p={};g=0;for(f=a[b].length;g<f;g++)void 0!==a[b][g]&&void 0===p[a[b][g]+""]&&(e+="&"+c.buildQueryParameter(b,a[b][g]),!0!==d&&(p[a[b][g]+""]=!0))}else void 0!==a[b]&&(e+="&"+c.buildQueryParameter(b,a[b]));return e.substring(1)};c.buildQueryParameter=function(a,d){return c.encodeQuery(a)+(null!==d?"="+c.encodeQuery(d):"")};c.addQuery=function(a,d,e){if("object"===typeof d)for(var p in d)t.call(d,
p)&&c.addQuery(a,p,d[p]);else if("string"===typeof d)void 0===a[d]?a[d]=e:("string"===typeof a[d]&&(a[d]=[a[d]]),r(e)||(e=[e]),a[d]=a[d].concat(e));else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");};c.removeQuery=function(a,d,e){var p;if(r(d)){e=0;for(p=d.length;e<p;e++)a[d[e]]=void 0}else if("object"===typeof d)for(p in d)t.call(d,p)&&c.removeQuery(a,p,d[p]);else if("string"===typeof d)if(void 0!==e)if(a[d]===e)a[d]=void 0;else{if(r(a[d])){p=a[d];var b={},
g,f;if(r(e)){g=0;for(f=e.length;g<f;g++)b[e[g]]=!0}else b[e]=!0;g=0;for(f=p.length;g<f;g++)void 0!==b[p[g]]&&(p.splice(g,1),f--,g--);a[d]=p}}else a[d]=void 0;else throw new TypeError("URI.addQuery() accepts an object, string as the first parameter");};c.commonPath=function(a,d){var e=Math.min(a.length,d.length),c;for(c=0;c<e;c++)if(a.charAt(c)!==d.charAt(c)){c--;break}if(1>c)return a.charAt(0)===d.charAt(0)&&"/"===a.charAt(0)?"/":"";"/"!==a.charAt(c)&&(c=a.substring(0,c).lastIndexOf("/"));return a.substring(0,
c+1)};c.withinString=function(a,d){return a.replace(c.find_uri_expression,d)};c.ensureValidHostname=function(a){if(a.match(c.invalid_hostname_characters)){if(!f)throw new TypeError("Hostname '"+a+"' contains characters other than [A-Z0-9.-] and Punycode.js is not available");if(f.toASCII(a).match(c.invalid_hostname_characters))throw new TypeError("Hostname '"+a+"' contains characters other than [A-Z0-9.-]");}};b.build=function(a){if(!0===a)this._deferred_build=!0;else if(void 0===a||this._deferred_build)this._string=
c.build(this._parts),this._deferred_build=!1;return this};b.clone=function(){return new c(this)};b.valueOf=b.toString=function(){return this.build(!1)._string};s={protocol:"protocol",username:"username",password:"password",hostname:"hostname",port:"port"};n=function(a){return function(d,e){if(void 0===d)return this._parts[a]||"";this._parts[a]=d;this.build(!e);return this}};for(g in s)b[g]=n(s[g]);s={query:"?",fragment:"#"};n=function(a,d){return function(e,c){if(void 0===e)return this._parts[a]||
"";null!==e&&(e+="",e.charAt(0)===d&&(e=e.substring(1)));this._parts[a]=e;this.build(!c);return this}};for(g in s)b[g]=n(g,s[g]);s={search:["?","query"],hash:["#","fragment"]};n=function(a,d){return function(e,c){var b=this[a](e,c);return"string"===typeof b&&b.length?d+b:b}};for(g in s)b[g]=n(s[g][1],s[g][0]);b.pathname=function(a,d){if(void 0===a||!0===a){var e=this._parts.path||(this._parts.urn?"":"/");return a?c.decodePath(e):e}this._parts.path=a?c.recodePath(a):"/";this.build(!d);return this};
b.path=b.pathname;b.href=function(a,d){var e;if(void 0===a)return this.toString();this._string="";this._parts=c._parts();var b=a instanceof c,g="object"===typeof a&&(a.hostname||a.path);!b&&(g&&void 0!==a.pathname)&&(a=a.toString());if("string"===typeof a)this._parts=c.parse(a,this._parts);else if(b||g)for(e in b=b?a._parts:a,b)t.call(this._parts,e)&&(this._parts[e]=b[e]);else throw new TypeError("invalid input");this.build(!d);return this};b.is=function(a){var d=!1,e=!1,b=!1,g=!1,f=!1,m=!1,n=!1,
h=!this._parts.urn;this._parts.hostname&&(h=!1,e=c.ip4_expression.test(this._parts.hostname),b=c.ip6_expression.test(this._parts.hostname),d=e||b,f=(g=!d)&&j&&j.has(this._parts.hostname),m=g&&c.idn_expression.test(this._parts.hostname),n=g&&c.punycode_expression.test(this._parts.hostname));switch(a.toLowerCase()){case "relative":return h;case "absolute":return!h;case "domain":case "name":return g;case "sld":return f;case "ip":return d;case "ip4":case "ipv4":case "inet4":return e;case "ip6":case "ipv6":case "inet6":return b;
case "idn":return m;case "url":return!this._parts.urn;case "urn":return!!this._parts.urn;case "punycode":return n}return null};var q=b.protocol,l=b.port,v=b.hostname;b.protocol=function(a,d){if(void 0!==a&&a&&(a=a.replace(/:(\/\/)?$/,""),a.match(/[^a-zA-z0-9\.+-]/)))throw new TypeError("Protocol '"+a+"' contains characters other than [A-Z0-9.+-]");return q.call(this,a,d)};b.scheme=b.protocol;b.port=function(a,d){if(this._parts.urn)return void 0===a?"":this;if(void 0!==a&&(0===a&&(a=null),a&&(a+="",
":"===a.charAt(0)&&(a=a.substring(1)),a.match(/[^0-9]/))))throw new TypeError("Port '"+a+"' contains characters other than [0-9]");return l.call(this,a,d)};b.hostname=function(a,d){if(this._parts.urn)return void 0===a?"":this;if(void 0!==a){var e={};c.parseHost(a,e);a=e.hostname}return v.call(this,a,d)};b.host=function(a,d){if(this._parts.urn)return void 0===a?"":this;if(void 0===a)return this._parts.hostname?c.buildHost(this._parts):"";c.parseHost(a,this._parts);this.build(!d);return this};b.authority=
function(a,d){if(this._parts.urn)return void 0===a?"":this;if(void 0===a)return this._parts.hostname?c.buildAuthority(this._parts):"";c.parseAuthority(a,this._parts);this.build(!d);return this};b.userinfo=function(a,d){if(this._parts.urn)return void 0===a?"":this;if(void 0===a){if(!this._parts.username)return"";var e=c.buildUserinfo(this._parts);return e.substring(0,e.length-1)}"@"!==a[a.length-1]&&(a+="@");c.parseUserinfo(a,this._parts);this.build(!d);return this};b.resource=function(a,d){var e;
if(void 0===a)return this.path()+this.search()+this.hash();e=c.parse(a);this._parts.path=e.path;this._parts.query=e.query;this._parts.fragment=e.fragment;this.build(!d);return this};b.subdomain=function(a,d){if(this._parts.urn)return void 0===a?"":this;if(void 0===a){if(!this._parts.hostname||this.is("IP"))return"";var e=this._parts.hostname.length-this.domain().length-1;return this._parts.hostname.substring(0,e)||""}e=this._parts.hostname.length-this.domain().length;e=this._parts.hostname.substring(0,
e);e=RegExp("^"+k(e));a&&"."!==a.charAt(a.length-1)&&(a+=".");a&&c.ensureValidHostname(a);this._parts.hostname=this._parts.hostname.replace(e,a);this.build(!d);return this};b.domain=function(a,d){if(this._parts.urn)return void 0===a?"":this;"boolean"===typeof a&&(d=a,a=void 0);if(void 0===a){if(!this._parts.hostname||this.is("IP"))return"";var e=this._parts.hostname.match(/\./g);if(e&&2>e.length)return this._parts.hostname;e=this._parts.hostname.length-this.tld(d).length-1;e=this._parts.hostname.lastIndexOf(".",
e-1)+1;return this._parts.hostname.substring(e)||""}if(!a)throw new TypeError("cannot set domain empty");c.ensureValidHostname(a);!this._parts.hostname||this.is("IP")?this._parts.hostname=a:(e=RegExp(k(this.domain())+"$"),this._parts.hostname=this._parts.hostname.replace(e,a));this.build(!d);return this};b.tld=function(a,d){if(this._parts.urn)return void 0===a?"":this;"boolean"===typeof a&&(d=a,a=void 0);if(void 0===a){if(!this._parts.hostname||this.is("IP"))return"";var e=this._parts.hostname.lastIndexOf("."),
e=this._parts.hostname.substring(e+1);return!0!==d&&j&&j.list[e.toLowerCase()]?j.get(this._parts.hostname)||e:e}if(a)if(a.match(/[^a-zA-Z0-9-]/))if(j&&j.is(a))e=RegExp(k(this.tld())+"$"),this._parts.hostname=this._parts.hostname.replace(e,a);else throw new TypeError("TLD '"+a+"' contains characters other than [A-Z0-9]");else{if(!this._parts.hostname||this.is("IP"))throw new ReferenceError("cannot set TLD on non-domain host");e=RegExp(k(this.tld())+"$");this._parts.hostname=this._parts.hostname.replace(e,
a)}else throw new TypeError("cannot set TLD empty");this.build(!d);return this};b.directory=function(a,d){if(this._parts.urn)return void 0===a?"":this;if(void 0===a||!0===a){if(!this._parts.path&&!this._parts.hostname)return"";if("/"===this._parts.path)return"/";var e=this._parts.path.length-this.filename().length-1,e=this._parts.path.substring(0,e)||(this._parts.hostname?"/":"");return a?c.decodePath(e):e}e=this._parts.path.length-this.filename().length;e=this._parts.path.substring(0,e);e=RegExp("^"+
k(e));this.is("relative")||(a||(a="/"),"/"!==a.charAt(0)&&(a="/"+a));a&&"/"!==a.charAt(a.length-1)&&(a+="/");a=c.recodePath(a);this._parts.path=this._parts.path.replace(e,a);this.build(!d);return this};b.filename=function(a,d){if(this._parts.urn)return void 0===a?"":this;if(void 0===a||!0===a){if(!this._parts.path||"/"===this._parts.path)return"";var e=this._parts.path.lastIndexOf("/"),e=this._parts.path.substring(e+1);return a?c.decodePathSegment(e):e}e=!1;"/"===a.charAt(0)&&(a=a.substring(1));a.match(/\.?\//)&&
(e=!0);var b=RegExp(k(this.filename())+"$");a=c.recodePath(a);this._parts.path=this._parts.path.replace(b,a);e?this.normalizePath(d):this.build(!d);return this};b.suffix=function(a,d){if(this._parts.urn)return void 0===a?"":this;if(void 0===a||!0===a){if(!this._parts.path||"/"===this._parts.path)return"";var e=this.filename(),b=e.lastIndexOf(".");if(-1===b)return"";e=e.substring(b+1);e=/^[a-z0-9%]+$/i.test(e)?e:"";return a?c.decodePathSegment(e):e}"."===a.charAt(0)&&(a=a.substring(1));if(e=this.suffix())b=
a?RegExp(k(e)+"$"):RegExp(k("."+e)+"$");else{if(!a)return this;this._parts.path+="."+c.recodePath(a)}b&&(a=c.recodePath(a),this._parts.path=this._parts.path.replace(b,a));this.build(!d);return this};b.segment=function(a,d,e){var c=this._parts.urn?":":"/",b=this.path(),g="/"===b.substring(0,1),b=b.split(c);"number"!==typeof a&&(e=d,d=a,a=void 0);if(void 0!==a&&"number"!==typeof a)throw Error("Bad segment '"+a+"', must be 0-based integer");g&&b.shift();0>a&&(a=Math.max(b.length+a,0));if(void 0===d)return void 0===
a?b:b[a];if(null===a||void 0===b[a])if(r(d))b=d;else{if(d||"string"===typeof d&&d.length)""===b[b.length-1]?b[b.length-1]=d:b.push(d)}else d||"string"===typeof d&&d.length?b[a]=d:b.splice(a,1);g&&b.unshift("");return this.path(b.join(c),e)};var u=b.query;b.query=function(a,d){if(!0===a)return c.parseQuery(this._parts.query);if("function"===typeof a){var e=c.parseQuery(this._parts.query),b=a.call(this,e);this._parts.query=c.buildQuery(b||e,this._parts.duplicateQueryParameters);this.build(!d);return this}return void 0!==
a&&"string"!==typeof a?(this._parts.query=c.buildQuery(a,this._parts.duplicateQueryParameters),this.build(!d),this):u.call(this,a,d)};b.setQuery=function(a,d,e){var b=c.parseQuery(this._parts.query);if("object"===typeof a)for(var g in a)t.call(a,g)&&(b[g]=a[g]);else if("string"===typeof a)b[a]=void 0!==d?d:null;else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");this._parts.query=c.buildQuery(b,this._parts.duplicateQueryParameters);"string"!==typeof a&&(e=d);
this.build(!e);return this};b.addQuery=function(a,d,e){var b=c.parseQuery(this._parts.query);c.addQuery(b,a,void 0===d?null:d);this._parts.query=c.buildQuery(b,this._parts.duplicateQueryParameters);"string"!==typeof a&&(e=d);this.build(!e);return this};b.removeQuery=function(a,d,e){var b=c.parseQuery(this._parts.query);c.removeQuery(b,a,d);this._parts.query=c.buildQuery(b,this._parts.duplicateQueryParameters);"string"!==typeof a&&(e=d);this.build(!e);return this};b.setSearch=b.setQuery;b.addSearch=
b.addQuery;b.removeSearch=b.removeQuery;b.normalize=function(){return this._parts.urn?this.normalizeProtocol(!1).normalizeQuery(!1).normalizeFragment(!1).build():this.normalizeProtocol(!1).normalizeHostname(!1).normalizePort(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build()};b.normalizeProtocol=function(a){"string"===typeof this._parts.protocol&&(this._parts.protocol=this._parts.protocol.toLowerCase(),this.build(!a));return this};b.normalizeHostname=function(a){this._parts.hostname&&
(this.is("IDN")&&f?this._parts.hostname=f.toASCII(this._parts.hostname):this.is("IPv6")&&h&&(this._parts.hostname=h.best(this._parts.hostname)),this._parts.hostname=this._parts.hostname.toLowerCase(),this.build(!a));return this};b.normalizePort=function(a){"string"===typeof this._parts.protocol&&this._parts.port===c.defaultPorts[this._parts.protocol]&&(this._parts.port=null,this.build(!a));return this};b.normalizePath=function(a){if(this._parts.urn||!this._parts.path||"/"===this._parts.path)return this;
var d,e,b=this._parts.path,g,f;"/"!==b.charAt(0)&&("."===b.charAt(0)&&(e=b.substring(0,b.indexOf("/"))),d=!0,b="/"+b);for(b=b.replace(/(\/(\.\/)+)|\/{2,}/g,"/");;){g=b.indexOf("/../");if(-1===g)break;else if(0===g){b=b.substring(3);break}f=b.substring(0,g).lastIndexOf("/");-1===f&&(f=g);b=b.substring(0,f)+b.substring(g+3)}d&&this.is("relative")&&(b=e?e+b:b.substring(1));b=c.recodePath(b);this._parts.path=b;this.build(!a);return this};b.normalizePathname=b.normalizePath;b.normalizeQuery=function(a){"string"===
typeof this._parts.query&&(this._parts.query.length?this.query(c.parseQuery(this._parts.query)):this._parts.query=null,this.build(!a));return this};b.normalizeFragment=function(a){this._parts.fragment||(this._parts.fragment=null,this.build(!a));return this};b.normalizeSearch=b.normalizeQuery;b.normalizeHash=b.normalizeFragment;b.iso8859=function(){var a=c.encode,d=c.decode;c.encode=escape;c.decode=decodeURIComponent;this.normalize();c.encode=a;c.decode=d;return this};b.unicode=function(){var a=c.encode,
d=c.decode;c.encode=m;c.decode=unescape;this.normalize();c.encode=a;c.decode=d;return this};b.readable=function(){var a=this.clone();a.username("").password("").normalize();var d="";a._parts.protocol&&(d+=a._parts.protocol+"://");a._parts.hostname&&(a.is("punycode")&&f?(d+=f.toUnicode(a._parts.hostname),a._parts.port&&(d+=":"+a._parts.port)):d+=a.host());a._parts.hostname&&(a._parts.path&&"/"!==a._parts.path.charAt(0))&&(d+="/");d+=a.path(!0);if(a._parts.query){for(var b="",g=0,m=a._parts.query.split("&"),
n=m.length;g<n;g++){var h=(m[g]||"").split("="),b=b+("&"+c.decodeQuery(h[0]).replace(/&/g,"%26"));void 0!==h[1]&&(b+="="+c.decodeQuery(h[1]).replace(/&/g,"%26"))}d+="?"+b.substring(1)}return d+=a.hash()};b.absoluteTo=function(a){var d=this.clone(),b=["protocol","username","password","hostname","port"],g,f;if(this._parts.urn)throw Error("URNs do not have any generally defined hierachical components");if(this._parts.hostname)return d;a instanceof c||(a=new c(a));g=0;for(f;f=b[g];g++)d._parts[f]=a._parts[f];
b=["query","path"];g=0;for(f;f=b[g];g++)!d._parts[f]&&a._parts[f]&&(d._parts[f]=a._parts[f]);"/"!==d.path().charAt(0)&&(a=a.directory(),d._parts.path=(a?a+"/":"")+d._parts.path,d.normalizePath());d.build();return d};b.relativeTo=function(a){var d=this.clone(),b=["protocol","username","password","hostname","port"],g;if(this._parts.urn)throw Error("URNs do not have any generally defined hierachical components");a instanceof c||(a=new c(a));if("/"!==this.path().charAt(0)||"/"!==a.path().charAt(0))throw Error("Cannot calculate common path from non-relative URLs");
g=c.commonPath(d.path(),a.path());if(!g||"/"===g)return d;for(var f=0,m;m=b[f];f++)d._parts[m]=null;a=a.directory();b=this.directory();if(a===b)return d._parts.path="./"+d.filename(),d.build();a.substring(g.length);b=b.substring(g.length);if(a+"/"===g)return b&&(b+="/"),d._parts.path="./"+b+d.filename(),d.build();b="../";g=RegExp("^"+k(g));for(a=a.replace(g,"/").match(/\//g).length-1;a--;)b+="../";d._parts.path=d._parts.path.replace(g,b);return d.build()};b.equals=function(a){var d=this.clone(),b=
new c(a),g={},f={};a={};var m;d.normalize();b.normalize();if(d.toString()===b.toString())return!0;g=d.query();f=b.query();d.query("");b.query("");if(d.toString()!==b.toString()||g.length!==f.length)return!1;g=c.parseQuery(g);f=c.parseQuery(f);for(m in g)if(t.call(g,m)){if(r(g[m])){if(!r(f[m])||g[m].length!==f[m].length)return!1;g[m].sort();f[m].sort();d=0;for(b=g[m].length;d<b;d++)if(g[m][d]!==f[m][d])return!1}else if(g[m]!==f[m])return!1;a[m]=!0}for(m in f)if(t.call(f,m)&&!a[m])return!1;return!0};
b.duplicateQueryParameters=function(a){this._parts.duplicateQueryParameters=!!a;return this};return c});
(function(f,h){"object"===typeof exports?module.exports=h(require("./URI")):"function"===typeof define&&define.amd?define(["./URI"],h):f.URITemplate=h(f.URI)})(this,function(f){function h(c){if(h._cache[c])return h._cache[c];if(!(this instanceof h))return new h(c);this.expression=c;h._cache[c]=this;return this}function j(c){this.data=c;this.cache={}}var c=Object.prototype.hasOwnProperty,k=h.prototype,r={"":{prefix:"",separator:",",named:!1,empty_name_separator:!1,encode:"encode"},"+":{prefix:"",separator:",",
named:!1,empty_name_separator:!1,encode:"encodeReserved"},"#":{prefix:"#",separator:",",named:!1,empty_name_separator:!1,encode:"encodeReserved"},".":{prefix:".",separator:".",named:!1,empty_name_separator:!1,encode:"encode"},"/":{prefix:"/",separator:"/",named:!1,empty_name_separator:!1,encode:"encode"},";":{prefix:";",separator:";",named:!0,empty_name_separator:!1,encode:"encode"},"?":{prefix:"?",separator:"&",named:!0,empty_name_separator:!0,encode:"encode"},"&":{prefix:"&",separator:"&",named:!0,
empty_name_separator:!0,encode:"encode"}};h._cache={};h.EXPRESSION_PATTERN=/\{([^a-zA-Z0-9%_]?)([^\}]+)(\}|$)/g;h.VARIABLE_PATTERN=/^([^*:]+)((\*)|:(\d+))?$/;h.VARIABLE_NAME_PATTERN=/[^a-zA-Z0-9%_]/;h.expand=function(c,b){var f=r[c.operator],s=f.named?"Named":"Unnamed",g=c.variables,n=[],q,l,j;for(j=0;l=g[j];j++)q=b.get(l.name),q.val.length?n.push(h["expand"+s](q,f,l.explode,l.explode&&f.separator||",",l.maxlength,l.name)):q.type&&n.push("");return n.length?f.prefix+n.join(f.separator):""};h.expandNamed=
function(c,b,h,s,g,n){var q="",l=b.encode;b=b.empty_name_separator;var j=!c[l].length,k=2===c.type?"":f[l](n),a,d,e;d=0;for(e=c.val.length;d<e;d++)g?(a=f[l](c.val[d][1].substring(0,g)),2===c.type&&(k=f[l](c.val[d][0].substring(0,g)))):j?(a=f[l](c.val[d][1]),2===c.type?(k=f[l](c.val[d][0]),c[l].push([k,a])):c[l].push([void 0,a])):(a=c[l][d][1],2===c.type&&(k=c[l][d][0])),q&&(q+=s),h?q+=k+(b||a?"=":"")+a:(d||(q+=f[l](n)+(b||a?"=":"")),2===c.type&&(q+=k+","),q+=a);return q};h.expandUnnamed=function(c,
b,h,s,g){var n="",q=b.encode;b=b.empty_name_separator;var l=!c[q].length,j,k,a,d;a=0;for(d=c.val.length;a<d;a++)g?k=f[q](c.val[a][1].substring(0,g)):l?(k=f[q](c.val[a][1]),c[q].push([2===c.type?f[q](c.val[a][0]):void 0,k])):k=c[q][a][1],n&&(n+=s),2===c.type&&(j=g?f[q](c.val[a][0].substring(0,g)):c[q][a][0],n+=j,n=h?n+(b||k?"=":""):n+","),n+=k;return n};k.expand=function(c){var b="";(!this.parts||!this.parts.length)&&this.parse();c instanceof j||(c=new j(c));for(var f=0,k=this.parts.length;f<k;f++)b+=
"string"===typeof this.parts[f]?this.parts[f]:h.expand(this.parts[f],c);return b};k.parse=function(){var c=this.expression,b=h.EXPRESSION_PATTERN,f=h.VARIABLE_PATTERN,k=h.VARIABLE_NAME_PATTERN,g=[],n=0,q,l,j;for(b.lastIndex=0;;){l=b.exec(c);if(null===l){g.push(c.substring(n));break}else g.push(c.substring(n,l.index)),n=l.index+l[0].length;if(r[l[1]]){if(!l[3])throw Error('Unclosed Expression "'+l[0]+'"');}else throw Error('Unknown Operator "'+l[1]+'" in "'+l[0]+'"');q=l[2].split(",");for(var u=0,
a=q.length;u<a;u++){j=q[u].match(f);if(null===j)throw Error('Invalid Variable "'+q[u]+'" in "'+l[0]+'"');if(j[1].match(k))throw Error('Invalid Variable Name "'+j[1]+'" in "'+l[0]+'"');q[u]={name:j[1],explode:!!j[3],maxlength:j[4]&&parseInt(j[4],10)}}if(!q.length)throw Error('Expression Missing Variable(s) "'+l[0]+'"');g.push({expression:l[0],operator:l[1],variables:q})}g.length||g.push(c);this.parts=g;return this};j.prototype.get=function(f){var b=this.data,h={type:0,val:[],encode:[],encodeReserved:[]},
j;if(void 0!==this.cache[f])return this.cache[f];this.cache[f]=h;b="[object Function]"===String(Object.prototype.toString.call(b))?b(f):"[object Function]"===String(Object.prototype.toString.call(b[f]))?b[f](f):b[f];if(!(void 0===b||null===b))if("[object Array]"===String(Object.prototype.toString.call(b))){j=0;for(f=b.length;j<f;j++)void 0!==b[j]&&null!==b[j]&&h.val.push([void 0,String(b[j])]);h.val.length&&(h.type=3)}else if("[object Object]"===String(Object.prototype.toString.call(b))){for(j in b)c.call(b,
j)&&(void 0!==b[j]&&null!==b[j])&&h.val.push([j,String(b[j])]);h.val.length&&(h.type=2)}else h.type=1,h.val.push([void 0,String(b)]);return h};f.expand=function(c,b){var j=(new h(c)).expand(b);return new f(j)};return h});
(function(f,h){"object"===typeof exports?module.exports=h(require("jquery","./URI")):"function"===typeof define&&define.amd?define(["jquery","./URI"],h):h(f.jQuery,f.URI)})(this,function(f,h){function j(c){return c.replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")}function c(c){var b;f.each(["src","href","action"],function(f,h){return h in c?(b=h,!1):!0});return"input"===c.nodeName.toLowerCase()&&"image"!==c.type?void 0:b}function k(b,h){var j,l,k;if(!c(b)||!h)return!1;j=h.match(s);if(!j||!j[5]&&":"!==
j[2]&&!m[j[2]])return!1;k=f(b).uri();if(j[5])return k.is(j[5]);if(":"===j[2])return l=j[1].toLowerCase()+":",!m[l]?!1:m[l](k,j[4]);l=j[1].toLowerCase();return!r[l]?!1:m[j[2]](k[l](),j[4],l)}var r={},m={"=":function(c,b){return c===b},"^=":function(c,b){return!!(c+"").match(RegExp("^"+j(b),"i"))},"$=":function(c,b){return!!(c+"").match(RegExp(j(b)+"$","i"))},"*=":function(c,b,f){"directory"==f&&(c+="/");return!!(c+"").match(RegExp(j(b),"i"))},"equals:":function(c,b){return c.equals(b)},"is:":function(c,
b){return c.is(b)}};f.each("authority directory domain filename fragment hash host hostname href password path pathname port protocol query resource scheme search subdomain suffix tld username".split(" "),function(c,b){r[b]=!0;f.attrHooks["uri:"+b]={get:function(c){return f(c).uri()[b]()},set:function(c,g){f(c).uri()[b](g);return g}}});var b=function(c,b){return f(c).uri().href(b).toString()};f.each(["src","href","action","uri"],function(c,h){f.attrHooks[h]={set:b}});f.attrHooks.uri.get=function(c){return f(c).uri()};
f.fn.uri=function(b){var f=this.first(),j=f.get(0),l=c(j);if(!l)throw Error('Element "'+j.nodeName+'" does not have either property: href, src, action');if(void 0!==b){var k=f.data("uri");if(k)return k.href(b);b instanceof h||(b=h(b))}else{if(b=f.data("uri"))return b;b=h(f.attr(l))}b._dom_element=j;b._dom_attribute=l;b.normalize();f.data("uri",b);return b};h.prototype.build=function(b){if(this._dom_element)this._string=h.build(this._parts),this._deferred_build=!1,this._dom_element.setAttribute(this._dom_attribute,
this._string),this._dom_element[this._dom_attribute]=this._string;else if(!0===b)this._deferred_build=!0;else if(void 0===b||this._deferred_build)this._string=h.build(this._parts),this._deferred_build=!1;return this};var t,s=/^([a-zA-Z]+)\s*([\^\$*]?=|:)\s*(['"]?)(.+)\3|^\s*([a-zA-Z0-9]+)\s*$/;t=f.expr.createPseudo?f.expr.createPseudo(function(b){return function(c){return k(c,b)}}):function(b,c,f){return k(b,f[3])};f.expr[":"].uri=t;return{}});
