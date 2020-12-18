var TokenFaucet = artifacts.require("TokenFaucet");
const  TokenAddress =  '0x4e9327cA9b05656cfA9A4F86F08644eE0E90E314'

module.exports = function(deployer){
    deployer.deploy(TokenFaucet, TokenAddress);
}