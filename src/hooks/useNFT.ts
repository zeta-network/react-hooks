import useSWR from 'swr';
import axios from 'axios';
import useTNT721, { networkType } from './useTNT721';

/**
 * @param address TNT721 Contract Address
 * @param tokenId NFT ID to fetch
 * @param network "mainnet" | "testnet" | "privatenet"
 */
export default function useNFT(address: string, tokenId: string, network: networkType = "mainnet") {

    const { call } = useTNT721(address, network);

    const { data: tokenURI, error: token_error } = useSWR([tokenId, "token"], () => call("tokenURI", { tokenId: tokenId }));
    const { data: owner, error: owner_error } = useSWR(tokenURI ? [tokenId, "owner"] : null, () => call("ownerOf", { tokenId: tokenId }));
    const { data: metadata, error: metadata_error, } = useSWR(tokenURI, () => axios.get(tokenURI).then((r) => r.data));

    const isLoadingToken = !tokenURI && !token_error
    const isLoadingMetadata = !metadata && !metadata_error
    const isLoadingOwner = !owner && !owner_error

    return {
        data: { ...{ owner: owner }, ...metadata },
        error: token_error || metadata_error || owner_error,
        loading: isLoadingToken || isLoadingMetadata || isLoadingOwner
    };
}
