
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

        const makeBar = (current, max, length = 20) => {
    const percent = Math.max(0, Math.min(current / max, 1));
    const filled = Math.round(percent * length);

    return "█".repeat(filled) + "░".repeat(length - filled);
};

const hpBar = makeBar(player.hp, player.maxHp);
const mpBar = makeBar(player.mp, player.maxMp);

const hpPercent = Math.round((player.hp / player.maxHp) * 100);
const mpPercent = Math.round((player.mp / player.maxMp) * 100);

        const embed = new EmbedBuilder()
            .setColor("#1b1b1b")
            .setTitle("🏛️ The Grand City of Valoria")
            .setThumbnail(avatar)
.setDescription(`
═══════════════《 STATUS 》═══════════════

👤 Name : ${player.characterName}
💎 Ruby : ${player.ruby.toLocaleString()}

❤ HP : ${player.hp}/${player.maxHp}
${hpBar}

◆ MP : ${player.mp}/${player.maxMp}
${mpBar}

⚔ STR : ${player.str}
🧠 INT : ${player.int}

🧬 Race : ${races[player.race]}
⚒ Job : ${jobs[player.job]}
👑 Rank : ${player.rank}

══════════════════════════════════════════
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
