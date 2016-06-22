// React-router 路由引入
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var Link = ReactRouter.Link; 
var IndexRoute = ReactRouter.IndexRoute;

// 留言展示列表 Li
var List = React.createClass({
    
    del: function(e) {
        e.preventDefault();
        var self = this;
        if(confirm('确定删除?')) {
            e.preventDefault();
            ajax({
                url: 'https://api.leancloud.cn/1.1/classes/CommentList/' + this.props.data.objectId,
                method: 'delete',
                headers: {
                    'X-LC-Id': 'lhdmT7dDvREA6fpxF7IU6tCL-gzGzoHsz',
                    'X-LC-Key': 'R7T6PUVPj06wGwJaWWE0lqzS',
                    'Content-Type': 'application/json'
                 },
                success: function() {
                    alert('删除成功');
                    // 获取删除后的最新数据
                    ajax({
                        url:'https://api.leancloud.cn/1.1/classes/CommentList',
                        method: 'get',
                        headers: {
                            'X-LC-Id': 'lhdmT7dDvREA6fpxF7IU6tCL-gzGzoHsz',
                            'X-LC-Key': 'R7T6PUVPj06wGwJaWWE0lqzS',
                            'Content-Type': 'application/json'
                         },
                        data: 'order=-createdAt',
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
                <div className="comment-data">
                    <h3 className="user">留言人：</h3>
                    <h3 className="datas">{this.props.data.name}</h3>
                </div>
                <div className="comment-data">
                    <p className="comment">留言内容：</p>
                    <p className="datas">{this.props.data.content}</p>
                </div>
                <div className="comment-data">
                    <p className='time'>留言时间： {this.props.data.time}</p>
                    <p className='del'><a href='javascript:;' onClick={this.del}>删除</a></p>
                </div>
            </li>
        );
    }
});


// 留言展示部分
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
            url:'https://api.leancloud.cn/1.1/classes/CommentList',
            method: 'get',
            headers: {
                'X-LC-Id': 'lhdmT7dDvREA6fpxF7IU6tCL-gzGzoHsz',
                'X-LC-Key': 'R7T6PUVPj06wGwJaWWE0lqzS',
                'Content-Type': 'application/json'
             },
            data: 'order=-createdAt',
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

// 留言添加部分
var CommentUpload = React.createClass({
    getInitialState: function() {
        return {"name" : "", "content" : ""};
    },

    handleNameChange: function(event) {
        this.setState({"name" : event.target.value});
    },

    handleContentChange: function(event) {
        this.setState({"content" : event.target.value});
    },

    handleOnSubmit: function() {
        
        // 检验提交留言内容是否为空 
        if(this.state.name === '' || this.state.content === '') {
            alert('请输入完整后再提交');
            return;
        }

        var date = new Date();
        var Y = date.getFullYear(),
            M = date.getMonth() + 1,
            D = date.getDate();
        M = M > 9 ? M : '0' + M;
        var h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
         m = m < 10 ? '0' + m : m;
         s = s < 10 ? '0' + s : s;

        var time = (Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s);
        this.setState({"time" : time});
        
        ajax({
            url: 'https://leancloud.cn:443/1.1/classes/CommentList',
            method: 'post',
            headers: {
                'X-LC-Id': 'lhdmT7dDvREA6fpxF7IU6tCL-gzGzoHsz',
                'X-LC-Key': 'R7T6PUVPj06wGwJaWWE0lqzS',
                'Content-Type': 'application/json'
            },
            data: this.state,
            success: function(data) {
                alert('提交成功');
                this.setState({"name": ''});
                this.setState({"content": ''});
                this.setState({"time": ''});
            }.bind(this),
        });
    },

    render: function() {
        var nameValue = this.state.name;
        var contentValue = this.state.content;
        return (
            <div className='comment-upload'>
                    <label htmlFor='username'>name: <input type='text' value={nameValue} onChange={this.handleNameChange} className='username' name='name' /></label>
                    <label htmlFor='content'>words: <textarea onChange={this.handleContentChange} className='content' value={contentValue}></textarea></label>
                    <input type='button' value='提交评论' className='submit' onClick={this.handleOnSubmit} />
            </div>
        );
    }
});

// 首页内容
var Home = React.createClass({
    render: function() {
        return (
            <div className="comment-home">
                这是React测试页面，点击上方按钮使用留言板功能。任何用户可以添加、删除留言内容。
            </div>
        );
    }
});

// 首页部分
var App = React.createClass({
    render: function() {
        return (
            <div className='comment-container'>
                <header className='header'>
                    <h2 className='title'>Welcome to my lyb.</h2>
                    <ul className='tab-comment'>
                        <li><Link to="/commentupload" activeClassName="active">添加留言</Link></li>
                        <li><Link to="/commentlist" activeClassName="active">查看留言</Link></li>
                    </ul>
                </header>
                {this.props.children}
            </div>
        );
    }
});


ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="/commentupload" component={CommentUpload} />
                <Route path="/commentlist" component={CommentList} />
            </Route>
        </Router>
    ),
    document.getElementById("container")
);




