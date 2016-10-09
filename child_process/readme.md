### Usage

```sh
node index.js --from-srid 1234 --schema myschema --shape-path "./path/to/my-shape.shp" --db mydb --table mytable
```

Default values (if missing):
 - "from-srid": "4326"
 - "schema": "geo"
 - "encoding": "UTF8"

The remaining arguments are required: "shape-path", "db", "table".

### Remarks

##### Enconding

The default enconding is UTF8. Sometimes we get an error related to the enconding of shape's attributes:

"Unable to convert data value to UTF-8 (iconv reports "Invalid or incomplete multibyte or wide character"). Current encoding is "UTF-8". Try "LATIN1" (Western European), or one of the values described at 
http://www.postgresql.org/docs/current/static/multibyte.html."

The script detects this error and tries again using one the following encondings:

"LATIN9" (ISO 8859-15; LATIN1 + Euro and accents)
"LATIN1" (ISO 8859-1, ECMA 94; Western European)
"WIN1252" (Windows CP1252; Western European)

##### Origin SRID

If "from-srid" is "4326", the "-D" option is used ("postgresql dump format"). Otherwise it isn't (SQL insert statements will be used instead).

Using "-D" is around 3x faster (the bigger the table, the greater the factor). However it seems to be working only when the srid is 4326. 

Some quich benchmarks are below (tests have been repeated 3 times with consistent results).


Shape with ~4000 lines (polygons)

Without "-D":
```
real    0m2.870s
user    0m1.204s
sys     0m0.137s
```

With "-D":
```
real    0m1.574s
user    0m0.593s
sys     0m0.092s
```

Conclusion: "-D" is around 2x faster


Shape with ~170000 lines (polygons)

Without "-D":
```
real    0m21.149s
user    0m7.807s
sys     0m1.391s
```

With "-D":
```
real    0m7.816s
user    0m3.349s
sys     0m0.464s
```

Conclusion: "-D" is around 3x faster.




node index.js --from-srid 4326 --schema "geo" --db "150608" \
        --table "apagar_cirac_vul_bgri_E" \
        --shape-path "/home/pvieira/cirac/SERVIDOR/CIRAC/outputs/mapas/vulnerabilidade/Exposicao/Map-SHP/BGRI/cirac_vul_bgri_E.shp" 


psql -c "drop table if exists geo.apagar_cirac_vul_bgri_E;" -d 150608

time shp2pgsql -D -I -s 4326                 "/home/pvieira/cirac/SERVIDOR/CIRAC/outputs/mapas/vulnerabilidade/Exposicao/Map-SHP/BGRI/cirac_vul_bgri_E.shp" geo.apagar_cirac_vul_bgri_E | psql --dbname=150608




psql -c "drop table if exists geo.apagar_cirac_vul_bgri_E;" -d 150608

time shp2pgsql -I -W "UTF8" -s 4326                 "/home/pvieira/cirac/SERVIDOR/CIRAC/outputs/mapas/vulnerabilidade/Exposicao/Map-SHP/BGRI/cirac_vul_bgri_E.shp" geo.apagar_cirac_vul_bgri_E | psql --dbname=150608 --quiet





node index.js --from-srid 4326 --schema "geo" --db "150608" \
        --table "apagar_cirac_vul_CP4_E" \
        --shape-path "/home/pvieira/cirac/SERVIDOR/CIRAC/outputs/mapas/vulnerabilidade/Exposicao/Map-SHP/CP4/cirac_vul_freg_E.shp" 



psql -c "drop table if exists geo.apagar_cirac_vul_freg_E;" -d 150608

time shp2pgsql -D -I -W "LATIN1" -s 4326                 "/home/pvieira/cirac/SERVIDOR/CIRAC/outputs/mapas/vulnerabilidade/Exposicao/Map-SHP/Freguesia/cirac_vul_freg_E.shp" geo.apagar_cirac_vul_freg_E | psql --dbname=150608 --quiet



