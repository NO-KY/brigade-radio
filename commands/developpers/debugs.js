module.exports = {
    name: 'debugs',
    aliases: [],
    category: 'developpers',
    utilisation: '{prefix}debugs',

    execute(client, message) {
        if(!client.config.discord.devs.includes(message.author.id)) return message.channel.send("**Vous n\'êtes pas mon propriétaire, ou un de mes développeurs.**")

        message.channel.send({embed: { color: client.config.discord.colorSuccess, description: `${client.user.username} est connecté en vocal sur \`${client.voice.connections.size}\` salon(s).`}})

    },
};