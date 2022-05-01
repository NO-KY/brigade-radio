const Discord = require ("discord.js");
module.exports = {
    name: 'play',
    aliases: ['pl', 'start'],
    category: 'radio',
    utilisation: '{prefix}play',
    execute(client, message) {
      const { channel } = message.member.voice;
      if(!channel) return message.channel.send({embed: { color: client.config.discord.colorError, description: `${client.emotes.error} Vous n'êtes pas connecté dans un salon vocal.`}})

      if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({embed: { color: client.config.discord.colorError, description: `${client.emotes.error} Vous n'êtes pas dans le même salon vocal que moi.`}});

    const PlayEmbed = new Discord.MessageEmbed()
    .setColor(client.config.discord.color)
    .setTitle("📻 Quelle radio souhaites-tu écouter :")
    .setDescription(`**1️⃣ ➜ Skyrock** \n **2️⃣ ➜ NRJ** \n **3️⃣ ➜ Moov** \n **4️⃣ ➜ France Info** \n **5️⃣ ➜ RTL**`)
    .setThumbnail(message.member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setFooter(`${client.config.discord.name}・${this.name} demandé par ${message.author.tag}`, message.member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setTimestamp()

    message.channel.send(PlayEmbed).then(msg => {
        msg.react('1️⃣')
        msg.react('2️⃣')
        msg.react('3️⃣')
        msg.react('4️⃣')
        msg.react('5️⃣')
        const filter = (reaction, user) => (reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣' || reaction.emoji.name === '3️⃣' || reaction.emoji.name === '4️⃣' || reaction.emoji.name === '5️⃣') && user.id === message.author.id;
        const collector = msg.createReactionCollector(filter, { time: 30000, dispose: "true" });
        collector.on('collect', (react, user) => {
          if (user.bot) return
          if (react.emoji.name === '1️⃣') {
            channel.join().then(connection => {
              const dispatcher = connection.play('http://www.skyrock.fm/stream.php/tunein16_64mp3.mp3');
              dispatcher.setVolume('0.1')
              message.guild.me.setNickname("Ecoute Skyrock 🎧")
              message.channel.send({embed: { color: client.config.discord.colorSuccess, description: `J'écoute \`Skyrock\` dans <#${message.member.voice.channel.id}>. ${client.emotes.radio}`}})
              setTimeout(function(){ 
                msg.delete()
             }, 5000);             });
            collector.stop()
          } else if (react.emoji.name === '2️⃣') {
            channel.join().then(connection => {
              const dispatcher = connection.play('http://cdn.nrjaudio.fm/audio1/fr/40101/aac_576.mp3');
              dispatcher.setVolume('0.1')
              message.guild.me.setNickname('Ecoute NRJ 🎧')
              message.channel.send({embed: { color: client.config.discord.colorSuccess, description: `J'écoute \`NRJ\` dans <#${message.member.voice.channel.id}>. ${client.emotes.radio}`}})
              setTimeout(function(){ 
                msg.delete()
             }, 5000);             
            });
            collector.stop()
          } else if (react.emoji.name === '3️⃣') {
            channel.join().then(connection => {
              const dispatcher = connection.play('http://direct.mouv.fr/live/mouv-midfi.mp3');
              dispatcher.setVolume('0.1')
              message.guild.me.setNickname('Ecoute Moov 🎧')
              message.channel.send({embed: { color: client.config.discord.colorSuccess, description: `J'écoute \`Moov\` dans <#${message.member.voice.channel.id}>. ${client.emotes.radio}`}})
              setTimeout(function(){ 
                msg.delete()
             }, 5000);             
            });
            collector.stop()
          } else if (react.emoji.name === '4️⃣') {
            channel.join().then(connection => {
              const dispatcher = connection.play('http://icecast.radiofrance.fr/franceinfo-midfi.mp3');
              dispatcher.setVolume('0.1')
              message.guild.me.setNickname('Ecoute France Info 🎧')
              message.channel.send({embed: { color: client.config.discord.colorSuccess, description: `J'écoute \`France Info\` dans <#${message.member.voice.channel.id}>. ${client.emotes.radio}`}})
              setTimeout(function(){ 
                msg.delete()
             }, 5000);             });
            collector.stop()
          } else if (react.emoji.name === '5️⃣') {
            channel.join().then(connection => {
              const dispatcher = connection.play('http://icecast.rtl.fr/rtl-1-44-128?listen=webCwsBCggNCQgLDQUGBAcGBg');
              dispatcher.setVolume('0.1')
              message.guild.me.setNickname('Ecoute RTL 🎧')
              message.channel.send({embed: { color: client.config.discord.colorSuccess, description: `J'écoute \`RTL\` dans <#${message.member.voice.channel.id}>. ${client.emotes.radio}`}})
              setTimeout(function(){ 
                msg.delete()
             }, 5000);             });
            collector.stop()
          }
        })
        collector.on('end', () => {
          msg.reactions.removeAll()
        })
})
		
	}
};
