(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["map/templates/map-container.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"mn-leaflet-map\" style=\"height: 100%; margin: 0; padding: 0;\"></div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["menu/templates/export-map.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
var t_1;
t_1 = runtime.contextOrFrameLookup(context, frame, "host") + "/exportar/iniciativas?zoom=" + runtime.contextOrFrameLookup(context, frame, "zoom") + "&amp;centerLat=" + runtime.contextOrFrameLookup(context, frame, "lat") + "&amp;centerLng=" + runtime.contextOrFrameLookup(context, frame, "lng") + "&amp;baseLayer=" + runtime.contextOrFrameLookup(context, frame, "baseLayer");
frame.set("url", t_1, true);
if(frame.topLevel) {
context.setVariable("url", t_1);
}
if(frame.topLevel) {
context.addExport("url", t_1);
}
output += "\n\n";
if(runtime.contextOrFrameLookup(context, frame, "types")) {
output += "\n\t";
var t_2;
t_2 = runtime.contextOrFrameLookup(context, frame, "url") + runtime.contextOrFrameLookup(context, frame, "types");
frame.set("url", t_2, true);
if(frame.topLevel) {
context.setVariable("url", t_2);
}
if(frame.topLevel) {
context.addExport("url", t_2);
}
output += "\n";
;
}
output += "\n\n";
if(runtime.contextOrFrameLookup(context, frame, "domains")) {
output += "\n\t";
var t_3;
t_3 = runtime.contextOrFrameLookup(context, frame, "url") + runtime.contextOrFrameLookup(context, frame, "domains");
frame.set("url", t_3, true);
if(frame.topLevel) {
context.setVariable("url", t_3);
}
if(frame.topLevel) {
context.addExport("url", t_3);
}
output += "\n";
;
}
output += "\n\n<div>\nFaça copy-paste do seguinte elemento <code>&lt;iframe&gt;</code> para exportar o mapa para o seu website. Pode ler mais detalhes na página <a href=\"/exportar\">\"Exportar o mapa\"</a>.\n</div>\n\n<div>\n\t<textarea style=\"border: solid 1px; background-color: white;\" class=\"form-control\" rows=\"6\">\n\n&lt;iframe width=\"400\" height=\"700\" src=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "url"), env.opts.autoescape);
output += "\"&gt; &lt;/iframe&gt;\n\n\t</textarea>\n</div>\n\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["menu/templates/loading.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"text-center\" style=\"margin-top: 20px; \">\n\n    <i style=\"font-size: 200%; color: #3783a7;\" class=\"fa fa-refresh fa-spin\"></i>\n    <h5 style=\"margin: 0; color: #3783a7;\">\n        Aguarde\n    </h5> \n\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["menu/templates/menu-body.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "\n<div class=\"row search-container\" style=\"padding-right: 20px;\">\n\n    <div class=\"col-sm-9\" style=\"padding: 0px 20px 0px 0px; margin-left: -1px;\">\n        <div class=\"form-group\">\n          <div class=\"input-group\" style=\"background-color: white;\">\n\n              <input type=\"text\" style=\"background-color: white; border: 2px solid #7A9E9F; border-radius: 10px; border-top-right-radius: 0; border-bottom-right-radius: 0;\" class=\"form-control\" id=\"search-initiative\" placeholder=\"Pesquisar\">\n              <span class=\"input-group-addon\" style=\"background-color: white; border: 2px solid #7A9E9F; border-left: 0; border-radius: 10px; border-top-left-radius: 0; border-bottom-left-radius: 0; cursor: pointer;\">\n                  <i style=\"color: #7A9E9F; font-size: 125%;\" class=\"fa fa-search\"></i>\n              </span>\n\n          </div>\n        </div>\n    </div>\n\n    <div class=\"col-sm-3\" style=\"padding: 0px 15px 0px 0px;\">\n        <button class=\"btn btn-primary\" style=\"height: 35px; line-height: 22px; padding: 0px 14px 0px 18px; border-radius: 10px;\" id=\"options-filters\">\n            Opções \n            <i style=\"font-size: 125%;\" class=\"fa fa-cog\"></i>\n        </button>\n\n    </div>\n\n</div>\n\n<div id=\"mn-r-list\"></div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["menu/templates/menu-list.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"row\" style=\"margin: 0px 10px 0px 5px; padding: 0px 0px 0px 10px;\">\n    <div class=\"col-sm-12\" style=\"padding: 0px 0px 0px 0px; margin-left: -1px;\">\n    <span style=\"font-size: 12px; font-family: 'Montserrat'\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "numFilteredMsg"), env.opts.autoescape);
output += " </span>\n    </div>\n</div>\n\n\n";
if(runtime.contextOrFrameLookup(context, frame, "numFiltered") > 0) {
output += "\n\n";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "initiatives");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("obj", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n\n";
if(runtime.memberLookup((t_4),"inFilters") && runtime.memberLookup((t_4),"inVisibleBounds")) {
output += "\n<div class=\"row initiative-container ";
output += runtime.suppressValue((runtime.memberLookup((t_4),"selected")?"initiative-selected":""), env.opts.autoescape);
output += "\" data-slug=";
output += runtime.suppressValue(runtime.memberLookup((t_4),"slug"), env.opts.autoescape);
output += " >\n\n    <div class=\"";
output += runtime.suppressValue((runtime.memberLookup((runtime.memberLookup((t_4),"logo")),"filename")?"col-sm-9":"col-sm-12"), env.opts.autoescape);
output += "\" style=\"padding: 0;\">\n    \n        <h5 style=\"margin: 0; color: #3783a7;\" title=\"Ver a ficha completa desta iniciativa (abre numa nova tab)\">\n            <a href=\"/iniciativas/";
output += runtime.suppressValue(runtime.memberLookup((t_4),"slug"), env.opts.autoescape);
output += "\" target=\"_blank\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name"), env.opts.autoescape);
output += "</a>\n        </h5> \n        \n        \n        <div style=\"font-size: 13px; line-height: 1.4; color: gray; margin-bottom: 5px; padding-right: 3px;\">\n        ";
if(runtime.memberLookup((t_4),"logo")) {
output += "\n            ";
output += runtime.suppressValue(env.getFilter("truncate").call(context, env.getFilter("replace").call(context, env.getFilter("replace").call(context, runtime.memberLookup((t_4),"description"),"<br />"," "),"\n"," "),160), env.opts.autoescape);
output += " \n        ";
;
}
else {
output += "\n            ";
output += runtime.suppressValue(env.getFilter("truncate").call(context, env.getFilter("replace").call(context, env.getFilter("replace").call(context, runtime.memberLookup((t_4),"description"),"<br />"," "),"\n"," "),210), env.opts.autoescape);
output += " \n        ";
;
}
output += "\n\n            <a href=\"/iniciativas/";
output += runtime.suppressValue(runtime.memberLookup((t_4),"slug"), env.opts.autoescape);
output += "\" target=\"_blank\">\n                <span class=\"label label-info\" style=\"padding: 0.2em 0.6em; border-radius: 5px; margin: 0px 0px 0px 5px; xdisplay: inline; \" title=\"Ver a ficha completa desta iniciativa (abre numa nova tab)\">Ler mais</span>\n            </a>\n\n            <a href=\"#\" data-slug=";
output += runtime.suppressValue(runtime.memberLookup((t_4),"slug"), env.opts.autoescape);
output += " class=\"js-fly-to\">\n                <span class=\"label label-info\" style=\"padding: 0.2em 0.6em; border-radius: 5px; margin: 0px 0px 0px 5px; xdisplay: inline; \" title=\"Centrar no mapa\">Mapa</span>\n            </a>\n\n        </div>\n\n        <p style=\"margin-bottom: 0px; font-size: 12px; color: #007f00;\">\n            <small>\n                <span style=\"\">Tipo:</span> \n                <span title=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"typeDescription"), env.opts.autoescape);
output += "\" style=\"opacity: 0.9;\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"typeTitle"), env.opts.autoescape);
output += "</span> \n            </small>\n            <a href=\"#\" class=\"js-modal-types-description\" data-toggle=\"modal\" data-target=\"#types-more-info\" title=\"Ver mais detalhes sobre os diferentes tipos de iniciativa\">\n                <i style=\"xmargin-left: 2px; color: #009900;\" class=\"fa fa-info-circle\"></i>    \n            </a>\n\n        </p>\n\n\n    </div>\n\n    ";
if(runtime.memberLookup((runtime.memberLookup((t_4),"logo")),"filename")) {
output += "\n    <div class=\"col-sm-3\" style=\"padding: 0px 15px 0px 0px;\">\n    \n    <a target=\"_blank\" href=\"/iniciativas/";
output += runtime.suppressValue(runtime.memberLookup((t_4),"slug"), env.opts.autoescape);
output += "\" title=\"Ver a ficha completa desta iniciativa (abre numa nova tab)\">\n        <img style=\"min-width:80px; max-width:110px; padding: 3px;\" src=\"/static/images/logos/";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"logo")),"filename"), env.opts.autoescape);
output += "\" class=\"pull-right img-responsive img-rounded\" alt=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name"), env.opts.autoescape);
output += " - logotipo\">\n    </a>\n\n    </div>\n    ";
;
}
output += "\n\n</div>\n\n<hr class=\"initiative-separator\"  style=\"margin: 10px 12px 15px 7px;\">\n\n";
;
}
output += "\n\n";
;
}
}
frame = frame.pop();
output += "\n\n";
;
}
else {
output += "\n\n";
output += "\n<div class=\"row initiative-container\">\n    <div class=\"col-sm-12\" style=\"padding: 0;\">\n        \n        <h5 style=\"margin: 0; color: #3783a7;\">\n            Não há iniciativas correspondentes aos critérios de pesquisa.\n        </h5> \n\n    </div>\n</div>\n\n";
;
}
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["menu/templates/menu.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"menu-container\" style=\"\">\n\n\t<div class=\"menu-header\" style=\"\">\n\t    <i class=\"scale-10 fa fa-bars\"  style=\"font-size: 150%; cursor: pointer; margin-top: 1px;\" title=\"\"></i>\n\n        <i class=\"invisible scale-40 fa fa-close\"  style=\"opacity: 0.5; cursor: pointer; float: right; margin: 0px -4px 0px 0px;\" title=\"Fechar o menu\"></i>\n\t</div>\n\n\t<div class=\"mn-r-menu-body\" style=\"height: 100%;\">\n    </div>\n</div>\n\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["menu/templates/options-modal.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"modal-header\">\n    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n    <h4 class=\"modal-title\">Opções</h4>\n</div>\n\n\n<div class=\"modal-body\">\n\n    <p style=\"margin-bottom: 5px;\">Filtro: tipo de iniciativa</p>\n    <div class=\"row\">\n        <div class=\"col-sm-6\">\n\n            ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "types");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("obj", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0") % 2 == 0) {
output += "\n\n            <label style=\"display: block; font-weight: normal; font-size: 13px;\" title=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"description")),"pt"), env.opts.autoescape);
output += "\">\n                <input type=\"checkbox\" data-type-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\" name=\"filter-type\" class=\"js-filter-type\" ";
output += runtime.suppressValue((runtime.memberLookup((t_4),"selected")?"checked":""), env.opts.autoescape);
output += ">\n                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"title")),"pt"), env.opts.autoescape);
output += "\n            </label>\n\n            ";
;
}
output += "\n            ";
;
}
}
frame = frame.pop();
output += "\n        \n        </div>\n\n        <div class=\"col-sm-6\">\n\n            ";
frame = frame.push();
var t_7 = runtime.contextOrFrameLookup(context, frame, "types");
if(t_7) {var t_6 = t_7.length;
for(var t_5=0; t_5 < t_7.length; t_5++) {
var t_8 = t_7[t_5];
frame.set("obj", t_8);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0") % 2 == 1) {
output += "\n\n            <label style=\"display: block; font-weight: normal; font-size: 13px;\" title=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_8),"description")),"pt"), env.opts.autoescape);
output += "\">\n                <input type=\"checkbox\" data-type-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_8),"id"), env.opts.autoescape);
output += "\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_8),"id"), env.opts.autoescape);
output += "\" name=\"filter-type\" class=\"js-filter-type\" ";
output += runtime.suppressValue((runtime.memberLookup((t_8),"selected")?"checked":""), env.opts.autoescape);
output += " >\n                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_8),"title")),"pt"), env.opts.autoescape);
output += "\n            </label>\n\n            ";
;
}
output += "\n            ";
;
}
}
frame = frame.pop();
output += "\n        \n        </div>\n    </div>\n\n\n    <hr style=\"margin: 10px 0px 15px 0px;\">\n\n    <p style=\"margin-bottom: 5px;\">Filtro: domínio de interesse</p>\n    <div class=\"row\">\n        <div class=\"col-sm-6\">\n\n            ";
frame = frame.push();
var t_11 = runtime.contextOrFrameLookup(context, frame, "domains");
if(t_11) {var t_10 = t_11.length;
for(var t_9=0; t_9 < t_11.length; t_9++) {
var t_12 = t_11[t_9];
frame.set("obj", t_12);
frame.set("loop.index", t_9 + 1);
frame.set("loop.index0", t_9);
frame.set("loop.revindex", t_10 - t_9);
frame.set("loop.revindex0", t_10 - t_9 - 1);
frame.set("loop.first", t_9 === 0);
frame.set("loop.last", t_9 === t_10 - 1);
frame.set("loop.length", t_10);
output += "\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0") % 2 == 0) {
output += "\n\n            <label style=\"display: block; font-weight: normal; font-size: 13px;\" title=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_12),"description")),"pt"), env.opts.autoescape);
output += "\">\n                <input type=\"checkbox\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_12),"id"), env.opts.autoescape);
output += "\"  data-domain-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_12),"id"), env.opts.autoescape);
output += "\" name=\"filter-domain\" class=\"js-filter-domain\" ";
output += runtime.suppressValue((runtime.memberLookup((t_12),"selected")?"checked":""), env.opts.autoescape);
output += ">\n                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_12),"title")),"pt"), env.opts.autoescape);
output += "\n            </label>\n\n            ";
;
}
output += "\n            ";
;
}
}
frame = frame.pop();
output += "\n        \n        </div>\n\n        <div class=\"col-sm-6\">\n\n            ";
frame = frame.push();
var t_15 = runtime.contextOrFrameLookup(context, frame, "domains");
if(t_15) {var t_14 = t_15.length;
for(var t_13=0; t_13 < t_15.length; t_13++) {
var t_16 = t_15[t_13];
frame.set("obj", t_16);
frame.set("loop.index", t_13 + 1);
frame.set("loop.index0", t_13);
frame.set("loop.revindex", t_14 - t_13);
frame.set("loop.revindex0", t_14 - t_13 - 1);
frame.set("loop.first", t_13 === 0);
frame.set("loop.last", t_13 === t_14 - 1);
frame.set("loop.length", t_14);
output += "\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0") % 2 == 1) {
output += "\n\n            <label style=\"display: block; font-weight: normal; font-size: 13px;\" title=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_16),"description")),"pt"), env.opts.autoescape);
output += "\">\n                <input type=\"checkbox\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_16),"id"), env.opts.autoescape);
output += "\" data-domain-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_16),"id"), env.opts.autoescape);
output += "\"  name=\"filter-domain\" class=\"js-filter-domain\" ";
output += runtime.suppressValue((runtime.memberLookup((t_16),"selected")?"checked":""), env.opts.autoescape);
output += ">\n                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_16),"title")),"pt"), env.opts.autoescape);
output += "\n            </label>\n\n            ";
;
}
output += "\n            ";
;
}
}
frame = frame.pop();
output += "\n        \n        </div>\n    </div>\n\n\n    <hr style=\"margin: 10px 0px 15px 0px;\">\n\n\n    <p style=\"margin-bottom: 5px;\">Mapa-base</p>\n    <div class=\"row\">\n        <div class=\"col-sm-4\">\n        \n            ";
frame = frame.push();
var t_19 = runtime.contextOrFrameLookup(context, frame, "baseLayers");
if(t_19) {var t_18 = t_19.length;
for(var t_17=0; t_17 < t_19.length; t_17++) {
var t_20 = t_19[t_17];
frame.set("obj", t_20);
frame.set("loop.index", t_17 + 1);
frame.set("loop.index0", t_17);
frame.set("loop.revindex", t_18 - t_17);
frame.set("loop.revindex0", t_18 - t_17 - 1);
frame.set("loop.first", t_17 === 0);
frame.set("loop.last", t_17 === t_18 - 1);
frame.set("loop.length", t_18);
output += "\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0") % 3 == 0) {
output += "\n\n            <label style=\"display: block; font-weight: normal; font-size: 13px;\" title=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_20),"description")),"pt"), env.opts.autoescape);
output += "\">\n                <input type=\"radio\" name=\"base-layers\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_20),"id"), env.opts.autoescape);
output += "\" data-base-layer-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_20),"id"), env.opts.autoescape);
output += "\" class=\"js-base-layer\" ";
output += runtime.suppressValue((runtime.memberLookup((t_20),"selected")?"checked":""), env.opts.autoescape);
output += "> ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_20),"title")),"pt"), env.opts.autoescape);
output += " \n            </label>\n\n            ";
;
}
output += "\n            ";
;
}
}
frame = frame.pop();
output += "\n        \n        </div>\n        <div class=\"col-sm-4\">\n        \n            ";
frame = frame.push();
var t_23 = runtime.contextOrFrameLookup(context, frame, "baseLayers");
if(t_23) {var t_22 = t_23.length;
for(var t_21=0; t_21 < t_23.length; t_21++) {
var t_24 = t_23[t_21];
frame.set("obj", t_24);
frame.set("loop.index", t_21 + 1);
frame.set("loop.index0", t_21);
frame.set("loop.revindex", t_22 - t_21);
frame.set("loop.revindex0", t_22 - t_21 - 1);
frame.set("loop.first", t_21 === 0);
frame.set("loop.last", t_21 === t_22 - 1);
frame.set("loop.length", t_22);
output += "\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0") % 3 == 1) {
output += "\n\n            <label style=\"display: block; font-weight: normal; font-size: 13px;\" title=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_24),"description")),"pt"), env.opts.autoescape);
output += "\">\n                <input type=\"radio\" name=\"base-layers\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_24),"id"), env.opts.autoescape);
output += "\" data-base-layer-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_24),"id"), env.opts.autoescape);
output += "\" class=\"js-base-layer\" ";
output += runtime.suppressValue((runtime.memberLookup((t_24),"selected")?"checked":""), env.opts.autoescape);
output += "> ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_24),"title")),"pt"), env.opts.autoescape);
output += "\n            </label>\n\n            ";
;
}
output += "\n            ";
;
}
}
frame = frame.pop();
output += "\n        \n        </div>\n        <div class=\"col-sm-4\">\n        \n            ";
frame = frame.push();
var t_27 = runtime.contextOrFrameLookup(context, frame, "baseLayers");
if(t_27) {var t_26 = t_27.length;
for(var t_25=0; t_25 < t_27.length; t_25++) {
var t_28 = t_27[t_25];
frame.set("obj", t_28);
frame.set("loop.index", t_25 + 1);
frame.set("loop.index0", t_25);
frame.set("loop.revindex", t_26 - t_25);
frame.set("loop.revindex0", t_26 - t_25 - 1);
frame.set("loop.first", t_25 === 0);
frame.set("loop.last", t_25 === t_26 - 1);
frame.set("loop.length", t_26);
output += "\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0") % 3 == 2) {
output += "\n\n            <label style=\"display: block; font-weight: normal; font-size: 13px;\" title=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_28),"description")),"pt"), env.opts.autoescape);
output += "\">\n                <input type=\"radio\" name=\"base-layers\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_28),"id"), env.opts.autoescape);
output += "\" data-base-layer-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_28),"id"), env.opts.autoescape);
output += "\" class=\"js-base-layer\" ";
output += runtime.suppressValue((runtime.memberLookup((t_28),"selected")?"checked":""), env.opts.autoescape);
output += "> ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_28),"title")),"pt"), env.opts.autoescape);
output += "\n            </label>\n\n            ";
;
}
output += "\n            ";
;
}
}
frame = frame.pop();
output += "\n        \n        </div>\n    </div>\n\n    <hr style=\"margin: 10px 0px 15px 0px;\">\n\n    <p style=\"margin-bottom: 5px;\">Exportar</p>\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n\n            <div style=\"font-size: 13px;\">\n            Pode exportar o mapa para o seu website usando as opções actualmente seleccionadas  (filtros, localização, iniciativa seleccionada, etc) \n            </div>\n            <div class=\"text-center\">\n                <button style=\"\" class=\"btn btn-success btn-export\" data-toggle=\"collapse\" data-target=\"#iframe-export\">Mostrar as instruções</button>\n            </div>\n\n            <div style=\"margin-top: 10px; xborder: 1px solid; font-size: 13px;\" id=\"iframe-export\" class=\"collapse\">\n\n                Faça copy-paste do seguinte código HTML para o seu website. Pode ler mais detalhes na página <a href=\"/exportar\" target=\"_blank\">Exportar</a>.\n\n                <div style=\"margin-top: 10px; font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;\">\n                    \n                    <textarea style=\"border: solid 1px #DDDDDD; background-color: white;\" class=\"code form-control\" rows=\"6\">\n&lt;iframe width=\"400\" height=\"700\" src=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "currentHref"), env.opts.autoescape);
output += "\"&gt; &lt;/iframe&gt;\n                    </textarea>\n\n                </div>\n\n            </div>\n\n\n        </div>\n    </div>\n\n</div>\n\n<div class=\"modal-footer\">\n\n    <div class=\"left-side\">\n        <button style=\"font-size: 20px;\" type=\"button\" class=\"btn btn-default btn-simple\" data-dismiss=\"modal\"><b>Cancelar</b></button>\n    </div>\n\n    <div class=\"divider\"></div>\n\n    <div class=\"right-side\">\n        <button style=\"font-size: 20px;\" type=\"button\" class=\"btn btn-info btn-simple js-modal-apply\" data-dismiss=\"modal\"><b>Aplicar filtros</b></button>\n    </div>\n\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
