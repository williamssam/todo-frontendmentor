import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import FlipMove from 'react-flip-move'
import SingleTodo from './SingleTodo'
import TodoFilterBtns from './TodoFilterBtns'
import { Todo } from '../utilities/Todo'
import { useState } from 'react'

interface TodosProps {
	todos: Todo[]
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const Todos = ({ todos, setTodos }: TodosProps) => {
	const [filter, setFilter] = useState('All')

	const FILTER_MAP = {
		All: () => true,
		Active: (todo: { isCompleted: boolean }) => !todo.isCompleted,
		Completed: (todo: { isCompleted: boolean }) => todo.isCompleted,
	}

	const handleOnDragEnd = (result: any) => {
		if (!result.destination) return
		const items = Array.from(todos)
		const [reorderedItem] = items.splice(result.source.index, 1)
		items.splice(result.destination.index, 0, reorderedItem)

		setTodos(items)
	}

	const clearCompletedTodo = () => {
		setTodos(todos.filter((todo) => !todo.isCompleted))
	}

	return (
		<>
			<section className='todo-container'>
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId='todo'>
						{(provided) => (
							<ul
								className='todos'
								{...provided.droppableProps}
								ref={provided.innerRef}>
								{todos
									?.filter(FILTER_MAP[filter])
									?.map(({ id, todo, isCompleted }, index) => (
										<Draggable
											key={id}
											draggableId={todo}
											index={index}>
											{(provided) => (
												<li
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													className='todo'>
													<SingleTodo
														todo={todo}
														id={id}
														isCompleted={isCompleted}
														todos={todos}
														setTodos={setTodos}
													/>
												</li>
											)}
										</Draggable>
									))}
								{provided.placeholder}
							</ul>
						)}
					</Droppable>
				</DragDropContext>

				<footer className='todos-footer'>
					<p>
						{todos.length > 1
							? `${todos.length} items left`
							: `${todos.length} item left`}
					</p>
					<button onClick={clearCompletedTodo}>Clear Completed</button>
				</footer>
			</section>

			<TodoFilterBtns setFilter={setFilter} filter={filter} />
		</>
	)
}

export default Todos
