const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, bossid } = require('./config.json');
const ContactGame = require('./contactgame.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Load up commands to run
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

myContactGame = new ContactGame(bossid);

// Start up server
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Where the magic happens
client.on('message', msg => {
    // We only want commands from people
    if (!msg.content.startsWith(prefix) || msg.author.bot) {
        return;
    }

    // Get argument list and command name
    const args = msg.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Only process if we have the command
    // TODO: Let user know they got it wrong
    if (!client.commands.has(commandName)) {
        return;
    }

    // Get the actual command instance
    const command = client.commands.get(commandName);

    try {
        command.execute(msg, args, myContactGame);
    } catch (error) {
        console.error(error);
        msg.reply('Something went wrong with that command...');
    }
    
});

client.login(token);
