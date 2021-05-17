module.exports =
    trigger: [
        'nowplaying'
        'np'
    ]
    call: (client, msg, ctx) ->
        if not client.player.isPlaying msg
            return msg.reply client.notPlaying msg

        song = client.player.nowPlaying msg

        msg.reply(
            client.embed()
            .setTitle song.name
            .setDescription [
                    "Author: #{song.author}"
                    "Duration: #{song.duration}"
                    client.player.createProgressBar msg,
                        size: 20,
                        arrow: '>',
                        block: '=',
                    .code()
                    "Requested by: #{song.requestedBy}"
                ]
            .setURL song.url
            .setImage song.thumbnail
        )
