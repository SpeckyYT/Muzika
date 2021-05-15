const filehound = require('filehound');

module.exports = (path, async) => {
    const handler = filehound.create()
    .path(path)
    .ext(['.js','.coffee']);

    if(async){
        return new Promise((res,rej) => handler.find((err, files) => err ? rej(err) : res(files)));
    }else{
        return handler.findSync();
    }
}
