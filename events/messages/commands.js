const { MessageEmbed } = require('discord.js');
const { parse } = require('discord-command-parser');

module.exports = {
    event: 'messageCreate',
    async call(client, msg){
        if(msg.author.bot) return;

        const defaultPrefixes = [
            `<@${client.user.id}>`,
            `<@!${client.user.id}>`,
        ]

        const prefixes = [
            ...defaultPrefixes,
            ...client.getPrefixes(msg),
        ]

        if(prefixes.length <= defaultPrefixes.length) prefixes.push(process.env.CLIENT_PREFIX);

        const ctx = parse(
            msg,
            prefixes,
            {
                allowBots: false,
                allowSpaceBeforeCommand: true,
                ignorePrefixCase: true,
            }
        )
        if(!ctx.success) return;

        const command = client.getCommand(ctx.command.toLowerCase());
        if(!isObject(command)) return; // TODO 'bro wtf, dat command no exist'

        function checkLimits(command){
            if(!isObject(command.limits)) return;
            const limits = [
                [
                    'guilds',
                    v => `This command ${v ? "can only be run" : "can't be run"} in servers.`,
                    v => !v != !msg.guild,
                ],
                [
                    'dms',
                    v => `This command ${v ? "can only be run" : "can't be run"} in DMs.`,
                    v => !v != !(msg.channel.type == 'dm'),
                ],
                [
                    'owner',
                    "This command is only available for bot owners.",
                    v => v && !msg.author.id.isOwner(),
                ],
                [
                    'vc',
                    "This command can be only run while being in a Voice Channel.",
                    v => v && !msg?.member?.voice?.channel,
                ],
                [
                    'sameVC',
                    `This command can be only run if you're in the same Voice Channel as ${client.user.username}`,
                    v => v && msg?.guild?.me?.voice?.channelID &&
                        msg?.member?.voice?.channelID != msg.guild.me.voice.channelID,
                ],
                [
                    'isPlaying',
                    v => `This command ${v ? "can only be" : "can't be" } run if the bot is playing music.`,
                    v => !v != !(client.player.hasQueue(msg.guild.id) && client.player.getQueue(msg.guild.id).isPlaying),
                ],
                [
                    'botPerms',
                    perms => `I'm missing the following permission(s): \`${msg.guild.me.permissions.missing(perms).join(' ')}\``,
                    perms => msg?.guild?.me ? !msg.guild.me.permissions.has(perms) : false,
                ],
                [
                    'userPerms',
                    perms => `You're missing the following permission(s): \`${msg.member.permissions.missing(perms).join(' ')}\``,
                    perms => msg.member ? !msg.member.permissions.has(perms) : false,
                ],
                [
                    'inDevelopment',
                    "This command is currently in development...",
                    v => v,
                ],
            ];
            for(const [key,value,func] of limits){
                if([null,undefined].includes(command.limits[key])) continue;
                if(func(command.limits[key])){
                    return typeof value == 'function' ? value(command.limits[key]) : value;
                }
            }
        }

        const limit = checkLimits(command);
        if(limit) return msg.reply({
            embeds: [client.error(limit)],
            failIfNotExists: false,
        });

        return new Promise(async (res,rej) => {
            if(command.category == 'music'){
                if(!msg.guild.me.voice.channelID){
                    const queue = client.getQueue(msg.guild.id);
                    queue.join(msg.member.voice.channel)
                    .then(res)
                    .catch(rej)
                } else res()
            } else res()
        })
        .then(() => {
            const func = client.getType(command,'function')||(()=>{});
            return func(client, msg, ctx);
        })
        .then(res => {
            if(Array.isArray(res)){
                if(res.some(e => e instanceof MessageEmbed)){
                    return msg.reply({
                        embeds: res.filter(e => e instanceof MessageEmbed),
                        failIfNotExists: false,
                    });
                }
                if(res.some(e => typeof e == 'string')){
                    return msg.reply(res.join('\n'));
                }
            }
            if(res instanceof MessageEmbed){
                return msg.reply({
                    embeds: [res],
                    failIfNotExists: false,
                });
            }
            if(typeof res == 'string'){
                return msg.reply(res);
            }
        })
        .catch(err => {
            if(err?.context){
                if(playerErrors[err.context]){
                    return msg.reply({
                        embeds: [client.error(playerErrors[err.context])],
                        failIfNotExists: false,
                    })
                }
            }
            return msg.reply({
                embeds: [client.error(`${err}`.split('\n')[0])],
                failIfNotExists: false,
            })
        })
    }
}

const isObject = (obj) => typeof obj == 'object' && obj;

const playerErrors = {
    Unknown: "There was an Unknown Error.",
    QueueDestroyed: "The Queue was destroyed.",
    NothingPlaying: "There is currently no Song playing in the Voice Channel.",
    UnknownVoice: "The provided Member is not in a Voice Channel.",
    ChannelTypeInvalid: "The provided Channel is not a Voice Channel.",
    VoiceConnectionError: "There was an Error while starting the Voice Stream",
    NoVoiceConnection: "There is no Queue#connection [you should use Queue#join()] first.",
    UnknownRepeatMode: "The provided RepeatMode was not valid.",
    ResourceNotReady: "The AudioResource was not ready.",
    InvalidGuild: "The provided Guild was invalid.",
    SearchIsNull: "The was no YouTube song found by that query.",
    InvalidSpotify: "The was no Spotify song found with that link.",
    InvalidPlaylist: "There was no Playlist found with that link.",
}
