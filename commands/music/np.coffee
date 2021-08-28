module.exports =
    trigger: [
        'nowplaying'
        'np'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        queue = client.getQueue msg.guild.id
        song = queue.nowPlaying

        client.embed()
        .setTitle song.name
        .setDescription """
                Author: `#{song.author}`
                Duration: `#{queue.createProgressBar time: true, size: 10}`
                Requested by: `#{song.requestedBy}`
            """
        .setURL song.url
        .setImage song.thumbnail
