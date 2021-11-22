import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const WavePortal = await ethers.getContractFactory("WavePortal");
  const wavePortal = await WavePortal.deploy({
    value: ethers.utils.parseEther('0.01')
  });

  await wavePortal.deployed();

  console.log("Contract deployed to:", wavePortal.address);
  console.log("Contract deployed by:", deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});