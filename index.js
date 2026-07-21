console.log("ทดสอบใหม่");

import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});


const commands = [
  {
    name: "ping",
    description: "ทดสอบบอท"
  }
];


client.once("clientReady", async () => {

  console.log("🚀 New code!");
  console.log(`✅ ${client.user.tag} Online`);


  const rest = new REST({ version: "10" })
    .setToken(process.env.TOKEN);


  await rest.put(
    Routes.applicationCommands(client.user.id),
    {
      body: commands
    }
  );

  console.log("✅ Slash Command Registered");

});


client.on("interactionCreate", async interaction => {

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("🏓 Pong!");
  }

});


client.login(process.env.TOKEN);
