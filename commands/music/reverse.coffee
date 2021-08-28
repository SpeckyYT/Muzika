module.exports =
    trigger: [
        'reverse'
    ]
    category: 'music'
    call: (client, msg, ctx) ->
        queue = client.getQueue msg.guild.id
        first = queue.songs.shift()
        queue.songs.reverse()
        queue.songs.unshift first
        client.success 'Successfully reversed the queue!'
