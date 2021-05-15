const { inspect } = require('util');

module.exports = {
    event: 'data',
    emitter: 'stdin',
    call(client, data){
        const text = `${data}`;

        try{
            console.log(inspect(eval(text),false,4))
        }catch(err){
            console.error(err);
        }
    }
}
