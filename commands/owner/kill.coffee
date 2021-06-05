module.exports =
    trigger: [
        'kill'
        'shutdown'
    ]
    category: 'owner'
    call: (client, msg, ctx) ->
        await msg.reply 'Shutting down!'
        process.kill 0
