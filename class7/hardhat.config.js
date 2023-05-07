require("@nomicfoundation/hardhat-toolbox");
const { config: dotEnvConfig } = require("dotenv");
dotEnvConfig()
const PRIVATE_KEY  = process.env.PRIVATE_KEY;
const TinTinClass_API_KEY = process.env.TinTinClass_API_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    scrollAlpha: {
      url: "https://alpha-rpc.scroll.io/l2",
      accounts: [PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
    },   
    Mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/$ALCHEMY_API_KEY",
      accounts: [PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
    },     
  },
  etherscan: {
    apiKey: {
      Mumbai: TinTinClass_API_KEY,
    },
    customChains: [
      {
        network: 'Mumbai',
        chainId: 80001,
        urls: {
          apiURL: 'https://polygon-mumbai.g.alchemy.com/v2/$ALCHEMY_API_KEY',
          browserURL: 'https://mumbai.polygonscan.com/',
        },
      },
    ],
  },
};
