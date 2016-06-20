// React-router 路由引入
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var Link = ReactRouter.Link; 


// 评论展示列表 Li
var List = React.createClass({
	del: function(e) {
		e.preventDefault();
		var self = this;
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
				success: function() {
					alert('删除成功');
					// 获取删除后的最新数据
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
							self.props.dataChange(data.results);
						}
					});
				}
			});

		}
		
	},

	render: function() {
		return (
			<li>
				<h3 className="user">留言人：{this.props.data.name}</h3>
				<p className="comment">留言内容：{this.props.data.content}</p>
				<a href='javascript:;' onClick={this.del} className='del'>删除</a>
				<p className='time'>留言时间： {this.props.data.createdAt}</p>
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

	dataOnChange: function(datas) {
		this.setState({data : datas});
	},

	componentDidMount: function() {
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
				this.setState({data: data.results});
			}.bind(this)
		});
	},

	render: function() {
		var self = this;
		return (
			<div className='comment-show'>
				<ul>
					{this.state.data.map(function(res){
						return <List data={res} dataChange={self.dataOnChange} />
					})}
				</ul>
			</div>
		);
	}
});

// 评论添加部分
var CommentUpload = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var username = this.refs.username.getDOMNode().value;
		var content = this.refs.content.getDOMNode().value;

		ajax({
			url: 'https://leancloud.cn:443/1.1/classes/TestObject',
			method: 'post',
			headers: {
				'X-LC-Id': 'GhjaurLvo8yP5FS5gDJsLHi1-gzGzoHsz',
				'X-LC-Key': 'LnP8wradUhj7Q53r8fabnKoS',
			 	'Content-Type': 'application/json'
			},
			data: {"name" : username, "content" : content},
			success: function(data) {
				alert('提交成功');
			},
		});
	},

	render: function() {
		return (
			<div className='comment-upload'>
				<form action='/' enctype="application/json" method='post' onSubmit={this.handleSubmit}>
					<label htmlFor='username'>
						name: <input type='text' name='username' ref='username' />
					</label>
					<label htmlFor='content'>
						words: <input type='text' name='content' ref='content' />
					</label>
					<input type='submit' value='提交评论' class='submit' />
				</form>
			</div>
		);
	}
});

// 首页部分
var App = React.createClass({
	render: function() {
		return (
			<div className='comment-container'>
				<h2 className='title'>Welcome to my lyb.</h2>
				<ul className='tab-comment'>
					<li><Link to="/commentupload" activeClassName="active">添加评论</Link></li>
					<li><Link to="/commentlist" activeClassName="active">查看评论</Link></li>
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



