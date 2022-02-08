const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")


module.exports = {

    data: new SlashCommandBuilder()
    .setName("removechannel")
    .setDescription("Remove the channel you set so that users only use commands there."),

    async run(client, interaction){
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

            if(await db.get(`${interaction.guild.id}_channel`) == null) return interaction.reply({content: `${client.languages.__('rchannel.2', {error: require('../../config.json').emojis.error})}`})
            await db.delete(`${interaction.guild.id}_channel`).then(()=>{
                interaction.reply(client.languages.__mf('rchannel.1', {check: require('../../config.json').emojis.success}))
            })




}catch (e) {
        console.error(e);
        
        try {
          return;
         } catch (e) {}
        }
    }
}