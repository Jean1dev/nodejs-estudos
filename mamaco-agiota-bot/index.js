const config = require('./config')
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  entersState,
  StreamType,
  AudioPlayerStatus,
  VoiceConnectionStatus,
} = require('@discordjs/voice')
const { Client, Intents } = require('discord.js');
const createDiscordJSAdapter = require('./adapter')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

client.login(config.BOT_TOKEN)

const prefix = '!'

const player = createAudioPlayer();

function playSong() {
  const resource = createAudioResource('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', {
    inputType: StreamType.Arbitrary,
  });

  player.play(resource);

  return entersState(player, AudioPlayerStatus.Playing, 5e3);
}

async function connectToChannel(channel) {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    debug: true,
    adapterCreator: createDiscordJSAdapter(channel),
  });

  try {
    await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
    return connection;
  } catch (error) {
    connection.destroy();
    throw error;
  }
}

client.on('ready', async () => {
  console.log('Discord.js client is ready!');

  try {
    await playSong();
    console.log('Song is ready to play!');
  } catch (error) {
    console.error(error);
  }
});

client.on("messageCreate", async function (message) {
  if (message.author.bot)
    return

  if (!message.content.startsWith(prefix))
    return


  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'agt') {
    console.log(command, args)
    // message.reply(`me pague viado`);

    const channel = message.member?.voice.channel;
    if (channel) {
      try {
        const connection = await connectToChannel(channel);
        connection.subscribe(player);
        message.reply('Playing now!');
      } catch (error) {
        console.error(error);
      }
    } else {
      message.reply('Join a voice channel then try again!');
    }
    // message.channel.send("@everyone My Message");
  }

});
