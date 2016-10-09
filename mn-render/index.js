Mn.addRenderer("nunjucks", {

  isDefaultRenderer: true,
  render: function(template, data) {
    //debugger;
    if (!template) {
      throw new Marionette.Error({
        name: 'TemplateNotFoundError',
        message: 'Cannot render the template since its false, null or undefined.'
      });
    }

    var output = "";

    try{
      output = nunjucks.render(template, data);
      return output;
    }
    catch(err){
      throw new Marionette.Error({
        name: 'NunjucksError',
        message: err.message
      });
    }

  }
});

//Mn.setDefaultRenderer("nunjucks");

console.log("xyz");

var underscoreTemplates = {};
underscoreTemplates.helloWorld = _.template("Hello <%= libName %>!");

var myModel = new Backbone.Model({
    libName: "underscore"
});

var HelloWorldIV = Mn.ItemView.extend({
    model: myModel,
    template: underscoreTemplates.helloWorld,
    templateOptions: {
        engine: "underscore"
    }
});

var helloWorldIV = new HelloWorldIV({


});

helloWorldIV.render();

/*
***************/

var HelloWorldNunjucksIV = Mn.ItemView.extend({
    //template: "nunjucks-templates/hello-world-tpl.html",
    // templateOptions: {
    //     engine: "nunjucks"
    // }
});

myModel.set("libName", "nunjucks");
var helloWorldNunjucksIV = new HelloWorldNunjucksIV({
    model: myModel,
    template: "nunjucks-templates/hello-world-tpl.html",
});

helloWorldNunjucksIV.render();
