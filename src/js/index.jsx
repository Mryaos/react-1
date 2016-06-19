// React-router 路由引入
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var Link = ReactRouter.Link; 


// 评论展示列表 Li
var List = React.createClass({
	del: function(e) {
		if(confirm('确定删除?')) {
			e.preventDefault();
			ajax({
				url: 'https://leancloud.cn:443/1.1/classes/TestObject/' + this.props.data.objectId,
				method: 'delete',
				headers: {
					'X-LC-Id': 'GhjaurLvo8yP5FS5gDJsLHi1-gzGzoHsz',
					'X-LC-Key': 'LnP8wradUhj7Q53r8fabnKoS',
				 	'Content-Type': 'application/json'
				 },
				success: function(data) {
					alert('删除成功');
				}
			});
		}
		
	},

	render: function() {
		return (
			<li>
				<h2 className="user">{this.props.data.name}</h2>
				<p className="comment">{this.props.data.words}</p>
				<a href='javascript:;' onClick={this.del} className='del'>删除</a>
			</li>
		);
	}
});

// 评论展示部分
var CommentList = React.createClass({
	getInitialState: function() { 
		return {
			data: []
		};
	},

	componentDidMount: function() {
		// var _this = this;
		_this = this;
		function getData() {
			ajax({
				url:'https://api.leancloud.cn/1.1/classes/TestObject',
				method: 'get',
				headers: {
					'X-LC-Id': 'GhjaurLvo8yP5FS5gDJsLHi1-gzGzoHsz',
					'X-LC-Key': 'LnP8wradUhj7Q53r8fabnKoS',
				 	'Content-Type': 'application/json'
				 },
				success: function(data) {
					var data = JSON.parse(unescape(data.replace(/\\u/g, "%u")));
					_this.setState({data: data.results});
					
				}
			});
		}
		getData();

	},

	render: function() {
		return (
			<ul>
				{this.state.data.map(function(res){
					return <List data={res} />
				})}
			</ul>
		);
	}
});

// 评论添加部分
var CommentUpload = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var username = this.refs.username.getDOMNode().value;
		var content = this.refs.content.getDOMNode().value;
		var datas = {name: 'username', words: 'content'};

		ajax({
			url: 'https://leancloud.cn:443/1.1/classes/TestObject',
			method: 'post',
			headers: {
				'X-LC-Id': 'GhjaurLvo8yP5FS5gDJsLHi1-gzGzoHsz',
				'X-LC-Key': 'LnP8wradUhj7Q53r8fabnKoS',
			 	'Content-Type': 'application/json'
			},
			data: {name: 'username', words: 'content'},
			success: function(data) {
				console.log(data.objectId);
			},
		});
	},

	render: function() {
		return (
			<form action='/' enctype='application/json' method='post' onSubmit={this.handleSubmit}>
				<label htmlFor='username'>
					name: <input type='text' name='username' ref='username' />
				</label>
				<label htmlFor='content'>
					words: <input type='text' name='content' ref='content' />
				</label>
				<input type='submit' value='提交评论' class='submit' />
			</form>
		);
	}
});

// 首页部分
var App = React.createClass({
	render: function() {
		return (
			<div className='comment-container'>
				<h2>Welcome to my blog.</h2>
				<ul>
					<li><Link to="/commentupload" >添加评论</Link></li>
					<li><Link to="/commentlist" >查看评论</Link></li>
				</ul>
				{this.props.children}
			</div>
		);
	}
});

ReactDOM.render(
	(
		<Router history={hashHistory}>
			<Route path="/" component={App}>

				<Route path="/commentupload" component={CommentUpload} />
				<Route path="/commentlist" component={CommentList} />
			</Route>
		</Router>
	),
	document.getElementById("container")
);



