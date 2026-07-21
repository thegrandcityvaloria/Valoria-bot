import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({

    userDiscord: {
        type: String,
        required: true,
        unique: true
    },

    username: {
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

    rank: {
        type: String,
        default: "E"
    },

    exp: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

export default mongoose.model("Player", playerSchema, "player");
