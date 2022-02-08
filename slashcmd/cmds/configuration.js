const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")


module.exports = {
    timeout: 5000, 
    admin:true,
    description:["Get a list of steps to configure me!","Obtén un listado de pasos para configurarme!"],
    data: new SlashCommandBuilder()
    .setName("configuration")
    .setDescription("Get help to how configurate the IP of you samp server in you Discord Server."),

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
const embed = new Discord.MessageEmbed()
.setTitle(client.languages.__('config.title'))
.setDescription(`
${client.languages.__('config.step1.1')}
${client.languages.__('config.step1.2')}

${client.languages.__('config.step2.1')}
${client.languages.__('config.step2.2')}

${client.languages.__('config.step3.1')}
${client.languages.__('config.step3.2')}

**Note:**
${client.languages.__('config.other.1')}
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