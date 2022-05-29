const account = {
    CoCo: "0x538C26A2f0468b05a724252b300e3e223227ce63",
    colosseum: "0x02B57F90DC5eBf90fDf3A00797b95CA05BB04850",
    feePayer: "0xe59D6Be9DeE69d2ea721B0Ef5dD26f24BAdd5273"
};

const CCToken = {
    symbol: "CCT",
    address: "0xf62a966da088ac148b4c33b51f42a82d05cb251f",
    colosseum: "100",
    transferGasLimit: "300000",
    transferAbi: {
        constant: false,
        inputs: [{ internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'value', type: 'uint256' }],
        name: 'transfer',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    colosseumRewardRatioObj: {
        winner: 0.45,
        creator: 0.45
    },
    mining: 29,
    tradingLimit: 500,
    token: 7,
    tokenLimit: 500
};

const CMCToken = {
    symbol: "CMT",
    address: "0x106ae7ab1f56b8258f15a58ff7f68b3fcde0cde7"
};

const fromDb = { account, CCToken, CMCToken };

export default fromDb