const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")


module.exports = {
    timeout: 5000, 
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping of the Bot."),

    async run(client, interaction){
try{



    interaction.reply(`${client.languages.__mf('ping.api', {clientapi: client.ws.ping})}`).then(m=>{
        m.editReply(`${client.languages.__mf('ping.api', {clientapi: client.ws.ping})}\n${client.languages.__mf('ping.local',{clientlocal: Date.now() - m.createdTimestamp})}`)
    })


}catch (e) {
        console.error(e);
        
        try {
          return;
         } catch (e) {}
        }
    }
}