module.exports = {
    name: 'reveal',
    description: 'Contact partner tries to complete the contact',
    usage: '<clue #> <word>',
    example: '1 fly',
    guildOnly: true,
    dmOnly: false,
    execute(message, args, game) {
        if (game.inProgress != true) {
            message.reply(`No game started yet. Send !start to be the leader`);
            return;
        }

        if (args.length < 2) {
            var reply = `Your reveal needs to be of form !reveal <clue #> <word>\n`;
            reply += `Where <clue #> is the # from !clues\n`;
            reply += `And <word> is what you think is their secret word`;
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

        if (targetClue.contact == false) {
            message.reply(`If you think you know the clue, you need to do !contact ${clueID} first to give ${game.leader} a chance!`);
            return;
        }

        if (message.author != targetClue.partner) {
            message.reply(`You aren't the contact partner. ${targetClue.partner} should try this instead`);
            // Should this invalidate the clue & contact?
            return;    
        }

        // TODO: verify that the clue has been !dontknow'd ?

        var clueWordGuess = args[1].toLowerCase();

        if (clueWordGuess === targetClue.word) {

            // Check if the players win by guessing the secret word
            if (targetClue.word === game.secretWord) {
                game.gameOver();
                return;
            }

            // The contact word was not the original secret word, so move the game forward
            game.advanceGame();
            if (game.revealLen === game.secretWord.length) {
                // Players win by revealing the whole secret word
                game.gameOver();
            } else {
                game.channel.send(`Successful contact. Word thus far: "${game.secretWord.substring(0, game.revealLen)}"`);
            }          
        } else {
            // This should invalidate the clue
            game.channel.send(`Incorrect guess: "${clueWordGuess}"`);
            targetClue.contact = false;
            targetClue.partner = null;
        }
    },
}