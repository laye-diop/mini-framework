export class Component  {
    constructor() {
        this.data = {}
        let self = this
        this.handler = {
            set(target, property, value) {
                target[property] = value
                document.querySelector(".main").innerHTML  = self.render()
                self.events()
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
    parse(textTemplate, data) {
        return new Function("data ", `const out = [];\n${((`##${textTemplate}##`).replace(/##\s*</g, "\nout.push(`<").replace(/>\s*##/g, ">`);\n").replace(/{=/g, "${").replace(/=}/g, "}").replace(/^##/, "").replace(/##$/, ""))}\nreturn out.join("");`)(data);
    }
    CreateElement(tagName) {
        document.createElement(tagName)
    }
    getElement(ref){
        let element = document.querySelector(ref)
        return element
    }
}