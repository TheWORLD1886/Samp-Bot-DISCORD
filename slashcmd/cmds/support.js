


const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")


module.exports = {
  timeout: 5000, 
    data: new SlashCommandBuilder()
    .setName("support")
    .setDescription("Get the support server of the bot."),

    async run(client, interaction){
try{


    const row = new Discord.MessageActionRow()
    .addComponents(
      new Discord.MessageButton()
      .setStyle('LINK')
      .setLabel('Server Support')
      .setEmoji('<:support:910990247473602640>')
      .setURL(require('../../config.json').soporteurl)
    )

    interaction.reply({content: `${client.languages.__('support.1')} [Server](${require('../../config.json').soporteurl})`,components: [row], ephemeral: true })

}catch (e) {
        console.error(e);
        
        try {
          return;
         } catch (e) {}
        }
    }
}

/*

*/