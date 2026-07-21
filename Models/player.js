import mongoose from "mongoose";


const playerSchema = new mongoose.Schema({

    // Discord User ID
    userDiscord:{
        type:String,
        required:true,
        unique:true
    },

    // ชื่อตัวละคร
    username:{
        type:String,
        required:true
    },

    // เผ่าพันธุ์
    race:{
        type:String,
        default:"ไม่ระบุ"
    },

    // อาชีพ
    job:{
        type:String,
        default:"ผู้เริ่มต้น"
    },

    // Rank
    rank:{
        type:String,
        default:"E"
    },

    // EXP
    exp:{
        type:Number,
        default:0
    }
});

export default mongoose.model(
    "Player",
    playerSchema,
    "player"
);
