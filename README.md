# Decetralized Voting System

Every four years, general elections are held in different countries.
Blockchain is a perfect aplication for a voting system because the system will be immutable meaning that past data can not be change and with the consencus algorithm all the fake votes will be rejected which is very secure.

The app uses Ethereum smart contracts for creating a fully decentralized voting system that can’t be hacked or taken down.

### Installation

You can use either npm or yarn for this process.

* Install truffle with `yarn global add truffle` ( _if you dont have it already_ ).
* We also need the private blockchain Ganache which you need to get installed.
* Clone the project.
* Install the project devendencies with `yarn`.

### Starting the decetralized app

1.  Open terminal in project directory.
2.  Open Ganache.
3.  Run `truffle migrate --compile-all --reset --network ganache` to send the contract to the Ganache private blockchain.
4.  Run `yarn run dev` to open the web app.

### App screenshot
  ![alt text](https://i.imgur.com/uH5VzuO.png)
