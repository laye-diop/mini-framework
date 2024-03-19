// app.js

import {HomeComponent} from './components/home.js'
import {AboutComponent} from './components/about.js'
import { DataBindingComponent } from './components/databinding.js';
import {Framework} from './js/framework.js'

export const app = new Framework();
// Define SPA routes
app.route('/', HomeComponent);
app.route('/about', AboutComponent);

// Add the DataBindingComponent route
app.route('/databinding', DataBindingComponent);

// Start the application
app.start()


