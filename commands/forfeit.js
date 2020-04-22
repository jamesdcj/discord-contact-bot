const { forfeitCount } = require('../config.json');
module.exports = {
	name: 'forfeit',
	description: 'Player wants to give up',
	usage: '',
	example: '',
	guildOnly: true,
	dmOnly: false,
	execute(message, args, game) {
		if (game.inProgress === false) {
			message.reply('No game in progress, silly! Get the fun started by sending !start');
			return;
		}

		if (message.author === game.leader) {
			message.reply('Only non-leaders can !forfeit -- if you want to end the game send !stop');
			return;
		}
		else {
			if (game.forfeitUsers.includes(message.author)) {
				message.reply('You already forfeit!');
				return;
			}
			else {
				game.addForfeitUser(message.author);
			}

			if (game.forfeitUsers.length >= forfeitCount) {
				let forfeitMessage = `Forfeit vote passed. Game over. ${game.leader} wins! Their word was "${game.secretWord}"\n`;
				forfeitMessage += 'Start a new game by sending !start and become the leader!';
				game.channel.send(forfeitMessage);
				game.reset();
				return;
			}
			else {
				game.channel.send(`Forfeit count: ${game.forfeitUsers.length}/${forfeitCount}. Anyone else want to give up?`);
			}
		}
	},
};