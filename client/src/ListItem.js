import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'rsuite';
import 'rsuite/dist/styles/rsuite.min.css';
import { Alert,Drawer,Form, FormGroup, FormControl, ControlLabel } from 'rsuite';

class ListItem extends Component {
    constructor (props) {
        super(props);
		this.state = {
			messagelist:[],
			web3:props.web3,
			accounts: props.accounts, 
			contract: props.contract,
			backdrop: true,
			show: false,
			word: null,
			start:false
		};
		this.close = this.close.bind(this);
		this.toggleDrawer = this.toggleDrawer.bind(this);
		this.inputWord = this.inputWord.bind(this);
		this.sendWord = this.sendWord.bind(this);
		this.myCanvas=React.createRef();

    } 
	componentWillReceiveProps(nextProps) {
		const item = nextProps.item;
		this.setState({web3:nextProps.web3,accounts:nextProps.accounts,contract:nextProps.contract,id:item.id,messagelist:item.message});
		//console.log(item.message);
		
		let _this=this;
		const{start}=this.state;
		//防止之前的计时器叠加
		if(start === true){
			clearInterval(_this.timer);

			 this.setState({
				start: false
			 });
		}

		let canvas = this.myCanvas.current;
		let ctx = canvas.getContext("2d");
		ctx.font = "16px Courier New";
		let width=canvas.width;
		//获取颜色
		let colorArr=_this.getColor();
		//获取初始的位置
		let numArrL=_this.getLeft();
		//获取初始的位置
		let numArrT=_this.getTop();
		// 获取速度
		let speedArr=_this.getSpeed();
		
		_this.timer=setInterval(function(){
			ctx.clearRect(0,0,canvas.width,canvas.height);
			ctx.save();
			
			for(let j=0;j<item.message.length;j++){
				if(isNaN(numArrL[j])){
					numArrL[j] = width;
				}
				if(isNaN(numArrT[j])){
					let tagHeight=Math.random()*canvas.height;
					if(tagHeight<0.2*canvas.height){
					tagHeight =  0.2*canvas.height
					}
					if(tagHeight>0.8*canvas.height){
					tagHeight =  0.8*canvas.height
					}
					numArrT[j] = tagHeight;
				}
				if(isNaN(speedArr[j])){
					speedArr[j] = parseInt(Math.random()*2+1);
				}
				//每次调用更改位置
			  numArrL[j]-=speedArr[j];
			  ctx.fillStyle = colorArr[j]
			  ctx.fillText(item.message[j],numArrL[j],numArrT[j]);
			  if(numArrL[j]<=-width){
					numArrL[j]=canvas.width;
			  }
			}
			ctx.restore();
		 },20);
		 
		 this.setState({
			start: true
		 });
	}
	componentDidMount = async () => {
		const item = this.props.item;
		this.setState({web3:this.props.web3,accounts:this.props.accounts,contract:this.props.contract,id:item.id,messagelist:item.message});
		//console.log(item.message);
		
		let _this=this;
		const{start}=this.state;
		//如果计时器开启需要先关闭
		if(start === true){
			clearInterval(_this.timer);
			 this.setState({
				start: false
			 });
		}

		let canvas=this.myCanvas.current;
		let ctx=canvas.getContext("2d");
		ctx.font = "16px Courier New";
		let width=canvas.width;
		// 获取弹幕颜色
		let colorArr=_this.getColor();
		// 获取初始的位置
		let numArrL=_this.getLeft();
		// 获取初始的位置
		let numArrT=_this.getTop();
		// 获取弹幕速度
		let speedArr=_this.getSpeed();
		
		_this.timer=setInterval(function(){
			ctx.clearRect(0,0,canvas.width,canvas.height);
			ctx.save();
			for(let j=0;j<item.message.length;j++){
				if(isNaN(numArrL[j])){
					numArrL[j] = width;
				}
				if(isNaN(numArrT[j])){
					let tagHeight=Math.random()*canvas.height;
					if(tagHeight<0.2*canvas.height){
					tagHeight =  0.2*canvas.height
					}
					if(tagHeight>0.8*canvas.height){
					tagHeight =  0.8*canvas.height
					}
					numArrT[j] = tagHeight;
				}
				if(isNaN(speedArr[j])){
					speedArr[j] = parseInt(Math.random()*2+1);
				}
				//每一次调用更新弹幕位置
			  numArrL[j]-=speedArr[j];
			  ctx.fillStyle = colorArr[j]
			  ctx.fillText(item.message[j],numArrL[j],numArrT[j]);
			  if(numArrL[j]<=-width){
					numArrL[j]=canvas.width;
			  }
			}
			ctx.restore();
		 },20);
			 
		 
		 this.setState({
			start: true
		 });
	}
	componentWillUnmount(){
		let _this=this;
		if(_this.state.start === true){
			clearInterval(_this.timer);
			this.setState({
				start: false
			});
		}
	}
	close() {
		this.setState({
		  show: false
		});
	}
	toggleDrawer() {
		this.setState({ show: true,word: null});
	}

