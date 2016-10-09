// adjust the height the menu when it's open

$(".leaflet-top.leaflet-left").height("100%");
var menuContentsHeight = $(".menu-container").height() - $("#menu-header").height();
$("#menu-contents").height(menuContentsHeight);

//var windowWidth = $(document).width(); // <- buggy in firefox mobile
windowWidth = $("#navbar-container").width();
var bigScreenLimit = 700;
//2$("#menu-header-2").append(windowWidth)
if(windowWidth < bigScreenLimit){

    // note: firefox doesn't like all numbers
    $("#menu-contents").width(windowWidth-52);
}