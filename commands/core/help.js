const Discord = require('discord.js')
module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'core',
    utilisation: '{prefix}help <commande>',
    execute(client, message, args) {
        if (!args[0]) {

            function categorie(name) {
                return [message.client.commands.filter(x => x.category == name).size, `\`\`\`${message.client.commands.filter(x => x.category == name).map((x) => x.name).join(', ')}\`\`\``]
            }
                const help = new Discord.MessageEmbed()
                    .setColor(client.config.discord.color)
                    .setTitle(`📋 Page d'aide ${client.config.discord.name} :`)
                    .setDescription(`➜ **Mon préfix sur le serveur est \`${client.guildSettings[message.guild.id].prefix}\`** \n ➜ **Je possède \`${client.commands.size}\` commandes.**`) 
                    .addField(`💻 Developpeurs [${categorie("developpers")[0]}]`, categorie("developpers")[1])
                    .addField(`⚙️ Core [${categorie("core")[0]}]`, categorie("core")[1])
                    .addField(`🔧 Configuration [${categorie("configuration")[0]}]`, categorie("configuration")[1])
                    .addField(`🎧 Radio [${categorie("radio")[0]}]`, categorie("radio")[1])
                    .addField(`🔗 Liens`, `> **[Invite](https://discord.com/api/oauth2/authorize?client_id=859644153461997608&permissions=2213865792&scope=bot) • [Support](https://discord.gg/geFX6ZvuGC)**`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter(`${client.config.discord.name}・${this.name} demandé par ${message.author.tag}`, message.member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                    .setTimestamp()

                    const wherehelpEmbed = new Discord.MessageEmbed()
                    .setColor(client.config.discord.color)
                    .setTitle("❓ __Où veux-tu la liste des commandes__ ? ")
                    .addField("📬 En message privé :", "➜ **Réagis avec :** `✉️`.")
                    .addField("📥 Dans le salon :", "➜ **Réagis avec :** `📥`.")
                    .setThumbnail(message.member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                    .setFooter(`Réagis avec 🗑️ pour annuler.`, message.member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                    .setTimestamp()
                
                    message.channel.send(wherehelpEmbed).then(msg => {
                        msg.react('✉️')
                        msg.react('📥')
                        msg.react('🗑️')
                        const filter = (reaction, user) => (reaction.emoji.name === '✉️' || reaction.emoji.name === '📥' || reaction.emoji.name === '🗑️') && user.id === message.author.id;
                        const collector = msg.createReactionCollector(filter, { time: 30000, dispose: "true" });
                        collector.on('collect', (react, user) => {
                          if (user.bot) return
                          if (react.emoji.name === '✉️') {
                            msg.channel.send(`<@${user.id}>, **je t'ai envoyer la liste des commandes en message privé.** <a:equipage_mp:932068753582211112>`)
                            user.send(help)
                            setTimeout(function(){ 
                              msg.delete()
                           }, 5000);                             
                           collector.stop()
                          } else if (react.emoji.name === '📥') {
                            msg.channel.send(`<@${user.id}>, **voilà la liste des commandes.**`)
                            msg.channel.send(help)
                            setTimeout(function(){ 
                              msg.delete()
                           }, 5000);                            
                            collector.stop()
                          } else if (react.emoji.name === '🗑️') {
                            msg.channel.send(`<@${user.id}>, **commande annulé.**`)
                            setTimeout(function(){ 
                              msg.delete()
                           }, 5000); 
                            collector.stop()
                          }
                        })
                        
                        collector.on('end', () => {
                          msg.reactions.removeAll()
                        })
                })
                
           
        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.channel.send({embed: {color: client.config.discord.colorError, description: `${client.emotes.error} | Je n'ai pas trouvé cette commande !`}});

            const help = new Discord.MessageEmbed()
                .setColor(client.config.discord.color)
                .setTitle(`📋 Page commande :`)
                .setDescription('Trouver des informations sur la commande fournie.\nArguments obligatoires `[]`, arguments facultatifs `<>`.') 
                .addField('🧾 Nom', command.name, true)
                .addField('🗂️ Categorie', command.category, true)
                .addField('💱 Aliase(s)', command.aliases.length < 1 ? 'Aucun' : command.aliases.join(', '), true)
                .addField('⌚ Cooldown', command.cooldown ? command.cooldown : 'Aucun', true)
                .addField('📏 Utilisation', command.utilisation.replace('{prefix}', client.guildSettings[message.guild.id].prefix), true)
                .setFooter(`${client.config.discord.name}・${this.name} demandé par ${message.author.tag}`, message.member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                .setThumbnail(message.member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                .setTimestamp()
            message.channel.send(help);
        };
    },
};