var h = require('virtual-dom/h');

function render(data) {
    return h('span', '.greeting', ['Hello ' + data.firstName, 'Godbye ' + data.lastName]);
}
debugger;
var x = render({
    firstName: "paulo",
    lastName: "vieira"
});

var y = 1;