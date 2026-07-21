import {
    EmbedBuilder
} from "discord.js";

import Player from "../models/players.js";

import { raceRoles, jobRoles } from "../config/roles.js";
import { races } from "../config/races.js";
import { jobs } from "../config/jobs.js";

export default {

    name: "register",

    async execute(interaction) {

        const userDiscord = interaction.user.id;

        const discordUsername = interaction.user.username;

        const characterName = interaction.options.getString("name");

        const race = interaction.options.getString("race");

        const job = interaction.options.getString("job");

        // เช็กว่าลงทะเบียนหรือยัง
        const existingPlayer = await Player.findOne({
            userDiscord
        });

        if (existingPlayer) {

            return interaction.reply({
                content: "❌ คุณมีตัวละครอยู่แล้ว",
                ephemeral: true
            });

        }

        // ตรวจสอบชื่อ
        if (
            characterName.length < 3 ||
            characterName.length > 16
        ) {

            return interaction.reply({

                content:
                    "❌ ชื่อตัวละครต้องมี 3-16 ตัวอักษร",

                ephemeral: true

            });

        }

        // มนุษย์ห้ามเป็น Knight / Mage
        if (
            race === "human" &&
            (job === "knight" || job === "mage")
        ) {

            return interaction.reply({

                content:
                    "❌ มนุษย์ไม่สามารถเลือกอาชีพนี้ได้",

                ephemeral: true

            });

        }
                // สร้างตัวละคร
        const player = await Player.create({

            // Discord
            userDiscord: userDiscord,
            discordUsername: discordUsername,

            // Character
            characterName: characterName,
            race: race,
            job: job,

            // Progression
            rank: "E",
            level: 1,
            exp: 0,
            ruby: 1000,

            // HP / MP
            hp: 100,
            maxHp: 100,

            mp: 100,
            maxMp: 100,

            // Stats
            str: 10,
            dex: 10,
            agi: 10,
            vit: 10,
            int: 10,
            luck: 10

        });

        // ===== แจกยศ Discord =====

        try {

            const member = interaction.member;

            // ยศเผ่า
            if (raceRoles[race]) {
                await member.roles.add(raceRoles[race]);
            }

            // ยศอาชีพ
            if (jobRoles[job]) {
                await member.roles.add(jobRoles[job]);
            }

        } catch (err) {

            console.log("Role Error :", err);

        }
                // ===== Embed =====

        const embed = new EmbedBuilder()

            .setColor("#111111")

            .setTitle("🏛️ The Grand City Of Valoria")

            .setDescription("✨ ลงทะเบียนตัวละครสำเร็จ")

            .addFields(

                {
                    name: "👤 ชื่อตัวละคร",
                    value: player.characterName,
                    inline: true
                },

                {
                    name: "🧬 เผ่าพันธุ์",
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
