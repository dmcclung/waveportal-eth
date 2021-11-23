# Wave Portal buildspace.so group project

Implemented with Hardhat, app allows users to post messages and whenever someone posts a message they 
have a chance to win 0.0001 eth from the funded contract. Contract is funded from the constructor therefore
once the fund is depleted, no more messages will win a prize.

There is a 15 second cooldown on messages.

The backend is an ethereum solidity contract and the front-end is react.

```shell
yarn deploy
yarn deploy:rinkeby
yarn compile
```

Deployed smart contract on rinkeby at `0xF1BB4b923810584DE484B6E257855875265cCDBB`