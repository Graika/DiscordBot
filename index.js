const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client({
        presence: {
            status: "online",
            activities: [{ name: "herself <3", type: "STREAMING" }],
            afk: false,
        },
        intents: ["GUILDS", "GUILD_MESSAGES"]
    });

const prefix = "!<";

let whitelist = [
    "399564773940920324",
];


client.on("messageCreate", function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    const channel = client.channels.cache.get(message.channelId);

    if(command === "wakeup") {
        if(args.length !== 1) {
            channel.send("Используй: "+prefix+"wakeup @usiveR");
            return;
        }
        let arg = args[0].split("")
        if(arg[0] !== "<" && arg[arg.length-1] !== ">") {
            channel.send("Нужно линкануть пользователя через @");
            return;
        }
        if(clearUserID(args[0]) === "228462081383464960") {
            message.reply("Нельзя тревожить создателя...");
            return;
        }
        if(clearUserID(args[0]) === "230627173357060096") {
            message.reply("Этот пользователь активно принимал участие в тестирование WakeUp системы...").then(function () {
                message.reply("А хотя... если нет, то вообще зачем я нужна?").then(function () {
                    wake_up_2(args[0], message)
                });
            });
            return;
        }
        if(whitelist.indexOf(clearUserID(args[0])) !== -1) {
            message.reply("Этот пользователь задонатил создателю соточку на киви, его нельзя тревожить...");
            return;
        }
        wake_up_2(args[0], message);
    }

    if(command === "test") {
        message.guild.channels.create("comm1").then(value => {
            client.channels.fetch(value.id).then(channel => {
                message.reply("Начинаем!").then(function () {
                    let i = 0;
                    let wpi = setInterval(function () {
                        if (i > 10) {
                            clearInterval(wpi);
                            message.reply("Готово").then(channel.delete());
                        }
                        i++;
                    }, 1000);
                });
            });
        });
    }
});

function clearUserID(dirty) {
    const regx = /[\D]+/g;
    return dirty.replace(regx, "");
}

function wake_up(user, message) {
    const channel = client.channels.cache.get(message.channelId);
    message.reply("Оки-доки!");
    let i = 0;
    let wpi = setInterval(function () {
        if (i > 10) {
            clearInterval(wpi);
            message.reply("Готово!");
        }
        channel.send("W@ke up "+user+"! The m@trix h@s you!");
        i++;
    }, 1000);
}

function wake_up_2(user, message) {
    message.guild.channels.create("WAKEUPMAFAKA").then(value => {
        client.channels.fetch(value.id).then(chnl => {
            message.reply("Оки-доки!").then(function () {
                let i = 0;
                let wpi = setInterval(function () {
                    if (i > 10) {
                        clearInterval(wpi);
                        message.reply("Готово!").then(chnl.delete());
                    }
                    chnl.send("W@ke up "+user+"! The m@trix h@s you!");
                    i++;
                }, 1000);
            });
        });
    });
}

client.login(config.BOT_TOKEN);