psql -c "drop table if exists geo.apagar_cirac_vul_freg_E;" -d 150608

shp2pgsql -I -W "LATIN1" -s 4326                 "/home/pvieira/cirac/SERVIDOR/CIRAC/outputs/mapas/vulnerabilidade/Exposicao/Map-SHP/Freguesia/cirac_vul_freg_E.shp" geo.apagar_cirac_vul_freg_E | psql --dbname=150608 --quiet




psql -c "drop table if exists geo.apagar_cirac_vul_freg_E;" -d 150608

time shp2pgsql -D -I -W "LATIN1" -s 4326                 "/home/pvieira/cirac/SERVIDOR/CIRAC/outputs/mapas/vulnerabilidade/Exposicao/Map-SHP/Freguesia/cirac_vul_freg_E.shp" geo.apagar_cirac_vul_freg_E | psql --dbname=150608 



psql -c "drop table if exists geo.apagar_cirac_vul_freg_E;" -d 150608

time shp2pgsql -I -W "LATIN1" -s 4326                 "/home/pvieira/cirac/SERVIDOR/CIRAC/outputs/mapas/vulnerabilidade/Exposicao/Map-SHP/Freguesia/cirac_vul_freg_E.shp" geo.apagar_cirac_vul_freg_E | psql --dbname=150608 --quiet


psql -c "drop table if exists geo.apagar_cirac_vul_freg_E;" -d 150608

time shp2pgsql -I -W "UTF8" -s 4326                 "/home/pvieira/cirac/SERVIDOR/CIRAC/outputs/mapas/vulnerabilidade/Exposicao/Map-SHP/Freguesia/cirac_vul_freg_E.shp" geo.apagar_cirac_vul_freg_E | psql --dbname=150608 --quiet


psql -c "drop table if exists geo.apagar_cirac_vul_freg_E;" -d 150608

psql --command="select count(*) from SPATIAL_REF_SYS where auth_srid = 4326"
shp2pgsql -I -W "UTF8" -s 4326                 "/home/pvieira/cirac/SERVIDOR/CIRAC/outputs/mapas/vulnerabilidade/Exposicao/Map-SHP/Freguesia/cirac_vul_freg_E.shp" geo.apagar_cirac_vul_freg_E | psql --dbname=150608; echo "${PIPESTATUS[0]} ${PIPESTATUS[1]}";



psql -c "drop table if exists geo.apagar_cirac_vul_freg_E;" -d 150608

shp2pgsql -I -W "LATIN1" -s 9994326                 "/home/pvieira/cirac/SERVIDOR/CIRAC/outputs/mapas/vulnerabilidade/Exposicao/Map-SHP/Freguesia/cirac_vul_freg_E.shp" geo.apagar_cirac_vul_freg_E | psql --dbname=150608 --quiet; echo "${PIPESTATUS[0]} ${PIPESTATUS[1]}";



psql -c "drop table if exists geo.apagar_cirac_vul_freg_E;" -d 150608

shp2pgsql -I -W "LATIN1" -s 9994326                 "/home/pvieira/cirac/SERVIDOR/CIRAC/outputs/mapas/vulnerabilidade/Exposicao/Map-SHP/Freguesia/cirac_vul_freg_E.shp" geo.apagar_cirac_vul_freg_E | psql --dbname=150608 --quiet 2> output





variantes: 
    -D
    -W
    -quiet no psql

se usar -D, o psql nao dá output linha a linha; se nao usar, dá; mas se nao usar e usar --quiet no psql, tb nao dá

o caso geral é quando nao se usa "-D" (pois pode acontecer o shape nao estar em 4326); to check if the command has been successful we should check
    - the exit code (use another shell tool?)
    - the output of stderr



todo: add "-quiet" to psql
retrieve stderr and status code
avoid command injection - use joi
    -srid between 0 and 10000000
    - ...
    - remove harmful commands like "rm" or ";"