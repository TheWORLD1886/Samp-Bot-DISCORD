const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")


module.exports = {
    timeout: 5000,
    admin: true, 
    data: new SlashCommandBuilder()
    .setName("setchannel")
    .setDescription("Set a channel where users can only use commands in that place")
    .addChannelOption(option => option.setName('channel').setDescription('Select a Channel or enter the ID').setRequired(true)),

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
const channel = await interaction.options.getChannel('channel')
if(channel.type == 'GUILD_CATEGORY') return interaction.reply({content: client.languages.__mf('schannel.2', {err: require('../../config.json').emojis.error, usage: client.languages.__('usagecmention')}), ephemeral: true})
if(channel.isVoice()== true) return interaction.reply({content: client.languages.__mf('schannel.2', {err: require('../../config.json').emojis.error, usage: client.languages.__('usagecmention')}), ephemeral: true})
await db.set(`${interaction.guild.id}_channel`, channel.id)

interaction.reply({content: `${client.languages.__mf('schannel.1', {check: require('../../config.json').emojis.success})}`})




}catch (e) {
        console.error(e);
        
        try {
          return;
         } catch (e) {}
        }
    }
}