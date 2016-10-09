# introduction

map-proxy has 2 main commands:

 - mapproxy-util
 - mapproxy-seed

These commands allow subcommands (similar to git).

For mapproxy-util there are 8 subcommands:
```
Usage: mapproxy-util COMMAND [options]
Commands:
  export                  Export existing caches.
  grids                   Display detailed informations for configured grids.
  wms-capabilities        Display WMS capabilites.
  scales                  Convert between scales and resolutions.
  serve-develop           Run MapProxy development server.
  create                  Create example configurations.
  serve-multiapp-develop  Run MultiMapProxy development server.
  autoconfig              Create config from WMS capabilities.
```


# Basic configuration file

http://mapproxy.org/docs/1.8.0/tutorial.html

The configuration of MapProxy uses the YAML format. The MapProxy configuration is a dictionary, each key configures a different aspect of MapProxy. 

There are 6 main keys / sections:
  - services
  - sources
  - layers
  - grids
  - caches
  - globals

### Example

We will now create a MapProxy’s configuration file from scratch.

```
touch mapproxy.yaml
```

##### 1. services
"activate and configure MapProxy’s services like WMS and TMS."

We have configure at least one service. To enable a service, we have to include its name as a key in the services dictionary. 

The WMS service, for example, takes a dictionary with metadata. This data is used in the capabilities documents.

```
services:
  wms:
    md:
        title: WMS test
        abstract: This is the fantastic MapProxy.
        contact:
            organization: ...
            email: xyz@abc.com
```

MapProxy has a special service called "demo". This is a demo service that lists all configured WMS and TMS layers:
```
services:
  demo:
  wms:
    md:
        title: WMS test
        abstract: This is the fantastic MapProxy.
        contact:
            organization: ...
            email: xyz@abc.com
```

Note that the dictionary can be empty, but we need to add the colon so that the configuration parser knows it’s a dictionary.

##### 2. sources
"Define where MapProxy can retrieve new data (the actual URL of the WMS services)"

Every source has a name and a type. Let’s add a WMS source:
```
services:
  demo:
  wms:
    md:
        title: WMS test
        abstract: This is the fantastic MapProxy.
        contact:
            organization: ...
            email: xyz@abc.com

sources:
  SRIT_SMG:
    type: wms
    req:
      url: http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_SMG/MapServer/WMSServer
      layers: 153,144
      transparent: true
```

 "SRIT_SMG" is the name of the source. We use this name later to reference it. 
 Most sources take more parameters – some are optional, some are required. 

 The type "wms" requires the req parameter that describes the WMS request. We need to define at least a URL and the layer names, but you can add more options like transparent or format.


##### 3. layers
"Configure the layers that MapProxy offers. Each layer can consist of multiple sources and caches"

We use the available sources to create a layer for the MapProxy WMS. A layer requires a title, which will be used in the capabilities documents and a source. 

For this layer we want to use our SRIT_SMG data source:

```
services:
  demo:
  wms:
    md:
        title: WMS test
        abstract: This is the fantastic MapProxy.
        contact:
            organization: ...
            email: xyz@abc.com

sources:
  SRIT_SMG:
    type: wms
    req:
      url: http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_SMG/MapServer/WMSServer
      layers: 153,144
      transparent: true

layers:
  - name: cascaded_wms_test
    title: Cascaded WMS Layer
    sources: [SRIT_SMG]
```

Now we have setuped MapProxy as cascading WMS. That means MapProxy only redirect requests to the WMS defined in SRIT_SMG data source.

We can now start MapProxy's development server with this configuration. The "serve-develop" subcommand is used to start the server:

```
mapproxy-util serve-develop mapproxy.yaml --bind=localhost:8081
```
You can download the configuration.

The server will be available at http://localhost:8081/demo/

##### 4. caches 
"configure the internal caches"

To speed up the source with MapProxy we create a cache for a given source.

Each cache needs to know where it can get new data and how it should be cached. We define our "SRIT_SMG" as source for the cache. MapProxy splits images in small tiles and these tiles will be aligned to a grid. It also caches images in different resolutions, like an image pyramid. 

We can define this image pyramid in detail but let's start with the default grid definitions of MapProxy:

```
services:
  demo:
  wms:
    md:
        title: WMS test
        abstract: This is the fantastic MapProxy.
        contact:
            organization: ...
            email: xyz@abc.com

sources:
  SRIT_SMG:
    type: wms
    req:
      url: http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_SMG/MapServer/WMSServer
      layers: 153,144
      transparent: true

layers:
  - name: my_wms_test
    title: My WMS Layer
    sources: [SRIT_SMG]

caches:
  my_wms_test_cache:
    sources: [SRIT_SMG]
    grids: [GLOBAL_GEODETIC]
```

