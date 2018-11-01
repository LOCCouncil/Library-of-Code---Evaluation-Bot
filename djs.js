const Discord = require('discord.js');
const config = require('./config.json')


  

// Create an instance of a Discord client
const client = new Discord.Client();
client.clean = async (client, text) => {
    if (text && text.constructor.name == 'Promise');
    text = await text;
    if (typeof evaled !== 'string');
    text = require('util').inspect(text, {depth: 1});

    //text = text; //eslint-disable-line no-self-assign
    text.replace(/`/g, '`' + String.fromCharCode(8203));
    text.replace(/@/g, '@' + String.fromCharCode(8203));
    text.replace(client.token, 'Token is classfied and hidden from this field.');

    return text;
  };

  

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', async message => {
    
  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(config.prefix1) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix1.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'eval' || 'e') {
      if (!message.member.roles.has('507377905370660894')) return;
    const code = args.join(' ');
    if (code === 'client.disconnect()') return message.channel.send('You cannot do that.')
    if (code === 'process.exit()') return message.channel.send('You cannot do that.')
    if (code === 'process.kill()') return message.channel.send('You cannot do that.')
    if (code === 'process.abort()') return message.channel.send('You cannot do that.')
    if (code === 'message.guild.leave()') return message.channel.send('You cannot do that.')
    try {
      let evaled = eval(code);

      if (typeof evaled === 'string') {
      evaled = evaled.replace(client.token, '[TOKEN]');
      }
      //if (typeof evaled !== 'string')
      //evaled = require('util').inspect(evaled, {depth:1});
      const clean = await client.clean(client, evaled);
      const embed1 = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#00FF00')
        .setTitle('Discord.js JavaScript Eval')
        .setDescription(`\`\`\`js\n${clean}\n\`\`\``)
        .setTimestamp()
        .setFooter(`${client.user.username} | Requested by ${message.author.username}#${message.author.discriminator}`);
      message.channel.send(embed1);
    } catch (err) {
      console.log(err);
      const embed2 = new Discord.RichEmbed();
      embed2.setAuthor(client.user.username, client.user.avatarURL);
      embed2.setColor('#FF0000');
      embed2.setTitle('Discord.js JavaScript Eval');
      embed2.setDescription(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
      embed2.setTimestamp();
      embed2.setFooter(`${client.user.username} | Requested by ${message.author.username}#${message.author.discriminator}`);
      message.channel.send(embed2);
    } 
  }

  if (command === 'info') {
    const msg = await message.channel.send('Loading info...');
    const embed = new Discord.RichEmbed();
    embed.setAuthor(`${client.user.username}`, `${client.user.avatarURL}`);
    if (message.guild) {
      embed.setColor(message.guild.me.displayHexColor);
    } else {
      embed.setColor('RANDOM');
    }
    embed.setDescription('This is a clone of the [Moonglow](https://github.com/FCCouncil/Moonglow/loc-eval) GitHub branch. It\'s an open eval bot for people to evaluate code with!');
    embed.addField('Version', '1.0.0', true);
    embed.addField('Created At', `${client.user.createdAt.toLocaleString('en-US')}`, true);
    embed.addField('Library', '[Discord.js](https://github.com/discordjs/discord.js)', true);
    embed.addField('Language', 'JavaScript', true);
    embed.addField('Contributors', 'TheSkele27#1337, The Phoenix of Phoebus#9935, Tiger#8726', true);
    embed.addField('Developers', 'Matthew#0008, NightRaven#2172, CoalSephos#7566, Flatbird#0001');
    embed.addField('Creator', 'Matthew#0008', true);
    embed.setTimestamp();
    embed.setFooter(`${client.user.username} | LoC Council`, 'https://cdn.discordapp.com/attachments/358674161566220288/493662532746084352/js.png');
  }
//please wait
  })

  process.on('uncaughtException', (err) => {
    //const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    const errorMsg = err.stack;
    console.log(`Uncaught Exception Error: ${errorMsg}`);
    //Raven.captureException(err);
    // Always best practice to let the code crash on uncaught exceptions. 
    // Because you should be catching them anyway.
    process.exit(1);
  });
  
  process.on('unhandledRejection', err => {
    console.log(`Unhandled Rejection Error: ${err.stack}`);
    //client.channels.get('503374059044601872').send(err);
    //Raven.captureException(err);
  });

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(config.token);

