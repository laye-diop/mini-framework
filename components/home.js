// components/home.js
import { Component } from "./component.js";

export class HomeComponent extends Component {
    
    render() {
        return `
            <h1>Welcome to our SPA!</h1>
            <p id="he">This is the home page.</p>
            <input name="nom" id="inp" type="text">
            <button id="bt">Add Event</button>
            <div id="container"></div>
        `;
        
    }
    events() {
        this.addEvent("bt" , "click" , ()=> {

        })
        this.addEvent("he" , "click" , ()=> {console.log("NEW CLICK HEEE")})
    }
    

}