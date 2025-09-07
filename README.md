# OnStore - NFT-Based Game Licensing Platform

OnStore is a web3-enabled platform that implements NFT-based game licensing. Users can purchase games and receive NFTs that serve as proof of ownership and license to play the games.

## Project Structure

The project consists of two main parts:

### Smart Contract (`/SmartContract`)
- Implementation of ERC1155-based NFT contract for game licenses
- Written in Solidity with Hardhat development environment
- Includes deployment scripts and tests
- Features:
  - Minting game license NFTs
  - Transfer restrictions for license NFTs
  - Balance checking functionality

### Server (`/Server`)
- Express.js-based web application
- Integrates with Ethereum blockchain through ethers.js
- Features:
  - User authentication
  - Wallet connection
  - NFT minting interface
  - Game purchase processing

## Technologies Used

### Smart Contract
- Solidity ^0.8.28
- Hardhat
- OpenZeppelin Contracts
- TypeScript (for testing and deployment)
- Ethers.js

### Server
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Pug templating engine
- Ethers.js for blockchain interaction
- Session-based authentication

## Prerequisites

- Node.js v24.7.0 or higher
- MongoDB instance
- MetaMask wallet
- Sepolia testnet ETH for gas fees

## Environment Variables

Create a .env file in the root directory with the following variables:

```bash
# MongoDB Connection
MONGO_URI=your_mongodb_uri

# Session Secret
SESSION_SECRET=your_session_secret

# Ethereum Configuration
SEPOLIA_RPC_URL=your_sepolia_rpc_url
CONTRACT_ADDRESS=your_deployed_contract_address
SEPOLIA_PRIVATE_KEY=your_private_key
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/numboxia/OnStore.git
   cd OnStore
   ```

2. Install Smart Contract dependencies:
   ```bash
   cd SmartContract
   npm install
   ```

3. Install Server dependencies:
   ```bash
   cd ../Server
   npm install
   ```

## Smart Contract Deployment

1. Configure your .env file with your Sepolia private key and RPC URL
2. Deploy the contract:
   ```bash
   cd SmartContract
   npx hardhat run scripts/deploy.ts --network sepolia
   ```
3. Copy the deployed contract address to your .env file

## Running the Application

1. Start MongoDB service
2. Start the server:
   ```bash
   cd Server
   node app.js
   ```
3. Access the application at http://localhost:3000

## Features

- User Authentication: Register and login functionality
- Wallet Connection: Connect MetaMask wallet
- Game Purchase: Buy games and receive NFT licenses
- NFT Management: View and manage owned game licenses
- Secure Sessions: Session-based user authentication
- Error Handling: Comprehensive error handling for blockchain operations

## Smart Contract Features

- ERC1155 Implementation: Multiple games can be represented in one contract
- Transfer Restrictions: NFT licenses cannot be transferred between users
- Minting Controls: Each address can only mint one license per game
- Gas Optimization: Efficient implementation for lower gas costs

## API Routes

- `/auth`: Authentication routes (login, register, wallet connection)
- `/purchase`: Game purchase and NFT minting
- `/user`: User dashboard and profile management
- `/`: Home and game browsing

## Security Features

- Session-based authentication
- Secure password hashing
- Protected API endpoints
- Wallet address verification
- Smart contract access controls

## Testing

### Smart Contract Tests
```bash
cd SmartContract
npx hardhat test
```

### Server Tests (To be implemented)
```bash
cd Server
npm test
```

## License

MIT

## Contributors

- [numboxia](https://github.com/numboxia)

## Future Improvements

1. Metadata implementation for NFTs
2. Multiple game support
3. Secondary market restrictions
4. User profile enhancement
5. Transaction history
6. Game download integration
7. Automated testing for server
8. Enhanced error handling
9. Performance optimization
10. UI/UX improvements

## Support

For support, please open an issue in the GitHub repository.
