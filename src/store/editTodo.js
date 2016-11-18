import { computed, observable, action } from 'mobx'

class EditTodo {
    @observable itemCount = 1;
    @observable todoItemList = {};
    @observable todotitle = '';

    @action onFocus(isLast){
        if(isLast){
            this.itemCount++;
        }
    }

    @action setData(content){
        if(content) {
           this.todotitle = content.todotitle;
           this.todoItemList = Object.assign({},this.todoItemList, content.todoItem);
           this.itemCount = Object.keys(this.todoItemList).length;
        }

    };


    @action addorChangeItem(key, value) {
        this.todoItemList[key] = value;
    }

    @action changeTitle(value) {
        this.todotitle = value;
    }

    @action reset(){
        this.todoItemList = {};
        this.itemCount = 1;
        this.todotitle = '';
    }
}

export default new EditTodo();