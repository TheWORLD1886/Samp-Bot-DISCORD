const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")


module.exports = {
    timeout: 4000,
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("How to get all commands of the bot")
    ,

    async run(client, interaction){
try{




const embed = new Discord.MessageEmbed()
.setTitle('List of Commands - SA:MP Bot')
.setDescription(`

<:settings:924201443169280061> **Configuration** <:settings:924201443169280061> 
    \`/setip\`, \`/removeip\`, \`/setlanguage\`, \`/setchannel\`, \`/removechannel\`

<:info_480px:924201440782729228> **Information/Others** <:info_480px:924201440782729228> 
    \`/ip\`, \`/server\`, \`/avatar\`

<:bot:924245471759827006> **Bot** <:bot:924245471759827006> 
    \`/botinfo\`, \`/invite\`, \`/support\`, \`/ping\`

`)
.setTimestamp()
.setColor('RANDOM')
interaction.reply({embeds: [embed]})


}catch (e) {
        console.error(e);
        
        try {
          return;
         } catch (e) {}
        }
    }
}