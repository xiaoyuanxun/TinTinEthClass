// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function deployCustomERC20() {
  const CustomERC20 = await ethers.getContractFactory("customERC20");
  const customERC20 = await CustomERC20.deploy("Test ETH Token", "tETH");
  await customERC20.deployed();
  console.log("CustomERC20 deployed: ", customERC20.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  deployCustomERC20()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

exports.deployCustomERC20 = deployCustomERC20;
