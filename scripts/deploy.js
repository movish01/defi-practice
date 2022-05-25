const hre = require("hardhat");

async function main() {
  const Dai = await hre.ethers.getContractFactory("Dai");
  const dai = await Dai.deploy();
  await dai.deployed();
  console.log("Dai deployed to:", dai.address);

  const UseDai = await hre.ethers.getContractFactory("UseDai");
  const usedai = await UseDai.deploy(dai.address);
  await usedai.deployed();
  console.log("UseDai deployed to:", usedai.address);

  const MyUniswap = await hre.ethers.getContractFactory("MyUniswap");
  const myuni = await MyUniswap.deploy();
  await myuni.deployed();

  console.log("MyUniswap deployed to:", myuni.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
