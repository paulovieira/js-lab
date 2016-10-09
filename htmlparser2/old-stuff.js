

function parseNode(node, nodeIndex){
    debugger;

    if(node.type==="text"){

        internals.parseNode[node.type](node, nodeIndex)
        /*
        if(node.empty){
            return;
        }

        _s.lines(node.data)
            .forEach(function(line){
//            debugger;
                
                var lineTrimmed = line.trim();
                if(lineTrimmed==="" && internals.deltaOptions.ignoreEmptyLines){
                    //throw new Error("to be removed later - should never reach this ")
                    return;
                }

                //line = _s.splice(line, line.length, 0, "\p");
                
                if(_s.startsWith(lineTrimmed, "@param") && node.depth===0 && nodeIndex===0){
                    parseArgument(line);
                }

                else if(_s.startsWith(line, ":")){

                    // native replace will only affect the first occurrence of ":"
                    line = line.replace(":", "");
                    internals.outputTemplate += line + "\n";
                }

                else{

                    var i = 0, lineTemp = '';

                    line.replace(matcher, function(match, interpolate, offset) {
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

                        internals.outputTemplate += `text(${ lineTemp })\n`;
                    }
                    else{
                        internals.outputTemplate += `text('${ line }')\n`;
                    }

                }
            
            });
*/
    }
    else if(node.type==="tag"){

        internals.parseNode[node.type](node);
/*
        internals.outputTemplate += `elementOpen('${ node.name }')\n`;

        if(node.attribs.skip){

            if(internals.hasContent(node)){
               throw new Error("an element with the skip attribute cannot have children")
            }

            internals.outputTemplate += `skip()\n`;
        }
        else{
            node.children.forEach(parseNode);
        }

        internals.outputTemplate += `elementClose('${ node.name }')\n`;
*/

    }
    else if(node.type==="script"){
        
        internals.parseNode[node.type](node);
//        internals.prologueCode += node.children[0].data + '\n';
    }
    else if(node.type==="comment"){
        
        internals.parseNode[node.type](node);
        // do nothing
    }


    //internals.outputTemplate += "\n\n\n";
}