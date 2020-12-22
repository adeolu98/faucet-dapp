var TokenFaucet = artifacts.require("TokenFaucet");
const  TokenAddress =  '0x90c7Aa3D4D8fE3e4C869E55F7011C579f00e3b0e'

module.exports = function(deployer){
    deployer.deploy(TokenFaucet, TokenAddress);
}