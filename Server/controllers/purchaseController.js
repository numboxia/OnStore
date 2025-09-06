const { mintLicense } = require("../utils/eth");

async function purchaseGame(req, res) {
  try {
    const playerAddress = req.session.walletAddress;
    if (!playerAddress) {
      return res.status(400).json({ success: false, error: "No wallet connected" });
    }

    const txHash = await mintLicense(playerAddress);
    res.json({ success: true, txHash, message: "NFT license minted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { purchaseGame };
