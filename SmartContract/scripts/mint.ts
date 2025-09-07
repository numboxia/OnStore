import { ethers } from "ethers";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs/promises";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

async function main() {
  const contractAddress = "0xa12e11A799f5cF96A99D6930acFb6dC06C1B0cAA";

  if (!process.env.SEPOLIA_RPC_URL) {
    throw new Error("SEPOLIA_RPC_URL not set in .env file");
  }
  if (!process.env.SEPOLIA_PRIVATE_KEY) {
    throw new Error("SEPOLIA_PRIVATE_KEY not set in .env file");
  }

  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const signer = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);
  const recipient = signer.address;
  console.log("Minting to account:", recipient);

  const artifactPath = path.resolve(__dirname, "../artifacts/contracts/PixelQuest_License.sol/GameNFT.json");
  const artifact = JSON.parse(await fs.readFile(artifactPath, "utf-8"));

  const gameNFT = new ethers.Contract(contractAddress, artifact.abi, signer);

  const tx = await gameNFT.mint();
  console.log("Mint transaction hash:", tx.hash);
  await tx.wait();
  console.log(`Minted 1 NFT to ${recipient}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });