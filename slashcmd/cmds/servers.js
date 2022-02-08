const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    timeout:5000,
    data: new SlashCommandBuilder()
    .setName("servers")
    .setDescription("Shows the SAMP server IPs set on this Discord Server."),

    async run(client, interaction, db){
try{

    let server1 = await db.get(`${interaction.guild.id}_samp`)
    if(server1 == null) server1 = client.languages.__('servers.1')
    
    let server2 = await db.get(`${interaction.guild.id}_samp2`)
    if(server2 == null) server2 = client.languages.__('servers.1')
    
const embed = new Discord.MessageEmbed()
.setTitle(client.languages.__('servers.2'))
.setDescription(`
<:stack:924201442657599508> **Server 1:** ${server1[0]}:${server1[1]}

<:stack:924201442657599508> **Server 2:** ${server2[0]}:${server2[1]}

${client.languages.__('servers.3')}
`)
.setColor('RANDOM')
.setTimestamp()
interaction.reply({embeds: [embed]})
}catch (e) {
        console.error(e);
        
        try {
          return;
         } catch (e) {}
        }
    }
}