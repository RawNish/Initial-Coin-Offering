// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

  import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
  import "@openzeppelin/contracts/access/Ownable.sol";
  import "./ICryptoDevs.sol";


contract CryptoDevToken is Ownable, ERC20{

    uint256 public constant cryptoDevsTokePrice = 0.001 ether;
    uint256 public tokenpernft = 10 * 10**18 ;
    uint256 public maxTokenSupply = 1000 * 10**18;

    ICryptoDevs cryptoDevsNft;
    mapping(uint256 => bool) public tokenIsClaimed;
    // creating a new contract with address of the cryptodevs contract with constructor from erc20 token giving its name and symbol
    constructor(address _crytpoDevsContract) ERC20("CryptoDevs","CP"){
        cryptoDevsNft = ICryptoDevs(_crytpoDevsContract);
    }

    
// claiming tokens based on the NFTs a user holds
    function claim() public{
        address sender = msg.sender;
        uint256 balance = cryptoDevsNft.getBalance(sender);
        require(balance > 0 , "You don have any nfts");
        // amount is the numbr of tokenids that have not been claimed
        uint256 amount =  0 ; 

        for(uint256 i = 0 ; i < balance ; i++ ){

            uint256 tokenId =  cryptoDevsNft.getTokenIdByIndex(sender,i);
            if(!tokenIsClaimed[tokenId]){
                amount++;
                tokenIsClaimed[tokenId]=true;
            }
        }
        require(amount>0,"all the tokens ahve been claimed");
        
        //tokensperNft = 10*10**18 

        _mint(sender,amount *(10 * 10**18));

    }
    //for people who dont have NFTs
    //amount here the number of tokens a user wants to mint
    function publicMint(uint256 amount) public payable{
        uint256 _requiredAmount = cryptoDevsTokePrice * amount;
        require(msg.value >= _requiredAmount , "Ether sent is insufficient");
        uint256 amountInDecimals = amount * 10**18; 
        require(totalSupply() + amountInDecimals < maxTokenSupply , "Max number of tokens already minted");
        _mint(msg.sender , amountInDecimals); 
    }

    // function withdraw() public onlyOwner{
    //     address _owner = owner(); 
    //     uint256 amount = _owner.balance;
    //     (bool sent , ) = _owner.call{value:msg.value}("");
    //     require(sent,"failed to send ether");
    // }

    receive() external payable{}
    fallback() external payable{}
}