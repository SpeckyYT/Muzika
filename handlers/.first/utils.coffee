{ MessageEmbed } = require 'discord.js'

module.exports = (client) ->
    client.getType = (object, type, normal=false) ->
        return normal if typeof object != 'object' || !object
        for value in Object.values object
            return value if typeof value == type
        return normal;

    client.embed = ->
        new MessageEmbed()
        .setAuthor 'Muzika 🎵', client.user.displayAvatarURL(), 'https://github.com/SpeckyYT/Muzika'
        .setColor process.env.EMBED_COLOR
        .setThumbnail client.user.displayAvatarURL format: 'png', dynamic: true, size: 512
        .setTimestamp new Date
