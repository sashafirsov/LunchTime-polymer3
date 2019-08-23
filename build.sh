polymer build
replacef(){
    replace-in-file "$1" "$2" "$3" --verbose --isRegex
}
applyRootPath(){
    rootPath="https://cdn.xml4jquery.com/ajax/libs/LunchTime-polymer3/build/$1/"
    # echo "========== rootPath: '${rootPath}'"
    indexHtml="build/$1/index.html"
    replacef "/\<base(.*?)\>/g" " "                                              $indexHtml
    replacef "/rootPath:(.*?)[\'\"]/[\'\"]/g" "rootPath: '${rootPath}'"          $indexHtml
    replacef "/[\'\"]service-worker.js[\'\"]/g" "'${rootPath}service-worker.js'" $indexHtml
    replacef "/src\=\"node_modules\//g" "src=\"${rootPath}node_modules/"          $indexHtml
    replacef "/src\=\"\.\//g" "src=\"${rootPath}"                                $indexHtml
    replacef "/define\(\[\'\.\//g" "define(['${rootPath}"                        $indexHtml
    replacef "/document\.write(\(.*?\))/g" " "                                   $indexHtml
}

for D in ./build/*; do
    if [ -d "${D}" ]; then
        applyRootPath "${D##*/}"
    fi
done

#cp node_modules/@babel/polyfill/dist/polyfill.min.js "build/es5-bundled/node_modules/@babel/polyfill/dist/"
