# 🌿 Ethereum Lottery DApp

A decentralized lottery application built on the Ethereum blockchain. Participants can enter the lottery by sending Ether, and the contract manager can randomly pick a winner to receive the total prize pool.

---

## 📖 Features

* 🎿 Users enter the lottery by sending Ether.
* 💸 Manager can pick a random winner.
* 🔒 All transactions and operations are transparent on the Ethereum blockchain.
* 🌐 Frontend interface for easy participation and monitoring.

---

## 🛠️ Tech Stack

| Layer            | Stack                            |
| ---------------- | -------------------------------- |
| Smart Contracts  | Solidity, Remix, Infura          |
| Ethereum Network | Sepolia Testnet (or any testnet) |
| Frontend         | React.js, Next.js                |
| UI Components    | Semantic UI React                |
| Web3 Integration | web3.js                          |

---

## ⚙️ Setup & Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/ethereum-lottery.git
cd ethereum-lottery
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Deploy Smart Contracts

1. Ensure you’ve configured your **Infura endpoint** and **wallet private key** securely in your deployment scripts.
2. Run the deployment script:

```bash
npm run deploy
```

3. Update your frontend with the deployed contract address inside:

```
ethereum/lottery.js
```

---

### 4️⃣ Start Local Development Server

```bash
npm run dev
```

The app will be accessible at:

```
http://localhost:3000
```

---

## 📂 Project Structure

```
/ethereum         # Solidity contracts and deployment scripts
/components       # Reusable React components (Header, LotteryForm, WinnerDisplay)
/pages            # Next.js frontend pages
```

---

## 📌 Important Files

* `/ethereum/Lottery.sol` — Core smart contract.
* `/ethereum/deploy.js` — Deployment script for Lottery contract.
* `/ethereum/lottery.js` — Interacts with the deployed contract.
* `/components/LotteryForm.js` — UI to enter the lottery.
* `/components/WinnerDisplay.js` — UI to show winner details.

---

## 🔐 Deployment Details

* **Network:** Sepolia (or preferred testnet)
* **Contract Address:** Replace in `/ethereum/lottery.js` after deployment.
* **Infura Project ID:** Set in your deployment and web3 setup.

---

## ✅ Contribution Guidelines

1. Fork this repository.
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add feature'`
4. Push the branch: `git push origin feature/YourFeature`
5. Submit a pull request.

---

## 📄 License

MIT License.
Feel free to use, modify, and distribute.

---

## 📢 Credits

Inspired by the Ethereum Lottery concept taught in blockchain development courses.
