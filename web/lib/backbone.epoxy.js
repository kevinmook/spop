// Backbone.Epoxy 1.0.5
// (c) 2013 Greg MacWilliam
// Freely distributed under the MIT license
// http://epoxyjs.org
(function(t,n){"undefined"!=typeof exports?module.exports=n(require("underscore"),require("backbone")):"function"==typeof define&&define.amd?define(["underscore","backbone"],n):n(t._,t.Backbone)})(this,function(t,n){function e(t){return function(n,e,i){return t.prototype[e].apply(n,i)}}function i(n,e,o,r){for(var s in e)if(e.hasOwnProperty(s)){var u=e[s];if(n.hasComputed(s)){if(r.length&&t.contains(r,s))throw"Recursive setter: "+r.join(" > ");u=n.c()[s].set(u),u&&w(u)&&(o=i(n,u,o,r.concat(s)))}else o[s]=u}return o}function o(n,e,i,o){i=i||{},i.get&&b(i.get)&&(i._get=i.get),i.set&&b(i.set)&&(i._set=i.set),delete i.get,delete i.set,t.extend(this,i),this.model=n,this.name=e,this.deps=this.deps||[],o||this.init()}function r(n){return b(n)?n():(w(n)&&(n=t.clone(n),t.each(n,function(t,e){n[e]=r(t)})),n)}function s(t){return b(t)?{set:t}:t}function u(n){return function(){var e=arguments,i=b(n)?n:n.get,o=n.set;return function(n){return y(n)?i.apply(this,t.map(e,r)):e[0]((o?o:i).call(this,n))}}}function c(n,e,i,o,r){return(n=t.result(n,o))?(C(n)?(r=r?r+"_":"",e["$"+o]=function(){return j&&j.push([n,"change"]),n},t.each(n.toJSON({computed:!0}),function(t,o){e[r+o]=function(t){return a(n,o,t,i)}})):x(n)&&(e["$"+o]=function(){return j&&j.push([n,"reset add remove sort update"]),n}),n):void 0}function a(n,e,i,o){if(j&&j.push([n,"change:"+e]),!y(i)){if(!w(i)||_(i)||t.isDate(i)){var r=i;i={},i[e]=r}return o&&o.save?n.save(i,o):n.set(i,o)}return n.get(e)}function h(t,n){if(":el"===n)return t.$el;var e=t.$(n);return t.$el.is(n)&&(e=e.add(t.$el)),e}function l(n,e,i,o,r,s){try{var u=E[i]||(E[i]=Function("$f","$c","with($f){with($c){return{"+i+"}}}")),c=u(s,o)}catch(a){throw'Error parsing bindings: "'+i+'"\n>> '+a}var h=t.map(t.union(c.events||[],["change"]),function(t){return t+".epoxy"}).join(" ");t.each(c,function(t,i){if(r.hasOwnProperty(i))n.b().push(new p(e,r[i],t,h,o,c));else if(!S.hasOwnProperty(i))throw'binding handler "'+i+'" is not defined.'})}function f(t,n,e){return t&&t.hasOwnProperty(n)?y(e)?r(t[n]):t[n](e):void 0}function d(t,n){var e=[];if(n&&t)for(var i=0,o=n.length;o>i;i++)e.push(n[i]in t?t[n[i]]():null);return e}function p(n,e,i,o,s,u){var c=this,a=n[0].tagName.toLowerCase(),h="input"==a||"select"==a||"textarea"==a||"true"==n.prop("contenteditable"),l=[],f=function(t){c.set(c.$el,r(i),t)};if(c.$el=n,c.evt=o,t.extend(c,e),i=c.init(c.$el,r(i),s,u)||i,j=l,f(),j=null,h&&e.get&&b(i)&&c.$el.on(o,function(t){i(c.get(c.$el,r(i),t))}),l.length)for(var d=0,p=l.length;p>d;d++)c.listenTo(l[d][0],l[d][1],f)}var g,v=n.Epoxy={},m=Array.prototype,y=t.isUndefined,b=t.isFunction,w=t.isObject,_=t.isArray,C=function(t){return t instanceof n.Model},x=function(t){return t instanceof n.Collection},$=function(){},O={mixin:function(t){t=t||{};for(var n in this.prototype)this.prototype.hasOwnProperty(n)&&"constructor"!==n&&(t[n]=this.prototype[n]);return t}},k=e(n.Model),P=["computeds"];v.Model=n.Model.extend({constructor:function(n,e){t.extend(this,t.pick(e||{},P)),k(this,"constructor",arguments),this.initComputeds(n,e)},getCopy:function(n){return t.clone(this.get(n))},get:function(t){return g&&g.push(["change:"+t,this]),this.hasComputed(t)?this.c()[t].get():k(this,"get",arguments)},set:function(t,n,e){var o=t;return o&&!w(o)?(o={},o[t]=n):e=n,e=e||{},e.unset||(o=i(this,o,{},[])),k(this,"set",[o,e])},toJSON:function(n){var e=k(this,"toJSON",arguments);return n&&n.computed&&t.each(this.c(),function(t,n){e[n]=t.value}),e},destroy:function(){return this.clearComputeds(),k(this,"destroy",arguments)},c:function(){return this._c||(this._c={})},initComputeds:function(n){this.clearComputeds();var e=t.result(this,"computeds")||{};e=t.extend(e,t.pick(n||{},t.keys(e))),t.each(e,function(t,n){t._init=1,this.addComputed(n,t)},this),t.invoke(this.c(),"init")},addComputed:function(t,n,e){this.removeComputed(t);var i=n,r=i._init;if(b(n)){var s=2;i={},i._get=n,b(e)&&(i._set=e,s++),i.deps=m.slice.call(arguments,s)}return this.c()[t]=new o(this,t,i,r),this},hasComputed:function(t){return this.c().hasOwnProperty(t)},removeComputed:function(t){return this.hasComputed(t)&&(this.c()[t].dispose(),delete this.c()[t]),this},clearComputeds:function(){for(var t in this.c())this.removeComputed(t);return this},modifyArray:function(t,n,e){var i=this.get(t);if(_(i)&&b(m[n])){var o=m.slice.call(arguments,2),r=m[n].apply(i,o);return e=e||{},e.silent||this.trigger("change:"+t+" change",this,m,e),r}return null},modifyObject:function(t,n,e,i){var o=this.get(t),r=!1;return w(o)?(i=i||{},y(e)&&o.hasOwnProperty(n)?(delete o[n],r=!0):o[n]!==e&&(o[n]=e,r=!0),r&&!i.silent&&this.trigger("change:"+t+" change",this,o,i),o):null}},O),t.extend(o.prototype,n.Events,{init:function(){var n={},e=g=[];this.get(!0),g=null,e.length&&(t.each(e,function(e){var i=e[0],o=e[1];n[i]?t.contains(n[i],o)||n[i].push(o):n[i]=[o]}),t.each(n,function(n,e){for(var i=0,o=n.length;o>i;i++)this.listenTo(n[i],e,t.bind(this.get,this,!0))},this))},val:function(t){return this.model.get(t)},get:function(n){if(n===!0&&this._get){var e=this._get.apply(this.model,t.map(this.deps,this.val,this));this.change(e)}return this.value},set:function(t){if(this._get){if(this._set)return this._set.apply(this.model,arguments);throw"Cannot set read-only computed attribute."}return this.change(t),null},change:function(n){t.isEqual(n,this.value)||(this.value=n,this.model.trigger("change:"+this.name+" change",this.model))},dispose:function(){this.stopListening(),this.off(),this.model=this.value=null}});var B={optionText:"label",optionValue:"value"},E={},F={attr:s(function(t,n){t.attr(n)}),checked:s({get:function(n,e){var i=!!n.prop("checked"),o=n.val();if(this.isRadio(n))return o;if(_(e)){e=e.slice();var r=t.indexOf(e,o);return i&&0>r?e.push(o):!i&&r>-1&&e.splice(r,1),e}return i},set:function(n,e){var i=!!e;this.isRadio(n)?i=e==n.val():_(e)&&(i=t.contains(e,n.val())),n.prop("checked",i)},isRadio:function(t){return"radio"===t.attr("type").toLowerCase()}}),classes:s(function(n,e){t.each(e,function(t,e){n.toggleClass(e,!!t)})}),collection:s({init:function(t,n){if(!x(n)||!b(n.view))throw'Binding "collection" requires a Collection with a "view" constructor.';this.v={}},set:function(n,e,i){var o,r=this.v,s=e.models,u=j;if(j=null,i=i||e,C(i))if(r.hasOwnProperty(i.cid))r[i.cid].remove(),delete r[i.cid];else{r[i.cid]=o=new e.view({model:i});var c=t.indexOf(s,i),a=n.children();a.length>c?a.eq(c).before(o.$el):n.append(o.$el)}else if(x(i)){var h=s.length===t.size(r)&&e.every(function(t){return r.hasOwnProperty(t.cid)});n.children().detach();var l=document.createDocumentFragment();h?e.each(function(t){l.appendChild(r[t.cid].el)}):(this.clean(),e.each(function(t){r[t.cid]=o=new e.view({model:t}),l.appendChild(o.el)})),n.append(l)}j=u},clean:function(){for(var t in this.v)this.v.hasOwnProperty(t)&&(this.v[t].remove(),delete this.v[t])}}),css:s(function(t,n){t.css(n)}),disabled:s(function(t,n){t.prop("disabled",!!n)}),enabled:s(function(t,n){t.prop("disabled",!n)}),html:s(function(t,n){t.html(n)}),options:s({init:function(t,n,e,i){this.e=i.optionsEmpty,this.d=i.optionsDefault,this.v=i.value},set:function(n,e){var i=this,o=r(i.e),s=r(i.d),u=r(i.v),c=x(e)?e.models:e,a=c.length,h=!0,l="";a||s||!o?(s&&(c=[s].concat(c)),t.each(c,function(t){l+=i.opt(t,a)})):(l+=i.opt(o,a),h=!1),n.html(l).prop("disabled",!h).val(u);var f=n.val();i.v&&!t.isEqual(u,f)&&i.v(f)},opt:function(t){var n=t,e=t,i=B.optionText,o=B.optionValue;return w(t)&&(n=C(t)?t.get(i):t[i],e=C(t)?t.get(o):t[o]),['<option value="',e,'">',n,"</option>"].join("")},clean:function(){this.d=this.e=this.v=0}}),template:s({init:function(n,e,i){var o=n.find("script,template");return this.t=t.template(o.length?o.html():n.html()),_(e)?t.pick(i,e):void 0},set:function(t,n){n=C(n)?n.toJSON({computed:!0}):n,t.html(this.t(n))},clean:function(){this.t=null}}),text:s(function(t,n){t.text(n)}),toggle:s(function(t,n){t.toggle(!!n)}),value:s({get:function(t){return t.val()},set:function(t,n){try{t.val()!=n&&t.val(n)}catch(e){}}})},M={all:u(function(){for(var t=arguments,n=0,e=t.length;e>n;n++)if(!t[n])return!1;return!0}),any:u(function(){for(var t=arguments,n=0,e=t.length;e>n;n++)if(t[n])return!0;return!1}),length:u(function(t){return t.length||0}),none:u(function(){for(var t=arguments,n=0,e=t.length;e>n;n++)if(t[n])return!1;return!0}),not:u(function(t){return!t}),format:u(function(t){for(var n=arguments,e=1,i=n.length;i>e;e++)t=t.replace(RegExp("\\$"+e,"g"),n[e]);return t}),select:u(function(t,n,e){return t?n:e}),csv:u({get:function(t){return t+="",t?t.split(","):[]},set:function(t){return _(t)?t.join(","):t}}),integer:u(function(t){return t?parseInt(t,10):0}),decimal:u(function(t){return t?parseFloat(t):0})},S={events:1,optionsDefault:1,optionsEmpty:1};v.binding={allowedParams:S,addHandler:function(t,n){F[t]=s(n)},addFilter:function(t,n){M[t]=u(n)},config:function(n){t.extend(B,n)},emptyCache:function(){E={}}};var j,q=e(n.View),N=["viewModel","bindings","bindingFilters","bindingHandlers","bindingSources","computeds"];return v.View=n.View.extend({constructor:function(n){t.extend(this,t.pick(n||{},N)),q(this,"constructor",arguments),this.applyBindings()},b:function(){return this._b||(this._b=[])},bindings:"data-bind",setterOptions:null,applyBindings:function(){this.removeBindings();var e=this,i=t.clone(t.result(e,"bindingSources")),o=e.bindings,r=e.setterOptions,a=t.clone(F),f=t.clone(M),p=e._c={};t.each(t.result(e,"bindingHandlers")||{},function(t,n){a[n]=s(t)}),t.each(t.result(e,"bindingFilters")||{},function(t,n){f[n]=u(t)}),e.model=c(e,p,r,"model"),e.viewModel=c(e,p,r,"viewModel"),e.collection=c(e,p,r,"collection"),i&&(t.each(i,function(t,n){i[n]=c(i,p,r,n,n)}),e.bindingSources=i),t.each(t.result(e,"computeds")||{},function(t,n){var i=b(t)?t:t.get,o=t.set,r=t.deps;p[n]=function(t){return!y(t)&&o?o.call(e,t):i.apply(e,d(e._c,r))}}),w(o)?t.each(o,function(t,n){var i=h(e,n);i.length&&l(e,i,t,p,a,f)}):h(e,"["+o+"]").each(function(){var t=n.$(this);l(e,t,t.attr(o),p,a,f)})},getBinding:function(t){return f(this._c,t)},setBinding:function(t,n){return f(this._c,t,n)},removeBindings:function(){if(this._c=null,this._b)for(;this._b.length;)this._b.pop().dispose()},remove:function(){this.removeBindings(),q(this,"remove",arguments)}},O),t.extend(p.prototype,n.Events,{init:$,get:$,set:$,clean:$,dispose:function(){this.clean(),this.stopListening(),this.$el.off(this.evt),this.$el=null}}),v});
//@ sourceMappingURL=backbone.epoxy.min.map