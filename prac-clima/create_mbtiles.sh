#!/bin/bash

# automatic generate mbtiles for a bunch of map projects 

export TILEMILL_FILES_DIR="/home/pvieira/clima-app/clima-acores/tilemill-files"
export TILEMILL_COMMAND="/home/pvieira/clima-app/clima/node_modules/hapi-tilemill/tilemill/index.js"

project_name=()
#project_name+=("tilemill-project-a")
#project_name+=("tilemill-project-b")
project_name+=("4-5-2010-2039-rain")
# project_name+=("4-5-2010-2039-rhmax")
# project_name+=("4-5-2010-2039-rhmin")
# project_name+=("4-5-2010-2039-tmax")
# project_name+=("4-5-2010-2039-tmed")
# project_name+=("4-5-2010-2039-tmin")
# project_name+=("rain-sum-4326")
# project_name+=("rhmax-annual-4326")
# project_name+=("rhmin-annual-4326")
# project_name+=("tmax-annual-4326")
# project_name+=("tmed-annual-4326")
# project_name+=("tmin-annual-4326")
# project_name+=("4-5-2070-2099-rain")
# project_name+=("4-5-2070-2099-rhmax")
# project_name+=("4-5-2070-2099-rhmin")
# project_name+=("4-5-2070-2099-tmax")
# project_name+=("4-5-2070-2099-tmed")
# project_name+=("4-5-2070-2099-tmin")
# project_name+=("8-5-2010-2039-rain")
# project_name+=("8-5-2010-2039-rhmax")
# project_name+=("8-5-2010-2039-rhmin")
# project_name+=("8-5-2010-2039-tmax")
# project_name+=("8-5-2010-2039-tmed")
# project_name+=("8-5-2010-2039-tmin")
# project_name+=("8-5-2040-2069-rain")
# project_name+=("8-5-2040-2069-rhmax")
# project_name+=("8-5-2040-2069-rhmin")
# project_name+=("8-5-2040-2069-tmax")
# project_name+=("8-5-2040-2069-tmed")
# project_name+=("8-5-2040-2069-tmin")
# project_name+=("8-5-2070-2099-rain")
# project_name+=("8-5-2070-2099-rhmax")
# project_name+=("8-5-2070-2099-rhmin")
# project_name+=("8-5-2070-2099-tmax")
# project_name+=("8-5-2070-2099-tmed")
# project_name+=("8-5-2070-2099-tmin")
# project_name+=("normal-observado-rain")
# project_name+=("normal-observado-rhmax")
# project_name+=("normal-observado-rhmin")
# project_name+=("normal-observado-tmax")
# project_name+=("normal-observado-tmed")
# project_name+=("normal-observado-tmin")
# project_name+=("rhmax-annual")
# project_name+=("rhmin-annual")
# project_name+=("precipitacao")
# project_name+=("temperatura-maxima")
# project_name+=("temperatura-media")
# project_name+=("temperatura-minima")




l=${#project_name[@]}

for (( i=0; i < $l; i++ )) do

    eval $(echo $TILEMILL_COMMAND \
        export \
        ${project_name[$i]} \
        $TILEMILL_FILES_DIR/export/${project_name[$i]}.mbtiles \
        --format=mbtiles \
        --minzoom=5 \
        --maxzoom=14 \
        --bbox="-31.3358,36.8763,-24.9143,39.8307" \
        --metatile=1 \
        --scale=1 \
        --files=$TILEMILL_FILES_DIR \
        --verbose=on )

done



#        --bbox=[-9.5691,36.8928,-6.1194,42.2244] \
#       --bbox="-9.5691,36.8928,-6.1194,42.2244" \

# --format=mbtiles \
# --minzoom=7 \
# --maxzoom=11 \
# --metatile=1 \