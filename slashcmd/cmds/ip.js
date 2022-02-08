const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const query = require('samp-query')

module.exports = {
    timeout: 5000, 
    data: new SlashCommandBuilder()
    .setName("ip")
    .setDescription("Get the SA:MP server IP estableshied in the server.")
    .addIntegerOption(option => option.setName('server').setDescription('Server Number (Server 1 / Server 2)').addChoice('1', 1).addChoice('2',2))
,


    async run(client, interaction, db){
try{


    if(await interaction.options.getInteger('server') == null){
        let ip = await db.get(`${interaction.guild.id}_samp`)
        if(ip == null) return interaction.reply({content: client.languages.__mf('error.noip', {emojierror: require('../../config.json').emojis.error}), ephemeral: true})
        var options ={
            host: ip[0],
            port: ip[1],
            timeout: 6000 
        }
        query(options,async function (error, response) {
            if(error){
                interaction.reply({content: `${client.languages.__('error.errip')}\n${ip[0]}:${ip[1]}`, ephemeral: true})
            }else{
        
                const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                    .setLabel('Server URL')
                    .setStyle('LINK')
                    .setEmoji('🔗')
                    .setURL(`https://${response['rules']['weburl']}`)
                    
                )
                
                let password = await response['passworded']
                if(password == false) password = client.languages.__('ip.truefalse2.no')
                if(password == true) password = client.languages.__('ip.truefalse2.yes')
        
                let lagshot = await response['rules']['lagcomp']
                if(lagshot == false) lagshot = client.languages.__('ip.truefalse1.no')
                if(lagshot == true)  lagshot = client.languages.__('ip.truefalse1.yes')

                let lang = await response['mapname']
                if(lang.startsWith('Espa'||'espa')){
                    lang = 'Español / Spanish'
                }
                const embed = new Discord.MessageEmbed()
                .setAuthor('Server 1', 'https://cdn.discordapp.com/attachments/922569581292310582/924204911367946270/emoji.png')
                .setTitle(await response['hostname'].toString())
                .setThumbnail(interaction.guild.iconURL({dynamic: true, size: 4096, format: 'png'}))
                .addField('Server IP:', `> ${ip[0]}:${ip[1]}`)
                .addField(client.languages.__('ip.gamemode'), '> '+await response['gamemode'], true)
                .addField(client.languages.__('ip.players'), `> ${await response['online']+'/'+await response['maxplayers']}`)
                .addField(client.languages.__('ip.passworded'), `${password}`, true)
                .addField(client.languages.__('ip.lagshot'), `${lagshot}`, true)
                .addField(client.languages.__('ip.map'), `${await response['rules']['mapname']}`, true)
                .addField(client.languages.__('ip.ver'), `> ${await response['rules']['version']}`, true)
                .addField(client.languages.__('ip.language'), `${lang}`, true)
                .setColor('RANDOM')
                interaction.reply({embeds: [embed], components: [row]})
            }
               
             
                
        })
        
        }

if(await interaction.options.getInteger('server') == 1){
let ip = await db.get(`${interaction.guild.id}_samp`)
if(ip == null) return interaction.reply({content: client.languages.__mf('error.noip', {emojierror: require('../../config.json').emojis.error}), ephemeral: true})
var options ={
    host: ip[0],
    port: ip[1],
    timeout: 6000 
}
query(options,async function (error, response) {
    if(error){
        interaction.reply({content: `${client.languages.__('error.errip')}\n${ip[0]}:${ip[1]}`, ephemeral: true})
    }else{

        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel('Server URL')
            .setStyle('LINK')
            .setEmoji('🔗')
            .setURL(`https://${response['rules']['weburl']}`)
            
        )
       
        let password = await response['passworded']
        if(password == false) password = client.languages.__('ip.truefalse2.no')
        if(password == true) password = client.languages.__('ip.truefalse2.yes')

        let lagshot = await response['rules']['lagcomp']
        if(lagshot == false) lagshot = client.languages.__('ip.truefalse1.no')
        if(lagshot == true)  lagshot = client.languages.__('ip.truefalse1.yes')

        let lang = await response['mapname']
        if(lang.startsWith('Espa'||'espa')){
            lang = 'Español / Spanish'
        }
        const embed = new Discord.MessageEmbed()
        .setAuthor('Server 1', 'https://cdn.discordapp.com/attachments/922569581292310582/924204911367946270/emoji.png')
        .setTitle(await response['hostname'].toString())
        .setThumbnail(interaction.guild.iconURL({dynamic: true, size: 4096, format: 'png'}))
        .addField('Server IP:', `> ${ip[0]}:${ip[1]}`)
        .addField(client.languages.__('ip.gamemode'), '> '+await response['gamemode'], true)
        .addField(client.languages.__('ip.players'), `> ${await response['online']+'/'+await response['maxplayers']}`)
        .addField(client.languages.__('ip.passworded'), `${password}`, true)
        .addField(client.languages.__('ip.lagshot'), `${lagshot}`, true)
        .addField(client.languages.__('ip.map'), `${await response['rules']['mapname']}`, true)
        .addField(client.languages.__('ip.ver'), `> ${await response['rules']['version']}`, true)
        .addField(client.languages.__('ip.language'), `${lang}`, true)
        .setColor('RANDOM')
        interaction.reply({embeds: [embed], components: [row]})
    }
       
     
        
})

}
if(await interaction.options.getInteger('server') == 2){
    let ip = await db.get(`${interaction.guild.id}_samp2`)
    if(ip == null) return interaction.reply({content: client.languages.__mf('error.noip', {emojierror: require('../../config.json').emojis.error}), ephemeral: true})
    var options ={
        host: ip[0],
        port: ip[1],
        timeout: 6000 
    }
    query(options,async function (error, response) {
        if(error){
            interaction.reply({content: `${client.languages.__('error.errip')}\n${ip[0]}:${ip[1]}`, ephemeral: true})
        }else{
    
            const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setLabel('Server URL')
                .setStyle('LINK')
                .setEmoji('🔗')
                .setURL(`https://${response['rules']['weburl']}`)
                
            )
            let password = await response['passworded']
            if(password == false) password = client.languages.__('ip.truefalse2.no')
            if(password == true) password = client.languages.__('ip.truefalse2.yes')
    
            let lagshot = await response['rules']['lagcomp']
            if(lagshot == false) lagshot = client.languages.__('ip.truefalse1.no')
            if(lagshot == true)  lagshot = client.languages.__('ip.truefalse1.yes')

            let lang = await response['mapname']
            if(lang.startsWith('Espa'||'espa')){
                lang = 'Español / Spanish'
            }
            const embed = new Discord.MessageEmbed()
            .setAuthor('Server 2', 'https://cdn.discordapp.com/attachments/922569581292310582/924204911367946270/emoji.png')
            .setTitle(await response['hostname'].toString())
            .setThumbnail(interaction.guild.iconURL({dynamic: true, size: 4096, format: 'png'}))
            .addField('Server IP:', `> ${ip[0]}:${ip[1]}`)
            .addField(client.languages.__('ip.gamemode'), '> '+await response['gamemode'], true)
            .addField(client.languages.__('ip.players'), `> ${await response['online']+'/'+await response['maxplayers']}`)
            .addField(client.languages.__('ip.passworded'), `${password}`, true)
            .addField(client.languages.__('ip.lagshot'), `${lagshot}`, true)
            .addField(client.languages.__('ip.map'), `${await response['rules']['mapname']}`, true)
            .addField(client.languages.__('ip.ver'), `> ${await response['rules']['version']}`, true)
            .addField(client.languages.__('ip.language'), `${lang}`, true)
            .setColor('RANDOM')
            interaction.reply({embeds: [embed], components: [row]})
        }
           
         
            
    })
    
    }

}catch (e) {
        console.error(e);
        
        try {
          return;
         } catch (e) {}
        }
    }
}