const { compareTwoStrings } = require('string-similarity');
const { format } = require('url');

const radios = [
    // EDM/DUBSTEP/TECHNO/TRAP/ETC
    {
        name: 'Muse',
        url: "PLTpHAWOyakLaaSnO1SyJor4r0y_ZmYwHg",
        from: 'Ranger',
    },
    {
        name: 'Black Wolf',
        url: "PLNiLQueObdrT1TeviIQ7xJNqElO-55WRT",
        from: 'Black Wolf',
    },
    {
        name: 'NCS',
        url: "PLzkuLC6Yvumv_Rd5apfPRWEcjf9b1JRnq",
        from: 'Specky',
    },
    {
        name: 'Trap Nation',
        url: "PLC1og_v3eb4hrv4wsqG1G5dsNZh9bIscJ",
        from: 'Melvin',
    },
    {
        name: 'S3RL',
        url: "PLQjKs2twouB82-lKt4RM8SA6JNi5hELhT",
        from: 'Specky',
    },

    // CLASSICAL MUSIC
    {
        name: 'BombSquad',
        url: "PLmjn_XKBcplZObP4r1jksIIr5nmO4dANf",
        from: 'Specky',
    },
    {
        name: 'RCT',
        url: "PLk_H7HxvSE2dWfxCeBQqXN9eAXd3qZmqE",
        from: 'Specky',
    },

    // GAMES
    {
        name: 'Celeste',
        url: "PL1eFjFaZ9VkyDcVnvJyEC3P8tCFpZpRoU",
        from: 'Specky',
    },
    {
        name: 'Spore',
        url: "PL8Vx3sNFPBjVUL8_XrD0zorhfoNBsF9mR",
        from: 'Specky',
    },
    {
        name: 'Peggle',
        url: "PL61169E5347F3141E",
        from: 'Specky',
    },
    {
        name: 'Peggle Nights',
        url: "PLADAE9644B80F9A86",
        from: 'Specky',
    },
    {
        name: 'Undertale',
        url: "PLpJl5XaLHtLX-pDk4kctGxtF4nq6BIyjg",
        from: 'Specky',
    },

    // VARIOUS
    {
        name: 'osu!',
        url: "PLt2s8p17wbVywg7bINV9nj7GPG5Oj0B4W",
        from: 'Specky',
    },
]
.map(radio => {
    radio.url = format({
        protocol: 'https',
        hostname: 'youtube.com',
        pathname: 'playlist',
        query: {
            list: radio.url
        },
    });
    return radio;
});

module.exports = {
    trigger: [
        'radio',
    ],
    category: 'music',
    usage: '[radio name]',
    limits: {
        isPlaying: false,
    },
    async call(client, msg, ctx){
        if(!ctx.body) return embed(client);

        const queue = client.getQueue(msg.guild.id);
        const playlist =
            radios.map(r => ({
                value: compareTwoStrings(
                    ctx.body.toLowerCase(),
                    r.name.toLowerCase(),
                ),
                radio: r,
            }))
            .sort((a,b) => b.value-a.value)[0].radio;

        await queue.playlist(playlist.url, {
            requestedBy: msg.author.tag,
            maxSongs: process.env.MAX_PLAYLIST_SONGS,
            shuffle: true,
        });
        queue.setRepeatMode(2);
        return embed(client, playlist);
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
