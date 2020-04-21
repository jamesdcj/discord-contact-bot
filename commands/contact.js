module.exports = {
    name: 'contact',
    description: '2nd guesser makes a contact',
    execute(message, args, game) {
        if (game.inProgress != true) {
            message.reply(`No game started yet. Send !start to be the leader`);
            return;
        }

        if (message.channel.type != 'text') {
            message.reply(`You need to establish the contact in ${game.channel.guild.name}#${game.channel.name}`);
            return;
        }

        if (args.length != 1)
        {
            message.reply(`Needs to be in format !contact <clue id> where <clue id> is a # from !clues`);
            return;
        }

        const clueID = parseInt(args[0]);
        if (isNaN(clueID)) {
            message.reply(`Hey now you punk, send a number as your first argument`);
            return;
        }

        if (clueID < 1 || clueID > game.clues.length)
        {
            message.reply(`Please enter a number between 1-${game.clues.length}.`);
            return;
        }

        // Make sure contact is not clue originator or the leader
        if (message.author.id === game.leader.id) {
            message.reply(`You're the leader! You should try !guess ${clueID} <word>`);
            return;
        }

        const clue = game.clues[clueID - 1];

        if (message.author === clue.author) {
            message.reply(`No self contacts...anyone else??`);
            return;
        }

        if (clue.contact == true) {
            message.reply(`A contact has already been established on this between ${clue.author} and ${clue.partner}`);
            return;
        } else {
            clue.contact = true;
            clue.partner = message.author;
            game.channel.send(`Hey ${game.leader}, contact established...get guessing! Clue #${clueID}: "${game.clues[clueID - 1].text}"`);
        }

        
    },
}