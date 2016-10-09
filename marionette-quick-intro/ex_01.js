
// define a new model class; all the properties in the options object will be placed in the prototype

var OfferM = Backbone.Model.extend({

	// called when an instance of this model is created
	initialize: function(){
	},

	// default value for the model's attributes
	defaults: {
		title: "no title",
		description: "no description"
	},

	// a custom method
	getUpperTitle: function(){
		var title = this.get("title");
		return title.toUpperCase();
	}
});

// create an instance of the model; the options object here is used to initialize the model's attributes
var offerM = new OfferM({
	title: "triplo",
	description: "quarto triplo com vista para o mar"
});


// =========================================


// define a view class (ItemView)

var offerTpl = _.template("<h1><%= title %></h1>" + 
							"<div class='desc'><%= description %></div>");

var OfferIV = Marionette.ItemView.extend({

	// the view has a container element created automatically
	tagName: "div",  // not needed because this is the default tagName

	className: "offer-container some-other-class",

	attributes: {
		"style": "border: solid; width: 400px;",
		"data-xyz": "abc"
	},

	// the template function would usually be stored in external .html files and we would use tools like grunt
	// to automatically make the template pre-compilation
	template: offerTpl,

	// declare the events for this view; jquery event delegation will be used, that is, the event below will be treated using the form ".on('click', '.desc', 'clickDescription')"
	// more info: https://learn.jquery.com/events/event-delegation/
	events: {
		"click .desc": "clickDescription"
	},

	// the event callback receives the jquery event object (http://api.jquery.com/category/events/event-object/);
	// so we can access the clicked element using $(ev.target) / $(ev.currentTarget) or use utilities like
	// preventDefault()

	// NOTE: when the callback is executed, "this" will be the marionette view (not the DOM element that was clicked, as would happen if we used jquery directly)
	clickDescription: function(ev){
		console.log("the offer description was clicked");
	}
});


// ==============================================

// create a region;
var mainRegion = new Marionette.Region({
	el: "#main-region"
});

// create an instance of the view and show it the region
var offerIV = new OfferIV({
	model: offerM
});

mainRegion.show(offerIV);

