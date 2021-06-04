stringify = require 'dotenv-stringify'
fs = require 'fs'
path = require 'path'

env =
    CLIENT_TOKEN: "The bot's token"
    CLIENT_PREFIX: "The bot's prefix"
    EMBED_COLOR: "The embeds' default color (Discord.js ColorResolvable)"
    SUCCESS_COLOR: "The embeds' color on success (Discord.js ColorResolvable)"
    ERROR_COLOR: "The embeds' color on errors (Discord.js ColorResolvable)"
    OWNERS: [
        "The owners of the bot (Array of IDs)"
        "A string also works, but it's recommended to not do it",
        "But if you ever wanted to use a string, just put a space between IDs"
    ]

module.exports = (client) ->
    dotenvPath = path.join process.cwd(), '.env'

    require('dotenv').config()

    for [key,value] in Object.entries env
        if typeof process.env[key] is 'undefined'
            newEnv = Object.assign {}, env
            for [key,value] in Object.entries newEnv
                if typeof process.env[key] isnt 'undefined'
                    newEnv[key] = process.env[key];
            fs.writeFileSync dotenvPath, stringify newEnv
            require('dotenv').config()
            break
