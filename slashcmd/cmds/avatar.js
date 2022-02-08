const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")


module.exports = {
    timeout: 5000, 
    data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Get the avatar of a user")
    .addUserOption(option => option.setName('mention').setDescription('Get the avatar of a user')),

    async run(client, interaction){
try{


const user = await interaction.options.getUser('mention')
if(user == null) {
    const embed = new Discord.MessageEmbed()
    .setImage(client.users.cache.get(interaction.user.id).avatarURL({dynamic: true, size: 4096, format: 'png'}))
    .setColor('RANDOM')
    .setTimestamp()
 await   interaction.reply({content: client.languages.__mf('avatar.self', {aurl: client.users.cache.get(interaction.user.id).avatarURL({dynamic: true, size: 4096, format: 'png'})}),embeds: [embed], ephemeral: true})
}else{
    const embed = new Discord.MessageEmbed()
    .setImage(client.users.cache.get(user.id).avatarURL({dynamic: true, size: 4096, format: 'png'}))
    .setColor('RANDOM')
    .setTimestamp()
 await   interaction.reply({content: client.languages.__mf('avatar.mention', {user: client.users.cache.get(user.id).tag,murl: client.users.cache.get(user.id).avatarURL({dynamic: true, size: 4096, format: 'png'})}),embeds: [embed], ephemeral: true})
}


}catch (e) {
        console.error(e);
        
        try {
          return;
         } catch (e) {}
        }
    }
}