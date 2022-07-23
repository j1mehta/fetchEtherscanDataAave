// Reading contract https://etherscan.io/address/0x398eC7346DcD622eDc5ae82352F02bE94C62d119#readProxyContract
// Works "ABI for the implementation contract at 0xc1ec30dfd855c287084bf6e14ae2fdd0246baf0d"
// Doesn't work "Previously recorded to be on 0xdb9217fad3c1463093fc2801dd0a22c930850a61"

const fetch = require('node-fetch');
const ethers = require("ethers");

async function main() {

    sampleAddressV2 = '0xd5c66bb825cf398d2b2035dcd8cdd102d9704f1c'
    sampleAddressV1 = '0x440efbba3f3d971fd8411c580197ecb53ef71f87'

    aaveLendingPoolV2Address = '0xc6845a5c768bf8d7681249f8927877efda425baf'
    aaveLendingPoolV1Address = '0xc1ec30dfd855c287084bf6e14ae2fdd0246baf0d'

    contractAddress = aaveLendingPoolV2Address
    sampleAddress = sampleAddressV2


    // creating a new Provider, and passing in our node URL
    const node = "wss://eth-mainnet.g.alchemy.com/v2/2z9JYK0TXfU2vWoNQgpjOltZ0amERORc"
    const provider = new ethers.providers.WebSocketProvider(node);
    //TODO: Remove API key
    apiKey = 'YourAlchemyAPIKey'


    // make an API call to the ABIs endpoint
    const response = await fetch('https://api.etherscan.io/api?module=contract&action=getabi&address='+contractAddress+'&apikey='+apiKey);
    const data = await response.json();
    let abi = data.result;
    console.log(abi);


    //TODO: Remove private key
    let privatekey = "YourWalletPrivateKey";
    let wallet = new ethers.Wallet(privatekey, provider);
    console.log("Using wallet address to sign txn: " + wallet.address);


    let contract = new ethers.Contract(contractAddress, abi, wallet);
    // console.log(contract)

    // getUserAccountData returns
    //       uint256 totalCollateralETH,
    //       uint256 totalDebtETH,
    //       uint256 availableBorrowsETH,
    //       uint256 currentLiquidationThreshold,
    //       uint256 ltv,
    //       uint256 healthFactor
    let read = await contract.getUserAccountData(sampleAddress);
    console.log("Value stored in contract is " + read.toString());
    // let read2 = await contract.resolvedAddress();
    // console.log("Value stored in contract is " + read2.toString());
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();