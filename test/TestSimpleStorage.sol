pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleStorage.sol";

contract TestSimpleStorage {

  function testItStoresAPost() public {

    SimpleStorage simpleStorage = SimpleStorage(DeployedAddresses.SimpleStorage());

    simpleStorage.setPost("title1","hello world","2018-11-23 08:52:36");

    uint expected = 1;

    Assert.equal(simpleStorage.getAllPostsNumber(), expected, "one post should be stored.");

  }

  function testItStoresAPostContent() public {

    SimpleStorage simpleStorage = SimpleStorage(DeployedAddresses.SimpleStorage());

    simpleStorage.setPost("title2","hello world","2018-11-23 08:50:36");

    uint expected = 2;
    uint number;
    string memory title;
    string memory content;
    address add;
    string memory timestamp;


    (number,title,content,add,timestamp) = simpleStorage.getPostBySeq(1);
    
    Assert.equal(number, expected, "sequence should equal");
    Assert.equal(title, "title2", "title should equal");
    Assert.equal(content, "hello world", "content should equal");
    Assert.equal(timestamp, "2018-11-23 08:50:36", "timestamp should equal");
  }

  function testItStoresAMessage() public {

    SimpleStorage simpleStorage = SimpleStorage(DeployedAddresses.SimpleStorage());

    simpleStorage.setPost("title1","hello world","2018-11-23 08:52:36");
    simpleStorage.setWord(1,"good job","2018-11-23 14:34:36");
    uint expected = 1;
    Assert.equal(simpleStorage.getAllWordsNumber(1), expected, "one message should be stored.");

  }

  
  function testItStoresAMessageContent() public {

    SimpleStorage simpleStorage = SimpleStorage(DeployedAddresses.SimpleStorage());

    simpleStorage.setWord(1,"good job hhh","2018-11-23 14:44:36");

    uint expected = 2;
    uint number;
    string memory word;
    address add;
    string memory timestamp;


    (number,word,add,timestamp) = simpleStorage.getAllWords(1,1);
    
    Assert.equal(number, expected, "sequence should equal");
    Assert.equal(word, "good job hhh", "word should equal");
    Assert.equal(timestamp, "2018-11-23 14:44:36", "timestamp should equal");
  }
}
