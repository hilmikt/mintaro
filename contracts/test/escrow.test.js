const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Escrow", function () {
  it("funds and releases", async () => {
    const [client, freelancer] = await ethers.getSigners();
    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy();
    await escrow.waitForDeployment();

    const value = ethers.parseEther("0.1");
    const tx = await escrow.connect(client).fundJob(freelancer.address, { value });
    await tx.wait();

    const jobId = (await escrow.jobCount()).toNumber ? (await escrow.jobCount()).toNumber() : Number(await escrow.jobCount());

    await expect(() => escrow.connect(client).release(jobId)).to.changeEtherBalance(freelancer, value);
  });
});
