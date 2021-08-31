module.exports =
    trigger: [
        'playtop'
        'playnext'
        'pt'
        'pn'
    ]
    category: 'music'
    usage: '<song name/link>'
    limits:
        isPlaying: null
    call: (client, msg, ctx) ->
        if not ctx.body
            return client.error 'You have to include a song to play.'
        options =
            requestedBy: msg.author.tag
            index: 0
        queue = client.getQueue msg.guild.id
        song = await queue.play ctx.body,options
        client.songEmbed song
