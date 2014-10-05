rm comedo comedo.nw
cp /usr/lib/node-webkit/icudtl.dat ./
cp /usr/lib/node-webkit/nw.pak ./
zip -r comedo.nw *
touch comedo
cat /usr/bin/nw comedo.nw > comedo && chmod +x comedo 
