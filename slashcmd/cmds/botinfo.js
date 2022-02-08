const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")

const OS = require('os');
const free = OS.freemem(); 
const maxMemory = OS.totalmem();
const prettyMilliseconds = require("pretty-ms");
function getMemoryUsage() {
    const free = OS.freemem(); 
    
    return {
        max: memory(maxMemory),
        free: memory(free),
        used: memory(maxMemory - free), 
        usedByProcess: memory(process.memoryUsage().rss) 
    }
}


function memory(bytes = 0) {
const gigaBytes = bytes / 1024 ** 3; 
if(gigaBytes > 1) { 
    return `${gigaBytes.toFixed(1)} GB`; 
}

const megaBytes = bytes / 1024 ** 2; 

if(megaBytes < 10) return `${megaBytes.toFixed(2)} MB`; 

    
if(megaBytes < 100) return `${megaBytes.toFixed(1)} MB`; 

    
 return `${Math.floor(megaBytes)} MB`; 
}

module.exports = {
    timeout: 5000,
    
    data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Get the Bot info"),

    async run(client, interaction){
try{

    let memoria = getMemoryUsage();

    
		const promises = [
			client.shard.fetchClientValues('guilds.cache.size'),
			client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
		];
		return Promise.all(promises)
			.then(results => {
				const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
				const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
        const osu = require('node-os-utils')
        var cpu = osu.cpu
        var os = require('os');

        cpu.usage()
        .then(info => {

        
const embed = new MessageEmbed()
.setAuthor("Information of "+client.user.username, client.user.avatarURL())
.setColor('RANDOM')
.addField(`<:8263blurplemembers:863131216030859325>  Communities`, `**Servers:** ${totalGuilds}\n **Users:** ${totalMembers}`)
.addField('Creation date:', '```yaml\n'+`${client.user.createdAt.toLocaleDateString("es-pe")}`+' ```')
.addField('CPU Used:', "```yaml\n% " + info + "```")
.addField('CPU:', "```yaml\n" + os.cpus()[0].model + "```")
.addField('RAM:', "```yaml\n" + memoria.usedByProcess +'/'+ memoria.max+"```")
.addField('Discord.js',`V${Discord.version}`)
.addField('Node.js',`${process.version}`)
.addField('UpTime:', `${prettyMilliseconds(client.uptime)}`)
.setTimestamp()
.setThumbnail(client.user.avatarURL({dynamic: true, size: 4096, format: 'png'}))

/*
.addComponents(
  new Discord.MessageButton()
  .setStyle('LINK')
  .setLabel('Vote!')
  .setURL('https://top.gg/bot/777765897510846484/vote')
)
*/
				return interaction.reply({embeds: [embed], components: [row], ephemeral: true});
			})
			.catch(console.error);

    })




}catch (e) {
        console.error(e);
        
        try {
          return;
         } catch (e) {}
        }
    }
}
