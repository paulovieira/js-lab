novo algoritmo:


1) use gdal_translate (not gdalwarp) to convert the raster to a new raster, with the projection being the local projection (specific to the group)

gdal_translate -co COMPRESS=LZW -stats -a_srs EPSG:3063  rain.tif 3063/rain.tif

2) call gdal_polygonize.js, as before

bash polygonize.sh nnnn


3) convert the shape to 4326 and append to a postgis table - do not use ogr2ogr because we get a small displacement; use postgis instead

shp2pgsql -s 2188:4326 cor/rain_annual.shp geo.rain_annual  |  psql --dbname=150608
shp2pgsql -a -s 3063:4326 pic/rain_annual.shp geo.rain_annual  |  psql --dbname=150608
...
shp2pgsql -a -s 3062:4326 smg/rain_annual.shp geo.rain_annual  |  psql --dbname=150608



shp2pgsql -s 3857:4326 cor/rain_annual.shp geo.rain_annual  |  psql --dbname=150608
shp2pgsql -a -s 3063:4326 pic/rain_annual.shp geo.rain_annual  |  psql --dbname=150608


4) get the merged map as shape

pgsql2shp -f rain_annual_4326_postgis.shp  150608 geo.rain_annual 



pico
gdal_translate -co COMPRESS=LZW -stats -a_srs EPSG:3063  tmin_annual.min.tif 3063/tmin_annual_min.tif

shp2pgsql -s 3063:4326 tmin_annual_min/tmin_annual_min_3063.shp geo.tmin_annual_min  |  psql --dbname=150608
pgsql2shp -f tmin_annual_min/tmin_annual_min_4326.shp  150608 geo.tmin_annual_min
psql -c "drop table geo.tmin_annual_min" 150608 

-- drop the no value geometries
select * from geo.tmin_annual_min order by value asc

---




pgsql2shp -f <path to output shapefile> -h <hostname> -u <username> -P <password> databasename "<query>"

pgsql2shp -f rain_annual_4326_postgis.shp  150608 geo.rain_annual 


  




Example:
gdalinfo input.tif | grep 32625
gdalwarp -t_srs EPSG:2188 -dstnodata -999999 input.tif 2188/temp/output.tif
gdal_translate -co COMPRESS=LZW  2188/temp/output.tif  2188/output.tif


gdalwarp -t_srs EPSG:2188 -dstnodata -999999 input.tif 2188/temp/output.tif
-te 655302 4389652 670402 4401752


gdal_translate -co COMPRESS=LZW -stats -a_srs EPSG:3063  rain.tif 3063/rain.tif









GRUPO OCIDENTAL - Corvo, Flores

gdalinfo rain_annual.tif | grep 32625
gdalinfo rhmax_annual.tif | grep 32625
gdalinfo rhmin_annual.tif | grep 32625
gdalinfo tmax_annual.max.tif | grep 32625
gdalinfo tmax_annual.tif | grep 32625
gdalinfo tmed_annual.tif | grep 32625
gdalinfo tmin_annual.min.tif | grep 32625
gdalinfo tmin_annual.tif | grep 32625


rm -rf 2188
mkdir 2188
mkdir 2188/temp
gdalwarp -t_srs EPSG:2188 -dstnodata -999999  rain_annual.tif  2188/temp/rain_annual.tif
gdalwarp -t_srs EPSG:2188 -dstnodata -999999  rhmax_annual.tif  2188/temp/rhmax_annual.tif
gdalwarp -t_srs EPSG:2188 -dstnodata -999999  rhmin_annual.tif  2188/temp/rhmin_annual.tif
gdalwarp -t_srs EPSG:2188 -dstnodata -999999  tmax_annual.max.tif  2188/temp/tmax_annual.max.tif
gdalwarp -t_srs EPSG:2188 -dstnodata -999999  tmax_annual.tif  2188/temp/tmax_annual.tif
gdalwarp -t_srs EPSG:2188 -dstnodata -999999  tmed_annual.tif  2188/temp/tmed_annual.tif
gdalwarp -t_srs EPSG:2188 -dstnodata -999999  tmin_annual.min.tif  2188/temp/tmin_annual.min.tif
gdalwarp -t_srs EPSG:2188 -dstnodata -999999  tmin_annual.tif  2188/temp/tmin_annual.tif

