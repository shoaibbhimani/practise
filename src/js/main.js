import React,{ Component } from "react"
import ReactDOM from "react-dom"
import { observer, Provider } from 'mobx-react';

import '../css/main.css'

/*Stores*/
import googleKeepStore from '../store/googlekeepstore';
import addTodo from '../store/AddTodo';
import editTodo from '../store/editTodo';

//For Debugging
import DevTools from 'mobx-react-devtools';

// Custom Components
import EditTodos from './editTodos';

@observer(['googleKeepStore','addTodo'])
class AddTodo extends Component {
	constructor(){
		super()
		this.formSubmit = this.formSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	formSubmit(e){
		e.preventDefault();
		// Assing New Todoitems to KeepStore
        googleKeepStore.addTodo(addTodo.todotitle,addTodo.todoItemList);

        // Reset AddTodo Store By @action
        addTodo.clearItems();
        addTodo.clearTitle();

        //Clearing the Form
        this.refs.form.reset();

	}

    onChange(e){
        addTodo.changeTitle(e.target.value);
    }



	render(){
		const { addTodo, googleKeepStore } = this.props;
		
		
		return (
			<section>

				<div className="row">
				        <section className="col-md-4 col-md-offset-4">
				            <form ref="form" onSubmit={this.formSubmit}>
				              <textarea ref="textArea" onChange={this.onChange}></textarea>
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

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    onChange(e){
        addTodo.addorChangeItem(e.target.getAttribute('data-itemKey'), e.target.value);
    }

    onFocus(e) {

        let isLast = e.target.getAttribute('data-lastItem');
        if(isLast === 'true') {
            addTodo.onFocus(isLast)
        }
    }

	render(){
		const { addTodo} = this.props;
		let todoList = [];
		for(var i = 0; i < addTodo.itemCount; i++ ){
			todoList.push( <input 
								key={i} 
								onChange={this.onChange}
                                onFocus={this.onFocus}
								data-lastItem={((addTodo.itemCount - 1) === i) }
                                type="text"
                                data-itemKey={`todoItem${i}`}
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
    constructor(){
        super();
        this.editTodo = this.editTodo.bind(this);
    }

    editTodo(index){
        const  { googleKeepStore } = this.props;
        googleKeepStore.enableEditTodos(index);
    }

	render(){
		return (
			<section className="card-deck-wrapper">
                <h2>Double Click on Card to Edit it </h2>
			          <section className="card-deck">
                          { JSON.stringify( googleKeepStore.todos, null, 4 ) }
			            { googleKeepStore.todos.map( (todo, index) => <List editTodo={this.editTodo} details={todo} key={index} index={index} /> )}
			          </section>
			</section>
			
		)
	}
}


const List = observer( ({ details, editTodo, index }) => {
	const renderTodoContent = () => {
		return Object.keys(details.todoItem).map( (item,index) => {
		      return (
		        <li key={index} className="list-group-item">
                    {details.todoItem[item]}
		        </li>
		      )
		})
	}

	return (
	 	<div className="card" onDoubleClick={ () => editTodo(index) }>
	     <div className="card-block">
	        <h4 className="card-title"> { details.todotitle } </h4>
	      </div>
	      <ul className="list-group list-group-flush" >
              {renderTodoContent()}
	      </ul>
		 </div>	
		)
	});




var store = {
	googleKeepStore,
	addTodo,
    editTodo
};

const Todo = observer(['googleKeepStore'] ,({ children , googleKeepStore}) => (
        <section>
                { googleKeepStore.showEditTable ? <EditTodos /> : <AddTodo /> }
        </section>

));

const app = document.getElementById("app");

ReactDOM.render( <Provider
                    {...store}>
						<section>
                            <DevTools />
                            <Todo />
                            <ListTodo />
						</section>
				</Provider>, app)