module.exports =
    trigger: [
        'playing'
        'queues'
    ]
    category: 'owner'
    call: (client, msg, ctx) ->
        client.embed "#{client.player.queues.size} queues are open."
