const { MessageEmbed } = require('discord.js');
const { parse } = require('discord-command-parser');

module.exports = {
    event: 'messageCreate',
    call(client, msg){
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
                    v => !v != !client.player.hasQueue(msg.guild.id),
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

        promisify(client.getType(command,'function'))(client, msg, ctx)
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

const promisify = (f) =>
    (...params) =>
        new Promise(async (res,rej) => {
            if(typeof f != 'function') res();
            try{
                res(await f(...params));
            }catch(err){
                rej(err);
            }
        })

const isObject = (obj) => typeof obj == 'object' && obj;

const playerErrors = {
    SearchIsNull: "No song with that query was found.",
    InvalidPlaylist: "No Playlist was found with that link.",
    InvalidSpotify: "Spotify Song was found with that link.",
    QueueIsNull: "There is no music playing right now.",
    VoiceChannelTypeInvalid: "You need to be in a Voice Channel to play music.",
    LiveUnsupported: "Livestreams aren't supported.",
    VideoUnavailable: "Something went wrong while playing the current song, skipping...",
    NotANumber: "The provided argument was Not A Number.",
    MessageTypeInvalid: "The Message object was not provided.",
}
