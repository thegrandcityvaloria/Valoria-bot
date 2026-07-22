console.log("TEST DEPLOY FILE");
import {
  REST,
  Routes,
  SlashCommandBuilder,
  PermissionFlagsBits
} from "discord.js";

import dotenv from "dotenv";

dotenv.config(); 
console.log("กำลังรันไฟล์ deploy ตัวนี้");

const commands = [

  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ทดสอบบอท"),


  new SlashCommandBuilder()
    .setName("profile")
    .setDescription("ดูโปรไฟล์")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("ผู้เล่นที่ต้องการดู")
        .setRequired(false)
    ),


  new SlashCommandBuilder()
  .setName("config")
  .setDescription("ตั้งค่าระบบ Valoria")
  .addBooleanOption(option =>
    option
      .setName("delete_leave")
      .setDescription("ลบตัวละครเมื่อผู้เล่นออกจากเซิร์ฟหรือไม่")
      .setRequired(true)
  )
//  .setDefaultMemberPermissions(
//    PermissionFlagsBits.Administrator
//  )

].map(command => command.toJSON());


const rest = new REST({ version: "10" })
.setToken(process.env.TOKEN);

console.log(commands.map(command => command.name));

try {

  console.log("กำลังลงทะเบียนคำสั่ง...");

const data = await rest.put(
  Routes.applicationGuildCommands(
    process.env.CLIENT_ID,
    process.env.GUILD_ID
  ),
  {
    body: commands
  }
);

  console.log("✅ ลงทะเบียน Slash Command สำเร็จ");
  console.log(data);

} catch (error) {

  console.error("❌ Deploy Error:");
  console.error(error);

}