gdal_translate -co COMPRESS=LZW  2188/temp/rain_annual.tif  2188/rain_annual.tif
gdal_translate -co COMPRESS=LZW  2188/temp/rhmax_annual.tif  2188/rhmax_annual.tif
gdal_translate -co COMPRESS=LZW  2188/temp/rhmin_annual.tif  2188/rhmin_annual.tif
gdal_translate -co COMPRESS=LZW  2188/temp/tmax_annual.max.tif  2188/tmax_annual.max.tif
gdal_translate -co COMPRESS=LZW  2188/temp/tmax_annual.tif  2188/tmax_annual.tif
gdal_translate -co COMPRESS=LZW  2188/temp/tmed_annual.tif  2188/tmed_annual.tif
gdal_translate -co COMPRESS=LZW  2188/temp/tmin_annual.min.tif  2188/tmin_annual.min.tif
gdal_translate -co COMPRESS=LZW  2188/temp/tmin_annual.tif  2188/tmin_annual.tif
rm -rf 2188/temp



Option A: round to 0.25


export INPUT=rain_annual
export DECIMAL_PLACES_TO_KEEP=100
export ROUND_PARAM=0.25

gdal_calc.py --overwrite \
-A $INPUT.tif \
--outfile=$INPUT-temp.tif \
--calc="1.0*$ROUND_PARAM*floor((1./$ROUND_PARAM)*A)*$DECIMAL_PLACES_TO_KEEP"

rm -rf $INPUT 
mkdir $INPUT
gdal_polygonize.py -mask $INPUT.tif  $INPUT-temp.tif -b 1 -f "ESRI Shapefile" $INPUT/$INPUT.shp $INPUT value_temp

cd $INPUT
ogrinfo $INPUT.shp -sql "ALTER TABLE $INPUT ADD COLUMN value float"
ogrinfo $INPUT.shp -sql "UPDATE $INPUT SET value=value_temp*1.0/$DECIMAL_PLACES_TO_KEEP*1.0" -dialect SQLite
ogrinfo $INPUT.shp -sql "ALTER TABLE $INPUT DROP COLUMN value_temp"



Option B: round to the nearest integer

export INPUT=rain_annual
export ROUND_PARAM=1.0
gdal_calc.py --overwrite  \
-A $INPUT.tif \
--outfile=$INPUT-temp.tif \
--calc="$ROUND_PARAM*floor((1./$ROUND_PARAM)*A)"

rm -rf $INPUT 
mkdir $INPUT
gdal_polygonize.py -mask $INPUT.tif  $INPUT-temp.tif -b 1 -f "ESRI Shapefile" $INPUT/$INPUT.shp $INPUT value





GRUPO CENTRAL - Pico, Faial, S. Jorge, Terceira, Graciosa

rm *.xml
gdalinfo rain_annual.tif | grep 32626
gdalinfo rhmax_annual.tif | grep 32626
gdalinfo rhmin_annual.tif | grep 32626
gdalinfo tmax_annual.max.tif | grep 32626
gdalinfo tmax_annual.tif | grep 32626
gdalinfo tmed_annual.tif | grep 32626
gdalinfo tmin_annual.min.tif | grep 32626
gdalinfo tmin_annual.tif | grep 32626


rm -rf 2189 
mkdir 2189
mkdir 2189/temp
gdalwarp -t_srs EPSG:2189 -dstnodata -999999  rain_annual.tif  2189/temp/rain_annual.tif
gdalwarp -t_srs EPSG:2189 -dstnodata -999999  rhmax_annual.tif  2189/temp/rhmax_annual.tif
gdalwarp -t_srs EPSG:2189 -dstnodata -999999  rhmin_annual.tif  2189/temp/rhmin_annual.tif
gdalwarp -t_srs EPSG:2189 -dstnodata -999999  tmax_annual.max.tif  2189/temp/tmax_annual.max.tif
gdalwarp -t_srs EPSG:2189 -dstnodata -999999  tmax_annual.tif  2189/temp/tmax_annual.tif
gdalwarp -t_srs EPSG:2189 -dstnodata -999999  tmed_annual.tif  2189/temp/tmed_annual.tif
gdalwarp -t_srs EPSG:2189 -dstnodata -999999  tmin_annual.min.tif  2189/temp/tmin_annual.min.tif
gdalwarp -t_srs EPSG:2189 -dstnodata -999999  tmin_annual.tif  2189/temp/tmin_annual.tif

