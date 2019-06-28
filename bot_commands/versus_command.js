const telegramCommands = require('../bot_core/telegram_commands');

module.exports = {
    keys: ["versus", "vs"],
    description: "Versus",
    execute: function(params, req){
        var message = "";
        if(params.length <= 2){
            message = "Número de parâmetros insuficiente.";
            console.log("Invalid");
        } else {
            var value = (Math.random()*(params.length-1))+1;
            console.log("Selected value: " + value);
            message = "O vencedor é: <code>" + params[value] + "</code>!";
        }

        telegramCommands.sendMessage(
            req.message.chat.id,
            message);
    }
}