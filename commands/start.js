module.exports = {
    name: 'start',
    description: 'Start the game!',
    execute(message, args, game) {
        if (game.inProgress == true) {
            message.reply(`Sorry, game is in progress already. Talk to ${game.leader} to start a new one!`);
            return;
        }

        if (message.channel.type != 'text') {
            message.reply(`Send me this in a text channel to play`);
            return;
        }

        message.author.send(`Reply to me with !setword <word> to start the game.`);

        game.inProgress = true;
        game.leader = message.author;
        game.channel = message.channel;
    },
}