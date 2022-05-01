module.exports = {
    name: 'reload',
    aliases: ['rl'],
    category: 'developpers',
    description: 'Reload une commande',
    usage: '[command name]',
    execute(client, message, args) {

        if(!client.config.discord.devs.includes(message.author.id)) return message.channel.send("**Vous n\'êtes pas mon propriétaire, ou un de mes développeurs.**")

        const commandName = args[0];
        const command = message.client.commands.get(commandName) ||
            message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
            return message.channel.send(`Il n'y a aucunne commande de nom ou aliases \`${commandName}\`, ${message.author}!`);
        }

        delete require.cache[require.resolve(`../${command.category}/${command.name}.js`)];

        try {
            const newCommand = require(`../${command.category}/${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`La commande \`${command.name}\` a bien été rechargée !`);
        } catch (error) {
            console.error(error);
            message.channel.send(`Une erreur est survenue en rechargeant la commande \`${command.name}\`:\n\`${error.message}\``);
        }
    },
};