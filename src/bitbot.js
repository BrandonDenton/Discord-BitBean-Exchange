//BitBean Bot

//var Discord = require('discord.io');
var logger = require('winston');
//var bitcoin = require('bitcoinjs-lib');
var auth = require('./auth.json');
//var config = require('./config.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

//log records on server side
//var file = new File(config.logfile);

//discord.js stuff
const Discord = require('discord.js');
const client = new Discord.Client();
const token = auth.token;

client.on('ready', () => {		// Le's bOOT IT UP ladies 'n' genlmn!
	console.log('bitbot ready');
	// need to figure out how to limit messages by time instead of by quantity
	//message.channel.fetchMessages({limit: 15}).then(messages => message.channel.bulkDelete(messages));
	//console.log(client.channels);
});

client.on('message', message => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`	
    if (message.channel.name == "welcome" && message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
		var cmd = args[0];
		var walletcmd = args[1];
		
        if (cmd == 'yee') {
			message.reply("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
		} else if (cmd == 'wallet') {
			switch(walletcmd) {
				case	'help':
					message.reply("Here's how to use the BitBean Exchange bot on this server!\n\n\t**!wallet new:** DMs you and records your wallet address that you send to the bot privately for easy exchange of BitBean by you, server staff, or other users.\n\t**!wallet give <user_tag>:** Gives a server member a set amount of BitBean (you'll be prompted for the amount by the bot to confirm the transaction).\n\t**!wallet request <user_tag>:** Requests a set amoung of BitBean from a user (again, you'll be prompted by a user, pls don't spam this).\n\nIf you have any further questions, please don't hesitate to contact server staff or refer to the BitBean Exchange documentation.");
					break;
				case	'new':
					//grab the user's BitBean wallet address through a DM
					message.author.sendMessage("Please enter your BitBean wallet address in this direct message thread.");
				
					//record user's BitBean wallet address
					memberName = '${member}';
					messageWUser = "Thank you, " + memberName + "! Your BitBean wallet address has been recorded for ease of trading *beans* on this server.";
						
				
					message.reply(messageWUser);
					break;
				case	'send':
					if (args.length != 3) {
						message.reply("Please tag a member at the end of your message (!wallet send @<USER_TO_SEND>).");					
						break;
					} else {
						// BitBean interaction code here
						message.reply("You just sent " + args[2] + " <X> BitBean.");
						break;
					}
				default:
					message.reply("Here's how to use the BitBean Exchange bot on this server!\n\n\t**!wallet new:** DMs you and records your wallet address that you send to the bot privately for easy exchange of BitBean by you, server staff, or other users.\n\t**!wallet give <user_tag>:** Gives a server member a set amount of BitBean (you'll be prompted for the amount by the bot to confirm the transaction).\n\t**!wallet request <user_tag>:** Requests a set amoung of BitBean from a user (again, you'll be prompted by a user, pls don't spam this).\n\nIf you have any further questions, please don't hesitate to contact server staff or refer to the BitBean Exchange documentation.");
					console.log(message.author.username + " doesn't know how to use the bot, lol.");
				break;	
			}	
		} else {
		    console.log("bot ded");
		}
    }
});

client.login(token);	//new discord.js login stuff