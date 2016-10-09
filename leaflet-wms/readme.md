access the WMS information using OWSLib

http://geopython.github.io/OWSLib/

http://gis.stackexchange.com/questions/40882/is-there-easy-way-to-get-layers-names-from-wms-server



from owslib.wms import WebMapService
wms = WebMapService("http://195.23.53.30:8080/geoserver/wms")

from owslib.wms import WebMapService
wms = WebMapService("http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_SMG/MapServer/WMSServer")

wms.identification.title
wms.identification.type
wms.identification.version
list(wms.contents)
[op.name for op in wms.operations]
wms.getOperationByName('GetMap').methods
wms.getOperationByName('GetMap').formatOptions