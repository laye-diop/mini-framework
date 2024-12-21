import transform from "./transform.js"
import diff from "./diff.js"
export class Component  {
    constructor() {
        this.data = {}
        this.Vdom = {}
        let self = this
        
        this.handler = {
            set(target, property, value) {
                console.log("calll")
                target[property] = value
                var $root = document.querySelector(".main")
                const parser = new DOMParser();
                const doc = parser.parseFromString(` <main class="main">` + self.render() + `</main>` , "text/html");
                let newVdom =  transform(doc.querySelector(".main"))
                
                if (Object.keys(self.Vdom).length === 0) {
                    $root.innerHTML  = self.render()
                } else {
                    let $rootEl = document.querySelector(".main")
                    let patch = diff(self.Vdom , newVdom)
                    console.log("the path" , patch)
                    patch($rootEl);
                     
                    self.Vdom = newVdom
                }
                return true
            }
        }
        this.proxyUser = new Proxy(this.data, this.handler);
    }
    addEvent(el , even , callback) {
        let elem = document.querySelector(el)
        if (elem != null) {
            elem.addEventListener(even , callback) 
    
        }
    }

    addEventWithDataSet(dataset, event, callback) { 
        let elem = document.querySelector(dataset)
        if (elem != null) {
            elem.addEventListener(event, callback) 
        }
    }

    events(){}
    render(){}
    bind(){}
    staticEvent(){}
    parse(textTemplate, data = []) {
        return new Function("data ", `const out = [];\n${((`##${textTemplate}##`).replace(/##\s*</g, "\nout.push(`<").replace(/>\s*##/g, ">`);\n").replace(/{=/g, "${").replace(/=}/g, "}").replace(/^##/, "").replace(/##$/, ""))}\nreturn out.join("");`)(data);
    }
    CreateElement(tagName , classes = []) {
        const element = document.createElement(tagName);
        if (Array.isArray(classes)) {
            element.classList.add(...classes);
        }
        return element;
    }
    getElement(ref){
        let element = document.querySelector(ref)
        return element
    }
    sanitise(s) {
        return s.replaceAll("<" , "&lt;").replaceAll(">" , "&gt;").replaceAll("/" , "&#x2F;")
    }
}