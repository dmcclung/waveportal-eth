import { ethers } from "hardhat";

async function main() {
  const [owner, randomPerson] = await ethers.getSigners();

  const WavePortal = await ethers.getContractFactory("WavePortal");
  const wavePortal = await WavePortal.deploy();

  await wavePortal.deployed();

  console.log("Contract deployed to:", wavePortal.address);
  console.log("Contract deployed by:", owner.address);

  let totalWaves = await wavePortal.getTotalWaves();
  console.log("Total waves:", totalWaves);

  let tx = await wavePortal.wave();
  await tx.wait();

  totalWaves = await wavePortal.getTotalWaves();
  console.log("Total waves:", totalWaves);

  tx = await wavePortal.connect(randomPerson).wave();
  await tx.wait();

  totalWaves = await wavePortal.getTotalWaves();
  console.log("Total waves:", totalWaves);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
