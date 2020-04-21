module.exports = {
    name: 'clues',
    description: 'List out the clues.',
    execute(message, args, game) {
        if (game.inProgress != true) {
            message.reply(`No game started yet. Send !start to be the leader`);
            return;
        }

        if (message.channel.type != 'text' || message.channel.id != game.channel.id) {
            message.reply(`Your clue needs to be public. Send in ${game.channel.guild.name}#${game.channel.name}`);
            return;
        }

        var reply = ``;
        if (game.clues.length === 0) {
            reply += `No active clues.`;
        } else {
            reply += `Here is a list of clues:\n`;
            var i = 1;
            for (const clue of game.clues) {
                reply += `Clue #${i} is from ${clue.author}: "${clue.text}"\n`;
                i++;
            }
        }

        game.channel.send(reply);
    },
}