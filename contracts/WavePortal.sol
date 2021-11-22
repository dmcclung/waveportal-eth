// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 private totalWaves;

    event NewWave(address indexed from, uint256 timestamp, string message);

    uint256 private seed;

    struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    Wave[] private waves;

    mapping(address => uint256) private lastWaveAt;

    constructor() payable {
        console.log("Yo yo, I am a contract and I am smart");

        seed = (block.difficulty + block.timestamp) % 100;
    }

    function wave(string memory _message) public {
        require(
            lastWaveAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15m"
        );

        lastWaveAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s has waved!", msg.sender);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        emit NewWave(msg.sender, block.timestamp, _message);

        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("%s seed", seed);

        if (seed <= 50) {
            console.log("%s won", msg.sender);
            uint256 prizeAmount = 0.0001 ether;
            require(prizeAmount <= address(this).balance, "Insufficient funds");

            (bool success,) = msg.sender.call{ value: prizeAmount }("");
            require(success, "Failed to send prize");
        }
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}