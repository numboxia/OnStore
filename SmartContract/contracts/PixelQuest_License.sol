// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract GameNFT is ERC1155 {
    uint256 public constant GAME_TOKEN_ID = 1;

    mapping(address => bool) private _hasMinted;

    constructor(string memory baseURI) ERC1155(baseURI) {}

    function mint() external {
        require(!_hasMinted[msg.sender], "Address has already minted");
        _hasMinted[msg.sender] = true;
        _mint(msg.sender, GAME_TOKEN_ID, 1, "");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        revert("GameNFT: Transfers are disabled");
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual override {
        revert("GameNFT: Batch transfers are disabled");
    }

    function uri(uint256) public view virtual override returns (string memory) {
        return super.uri(GAME_TOKEN_ID);
    }
}