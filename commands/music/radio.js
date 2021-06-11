const radios = [
    // EDM/DUBSTEP/TECHNO/TRAP/ETC
    {
        name: 'Muse',
        url: "https://youtube.com/playlist?list=PLTpHAWOyakLaaSnO1SyJor4r0y_ZmYwHg",
        from: 'Ranger',
    },
    {
        name: 'Black Wolf',
        url: "https://youtube.com/playlist?list=PLNiLQueObdrT1TeviIQ7xJNqElO-55WRT",
        from: 'Black Wolf',
    },
    {
        name: 'NCS',
        url: "https://youtube.com/playlist?list=PLzkuLC6Yvumv_Rd5apfPRWEcjf9b1JRnq",
        from: 'Specky',
    },
    {
        name: 'Trap Nation',
        url: "https://youtube.com/playlist?list=PLC1og_v3eb4hrv4wsqG1G5dsNZh9bIscJ",
        from: 'Melvin',
    },

    // CLASSICAL MUSIC
    {
        name: 'BombSquad',
        url: "https://youtube.com/playlist?list=PLmjn_XKBcplZObP4r1jksIIr5nmO4dANf",
        from: 'Specky',
    },
    {
        name: 'RCT',
        url: "https://youtube.com/playlist?list=PLxt6cj1N5f6A3Ag0NF5Ew1l0QdcfMyckB",
        from: 'Specky',
    },

    // GAMES
    {
        name: 'Celeste',
        url: "https://youtube.com/playlist?list=PL1eFjFaZ9VkyDcVnvJyEC3P8tCFpZpRoU",
        from: 'Specky',
    },

    // VARIOUS
    {
        name: 'osu!',
        url: "https://youtube.com/playlist?list=PLt2s8p17wbVywg7bINV9nj7GPG5Oj0B4W",
        from: 'Specky',
    },
];

const { compareTwoStrings } = require('string-similarity');

module.exports = {
    trigger: [
        'radio',
    ],
    category: 'music',
    limits: {
        isPlaying: false,
    },
    async call(client, msg, ctx){
        if(!ctx.body) return msg.reply(embed(client));
        const playlist =
            radios.map(r => ({
                value: compareTwoStrings(
                    ctx.body.toLowerCase(),
                    r.name.toLowerCase(),
                ),
                radio: r,
            }))
            .sort((a,b) => b.value-a.value)[0].radio;

        await client.player.playlist(msg, {
            search: playlist.url,
            requestedBy: msg.author.tag,
            maxSongs: 500,
            shuffle: true,
        });
        client.player.toggleQueueLoop(msg);
        return msg.reply(embed(client, playlist));
    }
}

function embed(client, playlist){
    const emb =
        client
        .embed()
        .setDescription(`Available radio stations:\n${
            radios.map(radio => `+ ${radio.name}`).join('\n').code('diff')
        }`);

    if(playlist)
        emb
        .setTitle(`Now Playing "${playlist.name}"`)
        .setURL(playlist.url)
        .setFooter(`From: ${playlist.from}`);

    return emb;
}
