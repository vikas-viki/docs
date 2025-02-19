# 🚀 Welcomint

## 📌 Overview
**Welcomint** is an NFT marketplace enabling users to mint, buy, sell, and manage NFTs on the Ethereum blockchain. The platform offers a user-friendly interface and a robust backend to handle digital asset transactions securely and efficiently.

## 🫠 Tech Stack
- **Frontend:** React, Vite, JavaScript, CSS
- **Blockchain Interaction:** Wagmi, ethers.js
- **Wallet Connection:** Wagmi, WalletConnect
- **Storage Solutions:** IPFS via Pinata
- **Backend:** Node.js, Express.js (for IPFS uploads and fetching NFT listings)
- **Smart Contracts:** Solidity
- **Blockchain Network:** Ethereum

## 🌟 Features
- ✅ **Mint NFTs:** Users can create unique NFTs by uploading digital assets.
- ✅ **Marketplace Listings:** List NFTs for sale with customizable pricing.
- ✅ **Purchase NFTs:** Browse and buy NFTs listed by other users.
- ✅ **Cancel Listings:** Sellers can remove their NFTs from the marketplace.
- ✅ **View Owned NFTs:** Users can track NFTs they own.
- ✅ **Transaction History:** Keeps a record of purchases, sales, and ownership transfers.

---

## 𞲫 Architecture

### 🫠 System Overview
The Welcomint platform consists of:
- **Frontend (React, Wagmi, ethers.js)** – Manages UI and user interactions.
- **Backend (Express.js, IPFS)** – Handles NFT metadata uploads and fetching NFT listings.
- **Smart Contracts (Solidity)** – Manage NFT creation, transactions, and ownership.

### 💊 State & Blockchain Management
- **Wagmi & ethers.js** facilitate Ethereum network interactions.
- **WalletConnect** enables seamless wallet integration.
- **Alchemy API** provides reliable access to blockchain data.
- **Pinata (IPFS)** handles off-chain storage for NFT metadata and assets.

---

## ⚙️ Installation & Setup
```sh
# Clone the repository
git clone https://github.com/vikas-viki/welcomint.git

# Navigate to the project directory
cd welcomint

# Install dependencies for the client
cd client
npm install

# Install dependencies for the server
cd ../server
npm install

# Compile and deploy smart contracts
cd ../smart-contracts
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network <network-name>

# Start the development server
cd ../client
npm run dev
```

**Note:** Replace `<network-name>` with your desired Ethereum network (e.g., `localhost`, `rinkeby`).

---

## 🧪 Challenges & Solutions
### **1️⃣ Gas Fees on Ethereum**
- **Problem:** High gas fees can deter users from frequent transactions.
  - **Solution:** Implement batching of transactions and explore Layer 2 solutions to reduce costs.

### **2️⃣ Efficient Blockchain Integration**
- **Problem:** Managing contract interactions and wallet connectivity efficiently.
  - **Solution:** Used Wagmi to handle contract interactions and WalletConnect for seamless user authentication.

---

## 🏆 Key Learnings
- **Efficient Blockchain Integration:** Leveraged Wagmi and WalletConnect for smooth user experience.
- **Decentralized Storage:** Optimized IPFS storage for NFT metadata.
- **Smart Contract Development:** Gained expertise in Solidity for NFT transactions.

---

## 📝 Future Improvements
- 🔹 **Implement Auction Functionality:** Allow users to auction their NFTs with bidding mechanisms.
- 🔹 **Multi-Chain Support:** Expand support to other blockchains like Binance Smart Chain or Polygon.
- 🔹 **Enhanced Search and Filtering:** Improve the marketplace with advanced search and filtering options.

---

## 📩 Contact
For any questions or feedback, please reach out at [vikaskotary001@outlook.com](mailto:vikaskotary001@outlook.com).

---

This documentation provides a comprehensive overview of the Welcomint project, its architecture, features, and future plans. For more details, refer to the [GitHub repository](https://github.com/vikas-viki/welcomint).

