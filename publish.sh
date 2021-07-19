#!/bin/sh
rm -rf dist/
parcel build index.html --public-url http://jeanphilippebelley.com/
echo "jeanphilippebelley.com" > dist/CNAME
git add dist && git commit -m "Prod files"
git subtree push --prefix dist origin gh-pages-photo