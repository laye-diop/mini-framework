export default dom => {
    // console.log('the dom ', dom)
    let res = CreateElement(dom.tagName , {attrs : dom.attributes , children : dom.childNodes})
    console.log("res ", res)
    return res
}

function CreateElement (tagName, { attrs = {}, children = [] } = {})  {
    return {
      tagName,
      attrs : getAttributes(attrs),
      children : GetChilds(children),
    };
};

function GetChilds(elem) {
    var res = []
    for (let i = 0; i < elem.length; i++) {
        if (elem[i].nodeName === '#text') {
            // console.log("text " , elem[i])
            res.push(elem[i].nodeValue)
        } else {
            res.push(CreateElement(elem[i].tagName , {attrs : elem[i].attributes , children : elem[i].childNodes}))
        }
    }
    return res
}


















function getAttributes(attrs) {
    let res = {}
    let a =  Array.from(attrs)
    a.forEach(element => {
        res[element.nodeName] = element.nodeValue
    });
    return res      
}