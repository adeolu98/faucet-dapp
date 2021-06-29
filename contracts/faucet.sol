pragma solidity 0.4.26;
import './IERC20.sol';

contract TokenFaucet {
    IERC20 tokenAddress;
    event mint (address caller, uint amount);
 


    constructor(IERC20 _tokenAddress) public{
        tokenAddress = _tokenAddress;
    }

    function CollectTokens() public {

        require(tokenAddress.balanceOf(msg.sender) <= 1000 * 10**18, ' token balance of claimant is more than 1000');

        //get token bal of caller 
        uint callerTokenBal =  tokenAddress.balanceOf(msg.sender);

        //calculate amount to be sent to caller, no one canhave more than 1000 tokens at a time 
        uint amountToBeClaimed = 1000* 10**18 - callerTokenBal;

        //mint tokens to the function caller
        tokenAddress.mint( msg.sender, amountToBeClaimed);
        emit mint(msg.sender, amountToBeClaimed);

    }
    
    function getCallerTokenBal() public view returns(uint){
         return tokenAddress.balanceOf(msg.sender);
    }
}