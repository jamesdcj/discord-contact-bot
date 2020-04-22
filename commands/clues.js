module.exports = {
	name: 'clues',
	description: 'List out the clues.',
	usage: '',
	example: '',
	guildOnly: false,
	dmOnly: false,
	execute(message, args, game) {
		if (game.inProgress != true) {
			message.reply('No game started yet. Send !start to be the leader');
			return;
		}

		let reply = '';
		if (game.clues.length === 0) {
			reply += 'No active clues.';
		}
		else {
			reply += 'Here is a list of clues:\n';
			let i = 1;
			for (const clue of game.clues) {
				reply += `Clue #${i} is from ${clue.author}: "${clue.text}"\n`;
				i++;
			}
		}

		message.reply(reply);
	},
};