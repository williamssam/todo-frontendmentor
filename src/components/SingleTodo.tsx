import { Todo } from '../utilities/Todo'

interface SingleTodoProps {
	id: number
	todo: string
	isCompleted: boolean
	todos: Todo[]
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({
	id,
	todo,
	todos,
	isCompleted,
	setTodos,
}: SingleTodoProps) => {
	const removeTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id))
	}

	const markTodoCompleted = (id: number) => {
		const completedTodo = todos.map((todo) =>
			todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
		)

		setTodos(completedTodo)
	}
	return (
		<>
			<label className='todo-label'>
				<input
					type='checkbox'
					className='todo-check'
					defaultChecked={isCompleted}
					onClick={() => markTodoCompleted(id)}
				/>
				<div className='design'></div>
				<p className='todo-text'>{todo}</p>
			</label>
			<button className='icon' onClick={() => removeTodo(id)}>
				<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18'>
					<path
						fill='#494C6B'
						fillRule='evenodd'
						d='M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z'
					/>
				</svg>
			</button>
		</>
	)
}

export default SingleTodo
