import { computed, observable, action } from 'mobx';


class TodoList {
	@observable title = '';
	@observable todoItem = {}
	constructor(title, todoItem) {
		this.title = title;
		this.todoItem = todoItem;
	}
}

class TodoListTable {
	@observable todos = [];
	@observable showEditTable = false;
	@observable editTableIndex = 0;

	@action addTodo(title, todoItem){
		let todos = this.todos;
		this.todos = todos.concat([new TodoList(title, todoItem)]);
	}
}


export default new TodoListTable(); 