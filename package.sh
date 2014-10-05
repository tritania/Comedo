echo "Downloading / Building node modules"
npm install
echo "Cleaning Directory"
rm comedo comedo.nw
echo "Copying binaries"
cp /usr/lib/node-webkit/icudtl.dat ./
cp /usr/lib/node-webkit/nw.pak ./
echo "Packaging"
zip -rq comedo.nw *
touch comedo
cat /usr/bin/nw comedo.nw > comedo && chmod +x comedo 
echo "Done. Running"
./comedo
