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
.setDescription( `*Hi, I'm SAMPBot, I'm a bot dedicated to obtaining information from SAMP servers. If you need help with the bot, go to the Support server:* ***[Server Support](https://discord.gg/TQqw9t26xY)***\n\n
<:bot:917203513153564692>    **Prefix:** `+'`'+`/`+'`'+`
<:stack:924201442657599508>    **API:** `+'`'+`${Math.round(client.ws.ping)}`+'ms`'+`
`)
.addField(`<:8263blurplemembers:863131216030859325>  Communities`, `**Servers:** ${totalGuilds}\n **Users:** ${totalMembers}`)
.addField('Creation date:', '```yaml\n'+`${client.user.createdAt.toLocaleDateString("es-pe")}`+' ```')
.addField('CPU Used:', "```yaml\n% " + info + "```")
.addField('CPU:', "```yaml\n" + os.cpus()[0].model + "```")
.addField('RAM:', "```yaml\n" + memoria.usedByProcess +'/'+ memoria.max+"```")
.addField('Discord.js',`V${Discord.version}`)
.addField('Node.js',`${process.version}`)
.addField('UpTime:', `${prettyMilliseconds(client.uptime)}`)
.addField('Links:','> [Server Support]('+require('../../config.json').soporteurl+')\n> [Invite me!](https://discord.com/api/oauth2/authorize?client_id=912460171912028200&permissions=139586817088&scope=bot%20applications.commands)')
.setTimestamp()
.setThumbnail(client.user.avatarURL({dynamic: true, size: 4096, format: 'png'}))
const row = new Discord.MessageActionRow()
.addComponents(
  new Discord.MessageButton()
  .setStyle('LINK')
  .setLabel('Invite!')
  .setEmoji('<:add:910983014341832775>')
  .setURL('https://discord.com/api/oauth2/authorize?client_id=912460171912028200&permissions=139586817088&scope=bot%20applications.commands')
)
.addComponents(
  new Discord.MessageButton()
  .setStyle('LINK')
  .setLabel('Server Support')
  .setEmoji('<:support:910990247473602640>')
  .setURL(require('../../config.json').soporteurl)
)
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