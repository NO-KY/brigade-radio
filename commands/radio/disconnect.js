const Discord = require ("discord.js");
module.exports = {
    name: 'disconnect',
    aliases: ['deco', 'stop'],
    category: 'radio',
    utilisation: '{prefix}disconnect',
    execute(client, message) {
      const { channel } = message.member.voice;
      if(!channel) return message.channel.send({embed: { color: client.config.discord.colorError, description: `${client.emotes.error} Vous n'êtes pas connecté dans un salon vocal.`}})
      if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({embed: { color: client.config.discord.colorError, description: `${client.emotes.error} Vous n'êtes pas dans le même salon vocal que moi.`}});

    const PlayEmbed = new Discord.MessageEmbed()
    .setColor(client.config.discord.color)
    .setTitle("Souhaites-tu vraiment me déconnecter :")
    .setDescription(`**✅ ➜ Oui** \n **❌ ➜ Non**`)
    .setThumbnail(message.member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setFooter(`${client.config.discord.name}・${this.name} demandé par ${message.author.tag}`, message.member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setTimestamp()

    message.channel.send(PlayEmbed).then(msg => {
        msg.react('✅')
        msg.react('❌')
        const filter = (reaction, user) => (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && user.id === message.author.id;
        const collector = msg.createReactionCollector(filter, { time: 30000, dispose: "true" });
        collector.on('collect', (react, user) => {
          if (user.bot) return
          if (react.emoji.name === '✅') {
            channel.leave()
            message.guild.me.setNickname('Brigade Radio 🎧')
            message.channel.send('**Déconnecté.** ✅')
              setTimeout(function(){ 
                msg.delete()
             }, 1000);
            collector.stop()
          } else if (react.emoji.name === '❌') {
                message.channel.send('**Commande annulé.** ❌')
              setTimeout(function(){ 
                msg.delete()
             }, 1000);
            collector.stop()
          }
        })
        collector.on('end', () => {
          msg.reactions.removeAll()
        })
})
		
	}
};
