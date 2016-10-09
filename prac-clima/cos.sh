shapes with different attribute columns (we have to remove something?)
COSA2007_SMG.shp
COSA2007_TER.shp

psql --dbname=150608 --command="DROP TABLE IF EXISTS geo.a_prac_cos;"


# grupo ocidental

shp2pgsql \
    -s 32625:4326 -W LATIN1 \
    COSA2007_COR.shp \
    geo.a_prac_cos  \
    |  psql --dbname=150608 --quiet 

shp2pgsql \
    -a -s 32625:4326 -W LATIN1 \
    COSA2007_FLO.shp \
    geo.a_prac_cos  \
    |  psql --dbname=150608 --quiet 

# grupo central

shp2pgsql \
    -a -s 32626:4326 -W LATIN1 \
    COSA2007_FAI_32626.shp \
    geo.a_prac_cos  \
    |  psql --dbname=150608 --quiet 

shp2pgsql \
    -a -s 32626:4326 -W LATIN1 \
    COSA2007_GRA.shp \
    geo.a_prac_cos  \
    |  psql --dbname=150608 --quiet 

shp2pgsql \
    -a -s 32626:4326 -W LATIN1 \
    COSA2007_PIC.shp \
    geo.a_prac_cos  \
    |  psql --dbname=150608 --quiet 

shp2pgsql \
    -a -s 32626:4326 -W LATIN1 \
    COSA2007_SJO_32626.shp \
    geo.a_prac_cos  \
    |  psql --dbname=150608 --quiet 

shp2pgsql \
    -a -s 32626:4326 -W LATIN1 \
    COSA2007_TER.shp \
    geo.a_prac_cos  \
    |  psql --dbname=150608 --quiet 


# grupo oriental

shp2pgsql \
    -a -s 32626:4326 -W LATIN1 \
    COSA2007_SMA_32626.shp \
    geo.a_prac_cos  \
    |  psql --dbname=150608 --quiet 


shp2pgsql \
    -a -s 32626:4326 -W LATIN1 \
    COSA2007_SMG.shp \
    geo.a_prac_cos  \
    |  psql --dbname=150608 --quiet 


        