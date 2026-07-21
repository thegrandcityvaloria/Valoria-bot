
โค้ด แต่อยากให้แก้เรียงแบบในรูป พวกชื่อสถสนะ

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

            .setDescription(`Player  ${interaction.user}`)

            .addFields(

                {
                    name: "👤 ชื่อตัวละคร",
                    value: player.characterName,
                    inline: true
                },

                {
                    name: "🧬 เผ่า",
                    value: races[player.race],
                    inline: true
                },

                {
                    name: "⚔️ อาชีพ",
                    value: jobs[player.job],
                    inline: true
                },

                {
                    name: "🏅 Rank",
                    value: player.rank,
                    inline: true
                },

                {
                    name: "⭐ Level",
                    value: player.level.toString(),
                    inline: true
                },

                {
                    name: "✨ EXP",
                    value: player.exp.toString(),
                    inline: true
                },

                {
                    name: "💎 Ruby",
                    value: player.ruby.toString(),
                    inline: true
                },

                {
                    name: "❤️ HP",
                    value: `${player.hp} / ${player.maxHp}`,
                    inline: true
                },

                {
                    name: "🔷 MP",
                    value: `${player.mp} / ${player.maxMp}`,
                    inline: true
                },

                {
                    name: "⚔️ STR",
                    value: player.str.toString(),
                    inline: true
                },

                {
                    name: "🏹 DEX",
                    value: player.dex.toString(),
                    inline: true
                },

                {
                    name: "💨 AGI",
                    value: player.agi.toString(),
                    inline: true
                },

                {
                    name: "🛡️ VIT",
                    value: player.vit.toString(),
                    inline: true
                },

                {
                    name: "🧠 INT",
                    value: player.int.toString(),
                    inline: true
                },

                {
                    name: "🍀 LUCK",
                    value: player.luck.toString(),
                    inline: true
                },

                {
                    name: "📅 วันที่เข้าร่วมเมือง",
                    value: createdDate,
                    inline: false
                }

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
