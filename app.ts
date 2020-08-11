process.env.NTBA_FIX_319 = "1";

import botInfo from './bot_info.json';
import BotInfoEntry from "./bot/types/bot_info_entry";
import bustabot from "./bot/bustabot/bustabot";
import jukebot from "./bot/jukebot/jukebot";
import Bot from './bot/bot';

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
    let db = new FirebaseFirestore.Firestore({
        projectId: botInfo["project-id"],
        keyFilename: "google_key.json",
    });

    // Initializes the bot with database
    bots.forEach(bot => {
        bot.init(db, getBotData(bot.botAlias))
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
        bot.init(config, isProd);
    } else {
        console.log(`No config for bot ${bot.alias}`);
    }
});




// function handleProdApp() {
//     // console.log("Initializing app in production environment");
//     // const app = express();

//     // // Default request. Just to check if the bot is up.
//     // app.get("/", (_req, res) => {
//     //     res
//     //         .status(200)
//     //         .send("Hello, world!")
//     //         .end();
//     // });

//     // bots.forEach(bot => {
//     //     if (!bot.initialized) {
//     //         return;
//     //     }

//     //     // Check if the proper key is set. Just make a request with the bot key appended.
//     //     app.get(`/${bot.botKey}`, (_req, res) => {
//     //         res
//     //             .status(200)
//     //             .send(`${bot.botName} is Working!`)
//     //             .end();
//     //     });

//     //     // Actual bot requests.
//     //     app.post(`/${bot.botKey}${bot.botName}`, (req, res) => {
//     //         bot.handleTelegramMessage(req.body)
//     //         res
//     //             .status(200)
//     //             .end();
//     //     });

//     //     bot.setWebhook(botInfo["host-url"]);
//     // });

//     // // Start the server
//     // const PORT = process.env.PORT || 8080;
//     // app.listen(PORT, () => {
//     //     console.log(`App listening on port ${PORT}`);
//     //     console.log("Press Ctrl+C to quit.");
//     // });
// }

// function handleDevApp() {
//     const timeout = 1;
//     // console.log("Initializing app in development environment");
//     // setInterval(() => {
//     //     bots.forEach(bot => {
//     //         bot.getUpdates(timeout);
//     //     })
//     // }, timeout * 1000 + 500);
// }

// if (isProd) {
//     handleProdApp();
// } else {
//     handleDevApp();
// }