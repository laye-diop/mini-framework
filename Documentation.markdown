# Mini Framework

## Introduction

    As indicated by it's name, this project consists of creating javascript framework that has the following features:

- Dom abstraction 
- Routing system
- State Management
- Event Handling


# Project structure
    The mini-faramework project structure looks like this:

```
MINI FRAMEWORK
│   index.html    
│   app.js    
│   README.md
│
└───components
│   │   component.js
│   │   home.js
|   |   contacts.js
|   |   about.js
│   │
│   
└───js
|   │   framework.js
|   │   
|
|
└───static
|        |
|        |
|        └───css
|        |   |  style.css
|        |   |  index.css
|        |      
|        └───images
```
#### index.html
    This file contain the base initialisation of the html code 
    As Mini-framework is a single page application, all the content
    off the app will be loaded in this page.
    This file contain two parts :
- A dynamic part containg in a html alement that has the class .main    
- A static part outside of the .main element. It's content will change depending of the route.

#### app.js
    app.js is the file where every routes of the web application will be register. To learn more 
[ check the routing system section ](#routing_system)



#### components
    This folder contain all the components of the web app
    To add a component create a new file in this directory
    The component name is a class name that extends to the class Component
    the render() method of a component return the html that will be load in the .main element in the index.html file
![Compoonent example](/static/images/homecomp.png)
    
    The component directory also contain a component.js file
    It is a system file which must not be modified

#### js 
    This directory has one single file framework.js
    It is also a system file which must not be modified

#### static
    This folder contain static files like css or images.


# Routing_System
#### app.js
    app.js is the file where every routes of the web application will be register.
    NB : The the second argument of app.route method is a component. It has to be 
    implemented and imported to this file

```javascript
    app.route("/" , HomeComponent )
    app.route("/login" , Login )
    app.route("/register" , register )
    app.route("/contact" , contact )
```


# Create html elements
    To create html elements, you can use the render method of the Component class  to create and nest as many elements as you want
[ see render method ](#components)

    or use the CreateElement method as bellow to create them one by one.
    The first argument is the tagname and the second the classList
```javascript
    let div = this.CreateElement("div" , ["completed" , "container"])
```
    To sanitise a string and avoid html injection, user this.sanitise(html)

# Event Handling
    To add an event on an html element, use the method addEvent.
    The first argument is the element id or className or tagName , the second is the event 
    and the last is the callback function.
```javascript
EX:
    this.addEvent("btn" , "click" , ()=> {console.log("NEW CLICK")})

```
    If the element you want to add the event to is in the index.html file: 
    use  staticEvent() to register the event , otherwise use events()

```javascript
    events() {
        this.addEvent("#btn" , "click" , ()=> {console.log("NEW CLICK")})

        this.addEvent(".todo"  , "dblclick" , ()=> {
            console.log("INPUT ON DYNAMIQUE ELEMENT")
        })
    }

    staticEvent() {
        this.addEvent("inp" , "keydown" , (ev)=> {
            if (ev.key == 'Enter' ) {
                console.log("INPUT ON STATIC ELEMENT")
            }
        })
    }

```

# State Management and Templating
    First let's write a component that just increase or decrease a number
```javascript
import { Component } from "./component.js";

export class Test extends Component {
    constructor() {
        super()
        this.proxyUser.data = 0
    }
    render() {
        return this.parse(`

            <button id="moins" > Ajouter </button>
            <p> {= data =} </p>
            <button id ="plus"> Diminuer </button>
            
            ` , this.proxyUser.data);
    }
    events() {
        this.addEvent("#moins" , "click" , ()=> {
            this.proxyUser.data = this.proxyUser.data - 1
        })

        this.addEvent("#plus" , "click" , ()=> {
            this.proxyUser.data = this.proxyUser.data + 1
        })
    }
   
}

```
    Here is the result
![Templating example](/static/images/res.gif)

    You shoud have notice the propriety 
```this.proxyUser.data``` 

    This propriety is dynamique and every time it change the state of the web app is apdated.

```template```

    Now let's talk about the template system. It is tigger by the method
```this.parse()```

    It takes as params the html and the data you want to parse the html with
    Inside the html, to display a dynamique data, surround it with "{=" and "=}"
```javascript
Ex : 
 <p>Welcome {= data.name =}</p>
```

    Inside the html you can also add javascript code like conditions , loop and every type of js code. There is just one rule to respect: surround js code with ##
```Ex```
```javascript

    render() {
        return this.parse(`
        
        for (let [index ,item] of data.entries()) { ##    
                <li class="">
                    ## if (!item.editing) { ##
                        <div class="view">
                            <input type="checkbox" />
                            <label >{= item.value  =}</label>
                            <button class="destroy" />
                        </div>
                    ##} else { ##
                        <div class="input-container">
                            <input  value={= item.value =} />
                            <label >Edit Todo Input</label>
                        </div>
                    ## } ##
                </li>
        ## } 
        ` , this.proxyUser.data)
    }
```