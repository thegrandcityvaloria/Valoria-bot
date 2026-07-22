import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({

    // Discord
    userDiscord: {
        type: String,
        required: true,
        unique: true
    },

    discordUsername: {
        type: String,
        required: true
    },

    // Character
    characterName: {
        type: String,
        required: true
    },

    race: {
        type: String,
        required: true
    },

    job: {
        type: String,
        required: true
    },

    // Progression
    rank: {
        type: String,
        default: "E"
    },

    level: {
        type: Number,
        default: 1
    },

    exp: {
        type: Number,
        default: 0
    },

    ruby: {
        type: Number,
        default: 1000
    },

    // HP / MP
    hp: {
        type: Number,
        default: 100
    },

    maxHp: {
    type: Number,
    default: 5000
},

    mp: {
        type: Number,
        default: 100
    },

    maxMp: {
    type: Number,
    default: 2000
},

    // Stats
    str: {
        type: Number,
        default: 10
    },

    dex: {
        type: Number,
        default: 10
    },

    agi: {
        type: Number,
        default: 10
    },

    vit: {
        type: Number,
        default: 10
    },

    int: {
        type: Number,
        default: 10
    },

    luck: {
        type: Number,
        default: 10
    },

    // Profession
profession: {
    type: Map,
    of: new mongoose.Schema({
        level: {
            type: Number,
            default: 1
        },
        exp: {
            type: Number,
            default: 0
        }
    }, {
        _id: false
    }),
    default: {}
},

        // Points
        statPoint: {
            type: Number,
            default: 0
        },
        
        skillPoint: {
            type: Number,
            default: 0
        },
        
        // PvP
        pk: {
            type: Number,
            default: 0
        },
        
dp: {
    type: Number,
    default: 0
},

createdAt: {
    type: Date,
    default: Date.now
}

});

export default mongoose.model("Player", playerSchema, "player");
