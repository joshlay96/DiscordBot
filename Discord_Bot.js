const Discord = require('discord.js')
const client = new Discord.Client()
let modules = [
    {
        name: "ST2334",
        date: new Date("April 25, 2020 09:00:00")
    } ,
    {
        name: "CS2103T",
        date: new Date("April 25, 2020 13:00:00")
    }, 
    {
        name: "CS2105",
        date: new Date("April 27, 2020 09:00:00")
    },
    {
        name: "GES1021",
        date: new Date("April 30, 2020 09:00:00")
    }
]

// The ready triggers everything till line 34
// When the bot is becoming active
client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    //This just sets the current status of the bot
    client.user.setActivity("Porn", {type: "WATCHING"})

    //This just list the servers the bot is connected to now
    client.guilds.forEach((guild) => {
        console.log(guild.name)
        guild.channels.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
        })

        //General text chat ID is 665819748302323722

        

    })

    // Used to send a message to the channel
    // The ID is the channel identifier. 
    let generalChannel = client.channels.get("665819748302323722")
    //generalChannel.send("Hello World! ")

    // To send an attachment
    // Put a file path or an internet address
    const attachment = new Discord.Attachment("/Users/joshua/Desktop/Nami Island 02 Jan 2020/20200102_143943.jpg");
    //generalChannel.send(attachment)

})

// Triggers this thing whenever you 
// receive a message 
client.on('message', (receivedMessage) => {

    // If this message is sent by the bot, 
    // receivedMessage.author is identifier of who 
    // Send the message. Then return and do nothing
    if(receivedMessage.author == client.user) {
        return
    }

    // Bot will return the same message you send
    // receivedMessage.author.toString tags the person who
    // Send the message
   // receivedMessage.channel.send("Message received, " +  
   // receivedMessage.author.toString() + ": " 
 // + receivedMessage.content);


  //receivedMessage.react("😢")


  // To check if the message is a command
  // SInce commands starts with an !,
  // We check if the message has that ! command
  if(receivedMessage.content.startsWith("!")) {

    // processCommand here is just a method we are
    // going to create to identify what command
    // We are going to do
      processCommand(receivedMessage)
  }




})

function processCommand(receivedMessage) {
    //Remove the first !
    let newCommand = receivedMessage.content.substr(1);
    let splitCommand = newCommand.split(" ")

    // primaryCommand is a string with the command, eg: help, multiply
    let primaryCommand = splitCommand[0];
    console.log("The value of primaryCommand is " + primaryCommand)

    // arguments is just everything after the command like numbers etc
    let arguments = splitCommand.slice(1);
    console.log("The value of arguments is " + arguments)

    // If the command was !help
    if(primaryCommand == "help") {
        helpCommand(arguments, receivedMessage);
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage)
    }  
    // If the command was exam, check exam information
    else if (primaryCommand == "exam") {
        examCommand(arguments, receivedMessage);
    }
    
    // If the person put an unknown command

    else {
        receivedMessage.channel.send("You have entered an invalid command :( ");
        receivedMessage.channel.send("Only !help, !multiply, !exam is valid ")
    }
}

function multiplyCommand(arguments, receivedMessage) {

    // To check if there are 2 arguments involved a not
    if(arguments.length <2) {
        receivedMessage.channel.send("Please enter 2 arguments only. Try again with 2 arguments")
        return
    } else {
        let product = 1;
        arguments.forEach((value) => {
            product = product * parseFloat(value)
        })
        receivedMessage.channel.send("The product of the arguments is " + arguments + " is " + product.toString()) 
    }

}


function helpCommand(arguments, receivedMessage) {

    // If the length of the argument is 0
    if(arguments.length == 0) {
        receivedMessage.channel.send("Im not sure what you need help with. Try !help [topic]");
    } 

    // Arguments are passed
    else {
        receivedMessage.channel.send("It looks like you need help with " + arguments);
    }
}

function examCommand(arguments, receivedMessage) {
    // If the length of the arguments is less than 1
    // Means he never put in the module code

    if(arguments.length== 0) {
        receivedMessage.channel.send("You have entered an invalid module code")
        return
    } else {
        let module_code = arguments
        const result = modules.find(({name}) => name == arguments);

        if(result == null) {
            receivedMessage.channel.send("You have entered an invalid module code")
            return
        } else {
        receivedMessage.channel.send("Your module is " + result.name + " and the exam date is " + result.date)
    }
}

}

// Add the bot secret_token abc


