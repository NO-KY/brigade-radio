const fs = require('fs')
module.exports = {
    name: 'setprefix',
    aliases: ['newprefix', 'changeprefix'],
    category: 'configuration',
    utilisation: '{prefix}prefix [prefix]',
    async execute(client, message, args) {
        
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send({embed: {color: client.config.discord.colorError, description: `${client.emotes.error} Vous n'avez pas la permission \`Administrateur\`.`}})

        if (!args[0]) {
            message.channel.send({embed: {color: client.config.discord.colorError, description: `${client.emotes.error} Merci de préciser un nouveau préfix.`}})
        } else {
            client.guildSettings[message.guild.id].prefix = args[0]
            message.channel.send({embed: {color: client.config.discord.colorSuccess, description: `${client.emotes.success} Votre changement à été pris en compte, mon préfix est désormais ${args[0]} !`}})

            fs.writeFileSync('./config/guildSettings.json', JSON.stringify(client.guildSettings, null, 4), err => {
                if (err) throw err;
            })
        }
    },
};
