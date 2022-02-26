import { tnt721 } from "../constants/abi";
import { networks } from "../constants/networks";
import Web3 from 'web3';
import type { Contract } from "web3-eth-contract";

export type networkType = "mainnet" | "testnet" | "privatenet";
declare const window: any;

/**
 * @param address TNT721 Contract Address
 * @param network "mainnet" | "testnet" | "privatenet"
 * @returns
 * - `contract`: Javascript representation of a smart contract 
 * - `call`: Function used to call an NFT method
 */
export default function useTNT721(address: string, network: networkType = "mainnet") {
    let contract: Contract
    // use saved contract if it exists
    if (window.zheta_contracts && window.zheta_contracts[address]) {
        contract = window.zheta_contracts[address]
    } else {
        const web3 = new Web3(networks[network].rpcUrl);
        contract = new web3.eth.Contract(tnt721, address);
        if (!window.zheta_contracts) {
            window.zheta_contracts = {}
        }
        // save contract connection under window for future use
        window.zheta_contracts[address] = contract
    }
    /**
     * @param method Contract method name
     * @param args method arguments as an object
     */
    function call(method: string, args: object = {}) {
        return contract.methods[method](...Object.values(args)).call()
    }
    return { contract, call }
}