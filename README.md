## Trijam 163: "Buy and Sell"
# Stockbroker Simulator

This is a simple mobile and desktop friendly HTML5 game made for the Trijam 163 game jam! The game was made in 3 hours, including graphical assets and code.

The game leverages PhaserJS under the hood, and is written in ES6 JavaScript.

### Links:

[Play the game](https://saricden.itch.io/stockbroker-simulator)

[Watch the livestream](https://www.youtube.com/watch?v=IdTXtWAIUvA)

### Running locally:

My boilerplate isn't yet compatible with Node 17, so you need to downgrade your version if on 17.

I used 14, and it worked fine:

```
git clone git@github.com:saricden/trijam163.git
cd trijam163
nvm use 14
npm install
npm run start
```

After running these commands, simply navigate to `http://localhost:8080` and start editing files!

### Building for production:

Assuming you're running node 14, simply run:

```
npm run build
```

And your files will be build for production and assembled under `dist/`.

### Get involved:

I plan on streaming open source game development every weekend on Twitch, so check my channel for the latest scheduling:

[twitch.tv/saricden](https://twitch.tv/saricden)
