import Player from "../Models/player.js";


export default {

    name: "register",

    async execute(interaction){

        const userDiscord = interaction.user.id;


        // เช็กว่าลงทะเบียนแล้วหรือยัง
        const existingPlayer = await Player.findOne({
            userDiscord: userDiscord
        });


        if(existingPlayer){

            return interaction.reply({
                content:"❌ คุณมีตัวละครอยู่แล้ว",
                ephemeral:true
            });

        }


        // สร้างตัวละครเริ่มต้น
        const player = await Player.create({

            userDiscord: userDiscord,

            username: interaction.user.username,

            race:"มนุษย์",

            job:"ผู้เริ่มต้น",

            rank:"E",

            exp:0

        });


        await interaction.reply({

            content:
`🎉 สร้างตัวละครสำเร็จ!

👤 ชื่อ: ${player.username}
🧬 เผ่าพันธุ์: ${player.race}
⚔️ อาชีพ: ${player.job}
🏅 Rank: ${player.rank}
✨ EXP: ${player.exp}`

        });

    }

};
