import {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits
} from "discord.js";

import ServerConfig from "../models/serverConfig.js";


export default {

name: "config",

data: new SlashCommandBuilder()
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
    ),


async execute(interaction){

    if(
        !interaction.member.permissions.has(
            PermissionFlagsBits.Administrator
        )
    ){

        return interaction.reply({
            content:"❌ คุณไม่มีสิทธิ์ใช้คำสั่งนี้",
            ephemeral:true
        });

    }


    const value =
        interaction.options.getBoolean("delete_leave");


    await ServerConfig.findOneAndUpdate(
        {
            guildId: interaction.guild.id
        },
        {
            deleteOnLeave: value
        },
        {
            upsert:true
        }
    );


    const embed = new EmbedBuilder()

    .setColor("#111111")

    .setTitle("VALORIA SYSTEM")

    .setDescription(`
        
**Server Configuration Updated**

Player Leave Delete:${value ? "🗑️ Enabled" : "💾 Disabled"}

━━━━━━━━━━━━━━━━

${value 
? "เมื่อผู้เล่นออก ตัวละครจะถูกลบ"
: "ข้อมูลตัวละครจะถูกเก็บไว้"
}
`);


await interaction.reply({
    embeds:[embed],
    ephemeral:true
});


}

};