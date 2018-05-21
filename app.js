const Screenshot = require('./libs/screenshot');
module.exports=app=>{
    app.addSingleton('screenshot',createScreenshot);
}

function createScreenshot(config){
    return new Screenshot(config);
}