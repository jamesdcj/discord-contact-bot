module.exports = {
    name: 'stop',
    description: 'Stop the game!',
    usage: '',
    example: '',
    guildOnly: true,
    dmOnly: false,
    execute(message, args, game) {
        if (game.inProgress === false) {
            message.reply(`No game in progress, silly! Get the fun started by sending !start`);
            return;
        }

        if (message.author.id === game.leader.id || message.author.id === game.bossid) {
            message.channel.send(`Ending game with leader: ${game.leader}. The word was: "${game.secretWord}".`);

            game.reset();
        }
        else {
            message.reply(`Sorry, you cannot stop the game. Talk to ${game.leader} or JD to reset ${message.author.id} -- ${game.bossid}`);
        }
    },
}