"GLOBAL_GEODETIC" defines a grid that covers the whole world. It uses EPSG:4326 as the spatial reference system and aligns with the default grid and resolutions that OpenLayers uses.

Now that we have a cache, we can use it as a source for a layer. We change the layers section from

```
layers:
  - name: my_wms_test
    title: My WMS Layer
    sources: [SRIT_SMG]
```
to
```
layers:
  - name: my_wms_test
    title: My WMS Layer
    sources: [my_wms_test_cache]
```

When the "my_wms_test" layer is requested by a client, MapProxy looks in the associated cache for the requested data. If it isn't already available in the cache, it requests the respective source (which is configured in "my_wms_test_cache")

```
services:
  demo:
  wms:
    md:
        title: WMS test
        abstract: This is the fantastic MapProxy.
        contact:
            organization: ...
            email: xyz@abc.com

sources:
  SRIT_SMG:
    type: wms
    req:
      url: http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_SMG/MapServer/WMSServer
      layers: 153,144
      transparent: true

layers:
  - name: my_wms_test
    title: My WMS Layer
    sources: [my_wms_test_cache]

caches:
  my_wms_test_cache:
    sources: [SRIT_SMG]
    grids: [GLOBAL_GEODETIC]
```

##### 5. grids 
"MapProxy aligns all cached images (tiles) to a grid. Here you can define
that grid"

There are three pre-defined grids all with global coverage:
- GLOBAL_GEODETIC: uses EPSG:4326
- GLOBAL_MERCATOR: uses EPSG:900913
- GLOBAL_WEBMERCATOR: uses EPSG:3857

Sometimes GLOBAL_GEODETIC grid is not useful because it covers the whole world and we want only a part of it. So let’s see how to define our own grid.

For this example we define a grid for Germany. We need a spatial reference system (srs) that match the region of Germany and a bounding box (bbox) around Germany to limit the requestable aera. 

```
services:
  demo:
  wms:
    md:
        title: WMS test
        abstract: This is the fantastic MapProxy.
        contact:
            organization: ...
            email: xyz@abc.com

sources:
  SRIT_SMG:
    type: wms
    req:
      url: http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_SMG/MapServer/WMSServer
      layers: 153,144
      transparent: true

layers:
  - name: my_wms_test
    title: My WMS Layer
    sources: [my_wms_test_cache]

caches:
  my_wms_test_cache:
    sources: [SRIT_SMG]
    grids: [sao_miguel_grid]

grids:
  sao_miguel_grid:
    srs: 'EPSG:4326'
    bbox: [-25.856712, 37.699594, -25.131539, 37.911326]
    bbox_srs: 'EPSG:4326'

```

To make the specification of the bbox a little bit easier, we also add the "bbox_srs" parameter, which allows to define the bbox in EPSG:4326.

Now we have to replace GLOBAL_GEODETIC in the cache configuration with our "germany_grid". After that MapProxy will cache all data in UTM32.

MapProxy request the source in the projection of the grid. 

##### 6. globals
"Here you can define some internals of MapProxy and default values
that are used in the other configuration directives"


### More options

##### Merging Multiple Layers

If we have two WMS and want to offer a single layer with data from both server, we can combine these in one cache. 

MapProxy will combine the images before it stores the tiles on disk. The sources should be defined from bottom to top and all sources except the bottom need to be transparent.

...

##### Coverages

Sometimes we don’t want to provide the full data of a WMS in a layer. We can define areas where data is available or where data you are interested in is. 

MapProxy provides three ways to restrict the area of available data: 
a) Bounding boxes
b) polygons
c) OGR datasource. 

To restrict the area with a bounding box, we have to define it in the coverage option of the "source" section. The listing below restricts the requestable area to the Sao Miguel island:
```
sources:
  SRIT_SMG:
    type: wms
    req:
      url: http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_SMG/MapServer/WMSServer
      layers: 153,144
      transparent: true
    coverage:
      bbox: [-25.856712, 37.699594, -25.131539, 37.911326]
      bbox_srs: 'EPSG:4326'
```

The bbox values were obtained with the "mapproxy-util autoconfig" command (see below)



### using mapproxy-util autoconfig to obtain the bbox

The autoconfig sub-command creates MapProxy configurations based on existing WMS capabilities documents:

Example:
```
export WMS_URL=http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_SMG/MapServer/WMSServer

mapproxy-util autoconfig \
  --capabilities $WMS_URL \
  --output SRIT_SMG.yaml
```

