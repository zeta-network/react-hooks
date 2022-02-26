import { renderHook } from '@testing-library/react-hooks';
import { useTNT721 } from '../index';

const DUMMY_ADDRESS = "0x58bbda670702b8217c7428fe25c28c95a6e3963c"

test('should return contract object', async () => {
    const { result } = renderHook(() => useTNT721(DUMMY_ADDRESS));

    expect(typeof result.current.contract).toBe("object")
    expect(typeof result.current.call).toBe("function")
});
