console.log("ทดสอบใหม่");

import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import dotenv from "dotenv";

import ping from "./commands/ping.js";

dotenv.config();


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});


// คำสั่งทั้งหมด
const commands = {
  ping: ping
};


// ลงทะเบียน Slash Command
client.once("clientReady", async () => {

  console.log("🚀 New code!");
  console.log(`✅ ${client.user.tag} Online`);


  const rest = new REST({ version: "10" })
    .setToken(process.env.TOKEN);
  await rest.put(
    Routes.applicationCommands(client.user.id),
    {
      body: [
        {
          name: "ping",
          description: "ทดสอบบอท"
        }
      ]
    }
  );

  console.log("✅ Slash Command Registered");

});
// รับคำสั่ง Discord
client.on("interactionCreate", async interaction => {

  if (!interaction.isChatInputCommand()) return;


  const command = commands[interaction.commandName];


  if (!command) return;


  await command.execute(interaction);

});


client.login(process.env.TOKEN);
