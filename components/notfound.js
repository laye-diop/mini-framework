// components/notfound.js
import { Component } from "./component.js";

export class NotFoundComponent extends Component {

    render() {
        return `<h1>404 - Not Found</h1>`;
    }
    CreateElement(tagName) {
        document.createElement(tagName)
    }
}