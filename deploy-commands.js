import {
    REST,
    Routes,
    PermissionFlagsBits
} from "discord.js";

import dotenv from "dotenv";

dotenv.config();
console.log("TOKEN:", process.env.TOKEN ? "เจอแล้ว" : "ไม่เจอ");
console.log("CLIENT_ID:", process.env.CLIENT_ID);
console.log("GUILD_ID:", process.env.GUILD_ID);

const commands = [

    {
        name: "ping",
        description: "ทดสอบบอท"
    },

    {
        name: "profile",
        description: "ดูโปรไฟล์",
        options:[
            {
                name:"user",
                description:"ผู้เล่นที่ต้องการดู",
                type:6,
                required:false
            }
        ]
    },

{
    name:"register",
    description:"สร้างตัวละครในเมืองวาโลเรีย",

    options:[

        {
            name:"name",
            description:"ชื่อตัวละคร",
            type:3,
            required:true
        },

        {
            name:"race",
            description:"เลือกเผ่าพันธุ์",
            type:3,
            required:true,
            choices:[
                {
                    name:"มนุษย์",
                    value:"human"
                },
                {
                    name:"เอลฟ์",
                    value:"elf"
                },
                {
                    name:"สัตว์อสูร",
                    value:"beast"
                },
                {
                    name:"ปีศาจ",
                    value:"demon"
                }
            ]
        },

        {
            name:"job",
            description:"เลือกอาชีพ",
            type:3,
            required:true,
            choices:[
                {
                    name:"อัศวิน",
                    value:"knight"
                },
                {
                    name:"นักเวท",
                    value:"mage"
                },
                {
                    name:"พ่อค้า",
                    value:"trader"
                },
                {
                    name:"เชฟ",
                    value:"chef"
                },
                {
                    name:"บาร์เทนเดอร์",
                    value:"bartender"
                }
            ]
        }

    ]
},


        {
    name:"config",
    description:"ตั้งค่าระบบ Valoria",
    default_member_permissions: "8",
    options:[
        {
            name:"delete_leave",
            description:"ลบตัวละครเมื่อออกเซิร์ฟหรือไม่",
            type:5,
            required:true
        }
    ]
}
    

];
console.log(commands.map(c => c.name));

const rest = new REST({version:"10"})
.setToken(process.env.TOKEN);


try{

    console.log("กำลังลงทะเบียน...");


await rest.put(
    Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
    ),
    { body: commands }
);

console.log("Commands Registered");

}catch(error){

    console.error(error);

}