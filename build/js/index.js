var Router=ReactRouter.Router,Route=ReactRouter.Route,hashHistory=ReactRouter.hashHistory,Link=ReactRouter.Link,IndexRoute=ReactRouter.IndexRoute,List=React.createClass({displayName:"List",del:function(a){a.preventDefault();var b=this;confirm("确定删除?")&&(a.preventDefault(),ajax({url:"https://api.leancloud.cn/1.1/classes/CommentList/"+this.props.data.objectId,method:"delete",headers:{"X-LC-Id":"lhdmT7dDvREA6fpxF7IU6tCL-gzGzoHsz","X-LC-Key":"R7T6PUVPj06wGwJaWWE0lqzS","Content-Type":"application/json"},success:function(){alert("删除成功"),ajax({url:"https://api.leancloud.cn/1.1/classes/CommentList",method:"get",headers:{"X-LC-Id":"lhdmT7dDvREA6fpxF7IU6tCL-gzGzoHsz","X-LC-Key":"R7T6PUVPj06wGwJaWWE0lqzS","Content-Type":"application/json"},data:"order=-createdAt",success:function(a){var a=JSON.parse(unescape(a.replace(/\\u/g,"%u")));b.props.dataChange(a.results)}})}}))},render:function(){return React.createElement("li",null,React.createElement("div",{className:"comment-data"},React.createElement("h3",{className:"user"},"留言人："),React.createElement("h3",{className:"datas"},this.props.data.name)),React.createElement("div",{className:"comment-data"},React.createElement("p",{className:"comment"},"留言内容："),React.createElement("p",{className:"datas"},this.props.data.content)),React.createElement("div",{className:"comment-data"},React.createElement("p",{className:"time"},"留言时间： ",this.props.data.time),React.createElement("p",{className:"del"},React.createElement("a",{href:"javascript:;",onClick:this.del},"删除"))))}}),CommentList=React.createClass({displayName:"CommentList",getInitialState:function(){return{data:[]}},dataOnChange:function(a){this.setState({data:a})},componentDidMount:function(){ajax({url:"https://api.leancloud.cn/1.1/classes/CommentList",method:"get",headers:{"X-LC-Id":"lhdmT7dDvREA6fpxF7IU6tCL-gzGzoHsz","X-LC-Key":"R7T6PUVPj06wGwJaWWE0lqzS","Content-Type":"application/json"},data:"order=-createdAt",success:function(a){var a=JSON.parse(unescape(a.replace(/\\u/g,"%u")));this.setState({data:a.results})}.bind(this)})},render:function(){var a=this;return React.createElement("div",{className:"comment-show"},React.createElement("ul",null,this.state.data.map(function(b){return React.createElement(List,{data:b,dataChange:a.dataOnChange})})))}}),CommentUpload=React.createClass({displayName:"CommentUpload",getInitialState:function(){return{name:"",content:""}},handleNameChange:function(a){this.setState({name:a.target.value})},handleContentChange:function(a){this.setState({content:a.target.value})},handleOnSubmit:function(){if(""===this.state.name||""===this.state.content)return void alert("请输入完整后再提交");var a=new Date,b=a.getFullYear(),c=a.getMonth()+1,d=a.getDate();c=c>9?c:"0"+c;var e=a.getHours(),f=a.getMinutes(),g=a.getSeconds();f=f<10?"0"+f:f,g=g<10?"0"+g:g;var h=b+"-"+c+"-"+d+" "+e+":"+f+":"+g;ajax({url:"https://leancloud.cn:443/1.1/classes/CommentList",method:"post",headers:{"X-LC-Id":"lhdmT7dDvREA6fpxF7IU6tCL-gzGzoHsz","X-LC-Key":"R7T6PUVPj06wGwJaWWE0lqzS","Content-Type":"application/json"},data:{name:this.state.name,content:this.state.content,time:h},success:function(a){alert("提交成功"),this.setState({name:"",content:""})}.bind(this)})},render:function(){return React.createElement("div",{className:"comment-upload"},React.createElement("label",null,"name: ",React.createElement("input",{type:"text",value:this.state.name,onChange:this.handleNameChange,className:"username"})),React.createElement("label",null,"words: ",React.createElement("textarea",{onChange:this.handleContentChange,className:"content",value:this.state.content})),React.createElement("input",{type:"button",value:"提交评论",className:"submit",onClick:this.handleOnSubmit}))}}),Home=React.createClass({displayName:"Home",render:function(){return React.createElement("div",{className:"comment-home"},"这是React测试页面，点击上方按钮使用留言板功能。任何用户可以添加、删除留言内容。")}}),App=React.createClass({displayName:"App",render:function(){return React.createElement("div",{className:"comment-container"},React.createElement("header",{className:"header"},React.createElement("h2",{className:"title"},"Welcome to my lyb."),React.createElement("ul",{className:"tab-comment"},React.createElement("li",null,React.createElement(Link,{to:"/commentupload",activeClassName:"active"},"添加留言")),React.createElement("li",null,React.createElement(Link,{to:"/commentlist",activeClassName:"active"},"查看留言")))),this.props.children)}});ReactDOM.render(React.createElement(Router,{history:hashHistory},React.createElement(Route,{path:"/",component:App},React.createElement(IndexRoute,{component:Home}),React.createElement(Route,{path:"/commentupload",component:CommentUpload}),React.createElement(Route,{path:"/commentlist",component:CommentList}))),document.getElementById("container"));