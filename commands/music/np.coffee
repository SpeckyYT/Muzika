module.exports =
    trigger: [
        'nowplaying'
        'np'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        queue = client.getQueue msg.guild.id
        song = queue.nowPlaying
        client.songEmbed song, queue
