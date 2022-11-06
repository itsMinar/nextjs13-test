import { notFound } from 'next/navigation';

export const dynamicParams = true;

const fetchTodo = async (todoId) => {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todoId}`,
        { next: { revalidate: 60 } }
    );

    const todo = await res.json();
    return todo;
};

const TodoPage = async ({ params }) => {
    const todo = await fetchTodo(params.todoId);

    if (!todo.id) return notFound();

    return (
        <div className="p-10 bg-yellow-200 border-2 m-2 shadow-lg ">
            <p>
                #{todo.id}: {todo.title}
            </p>
            <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>

            <p className="border-t border-black mt-5 text-right">
                By User: {todo.userId}
            </p>
        </div>
    );
};

export default TodoPage;

export async function generateStaticParams() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await res.json();

    const trimmedTodos = todos.slice(0, 10);

    return trimmedTodos.map((todo) => ({
        todoId: todo.id.toString(),
    }));
}
