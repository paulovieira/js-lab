
// define model
var OfferM = Backbone.Model.extend({

	initialize: function(){
	},

	defaults: {
		title: "no title",
		description: "no description",
		details: "no details"
	}
});

var offerM = new OfferM({
	title: "triplo",
	description: "quarto triplo com vista para o mar",
	details: "all the details here"
});


// define views:

//first the details subview (shown dinamically when the button is clicked)
var DetailsIV = Marionette.ItemView.extend({
	attributes: {
		"style": "border: solid red; width: 300px;",
	},
	template: _.template("<i>Details: <%= details %></i>")
});


// then the offer view, very similar the example 1
var offerTpl = _.template("<h1><%= title %></h1>" + 
							"<div class='desc'><%= description %></div>" + 
							"<button class='more-info-btn'>show details</button>" + 
							"<div class='more-info-region'></div>");

var OfferLV = Marionette.LayoutView.extend({
	attributes: {
		"style": "border: solid; width: 400px;",
	},

	template: offerTpl,

	events: {
		"click .more-info-btn": "toggleMoreInfo"
	},

	regions: {
		detailsRegion: ".more-info-region"
	},

	toggleMoreInfo: function(ev){
		if(!this.detailsRegion.hasView()){
			// show a subview in the view's region 
			var detailsIV = new DetailsIV({
				model: this.model
			});
			this.detailsRegion.show(detailsIV);

			// 'this.$(selector)' is a shortcut for 'this.$el.find(selector)'
			this.$(".more-info-btn").html("close details");
		}
		else{
			this.detailsRegion.empty();
			this.$(".more-info-btn").html("show details");
		}
	
	}
});


// ==============================================

// create a region
/*
var mainRegion = new Marionette.Region({
	el: "#main-region"
});
*/

// create an instance of the view and show it the region
var offerLV = new OfferLV({
	model: offerM
});

//mainRegion.show(offerLV);

