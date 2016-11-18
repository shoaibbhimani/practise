import React,{ Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('editTodo','googleKeepStore') @observer class EditTodo extends Component {
    constructor(){
        super();
        this.changeTitle = this.changeTitle.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    formSubmit(e){
        e.preventDefault();
        const { googleKeepStore,editTodo  } = this.props;
        let temp = {};
        temp.todotitle = editTodo.todotitle;
        temp.todoItemList = Object.assign({},editTodo.todoItemList);
      googleKeepStore.changeContent({ "todotitle":temp.todotitle,"todoItem": temp.todoItemList });
        editTodo.reset();
        googleKeepStore.reset();
        this.refs.form.reset();
    }

    componentWillMount(){
        const { googleKeepStore, editTodo } = this.props;
        let editTableStore = {};
       (googleKeepStore.showEditTable) && (editTableStore = googleKeepStore.todos[googleKeepStore.editTableIndex]);
        var temp = googleKeepStore.todos[googleKeepStore.editTableIndex];
        editTableStore['todotitle'] = temp.todotitle;
        editTableStore['todoItem'] = Object.assign({},temp.todoItem);
        editTodo.setData(editTableStore);

    }

    componentWillUnmount(){
        this.cancelEdit();
   }
    cancelEdit(){
        const { editTodo } = this.props;
        editTodo.reset();
        this.refs.form.reset();
    }

    changeTitle(e){
        const { editTodo } = this.props;
        editTodo.changeTitle(e.target.value);
    }

    render(){
        const { editTodo } = this.props;
        return (
            <section>
                <div className="row">
                    <section className="col-md-4 col-md-offset-4">
                        <form ref="form" onSubmit={this.formSubmit}>
                            <label htmlFor="">
                                Title
                                <input ref="textArea"  defaultValue={editTodo.todotitle} onChange={this.changeTitle} />
                            </label>

                            <EditList  ref="todoList" />
                            <button type="submit">Submit</button>
                            <button type="submit" onClick={this.cancelEdit}>cancel</button>
                        </form>
                    </section>
                </div>
            </section>
        )


    }
}

@observer(['editTodo'])
class EditList extends Component {

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.renderTodoList = this.renderTodoList.bind(this);
    }

    onChange(e){
        const { editTodo } = this.props;
        let value = e.target.value;
        let key = e.target.getAttribute('data-itemKey');
        editTodo.addorChangeItem(key,value);
    }

    renderTodoList(){
        const { editTodo } = this.props;
        let todoList = [];
        for(var i = 0; i < editTodo.itemCount; i++ ){
            todoList.push( <input
                key={i}
                onChange={this.onChange}
                className="inputFields"
                onFocus={this.onFocus}
                defaultValue={editTodo.todoItemList[`todoItem${i}`]}
                data-lastItem={((editTodo.itemCount - 1) === i)}
                type="text"
                data-itemKey={`todoItem${i}`}
                ref={`todoItem${i}`} />  )
        }
        return todoList;
    }
    onFocus(e) {
        const { editTodo } = this.props;
        let isLast = e.target.getAttribute('data-lastItem');
         console.log("onFocus", isLast);
        if(isLast === 'true') {
            editTodo.onFocus(isLast)
        }
    }



    render(){
        return (
            <p>

                {this.renderTodoList()}
            </p>
        )
    }
}


export default EditTodo;