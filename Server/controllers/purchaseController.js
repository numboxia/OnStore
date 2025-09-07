const { mintNFT, hasNFT } = require("../utils/contract");

async function purchaseGame(req, res) {
  // Ensure we're sending JSON response
  res.setHeader('Content-Type', 'application/json');
  
  try {
    console.log('Purchase request received:', req.body); // Debug log

    // Use the address from the request body instead of session
    const playerAddress = req.body.address;
    if (!playerAddress) {
      console.log('No wallet address provided'); // Debug log
      return res.status(400).json({ success: false, error: "No wallet address provided" });
    }

    // Check if user already has the NFT
    const hasLicense = await hasNFT(playerAddress);
    if (hasLicense) {
      return res.status(400).json({ success: false, error: "You already own this game" });
    }

    // Mint new NFT and get transaction receipt
    console.log('Minting NFT for address:', playerAddress); // Debug log
    const txResult = await mintNFT(playerAddress);
    console.log('Minting transaction result:', txResult); // Debug log
    
    // Return the transaction hash to the client
    return res.status(200).json({ 
      success: true, 
      message: "Game NFT license minting in progress!", 
      transactionHash: txResult.hash 
    });
  } catch (err) {
    console.error('Error in purchaseGame:', err);
    return res.status(500).json({ 
      success: false, 
      error: err.message || 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}

module.exports = { purchaseGame };