gdal_translate -co COMPRESS=LZW  2189/temp/rain_annual.tif  2189/rain_annual.tif
gdal_translate -co COMPRESS=LZW  2189/temp/rhmax_annual.tif  2189/rhmax_annual.tif
gdal_translate -co COMPRESS=LZW  2189/temp/rhmin_annual.tif  2189/rhmin_annual.tif
gdal_translate -co COMPRESS=LZW  2189/temp/tmax_annual.max.tif  2189/tmax_annual.max.tif
gdal_translate -co COMPRESS=LZW  2189/temp/tmax_annual.tif  2189/tmax_annual.tif
gdal_translate -co COMPRESS=LZW  2189/temp/tmed_annual.tif  2189/tmed_annual.tif
gdal_translate -co COMPRESS=LZW  2189/temp/tmin_annual.min.tif  2189/tmin_annual.min.tif
gdal_translate -co COMPRESS=LZW  2189/temp/tmin_annual.tif  2189/tmin_annual.tif
rm -rf 2189/temp

rm -rf 3063
mkdir 3063
mkdir 3063/temp
gdalwarp -t_srs EPSG:3063 -dstnodata -999999  rain_annual.tif  3063/temp/rain_annual.tif
gdalwarp -t_srs EPSG:3063 -dstnodata -999999  rhmax_annual.tif  3063/temp/rhmax_annual.tif
gdalwarp -t_srs EPSG:3063 -dstnodata -999999  rhmin_annual.tif  3063/temp/rhmin_annual.tif
gdalwarp -t_srs EPSG:3063 -dstnodata -999999  tmax_annual.max.tif  3063/temp/tmax_annual.max.tif
gdalwarp -t_srs EPSG:3063 -dstnodata -999999  tmax_annual.tif  3063/temp/tmax_annual.tif
gdalwarp -t_srs EPSG:3063 -dstnodata -999999  tmed_annual.tif  3063/temp/tmed_annual.tif
gdalwarp -t_srs EPSG:3063 -dstnodata -999999  tmin_annual.min.tif  3063/temp/tmin_annual.min.tif
gdalwarp -t_srs EPSG:3063 -dstnodata -999999  tmin_annual.tif  3063/temp/tmin_annual.tif

gdal_translate -co COMPRESS=LZW  3063/temp/rain_annual.tif  3063/rain_annual.tif
gdal_translate -co COMPRESS=LZW  3063/temp/rhmax_annual.tif  3063/rhmax_annual.tif
gdal_translate -co COMPRESS=LZW  3063/temp/rhmin_annual.tif  3063/rhmin_annual.tif
gdal_translate -co COMPRESS=LZW  3063/temp/tmax_annual.max.tif  3063/tmax_annual.max.tif
gdal_translate -co COMPRESS=LZW  3063/temp/tmax_annual.tif  3063/tmax_annual.tif
gdal_translate -co COMPRESS=LZW  3063/temp/tmed_annual.tif  3063/tmed_annual.tif
gdal_translate -co COMPRESS=LZW  3063/temp/tmin_annual.min.tif  3063/tmin_annual.min.tif
gdal_translate -co COMPRESS=LZW  3063/temp/tmin_annual.tif  3063/tmin_annual.tif
rm -rf 3063/temp





GRUPO ORIENTAL - S. Miguel, Sta. Maria

gdalinfo rain_annual.tif | grep 32626
gdalinfo rhmax_annual.tif | grep 32626
gdalinfo rhmin_annual.tif | grep 32626
gdalinfo tmax_annual.max.tif | grep 32626
gdalinfo tmax_annual.tif | grep 32626
gdalinfo tmed_annual.tif | grep 32626
gdalinfo tmin_annual.min.tif | grep 32626
gdalinfo tmin_annual.tif | grep 32626


