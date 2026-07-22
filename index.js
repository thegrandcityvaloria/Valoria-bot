console.log("ดึงฐานข้อมูล");

import {
    Client,
    GatewayIntentBits,
    Collection
} from "discord.js";

import dotenv from "dotenv";
import { connectDB } from "./database/database.js";

import ping from "./commands/ping.js";
import register from "./commands/register.js";
import profile from "./commands/profile.js";
import config from "./commands/config.js";


dotenv.config();


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



client.once("ready", () => {

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

client.login(process.env.TOKEN);