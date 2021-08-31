path = require 'path'
{ validate, schedule } = require 'node-cron'

module.exports = (client) ->
    client.removeAllListeners()
    client.schedules = []

    client.depsLoader(
        path.join(process.cwd(), 'events')
        'EVENTS'
        ({ path, value:pull }) ->
            eventNames = if Array.isArray pull.event then pull.event else [pull.event]
            emitterName = pull.emitter || 'client'
            func = client.getType pull, 'function'
            throw new Error 'No function found' if not func
            for event in eventNames
                if validate event
                    if not client.schedules.includes event
                        client.schedules.push event
                        schedule event, -> client.emit event
                    emitter = 'client'
            emitter = switch emitterName
                when 'player' then client.player
                when 'process' then process
                when 'stdin' then process.openStdin()
                else client
            emitter.on event, func.bind null, client for event in eventNames
    )
