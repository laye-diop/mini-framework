import { Component } from "./component.js";

export class Todo extends Component {
    constructor() {
        super()
        this.proxyUser.data = []
    }
    
    render() {
        return this.parse(`
        
        for (let [index ,item] of data.entries()) { ##    
                <li class="">
                    ## if (!item.editing) { ##
                        <div class="view">
                            <input  class="toggle" type="checkbox" />
                            <label id="todo_{= index =}" on:dblclick={startEdit}>{= item.value  =}</label>
                            <button on:click={removeItem} class="destroy" />
                        </div>
                    ##} else { ##
                        <div class="input-container">
                            <input id="todo_input_{= index =}" value={= item.value =} id="edit-todo-input" class="edit" autofocus />
                            <label class="visually-hidden" for="edit-todo-input">Edit Todo Input</label>
                        </div>
                    ## } ##
                </li>
        ## } 
        ` , this.proxyUser.data)
    }
    
    events() {
        this.addEvent("he" , "click" , ()=> {console.log("NEW CLICK HEEE")})

        this.proxyUser.data.forEach((element , index) => {
            this.addEvent("todo_" + index  , "dblclick" , ()=> {
                this.proxyUser.data[index].editing = true
                this.proxyUser.data = this.proxyUser.data

            })
            this.addEvent("todo_input_" + index , "blur" , ()=> {
                this.proxyUser.data[index].editing = false
                this.proxyUser.data[index].value = this.getElement("todo_input_" + index).value
                this.proxyUser.data = this.proxyUser.data
            })
            
        });
    }

    staticEvent() {
        this.addEvent("inp" , "keydown" , (ev)=> {
            if (ev.key == 'Enter' ) {
                let value = document.getElementById("inp").value
                let todo = { value : value , checked : "" , editing : false}
                this.proxyUser.data = [...this.proxyUser.data , todo]
                console.log("NEW PUSH" , ev)
            }
        })
    }
}