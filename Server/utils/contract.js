const ethers = require('ethers');
const path = require('path');
const fs = require('fs');

// Read the contract ABI from the artifacts
const contractArtifact = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, '../../SmartContract/artifacts/contracts/PixelQuest_License.sol/GameNFT.json')
    )
);

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    contractArtifact.abi,
    provider
);

// Get signer for transactions
const getSigner = () => {
    const privateKey = process.env.SEPOLIA_PRIVATE_KEY;
    if (!privateKey) {
        throw new Error('Private key not found in environment variables');
    }
    return new ethers.Wallet(privateKey, provider);
};

// Contract interaction methods
const mintNFT = async (userAddress) => {
    try {
        console.log('Starting NFT mint for address:', userAddress); // Debug log
        const signer = getSigner();
        const contractWithSigner = contract.connect(signer);
        
        // Call mint function
        const tx = await contractWithSigner.mint({
            gasLimit: 500000 // Add explicit gas limit
        });
        
        console.log('Minting transaction hash:', tx.hash); // Debug log
        
        // Wait for the transaction to be mined and get the receipt
        const receipt = await tx.wait(1); // Wait for 1 confirmation
        console.log('Minting transaction receipt:', receipt);
        
        // Verify the mint
        const balance = await contract.balanceOf(userAddress, 1);
        console.log('New balance after mint:', balance.toString()); // Debug log
        
        return tx; // Return the transaction object
    } catch (error) {
        console.error('Error minting NFT:', error);
        throw error;
    }
};

const hasNFT = async (address) => {
    try {
        const balance = await contract.balanceOf(address, 1); // 1 is GAME_TOKEN_ID
        console.log('NFT balance for address', address, ':', balance.toString()); // Debug log
        // Convert balance to number and check if greater than 0
        return Number(balance) > 0;
    } catch (error) {
        console.error('Error checking NFT balance:', error);
        throw error;
    }
};

module.exports = {
    contract,
    mintNFT,
    hasNFT
};
