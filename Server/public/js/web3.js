// Web3 integration
async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask to use this feature!');
        return false;
    }

    try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const walletAddress = accounts[0];
        
        // Send the wallet address to our server
        const response = await fetch('/auth/connect-wallet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ walletAddress }),
        });

        const data = await response.json();
        if (data.success) {
            document.getElementById('wallet-status').textContent = 
                `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
            return true;
        }
    } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet');
        return false;
    }
}

async function purchaseGame() {
    if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask to purchase!');
        return;
    }

    try {
        // Get the current account
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0];

        console.log('Sending purchase request for address:', userAddress); // Debug log

        // First, request the server to mint the NFT
        const response = await fetch('/purchase', {  // Changed from '/purchase/game' to '/purchase'
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ address: userAddress })
        });

        // Check if the response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Server did not return JSON. Got: ' + contentType);
        }

        const data = await response.json();
        console.log('Server response:', data); // Debug log

        if (!data.success) {
            throw new Error(data.error || 'Purchase failed on server');
        }

        // Wait for the transaction to be mined
        if (data.transactionHash) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.waitForTransaction(data.transactionHash, 1); // Wait for 1 confirmation

            alert('Purchase successful! The game NFT has been minted to your wallet.\nTransaction Hash: ' + data.transactionHash);
            return true;
        } else {
            throw new Error('No transaction hash received from server');
        }
    } catch (error) {
        console.error('Error purchasing game:', error);
        if (error.message.includes('<!DOCTYPE')) {
            alert('Server error occurred. Please try again later.');
        } else {
            alert('Failed to purchase game: ' + error.message);
        }
        return false;
    }
}
