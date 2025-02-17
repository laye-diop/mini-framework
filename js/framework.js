// framework.js
import {NotFoundComponent} from '../components/notfound.js'

export class Framework {
    constructor() {
        this.routes = {};
    }
    route(path, component) {
        this.routes[path] = component;
    }
    start() {
        const navigateTo = () => {
            const path = window.location.hash.slice(1);
            const component = this.routes[path] || NotFoundComponent;
            const appContainer = document.querySelector('.main');
            const instance = new component();
            appContainer.innerHTML = instance.render();
            instance.bind(); // Initialize data bindings
            instance.staticEvent()
            instance.events()
        };
        window.addEventListener('hashchange', navigateTo);
        navigateTo();
    }
}