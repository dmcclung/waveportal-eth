import { expect } from "chai";
import { ethers } from "hardhat";

describe("WavePortal", function () {
  it("should track total waves and balance", async function () {
    const [owner, anon] = await ethers.getSigners();

    const WavePortal = await ethers.getContractFactory("WavePortal");
    const wavePortal = await WavePortal.deploy({
      value: ethers.utils.parseEther('0.01')
    });

    await wavePortal.deployed();

    let contractBalance = await ethers.provider.getBalance(wavePortal.address)
    expect(ethers.utils.formatEther(contractBalance)).to.eq('0.01')

    expect(await wavePortal.getTotalWaves()).to.eq(0);

    let tx = await wavePortal.wave('Gm');
    await tx.wait();

    contractBalance = await ethers.provider.getBalance(wavePortal.address)
    console.log('Contract balance:', ethers.utils.formatEther(contractBalance))

    expect(await wavePortal.getTotalWaves()).to.eq(1);

    tx = await wavePortal.connect(anon).wave('Gn');
    await tx.wait();

    contractBalance = await ethers.provider.getBalance(wavePortal.address)
    console.log('Contract balance:', ethers.utils.formatEther(contractBalance))
    
    expect(await wavePortal.getTotalWaves()).to.eq(2);
  });
});
