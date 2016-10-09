module.exports = {

    taskA: function(arg1, cb){

        console.log("taskA will start")
        setTimeout(function(){

            console.log("taskA finished. Will now call the callback")
            var now = Date.now();

            if(now%2===0){
                return cb(undefined, "all done");
            }

            return cb(new Error("something went wrong"));
            
            
        }, 1000);

    }
};
