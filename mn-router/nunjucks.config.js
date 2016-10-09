module.exports = function(env){

    env.addFilter('stringify', function(input){

        return JSON.stringify(input);
    });

    env.addFilter('now', function(input){

        return input + ' ' + Date.now();
    });

    env.addGlobal("lang", "pt");
};
