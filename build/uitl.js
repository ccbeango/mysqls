"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _typeof2=require("babel-runtime/helpers/typeof"),_typeof3=_interopRequireDefault(_typeof2),_keys=require("babel-runtime/core-js/object/keys"),_keys2=_interopRequireDefault(_keys);exports.getOptToString=getOptToString,exports.checkOptType=checkOptType,exports.checkOptObjType=checkOptObjType,exports.expressionQuery=expressionQuery,exports.sortSelectSql=sortSelectSql;var _sqlstring=require("sqlstring"),_sqlstring2=_interopRequireDefault(_sqlstring);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function getOptToString(o){var s="",e=Object.prototype.toString.call(o);if("[object Object]"===e){var r=o._type&&o._type.toUpperCase()||"AND",c=o._type&&o._type.trim()?1:0,p=(0,_keys2.default)(o);p.forEach(function(e,t){"_type"!==e&&(s="object"===(0,_typeof3.default)(o[e])?t===p.length-1-c?s+""+checkOptObjType(e,o[e]):s+(checkOptObjType(e,o[e])+" ")+r+" ":t===p.length-1-c?s+(e+"=")+checkOptType(o[e]):s+(e+"=")+checkOptType(o[e])+" "+r+" ")})}else"[object Array]"===e&&o.forEach(function(r,e){var c="",t=0,p=r._type&&r._type.toUpperCase()||"AND",a=r._nexttype||"AND";t=r._type&&r._type.trim()?t+1:t,t=r._nexttype&&r._nexttype.trim()?t+1:t,(0,_keys2.default)(r).forEach(function(e,t){"_type"!==e&&"_nexttype"!==e&&(c=c?"object"===(0,_typeof3.default)(r[e])?c+(p+" ")+checkOptObjType(e,r[e]):c+(p+" ")+e+"="+checkOptType(r[e])+" ":"object"===(0,_typeof3.default)(r[e])?""+checkOptObjType(e,r[e]):e+"="+checkOptType(r[e])+" ")}),c=e===o.length-1?"("+c+")":"("+c+") "+a.toUpperCase(),s=s+" "+c});return s}function checkOptType(e,t){var r=void 0;switch(Object.prototype.toString.call(e)){case"[object String]":e=e.trim(),e=_sqlstring2.default.escape(e),r=t&&-1<e.indexOf(t)&&e.match(/\+|-|\*|\/|%/)?e.slice(1,-1):""+e;break;case"[object Boolean]":case"[object Number]":r=e;break;default:r=_sqlstring2.default.escape(e)}return r}function checkOptObjType(c,p){var a="";if("[object Object]"===Object.prototype.toString.call(p)){var o=(0,_keys2.default)(p),s=p._type&&p._type.trim()?1:0;o.forEach(function(e,t){if("_type"!==e){var r=p._type||"AND";a+=expressionQuery(c,e,p[e],r.toUpperCase(),t===o.length-1-s)}})}else a=c+"="+p;return"("+a+") "}function expressionQuery(e,t,r,c,p){var a="";switch(t.toUpperCase()){case"EQ":a="("+e+"="+checkOptType(r)+")";break;case"NEQ":a="("+e+"<>"+checkOptType(r)+")";break;case"GT":a="("+e+">"+checkOptType(r)+")";break;case"EGT":a="("+e+">="+checkOptType(r)+")";break;case"LT":a="("+e+"<"+checkOptType(r)+")";break;case"ELT":a="("+e+"<="+checkOptType(r)+")";break;case"LIKE":a="("+e+" LIKE "+checkOptType(r)+")";break;case"NOTLIKE":a="("+e+" NOT LIKE "+checkOptType(r)+")";break;case"BETWEEN":a="("+e+" BETWEEN "+r.replace(","," AND ")+")";break;case"NOTBETWEEN":a="("+e+" NOT BETWEEN "+r.replace(","," AND ")+")";break;case"IN":a="("+e+" IN ("+r+"))";break;case"NOTIN":a="("+e+" NOT IN ("+r+"))";break;default:a="("+e+"="+checkOptType(r)+")"}return p?a+" ":a+" "+c+" "}function sortSelectSql(e){var t=e||{};if(t.count||t.max||t.min||t.avg||t.sum){var r=(t.count?","+t.count:"")+(t.max?","+t.max:"")+(t.min?","+t.min:"")+(t.avg?","+t.avg:"")+(t.sum?","+t.sum:"");t.count=t.max=t.min=t.avg=t.sum="",t.field?t.field=t.field+r:t.field=r.substring(1)}t.field||(t.field="*"),t.table&&(t.table="FROM "+t.table),t.where&&(t.where="WHERE "+t.where);var c=(0,_keys2.default)(t),p=[],a=["union","distinct","field","count","max","min","avg","sum","table","alias","join","where","group","having","order","limit","page","comment"];return c.forEach(function(r,e){a.forEach(function(e,t){r===e&&(p[t]=r)})}),{sortkeys:p,result:t}}