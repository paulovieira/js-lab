module.exports = function(grunt){

    grunt.registerMultiTask("xyz", "log stuff", function(){
        grunt.log.writeln(this.target)
        grunt.log.writeln(JSON.stringify(this.data, 4, 4))
    });
};
