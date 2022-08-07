Initial Coin Offering foor NFT Collection

This project is aimed at implementing an Initial Coin Offering of an NFT collection which has already been implemented.

The folder structure has been devised in  a way to  keep frontend and Blockchain implementation in different directories.

The first folder "frontend/my-app" contains all the code regarding the frontend of the project.
The frontend framework that has been used is Next.js
Basic commands:

///npm run dev : starting the next.js local server

// npm install "package name" :installing additional packages

//Cltr+C : Stopping the current next.js server

//npm install web3modal : web3modal library connects frontend to a wallet

//npm install ethers : ethers connects the frontend with the solidity logic




The second folder  "hardhat-tutorial" contains the blockchain aspect fo the project

The chain used here is Ethereum.
The testing and deployment framework used is harhdat 

Basic Commands:

//npm install --save-dev hardhat : Installing hardhat on your local machine

//npm install --save-dev @nomicfoundation/hardhat-toolbox :Additional Libraries required to run,deploy and test  the project  


//npm install @openzeppelin/contracts : Install the ERC 20 token implementation of openzeppelin

//npx hardhat compile : Compiling the Contracts

//npx hardhat run scripts/deploy.js --network {CHAIN NAME} : deploy the contract