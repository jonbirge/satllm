#!/usr/bin/env bash
set -eu

cd "${0%/*}"
mkdir -p norad && cd norad

mkdir -p ../ext
egrep -A2 '^PLANET' --no-group-separator active.txt > ../ext/pl.txt
egrep -A2 '^STARLINK' --no-group-separator active.txt > ../ext/sl.txt
egrep -A2 '^(SENTINEL-2A|SENTINEL-2B|SENTINEL-3A|SENTINEL-3B|AQUA|TERRA |SUOMI NPP|NOAA 20|METEOSAT-8|METEOSAT-10|METEOSAT-11|GOES 16|GOES 17|HIMAWARI-8|METOP-A|METOP-B|METOP-C|LANDSAT 8|FENGYUN 3D)' --no-group-separator active.txt > ../ext/wfs.txt
egrep -A2 '^(SENTINEL-2A|SENTINEL-2B|SENTINEL-3A|SENTINEL-3B|AQUA|TERRA |SUOMI NPP|NOAA 20|METEOSAT-8|METEOSAT-10|METEOSAT-11|GOES 16|GOES 17|HIMAWARI-8|METOP-A|METOP-B|METOP-C|LANDSAT 8|FENGYUN 3D|LANDSAT 9|NOAA 15|NOAA 18|NOAA 19|METEOR-M 1|METEOR-M 2|METEOR-M2 2|KANOPUS-V-IK)' --no-group-separator active.txt > ../ext/wfsf.txt
# cat ../ext/wfsfa.txt >> ../ext/wfsf.txt

