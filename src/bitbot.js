var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
		var walletcmd = args[1];
       
        args = args.splice(1);
        switch(cmd) {
			case  'yee':
				bot.sendMessage({
					to: channelID,
					message: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible."
				});
			case  'wallet':
				switch(walletcmd) {
					case	'help':
						bot.sendMessage({
							to: channelID,
							message: walletcmd
							//message: "Here's how to use the BitBean Exchange bot on this server!\n\t!wallet new <wallet_address>: *Records your wallet address for easy exchange of BitBean by you, server staff, or other users.*\n\t!wallet give <user_tag>: *Gives a server member a set amount of BitBean (you'll be prompted for the amount by the bot to confirm the transaction).*\n\t!wallet request <user_tag>: *Requests a set amoung of BitBean from a user (again, you'll be prompted by a user, pls don't spam this).*\n\n\tIf you have any further questions, please don't hesitate to contact server staff or refer to the BitBean Exchange documentation."
						});
					case	'new':
						bot.sendMessage({
							to: channelID,
							message: "Thank you, username! Your wallet address has been recorded for ease of trading BitBean."
						});
					default:
						bot.sendMessage({
							to: channelID,
							message: "bot machine :b:roke"
						});	
					break;
				}
            break;
         }
     }
});