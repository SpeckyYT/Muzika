const { Util: { escapeCodeBlock } } = require('discord.js');
const pbs = require('pretty-bytes');
const pms = require('pretty-ms');
const os = require('os');
const osu = require('node-os-utils');

module.exports = {
    trigger: [
        'stats',
        'statistics',
    ],
    async call(client, msg, ctx){
        const username = client.user.username;
        const promises = [
            `đšī¸ Discord Servers: ${client.guilds.cache.size}`,
            `đŋ Commands: ${client.commands.size}`,
            `đĩ ${username} Size: ${pbs(process.memoryUsage().heapUsed)}`,
            "",
            `âī¸ CPUs: ${osu.cpu.count()} \`${escapeCodeBlock(osu.cpu.model())}\``,
            osu.cpu.free().then(free => `đ§ CPU Usage: ${bar(100-free,100)}`),
            osu.mem.free().then(f => `đž RAM Usage: ${bar(f.totalMemMb-f.freeMemMb,f.totalMemMb)}`),
            "",
            `đ¤ ${username} Uptime: ${pms(client.uptime)}`,
            `đ  Process Uptime: ${pms(process.uptime() * 1000)}`,
            `đĨī¸ Device Uptime: ${pms(os.uptime() * 1000)}`,
        ];
        const strings = await Promise.all(promises);
        return client.embed(strings.join('\n'));
    }
}

function bar(value,max){
    const size = 16;
    const percent = value / max;
    const progress = Math.round(percent * size);
    const remaining = size - progress;
    return `${'â'.repeat(progress)}${'â'.repeat(remaining)} \`[${(100*percent).toFixed(2)}%]\``;
}
