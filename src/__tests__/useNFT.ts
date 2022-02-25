import { renderHook } from '@testing-library/react-hooks';
import { useNFT } from '../index';

const DUMMY_ADDRESS = "0x1f3de9cdb1d4ed10e8b7b3f21f282d84f7f54473"
const DUMMY_TOKEN_ID = "10"

const DUMMY_EXPECTED = {
    owner: "0x30fb8727D05E559F22eeF9907CC3F91589ec4F57",
    token: {
        image: "https://arweave.net/TjKt807C6rYf_flrn1t1zUkENm3w4ZCJhnTz1QhfLmU"
    }
}

jest.setTimeout(5000)

test('should return NFT data', async () => {
    const { result, waitFor } = renderHook(() => useNFT(DUMMY_ADDRESS, DUMMY_TOKEN_ID));

    expect(result.current.loading).toBeTruthy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data.token).toBeUndefined()
    expect(result.current.data.owner).toBeUndefined()

    await waitFor(() => { return result.current.loading == false }, { timeout: 5000 })

    console.log(result.current.data);
    
    expect(result.current.loading).toBeFalsy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data.image).toBe(DUMMY_EXPECTED.token.image)
    expect(result.current.data.owner).toBe(DUMMY_EXPECTED.owner)
});
