// components/home.js
import { Component } from "./component.js";

export class HomeComponent extends Component {
    constructor() {
        super()
        this.data = [
            "Encounter at Farpoint (part. 1)",
            "Encounter at Farpoint (part. 2)",
            "The Naked Now",
            "Code of Honor",
            "The Last Outpost",
            "Where No One Has Gone Before",
            "Lonely Among Us"]
    }
    
    render() {
        return this.parse( `
            <h1>Welcome !</h1>
            <p id="he">This is the home page.</p>
            ## for (let episodeName of data) { ##
                    <div class="episode-name"><span>{= episodeName =}</span></div>
            ## } ##
            <input name="nom" id="inp" type="text">
            <button id="bt">Add Event</button>
            <div id="container"></div>
        `
        , this.data);
        
    }
    events() {
        this.addEvent("bt" , "click" , ()=> {

        })
        this.addEvent("he" , "click" , ()=> {console.log("NEW CLICK HEEE")})
    }
    

}