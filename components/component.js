export class Component {
    constructor() {
        this.data = ""
    }
    addEvent(id , even , callback) {
        let elem = document.getElementById(id)
        if (elem != null) {
            elem.addEventListener(even , callback) 
    
        }
    }
    events(){}
    bind(){}
    parse(textTemplate, data) {
        return new Function("data ", `const out = [];\n${((`##${textTemplate}##`).replace(/##\s*</g, "\nout.push(`<").replace(/>\s*##/g, ">`);\n").replace(/{=/g, "${").replace(/=}/g, "}").replace(/^##/, "").replace(/##$/, ""))}\nreturn out.join("");`)(data);
    }
}