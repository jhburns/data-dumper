/*
  Custom utilities
 */
const logger = require("./util/logger");
const fetchChannel = require('./util/fetch_channel');

const path = require('path');


/*
 Discord Client
 */
const Discord = require('discord.js');
const bot = new Discord.Client({});

bot.on('ready', () => {
    logger.info('Connected');
    logger.info(bot.user.username + ' - userID (' + bot.user.id + ')');
    logger.info('Run Instance ID: ' + '(' + 446 + ')' + ' Up in: ' + process.uptime() + 'sec');
    logger.info('Running in: ' + 'production' + ' mode');
});

bot.on('error', (message) => {
    logger.info(message);
});

//global so the on message function can use it
let quotes_text = [];
let fighting_words_text = [];

// Second on ready is to get quotes text async
bot.on('ready', () => {
    fetchChannel(bot, 'quotes', quotes_text);
});

// Needs to be after rest of setup
let auth = require("./setup/authorize");
let login = auth.connect(bot);
login();
