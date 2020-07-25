const PubNub = require('pubnub');

const credentials = {
    publishKey: 'your-key-here',
    subscribeKey: 'your-key-here',
    secretKey: 'your-key-here'
};

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOKCHAIN',
    TRANSACTION: 'TRANSACTION'
};

class PubSub {
    constructor({ blockchain, transactionPool, wallet }) {
        this.pubnub = new PubNub(credentials);

        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;

        this.pubnub.subscribe({ channels: Object.values(CHANNELS) });

        this.pubnub.addListener(this.listener());
    }

    broadcastChain(){
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }

    broadcastTransaction(transaction){
        this.publish({
            channel: CHANNELS.TRANSACTION,
            message: JSON.stringify(transaction)
        });
    }

    subscribeToChannels(){
        this.pubnub.subscribe({
            channel: [Object.values(CHANNELS)]
        });
    }

    listener() {
        return {
            message: messageObject => {
                const { channel, message } = messageObject;
                console.log(`Message received. Channel: ${channel}. Message: ${message}`);

                const parsedMessage = JSON.parse(message);

                switch(channel){
                    case CHANNELS.BLOCKCHAIN:
                        this.blockchain.replaceChain(parsedMessage, true, () => {
                            this.transactionPool.clearBlockchainTransactions({
                                chain:parsedMessage
                            });
                        });
                        break;
                    case CHANNELS.TRANSACTION:
                        if(!this.transactionPool.existingTransaction({ inputAddress: this.wallet.publicKey })){
                            this.transactionPool.setTransaction(parsedMessage);
                        }
                        break;
                    default:
                        return;
                }
            }
        };
    }

    publish({ channel, message }){
        this.pubnub.publish({ channel, message });
    }
}

module.exports = PubSub;