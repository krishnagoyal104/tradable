// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract Relic is ERC721, Ownable {
    using Counters for Counters.Counter;
    uint256 public tokenId;

    constructor(string memory _name, string memory _symbol) public ERC721(_name, _symbol) {}

    function mintTo(address player)
        public ownlyOwner
        returns (uint256)
    {
        tokenId += 1;
        _mint(player, tokenId);

        return tokenId;
    }
    
    function bulkMint() public onlyOwner {
        uint256 _tokenId = tokenId;
        for(uint i=0; i<10; i++){
            _tokenId += 1;
            _mint(owner(), _tokenId);
        }
        tokenId = _tokenId;
    }
    
    function getTokensByUser(address _user) external view returns(uint256[] memory) {
        uint256[] memory result = new uint256[](balanceOf(_user));
        uint counter = 0;
        for (uint i = 1; i <= tokenId; i++) {
            if(ownerOf(i) == _user){
                result[counter] = i;
                counter++;   
            }
        }
        return result;
    }
    
}