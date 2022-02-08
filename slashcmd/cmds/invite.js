const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")


module.exports = {

    data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Get the Bot invite to add in your server!"),

    async run(client, interaction){
try{


    const row = new Discord.MessageActionRow()
    .addComponents(
      new Discord.MessageButton()
      .setStyle('LINK')
      .setLabel(client.languages.__('invite.btn'))
      .setEmoji('<:add:910983014341832775>')
      .setURL('https://discord.com/api/oauth2/authorize?client_id=912460171912028200&permissions=139586817088&scope=bot%20applications.commands')
    )
    interaction.reply({content: `${client.languages.__mf('invite.1', {link: require('../../config.json').invite})}`,components: [row], ephemeral: true })


}catch (e) {
        console.error(e);
        
        try {
          return;
         } catch (e) {}
        }
    }
}