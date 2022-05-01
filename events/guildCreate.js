const Discord = require("discord.js");
const fs = require("fs")
const moment = require("moment");
const humanizeDuration = require('humanize-duration');
moment.locale("fr")
module.exports = (client, guild) => {

    client.guildSettings[guild.id] = {
        "prefix": client.config.discord.prefix
    }
    fs.writeFileSync('./config/guildSettings.json', JSON.stringify(client.guildSettings, null, 4), err => {
        if (err) throw err;
    })

    const guildaddEmbed = new Discord.MessageEmbed()
    .setColor("#5fff00")
    .setTitle("✅ Nouveau Serveur :")
    .setDescription(`📥 On ma ajouté sur le serveur \`${guild.name}\`, je suis donc à présent sur ${client.guilds.cache.size} serveurs.`)
    .addField("👑 Propriétaire :", `➜ ${guild.owner.user.username}#${guild.owner.user.discriminator} (ID : ${guild.owner.user.id})`)
    .addField("📋 Nom :", `➜ ${guild.name}`)
    .addField("⚙️ Id :", `${guild.id}`)
    .addField("👥 Membres :", `➜ ${guild.memberCount} (${guild.members.cache.filter(member => !member.user.bot).size} Utilisateurs et ${guild.members.cache.filter(member => member.user.bot).size} Robots)`)
    .addField("🗂️ Salons :", `➜ ${guild.channels.cache.size} (${guild.channels.cache.filter(({type}) => type == "text").size} Salons textuels et ${guild.channels.cache.filter(({type}) => type == "voice").size} Salons Vocaux)`)
    .addField("📆 Date de création :", `${moment(guild.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss')}, il y a ${humanizeDuration(moment().diff(moment(guild.createdAt)), { units: ["y", "mo", "d", "h"], round: true, language: "fr", largest: 2})}`)
    client.channels.cache.get('957456048019615804').send(guildaddEmbed)

}