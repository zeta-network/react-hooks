// @ts-nocheck
import { renderHook } from '@testing-library/react-hooks';
import useNFT from '../index';

test('should return NFT data', () => {
    const { result } = renderHook(() => useNFT());

    console.log(result);
});
