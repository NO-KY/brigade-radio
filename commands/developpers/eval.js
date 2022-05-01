const Discord = require('discord.js');
module.exports = {
    name: 'eval',
    aliases: ['e', 'evaluate'],
    category: 'developpers',
    utilisation: '{prefix}eval <code>',
   async execute(client, message, args) {

    if(!client.config.discord.devs.includes(message.author.id)) return message.channel.send("**Vous n\'êtes pas mon propriétaire, ou un de mes développeurs.**")

        try {
            var code = args.join(" ");

            var evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            const Aembed = new Discord.MessageEmbed()
            .setColor(client.config.discord.embedcolor)
            .addField(":inbox_tray: Entrée: ", `\`\`\`${code}\`\`\``)
            .addField(":outbox_tray: Sortie: ", `\`\`\`js\n${clean(evaled)}\n\`\`\``)
            .setFooter(`${client.config.discord.name}・${this.name} demandé par ${message.author.tag}`, message.member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTimestamp()
            message.channel.send(Aembed)

        } catch (err) {
            const Bembed = new Discord.MessageEmbed()
            .setColor(client.config.discord.embedcolor)
            .addField(":inbox_tray: Entée: ", `\`\`\`${code}\`\`\``)
            .addField(":outbox_tray: Sortie: ", `\`\`\`${clean(err)}\`\`\``)
            .setFooter(`${client.config.discord.name}・${this.name} demandé par ${message.author.tag}`, message.member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTimestamp()
            message.channel.send(Bembed)
        }

        function clean(text) {
            if (typeof(text) === 'string')
                return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
            else
                return text;
        }
    },
};