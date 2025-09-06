const { ethers } = require("ethers");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

const abiPath = path.join(__dirname, "../../smartcontract/artifacts/contracts/OnStoreLicense.sol/OnStoreLicense.json");
const abiFile = JSON.parse(fs.readFileSync(abiPath));
const contractAbi = abiFile.abi;

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractAbi, wallet);

async function mintLicense(toAddress, amount = 1) {
  const tx = await contract.mint(toAddress, amount, "0x");
  await tx.wait();
  return tx.hash;
}

module.exports = { provider, wallet, contract, mintLicense };
