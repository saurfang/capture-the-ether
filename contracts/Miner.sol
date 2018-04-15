pragma solidity ^0.4.21;


contract Miner {
    uint public blockNumber;
    uint public blocks;

    function Miner() public {
        reset();
    }

    function reset() public {
        blockNumber = block.number;
        blocks = 0;
    }

    function mine() public {
        blocks = block.number - blockNumber;
    }
}
