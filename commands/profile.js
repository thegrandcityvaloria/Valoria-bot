
console.log("🔥 โปรถูกใช้งาน");

import { EmbedBuilder } from "discord.js";

import Player from "../models/players.js";

import { races } from "../config/races.js";
import { jobs } from "../config/jobs.js";

export default {

    name: "profile",

    async execute(interaction) {

        const player = await Player.findOne({

            userDiscord: interaction.user.id

        });

        if (!player) {

            return interaction.reply({

                content: "❌ คุณยังไม่ได้สร้างตัวละคร ใช้ /register ก่อน",

                ephemeral: true

            });

        }

        const avatar = interaction.member.displayAvatarURL({

            size: 1024

        });

        const createdDate = player.createdAt.toLocaleDateString("th-TH");

        const embed = new EmbedBuilder()

            .setColor("#111111")

            .setTitle("🏛️ The Grand City Of Valoria")

            .setThumbnail(avatar)

           const makeBar = (current, max, size = 6) => {
    const filled = Math.round((current / max) * size);
    return "▰".repeat(filled) + "▱".repeat(size - filled);
};

const hpBar = makeBar(player.hp, player.maxHp);
const mpBar = makeBar(player.mp, player.maxMp);

embed
.setColor("#111111")
.setTitle("🏛️ The Grand City of Valoria")
.setThumbnail(avatar)
.setDescription(`

## █▓▒­░⡷⠂**STATE**⠐⢾░▒▓█

**__Name__ :** ${player.characterName}
**__Ruby__ :** ${player.ruby} 💎

>  **เผ่าพันธุ์** : ${races[player.race]}
>  **อาชีพ** : ${jobs[player.job]} 
>  **Rank** : ${player.rank}
>  **Level** : ${player.level}

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

Skill Point : ${player.skillPoint ?? 64}
\`\`\`


📅 ${createdDate}
`)
            .setFooter({
                text: `The Grand City of Valoria • ${interaction.user.username}`
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
    }
};

    
