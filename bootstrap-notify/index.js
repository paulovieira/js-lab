// usage examples for the bootstrap-notify plugin
// https://github.com/mouse0270/bootstrap-notify

$.notifyDefaults({
	type: 'info',
	delay: 0,
	template: `
<div data-notify="container" style="width: 25%; padding: 15px; margin-bottom: 20px;" class="alert-{0}" >
	<span style="display: none" data-notify="dismiss"></span>
	<span data-notify="title">{1}</span>
	<span data-notify="message">{2}</span>
	<div class="progress" data-notify="progressbar">
		<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 50%;"></div>
	</div>
</div>
	`.trim(),
	animate: {
		enter: 'animated fadeInDown',
		exit: 'animated fadeOut'
	}

});


// example 1 - basic, close automatically

/*
$.notify({
	title: 'the title',
	message: 'lorem ipsum',
}, {
	type: 'info',  // other types: 'warning', 'danger'
	delay: 1000,
});
*/


// example 2 - basic, manual close

/*
$.notify({
	title: 'the title',
	message: 'lorem ipsum',
}, {
	//type: ...,
	//delay: ...,
});

setTimeout(() => {

	$.notifyClose()

}, 2000)
*/


// example 3 - update the message; we must use a reference to the notification instance
/*
var n1 = $.notify({
	title: 'the title',
	message: 'lorem ipsum',
}, {
	//type: ...,
	//delay: ...,
});

setTimeout(() => {

	n1.update({
		message: 'lorem ipsum has been updated',
	})

}, 1000)
*/


// example 4 - update the message and type
/*
var n1 = $.notify({
	title: 'the title',
	message: 'lorem ipsum - info',
}, {
	//type: ...,
	//delay: ...,
});

setTimeout(() => {

	n1.update({
		message: 'lorem ipsum has been updated - now with warning',
		type: 'warning'
	})

}, 1000)
*/


// example 5 - show 2 notifications, close only 1 of them (without references)
/*
$.notify({
	title: 'the title',
	message: 'lorem ipsum info',
}, {
	type: 'info'
});


setTimeout(() => {

	$.notify({
		title: 'the title',
		message: 'lorem ipsum warning',
	}, {
		type: 'warning'
	});

}, 1000);

setTimeout(() => {

	$.notifyClose('info')

}, 2500);
*/


// example 6 - show 2 notifications, close only 1 of them (now using references and the 'close' method)

var n1 = $.notify({
	title: 'the title',
	message: 'lorem ipsum info 1',
}, {
	type: 'info'
});


var n2;
setTimeout(() => {

	n2 = $.notify({
		title: 'the title',
		message: 'lorem ipsum info 2',
	}, {
		type: 'info'
	});

}, 1000);

setTimeout(() => {

	n1.close()

}, 2500);

