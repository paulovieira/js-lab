var IDOM = require("incremental-dom");
var elementOpenx = IDOM.elementOpen;

function render(data){


    var header;
    if(data.conditional){
        header = <div class={ data.myClass } >it is truexxx</div>;
    }
    else{
        header = <div class={ data.myClass } >it is false</div>;
    }

    return (

        <div id="abcx">
            { header }
        </div>

    );
}
/*
function render(data) {
    var header = data.conditional ? <div /> : null;
    var collection = data.items.map((item) => {
        return <li key={item.id} class={item.className}>{item.name}</li>;
    });

    return <div id="container">
        {header}
        <ul>{collection}</ul>
        <p {...data.props}>Some features</p>
    </div>;
}
*/
module.exports.render = render;
