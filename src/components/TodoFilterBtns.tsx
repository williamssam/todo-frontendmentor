interface TodoFilterBtnsProps {
	filter: string
	setFilter: React.Dispatch<React.SetStateAction<string>>
}

const TodoFilterBtns = ({ setFilter, filter }: TodoFilterBtnsProps) => {
	return (
		<section className='btn-container'>
			<button
				className={filter === 'All' ? 'active' : undefined}
				onClick={() => setFilter('All')}>
				All
			</button>
			<button
				className={filter === 'Active' ? 'active' : undefined}
				onClick={() => setFilter('Active')}>
				Active
			</button>
			<button
				className={filter === 'Completed' ? 'active' : undefined}
				onClick={() => setFilter('Completed')}>
				Completed
			</button>
		</section>
	)
}

export default TodoFilterBtns
