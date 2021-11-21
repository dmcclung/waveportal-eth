import { expect } from "chai";
import { ethers } from "hardhat";

describe("WavePortal", function () {
  it("should track total waves", async function () {
    const [owner, anon] = await ethers.getSigners();

    const WavePortal = await ethers.getContractFactory("WavePortal");
    const wavePortal = await WavePortal.deploy();

    await wavePortal.deployed();

    expect(await wavePortal.getTotalWaves()).to.eq(0);

    let tx = await wavePortal.wave();
    await tx.wait();

    expect(await wavePortal.getTotalWaves()).to.eq(1);

    tx = await wavePortal.connect(anon).wave();
    await tx.wait();

    expect(await wavePortal.getTotalWaves()).to.eq(2);
  });
});
