require("@nomicfoundation/hardhat-toolbox");
const { config: dotEnvConfig } = require("dotenv");
dotEnvConfig()
const PRIVATE_KEY  = process.env.PRIVATE_KEY;
const TinTinClass_API_KEY = process.env.TinTinClass_API_KEY;

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
  },
  etherscan: {
    apiKey: {
      scrollAlpha: TinTinClass_API_KEY,
    },
    customChains: [
      {
        network: 'scrollAlpha',
        chainId: 534353,
        urls: {
          apiURL: 'https://blockscout.scroll.io/api',
          browserURL: 'https://blockscout.scroll.io/',
        },
      },
    ],
  },
};
