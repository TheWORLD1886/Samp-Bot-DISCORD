const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const gamedig = require('gamedig')
const samp = require('samp-query')
module.exports = {
    timeout: 5000, 
    admin:true,
    data: new SlashCommandBuilder()
    .setName("setip")
    .setDescription("Set a IP SA:MP server in your Discord Server")
    .addIntegerOption(option => option.setName('server').setDescription('Select a server').setRequired(true).addChoice('server1', 1).addChoice('server2', 2).setRequired(true))
    .addStringOption(option => option.setName('ip').setDescription('Add the IP:PORT of the server (Ej: 123456789:7777)').setRequired(true)),

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
const string = await interaction.options.getString('ip')
const [ip, port] = string.split(':')
if(game == null) {
    await db.set(`${interaction.guild.id}_samp`, [ip, port])

    interaction.reply({content: client.languages.__mf('cserver.seted',{checkedmoji: require('../../config.json').emojis.success, iport: `${ip}:${port}`})+'\n'+client.languages.__mf('cserver.seted2', {infomoji: require('../../config.json').emojis.info})})
}
if(game == 1) {
    
    await db.set(`${interaction.guild.id}_samp`, [ip, port])

    interaction.reply({content: client.languages.__mf('cserver.seted',{checkedmoji: require('../../config.json').emojis.success, iport: `${ip}:${port}`})+'\n'+client.languages.__mf('cserver.seted2', {infomoji: require('../../config.json').emojis.info})})
}
if(game == 2) {
    await db.set(`${interaction.guild.id}_samp2`, [ip, port])
    interaction.reply({content: client.languages.__mf('cserver.seted1',{checkedmoji: require('../../config.json').emojis.success, iport: `${ip}:${port}`})+'\n'+client.languages.__mf('cserver.seted2', {infomoji: require('../../config.json').emojis.info})})
}





}catch (e) {
   
        console.error(e);
        
        try {
          return;
         } catch (e) {}
        }
    }
}