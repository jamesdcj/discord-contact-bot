module.exports = {
    name: 'cancel',
    description: 'Clue author removes their clue',
    usage: '<clue #>',
    example: `1`,
    guildOnly: true,
    dmOnly: false,
    execute(message, args, game) {
        if (game.inProgress != true) {
            message.reply(`No game started yet. Send !start to be the leader`);
            return;
        }

        if (args.length != 1) {
            var reply = `Your clue needs to be of form !cancel <clue #>\n`;
            reply += `Where <clue #> is which clue you want to remove\n`;
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

        const targetClue = game.clues[clueID - 1];

        if (message.author != targetClue.author) {
            message.reply(`Hey now, you can't cancel this clue...only ${target.author} can`)
        }

        game.clues.splice(clueID - 1, 1);

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
    },
}