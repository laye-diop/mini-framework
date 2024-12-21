// framework.js
import {NotFoundComponent} from '../components/notfound.js'
import transform from '../components/transform.js';

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
            instance.Vdom = transform(appContainer)
            instance.bind(); // Initialize data bindings
            instance.staticEvent()
            instance.events()
        };
        window.addEventListener('hashchange', navigateTo);
        navigateTo();
    }
}