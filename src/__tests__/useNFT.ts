import { renderHook } from '@testing-library/react-hooks';
import { useNFT } from '../index';

const DUMMY_ADDRESS = "0x58bbda670702b8217c7428fe25c28c95a6e3963c"
const DUMMY_TOKEN_ID = "10"

const DUMMY_EXPECTED = {
    owner: "0xbFec00027250b7f007cA3D9Edc8412ea4191276a",
    token: {
        image: "https://arweave.net/3SMxXka-01fQ_5tVUoT4ZdtH6sVfLp2pk8oqMSpkKxE/TFUELDreams.png"
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

    expect(result.current.loading).toBeFalsy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data.image).toBe(DUMMY_EXPECTED.token.image)
    expect(result.current.data.owner).toBe(DUMMY_EXPECTED.owner)
});
