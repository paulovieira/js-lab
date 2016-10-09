#!/bin/bash

export ISLAND_CODE=COR
mapproxy-util autoconfig \
  --capabilities http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_$ISLAND_CODE/MapServer/WMSServer \
  --output $ISLAND_CODE.yaml

export ISLAND_CODE=FLO
mapproxy-util autoconfig \
  --capabilities http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_$ISLAND_CODE/MapServer/WMSServer \
  --output $ISLAND_CODE.yaml

export ISLAND_CODE=TER
mapproxy-util autoconfig \
  --capabilities http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_$ISLAND_CODE/MapServer/WMSServer \
  --output $ISLAND_CODE.yaml

export ISLAND_CODE=FAI
mapproxy-util autoconfig \
  --capabilities http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_$ISLAND_CODE/MapServer/WMSServer \
  --output $ISLAND_CODE.yaml

export ISLAND_CODE=PIC
mapproxy-util autoconfig \
  --capabilities http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_$ISLAND_CODE/MapServer/WMSServer \
  --output $ISLAND_CODE.yaml

export ISLAND_CODE=SJO
mapproxy-util autoconfig \
  --capabilities http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_$ISLAND_CODE/MapServer/WMSServer \
  --output $ISLAND_CODE.yaml

export ISLAND_CODE=GRA
mapproxy-util autoconfig \
  --capabilities http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_$ISLAND_CODE/MapServer/WMSServer \
  --output $ISLAND_CODE.yaml

export ISLAND_CODE=SMG
mapproxy-util autoconfig \
  --capabilities http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_$ISLAND_CODE/MapServer/WMSServer \
  --output $ISLAND_CODE.yaml

export ISLAND_CODE=SMA
mapproxy-util autoconfig \
  --capabilities http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_$ISLAND_CODE/MapServer/WMSServer \
  --output $ISLAND_CODE.yaml
