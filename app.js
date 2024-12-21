import {Framework} from './js/framework.js'
import { Todo } from './components/todo.js';

export const app = new Framework();

app.route('/', Todo);
app.route("/active" , Todo )
app.route("/completed" , Todo)

// Start the application
app.start()


