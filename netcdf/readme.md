### compile the ncdump-json utility

https://github.com/jllodra/ncdump-json

### define the path to the netdfc file as an environment variable 

```sh
NCFILE="/home/pvieira/Dropbox/netcdf/RCA4/mon/rcp45/tasmax_EUR-11_CNRM-CERFACS-CNRM-CM5_rcp45_r1i1p1_SMHI-RCA4_v1_mon_200601-210012.PORTUGAL.nc"
```

### get header data (write json to a file)

```sh
ncdump-json -j -h $NCFILE > json/header.json
```

### get variable data (for time variables we should use the "date-time strings" option)

```sh
NCVAR=time
ncdump-json -j -t -v $NCVAR $NCFILE > json/$NCVAR.json

NCVAR=time_bnds
ncdump-json -j -t -v $NCVAR $NCFILE > json/$NCVAR.json

NCVAR=lon
ncdump-json -j -v $NCVAR $NCFILE > json/$NCVAR.json

NCVAR=lat
ncdump-json -j -v $NCVAR $NCFILE > json/$NCVAR.json

NCVAR=tasmax
ncdump-json -j -v $NCVAR $NCFILE > json/$NCVAR.json
```

### create the file with data to be imported into postgres (will be written in `./json/input_tasmas.txt`)

```sh
node createInput.js
```

### import data into postgres

```sql
drop table if exists tasmax;

create table tasmax(id serial, time timestamp, time_bnds tsrange, value real, geom geometry, geom_geojson json);

COPY tasmax(time, time_bnds, value, geom_geojson) FROM '/home/pvieira/github/js-lab-2/netcdf/json/input_tasmax.txt' WITH (DELIMITER '|');

-- create the geometry 
update tasmax set geom = ST_GeomFromGeoJSON(geom_geojson::text);
ALTER TABLE tasmax DROP COLUMN geom_geojson;

-- verify
select * from tasmax limit 10;

-- global average
select avg(value) from tasmax;

-- average for january
select avg(value) from tasmax where extract(month from time) = 1

-- average for january, february and march
select avg(value) from tasmax where extract(month from time) >= 1 and extract(month from time) <= 3

-- average for january, for each point (to be displayed in gis)
select 
    row_number() over() as id,
    avg(value), 
    geom 
from tasmax 
where extract(month from time) = 1 
group by geom


-- see size on disk (sudo ls -ltrah /var/lib/postgresql/9.4/main/base/.../...)
SELECT pg_relation_filepath(oid), relpages FROM pg_class WHERE relname = 'tasmax';
```


### TODO

-carregar geojson, transformar pontos em grelha de quadrados (como se fosse um raster)
-carregar na db
-criar um input range para percorrer os varios instantes
-download  
