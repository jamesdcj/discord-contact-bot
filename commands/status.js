module.exports = {
    name: 'status',
    description: 'Current status of the game',
    usage: '',
    example: '',
    guildOnly: false,
    dmOnly: false,
    execute(message, args, game) {
        if (game.inProgress != true) {
            message.reply(`No game started yet. Send !start to be the leader`);
            return;
        }

        var messageText = `Game in progress with leader: ${game.leader}\n`;
        messageText += `Revealed letters "${game.secretWord.substring(0, game.revealLen)}"\n`
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