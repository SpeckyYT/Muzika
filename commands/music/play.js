module.exports = {
    trigger: [
        'play',
        'p',
    ],
    category: 'music',
    usage: '<song name/link>',
    limits: {
        isPlaying: null,
    },
    async call(client, msg, ctx){
        if(!ctx.body) return client.error('You have to include a song to play.');
        const options = {
            requestedBy: msg.author.tag,
        }
        const queue = client.getQueue(msg.guild.id);
        const song = await queue.play(ctx.body,options);

        return client.songEmbed(song);
    }
}
