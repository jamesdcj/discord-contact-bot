module.exports = {
    name: 'stop',
    description: 'Stop the game!',
    execute(message, args, game) {
        if (game.inProgress === false) {
            message.reply(`No game in progress, silly! Get the fun started by sending !start`);
            return;
        }

        if (message.channel.type != 'text' || message.channel.id != game.channel.id) {
            message.reply(`Send me this in ${game.channel.guild.name}#${game.channel.name}`);
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