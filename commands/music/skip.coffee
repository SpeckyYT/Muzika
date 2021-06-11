module.exports =
    trigger: [
        'skip'
        's'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        song = await client.player.skip msg
        client.success "#{song.name} got skipped!"
