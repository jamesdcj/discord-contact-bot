module.exports = {
    name: 'setword',
    description: 'Leader sets the secret word',
    usage: '<word>',
    example: 'funky',
    guildOnly: false,
    dmOnly: true,
    execute(message, args, game) {
        // TODO: create game state machine
        // if (game.inProgress == true) {
        //     message.reply(`Sorry, game is in progress already. Talk to ${game.leader.username} to start a new one!`);
        //     return;
        // }

        if (message.author != game.leader)
        {
            message.reply(`Cheater...you aren't the leader. Talk to ${game.leader}.`);
            return;
        }

        if (args.length != 1)
        {
            message.reply(`Try again with ONLY one word after !setword`);
            return;
        }

        // TODO: make sure it is only text and IS a word

        game.inProgress = true;
        game.leader = message.author;
        game.secretWord = args[0];
        game.revealLen = 1;

        message.reply(`Got it. Go back to start playing`);
        game.channel.send(`Game Started! Leader: ${game.leader}. Starting letter is: "${game.secretWord.substring(0, game.revealLen)}"`);
    },
}