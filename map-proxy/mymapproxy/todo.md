1) save the tiles in the "file" backend (one file per individual tile) and create the mbtiles after that using mb-util: 

mb-util --scheme=tms --image_format=png cache_data/COS_EPSG3857 xxx.mbtiles

note: we can't create the mbtiles file directly from map-proxy because there is some bug in sqlite3

2) create a new webmap in the prac dashboard; it should have the exact same name of the mbtiles; remove all styling and the the countries layers

3) add to the menu

4) create the legend
