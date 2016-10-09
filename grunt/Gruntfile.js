module.exports = function(grunt){

    grunt.config.merge({
        uglify: {
            options: {
                banner: "/** this is the banner **/\n"
            },
            build: {
                src:"app/index.js",
                dest: "build/output.js"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    
    grunt.config.merge({
        "xyz": {
            abc: {
                name: "paulo",
                lastName: "vieira",
                age: 35
            },
            abc2: {
                name: "ana",
                lastName: "pocas"
            }

        }
    });

    grunt.loadTasks("my-tasks")
    // grunt.registerMultiTask("xyz", "log stuff", function(){
    //     grunt.log.writeln(this.target)
    //     grunt.log.writeln(JSON.stringify(this.data, 4, 4))
    // });


    //grunt.registerTask("default", ["uglify"]);
};