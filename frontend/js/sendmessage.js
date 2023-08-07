function send() {
    const webhook ="https://discord.com/api/webhooks/1093634659776208956/Hs9YCHhIMS2ZM92FHGsvzIU2JMsI2kVhy038c1MCzSatfu1vltx5un_CUOltQi1BevxF";
        let name = document.getElementById('name').value;
        let discord = document.getElementById('discord').value;
        let message = document.getElementById('message').value;
        const contents = `Name: ${name}\nDiscord: ${discord}\nMessage: ${message}`;
        const request = new XMLHttpRequest();
        request.open("POST", webhook);
        request.setRequestHeader('Content-type', 'application/json');
        const params = {
          content: contents
        }
        request.send(JSON.stringify(params));
  }