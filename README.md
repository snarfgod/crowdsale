# Crowdsale

## Overview

This is a crowdsale contract for Snarfcoin on the [Ethereum](https://www.ethereum.org/) blockchain.

Note that only the first two accounts in hardhat will be able to purchase tokens upon deployment as they were the only addresses added to the whitelist upon deployment. To add more addresses to the whitelist, you can call the `addToWhitelist` function in the contract from the owner address. 

## Requirements

* [Node.js](https://nodejs.org/en/) >= 8.9.4
* [Hardhat](https://hardhat.org/) >= 2.0.0
* [React](https://reactjs.org/) >= 17.0.1
* [Solidity](https://soliditylang.org/) >= 0.8.0

## Installation

```bash
npm install
```

## Usage

### To test on your localhost

1. Start a local Ethereum node

```bash
npx hardhat node
```

2. Deploy the contract to your local node

```bash
npx hardhat run scripts/deploy.js --network localhost
```

3. Run the frontend

Navigate to shy-cake-6487.on.fleek.co and connect your wallet to the site.

4. Buy tokens!

## Creator

* [snarfgod](https://github.com/snarfgod)