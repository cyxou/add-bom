# Add BOM markers to file

A simple cli utility to add BOM markers to UTF-8 files. Good for using in npm builds.

### Usage
```
npm install add-bom --save-dev
```
Then you can
```
node add-bom.js file-without-bom.js
```
or from the npm script section of package.json
```
add-bom file-without-bom.js
```
