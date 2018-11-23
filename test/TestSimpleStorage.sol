pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleStorage.sol";

contract TestSimpleStorage {

  function testItStoresAValue() public {

    SimpleStorage simpleStorage = SimpleStorage(DeployedAddresses.SimpleStorage());

    simpleStorage.setPost("title1","hello world","2018-11-23 08:52:36");

    uint expected = 1;

    Assert.equal(simpleStorage.getAllPostsNumber(), expected, "one post should be stored.");

  }

}
