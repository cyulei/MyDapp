const SimpleStorage = artifacts.require("./SimpleStorage.sol");

contract("SimpleStorage", accounts => {
  it("...should store one post", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();

    await simpleStorageInstance.setPost("title1","hello world","2018-11-23 08:52:36",{ from: accounts[0] });
    
    const number = await simpleStorageInstance.getAllPostsNumber.call();
    
    assert.equal(number, 1, "one post was stored.");
  });
});
