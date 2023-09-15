//BitBean Bot
const bitbean = require('bitcoinjs-lib');
const testNet = bitbean.networks.testnet;

var auth = require('./auth.json');
var users = require('./users.json');
var fs = require('fs');
var winston = require('winston');

//discord.js stuff
const Discord = require('discord.js');
const client = new Discord.Client();
const token = auth.token;

client.on('ready', () => {		// Le's bOOT IT UP ladies 'n' genlmn!
	console.log('bitbot ready');
	winston.add(
		winston.transports.File, {
			filename: 'node-log-file.json.log',
			level: 'info',
			json: true,
			eol: '\n', // for Windows, or `eol: '\n',` for *NIX OSs
			timestamp: true
		}
	);
});

// BitBean Exchange Commands
client.on('message', message => {
	//sanity check so the bot doesn't message itself or other bots
	if (message.author.bot) {return;}
	
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`	
    if (message.channel.name === "welcome" && message.content.substring(0, 1) === '!') {
        var args = message.content.substring(1).split(' ');
		var cmd = args[0];
		var walletcmd = args[1];
		
		switch (cmd) {
			case 'yee':		//need a "clear" command to wipe chat in case something breaks
				message.reply("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
			case 'bitbot':
				switch (walletcmd) {
					case 'help':
						message.reply("Here's how to use the BitBean Exchange bot on this server!\n\n\t**!bitbot new** DMs you and records your wallet address that you send to the bot privately for easy exchange of BitBean by you, server staff, or other users.\n\t**!bitbot give <user_tag> <amount>:** Gives a server member a set amount of BitBean (you'll be prompted for the amount by the bot to confirm the transaction).\n\t**!bitbot request <user_tag>:** Requests a set amoung of BitBean from a user (again, you'll be prompted by a user, pls don't spam this).\n\t**!bitbot remove** delete your wallet address from the bot's record (you'll get a DM asking you to confirm this change)\n\nIf you have any further questions, please don't hesitate to contact server staff or refer to the BitBean Exchange documentation.");
						break;
					case 'new':		// grab the user's BitBean wallet address through a DM
						message.author.sendMessage("Please enter your BitBean wallet address in this direct message thread.");
						break;		// see DM event handler below
					case    'remove':	// delete user's Bean wallet address from the list, see DM method
						message.author.sendMessage("Are you sure you want to delete your wallet address from this server? You won't be able to use BitBot or participate in certain events if you do!\n\n Type 'yes' to confirm.");
						break;
					case	'send':		// USAGE: !bitbot send <USER_TAG_TO_SEND> <AMOUNT>
						if (args.length !== 4) {
							message.reply("Please tag a member at the end of your message and indicate the amount of *beans* to send (!bitbot send @<USER_TO_SEND> <AMOUNT>).");					
							break;
						} else {
							try {
								// BitBean interaction code here
								var sourceAddr = findAddr(message.author.username + "#" + message.author.discriminator);	// implement findAddr()
								var key = bitbean.ECPair.fromWIF(sourceAddr);
								var trans = new bitbean.TransactionBuilder();
								trans.addInput(sourceAddr, 1);
								trans.addOutput(findAddr(args[2]), args[3]);		// no fee added
								trans.sign(0, key);		// transaction done
								winston.info(trans.build().toHex());
								
								message.reply("You just sent " + args[2] + " some BitBean.");
								winston.info("Transaction from " + message.author.username + "#" + message.author.discriminator + " to " + args[2] + "completed at " Date.now());
							} catch (err) {
								message.reply("Please tag a valid username for someone on this server (include the full name with their unique 4-digit code!).");
							} break;
						}
					default:
						message.reply("Here's how to use the BitBean Exchange bot on this server!\n\n\t**!bitbot new** DMs you and records your wallet address that you send to the bot privately for easy exchange of BitBean by you, server staff, or other users.\n\t**!bitbot give <user_tag> <amount>:** Gives a server member a set amount of BitBean (you'll be prompted for the amount by the bot to confirm the transaction).\n\t**!bitbot request <user_tag>:** Requests a set amoung of BitBean from a user (again, you'll be prompted by a user, pls don't spam this).\n\t**!bitbot remove** delete your wallet address from the bot's record (you'll get a DM asking you to confirm this change)\n\nIf you have any further questions, please don't hesitate to contact server staff or refer to the BitBean Exchange documentation.");
						winston.info(message.author.username + " doesn't know how to use the bot, lol.");
					break;	
				}	
		} 
	}
	
	if (message.channel.type === "dm") {
	    //record user's BitBean wallet address
		var address = message.content; id = message.author.discriminator; var username = message.author.username;
		var userobj;
		if (message.content[0] === "yes" || message.content[0] === "Yes" || message.content[0] === "YES") {
		    userobj = {username: {"id": id, "walletAddr": ""}};
		} else {
			address = message.content;
			userobj = {username: {"id": id, "walletAddr": address}};
		}
					
		fs.writeFile("./users.json", JSON.stringify(userobj, null, 4), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            winston.info(message.author.username + " added to the user list");
        });			
		messageWUser = "Thank you, " + message.author.username + "! Your BitBean wallet address has been recorded for ease of trading *beans* on this server.";
		message.reply(messageWUser);
	}
});

function findAddr(recipient) {
	var re = /.*#[0-9]{4}/;
	var address;	
	try {
	    var input = recipient.match(re);
	} catch(error) {
		winston.debug(error);
		return "broke";
	}
	
    for (var i in users) {
	if (typeof users[i] == input[0] && users.id == input[1]){
		address = users.walletAddr;
		break;
        } else {
	       	winston.debug(error + ", username does not match or is invalid");
	       	return "broke";
	}		
    }
	
	return address;
}

// Chat Clearing Commands
	//const deleteCount

client.login(token);	//new discord.js login stuff