rm -rf 2190
mkdir 2190
mkdir 2190/temp
gdalwarp -t_srs EPSG:2190 -dstnodata -999999  rain_annual.tif  2190/temp/rain_annual.tif
gdalwarp -t_srs EPSG:2190 -dstnodata -999999  rhmax_annual.tif  2190/temp/rhmax_annual.tif
gdalwarp -t_srs EPSG:2190 -dstnodata -999999  rhmin_annual.tif  2190/temp/rhmin_annual.tif
gdalwarp -t_srs EPSG:2190 -dstnodata -999999  tmax_annual.max.tif  2190/temp/tmax_annual.max.tif
gdalwarp -t_srs EPSG:2190 -dstnodata -999999  tmax_annual.tif  2190/temp/tmax_annual.tif
gdalwarp -t_srs EPSG:2190 -dstnodata -999999  tmed_annual.tif  2190/temp/tmed_annual.tif
gdalwarp -t_srs EPSG:2190 -dstnodata -999999  tmin_annual.min.tif  2190/temp/tmin_annual.min.tif
gdalwarp -t_srs EPSG:2190 -dstnodata -999999  tmin_annual.tif  2190/temp/tmin_annual.tif

gdal_translate -co COMPRESS=LZW  2190/temp/rain_annual.tif  2190/rain_annual.tif
gdal_translate -co COMPRESS=LZW  2190/temp/rhmax_annual.tif  2190/rhmax_annual.tif
gdal_translate -co COMPRESS=LZW  2190/temp/rhmin_annual.tif  2190/rhmin_annual.tif
gdal_translate -co COMPRESS=LZW  2190/temp/tmax_annual.max.tif  2190/tmax_annual.max.tif
gdal_translate -co COMPRESS=LZW  2190/temp/tmax_annual.tif  2190/tmax_annual.tif
gdal_translate -co COMPRESS=LZW  2190/temp/tmed_annual.tif  2190/tmed_annual.tif
gdal_translate -co COMPRESS=LZW  2190/temp/tmin_annual.min.tif  2190/tmin_annual.min.tif
gdal_translate -co COMPRESS=LZW  2190/temp/tmin_annual.tif  2190/tmin_annual.tif
rm -rf 2190/temp

rm -rf 3062
mkdir 3062
mkdir 3062/temp
gdalwarp -t_srs EPSG:3062 -dstnodata -999999  rain_annual.tif  3062/temp/rain_annual.tif
gdalwarp -t_srs EPSG:3062 -dstnodata -999999  rhmax_annual.tif  3062/temp/rhmax_annual.tif
gdalwarp -t_srs EPSG:3062 -dstnodata -999999  rhmin_annual.tif  3062/temp/rhmin_annual.tif
gdalwarp -t_srs EPSG:3062 -dstnodata -999999  tmax_annual.max.tif  3062/temp/tmax_annual.max.tif
gdalwarp -t_srs EPSG:3062 -dstnodata -999999  tmax_annual.tif  3062/temp/tmax_annual.tif
gdalwarp -t_srs EPSG:3062 -dstnodata -999999  tmed_annual.tif  3062/temp/tmed_annual.tif
gdalwarp -t_srs EPSG:3062 -dstnodata -999999  tmin_annual.min.tif  3062/temp/tmin_annual.min.tif
gdalwarp -t_srs EPSG:3062 -dstnodata -999999  tmin_annual.tif  3062/temp/tmin_annual.tif

gdal_translate -co COMPRESS=LZW  3062/temp/rain_annual.tif  3062/rain_annual.tif
gdal_translate -co COMPRESS=LZW  3062/temp/rhmax_annual.tif  3062/rhmax_annual.tif
gdal_translate -co COMPRESS=LZW  3062/temp/rhmin_annual.tif  3062/rhmin_annual.tif
gdal_translate -co COMPRESS=LZW  3062/temp/tmax_annual.max.tif  3062/tmax_annual.max.tif
gdal_translate -co COMPRESS=LZW  3062/temp/tmax_annual.tif  3062/tmax_annual.tif
gdal_translate -co COMPRESS=LZW  3062/temp/tmed_annual.tif  3062/tmed_annual.tif
gdal_translate -co COMPRESS=LZW  3062/temp/tmin_annual.min.tif  3062/tmin_annual.min.tif
gdal_translate -co COMPRESS=LZW  3062/temp/tmin_annual.tif  3062/tmin_annual.tif
rm -rf 3062/temp










merge

