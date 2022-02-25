// @ts-nocheck
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Web3 from 'web3';

const web3 = new Web3('https://eth-rpc-api.thetatoken.org/rpc');
const chainID = 361;
const abi = [
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

export function useNFT(tdrop = null, address, tokenId) {
    const contract = new web3.eth.Contract(abi, address);

    const tokenFetcher = () => contract.methods.tokenURI(tokenId).call();
    const ownerFetcher = () => contract.methods.ownerOf(tokenId).call();
    const jsonFetcher = (uri) => fetch(uri).then((r) => r.json());

    const owner = 'test';
    const token_error = null;
    const owner_error = null;
    let URI = tdrop;
    if (!tdrop) {
        const { data: owner, error: owner_error } = useSWR(`${address}-${tokenId}-owner`, ownerFetcher);
        const { data: tokenURI, error: token_error } = useSWR(`${address}-${tokenId}-token`, tokenFetcher);
        URI = tokenURI;
    }
    const { data: json, error: json_error } = useSWR(URI, jsonFetcher);

    return {
        data: {
            token: json,
            owner: owner,
        },
        error: token_error || json_error,
        loading: !token_error && !owner_error && !json && !json_error,
    };
}
