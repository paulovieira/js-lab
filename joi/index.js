var Joi = require("joi");

var config = {
        //abortEarly: true,  // returns all the errors found (does not stop on the first error)
        //allowUnknown: , // allows object to contain unknown keys (they can be deleted or not - see the stripUnknown options)
        stripUnknown: false,  // delete unknown keys; this means that only the keys that are explicitely stated in the schema will be present in request.payload and request.query when the handler executes;
        convert: true
/*


        convert: ...
        skipFunctions: ...
        stripUnknown: ...
        language: ...
        presence: ...
        context: ...
*/
    };

var schemaCreate = Joi.object({

    xyz: Joi.number()
    // name: Joi.string().min(1).required(),
    // description: Joi.string().allow("").required(),
    // center: Joi.string().required(),
    // xyz: Joi.number()
});

//var value = [{name: "xxx", description: "yyy", center: "zzz", xyz: "ggg"}];
var value = [{xyz: 123}, {xyz: "45f6", abc: "abc"}];
//value = {xyz: "123"};

// (which is the case), then properties whose keys are not present in the schema will be deleted
debugger;
var validation = Joi.validate(value, Joi.array().items(schemaCreate), config);
//var validation = Joi.validate(value, schemaCreate, config);
console.log(validation);

