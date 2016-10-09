# 1) fetch the tiles and store in the mbtiles

mapproxy-seed -f mapproxy.yaml -s seed.yaml --dry-run
mapproxy-seed -f mapproxy.yaml -s seed.yaml --concurrency 1 --progress-file cos_progress


#NOTE: the levels in seed.yaml (from: ..., to: ...) are +1 than the ones we will have for serving (see step 2)
#NOT ANYMORE!
#2) update the mbtiles (the value in zoom_level is wrong)

echo "
UPDATE tiles SET zoom_level = zoom_level - 1;
" \
| sqlite3 cache_data/my_wms_test_cache.mbtiles


TODO? create an index?

3) copy to the mbtiles folder

cp cache_data/my_wms_test_cache.mbtiles ~/clima-app/clima-acores/tilemill-files/export/




select count(*) from tiles where zoom_level = 6;
select count(*) from tiles where zoom_level = 7;
select count(*) from tiles where zoom_level = 8;
select count(*) from tiles where zoom_level = 9;
select count(*) from tiles where zoom_level = 10;
select count(*) from tiles where zoom_level = 11;
select count(*) from tiles where zoom_level = 12;
select count(*) from tiles where zoom_level = 13;
select count(*) from tiles where zoom_level = 14;



-31.3358,36.8763,-24.9143,39.8307