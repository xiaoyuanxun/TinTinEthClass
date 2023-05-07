// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  // deploy CloneFactory 
  const CloneFactory = await hre.ethers.getContractFactory("CloneFactory");
  const cloneFactory = await CloneFactory.deploy();
  await cloneFactory.deployed();
  const cloneFactoryAddress = cloneFactory.address;
  console.log('cloneFactory : ', cloneFactoryAddress);

  // deploy Erc20Template
  const Erc20Template = await hre.ethers.getContractFactory("InitializableERC20");
  const erc20Template = await Erc20Template.deploy();
  await erc20Template.deployed();
  const erc20TemplateAddress = erc20Template.address;
  console.log('Erc20Template : ', erc20TemplateAddress);

  // deploy CustomErc20Template
  const CustomErc20Template = await hre.ethers.getContractFactory("CustomERC20");
  const customErc20Template = await CustomErc20Template.deploy();
  await customErc20Template.deployed();
  const customErc20TemplateAddress = customErc20Template.address;
  console.log('CustomErc20Template : ', customErc20TemplateAddress);

  // deploy CustomMintableErc20Template
  const CustomMintableErc20Template = await hre.ethers.getContractFactory("CustomMintableERC20");
  const customMintableErc20Template = await CustomMintableErc20Template.deploy();
  await customMintableErc20Template.deployed();
  const customMintableErc20TemplateAddress = customMintableErc20Template.address;
  console.log('CustomMintableErc20Template : ', customMintableErc20TemplateAddress);  

  // deploy ERC20V3Factory
  const ERC20V3Factory = await hre.ethers.getContractFactory("ERC20V3Factory");
  const erc20V3Factory = await ERC20V3Factory.deploy(
    cloneFactoryAddress,
    erc20TemplateAddress,
    customErc20TemplateAddress,
    customMintableErc20TemplateAddress,
    0
  );
  await erc20V3Factory.deployed();
  const erc20V3FactoryAddress = erc20V3Factory.address;
  console.log('ERC20V3Factory : ', erc20V3FactoryAddress);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