- creates a source for each available layer; the source will include:
  - a BBOX coverage from the layer extent, 
  - legendurl for legend graphics, 
  - featureinfo for querlyable layers, 
  - scale hints and 
  - all detected supported_srs. 

It will duplicate the layer tree to the layers section of the MapProxy configuration, including the name, title and abstract.

The tool will create a cache for each source layer and supported_srs if there is a grid configured in your --base configuration for that SRS.

The MapProxy layers will use the caches when available, otherwise they will use the source directly (cascaded WMS).


### using the base option in mapproxy-util autoconfig
  --base <filename>¶

--

We can inspect SRIT_SMG.yaml to obtain useful information to be used in the remaining configuration, namely:
  - title
  - coverage bbox
  - supported_srs

We can now extract the bounding box for "Carta de Ocupação do Solo":

  153_wms:
    coverage:
      bbox: [-25.856712, 37.699594, -25.131539, 37.911326]
      srs: EPSG:4326
    req:
      layers: '153'
      transparent: true
      url: http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_SMG/MapServer/WMSServer
    supported_srs: ['EPSG:32626', 'EPSG:4326']
    type: wms
    wms_opts:
      featureinfo: true
      legendurl: http://s041siga/arcgisoutput/WMS_SRIT_SMG_MapServer/wms/default153.png

# Seeding

MapProxy creates all tiles on demand. That means, for the tiles to be cached, they have to be requested at least once. 

Fortunately MapProxy comes with a command line script for pre-generating all required tiles: mapproxy-seed. 

It has its own configuration file called seed.yaml and a couple of options. We now create a config file for mapproxy-seed.

```
touch seed.yaml
```

The configuration has 3 sections:

- seeds
- cleanups
- coverages

### 1. seeds
"Configure seeding tasks"

Here we can create multiple seeding tasks that define what should be seeded. 

You can specify a list of caches for seeding with caches. The cache names should match the names in your main MapProxy configuration (mapproxy.yaml). 

We can restrict what will be cached with "limits"

In the example below, we configure mapproxy-seed to seed our previously created cache test_wms_cache from level 8 to level 11. 

```
seeds:
  test_cache_seed:
    caches: [my_wms_test_cache]
    grids: [sao_miguel_grid]
    levels:
      from: 8
      to: 11

```

An important option in the seeds section is "grids". It is a list with the grid names that should be seeded for the caches. 

The names should match the grid names in your mapproxy configuration. All caches of this tasks need to support the grids you specify here. By default, the grids that are common to all configured caches will be seeded.

mapproxy-seed will always process one tile pyramid after the other. Each tile pyramid is defined by a combinatiion of cache and a corresponding grid. 

A cache with multiple grids consists of multiple tile pyramids. You can configure which tile pyramid you want to seed with the caches and grids options.

The BBOX of the grid will be used to limit the area that will be cached.

--

We can now start seeding by running "mapproxy-seed".

Some basic options:
-s: define the seed.yaml configuration file
-f: define the MapProxy configuration file. 
--dry-run: see what mapproxy-seed would do, without making any actual requests to our sources

A mis-configured seeding can take days or weeks to complete, so you should keep an eye on the tile numbers the dry-run prints out.

```
mapproxy-seed -f mapproxy.yaml -s seed.yaml --dry-run
```

More options: http://mapproxy.org/docs/1.8.0/seed.html
```
mapproxy-seed -f mapproxy.yaml -s seed.yaml -c 1 --dry-run
```


### 2. cleanup
"Configure cleanup tasks."

### 3. coverages
"Configure coverages for seeding and cleanup tasks."

There are 3 different ways to describe the extent of a seeding or cleanup task:
 - a simple rectangular bounding box,
 - a text file with one or more polygons in WKT format,
 - polygons from any data source readable with OGR (e.g. Shapefile, GeoJSON, PostGIS)

Note that if the grid already has a bbox and the coverage is ommited in the seed task, the grid's bbox is used.

Each coverage has a name that is used in the seed and cleanup task configuration. 

If you don’t specify a coverage for a task, then the BBOX of the grid will be used.


### Using mapproxy-util export

This sub-command exports tiles from one cache to another. This is similar to the seed tool, but you don’t need to edit the configuration

```
mapproxy-util export -f mapproxy.yaml --grid wgs84_grid \
    --source test_cache --dest sigam_test.mbtiles --type mbtile \
    --levels 8..12 --coverage -25.857152,37.699412,-25.131781,37.911371 --srs 4326 --force

mapproxy-util export -f mapproxy.yaml --grid wgs84_grid \
    --source test_cache --dest ./cache/ --type tms \
    --levels 8..12 --coverage -25.857152,37.699412,-25.131781,37.911371 --srs 4326 --force
```