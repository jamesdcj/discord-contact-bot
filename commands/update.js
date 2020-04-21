module.exports = {
    name: 'update',
    description: 'Change the text for a given clue',
    execute(message, args, game) {
        if (game.inProgress != true) {
            message.reply(`No game started yet. Send !start to be the leader`);
            return;
        }

        if (message.channel.type != 'text') {
            message.reply(`You can send this to me in ${game.channel}`);
            return;
        }

        if (args.length < 2) {
            var reply = `Your clue needs to be of form !update <clue #> <full text of your clue>\n`;
            reply += `Where <clue #> is which clue you want to update\n`;
            reply += `And <full text of your clue> is what they will have to guess from!`
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
            message.reply(`Hey now, you can't update this clue...only ${target.author} can`)
        }

        var clueText = args.slice(1).join(" ");

        targetClue.text = clueText;

        game.channel.send(`Clue #${clueID} updated. The text now reads "${targetClue.text}"`);
    },
}