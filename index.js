console.log("ทดสอบใหม่");

import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});


client.once("clientReady", () => {
  console.log("🚀 New code!");
  console.log(`✅ ${client.user.tag} Online`);
});


// Slash Command Test
client.on("interactionCreate", async interaction => {

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("🏓 Pong!");
  }

});


client.login(process.env.TOKEN);
