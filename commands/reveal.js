module.exports = {
    name: 'reveal',
    description: 'Contact partner tries to complete the contact',
    execute(message, args, game) {
        if (game.inProgress != true) {
            message.reply(`No game started yet. Send !start to be the leader`);
            return;
        }

        if (message.channel.type != 'text') {
            message.reply(`Try and complete the contact in ${game.channel}`);
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

        var clueWordGuess = args[1];

        if (clueWordGuess === targetClue.word) {
            game.advanceGame();
            if (game.revealLen === game.secretWord.length) {
                game.channel.send(`*dab* *dab* *dab* PLAYERS WIN! ${game.leader} YOU SUCK.`);
                game.channel.send(`Who wants to be the leader for the new game? Send !start to be the new leader`);
                game.reset();
            } else {
                game.channel.send(`Successful contact. Word thus far: "${game.secretWord.substring(0, game.revealLen)}"`);
            }          
        } else {
            game.channel.send(`Incorrect guess: "${clueWordGuess}"`);
            targetClue.contact = false;
            targetClue.partner = null;
        }
    },
}