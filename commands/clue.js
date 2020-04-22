module.exports = {
    name: 'clue',
    description: 'Guesser sets a clue',
    usage: '<word> <full text of your clue>',
    example: 'fly what birds do',
    guildOnly: false,
    dmOnly: true,
    execute(message, args, game) {
        if (game.inProgress != true) {
            message.reply(`No game started yet. Send !start to be the leader`);
            return;
        }

        if (message.author === game.leader) {
            message.reply(`Hey! You're the leader! Don't give them any help ;)`);
            return;
        }

        if (args.length < 2) {
            var reply = `Your clue needs to be of form !clue <word> <full text of your clue>\n`;
            reply += `Where <word> is what you want your contact to guess\n`;
            reply += `And <full text of your clue> is what they will have to guess from!`
            message.reply(reply);
            return;
        }

        var clueWord = args[0].toLowerCase();
        var clueText = args.slice(1).join(" ");

        if (clueWord.substring(0, game.revealLen) != game.secretWord.substring(0, game.revealLen)) {
            message.reply(`Your word needs to start like this: "${game.secretWord.substring(0, game.revealLen)}"`);
            return;
        }
    
        var clue = {
            text: clueText,
            author: message.author,
            partner: null,
            contact: false,
            word: clueWord
        }

        game.addClue(clue);

        message.reply(`Got it. Your clue text is posted in ${game.channel}`);
        game.channel.send(`Here's clue #${game.clues.length} from ${clue.author}: "${clue.text}"`);
    },
}