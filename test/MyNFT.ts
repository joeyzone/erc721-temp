import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
// import { ContractMethodArgs, BigNumberish } from "ethers";

describe("MY NFT", () => {
  async function deployNFT() {
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const [owner, otherAccount] = await ethers.getSigners();
    const myNFT = await MyNFT.deploy();
    return { myNFT, owner, otherAccount };
  }
  describe("Deployment", async () => {
    it("should set the right symbol", async () => {
      const { myNFT, owner, otherAccount } = await loadFixture(deployNFT);
      const symbol = await myNFT.symbol();
      expect(symbol).to.equal("JYZ");
    });
    it("owner should be set right", async () => {
      const { myNFT, owner, otherAccount } = await loadFixture(deployNFT);
      expect(await myNFT.owner()).to.equal(owner.address);
    });
  });

  describe("Mint Reward", async () => {
    it("should be owner invoke mint", async () => {
      const _tokenURI = "QmQMHurT2WaZJ9bcvPX2EatEr7pnyBNZS2ERJwvuFPFrNB";
      const { myNFT, owner, otherAccount } = await loadFixture(deployNFT);

      await expect(
        myNFT.connect(otherAccount).mint(otherAccount.address, _tokenURI)
      ).to.be.revertedWith("only owner can mint");
    });
    it("should be right minted", async () => {
      const _tokenURI = "QmQMHurT2WaZJ9bcvPX2EatEr7pnyBNZS2ERJwvuFPFrNB";
      const { myNFT, owner, otherAccount } = await loadFixture(deployNFT);
      const ret = await myNFT.mint(otherAccount.address, _tokenURI);
      expect(await myNFT.ownerOf(ret.value)).to.equal(otherAccount.address);
    });
  });
});
