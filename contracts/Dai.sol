// SPDX-License-Identifier: Unclicense

pragma solidity ^0.8.0; 

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Dai is ERC20 {
    constructor() ERC20('Dai Stablecoin', 'DAI') {}

    function faucet(address _to, uint _amount) external {
        _mint(_to, _amount);
    }
}