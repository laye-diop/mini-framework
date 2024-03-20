// app.js

import {HomeComponent} from './components/home.js'
import {AboutComponent} from './components/about.js'
import { DataBindingComponent } from './components/databinding.js';
import {Framework} from './js/framework.js'
import { Todo } from './components/todo.js';

export const app = new Framework();
// Define SPA routes
app.route('/', Todo);
// app.route('/about', AboutComponent);

// // Add the DataBindingComponent route
// app.route('/databinding', DataBindingComponent);

app.route("/active" , Todo )
app.route("/completed" , Todo )

// Start the application
app.start()


