# My-Crypto-Coin

This is a very simple cryptocurrency implementation, similar to Bitcoin's PoW, in javascript and [PubNub](www.pubnub.com) (although Redis would ideally be better) and basic React for the frontend.

The deployed version using Heroku can be found [here](https://ancient-fortress-27407.herokuapp.com/), where you can play around a bit to see the basic functionality. Note if it gives you an error (*Not Found*), give it 15-30 secs and reload as Heroku takes a bit to start.

## Using it locally

To use it locally first of all clone the repository and install all necessary modules:
```
git clone https://github.com/RVS97/My-Crypto-Coin.git
```

then go into the directory and run
```
npm install
```

The project uses PubNub for the channel Publish/Subscribe functionality. You'll need to create an account and keys and modify [pubsub.js](https://github.com/RVS97/My-Crypto-Coin/blob/master/app/pubsub.js).

Once you've done all of this you should be able to run the project.

First create the client
```
npm run build-client
```

Then you can start the development version to explore it locally
```
npm run dev
```

NOTE: if you encounter issues when running the last command (I did when running on windows), you can alternatively open two terminals, running
```
npm run start-backend
```

in one, and in the other
```
npm run start-frontend
```

If everything is successful you should be able to go to [localhost:3000](http://localhost:3000/) and see the project in action with a couple transactions performed.

## Multiple local peers

Additionally you can start multiple peers locally to interact among them.

First you need to replicate the repo (ie, another simultaneous folder) and after installing all the necessary modules run
```
npm run build.client
npm run dev-peer
```

This should launch an additional peer on another port (should be logged in the corresponding logs), which can interact with the main peer using the addresses shown in the Home page.
