
const { deployer } = require('../migrations/1_deploy_contract.js')
const Web3 = require("web3");
const web3 = new Web3("http://localhost:7545"); // 替换为您的以太坊网络地址
const ERC20Full = artifacts.require("ERC20Full");

contract("Token", accounts => {
  let token;

  beforeEach(async () => {
    token = await ERC20Full.new(
        "My Token", 
        "MTK",
        accounts[1], 
        100, 
        10
    );
    accounts = await web3.eth.getAccounts();
  });

  it("should have true constructor", async () => {
    assert.equal(await token.name(), "My Token");
    assert.equal(await token.symbol(), "MTK");
    assert.equal(await token.feeTo(), accounts[1]);
    assert.equal(await token.transferFee(), 100);
    assert.equal(await token.burnFee(), 10);
    assert.equal(await token.owner(), accounts[0]);
  });

  it("测试：项目方增发", async () => {
    await token.mint(accounts[2], 10000);
    // web3.utils.toWei("1000000", "ether")
    assert.equal(await token.totalSupply(), 10000);
    assert.equal(await token.balanceOf(accounts[2]), 10000);
  });

  it("测试：代币销毁", async () => {
    await token.mint(accounts[2], 10000);
    assert.equal(await token.totalSupply(), 10000);
    assert.equal(await token.balanceOf(accounts[2]), 10000);
    await token.burn(1000, { from: accounts[2] });
    // web3.utils.toWei("1000000", "ether")
    assert.equal(await token.totalSupply(), 9000);
    assert.equal(await token.balanceOf(accounts[2]), 9000);
  });

  it("测试：交易收取手续费 和 消耗部分代币", async () => {
    await token.mint(accounts[2], 10000);
    assert.equal(await token.totalSupply(), 10000);
    assert.equal(await token.balanceOf(accounts[2]), 10000);

    assert(
        await token.transfer(accounts[3], 1110, { from: accounts[2] }),
        true
    );

    assert.equal(await token.balanceOf(accounts[3]), 1000);
    assert.equal(await token.balanceOf(accounts[1]), 100);

    assert.equal(await token.totalSupply(), 9990);
    assert.equal(await token.balanceOf(accounts[2]), 8890);

  });

//   it("should transfer tokens between accounts", async () => {
//     const account1 = accounts[0];
//     const account2 = accounts[1];

//     const amount = web3.utils.toWei("1000", "ether");

//     await token.transfer(account2, amount, { from: account1 });

//     const account1Balance = await token.balanceOf(account1);
//     const account2Balance = await token.balanceOf(account2);

//     assert.equal(account1Balance, web3.utils.toWei("999000", "ether"));
//     assert.equal(account2Balance, amount);
//   });
});
