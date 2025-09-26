// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Reputation {
    event RatingGiven(address indexed from, address indexed to, uint8 score, string comment);

    function rate(address to, uint8 score, string calldata comment) external {
        require(score >= 1 && score <= 5, "1-5");
        emit RatingGiven(msg.sender, to, score, comment);
    }
}
