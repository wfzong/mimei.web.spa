webpackJsonp([3],{EZvQ:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("mvlf"),s=n.n(r),a=n("rlGY"),o=n("VU/8"),u=o(s.a,a.a,null,null,null);t.default=u.exports},mvlf:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=n("lGBk"),a=function(e){return e&&e.__esModule?e:{default:e}}(s),o=n("NYxO"),u=n("fEPP");(function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t})(u).setWebTitle("NEWS - memei.net"),t.default={data:function(){return{results:[{name:"English",marks:70},{name:"Math",marks:80},{name:"History",marks:90}]}},components:{LoginTrigger:a.default},computed:r({},(0,o.mapGetters)(["getMyToken"]),{totalMarks:function(){for(var e=0,t=0;t<this.results.length;t++)e+=parseInt(this.results[t].marks);return e}}),methods:{SetMyToken:function(){this.$store.commit("setMyToken","my vuex token")}},destroyed:function(){}}},rlGY:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("login-trigger"),e._v("\n    news\n    "),n("hr"),e._v(" myToken:"+e._s(e.getMyToken)+"\n    "),n("br"),e._v(" "),n("button",{on:{click:e.SetMyToken}},[e._v("SetMyToken")]),e._v(" "),n("hr"),e._v(" "),e._l(e.results,function(t,r){return n("div",{key:r},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.marks,expression:"subject.marks"}],domProps:{value:t.marks},on:{input:function(e){e.target.composing||(t.marks=e.target.value)}}}),e._v(" "),n("span",[e._v("\n            Marks for "+e._s(t.title)+": "+e._s(t.marks)+"\n        ")])])}),e._v(" "),n("span",[e._v("\n        Total marks are: "+e._s(e.totalMarks)+"\n    ")])],2)},s=[],a={render:r,staticRenderFns:s};t.a=a}});
//# sourceMappingURL=3.7bc741bcef018a9be30f.map