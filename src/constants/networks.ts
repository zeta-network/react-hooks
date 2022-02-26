export const ChainIds = {
    mainnet: 'mainnet',
    testnet: 'testnet',
    privatenet: 'privatenet',
};

export const Mainnet = {
    chainId: ChainIds.mainnet,
    name: "Mainnet",
    rpcUrl: "https://eth-rpc-api.thetatoken.org/rpc",
    explorerUrl: "https://explorer.thetatoken.org",
    color: "#1BDED0",
};

export const Testnet = {
    chainId: ChainIds.testnet,
    name: "Testnet",
    rpcUrl: "https://theta-bridge-rpc-testnet.thetatoken.org/rpc",
    explorerUrl: "https://beta-explorer.thetatoken.org",
    color: "#FF4A8D",
};

export const Privatenet = {
    chainId: ChainIds.privatenet,
    name: "Local Theta Testnet",
    rpcUrl: "http://127.0.0.1:18888/rpc",
    explorerUrl: null,
    color: "#fae456",
};

export const networks = {
    [ChainIds.mainnet]: Mainnet,
    [ChainIds.testnet]: Testnet,
    [ChainIds.privatenet]: Privatenet,
}

