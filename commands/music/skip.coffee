module.exports =
    trigger: [
        'skip'
        's'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        if not client.player.isPlaying msg
            return msg.reply client.notPlaying msg
        song = await client.player.skip msg
        client.success "#{song.name} got skipped!"
