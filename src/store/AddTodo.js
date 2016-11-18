import { computed, observable, action } from 'mobx'

class AddTodo {
	@observable itemCount = 1;
	@observable todoItemList = {};
	@observable todotitle = '';
	@action onFocus(isLast){
		if(isLast){
			this.itemCount++;			
		}
	}
	@action addorChangeItem(key, value) {
        this.todoItemList[key] = value;
    }

    @action clearItems(){
        this.todoItemList = {};
        this.itemCount = 1;
    }

    @action clearTitle(){
        this.todotitle = '';
    }


    @action changeTitle(value) {
        this.todotitle = value;
    }
}


export default new AddTodo();