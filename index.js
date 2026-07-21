console.log("ดึงฐานข้อมูล");

import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import dotenv from "dotenv";

import { connectDB } from "./database/database.js";

import ping from "./commands/ping.js";
import register from "./commands/register.js";
import profile from "./commands/profile.js";

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

// คำสั่งทั้งหมด
const commands = {
    ping,
    register,
    profile
};

// เมื่อบอทออนไลน์
client.once("clientReady", async () => {

    console.log("🚀 New code!");
    console.log(`✅ ${client.user.tag} Online`);

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    try {

        await rest.put(
            Routes.applicationCommands(client.user.id),
            {
                body: [

                    {
                        name: "ping",
                        description: "ทดสอบบอท"
                    },
{
    name: "profile",
    description: "แสดงข้อมูลตัวละคร"
},

                    {
                        name: "register",
                        description: "สร้างตัวละครในเมืองวาโลเรีย",
                        options: [

                            {
                                name: "name",
                                description: "ชื่อตัวละคร",
                                type: 3,
                                required: true
                            },

                            {
                                name: "race",
                                description: "เลือกเผ่าพันธุ์",
                                type: 3,
                                required: true,
                                choices: [
                                    {
                                        name: "มนุษย์",
                                        value: "human"
                                    },
                                    {
                                        name: "เอลฟ์",
                                        value: "elf"
                                    },
                                    {
                                        name: "สัตว์อสูร",
                                        value: "beast"
                                    },
                                    {
                                        name: "ปีศาจ",
                                        value: "demon"
                                    }
                                ]
                            },

                            {
                                name: "job",
                                description: "เลือกอาชีพ",
                                type: 3,
                                required: true,
                                choices: [
                                    {
                                        name: "อัศวิน",
                                        value: "knight"
                                    },
                                    {
                                        name: "นักเวท",
                                        value: "mage"
                                    },
                                    {
                                        name: "พ่อค้า",
                                        value: "trader"
                                    },
                                    {
                                        name: "เชฟ",
                                        value: "chef"
                                    },
                                    {
                                        name: "บาร์เทนเดอร์",
                                        value: "bartender"
                                    }
                                ]
                            }

                        ]
                    }

                ]
            }
        );

        console.log("✅ Slash Commands Registered");

    } catch (error) {

        console.error(error);

    }

});

// รับคำสั่ง
client.on("interactionCreate", async (interaction) => {

    if (!interaction.isChatInputCommand()) return;

    const command = commands[interaction.commandName];

    if (!command) return;

    try {

        await command.execute(interaction);

    } catch (error) {

        console.error(error);

        if (interaction.replied || interaction.deferred) {

            await interaction.followUp({
                content: "❌ เกิดข้อผิดพลาด",
                ephemeral: true
            });

        } else {

            await interaction.reply({
                content: "❌ เกิดข้อผิดพลาด",
                ephemeral: true
            });

        }

    }

});

// เชื่อม MongoDB
connectDB();

// Login
client.login(process.env.TOKEN);
