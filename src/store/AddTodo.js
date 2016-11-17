import { computed, observable, action } from 'mobx'

class AddTodo {
	@observable itemCount = 1;
	@action onFocus(isLast){
		if(isLast){
			this.itemCount++;			
		}
	} 
}


export default new AddTodo();