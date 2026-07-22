import ServerConfig from "../models/serverConfig.js";
import Player from "../models/players.js";


export default {

name:"guildMemberRemove",


async execute(member){


const config =
await ServerConfig.findOne({
    guildId: member.guild.id
});


if(!config) return;


if(config.deleteOnLeave){


await Player.deleteOne({
    userDiscord: member.id
});

console.log(
`Deleted player ${member.id}`
);

}
}

};