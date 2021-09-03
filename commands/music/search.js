const { Utils } = require('discord-music-player');

const time = 30;

const header = 'Find the perfect song!';
const footer = `Send the number of the song you're looking for!\nYou have ${time} seconds of time!`;

module.exports = {
    trigger: [
        'search',
    ],
    category: 'music',
    usage: '<song name>',
    limits: {
        isPlaying: null,
    },
    async call(client, msg, ctx){
        if(!ctx.body) return client.error('You have to include a song to play.');
        const queue = client.getQueue(msg.guild.id);

        const results = await Utils.search(
            ctx.body,
            {
                requestedBy: msg.author.tag
            },
            queue,
            9
        ).catch(()=>{}) || [];

        const input = await new Promise(async (res,rej) => {
            if(!results.length) return rej("No song found");
            const parsed = results
            .map((s,i) => `${i+1}. [**${s.name}**](${s.url}) by *${s.author}*`)
            .join('\n');

            return msg.reply({
                embeds: [
                    client.embed()
                    .setTitle('Search')
                    .setDescription(`${header}\n\n${parsed}\n\n${footer}`)
                ]
            })
            .then(message => {
                const collector = message.channel.createMessageCollector({
                    filter: (m) => (m.author.id == msg.author.id) && (parseInt(m.content)-1 in results),
                    time: time*1000,
                    maxProcessed: 1,
                })
                return new Promise((res,rej) => {
                    collector.on('collect', (m) => (collector.removeAllListeners(), res(m)));
                    collector.on('end', () => rej(''))
                })
                .then(res)
                .catch(rej)
            })
        })
        .catch(err => {
            if(err) throw err
            return {}
        })

        const song = results[parseInt(input.content)-1];
        if(song){
            await queue.play(song);
            return client.songEmbed(song);
        }
    }
}
