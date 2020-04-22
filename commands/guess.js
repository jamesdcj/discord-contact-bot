module.exports = {
	name: 'guess',
	description: 'Leader tries to break contact',
	usage: '<clue #> <word>',
	example: '1 fly',
	guildOnly: true,
	dmOnly: false,
	execute(message, args, game) {
		if (game.inProgress != true) {
			message.reply('No game started yet. Send !start to be the leader');
			return;
		}

		// Make sure it is the leader
		if (message.author != game.leader) {
			message.reply('Only the leader can break contacts!');
			return;
		}

		if (args.length != 2) {
			let reply = 'Needs to be in format !guess <clue id> <word>\n';
			reply += 'where <clue id> is a # from !clues\n';
			reply += 'and <word> is your guess\n';
			message.reply(reply);
			return;
		}

		const clueID = parseInt(args[0]);
		if (isNaN(clueID)) {
			message.reply('Hey now you punk, send a number as your first argument');
			return;
		}

		if (clueID < 1 || clueID > game.clues.length) {
			message.reply(`Please enter a clue # between 1-${game.clues.length}.`);
			return;
		}

		const clue = game.clues[clueID - 1];

		if (clue.word === args[1].toLowerCase()) {
			game.channel.send(`Clue #${clueID} broken`);
			game.clues.splice(clueID - 1, 1);

			// Print remaining clues
			let messageText = '';
			if (game.clues.length == 0) {
				messageText += 'No current clues!';
			}
			else {
				let i = 1;
				for (const currClue of game.clues) {
					messageText += `Clue #${i} `;
					messageText += `(${currClue.author}`;
					if (currClue.contact == true) {
						messageText += `-${currClue.partner})`;
					}
					else {
						messageText += ')';
					}
					messageText += `: "${game.clues[i - 1].text}"\n`;

					i++;
				}
			}

			game.channel.send(messageText);
		}
		else {
			game.channel.send(`Clue #${clueID} intact`);
		}


	},
};