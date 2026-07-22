console.log("ดึงฐานข้อมูล");

import {
    Client,
    GatewayIntentBits,
    Collection
} from "discord.js";

import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./database/database.js";

import ping from "./commands/ping.js";
import register from "./commands/register.js";
import profile from "./commands/profile.js";
import config from "./commands/config.js";





const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});


client.commands = new Collection();


client.commands.set("ping", ping);
client.commands.set("register", register);
client.commands.set("profile", profile);
client.commands.set("config", config);



client.once("clientReady", () => {

    console.log(`✅ ${client.user.tag} Online`);

});


client.on(
"interactionCreate",
async interaction => {

    if(!interaction.isChatInputCommand())
        return;


    const command =
    client.commands.get(
        interaction.commandName
    );


    if(!command) return;


    try{

        await command.execute(interaction);

    }catch(error){

        console.error(error);

    }

});


connectDB();


client.on("error", error => {
    console.error("Discord Error:", error);
});


client.on("invalidated", () => {
    console.log("❌ Session ถูกยกเลิก");
});


process.on("unhandledRejection", error => {
    console.error("Unhandled Error:", error);
});


client.login(process.env.TOKEN);