const filehound = require('filehound');
const { parse } = require('path');

const sucerr = ['LOADED','ERROR'];
const sucerrLength = sucerr.reduce((p,c) => Math.max(c.length,p), 0);

module.exports = (client) => {
    client.depsLoader = (path, name = '', cb = ()=>{}) => {
        const handler = filehound.create()
        .path(path)
        .ext([...Object.keys(require.extensions)]);

        handler.find();

        handler.on('match', item => {
            delete require.cache[item];
            const { base } = parse(item);
            try{
                const pull = require(item);
                cb({
                    path: item,
                    value: pull,
                });
                console.log(`- ${name} ${sucerr[0].padEnd(sucerrLength)} ${base}`.green);
            }catch(err){
                console.error(`- ${name} ${sucerr[1].padEnd(sucerrLength)} ${base}`.red);
                console.error(err);
            }
        })

        return new Promise(res => handler.on('end', res));
    }
}
