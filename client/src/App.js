import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";
import {Pagination,Button, ButtonToolbar}  from 'rsuite';
import { Alert,Drawer,Form, FormGroup, FormControl, ControlLabel } from 'rsuite';
import 'rsuite/dist/styles/rsuite.min.css';
import "./App.css";
import ListItem from './ListItem';

//const contractAddress = "0x635141f7fcd80c47ce38644a7c3142a211d2a4ef" // 合约地址(私链以太坊测试)

class App extends Component {
		constructor(props) {
			super(props);
			this.state = {
				web3: null, 
				accounts: null, 
				contract: null,
				activePage: 1,
				list: [],
				perpage:3,
				pages:5,
				showlist:[],
				show: false,
				title: null,
				content: null,
			};
			this.handleSelect = this.handleSelect.bind(this);
			this.close = this.close.bind(this);
			this.toggleDrawer = this.toggleDrawer.bind(this);
			this.sendContent = this.sendContent.bind(this);
			this.inputTitle = this.inputTitle.bind(this);
			this.inputContent = this.inputContent.bind(this);
		}
	close() {
		this.setState({
			show: false
		});
	}
	toggleDrawer(placement) {
		this.setState({
			placement,
			show: true,
			title: null,
			content: null
		});
	}
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const Contract = truffleContract(SimpleStorageContract);
      Contract.setProvider(web3.currentProvider);
			
			// 以太坊测试环境
			// const instance = await Contract.at(contractAddress);
			
			// 部署本地
      const instance = await Contract.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
	  this.setState({activePage: 1});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
		
  };
  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
	//改变showlist
	this.state.showlist = [];
	var list = [];
	for(var i=0;i<this.state.list.length;i++){
		//console.log("i / this.state.perpage:" + (i/this.state.perpage));
		if((parseInt)(i / this.state.perpage) === eventKey - 1){
			list.push(this.state.list[i]);
			this.setState({
				showlist: list
			});
		}
	}
  }
  runExample(){
    const { accounts, contract } = this.state;

    var idIndex = 0;
	contract.getAllPostsNumber()
	.then(result => {
		//console.log(result.words[0]);
		//获取一个帖子中的信息
		for(var i=0;i < result.words[0]; i++){
				contract.getPostBySeq(i).then(result => {
				//console.log(result);					
				var _list = [];
				var _id = result[0].words[0];
				var _title = result[1];
				var _details = result[2];
				var _time = result[4];
				//console.log(_time);
				this.state.contract.getAllWordsNumber(_id)
				.then(result => {
					for(var j=0;j < result.words[0]; j++){
						this.state.contract.getAllWords(_id,j).then(result => {
							_list.push(result[1]);
						})
						.then(result => {
							//异步保持更新
							this.handleSelect(1);
						})
					}
				})
				.then(result => {
					//console.log(_list);
					//将帖子加入列表
					var post = {id:_id,title:_title,details:_details,index:idIndex,message:_list,time:_time};
					const {list} = this.state;
					list.push(post);
					this.setState({list:list});
					//展示第一页
					if((parseInt)(idIndex / this.state.perpage) === this.state.activePage - 1){
						const {showlist} = this.state;
						this.state.showlist.push(post);
						this.setState({showlist:showlist});
					}
					idIndex++;
					if(idIndex % this.state.perpage === 0){
						this.setState({
							pages: idIndex / this.state.perpage
						});
					}else{
						this.setState({
							pages: idIndex / this.state.perpage + 1
						});
					}
				})
			})
		}
	})

  };
	
  render() {
		
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
		
    return (
      <div className="App">
				<p id="title">Free Talk</p>
				<div className="mainbody">
					<div className="content">
						<h2>帖子列表</h2>

						{ this.state.showlist.map ((item, index) =>
									<ListItem item={item} key={index} web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract}/>
						)}
						<div id="pagination">
							<Pagination
								prev
								last
								next
								first
								size="md"
								pages={this.state.pages}
								activePage={this.state.activePage}
								onSelect={this.handleSelect}
							/>
						</div>
					</div>
					<div  className="sendarea">
						<ButtonToolbar>
							<Button onClick={this.toggleDrawer} color="cyan" appearance="default" block>按下<b>发帖</b>即送屠龙宝刀</Button>
						</ButtonToolbar>
						<Drawer full show={this.state.show} onHide={this.close} placement='bottom'>
						<Drawer.Header>
							<Drawer.Title>发帖区</Drawer.Title>
						</Drawer.Header>
						<Drawer.Body>
							<Form fluid>
								<FormGroup>
									<ControlLabel>帖子标题</ControlLabel>
									<FormControl name="name" value={this.state.title} onChange={this.inputTitle}/>
								</FormGroup>
								<FormGroup>
									<ControlLabel>帖子内容</ControlLabel>
									<FormControl rows={10} name="textarea" componentClass="textarea"  value={this.state.content} onChange={this.inputContent}/>
								</FormGroup>
							</Form>
						</Drawer.Body>
						<Drawer.Footer>
							<Button onClick={this.sendContent} appearance="primary">
							Confirm
							</Button>
							<Button onClick={this.close} appearance="subtle">
							Cancel
							</Button>
						</Drawer.Footer>
						</Drawer>
					</div>
				</div>
      </div>
    );
  }
	sendContent() {
		//写入一个帖子
		let timestamp = new Date().getTime();
		this.state.contract.setPost(this.state.title,this.state.content,String(timestamp),{from:this.state.accounts[0]})
		.then(result => {
				
				this.setState({
					show: false
				});
				window.location.reload();
		})
		.catch(e => {
			//交易失败
			Alert.error('发送失败,标题和内容不能为空或重新刷新');
		})
	}
	inputTitle = (event) =>{
		this.setState({
			title: event
		})
	}
	inputContent = (event) =>{
		this.setState({
			content: event
		})
	}
}

export default App;
