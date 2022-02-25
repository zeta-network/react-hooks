// @ts-nocheck
import axios from 'axios';
import type { AbiItem } from 'web3-utils';
import Web3 from 'web3';

const web3 = new Web3('https://eth-rpc-api.thetatoken.org/rpc');
const abi: AbiItem[] = [
    {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
];


const getContract = (
    address: string
) => {
    let contract
    if (window.zheta_contracts && window.zheta_contracts[address]) {
        contract = window.zheta_contracts[address]
    } else {
        contract = new web3.eth.Contract(abi, address);
        if (!window.zheta_contracts) {
            window.zheta_contracts = {}
        }
        window.zheta_contracts[address] = contract
    }
    return contract
}

export const web3Fetcher = (address: string, tokenId: string, value: string) => {
    const contract = getContract(address);
    if (value == "token") {
        return contract.methods.tokenURI(tokenId).call()
    }
    if (value == "owner") {
        return contract.methods.ownerOf(tokenId).call()
    }
};

export const metadataFetcher = (uri: string) => {
    return axios.get(uri).then((r) => r.data)
};