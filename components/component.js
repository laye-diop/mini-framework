export class Component {
    constructor() {
         this.data = {}
        let self = this
        this.handler = {
            set(target, property, value) {
                target[property] = value
                document.getElementById("app").innerHTML  = self.render()
                self.events()
                return true
            }
        }
        this.proxyUser = new Proxy(this.data, this.handler);

    }
    addEvent(id , even , callback) {
        let elem = document.getElementById(id)
        if (elem != null) {
            elem.addEventListener(even , callback) 
    
        }
    }
    events(){}
    render(){}
    bind(){}
    parse(textTemplate, data) {
        return new Function("data ", `const out = [];\n${((`##${textTemplate}##`).replace(/##\s*</g, "\nout.push(`<").replace(/>\s*##/g, ">`);\n").replace(/{=/g, "${").replace(/=}/g, "}").replace(/^##/, "").replace(/##$/, ""))}\nreturn out.join("");`)(data);
    }
    CreateElement(tagName) {
        document.createElement(tagName)
    }
    
}