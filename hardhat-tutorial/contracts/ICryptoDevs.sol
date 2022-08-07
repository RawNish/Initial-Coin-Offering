// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface ICryptoDevs{
    function getTokenIdByIndex(address user , uint256 index) 
    external
    view
    returns(uint256 tokenId);

    function getBalance(address user) 
    external 
    view 
    returns(uint256 balance);


}