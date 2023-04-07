const ERC20Full = artifacts.require("ERC20Full");
const Web3 = require("web3");
const { development } = require('../truffle-config.js'); // 引入配置文件
const { MNEMONIC, PROJECT_ID } = process.env;
const web3 = new Web3(`https://goerli.infura.io/v3/${PROJECT_ID}`); // 替换为您的以太坊网络地址


module.exports = async function(deployer) {
  console.log("https://goerli.infura.io/v3/${PROJECT_ID}")
  console.log(PROJECT_ID)
  // 部署代币合约
  const accounts = await web3.eth.getAccounts();
//   console.log("Local accounts:", accounts);
  console.log("accounts:", accounts);
  // console.log("aaaa",ERC20Full)
  
  erc20Full = await deployer.deploy(
    ERC20Full, 
    "My Token", 
    "MTK",
    accounts[1], 
    100, 
    10
  );
  return erc20Full.address;
};
