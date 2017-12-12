//var Discord = require('discord.io');
var logger = require('winston');
//var bitcoin = require('bitcoinjs-lib');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// discord.io implementation, pls no bully
//Initialize Discord Bot
//var bot = new Discord.Client({
//   token: auth.token,
//   autorun: true
//});

//discord.js stuff
const Discord = require('discord.js');
const client = new Discord.Client();
const token = auth.token;

client.on('ready', () => {		// Le's bOOT IT UP ladies 'n' genlmn!
	console.log('bitbot ready');
});

client.on('Message', member => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.channel.name == "welcome" && Message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
		var walletcmd = args[1];
       
        args = args.splice(1);
        if (cmd == 'yee') {
			message.reply("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
		} else if (cmd == 'wallet') {
			switch(walletcmd) {
				case	'help':
					channel.send("Here's how to use the BitBean Exchange bot on this server!\n\t!wallet new <wallet_address>: *Records your wallet address for easy exchange of BitBean by you, server staff, or other users.*\n\t!wallet give <user_tag>: *Gives a server member a set amount of BitBean (you'll be prompted for the amount by the bot to confirm the transaction).*\n\t!wallet request <user_tag>: *Requests a set amoung of BitBean from a user (again, you'll be prompted by a user, pls don't spam this).*\n\n\tIf you have any further questions, please don't hesitate to contact server staff or refer to the BitBean Exchange documentation.");
					break;
				case	'new':
					console.log(this.userID.username);
					//grab the user's BitBean wallet address through a DM
					message.author.sendMessage("Please enter your BitBean wallet address in this direct message thread.");
				
					//record user's BitBean wallet address
					memberName = '${member}';
					messageWUser = "Thank you, " + memberName + "! Your BitBean wallet address has been recorded for ease of trading *beans* on this server.";
						
				
					channel.send(messageWUser);
					break;
				case	'send':
					if (args.length != 3) {
						channel.send("Please tag a member at the end of your message (!wallet send @<USER_TO_SEND>).");					
						break;
					} else {
						// BitBean interaction code here
						channel.send("You just sent " + args[2] + " <X> BitBean.");
						break;
					}
				default:
					console.log("script machine Broke");
				break;	
			}	
		} else {
		    console.log("bot ded");
		}
    } else {console.log("RIP");}
});

client.login(token);	//new discord.js login stuff