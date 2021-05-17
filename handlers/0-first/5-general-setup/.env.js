const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const dotenvPath = path.join(process.cwd(),'.env');
    if(!fs.existsSync(dotenvPath)){
        fs.writeFileSync(
            dotenvPath,
            [
                'CLIENT_TOKEN',
                'CLIENT_PREFIX',
                'EMBED_COLOR',
            ].map(s => `${s}=`).join('\n'),
        )
    }
    require('dotenv').config();
}
