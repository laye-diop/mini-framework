export class Component {
    addEvent(id , even , callback) {
        let elem = document.getElementById(id)
        if (elem != null) {
            elem.addEventListener(even , callback) 
    
        }
    }
    events(){}
    bind(){}
    
}