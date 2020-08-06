#!/bin/bash
# Build the entire website to a minified version
# depends on htmlmin
function findHtml(){
    find "$PWD" -name "*.html" 
}
function findJs(){
    find "$PWD" -name "*.js"
}
function findCss(){
    find "$PWD" -name "*.css"
}
function findEverything(){
    findHtml
    findJs
    findCss
}
function unminifyEverything(){
    for file in $(findHtml)
    do
        sed 's/> </>\n</g' "$file" > temp.file
        sed 's/></>\n</g' temp.file > temp2.file
        rm "$file" temp.file
        mv temp2.file "$file"
    done
    for file in $(findJs)
    do
        sed 's/ function/\nfunction/g' "$file" > temp.file
        sed 's/{ /{\n/g' temp.file > temp2.file
        sed 's/ }/\n}/g' temp2.file > temp3.file
        sed 's/; /;\n/g' temp3.file > temp4.file
        rm "$file" temp1.file temp2.file temp3.file
        mv temp4.file "$file"
    done
    for file in $(findCss)
    do
        sed 's/{ /{\n/g' "$file" > temp.file
        sed 's/ }/\n}/g' temp.file > temp1.file
        sed 's/; /;\n/g' temp2.file > temp3.file
        rm "$file" temp.file temp1.file temp2.file
        mv temp3.file "$file"
    done
}
function minifyEverything(){
    for file in $(findEverything); do
        htmlmin --keep-optional-attribute-quotes --remove-all-empty-space "$file" > temp.file
        rm "$file"
        mv temp.file "$file"
    done
}
