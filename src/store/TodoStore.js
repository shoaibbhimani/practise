import { computed, observable, action } from 'mobx'


class Todo {
	@observable id = Math.random();
	@observable completed = false;
	@observable text = null;
	constructor(text){
		this.text = text;
	}

	@action changeCompletedField(){
		this.completed = !this.completed;
	}

}


class TodoStore {
	@observable todos = [];

	@computed get todoLength(){
		return this.todos.length
	}

	@action addTodo(newTodo){
		let todos = this.todos;
		this.todos = todos.concat([new Todo(newTodo)]);
	}

	
}

export default new TodoStore()