import React, { useState, useEffect } from "react";
import Web3 from "web3";

var web3;
var account;
var blockNumber;
var blockTimeStamp;
var balance;
var supply;
var symbol;
var tokenBalance;
var userTokenBlance;
var mintTxHash;
var burnTxHash;

const abi = [{"type":"constructor","inputs":[{"type":"string","name":"name_","internalType":"string"},{"type":"string","name":"symbol_","internalType":"string"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"burn","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"burnFrom","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"decreaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"subtractedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"increaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"addedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"mint","inputs":[{"type":"address","name":"toAccount","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","indexed":true},{"type":"address","name":"spender","indexed":true},{"type":"uint256","name":"value","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","indexed":true},{"type":"address","name":"newOwner","indexed":true}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","indexed":true},{"type":"address","name":"to","indexed":true},{"type":"uint256","name":"value","indexed":false}],"anonymous":false}];

function App() {

  const [_account, setAccount] = useState(account);
  const [_blockNumber, setBlockNumber] = useState(blockNumber);
  const [_blockTimeStamp, setblockTimeStamp] = useState(blockTimeStamp);
  const [_balance, setBalance] = useState(balance);
  useEffect(() => {
    async function init() {
      try {
        await connectToWeb3();
        setAccount(account);
        setBlockNumber(blockNumber);
        setblockTimeStamp(blockTimeStamp);
        setBalance(balance);
      } catch (error) {
        console.error(error);
      }
    }

    init();
  }, []);

  const [_contractAddress, setContractAddress] = useState("");
  const [_supply, setSupply] = useState(supply);
  const [_symbol, setSymbol] = useState(symbol);
  const [_tokenBalance, setTokenBalance] = useState(tokenBalance);
  const handleReadContract = async() => {
    await readContract(_contractAddress);
    setSupply(supply);
    setSymbol(symbol);
    setTokenBalance(tokenBalance);
  }
 
  const [_userAddress, setUserAddress] = useState("");
  const [_userTokenBlance, setUserTokenBlance] = useState(userTokenBlance);
  const handleQueryUserBlance = async() => {
    await queryUserBlance(_contractAddress, _userAddress);
    setUserTokenBlance(userTokenBlance);
  }

  const [_toUserAddress, setToUserAddress] = useState("");
  const [_mintAmount, setMintAmount] = useState(0);
  const [_mintTxHash, setMintTxHash] = useState(mintTxHash);
  const handleMint = async() => {
    await mint(_contractAddress, _toUserAddress, web3.utils.toWei(_mintAmount));
    setMintTxHash(mintTxHash);
  }

  const [_burnAmount, setBurnAmount] = useState(0);  
  const [_burnTxHash, setBurnTxHash] = useState(burnTxHash);
  const handleBurn = async() => {
    await burn(_contractAddress, web3.utils.toWei(_burnAmount));
    setBurnTxHash(burnTxHash);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>ERC20 Token Contract</h1>
        <h2>Account and Network Info:</h2>
        <p>BlockNumber: {_blockNumber}</p>
        <p>BlockTimeStamp: {_blockTimeStamp}</p>
        <p>Account: {_account}</p>
        <p>Balance: {_balance}</p>
        <h2>Basic ERC20 Token Info:</h2>
        <p>The init ERC20 contract is :  
          <a href = "https://blockscout.scroll.io/address/0xC2F91a05241cB4fc6bC0f51A9e1aE536505Da841"
              target = "_blank"
          >
              0xC2F91a05241cB4fc6bC0f51A9e1aE536505Da841
          </a>
        </p>

        <label htmlFor="contractAddress">Contract Address: </label>
      <input
        type="text"
        id="contractAddress"
        value={_contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <button onClick={handleReadContract}>Read Contract</button>
      <div>
        <p>Token Supply : {_supply}</p>
        <p>Token Symbol : {_symbol}</p>
        <p>DefaultUser Token Balance : {_tokenBalance} </p>
      </div>

      <h2>Query someone's balance</h2>
      <label htmlFor="userAddress">Input contract & user address: </label>
      <input
        type="text"
        id="contractAddress"
        value={_contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <input
        type="text"
        id="userAddress"
        value={_userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
      />
      <button onClick={handleQueryUserBlance}>Query Given UserAddress Token Blance</button>
      <div>
        <p>Input UserAddress Token Balance : {_userTokenBlance} </p>
      </div>

      <h2>Contract Owner Mint Token</h2>
      <label htmlFor="mint">Mint Token, input contract address & toAddress & amount: </label>
      <input
        type="text"
        id="contractAddress"
        value={_contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <input
        type="text"
        id="toUserAddress"
        value={_toUserAddress}
        onChange={(e) => setToUserAddress(e.target.value)}
      />
      <input
        type="text"
        id="mintAmount"
        value={_mintAmount}
        onChange={(e) => setMintAmount(e.target.value)}
      />      
      <button onClick={handleMint}> Mint </button>
      <div>
        <p>Mint TX Hash : {_mintTxHash} </p>
      </div>

      <h2>User Burn Token</h2>
      <label htmlFor="burn">Contract Address & burn amount: </label>
      <input
        type="text"
        id="contractAddress"
        value={_contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <input
        type="text"
        id="burnAmount"
        value={_burnAmount}
        onChange={(e) => setBurnAmount(e.target.value)}
      />
      <button onClick={handleBurn}>Burn</button>
      <div>
        <p>Burn TX Hash : {_burnTxHash} </p>
      </div>
      </header>
    </div>
  );
}

async function readContract(contractAddress) {
  const contract = new web3.eth.Contract(abi, contractAddress);
  supply = web3.utils.fromWei(await contract.methods.totalSupply().call());
  symbol = await contract.methods.symbol().call();
  tokenBalance = web3.utils.fromWei(await contract.methods.balanceOf(account).call());
}

async function queryUserBlance(contractAddress, givenAccount) {
  const contract = new web3.eth.Contract(abi, contractAddress);
  userTokenBlance = web3.utils.fromWei(await contract.methods.balanceOf(givenAccount).call());
  console.log(givenAccount);
  console.log(userTokenBlance);
}

async function mint(contractAddress, to, amount) {
  if (!window.ethereum) {
    alert("Please install Metamask to use this app.");
    return;
  }

  const contract = new web3.eth.Contract(abi, contractAddress);

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    const txParams = {
      from: account,
      to: contractAddress,
      gasLimit: web3.utils.toHex(500000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
      value: '0x00',
      data: contract.methods.mint(to, amount).encodeABI()
    }

    const signedTx = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParams],
    });
    
    mintTxHash = signedTx;
    console.log("Mint Transaction hash: ", signedTx);
  } catch (error) {
    console.error(error);
  }
}

async function burn(contractAddress, amount) {
  if (!window.ethereum) {
    alert("Please install Metamask to use this app.");
    return;
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const contract = new web3.eth.Contract(abi, contractAddress);

  try {
    const nonce = await web3.eth.getTransactionCount(account, 'latest');

    const txParams = {
      nonce: web3.utils.toHex(nonce),
      from: account,
      to: contractAddress,
      gasLimit: web3.utils.toHex(500000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
      value: '0x00',
      data: contract.methods.burn(amount).encodeABI()
    }

    const signedTx = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [txParams],
    });
    burnTxHash = signedTx;
    console.log("Signed burn transaction: ", signedTx);
  } catch (error) {
    console.error(error);
  }
}

async function connectToWeb3() {

    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId'});
      const desiredChainId = '0x82751'; // 534353

      if(currentChainId != desiredChainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: desiredChainId,
                chainName: 'Scroll Network',
                rpcUrls: ['https://alpha-rpc.scroll.io/l2'],
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://blockscout.scroll.io/']
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
        "https://alpha-rpc.scroll.io/l2"
      );
      
      web3 = new Web3(provider);

      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      account = accounts[0];
      web3.eth.defaultAccount = account;

      blockNumber = await web3.eth.getBlockNumber();
      blockTimeStamp = (await web3.eth.getBlock(blockNumber)).timestamp;
      // console.log(blockTimeStamp)
      balance = web3.utils.fromWei(await web3.eth.getBalance(account));

      // console.log(web3.eth.defaultAccount);
      // const signedMessage = await web3.eth.personal.sign("Hello, world!", currentAccount, "");
  } else {
    alert("Please install MetaMask to use this app.");
  }
}

export default App;
