{ MessageEmbed } = require 'discord.js'

module.exports = (client) ->
    client.getType = (object, type, normal=false) ->
        return normal if typeof object != 'object' || !object
        for value in Object.values object
            return value if typeof value == type
        normal

    client.embed = ->
        new MessageEmbed()
        .setAuthor "#{client.user.username} 🎵", client.user.displayAvatarURL(), 'https://github.com/SpeckyYT/Muzika'
        .setColor process.env.EMBED_COLOR
        .setThumbnail client.user.displayAvatarURL format: 'png', dynamic: true, size: 512
        .setTimestamp new Date

    client.success = (desc) ->
        embed = client.embed()
        .setColor process.env.SUCCESS_COLOR
        .setTitle 'Success!'
        if desc
            embed
            .setDescription desc
        embed

    client.error = (desc) ->
        embed = client.embed()
        .setColor process.env.ERROR_COLOR
        .setTitle 'Error...'
        if desc
            embed
            .setDescription desc
        embed
