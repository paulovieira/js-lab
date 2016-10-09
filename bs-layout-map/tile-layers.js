var minzoom = 7;
var maxzoom = 13;
var center = [-16.95, 32.7, 10];

var tileJson = {};

tileJson.mapquest = {
    minzoom: minzoom,
    maxzoom: maxzoom,
    center: center,
    tiles: [
        "http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg"
    ],
};

tileJson.freguesias = {
    minzoom: minzoom,
    maxzoom: maxzoom,
    center: center,
    tiles: [
        "http://clima-madeira.pt/api/v1/tiles/mapa-base-freguesias/{z}/{x}/{y}.png"
    ],
};


tileJson.one = {
    minzoom: minzoom,
    maxzoom: maxzoom,
    center: center,
    tiles: [
        "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg"
    ],
};

tileJson.two = {
    minzoom: minzoom,
    maxzoom: maxzoom,
    center: center,
    tiles: [
        "http://clima-madeira.pt/api/v1/tiles/deslizamento-de-vertentes/{z}/{x}/{y}.png"
    ],
    legend: "<div class='my-legend'> <div class='legend-title'>Sesceptibilidade à ocorrência<br /> de deslizamentos superiores<br /> a 100 m2</div> <div class='legend-scale'> <!-- BEGIN COLORS | BEGIN COLORS | BEGIN COLORS --> <ul class='legend-labels'> <li><span style='background:#2c7bb6;'></span> Nula ou muito reduzida </li> <li><span style='background:#abd9e9;'></span> Reduzida </li> <li><span style='background:#ffffbf;'></span> Moderada </li> <li><span style='background:#fdae61;'></span> Elevada </li> <li><span style='background:#d7191c;'></span> Muito elevada </li> </ul> <!-- END COLORS | END COLORS | END COLORS --> </div> <!-- BEGIN SOURCE | BEGIN SOURCE | BEGIN SOURCE --> <div class='legend-source'> Source: Filipe, P 2015 </div> <!-- END SOURCE | END SOURCE | END SOURCE --> </div> <style type='text/css'> .my-legend .legend-title { text-align: left; margin-bottom: 5px; font-weight: bold; font-size: 90%; } .my-legend .legend-scale ul { margin: 0; margin-bottom: 5px; padding: 0; float: left; list-style: none; } .my-legend .legend-scale ul li { font-size: 80%; list-style: none; margin-left: 0; line-height: 18px; margin-bottom: 2px; } .my-legend ul.legend-labels li span { display: block; float: left; height: 16px; width: 30px; margin-right: 5px; margin-left: 0; border: 1px solid #999; } .my-legend .legend-source { font-size: 70%; color: #999; clear: both; } .my-legend a { color: #777; } </style>",

};

tileJson.three = {
    minzoom: minzoom,
    maxzoom: maxzoom,
    center: center,
    tiles: [
        "http://clima-madeira.pt/api/v1/tiles/ifram/{z}/{x}/{y}.png"
    ],
    legend: "<div class='my-legend'> <div class='legend-title'>IFRAM</div> <div class='legend-scale'> <!-- BEGIN COLORS | BEGIN COLORS | BEGIN COLORS --> <ul class='legend-labels'> <li><span style='background:#1b9e77;'></span> UB </li> <li><span style='background:#d95f02;'></span> MP </li> <li><span style='background:#7570b3;'></span> HH </li> <li><span style='background:#e7298a;'></span> FL </li> <li><span style='background:#66a61e;'></span> AG </li> <li><span style='background:#e6ab02;'></span> IP </li> </ul> <!-- END COLORS | END COLORS | END COLORS --> </div> <!-- BEGIN SOURCE | BEGIN SOURCE | BEGIN SOURCE --> <div class='legend-source'> Fonte: <a href='#'>Inventário Florestal</a> </div> <!-- END SOURCE | END SOURCE | END SOURCE --> </div> <style type='text/css'> .my-legend .legend-title { text-align: left; margin-bottom: 5px; font-weight: bold; font-size: 90%; } .my-legend .legend-scale ul { margin: 0; margin-bottom: 5px; padding: 0; float: left; list-style: none; } .my-legend .legend-scale ul li { font-size: 80%; list-style: none; margin-left: 0; line-height: 18px; margin-bottom: 2px; } .my-legend ul.legend-labels li span { display: block; float: left; height: 16px; width: 30px; margin-right: 5px; margin-left: 0; border: 1px solid #999; } .my-legend .legend-source { font-size: 70%; color: #999; clear: both; } .my-legend a { color: #777; } </style>",
};

tileJson.four = {
    minzoom: minzoom,
    maxzoom: maxzoom,
    center: center,
    tiles: [
        "http://clima-madeira.pt/api/v1/tiles/temperatura-de-referencia_c00c61/{z}/{x}/{y}.png"
    ],
    legend: "<div class='my-legend'> <div class='legend-title'>Precipitação de referência (mm/dia) </div> <div class='legend-scale'> <!-- BEGIN COLORS | BEGIN COLORS | BEGIN COLORS --> <ul class='legend-labels'> <li><span style='background:#f7fbff;'></span> 0.58 – 1.90 </li> <li><span style='background:#deebf7;'></span> 1.90 – 3.21 </li> <li><span style='background:#c6dbef;'></span> 3.21 – 4.52 </li> <li><span style='background:#9ecae1;'></span> 4.52 – 5.83 </li> <li><span style='background:#6baed6;'></span> 5.83 – 7.15 </li> <li><span style='background:#4292c6;'></span> 7.15 – 8.46 </li> <li><span style='background:#2171b5;'></span> 8.46 – 9.77 </li> <li><span style='background:#084594;'></span> 9.77 – 11.09 </li> </ul> <!-- END COLORS | END COLORS | END COLORS --> </div> <!-- BEGIN SOURCE | BEGIN SOURCE | BEGIN SOURCE --> <div class='legend-source'> Fonte: DROTA/CLIMA-Madeira </div> <!-- END SOURCE | END SOURCE | END SOURCE --> </div> <style type='text/css'> .my-legend .legend-title { text-align: left; margin-bottom: 5px; font-weight: bold; font-size: 90%; } .my-legend .legend-scale ul { margin: 0; margin-bottom: 5px; padding: 0; float: left; list-style: none; } .my-legend .legend-scale ul li { font-size: 80%; list-style: none; margin-left: 0; line-height: 18px; margin-bottom: 2px; } .my-legend ul.legend-labels li span { display: block; float: left; height: 16px; width: 30px; margin-right: 5px; margin-left: 0; border: 1px solid #999; } .my-legend .legend-source { font-size: 70%; color: #999; clear: both; } .my-legend a { color: #777; } </style> "

};


var tileLayer = {};

tileLayer.mapquest   = L.mapbox.tileLayer(tileJson.mapquest);
tileLayer.freguesias = L.mapbox.tileLayer(tileJson.freguesias);
tileLayer.one        = L.mapbox.tileLayer(tileJson.one);
tileLayer.two        = L.mapbox.tileLayer(tileJson.two);
tileLayer.three      = L.mapbox.tileLayer(tileJson.three);
tileLayer.four       = L.mapbox.tileLayer(tileJson.four);
