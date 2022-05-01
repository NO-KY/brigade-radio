const Discord = require("discord.js");
const moment = require("moment");
const humanizeDuration = require('humanize-duration');
moment.locale("fr")
module.exports = (client, guild) => {

const guildDeleteEmbed = new Discord.MessageEmbed()
.setColor("#ff0000")
.setTitle("❌ Serveur Perdu :")
.setDescription(`📤 On ma explusé du serveur \`${guild.name}\`, je suis donc à présent sur ${client.guilds.cache.size} serveurs.`)
.addField("👑 Propriétaire :", `➜ ${guild.owner.user.username}#${guild.owner.user.discriminator} (ID : ${guild.owner.user.id})`)
.addField("📋 Nom :", `➜ ${guild.name}`)
.addField("⚙️ Id :", `${guild.id}`)
.addField("👥 Membres :", `➜ ${guild.memberCount} (${guild.members.cache.filter(member => !member.user.bot).size} Utilisateurs et ${guild.members.cache.filter(member => member.user.bot).size} Robots)`)
.addField("📆 Date de création :", `${moment(guild.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss')}, il y a ${humanizeDuration(moment().diff(moment(guild.createdAt)), { units: ["y", "mo", "d", "h"], round: true, language: "fr", largest: 2})}`)
client.channels.cache.get('957456048019615804').send(guildDeleteEmbed)
}