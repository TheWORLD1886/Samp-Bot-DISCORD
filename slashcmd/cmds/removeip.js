const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const gamedig = require('gamedig')
const samp = require('samp-query')
module.exports = {
    timeout: 5000, 
    admin:true,
    data: new SlashCommandBuilder()
    .setName("removeip")
    .setDescription("Remove a IP SA:MP server estableshied in your Discord Server.")
    .addIntegerOption(option => option.setName('server').setDescription('Select a server').setRequired(true).addChoice('server1', 1).addChoice('server2', 2))
   ,

    async run(client, interaction, db){
try{

    if(!interaction.member.permissions.has('MANAGE_GUILD')){
        const err = new Discord.MessageEmbed()
        .setAuthor(`${interaction.user.tag}`, `${interaction.user.avatarURL()}`)
        .setDescription(require('../../config.json').emojis.error+' **ERROR** | '+client.languages.__('error.permissions')+' \n \n > '+client.languages.__('error.permission')+' `'+client.languages.__('permissions.MANAGE_GUILD')+'`')
        .setColor('RED')
        .setTimestamp()
        .setFooter(client.user.username, client.user.avatarURL())
        return interaction.reply({embeds: [err], ephemeral: true})
            }
const game = await interaction.options.getInteger('server')

if(game == 1) {
    
    await db.delete(`${interaction.guild.id}_samp`)
    interaction.reply({content: client.languages.__mf('rip.r1', {success: require('../../config.json').emojis.success})})
   
}
if(game == 2) {
    await db.delete(`${interaction.guild.id}_samp2`)
    interaction.reply({content: client.languages.__mf('rip.r1', {success: require('../../config.json').emojis.success})})

}





}catch (e) {
   
        console.error(e);
        
        try {
          return;
         } catch (e) {}
        }
    }
}