pragma solidity 0.4.26;
import './IERC20.sol';

contract TokenFaucet {
    IERC20 tokenAddress;
    event transfer (address caller, uint amount);
 

    // code will be deployed when the token address of token to be distributed by faucet is provided.
    constructor(IERC20 _tokenAddress) public{
        tokenAddress = _tokenAddress;
    }

    function CollectTokens() public {

        require(tokenAddress.balanceOf(msg.sender) <= 1000 * 10**18, ' token balance of claimant is more than 1000');

        //get token bal of caller 
        uint callerTokenBal =  tokenAddress.balanceOf(msg.sender);

        //calculate amount to be sent to caller
        uint amountToBeClaimed = 1000* 10**18 - callerTokenBal;

        //transfer 50 tokens to the function caller
        tokenAddress.transfer( msg.sender, amountToBeClaimed);
        emit transfer(msg.sender, amountToBeClaimed);

    }
    
    function getCallerTokenBal() public view returns(uint callerTokenBal){
         callerTokenBal =  tokenAddress.balanceOf(msg.sender);
    }
}