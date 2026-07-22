import { REST, Routes, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

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
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator
    )

].map(command => command.toJSON());


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
