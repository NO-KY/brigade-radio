const discord = require('discord.js');
const fs = require('fs');
const client = new discord.Client({
    disableMentions: 'everyone',
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.GUILD_VOICE_STATES,
        discord.Intents.FLAGS.GUILD_PRESENCES,
        discord.Intents.FLAGS.GUILD_MEMBERS
    ]
});

client.guildSettings = require('./config/guildSettings.json')

client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.commands = new discord.Collection();
client.cooldowns = new discord.Collection();

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file} ✅`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file} ✅`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};
 
client.login(client.config.discord.token);