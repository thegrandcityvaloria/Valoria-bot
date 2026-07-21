import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import db from "./database/database.js";

dotenv.config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once("clientReady", () => {
    console.log("📦 Database Loaded");
    console.log(`✅ ${client.user.tag} Online`);
});

client.login(process.env.TOKEN);
