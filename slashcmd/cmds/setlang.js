const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")


module.exports = {
    timeout: 5000,
    admin:true,
    permissions:['Manage Guild','Gestionar Servidor'],
    data: new SlashCommandBuilder()
    .setName("setlanguage")
    .setDescription("Sets the language of the bot.")

    .addIntegerOption(option => option.setRequired(true).setName('lang').setDescription('Language you want to change.').addChoice('Español',1).addChoice('English',0)),

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
const option = await interaction.options.getInteger('lang')

if(option == 0){
    await db.set(`botlang_${interaction.guild.id}`,'en')
    return  interaction.reply(`${require('../../config.json').emojis.success} Language correctly set to: :flag_gb: **English**`)
}
if(option == 1){
   await db.set(`botlang_${interaction.guild.id}`, 'es')
    return interaction.reply(`${require('../../config.json').emojis.success} Lenguaje establecido correctamente a: :flag_es: **Español**`)
}




}catch (e) {
        console.error(e);
        
        try {
          return;
         } catch (e) {}
        }
    }
}