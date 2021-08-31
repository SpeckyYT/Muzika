path = require 'path'

module.exports =
    trigger: [
        'reload'
        'rl'
    ]
    category: 'owner'
    call: (client, msg, ctx) ->
        await client.depsLoader(
            path.join process.cwd(), 'handlers', '5-load'
            'RELOAD'
            ({ path, value }) ->
                value client
        )
        client.success 'Reloaded!'
