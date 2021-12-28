import { useState } from 'react'
import Header from './components/Header'
import InputField from './components/InputField'
import Todos from './components/Todos'
import { Todo } from './utilities/Todo'

const App: React.FC = () => {
	const [todo, setTodo] = useState<string>('')
	const [todos, setTodos] = useState<Todo[]>([])

	const addTodo = (e: React.FormEvent) => {
		e.preventDefault()
		if (!todo) return

		setTodos([{ id: Date.now(), todo, isCompleted: false }, ...todos])

		setTodo('')
	}

	return (
		<>
			<Header />

			<main>
				<div className='container'>
					<InputField todo={todo} setTodo={setTodo} addTodo={addTodo} />
					<Todos todos={todos} setTodos={setTodos} />

					<p className='info'>Drag and drop to reorder list</p>
				</div>
			</main>
		</>
	)
}

export default App
