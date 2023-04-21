// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract customERC20 is Ownable, ERC20Burnable {

    constructor(
        string memory name_,
        string memory symbol_
    ) ERC20(name_, symbol_) {

    }

    function mint(address toAccount, uint256 amount) external onlyOwner() {
        _mint(toAccount, amount);
    }
    
}