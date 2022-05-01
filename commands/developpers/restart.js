module.exports = {
    name: 'restart',
    aliases: '[rs]',
    category: 'developpers',
    description: 'Rédémarre le bot',

    execute(client, message, args) {

        if(!client.config.discord.devs.includes(message.author.id)) return message.channel.send("**Vous n\'êtes pas mon propriétaire, ou un de mes développeurs.**")

        let bot = message.client;
        message.channel.send(`Rédémarage de \`${message.client.user.tag}\` en cours....`).then(() => bot.destroy()).then(() => bot.login(client.config.discord.token)).then(() => message.channel.send(`Le bot a redémarré avec succès`))


    },
};