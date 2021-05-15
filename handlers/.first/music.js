const { Player } = require('discord-music-player');

module.exports = (client) => {
    client.player = new Player(
        client,
        {
            deafenOnJoin: true,
            leaveOnEmpty: true,
            leaveOnEnd: true,
            leaveOnStop: true,
            quality: 'high',
            timeout: 15000,
            volume: 150,
        }
    )
}
