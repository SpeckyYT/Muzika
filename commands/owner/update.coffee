cp = require 'child_process'

run = (command) ->
    new Promise (res,rej) ->
        cp.exec command, ->
        .on 'close', (code) -> if code is 0 then res() else rej() 

module.exports =
    trigger: [
        'update'
        'gitupdate'
    ]
    category: 'owner'
    call: (client, msg, ctx) ->
        try
            await run 'git reset --hard'
            await run 'git fetch --all'
            await run 'git pull origin'
            msg.reply client.success "Bot got updated successfully!"
        catch 
            msg.reply client.error "Was unable to update the bot"
