const { prefix } = require('../config.json');
module.exports = {
	name: 'help',
	description: 'List out the commands.',
	usage: '<command name>',
	guildOnly: false,
	dmOnly: false,
	// eslint-disable-next-line no-unused-vars
	execute(message, args, game) {
		const data = [];
		const { commands } = message.client;

		data.push('');
		// No command help requested
		if (!args.length) {
			data.push('Here are all my commands:');
			data.push(commands.map(command => command.name).join(', '));
			message.reply(data, { split: true });
			return;
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			message.reply('I don\'t have that command');
			return;
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) {
			data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		}

		if (command.description) {
			data.push(`**Description:** ${command.description}`);
		}

		let channelString = '**Available Chats:** ';
		if (command.guildOnly) {
			channelString += 'channel';
		}
		else if (command.dmOnly) {
			channelString += 'dm';
		}
		else {
			channelString += 'channel, dm';
		}

		data.push(channelString);

		if (command.usage) {
			data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
		}

		if (command.example) {
			data.push(`**Example:** ${prefix}${command.name} ${command.example}`);
		}

		message.reply(data, { split: true });
	},
};