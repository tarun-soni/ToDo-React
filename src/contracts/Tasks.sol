pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract Tasks {
    string[] tasks;
    function getTasks() public view returns (string[] memory){
      return (tasks);
    }
    function updateArray(string memory _task) public {
      tasks.push(_task);
    }
}