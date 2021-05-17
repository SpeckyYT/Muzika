module.exports = (client) ->
    String::code = (code) ->
        script = if typeof code == 'string' then code else ''
        code = String(this).replace(/```/g, '`\u200b``') || '\u200b'
        return "```#{script}\n#{code}\n```"
