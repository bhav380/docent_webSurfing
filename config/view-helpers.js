const env = require('./environment');
const fs = require('fs');
const path = require('path');
module.exports = (app) =>{
    app.locals.assetPath = function(filePath){

        if(env.name=='development'){
            console.log("hello ;;;",filePath);
            return filePath;
        }

        console.log(filePath);
        console.log(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')));
        // console.log(`${JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath]}`)
        console.log(`${JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath]}`);


        return JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath];

    }
}