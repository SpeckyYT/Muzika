stringify = require 'dotenv-stringify'
fs = require 'fs'
path = require 'path'

module.exports = (client) ->
    dotenvPath = path.join process.cwd(), '.env'
    if not fs.existsSync dotenvPath
        fs.writeFileSync dotenvPath, stringify
            CLIENT_TOKEN: "The bot's token"
            CLIENT_PREFIX: "The bot's prefix"
            EMBED_COLOR: "The embeds' default color (Discord.js ColorResolvable)"
    require('dotenv').config();
