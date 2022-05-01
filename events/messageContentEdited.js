const discord = require("discord.js")
module.exports = (client, message, oldContent, newContent) => {

            const prefix = client.guildSettings[message.guild.id].prefix

            if (message.content.indexOf(prefix) !== 0) return;
        
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
        
            const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
        
            if (cmd) {
            
                if (cmd.cooldown) {
                    if (!client.cooldowns.has(cmd.name)) {
                        client.cooldowns.set(cmd.name, new discord.Collection());
                    }
                    const now = Date.now();
                    const timestamps = client.cooldowns.get(cmd.name);
                    const cooldownAmount = (cmd.cooldown || 3) * 1000;
                    if (timestamps.has(message.author.id)) {
                        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                        if (now < expirationTime) {
                            const timeLeft = (expirationTime - now) / 1000;
                            return message.channel.send({embed: { color: client.config.discord.colorError, description: `${client.emotes.error} | Veuillez patienter ${timeLeft.toFixed(1)}s avant de réutiliser la commande \`${cmd.name}\`.`}})
                        }
                    }
                    timestamps.set(message.author.id, now);
                    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
                }
                if(!message.guild.me.hasPermission('ADMINISTRATOR')) return
        
                try {
                    cmd.execute(client, message, args);
                } catch(e) {
                    console.error(e)
                }
            } else {
                return message.channel.send({embed: { color: client.config.discord.colorError, description: `${client.emotes.error} Cette commande n'existe pas`}})
            }
    
}