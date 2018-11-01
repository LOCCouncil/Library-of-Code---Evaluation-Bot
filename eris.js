const eris = require('eris')
const config = require('./config.json')
const util = require('util')

const client = new eris.CommandClient(config.token, {
    autoreconnect: true,
    getAllUsers: false,
    restMode: true,
    defaultImageFormat: 'png'
  }, {
    defaultHelpCommand: true,
    name: 'Library of Code - Eval Bot',
    owner: 'Matthew#0008',
    prefix: ['@mention ', 'loc eris '],
    defaultCommandOptions: {
      cooldown: 2000,
      cooldownMessage: 'A little too quick there, slow down.'
    }
  });
  
  client.registerCommand('eval', async (msg, args) => {
        const code = args.join(' ');
        if (code === client.disconnect()) return msg.channel.createMessage('You cannot do that.')
        if (code === process.exit()) return msg.channel.createMessage('You cannot do that.')
        if (code === process.kill()) return msg.channel.createMessage('You cannot do that.')
        if (code === process.abort()) return msg.channel.createMessage('You cannot do that.')
        let evaled;
        try {
          evaled = await eval(code);
          switch (typeof evaled) {
            case 'object':
              evaled = util.inspect(evaled, {
                depth: 0
              });
              break;
            default:
          }
        } catch (err) {
          const errorEmbed = {
            title: 'Eris JavaScript Eval',
            color: 16711680,
            description: `\`\`\`xl\n${err}\`\`\``,
            timestamp: new Date(msg.createdAt),
            footer: {
              text: client.user.username,
              icon_url: client.user.avatarURL
            }
          };
          return msg.channel.createMessage({embed: errorEmbed});
        }
        if (typeof evaled === 'string') {
          evaled = evaled.replace(client.token, '[TOKEN]');
        }
        if (evaled == undefined) {
          evaled = 'undefined';
        }
        if (evaled.length > 1900) {
          evaled = 'Response too large to be sent.';
        }
        const successEmbed = {
          title: 'Eris JavaScript Eval',
          color: 65280,
          description: `\`\`\`js\n${evaled}\`\`\``,
          timestamp: new Date(msg.createdAt),
          footer: {
            text: client.user.username,
            icon_url: client.user.avatarURL
          }
        };
        return msg.channel.createMessage({embed: successEmbed});
      }, {
        'description': 'Evaluates JavaScript code.',
        'aliases': ['e'],
        'cooldown': 5000,
        'hidden': true,
        'requirements': {
          //'roleIDs': ['458211172303241227', '468175879395082241', '471776688200613898']
          'userIDs': ['278620217221971968']
        }
      })

    client.registerCommand('info', async (msg, args) => {
        msg.channel.sendTyping();

        const embed = {
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          description: 'This is a clone of the [Moonglow](https://github.com/FCCouncil/Moonglow/tree/loc-eval) GitHub branch. It\'s an open eval bot for people to evaluate code with!',
          fields: [
            {
              name: 'Version',
              value: '1.0.0',
              inline: true
            },
            {
              name: 'Created At',
              value: new Date(client.user.createdAt).toLocaleString('en-us'),
              inline: true
            },
            {
              name: 'Library',
              value: '[Eris](https://github.com/abalabahaha/eris)',
              inline: true
            },
            {
              name: 'Language',
              value: 'JavaScript & TypeScript',
              inline: true
            },
            {
              name: 'Contributors',
              value: 'The Phoenix of Phoebus#9935',
              inline: false
            },
            {
              name: 'Developers',
              value: 'Matthew#0008, CoalSephos#7566, Flatbird#0001',
              inline: false
            }
          ],
          timestamp: new Date(msg.createdAt),
          footer: {
            text: client.user.username,
            icon_url: client.user.avatarURL
          }
        };
        msg.channel.createMessage({embed: embed});
      })

  client.connect()
