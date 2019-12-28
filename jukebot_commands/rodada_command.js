const telegramCommands = require("../bot_core/telegram_commands");

module.exports = {
    keys: ["rodada"],
    description: "Rodada  (mostra quem falta e a música atual)",
    execute: function (key, params, req) {
        telegramCommands.sendMessage(
            key,
            req.message.chat.id,
            "Rodada.");
    }
}