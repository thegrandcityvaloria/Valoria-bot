import mongoose from "mongoose";

const serverConfigSchema = new mongoose.Schema({

    guildId: {
        type: String,
        required: true,
        unique: true
    },

    deleteOnLeave: {
        type: Boolean,
        default: false
    }

});

export default mongoose.model(
    "ServerConfig",
    serverConfigSchema
);