// Importamos la libreria de TMI.js
const tmi = require('tmi.js') // https://docs.tmijs.org/

// Creamos las opciones del bot
const owner = "suraei"
const options = {
    options: {
        debug: false
    },
    // Twitch IRC Server
    connection: {
        cluster: "aws",
        reconnect: true
    },
    // Bot User
    identity: {
        username: "ChappieTheBot",
        password: "oauth:epjk8hx1qtk262s8kmhmagqujo61i2"
    },
    // Twitch Channels
    channels: [ owner ]
}

// Creamos el cliente
var bot = new tmi.client(options);

// Rutina al conectarse
bot.on("connected", function(address, port) {
    console.log("[^] Bot conectado")
    bot.say(owner, "Chappie... estar... ¡vivo!")
})

bot.on("chat", function(channel, user, message, self) {
    if(message[0] === '!') {
        var commands = message.split(" ")
        console.log("[^] Comando detectado: " + commands)
        if(commands[0] === "!report") {
            report(user['display-name'], commands[1])
        } else if(commands[0] === "!elo") {
            elo()
        } else if(commands[0] === "!sillazo") {
            sillazo(user['display-name'], commands[1], user['subscriber'])
        }
    }
})

// Exportamos el bot
exports.bot = bot

// ---------------------------------------------------------------------------------------

function report(usuario, victima) {
    var quote = [
        ' no entiende el por qué de tu report',
        ' quiere que sepas que tus preocupaciones son sus preocupaciones',
        ' está revisando tu report, pero seamos sinceros, lo va a ignorar completamente'
    ]
    if(victima == undefined) {
        bot.action(owner, quote[Math.floor(Math.random() * (quote.length))])
    } else {
        quote[quote.length] = ' pasa de tu report, ' + usuario
        quote[quote.length] = ' piensa que ' + usuario + ' no se merece ese report'
        bot.action(owner, quote[Math.floor(Math.random() * (quote.length))])
    }
}

// ---------------------------------------------------------------------------------------

function elo() {
    bot.say(owner, "Suraei es Bronce III, pero juega como si fuera Madera V")
}

// ---------------------------------------------------------------------------------------

function sillazo(usuario, victima, isSub) {
    if(isSub) {
        if(victima == undefined) {
            bot.say(owner, "Yo no saber a quien lanzar la silla... Por favor, sé más concreto")
        } else {
            bot.say(owner, usuario + " le ha dado un sillazo a " + victima)
        }
    } else {
        bot.action(owner, " sólo da sillazos si se lo manda un sub")
    }
}

// ---------------------------------------------------------------------------------------

/*
{ badges: { moderator: '1', subscriber: '0', premium: '1' },
  color: null,
  'display-name': 'BakedPuma',
  emotes: null,
  id: 'c9a7f02a-b9aa-4e1f-ba0a-957bc0e640e6',
  mod: true,
  'room-id': '180036444',
  subscriber: true,
  'tmi-sent-ts': '1521577840728',
  turbo: false,
  'user-id': '73030683',
  'user-type': 'mod',
  'emotes-raw': null,
  'badges-raw': 'moderator/1,subscriber/0,premium/1',
  username: 'bakedpuma',
  'message-type': 'chat' }
*/