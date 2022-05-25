//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IUniswapV2Router {
    function swapTokensForExactTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
}