	getTop(){
		//获取所有弹幕的位置
		let _this = this;
		let canvas = _this.myCanvas.current;
		let height = canvas.height;
		let len = _this.state.messagelist.length;
		let arr=new Array(len).fill(1);
		return arr.map(function(){
		  let tagHeight=Math.random()*height;
		  if(tagHeight<0.2*height){
			return 0.2*height
		  }
		  if(tagHeight>0.8*height){
			return 0.8*height
		  }
		  return tagHeight
		});
	  }
	getLeft(){
		//获取所有弹幕的位置
		let _this = this;
		let canvas = _this.myCanvas.current;
		let width = canvas.width;
		let len=_this.state.messagelist.length;
		return new Array(len).fill(width);
	  }
	getColor(){
		let len=this.state.messagelist.length;
		//给所有弹幕分配随机的颜色
		let arr=new Array(len).fill(1);
		return arr.map(function(){
		  return '#'+Math.floor(Math.random()*0xffffff+1).toString(16);
		});
	  }
	getSpeed(){
		let len=this.state.messagelist.length;
		//给所有弹幕分配随机的速度
		let arr=new Array(len).fill(1);
		return arr.map(function(){
		  return parseInt(Math.random()*2+1)
		})
	  }
    render () {

		const item = this.props.item;
		const { backdrop, show ,messagelist} = this.state;
		//console.log(messagelist);
        return (
		<div className="list">
			<div className="post">
				<p><b className="post-content">帖子标题: </b> {item.title}</p>
				<p><b className="post-content">帖子内容:</b><br/> {item.details}</p>
				<p><b className="post-content">发帖时间: </b>{this.formatTime(item.time)}</p>
			</div>
			<div className="buttonme">
				<ButtonToolbar  style={{marginTop: 50 + '%'}}>
					<Button onClick={this.toggleDrawer} color="cyan" appearance="default">点击留言</Button>
				</ButtonToolbar>
				<Drawer size='xs' backdrop={backdrop} show={show} onHide={this.close}>
				<Drawer.Header>
					<Drawer.Title>留言区</Drawer.Title>
				</Drawer.Header>
				<Drawer.Body>
					<Form>
						<FormGroup>
						<ControlLabel>请写下您对帖子的留言</ControlLabel>
							<FormControl rows={10} name="textarea" componentClass="textarea" value={this.state.word} onChange={this.inputWord}/>
						</FormGroup>
					</Form>
				</Drawer.Body>
				<Drawer.Footer>
					<Button onClick={this.sendWord} appearance="primary">
					Confirm
					</Button>
					<Button onClick={this.close} appearance="subtle">
					Cancel
					</Button>
				</Drawer.Footer>
				</Drawer>
			</div>
			<div className="message">
					<p><b className="post-content">精选留言:</b><br/>{this.selectBestMessage(messagelist)}</p>
					<div className="m-barrage">
						 <canvas className="m-barrage-canvas" ref={this.myCanvas}></canvas>
				   </div>
			</div>
		</div>
        );
    }
	inputWord = (event) =>{
		this.setState({
			word: event
		})
	}
	sendWord() {
		//写入一个留言
		let timestamp = new Date().getTime();
		//console.log(this.state.id);
		this.state.contract.setWord(this.state.id,this.state.word,String(timestamp),{from:this.state.accounts[0]})
		.then(result => {
				
				this.setState({
					show: false
				});
				window.location.reload();
		})
		.catch(e => {
			//交易失败
			Alert.error('发送失败,留言不能为空或重新刷新');
		})
	}
	selectBestMessage(messagelist){
		if(messagelist.length === 0){
			return '无';
		}else{
			var index = Math.floor(Math.random()*messagelist.length)
			return messagelist[index];
		}
	}
		// 时间戳转义
	formatTime(timestamp) {
			let date = new Date(Number(timestamp))
			let year = date.getFullYear()
			let month = date.getMonth() + 1
			let day = date.getDate()
			let hour = date.getHours()
			let minute = date.getMinutes()
			let second = date.getSeconds()
			let fDate = [year, month, day, ].map(this.formatNumber)
			return ' '+fDate[0] + '年' + fDate[1] + '月' + fDate[2] + '日' + ' ' + [hour, minute, second].map(this.formatNumber).join(':') 
	}
	/** 小于10的数字前面加0 */
	formatNumber(n) {
			n = n.toString()
			return n[1] ? n : '0' + n
	}
}

export default ListItem;