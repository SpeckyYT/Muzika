module.exports =
    trigger: [
        'ping'
        'pong'
    ]
    call: (client, msg, ctx) ->
        latencies = ["API: #{Math.round client.ws.ping}"]
        message = await msg.reply build latencies
        latencies.push "Bot: #{message.createdTimestamp - msg.createdTimestamp}"
        message.edit build latencies

build = (arr) ->
    "Pong! 🏓\n#{arr.map((n)->"#{n}ms").join('\n').code 'c'}"
