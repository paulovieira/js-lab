var Fs = require("fs");
var Htmlparser = require("htmlparser2");
var _ = require("underscore");
var _s = require("underscore.string");
var Beautify = require('js-beautify').js_beautify;

var internals = {

    deltaOptions: {
        ignoreEmptyLines: true,

        // htmlparser options
        //normalizeWhitespace: true,
        //xmlMode: false
        //decodeEntities: true,
        //lowerCaseTags
        //recognizeSelfClosing
    },

    beautifyOptions: {
        indent_size: 2,
        end_with_newline: true,
        jslint_happy: true
    },

    depth: 0,

    output: "",

    prologueCode: "",
    
    parameterNames: [],

    matcher: RegExp((/{{([\s\S]+?)}}/g || /(.)^/).source + '|$', 'g'),
};



internals.hasContent = function(node){

    var n = _.where(node.children, {type: "tag"}).length;
    var m = _.where(node.children, {type: "text", empty: false}).length;    

    return !!(n+m);
};



internals.lineIsText = function(line){

    return !_s(line).startsWith(":");
};


internals.parseNode = function(node, nodeIndex){

    var nodeType = _s.capitalize(node.type);
    internals["parse" + nodeType](node, nodeIndex);
};

internals.parseText = function(node, nodeIndex){

    if(node.empty){
        return;
    }

    var lines = [];
    var linesTemp = _s.lines(node.data);

    // create a new lines array where consecutive lines of text are joined
    // (to avoid calling text() multiple times unnecessarily)
    // TODO: move into a utility function
    linesTemp.forEach(function(line){

        var lineIsText = !_s(line).startsWith(":");

        var previousLine = lines.pop();
        var previousLineIsText = previousLine === undefined ? 
                                false : !_s(previousLine).startsWith(":");

        if(lineIsText && previousLineIsText){
            lines.push(previousLine + '\\n' + line)
        }
        else{
            lines.push(previousLine);
            lines.push(line);            
        }
    });

    lines.shift();

    lines.forEach(function(line){
//            debugger;
            
            var lineTrimmed = line.trim();

            if(lineTrimmed==="" && internals.deltaOptions.ignoreEmptyLines){
                return;
            }

            //line = _s.splice(line, line.length, 0, "\p");
            
            if(_s.startsWith(lineTrimmed, "@param") && node.depth===0 && nodeIndex===0){
                internals.pushToParameters(lineTrimmed);
            }

            else if(_s.startsWith(line, ":")){

                // native replace will only affect the first occurrence of ":"
                line = line.replace(":", "");
                internals.output += line + "\n";
            }

            else{

                var i = 0, lineTemp = '';

                line.replace(internals.matcher, function(match, interpolate, offset) {
                  //debugger;
                  //console.log("match", match)
                  //console.log("interpolate", interpolate)
                  if(match===''){
                    return;
                  }

                  lineTemp += `'${ line.slice(i, offset) }'  `;
                  lineTemp += ` + (${ interpolate.trim() })  + `;

                  i = offset + match.length;
                });

                debugger;

                // if line has interpolation tokens the trail must be fixed
                if(i>0){

                    var li = lineTemp.lastIndexOf('+');
                    lineTemp = _s.splice(lineTemp, li, 1);

                    li = line.lastIndexOf('}}');
                    if(li!==-1){
                        lineTemp += ` + '${ line.slice(li+2) }'`;
                        //lineTemp += '\'';
                    }

                    internals.output += `text(${ lineTemp })\n`;
                }
                else{
                    internals.output += `text('${ line }')\n`;
                }

            }
        
        });
};


internals.parseTag = function(node){

    internals.output += `elementOpen('${ node.name }')\n`;

    if(node.attribs.skip){

        if(internals.hasContent(node)){
           throw new Error("an element with the skip attribute cannot have children")
        }

        internals.output += `skip()\n`;
    }
    else{
        node.children.forEach(internals.parseNode);

    }

    internals.output += `elementClose('${ node.name }')\n`;
};


internals.parseScript = function(node){

    if(node.children.length!==1){
        throw new Error("script element should always have 1 children (?)")
    }
    internals.prologueCode += node.children[0].data + '\n';
};


internals.parseComment = function(node){

    // do nothing
};



// normalize and augment the properties for the different node types
internals.normalizeNode = function(node){

    // normalize the attribs object and children array for all node types;
    node.attribs = node.attribs || {};
    node.children = node.children || [];

    node.depth = internals.depth;

    // boolean-like attributes should actually have a boolean value;
    // example: for "<div skip></div>"" we should  have
    // node.attribs.skip === true (instead of node.attribs.skip === "")
    for(var key in node.attribs){
        if(node.attribs[key].trim() === ""){
            node.attribs[key] = true;
        }
    }

    // for text nodes that don't have content, add a boolean flag indicating it
    if(node.type === "text"){
        node.empty = node.data.trim() === "" ? true : false;
    }

    if(node.children.length){
        internals.depth++;
        node.children.forEach(internals.normalizeNode)    
        internals.depth--;
    }

    return node;
    
};

internals.pushToParameters = function(line){

    var a = _s.clean(line).split(' ');

    if(a.length!==2){
        throw new Error("The renderer's parameters should be declared in the format: '@param parameterName'")
    }

    internals.parameterNames.push(a[1]);
};


internals.write = function(beautifyOptions){

    if(internals.parameterNames.length===0){
        internals.parameterNames.push("ctx");
    }

    internals.output = `
;(function(${ internals.parameterNames.join(", ") }){

    return function(ctx){

        ${ internals.prologueCode }
        // end of prologue scripts
        ${ internals.output }
    };
})()
`;


    console.log(internals.output);
    console.log("---");
    console.log(Beautify(internals.output, beautifyOptions));
    Fs.writeFileSync("output.js", Beautify(internals.output, beautifyOptions))
};




var Delta = {

    compile: function(input, deltaOptions, beautifyOptions){

        deltaOptions = _.extend({}, internals.deltaOptions, deltaOptions);
        beautifyOptions = _.extend({}, internals.beautifyOptions, beautifyOptions);

        Htmlparser
            .parseDOM(input.trim(), deltaOptions)
            .map(internals.normalizeNode)
            .forEach(internals.parseNode);

        internals.write(beautifyOptions);
    }
};

module.exports = Delta;
