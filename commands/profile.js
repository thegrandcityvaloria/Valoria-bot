
console.log("ดาวน์โหลดโปรไฟล์สำเร็จ ✅");

import { EmbedBuilder } from "discord.js";

import Player from "../models/players.js";

import { races } from "../config/races.js";
import { jobs } from "../config/jobs.js";

export default {

   
    async execute(interaction) {

        const targetUser =
    interaction.options.getUser("user") ?? interaction.user;
const targetMember =
    interaction.options.getMember("user") ?? interaction.member;

const player = await Player.findOne({
    userDiscord: targetUser.id
});

        if (!player) {

            return interaction.reply({

content:
targetUser.id === interaction.user.id
? "❌ คุณยังไม่ได้สร้างตัวละคร ใช้ /register ก่อน"
: `❌ ${targetUser.username} ยังไม่ได้สร้างตัวละคร`,

                ephemeral: true

            });

        }

        const avatar = targetUser.displayAvatarURL({
    size: 1024
});

        const createdDate = player.createdAt.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
});
    
        const daysPlayed = Math.floor(
    (Date.now() - player.createdAt.getTime()) / (1000 * 60 * 60 * 24)
);

        const makeBar = (current, max, size = 6) => {
        const filled = Math.round((current / max) * size);
    return "▰".repeat(filled) + "▱".repeat(size - filled);
};

const hpBar = makeBar(player.hp, player.maxHp);
const mpBar = makeBar(player.mp, player.maxMp);


        const embed = new EmbedBuilder()

            .setColor("#FFD700")

            .setTitle("█▓▒­░⡷⠂STATE⠐⢾░▒▓█")

            .setThumbnail(avatar)


.setDescription(`


>  เผ่าพันธุ์ : ${races[player.race]}  |  อาชีพ : ${jobs[player.job]} 
>      Rank : ${player.rank}                   Level : ${player.level}
-# \`\`\`   Player : ${player.characterName}  \`\`\`
**Ruby :** ${player.ruby.toLocaleString()} 💎

-# \`\`\`   system...   \`\`\`
HP : ${String(player.hp).padEnd(5)} ${hpBar} ${player.maxHp}
MP : ${String(player.mp).padEnd(5)} ${mpBar} ${player.maxMp}

「 PK : ${player.pk ?? 0} 」      「 DP : ${player.dp ?? 9} 」
\`\`\`
╭──────────────╮
│ EXP  : ${String(player.exp).padEnd(6)}│
│ CEXP : ${String(player.cExp ?? 86).padEnd(6)}│
╰──────────────╯
──────────────────────────

STR : ${String(player.str).padEnd(5)} AGI : ${player.agi}
INT : ${String(player.int).padEnd(5)} VIT : ${player.vit}
DEX : ${String(player.dex).padEnd(5)} LUK : ${player.luck}

skill points : ${player.skillPoint ?? 64}
\`\`\`
-# Login :  ${createdDate} ${daysPlayed} Day
`)
            .setFooter({
    text: `The Grand City of Valoria • ${targetUser.username}`
})
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
        
    }
};

    
