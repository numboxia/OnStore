import { ethers } from "ethers";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs/promises";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function main() {
  const baseURI = process.env.IPFS_URI || "ipfs://QmVUitAJG5QFcfWw1feHRpYWkugQU8zaQdWPm3xGSBBQZd/";
  if (!baseURI) {
    throw new Error("IPFS_URI not set in .env file");
  }
  if (!process.env.SEPOLIA_RPC_URL) {
    throw new Error("SEPOLIA_RPC_URL not set in .env file");
  }
  if (!process.env.SEPOLIA_PRIVATE_KEY) {
    throw new Error("SEPOLIA_PRIVATE_KEY not set in .env file");
  }

  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const signer = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);
  console.log("Deploying contract with account:", signer.address);

  const artifactPath = path.resolve(__dirname, "../artifacts/contracts/GameNFT.sol/GameNFT.json");
  const artifact = JSON.parse(await fs.readFile(artifactPath, "utf-8"));

  const GameNFT = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer);

  const gameNFT = await GameNFT.deploy(baseURI);
  await gameNFT.waitForDeployment();
  const contractAddress = await gameNFT.getAddress();
  console.log("GameNFT deployed to:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });