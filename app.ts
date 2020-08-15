process.env.NTBA_FIX_319 = "1";

const botInfo: BotInfo = require('./bot_info.json');
import BotInfoEntry from "./bot/types/bot_info_entry";
import bustabot from "./bot/bustabot/bustabot";
import jukebot from "./bot/jukebot/jukebot";
import Bot from './bot/bot';
import FirebaseFirestore = require('@google-cloud/firestore');
import BotInfo from "./bot/types/bot_info";

const bots: Array<Bot> = [
    bustabot,
    jukebot,
];

let isProd: boolean = false;

process.argv.forEach(function name(val, index, arr) {
    if (val === "prod") {
        isProd = true;
    }
})

// Firestore integration
try {
    let db: FirebaseFirestore.Firestore = new FirebaseFirestore.Firestore({
        projectId: botInfo["project-id"],
        keyFilename: "google_key.json",
    });

    // Initializes the bot with database
    bots.forEach(bot => {
        //bot.setDatabase(db, getBotData(bot.botAlias))
    });
} catch (error) {
    console.log(error);
}

function getBotData(botAlias: string): BotInfoEntry {
    let buildType = isProd ? "prod" : "dev";
    return botInfo[buildType][botAlias];
}

bots.forEach(bot => {
    let config = getBotData(bot.alias);
    if (config) {
        bot.init(config, botInfo.host_url, isProd);
    } else {
        console.log(`No config for bot ${bot.alias}`);
    }
});