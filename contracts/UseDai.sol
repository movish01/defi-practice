//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract UseDai {
    IERC20 dai;

    constructor (address daiAddress) {
        dai = IERC20(daiAddress);
    }

    function myfunc (address _to, uint _amount) external{
        dai.transfer(_to, _amount);
    }
}