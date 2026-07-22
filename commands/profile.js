
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

           const makeBar = (current, max, length = 10) => {
    const percent = Math.max(0, Math.min(current / max, 1));
    const filled = Math.round(percent * length);
    return "█".repeat(filled) + "░".repeat(length - filled);
};

const hpBar = makeBar(player.hp, player.maxHp);
const mpBar = makeBar(player.mp, player.maxMp);

embed
.setDescription(`
\`\`\`
╔═══════════════『 STATUS 』═══════════════╗

   👤 Name : ${player.characterName}
   💎 Ruby : ${player.ruby.toLocaleString()}

══════════════════════════════════════════

 ❤️ HP  ${String(player.hp).padStart(4)}/${player.maxHp}
      ${hpBar}

 💙 MP  ${String(player.mp).padStart(4)}/${player.maxMp}
      ${mpBar}

══════════════════════════════════════════

 ⚔ PK        : ${player.pk ?? 0}
 🛡 DP        : ${player.dp ?? 9}

 ✦ EXP       : ${player.exp.toLocaleString()}
 ✦ Class EXP : ${player.cExp ?? 86}

══════════════════════════════════════════

 ⚔ STR : ${String(player.str).padEnd(6)}
 💨 AGI : ${String(player.agi).padEnd(6)}

 🧠 INT : ${String(player.int).padEnd(6)}
 🛡 VIT : ${String(player.vit).padEnd(6)}

 🏹 DEX : ${String(player.dex).padEnd(6)}
 🍀 LUK : ${String(player.luck).padEnd(6)}

══════════════════════════════════════════

 🎯 Skill Point : ${player.skillPoint ?? 64}

 🌿 Race  : ${races[player.race]}
 ⚒ Job   : ${jobs[player.job]}
 👑 Rank  : ${player.rank}
 ⭐ Level : ${player.level}

══════════════════════════════════════════

 📅 Joined : ${createdDate}

╚════════════════════════════════════════╝
\`\`\`
)

            )

            .setFooter({

                text: "The Grand City Of Valoria"

            })

            .setTimestamp();

        await interaction.reply({

            embeds: [embed]

        });

    }

};
