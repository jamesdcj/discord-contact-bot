module.exports = {
    name: 'forfeit',
    description: 'Players want to give up',
    execute(message, args, game) {
        if (game.inProgress === false) {
            message.reply(`No game in progress, silly! Get the fun started by sending !start`);
            return;
        }

        if (message.channel != game.channel) {
            message.reply(`Send me this in ${game.channel}`);
            return;
        }

        if (message.author === game.leader) {
            message.reply(`Only non-leaders can !forfeit -- if you want to end the game send !stop`);
            return;
        }
        else {
            // TODO: Only allow unique users to forfeit
            game.forfeitCount++;
            if (game.forfeitCount >= 2) {
                var forfeitMessage = `Forfeit vote passed. Game over. ${game.leader} wins! Their word was "${game.secretWord}"\n`;
                forfeitMessage += `Start a new game by sending !start and become the leader!`;
                game.channel.send(forfeitMessage);
                game.reset();
                return;
            } else {
                // TODO: Show how many people need to forfeit
                game.channel.send(`Forfeit count: ${game.forfeitCount}. Anyone else want to give up?`);
            }
        }
    },
}