var defaultConfig = {

    database: {
        xyz: 456,
        host: "localhost",
        port: 1111,
        x: {
            x0: 0,
            x1: 1,
            x2: 2,
            x4: {
                y1: 5
            }
        },
        y: [1,2,3],
        z: function(x){
            return x*2;
        },

        email: {
            send: false
        }
    },

};

module.exports = defaultConfig;


