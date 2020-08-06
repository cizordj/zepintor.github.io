#!/bin/bash
# Build the entire website to a minified version
# depends on htmlmin
function listFile(){
    find $PWD -name "*.html" 
}

function unminifyHtml(){
    sed 's/> </>\n</g'
    sed 's/></>\n</g'
}

for file in $(listFile); do
    htmlmin --keep-optional-attribute-quotes --remove-all-empty-space $file > temp.file
    rm $file
    mv temp.file $file
done
