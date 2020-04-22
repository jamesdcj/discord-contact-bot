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

const myContactGame = new ContactGame(bossid);

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
		msg.reply(`I don't have that command. Try ${prefix}help for a list of commands`);
		return;
	}

	// Get the actual command instance
	const command = client.commands.get(commandName);

	// Check if the sent command is channel scoped
	if (command.guildOnly && msg.channel.type !== 'text') {
		return msg.reply('You need to send this command in a public channel');
	}
	else if (command.dmOnly && msg.channel.type !== 'dm') {
		return msg.reply('You need to send this command in dm with me only');
	}

	// Command was sent in the correct channel, let's try and execute

	try {
		command.execute(msg, args, myContactGame);
	}
	catch (error) {
		console.error(error);
		msg.reply('Something went wrong with that command...');
	}

});

client.login(token);
