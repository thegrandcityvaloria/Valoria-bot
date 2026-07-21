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

        // ===== HP / MP BAR =====
        const makeBar = (current, max, size = 5) => {
            const filled = Math.round((current / max) * size);
            return "▰".repeat(filled) + "▱".repeat(size - filled);
        };

        const hpBar = makeBar(player.hp, player.maxHp);
        const mpBar = makeBar(player.mp, player.maxMp);

        const embed = new EmbedBuilder()
            .setColor("#111111")
            .setTitle("🏛️ The Grand City of Valoria")
            .setThumbnail(avatar)
            .setDescription(`
# ◈ STATE ◈

**Name :** ${player.characterName}
**Ruby :** ${player.ruby} 💎

\`\`\`
HP : ${player.hp} ${hpBar} ${player.maxHp}
MP : ${player.mp} ${mpBar} ${player.maxMp}

「 PK : ${player.pk ?? 0} 」   「 DP : ${player.dp ?? 0} 」

EXP  : ${player.exp}
CEXP : ${player.cExp ?? 0}

────────────────────

STR : ${player.str}     AGI : ${player.agi}
INT : ${player.int}     VIT : ${player.vit}
DEX : ${player.dex}     LUK : ${player.luck}

Skill Point : ${player.skillPoint ?? 0}
\`\`\`

> 🧬 เผ่า : ${races[player.race]}
> ⚔️ อาชีพ : ${jobs[player.job]}
> 🏅 Rank : ${player.rank}
> ⭐ Level : ${player.level}

📅 วันที่เข้าร่วมเมือง : ${createdDate}
`)
            .setFooter({
                text: "The Grand City of Valoria"
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
    }
};
