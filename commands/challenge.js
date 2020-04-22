module.exports = {
    name: 'challenge',
    description: 'Leader challenges the contact holders to confirm',
    usage: '<clue #>',
    example: `1`,
    guildOnly: true,
    dmOnly: false,
    execute(message, args, game) {
        if (game.inProgress != true) {
            message.reply(`No game started yet. Send !start to be the leader`);
            return;
        }

        // Make sure it is the leader
        if (message.author != game.leader) {
            message.reply(`Only the leader can give up on a clue!`);
            return;
        }

        if (args.length != 1)
        {
            var reply = `Needs to be in format !guess <clue id>\n`;
            reply += `where <clue id> is a # from !clues\n`;
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

        if (clue.contact === false) {
            message.reply(`Hey now, don't give up yet, there isn't even a contact!`);
            return;
        }

        var revealString = `${clue.partner} Reply here with !reveal ${clueID} <word>\n`;
        revealString += `Where <word> is what you were thinking is the answer to "${clue.text}"`;
        game.channel.send(revealString);

    },
}