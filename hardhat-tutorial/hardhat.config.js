require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path :".env"})
/** @type import('hardhat/config').HardhatUserConfig */


// const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL;
// const RINKEBY_PRIVATE_KEY =process.env.RINKEBY_PRIVATE_KEY;

const ALCHEMY_API_URL = "https://eth-rinkeby.alchemyapi.io/v2/1L2nMQPEeoYNpSY90MyO_2FpnsAMZ7_3";
const RINKEBY_PRIVATE_KEY ="b8a7f96057fbf0942f7ce3894f3d6d5e9c437658da0e53a390c80dd89a73270b"



module.exports = {
  solidity: "0.8.9",
  networks:{
    rinkeby:{
      url:ALCHEMY_API_URL,
      accounts : [RINKEBY_PRIVATE_KEY]
    }
    }
};
