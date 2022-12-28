import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const PERMS_INT = 2048

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'dm-me') {
    await sendDM('triggered')
    await interaction.reply({ content: 'done', ephemeral: true });
  }
});

const sendDM = async (message: string) => {
  console.log('sending message')
  const guild = client.guilds.cache.get(process.env.GUILD_ID!)
  // const member = guild?.members.cache.get(process.env.USER_ID!)!
  const member = await guild?.members.fetch(process.env.USER_ID!)
  await member?.user.send(message)
  // await member.send(message)
}

setTimeout(() => {
  sendDM('on interval')
}, 2000)

const url = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&permissions=${PERMS_INT}&scope=bot%20applications.commands`

console.log('url to add to server:', url)

client.login(process.env.DISCORD_TOKEN);
