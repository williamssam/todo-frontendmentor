import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import SingleTodo from './SingleTodo'
import TodoFilterBtns from './TodoFilterBtns'
import { Todo } from '../utilities/Todo'
import { useState } from 'react'

interface TodosProps {
	todos: Todo[]
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

// By extending IItem with the Record<string, any> you allow an object to contain other string keys with any values along with those defined in the interface. The nice part is that you still have the autocompletion for the defined properties.
export interface IItem extends Record<string, any> {
	All: () => boolean
	Active: (todo: { isCompleted: boolean }) => boolean
	Completed: (todo: { isCompleted: boolean }) => boolean
}

const Todos = ({ todos, setTodos }: TodosProps) => {
	const [filter, setFilter] = useState('All')

	const FILTER_MAP: IItem = {
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