mkdir SHP/Azo_Flo
mv Raster/Azo_Flo/1990/Stats/2188/*_shp_2188 ./SHP/Azo_Flo/


mkdir SHP/Azo_Fai
mkdir SHP/Azo_Gra
mkdir SHP/Azo_Pic
mkdir SHP/Azo_Sjo
mkdir SHP/Azo_Sma
mkdir SHP/Azo_Smg
mkdir SHP/Azo_Ter


mv Raster/Azo_Flo/1990/Stats/2188/*_2188 ./SHP/Azo_Flo/
mv Raster/Azo_Cor/1990/Stats/2188/*_2188 ./SHP/Azo_Cor/
mv Raster/Azo_Sma/1990/Stats/3062/*_3062 ./SHP/Azo_Sma/
mv Raster/Azo_Smg/1990/Stats/3062/*_3062 ./SHP/Azo_Smg/
mv Raster/Azo_Pic/1990/Stats/3063/*_3063 ./SHP/Azo_Pic/
mv Raster/Azo_Fai/1990/Stats/3063/*_3063 ./SHP/Azo_Fai/
mv Raster/Azo_Sjo/1990/Stats/3063/*_3063 ./SHP/Azo_Sjo/
mv Raster/Azo_Ter/1990/Stats/3063/*_3063 ./SHP/Azo_Ter/
mv Raster/Azo_Gra/1990/Stats/3063/*_3063 ./SHP/Azo_Gra/





export VARIABLE="rain_annual"
mkdir ${VARIABLE}_4326
ogr2ogr -t_srs "EPSG:4326" ${VARIABLE}_4326/${VARIABLE}.shp ${VARIABLE}_2188/${VARIABLE}.shp

export VARIABLE="rhmax_annual"
mkdir ${VARIABLE}_4326
ogr2ogr -t_srs "EPSG:4326" ${VARIABLE}_4326/${VARIABLE}.shp ${VARIABLE}_2188/${VARIABLE}.shp

export VARIABLE="rhmin_annual"
mkdir ${VARIABLE}_4326
ogr2ogr -t_srs "EPSG:4326" ${VARIABLE}_4326/${VARIABLE}.shp ${VARIABLE}_2188/${VARIABLE}.shp

export VARIABLE="tmax_annual"
mkdir ${VARIABLE}_4326
ogr2ogr -t_srs "EPSG:4326" ${VARIABLE}_4326/${VARIABLE}.shp ${VARIABLE}_2188/${VARIABLE}.shp

export VARIABLE="tmax_annual_max"
mkdir ${VARIABLE}_4326
ogr2ogr -t_srs "EPSG:4326" ${VARIABLE}_4326/${VARIABLE}.shp ${VARIABLE}_2188/${VARIABLE}.shp

export VARIABLE="tmed_annual"
mkdir ${VARIABLE}_4326
ogr2ogr -t_srs "EPSG:4326" ${VARIABLE}_4326/${VARIABLE}.shp ${VARIABLE}_2188/${VARIABLE}.shp

export VARIABLE="tmin_annual"
mkdir ${VARIABLE}_4326
ogr2ogr -t_srs "EPSG:4326" ${VARIABLE}_4326/${VARIABLE}.shp ${VARIABLE}_2188/${VARIABLE}.shp

export VARIABLE="tmin_annual_min"
mkdir ${VARIABLE}_4326
ogr2ogr -t_srs "EPSG:4326" ${VARIABLE}_4326/${VARIABLE}.shp ${VARIABLE}_2188/${VARIABLE}.shp







export VARIABLE="rain_annual"
mkdir ${VARIABLE}_4326
ogr2ogr -t_srs "EPSG:4326" ${VARIABLE}_4326/${VARIABLE}.shp ${VARIABLE}_3063/${VARIABLE}.shp

export VARIABLE="rhmax_annual"
mkdir ${VARIABLE}_4326
ogr2ogr -t_srs "EPSG:4326" ${VARIABLE}_4326/${VARIABLE}.shp ${VARIABLE}_3063/${VARIABLE}.shp

export VARIABLE="rhmin_annual"
mkdir ${VARIABLE}_4326
ogr2ogr -t_srs "EPSG:4326" ${VARIABLE}_4326/${VARIABLE}.shp ${VARIABLE}_3063/${VARIABLE}.shp

export VARIABLE="tmax_annual"
mkdir ${VARIABLE}_4326
ogr2ogr -t_srs "EPSG:4326" ${VARIABLE}_4326/${VARIABLE}.shp ${VARIABLE}_3063/${VARIABLE}.shp

export VARIABLE="tmax_annual_max"
mkdir ${VARIABLE}_4326
ogr2ogr -t_srs "EPSG:4326" ${VARIABLE}_4326/${VARIABLE}.shp ${VARIABLE}_3063/${VARIABLE}.shp

export VARIABLE="tmed_annual"
mkdir ${VARIABLE}_4326
ogr2ogr -t_srs "EPSG:4326" ${VARIABLE}_4326/${VARIABLE}.shp ${VARIABLE}_3063/${VARIABLE}.shp

export VARIABLE="tmin_annual"
mkdir ${VARIABLE}_4326
ogr2ogr -t_srs "EPSG:4326" ${VARIABLE}_4326/${VARIABLE}.shp ${VARIABLE}_3063/${VARIABLE}.shp

export VARIABLE="tmin_annual_min"
mkdir ${VARIABLE}_4326
ogr2ogr -t_srs "EPSG:4326" ${VARIABLE}_4326/${VARIABLE}.shp ${VARIABLE}_3063/${VARIABLE}.shp








export VARIABLE="rain_annual"
mkdir _MERGED/${VARIABLE}
ogr2ogr -f "ESRI Shapefile" _MERGED/${VARIABLE}/${VARIABLE}.shp ./Azo_Cor/${VARIABLE}_4326/${VARIABLE}.shp
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Flo/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Fai/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Pic/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Sjo/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Gra/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Ter/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Smg/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Sma/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}


export VARIABLE="rhmax_annual"
mkdir _MERGED/${VARIABLE}
ogr2ogr -f "ESRI Shapefile" _MERGED/${VARIABLE}/${VARIABLE}.shp ./Azo_Cor/${VARIABLE}_4326/${VARIABLE}.shp
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Flo/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Fai/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Pic/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Sjo/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Gra/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Ter/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Smg/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Sma/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}


export VARIABLE="rhmin_annual"
mkdir _MERGED/${VARIABLE}
ogr2ogr -f "ESRI Shapefile" _MERGED/${VARIABLE}/${VARIABLE}.shp ./Azo_Cor/${VARIABLE}_4326/${VARIABLE}.shp
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Flo/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Fai/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Pic/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Sjo/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Gra/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Ter/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Smg/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Sma/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}


export VARIABLE="tmax_annual"
mkdir _MERGED/${VARIABLE}
ogr2ogr -f "ESRI Shapefile" _MERGED/${VARIABLE}/${VARIABLE}.shp ./Azo_Cor/${VARIABLE}_4326/${VARIABLE}.shp
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Flo/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Fai/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Pic/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Sjo/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Gra/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Ter/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Smg/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Sma/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}


export VARIABLE="tmax_annual_max"
mkdir _MERGED/${VARIABLE}
ogr2ogr -f "ESRI Shapefile" _MERGED/${VARIABLE}/${VARIABLE}.shp ./Azo_Cor/${VARIABLE}_4326/${VARIABLE}.shp
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Flo/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Fai/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Pic/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Sjo/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Gra/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Ter/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Smg/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Sma/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}


export VARIABLE="tmed_annual"
mkdir _MERGED/${VARIABLE}
ogr2ogr -f "ESRI Shapefile" _MERGED/${VARIABLE}/${VARIABLE}.shp ./Azo_Cor/${VARIABLE}_4326/${VARIABLE}.shp
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Flo/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Fai/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Pic/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Sjo/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Gra/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Ter/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Smg/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Sma/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}


export VARIABLE="tmin_annual"
mkdir _MERGED/${VARIABLE}
ogr2ogr -f "ESRI Shapefile" _MERGED/${VARIABLE}/${VARIABLE}.shp ./Azo_Cor/${VARIABLE}_4326/${VARIABLE}.shp
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Flo/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Fai/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Pic/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Sjo/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Gra/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Ter/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Smg/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Sma/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}


export VARIABLE="tmin_annual_min"
mkdir _MERGED/${VARIABLE}
ogr2ogr -f "ESRI Shapefile" _MERGED/${VARIABLE}/${VARIABLE}.shp ./Azo_Cor/${VARIABLE}_4326/${VARIABLE}.shp
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Flo/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Fai/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Pic/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Sjo/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Gra/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Ter/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Smg/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}
ogr2ogr -f "ESRI Shapefile" -update -append _MERGED/${VARIABLE}/${VARIABLE}.shp Azo_Sma/${VARIABLE}_4326/${VARIABLE}.shp -nln ${VARIABLE}




ogr2ogr -t_srs "EPSG:4326" _merged


ogr2ogr -t_srs "EPSG:4326" _merged/ArqAcores_GCentral_Troco_CAOP2015_4326.shp  ArqAcores_GCentral_Troco_CAOP2015.shp
ogr2ogr -t_srs "EPSG:4326" _merged/ArqAcores_GOcidental_Troco_CAOP2015_4326.shp  ArqAcores_GOcidental_Troco_CAOP2015.shp
ogr2ogr -t_srs "EPSG:4326" _merged/ArqAcores_GOriental_Troco_CAOP2015_4326.shp  ArqAcores_GOriental_Troco_CAOP2015.shp


ogr2ogr -f "ESRI Shapefile" ArqAcores_Troco_CAOP2015.shp ArqAcores_GOriental_Troco_CAOP2015_4326.shp
ogr2ogr -f "ESRI Shapefile" -update -append ArqAcores_Troco_CAOP2015.shp ArqAcores_GCentral_Troco_CAOP2015_4326.shp -nln ArqAcores_Troco_CAOP2015
ogr2ogr -f "ESRI Shapefile" -update -append ArqAcores_Troco_CAOP2015.shp ArqAcores_GOcidental_Troco_CAOP2015_4326.shp -nln ArqAcores_Troco_CAOP2015



ogr2ogr -t_srs "EPSG:2188" 2188/ArqAcores_GCentral_Troco_CAOP2015.shp  ArqAcores_GCentral_Troco_CAOP2015.shp
ogr2ogr -t_srs "EPSG:2188" 2188/ArqAcores_GOcidental_Troco_CAOP2015.shp  ArqAcores_GOcidental_Troco_CAOP2015.shp
ogr2ogr -t_srs "EPSG:2188" 2188/ArqAcores_GOriental_Troco_CAOP2015.shp  ArqAcores_GOriental_Troco_CAOP2015.shp






# MERGE Carta Ocupacao Solo 2007

ogr2ogr -t_srs "EPSG:4326" _merged/ArqAcores_GCentral_Troco_CAOP2015_4326.shp  ArqAcores_GCentral_Troco_CAOP2015.shp

ogr2ogr -t_srs "EPSG:4326"  4326/COSA2007_COR_4326.shp  COSA2007_COR.shp
ogr2ogr -t_srs "EPSG:4326"  4326/COSA2007_FLO_4326.shp  COSA2007_FLO.shp
ogr2ogr -t_srs "EPSG:4326"  4326/COSA2007_SMA_4326.shp  COSA2007_SMA.shp
ogr2ogr -t_srs "EPSG:4326"  4326/COSA2007_SMG_4326.shp  COSA2007_SMG.shp
ogr2ogr -t_srs "EPSG:4326"  4326/COSA2007_FAI_4326.shp  COSA2007_FAI.shp
ogr2ogr -t_srs "EPSG:4326"  4326/COSA2007_GRA_4326.shp  COSA2007_GRA.shp
ogr2ogr -t_srs "EPSG:4326"  4326/COSA2007_PIC_4326.shp  COSA2007_PIC.shp
ogr2ogr -t_srs "EPSG:4326"  4326/COSA2007_SJO_4326.shp  COSA2007_SJO.shp
ogr2ogr -t_srs "EPSG:4326"  4326/COSA2007_TER_4326.shp  COSA2007_TER.shp

cd 4326
ogr2ogr -f "ESRI Shapefile" COSA2007.shp COSA2007_COR_4326.shp
ogr2ogr -f "ESRI Shapefile" -update -append COSA2007.shp COSA2007_FLO_4326.shp -nln COSA2007
ogr2ogr -f "ESRI Shapefile" -update -append COSA2007.shp COSA2007_SMA_4326.shp -nln COSA2007
ogr2ogr -f "ESRI Shapefile" -update -append COSA2007.shp COSA2007_SMG_4326.shp -nln COSA2007
ogr2ogr -f "ESRI Shapefile" -update -append COSA2007.shp COSA2007_FAI_4326.shp -nln COSA2007
ogr2ogr -f "ESRI Shapefile" -update -append COSA2007.shp COSA2007_GRA_4326.shp -nln COSA2007
ogr2ogr -f "ESRI Shapefile" -update -append COSA2007.shp COSA2007_PIC_4326.shp -nln COSA2007
ogr2ogr -f "ESRI Shapefile" -update -append COSA2007.shp COSA2007_SJO_4326.shp -nln COSA2007
ogr2ogr -f "ESRI Shapefile" -update -append COSA2007.shp COSA2007_TER_4326.shp -nln COSA2007



ogr2ogr -t_srs "EPSG:4326"  4326/COSA2007_COR_4326.shp  COSA2007_COR.shp
ogr2ogr -t_srs "EPSG:4326"  4326/COSA2007_FLO_4326.shp  COSA2007_FLO.shp
ogr2ogr -t_srs "EPSG:4326"  4326/COSA2007_SMA_4326.shp  COSA2007_SMA.shp
ogr2ogr -t_srs "EPSG:4326"  4326/COSA2007_SMG_4326.shp  COSA2007_SMG.shp
ogr2ogr -t_srs "EPSG:4326"  4326/COSA2007_FAI_4326.shp  COSA2007_FAI.shp
ogr2ogr -t_srs "EPSG:4326"  4326/COSA2007_GRA_4326.shp  COSA2007_GRA.shp
ogr2ogr -t_srs "EPSG:4326"  4326/COSA2007_PIC_4326.shp  COSA2007_PIC.shp
ogr2ogr -t_srs "EPSG:4326"  4326/COSA2007_SJO_4326.shp  COSA2007_SJO.shp
ogr2ogr -t_srs "EPSG:4326"  4326/COSA2007_TER_4326.shp  COSA2007_TER.shp



ogrinfo -al COSA2007_COR.shp | less
ogrinfo -al COSA2007_FLO.shp | less

ogrinfo -al COSA2007_SMA.shp | less
ogrinfo -al COSA2007_SMG.shp | less

ogrinfo -al COSA2007_FAI.shp | less
ogrinfo -al COSA2007_GRA.shp | less
ogrinfo -al COSA2007_PIC.shp | less
ogrinfo -al COSA2007_SJO.shp | less
ogrinfo -al COSA2007_TER.shp | less



WGS_1984_UTM_Zone_25N
WGS_1984_UTM_Zone_25N

Sao_Braz_UTM_Zone_26N
WGS_1984_UTM_Zone_26N

Graciosa_Base_SW_1948_UTM_Zone_26N
WGS_1984_UTM_Zone_26N
WGS_1984_UTM_Zone_26N
Graciosa_Base_SW_1948_UTM_Zone_26N
WGS_1984_UTM_Zone_26N






gdalinfo -mm rain_annual.tif | grep Min
gdalinfo -mm 3063/rain_annual.tif | grep Min
echo ""
gdalinfo -mm rhmax_annual.tif | grep Min
gdalinfo -mm 3063/rhmax_annual.tif | grep Min
echo ""
gdalinfo -mm rhmin_annual.tif | grep Min
gdalinfo -mm 3063/rhmin_annual.tif | grep Min
echo ""
gdalinfo -mm tmax_annual.max.tif | grep Min
gdalinfo -mm 3063/tmax_annual_max.tif | grep Min
echo ""
gdalinfo -mm tmax_annual.tif | grep Min
gdalinfo -mm 3063/tmax_annual.tif | grep Min
echo ""
gdalinfo -mm tmed_annual.tif | grep Min
gdalinfo -mm 3063/tmed_annual.tif | grep Min
echo ""
gdalinfo -mm tmin_annual.min.tif | grep Min
gdalinfo -mm 3063/tmin_annual_min.tif | grep Min
echo ""
gdalinfo -mm tmin_annual.tif | grep Min
gdalinfo -mm 3063/tmin_annual.tif | grep Min
echo ""





gdalwarp -t_srs EPSG:2188 -dstnodata -999999 rain_annual.tif 2188/rain_annual.tif
gdal_translate -co COMPRESS=LZW x_tmin_annual.tif y_tmin_annual.tif 