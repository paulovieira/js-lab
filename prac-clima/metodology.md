0) upload the shapes

1) create the maps (without adding the shape yet). Use the same name and description:

4.5 - 2010-2039 - tmin anomalia
4.5 - 2040-2069 - tmin anomalia
4.5 - 2070-2099 - tmin anomalia


2) add the shapes

3) use the compute_max_min_anomalias.sh script on the shapes

4) obtain the min and max for the shapes using ogrinfo directly; the output will be saved to files

5) run the intervals script on the output files from previous step (using 9 steps, but might be less)

6) create the colors
    -correct the name of the shape