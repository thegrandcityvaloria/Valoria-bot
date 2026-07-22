import { EmbedBuilder } from "discord.js";

export function createEmbed(title) {

    return new EmbedBuilder()

        .setColor("#111111")

        .setTitle(title)

        .setTimestamp()

        .setFooter({

            text: "The Grand City Of Valoria"

        });

}
