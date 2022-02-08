/*




Bot hecho completamente por: 


USER:
; xEyeZx#1866 (ID: 927283762960691211)
; TxEyeZxW ©#1886 (ID: 939711051161796628)


Si necesitas ayuda con el source code, ve al siguiente servidor: 

https://discord.gg/cBRa5Awaxf


El bot cuenta con sistema de lenguajes básico pero funcional, puedes añadir más idiomas. Pero eso ya es bajo tu responsabilidad.

Pasos para encender el bot:

Antes de iniciar con el bot, ve al archivo "config.json" y establece lo que se te pide para que el bot funcione de manera adecuada.

Comandos a ejecutar en la consola:

cmd 1:    npm install             (Obligatorio) (Este comando instalará los paquetes que están en package.json)

cmd 2:    node slashcmds.js       (Obligatorio) (Este comando hará que la API de Discord guarde los nombres, descripciones y funciones de los slash commands a la API de Discord.)

cmd 3:    node shard.js           (Encenderá el bot)



*/




const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const { join } = require('path')
const { Collection } = require('discord.js')
const fs = require('fs')
const mongoose = require('mongoose')
const { Database } = require('quick.mongodb');

const db = new Database(require('./config.json').mongotoken);

try {
  db.on("ready", () => {
    console.log('General DB ON')
    const test = ['asd1','asd2'][0]
    console.log(test)
  });


} catch (error) {
  console.error(error)
}
const INTENTS = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_PRESENCES,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_WEBHOOKS,
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.GUILD_VOICE_STATES
]
const client = new Discord.Client({ intents: INTENTS,allowedMentions: { parse: ['users', 'roles'], repliedUser: false } });
const ms = require('ms')
client.on('ready', async ()=>{



  console.log()
  client.user.setActivity('SA:MP', { type: 'PLAYING' });
    console.log('ON.')
    mongoose.connect(require('./config.json').mongotoken, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('MongoDB Connected')
    }).catch((err) => {
        console.log('Error in the MongoDB Conection, check the MongoDB Token or the IP access in the Mongo Dash board.\nError: ' + err)
    })



})

const i18n = require('i18n')
const path = require('path');
client.languages = require('i18n')
client.languages.configure({
    locales: ['en','es'],
    directory: join(__dirname, "locales"),
    defaultLocale: 'en',
    retryInDefaultLocale: true,
    objectNotation: true, 
    register: global,

    logWarnFn: function (msg){
      console.log("WARN: "+msg)
    },
    logErrorFn: function(msg){
      console.log('WARN: '+msg)
    },
    missingKeyFn: function(locale, value){
      return value
    },
    mustacheConfig: {
      tags: ["{{", "}}"],
      disable: false
    }
})




const Timeout = new Collection();

client.slashcommands = new Discord.Collection();
const slashcommandsFiles = fs.readdirSync(`./slashcmd/cmds`).filter(file => file.endsWith("js"))



for(const file of slashcommandsFiles){
  const slash = require(`./slashcmd/cmds/${file}`)
  console.log(`Slash commands - ${file} cargado.`)
  client.slashcommands.set(slash.data.name, slash)
}
client.on("interactionCreate", async (interaction)=>{

  if(!interaction.isCommand()) return;
  let command = client.slashcommands.find(c => c.data.name === interaction.commandName);
	if (!command) command = client.slashcommands.get(client.slashcommands.get(interaction.commandName));

  const slashcmds = client.slashcommands.get(interaction.commandName)

  if(!slashcmds) return;

  if(command.admin == true){
    if(command.timeout) {
      if(Timeout.has(`${command.data.name}${interaction.user.id}`)) return interaction.reply({content: client.languages.__mf('index.coldown',{time: ms(Timeout.get(`${command.data.name}${interaction.user.id}`) - Date.now(), {long : true})}), ephemeral: true})
      let botlang = await db.get(`botlang_${interaction.guild.id}`)
      if(botlang == null) botlang = 'en'
      client.languages.setLocale(botlang)
      await slashcmds.run(client, interaction, db)
      Timeout.set(`${command.data.name}${interaction.user.id}`, Date.now() + command.timeout)
      setTimeout(() => {
          Timeout.delete(`${command.data.name}${interaction.user.id}`)
      }, command.timeout)
      return;
    }else{
      try {
        let botlang = await db.get(`botlang_${interaction.guild.id}`)
        if(botlang == null) botlang = 'en'
        client.languages.setLocale(botlang)
        await slashcmds.run(client, interaction, db)
      } catch (e) {
        console.error()
      }
    }
  }

  let chan = await db.get(`${interaction.guild.id}_channel`)
  if(chan == null){
    if(command.timeout) {
      if(Timeout.has(`${command.data.name}${interaction.user.id}`)) return interaction.reply({content: client.languages.__mf('index.coldown',{time: ms(Timeout.get(`${command.data.name}${interaction.user.id}`) - Date.now(), {long : true})}), ephemeral: true})
      let botlang = await db.get(`botlang_${interaction.guild.id}`)
      if(botlang == null) botlang = 'en'
      client.languages.setLocale(botlang)
      await slashcmds.run(client, interaction, db)
      Timeout.set(`${command.data.name}${interaction.user.id}`, Date.now() + command.timeout)
      setTimeout(() => {
          Timeout.delete(`${command.data.name}${interaction.user.id}`)
      }, command.timeout)
      return;
    }else{
      try {
        let botlang = await db.get(`botlang_${interaction.guild.id}`)
        if(botlang == null) botlang = 'en'
        client.languages.setLocale(botlang)
        await slashcmds.run(client, interaction, db)
      } catch (e) {
        console.error()
      }
    }
  }
  let channel = chan
  if(!channel.includes(interaction.channel.id)) return interaction.reply({content: client.languages.__mf('index.channel', {error: require('./config.json').emojis.error, channel: `<#${channel}>`}), ephemeral: true})

  if(command.timeout) {
  if(Timeout.has(`${command.data.name}${interaction.user.id}`)) return interaction.reply({content: client.languages.__mf('index.coldown',{time: ms(Timeout.get(`${command.data.name}${interaction.user.id}`) - Date.now(), {long : true})}), ephemeral: true})
  let botlang = await db.get(`botlang_${interaction.guild.id}`)
  if(botlang == null) botlang = 'en'
  client.languages.setLocale(botlang)
  await slashcmds.run(client, interaction, db)
  Timeout.set(`${command.data.name}${interaction.user.id}`, Date.now() + command.timeout)
  setTimeout(() => {
      Timeout.delete(`${command.data.name}${interaction.user.id}`)
  }, command.timeout)
  return;
}else{
  try {
    let botlang = await db.get(`botlang_${interaction.guild.id}`)
    if(botlang == null) botlang = 'en'
    client.languages.setLocale(botlang)
    await slashcmds.run(client, interaction, db)
  } catch (e) {
    console.error()
  }
}

})





client.login(require('./config.json').token)