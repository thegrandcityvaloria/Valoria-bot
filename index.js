console.log("ทดสองบ");
import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("clientReady", () => {
  console.log("🚀 โค้ดเวอร์ชันใหม่ทำงานแล้ว!");
  console.log(`✅ ${client.user.tag} Online`);
});

client.login(process.env.TOKEN);
