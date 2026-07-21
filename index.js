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

client.login(process.env.TOKEN);
