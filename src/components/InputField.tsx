interface TodoProps {
	todo: string
	setTodo: React.Dispatch<React.SetStateAction<string>>
	addTodo: (e: React.FormEvent) => void
}

const InputField = ({ todo, setTodo, addTodo }: TodoProps) => {
	return (
		<form className='form' onSubmit={addTodo}>
			<div className='circle'></div>
			<input
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
				type='text'
				placeholder='Create a new todo...'
			/>
		</form>
	)
}

export default InputField
