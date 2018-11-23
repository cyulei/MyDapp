pragma solidity ^0.4.24;

contract SimpleStorage {
    
  //留言结构体
  struct Message {
      string word;       //留言内容
      address from;      //留言者地址
      string timestamp;  //留言的unix时间戳
      uint id;           //被留言的帖子的id
  }

  //帖子的结构体
  struct Post {
    string title;        //帖子的标题
    string content;      //帖子的内容
    address from;        //发帖人
    string timestamp;    //帖子的unix时间戳
    uint id;             //帖子的ID
    mapping(uint => Message) words; //帖子的留言
    uint wordsSize;      //留言的数量
  }

  Post[] private posts;   //存储所有的帖子

  //发送一个帖子
  function setPost(string t,string c,string time)public{
    posts.push(Post({
      title: t,
      content: c,
      from: msg.sender,
      timestamp: time,
      id: posts.length+1,
      wordsSize: 0
    }));
  }

  //得到所有的帖子的数量
  function getAllPostsNumber() public view returns (uint){
    return posts.length;
  }

  //根据序号得到一个帖子
  function getPostBySeq(uint number) public view returns (uint,string,string,address,string){
    if(posts.length == 0){
      return(0,"","",msg.sender,"");
    }else{
      Post storage result = posts[number];
      return(posts.length,result.title,result.content,result.from,result.timestamp);
    }
  }

  //发送一条留言
  function setWord(uint number,string w,string t) public{
    Post storage p = posts[number];
    p.words[p.wordsSize] = Message({
      word: w,
      from: msg.sender,
      timestamp: t,
      id: number
    });
     
    p.wordsSize++;
  }
  
  //得到一个帖子中留言的数量
  function getAllWordsNumber(uint number) public view returns (uint){
    return posts[number].wordsSize;
  }

  //得到一个帖子的一条留言
  function getAllWords(uint number,uint index) public view returns (uint,string,address,string){
    if(posts[number].wordsSize == 0){
      return(0,"",msg.sender,"");
    }else{
      Post storage result = posts[number];
      return (result.wordsSize, result.words[index].word, result.words[index].from, result.words[index].timestamp);
    }
  }
}
