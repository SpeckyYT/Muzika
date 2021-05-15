path = require 'path'

module.exports = (client) =>
    events = client.loader path.join process.cwd(), 'events'

    client.depsLoader events, 'EVENTS', ({ path, value:pull }) => 
        eventNames = if Array.isArray pull.event then pull.event else [pull.event]
        emitterName = pull.emitter || 'client'
        func = client.getType pull, 'function'
        throw new Error 'No function found' if not func
        emitter = switch emitterName
            when 'player' then client.player
            when 'process' then process
            when 'stdin' then process.openStdin()
            else client
        emitter.on event, func.bind null, client for event in eventNames 
