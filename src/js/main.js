import React,{ Component } from "react"
import ReactDOM from "react-dom"

import googleKeepStore from '../store/googlekeepstore';
import addTodo from '../store/AddTodo';
import DevTools from 'mobx-react-devtools';
import { observer, Provider } from 'mobx-react';

import shortid from 'shortid';

const app = document.getElementById("app")

@observer(['googleKeepStore','addTodo'])
class AddTodo extends Component {
	constructor(){
		super()
		this.formSubmit = this.formSubmit.bind(this);
		this.onFocus = this.onFocus.bind(this);
	}

	formSubmit(e){
		e.preventDefault();
		var newPost = {
			"title": this.refs.textArea.value,
			"todoItem":{}
		};

		for(var i = 0; i < addTodo.itemCount; i++ ){
		    var content = this.refs.todoList.refs['todoItem'+i];
		    console.log(content)
		   // (content.value) && (newPost.todoItem['todoItem'+i] = content.value);
		}

		console.log(newPost);


		googleKeepStore.addTodo(newPost);
	}

	onFocus(e){
		var isLast = e.target.getAttribute('data-lastItem');
		if(isLast === 'true') {
			addTodo.onFocus(isLast)
		}
	}

	render(){
		const { addTodo, googleKeepStore } = this.props;
		
		
		return (
			<section>
				<DevTools />
				<div className="row">
				        <section className="col-md-4 col-md-offset-4">
				            <form ref="form" onSubmit={this.formSubmit}>
				              <textarea ref="textArea"></textarea>
				               <AddList ref="todoList" onFocus={this.onFocus}/>
				              <button type="submit">Submit</button>
				            </form>
				        </section>
				</div>
			</section>	
		)
	}
}

@observer(['addTodo'])
class AddList extends Component {
	render(){
		const { addTodo, onFocus } = this.props;
		let todoList = [];
		for(var i = 0; i < addTodo.itemCount; i++ ){
			todoList.push( <input 
								key={i} 
								onFocus={onFocus} 
								data-lastItem={((addTodo.itemCount - 1) === i) } 
								type="text" 
								ref={`todoItem${i}`} />  ) 
		}

		return (
			<p>
				{todoList}
			</p>
		)
	}
}

@observer(['googleKeepStore'])
class ListTodo extends React.Component {
	render(){
		return (
			<section className="card-deck-wrapper">
			          <section className="card-deck">
			            { googleKeepStore.todos.map( (todo,index) => <List details={todo} key={index} /> )}
			          </section>
			</section>
			
		)
	}
}


const List = observer( ({ details }) => {
	const renderTodoContent = () => {
		return Object.keys(details.todoItem).map( (item,index) => {
		      return (
		        <li key={index} className="list-group-item">
		          {todoItem[item]}
		        </li>
		      )
		})
	}

	return (
	 	<div className="card">
	     <div className="card-block">
	        <h4 className="card-title"></h4>
	      </div>
	      <ul className="list-group list-group-flush" >
	       asdasdasdasd
	      </ul>
		 </div>	
		)
	});

var store = {
	googleKeepStore,
	addTodo
};

ReactDOM.render( <Provider {...store}> 
						<section> 
						  <AddTodo /> 
						  <ListTodo /> 
						</section>
				</Provider>, app)