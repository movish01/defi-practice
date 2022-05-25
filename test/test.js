const BN = require('bn.js');
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Tests", function () {
  it("Should able to use Dai token", async function () {
    const Dai = await ethers.getContractFactory("Dai");
    const dai = await Dai.deploy();
    await dai.deployed();
    console.log(dai.address);

    const UseDai = await ethers.getContractFactory("UseDai");
    const usedai = await UseDai.deploy(dai.address);
    await usedai.deployed();
    console.log(usedai.address);

    await dai.faucet(usedai.address, 100);
    const [account, _] = await ethers.getSigners();
    await usedai.myfunc(account.address, 50);

    const usedaiBalance = await dai.balanceOf(usedai.address);
    expect(usedaiBalance).to.equal(50);

    const accountBalance = await dai.balanceOf(account.address);
    expect(accountBalance).to.equal(50);
  });

});

describe("MyUniswap", function () {
  it("Should implement swap", async function () {
    const MyUniswap = await ethers.getContractFactory("MyUniswap");
    const myuni = await MyUniswap.deploy();
    await myuni.deployed();

    const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const DAI_WHALE = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";

    const AMOUNT_IN = new BN(10).pow(new BN(18)).mul(new BN(1000)); //1000 DAI
    const AMOUNT_OUT_MIN = 1;
    const TOKEN_IN = DAI;
    const TOKEN_OUT = WBTC;

    const[account, _] = await ethers.getSigners();
    const TO = account.address;

    const tokenIn = new IERC20.at(TOKEN_IN);
    const tokenOut = new IERC20.at(TOKEN_OUT);

    await tokenIn.approve(myuni.address, AMOUNT_IN, {from: DAI_WHALE});

    await myuni.swap(
      tokenIn.address,
      tokenOut.address,
      AMOUNT_IN,
      AMOUNT_OUT_MIN,
      TO,
      {
        from: DAI_WHALE,
      }
    );

    console.log(`out: ${await tokenOut.balanceOf(TO)}`);
  });
});

