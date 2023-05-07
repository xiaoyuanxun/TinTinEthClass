import React, { useState, useEffect } from "react";
import Web3 from "web3";

var web3;
var balance;
var tokenBalance;
var userTokenBlance;
var mintTxHash;
var burnTxHash;
const FactoryAddress = '0x9Be131cE72b40b1995a704eb52b0D98D12b0656c';
const abi = [{"inputs":[{"internalType":"address","name":"cloneFactory","type":"address"},{"internalType":"address","name":"erc20Template","type":"address"},{"internalType":"address","name":"customErc20Template","type":"address"},{"internalType":"address","name":"customMintableErc20Template","type":"address"},{"internalType":"uint256","name":"createFee","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"ChangeCreateFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newCustomMintableTemplate","type":"address"}],"name":"ChangeCustomMintableTemplate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newCustomTemplate","type":"address"}],"name":"ChangeCustomTemplate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newStdTemplate","type":"address"}],"name":"ChangeStdTemplate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"erc20","type":"address"},{"indexed":false,"internalType":"address","name":"creator","type":"address"},{"indexed":false,"internalType":"uint256","name":"erc20Type","type":"uint256"}],"name":"NewERC20","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferPrepared","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"_CLONE_FACTORY_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_CREATE_FEE_","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_CUSTOM_ERC20_TEMPLATE_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_CUSTOM_MINTABLE_ERC20_TEMPLATE_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_ERC20_TEMPLATE_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_NEW_OWNER_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_OWNER_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"_USER_CUSTOM_MINTABLE_REGISTRY_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"_USER_CUSTOM_REGISTRY_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"_USER_STD_REGISTRY_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"changeCreateFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"totalSupply","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"tradeBurnRatio","type":"uint256"},{"internalType":"uint256","name":"tradeFeeRatio","type":"uint256"},{"internalType":"address","name":"teamAccount","type":"address"}],"name":"createCustomERC20","outputs":[{"internalType":"address","name":"newCustomERC20","type":"address"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"initSupply","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"tradeBurnRatio","type":"uint256"},{"internalType":"uint256","name":"tradeFeeRatio","type":"uint256"},{"internalType":"address","name":"teamAccount","type":"address"}],"name":"createCustomMintableERC20","outputs":[{"internalType":"address","name":"newCustomMintableERC20","type":"address"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"totalSupply","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"name":"createStdERC20","outputs":[{"internalType":"address","name":"newERC20","type":"address"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getTokenByUser","outputs":[{"internalType":"address[]","name":"stds","type":"address[]"},{"internalType":"address[]","name":"customs","type":"address[]"},{"internalType":"address[]","name":"mintables","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"initOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newCustomMintableTemplate","type":"address"}],"name":"updateCustomMintableTemplate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newCustomTemplate","type":"address"}],"name":"updateCustomTemplate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newStdTemplate","type":"address"}],"name":"updateStdTemplate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

function App() {
  // const [_account, setAccount] = useState(account);
  // const [_balance, setBalance] = useState(balance);
  // const [_contractAddress, setContractAddress] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");

  const [_supply, setSupply] = useState(0);
  const [_name, setName] = useState(""); 
  const [_symbol, setSymbol] = useState("");
  const [_decimals, setDecimals] = useState(0);
  const handleCreateStdERC20 = async() => {
    const address = await createStdERC20(_supply, _name, _symbol, _decimals);
    setTokenAddress(address);
  }

  const [_tradeBurnRatio, setTradeBurnRatio] = useState(0); 
  const [_tradeFeeRatio, setTradeFeeRatio] = useState(0);
  const [_teamAccount, setTeamAccount] = useState("");
  const handleCreateCustomERC20 = async() => {
    const address = await createCustomERC20(_supply, _name, _symbol, _decimals, _tradeBurnRatio, _tradeFeeRatio, _teamAccount);
    setTokenAddress(address);
  }

  const handleCreateCustomMintableERC20 = async() => {
    const address = await CreateCustomMintableERC20(_supply, _name, _symbol, _decimals, _tradeBurnRatio, _tradeFeeRatio, _teamAccount);
    setTokenAddress(address);
  }
  

  // const [_tokenBalance, setTokenBalance] = useState(tokenBalance);

 
  // const [_userAddress, setUserAddress] = useState("");
  // const [_userTokenBlance, setUserTokenBlance] = useState(userTokenBlance);
  // const handleQueryUserBlance = async() => {
  //   await queryUserBlance(_contractAddress, _userAddress);
  //   setUserTokenBlance(userTokenBlance);
  // }

  // const [_toUserAddress, setToUserAddress] = useState("");
  // const [_mintAmount, setMintAmount] = useState(0);
  // const [_mintTxHash, setMintTxHash] = useState(mintTxHash);
  // const handleMint = async() => {
  //   await mint(_contractAddress, _toUserAddress, web3.utils.toWei(_mintAmount));
  //   setMintTxHash(mintTxHash);
  // }

  // const [_burnAmount, setBurnAmount] = useState(0);  
  // const [_burnTxHash, setBurnTxHash] = useState(burnTxHash);
  // const handleBurn = async() => {
  //   await burn(_contractAddress, web3.utils.toWei(_burnAmount));
  //   setBurnTxHash(burnTxHash);
  // }

  return (
    <div className="App">
      <header className="App-header">
        <h1>ERC20 Factory: deploy erc20 token on one click</h1>
        <h2>部署标准ERC20合约:</h2>
        {/* <p>The init ERC20 contract is :  
          <a href = "https://blockscout.scroll.io/address/0xC2F91a05241cB4fc6bC0f51A9e1aE536505Da841"
              target = "_blank"
          >
              0xC2F91a05241cB4fc6bC0f51A9e1aE536505Da841
          </a>
        </p> */}

      <label htmlFor="supply">TotalSupply: </label>
      <input
        type="number"
        id="supply"
        value={_supply}
        onChange={(e) => setSupply(e.target.value)}
      />
      <p></p>

      <label htmlFor="name">Token Name: </label>
      <input
        type="text"
        id="name"
        value={_name}
        onChange={(e) => setName(e.target.value)}
      />
      <p></p>

      <label htmlFor="symbol">Token Symbol: </label>
      <input
        type="text"
        id="symbol"
        value={_symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <p></p>
      
      <label htmlFor="decimals">Token decimals: </label>
      <input
        type="number"
        id="decimals"
        value={_decimals}
        onChange={(e) => setDecimals(e.target.value)}
      />
      <p></p>
      <button onClick={handleCreateStdERC20}>铸造标准 ERC20 Token</button>

      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <h2>部署自定义ERC20合约:</h2>
      <label htmlFor="supply">TotalSupply: </label>
      <input
        type="number"
        id="supply"
        value={_supply}
        onChange={(e) => setSupply(e.target.value)}
      />
      <p></p>

      <label htmlFor="name">Token Name: </label>
      <input
        type="text"
        id="name"
        value={_name}
        onChange={(e) => setName(e.target.value)}
      />
      <p></p>

      <label htmlFor="symbol">Token Symbol: </label>
      <input
        type="text"
        id="symbol"
        value={_symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <p></p>
      
      <label htmlFor="decimals">Token decimals: </label>
      <input
        type="number"
        id="decimals"
        value={_decimals}
        onChange={(e) => setDecimals(e.target.value)}
      />
      <p></p>

      <label htmlFor="tradeBurnRatio">Token tradeBurnRatio: </label>
      <input
        type="number"
        id="tradeBurnRatio"
        value={_tradeBurnRatio}
        onChange={(e) => setTradeBurnRatio(e.target.value)}
      />
      <p></p>

      <label htmlFor="tradeFeeRatio">Token tradeFeeRatio: </label>
      <input
        type="number"
        id="tradeFeeRatio"
        value={_tradeFeeRatio}
        onChange={(e) => setTradeFeeRatio(e.target.value)}
      />
      <p></p>

      <label htmlFor="teamAccount">Token teamAccount: </label>
      <input
        type="text"
        id="teamAccount"
        value={_teamAccount}
        onChange={(e) => setTeamAccount(e.target.value)}
      />
      <p></p>
      <button onClick={handleCreateCustomERC20}>铸造自定义 ERC20 Token</button>

      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <h2>部署mintable 自定义ERC20合约:</h2>
      <label htmlFor="supply">TotalSupply: </label>
      <input
        type="number"
        id="supply"
        value={_supply}
        onChange={(e) => setSupply(e.target.value)}
      />
      <p></p>

      <label htmlFor="name">Token Name: </label>
      <input
        type="text"
        id="name"
        value={_name}
        onChange={(e) => setName(e.target.value)}
      />
      <p></p>

      <label htmlFor="symbol">Token Symbol: </label>
      <input
        type="text"
        id="symbol"
        value={_symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <p></p>
      
      <label htmlFor="decimals">Token decimals: </label>
      <input
        type="number"
        id="decimals"
        value={_decimals}
        onChange={(e) => setDecimals(e.target.value)}
      />
      <p></p>

      <label htmlFor="tradeBurnRatio">Token tradeBurnRatio: </label>
      <input
        type="number"
        id="tradeBurnRatio"
        value={_tradeBurnRatio}
        onChange={(e) => setTradeBurnRatio(e.target.value)}
      />
      <p></p>

      <label htmlFor="tradeFeeRatio">Token tradeFeeRatio: </label>
      <input
        type="number"
        id="tradeFeeRatio"
        value={_tradeFeeRatio}
        onChange={(e) => setTradeFeeRatio(e.target.value)}
      />
      <p></p>

      <label htmlFor="teamAccount">Token teamAccount: </label>
      <input
        type="text"
        id="teamAccount"
        value={_teamAccount}
        onChange={(e) => setTeamAccount(e.target.value)}
      />
      <p></p>
      <button onClick={handleCreateCustomMintableERC20}>铸造可mintable 自定义 ERC20 Token</button>

      <h2>部署合约结果:</h2>
      <p>Token Address : {tokenAddress}</p>
      </header>
    </div>
  );
}

async function createStdERC20(_totalSupply: String, _name: String, _symbol: uint256, _decimals: uint8) {
  if (!window.ethereum) {
    alert("Please install Metamask to use this app.");
    return;
  }

  const web3 = new Web3(window.ethereum);
  // 请求用户授权
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  // 获取用户的 Metamask 地址
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  console.log('User account:', account);

  // 使用 web3.js 创建一个合约实例
  const contract = new web3.eth.Contract(abi, FactoryAddress);
  try {
    // 获取当前的 gas 价格
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = await web3.eth.getTransactionCount(account, 'latest');

    // 设置交易参数
    const txParams = {
      nonce: web3.utils.toHex(nonce),
      from: account,
      to: FactoryAddress,
      gasLimit: web3.utils.toHex(500000),
      gasPrice: web3.utils.toHex(gasPrice),
      value: '0x00',
      data: contract.methods.createStdERC20(
        _totalSupply, 
        _name, 
        _symbol, 
        _decimals).encodeABI()
    };

    // 发送交易并等待交易确认
    const receipt = await web3.eth.sendTransaction(txParams);

    // 从交易收据中获取新的 ERC20 合约地址
    const newERC20 = receipt.contractAddress;

    console.log("New ERC20 address: ", newERC20);

    // 返回新的 ERC20 合约地址
    return newERC20;
  } catch (error) {
    console.error(error);
  }
}

async function createCustomERC20(_supply, _name, _symbol, _decimals, _tradeBurnRatio, _tradeFeeRatio, _teamAccount) {
  if (!window.ethereum) {
    alert("Please install Metamask to use this app.");
    return;
  }

  const web3 = new Web3(window.ethereum);
  // 请求用户授权
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  // 获取用户的 Metamask 地址
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  console.log('User account:', account);

  // 使用 web3.js 创建一个合约实例
  const contract = new web3.eth.Contract(abi, FactoryAddress);
  try {
    // 获取当前的 gas 价格
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = await web3.eth.getTransactionCount(account, 'latest');

    // 设置交易参数
    const txParams = {
      nonce: web3.utils.toHex(nonce),
      from: account,
      to: FactoryAddress,
      gasLimit: web3.utils.toHex(500000),
      gasPrice: web3.utils.toHex(gasPrice),
      value: '0x00',
      data: contract.methods.createCustomERC20(_supply, _name, _symbol, _decimals, _tradeBurnRatio, _tradeFeeRatio, _teamAccount).encodeABI()
    };

    // 发送交易并等待交易确认
    const receipt = await web3.eth.sendTransaction(txParams);

    // 从交易收据中获取新的 ERC20 合约地址
    const newERC20 = receipt.contractAddress;

    console.log("New ERC20 address: ", newERC20);

    // 返回新的 ERC20 合约地址
    return newERC20;
  } catch (error) {
    console.error(error);
  }  
}

async function CreateCustomMintableERC20(_supply, _name, _symbol, _decimals, _tradeBurnRatio, _tradeFeeRatio, _teamAccount) {
  if (!window.ethereum) {
    alert("Please install Metamask to use this app.");
    return;
  }

  const web3 = new Web3(window.ethereum);
  // 请求用户授权
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  // 获取用户的 Metamask 地址
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  console.log('User account:', account);

  // 使用 web3.js 创建一个合约实例
  const contract = new web3.eth.Contract(abi, FactoryAddress);
  try {
    // 获取当前的 gas 价格
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = await web3.eth.getTransactionCount(account, 'latest');

    // 设置交易参数
    const txParams = {
      nonce: web3.utils.toHex(nonce),
      from: account,
      to: FactoryAddress,
      gasLimit: web3.utils.toHex(500000),
      gasPrice: web3.utils.toHex(gasPrice),
      value: '0x00',
      data: contract.methods.createCustomMintableERC20(_supply, _name, _symbol, _decimals, _tradeBurnRatio, _tradeFeeRatio, _teamAccount).encodeABI()
    };

    // 发送交易并等待交易确认
    const receipt = await web3.eth.sendTransaction(txParams);

    // 从交易收据中获取新的 ERC20 合约地址
    const newERC20 = receipt.contractAddress;

    console.log("New ERC20 address: ", newERC20);

    // 返回新的 ERC20 合约地址
    return newERC20;
  } catch (error) {
    console.error(error);
  }  
}

async function connectToWeb3() {

    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId'});
      const desiredChainId = '0x9C001'; // 80001

      if(currentChainId != desiredChainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: desiredChainId,
                chainName: 'Mumbai',
                rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
                nativeCurrency: {
                  name: 'MATIC',
                  symbol: 'MATIC',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://mumbai.polygonscan.com']
              },
            ],
          });

          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: desiredChainId}],
          });
        } catch(error) {
          console.error(error);
        }
      };

      // Connect to the Scroll network
      const provider = new Web3.providers.HttpProvider(
        "https://rpc-mumbai.maticvigil.com"
      );
      
      web3 = new Web3(provider);

      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      let account = accounts[0];
      web3.eth.defaultAccount = account;

      balance = web3.utils.fromWei(await web3.eth.getBalance(account));

      // console.log(web3.eth.defaultAccount);
      // const signedMessage = await web3.eth.personal.sign("Hello, world!", currentAccount, "");
  } else {
    alert("Please install MetaMask to use this app.");
  }
}

export default App;
