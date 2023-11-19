// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    address public owner;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Joeyzone", "JYZ") {
        owner = msg.sender;
    }

    function mint(
        address player,
        string memory _tokenURI
    ) public returns (uint256) {
        require(msg.sender == owner, "only owner can mint");
        uint256 _tokenId = _tokenIds.current();
        _mint(player, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
        _tokenIds.increment();
        return _tokenId;
    }
}
