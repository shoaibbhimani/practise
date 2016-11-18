import { computed, observable, action } from 'mobx';


class TodoList {
	@observable todotitle = '';
	@observable todoItem = {};
	constructor(title = 'Default Title', todoItem) {
		this.todotitle = title;
		this.todoItem = Object.assign({},this.todoItem, todoItem);
	};
}

class TodoListTable {
	@observable todos = [];
	@observable showEditTable = false;
	@observable editTableIndex = 0;

	@action addTodo = (todotitle, todoItem) => {
		let todos = this.todos;
		this.todos = todos.concat([new TodoList(todotitle, todoItem)]);
	};

	@action enableEditTodos(index){
		this.editTableIndex = index;
		this.showEditTable = true;
	};

	@action changeContent(newContent){
	    console.log(newContent);
	    console.log(this.editTableIndex);
	    console.log( this.todos[this.editTableIndex]);
        this.todos[this.editTableIndex] = new TodoList(newContent.todotitle, newContent.todoItem);
    };

	@action reset(){
        this.showEditTable = false;
        this.editTableIndex = 0;
    }
}


export default new TodoListTable(); 