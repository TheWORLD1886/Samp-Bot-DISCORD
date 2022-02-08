const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./index.js', { token: require('./config.json').token });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();