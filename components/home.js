// components/home.js
import { Component } from "./component.js";
export class HomeComponent extends Component {
    constructor() {
        super()
        // console.log("PROXy" , this.proxyUser.id = 9)
        this.proxyUser.data = []
    }
    
    render() {
        console.log("proxy" , this.proxyUser.data)
        return this.parse( `
            <h1>Welcome !</h1>
            <p id="he">This is the home page.</p>
            <input name="nom" id="inp" type="text">
            <button id="bt">Add Event</button>
            <ul>
                ## for (let episodeName of data) { ##
                    <li>{= episodeName  =} </li>
                ## } ##
            </ul>
           
            <div id="container"></div>
        `
        , this.proxyUser.data);
        
    }
    events() {
        this.addEvent("bt" , "click" , (ev)=> {
            let value = document.getElementById("inp").value
            this.proxyUser.data = [...this.proxyUser.data , value]
            console.log("NEW PUSH" , ev)
           
        })
        this.addEvent("he" , "click" , ()=> {console.log("NEW CLICK HEEE")})
    }
    

}
