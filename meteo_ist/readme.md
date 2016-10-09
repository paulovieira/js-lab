Execute with: 

```bash
~/phantomjs/bin/phantomjs <script>
```

1) Visit the forecast page with phantomJS:
http://meteo.tecnico.ulisboa.pt/forecast/coordinates/lon/-9.15/lat/38.73

2) Phantom will execute the scripts, which includes an ajax request (post) to  
http://meteo.tecnico.ulisboa.pt/ajax/getforecast

Unfortunatelly we can't directly make this request because the webserver doesn't seem to have CORS enabled

After the data is retrieved, it will stored in window.mgdata

3) Save in a text file


Note: the hours are not explicitely given. They seem to use four 6-hour periods:

at 23:51, time of the first instante in the forecast is 18
