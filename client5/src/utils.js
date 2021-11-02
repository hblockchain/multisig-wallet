import Web3 from'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import Wallet from './contracts/Wallet.json';

// const getWeb3 =  () => {
//     // return new Web3('http://localhost:9545');
//     return new Promise((resolve,reject) => {
//      window.addEventListener('load', async => {
//         if(window.ethereum) {
//             const web3 = new Web3(window.ethereum);
//             try {
//                 window.ethereum.send('eth_requestAccounts');
//                 resolve(web3);
//             } catch (error) {
//                 reject(error);
//             }
//         } else if (window.web3) {
//             resolve(window.web3);
//         } else {
//             reject('Must install Metamask');
//         }
//      })   
//     });
// };

const getWeb3 = () =>

new Promise( async (resolve, reject) => {

let provider = await detectEthereumProvider();

if(provider) {

await provider.request({ method: 'eth_requestAccounts' });

try {

const web3 = new Web3(window.ethereum);

resolve(web3);

} catch(error) {

reject(error);

}

} reject('Install Metamask');

});

const getWallet = async web3 => {
    const networkID = await web3.eth.net.getId();
    const deployedNetwork = Wallet.networks[networkID];
    return new web3.eth.Contract(
        Wallet.abi,
        deployedNetwork && deployedNetwork.address
        );
};

export {getWeb3, getWallet};