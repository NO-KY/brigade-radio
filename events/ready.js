module.exports = async (client) => {
    console.log(`Brigade Radio 🎧 est en ligne, ${client.users.cache.size} membres.`);

        const statuses = [
            () => "%help 🎧",
            () => `la Radio 📻`,
            () => `${client.guilds.cache.size} serveurs 🎵`,
          ]
          let i = 0
          setInterval(() => { 
            client.user.setActivity(statuses[i](), {type: 'LISTENING'});
            i = ++i % statuses.length
          }, 1e4)

};