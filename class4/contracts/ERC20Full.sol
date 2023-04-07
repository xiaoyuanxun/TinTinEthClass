// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC20Burnable.sol";
import "./ERC20.sol";
import "./Ownable.sol";

contract ERC20Full is Ownable, ERC20Burnable {

    constructor(
        string memory name_, 
        string memory symbol_, 
        address feeTo_,
        uint256 TRANSFER_FEE_, 
        uint256 BURN_FEE_) 
        ERC20(name_, symbol_, feeTo_, TRANSFER_FEE_, BURN_FEE_)  {

    }

    function mint(address account, uint256 amount) onlyOwner external {
        _mint(account, amount);
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {

    }


}
