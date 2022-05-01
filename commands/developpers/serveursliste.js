const Discord = require('discord.js');
module.exports = {
    name: 'serveursliste',
    aliases: ['sl', 'listeserveur', 'listeserveurs', 'serveurliste'],
    category: 'developpers',
    description: 'Affiche la liste de tous les serveurs du bot',

    async execute(client, message, args) {

        if(!client.config.discord.devs.includes(message.author.id)) return message.channel.send("**Vous n\'êtes pas mon propriétaire, ou un de mes développeurs.**")

        if(!message.member.id === '753653005701611661') return message.channel.send('Vous n\'êtes pas mon propriétaire.')

        this.client = message.client;
        let i0 = 0;
        let i1 = 10;
        let page = 1;

        let description =
            `Nombre de serveurs : ${this.client.guilds.cache.size}\n\n` +
            this.client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
            .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Membres`)
            .slice(0, 10)
            .join("\n");

        const embed = new Discord.MessageEmbed()
            .setColor(client.config.discord.embedcolor)
            .setTitle(`${client.config.discord.name}`)
            .setAuthor(`Page : ${page}/${Math.ceil(this.client.guilds.cache.size/10)}`)
            .setDescription(description)
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter(`${client.config.discord.name}・${this.name} demandé par ${message.author.tag}`, message.member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTimestamp()


        const msg = await message.channel.send(embed);

        await msg.react("⬅");
        await msg.react("➡");
        await msg.react("❌");

        const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

        collector.on("collect", async(reaction) => {

            if (reaction._emoji.name === "⬅") {

                // Updates variables
                i0 = i0 - 10;
                i1 = i1 - 10;
                page = page - 1;

                // if there is no guild to display, delete the message
                if (i0 < 0) {
                    return msg.delete();
                }
                if (!i0 || !i1) {
                    return msg.delete();
                }

                description = `Serveurs: ${this.client.guilds.cache.size}\n\n` +
                    this.client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
                    .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Membres`)
                    .slice(i0, i1)
                    .join("\n");

                // Update the embed with new informations
                embed.setTitle(`page: ${page}/${Math.round(this.client.guilds.cache.size/10)}`)
                    .setDescription(description);

                // Edit the message 
                msg.edit(embed);

            }

            if (reaction._emoji.name === "➡") {

                // Updates variables
                i0 = i0 + 10;
                i1 = i1 + 10;
                page = page + 1;

                // if there is no guild to display, delete the message
                if (i1 > this.client.guilds.cache.size + 10) {
                    return msg.delete();
                }
                if (!i0 || !i1) {
                    return msg.delete();
                }

                description = `Serveurs: ${this.client.guilds.cache.size}\n\n` +
                    this.client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
                    .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} membres`)
                    .slice(i0, i1)
                    .join("\n");

                // Update the embed with new informations
                embed.setTitle(`Page: ${page}/${Math.round(this.client.guilds.cache.size/10)}`)
                    .setDescription(description);

                // Edit the message 
                msg.edit(embed);

            }

            if (reaction._emoji.name === "❌") {
                return msg.delete();
            }

            // Remove the reaction when the user react to the message
            await reaction.users.remove(message.author.id);

        });

    },
};