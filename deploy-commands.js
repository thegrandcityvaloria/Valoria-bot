import { REST, Routes, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ทดสอบบอท")
    .toJSON()
];


const rest = new REST({ version: "10" })
.setToken(process.env.TOKEN);


try {

  console.log("กำลังลงทะเบียนคำสั่ง...");

  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    {
      body: commands
    }
  );

  console.log("✅ ลงทะเบียน Slash Command สำเร็จ");

} catch (error) {

  console.error(error);

}
