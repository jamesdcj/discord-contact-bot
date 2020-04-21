module.exports = {
    name: 'guess',
    description: 'Leader tries to break contact',
    execute(message, args, game) {
        if (game.inProgress != true) {
            message.reply(`No game started yet. Send !start to be the leader`);
            return;
        }

        if (message.channel.type != 'text') {
            message.reply(`You need to guess clues in ${game.channel}`);
            return;
        }

        // Make sure it is the leader
        if (message.author != game.leader) {
            message.reply(`Only the leader can break contacts!`);
            return;
        }

        if (args.length != 2)
        {
            var reply = `Needs to be in format !guess <clue id> <word>\n`;
            reply += `where <clue id> is a # from !clues\n`;
            reply += `and <word> is your guess\n`;
            message.reply(reply);
            return;
        }

        const clueID = parseInt(args[0]);
        if (isNaN(clueID)) {
            message.reply(`Hey now you punk, send a number as your first argument`);
            return;
        }

        if (clueID < 1 || clueID > game.clues.length)
        {
            message.reply(`Please enter a clue # between 1-${game.clues.length}.`);
            return;
        }

        const clue = game.clues[clueID - 1];

        if (clue.word === args[1]) {
            game.channel.send(`Clue #${clueID} broken`);
            game.clues.splice(clueID - 1, 1);

            // Print remaining clues
            var messageText = ``;
            if (game.clues.length == 0) {
                messageText += `No current clues!`;
            } else {
                var i = 1;
                for (const clue of game.clues) {
                    messageText += `Clue #${i} `;
                    messageText += `(${clue.author}`;
                    if (clue.contact == true) {
                        messageText += `-${clue.partner})`;
                    } else {
                        messageText += `)`;
                    }
                    messageText += `: "${game.clues[i - 1].text}"\n`;
    
                    i++;
                }
            }

            game.channel.send(messageText);
        } else {
            game.channel.send(`Clue #${clueID} intact`);
        }

        
    },
}