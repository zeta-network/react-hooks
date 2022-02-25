import useSWR from 'swr';
import { metadataFetcher, web3Fetcher } from '../fetchers/nft';

export function useNFT(address: string, tokenId: string) {
    const { data: tokenURI, error: token_error } = useSWR([address, tokenId, "token"], web3Fetcher);
    const { data: metadata, error: metadata_error, } = useSWR(tokenURI, metadataFetcher);
    const { data: owner, error: owner_error } = useSWR(tokenURI ? [address, tokenId, "owner"] : null, web3Fetcher);

    const isLoadingToken = !tokenURI && !token_error
    const isLoadingMetadata = !metadata && !metadata_error
    const isLoadingOwner = !owner && !owner_error

    return {
        data: { ...{ owner: owner }, ...metadata },
        error: token_error || metadata_error || owner_error,
        loading: isLoadingToken || isLoadingMetadata || isLoadingOwner
    };
}
