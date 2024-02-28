import Swal from "sweetalert2";

export const showConfirmModal = ({
    title,
    text,
    icon,
    confirmButtonText,
    showCancelButton = false,
    callback
}) => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
        showCancelButton,
    }).then(res => {
        if (res.isConfirmed) {
            if (callback) {
                callback()
            }
        }
    })
}

export const showTodoPreviewEditModal = ({
    title,
    html,
    showCancelButton = false,
    focusConfirm,
    confirmButtonText,
    preConfirm,
}) => {
    Swal.fire({
        title: "Edit Preview Todo",
        html: `
        <div class="flex flex-col gap-6">
        <input type="text" value="${todoPreviewName}" class="p-2 rounded-lg border border-slate-500 focus:border-yellow-500 focus:outline-none" id="todo-input"/>

        <textarea name="" id="todo-description-input" cols="20" rows="5" class="border border-slate-500 focus:border-yellow-500 focus:outline-none p-2 rounded-lg">${todoPreviewDesc}</textarea>
        </div>
        `,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Update',
        preConfirm: () => {
            const todoInput = document.getElementById("todo-input")
            const todoDescriptionInput = document.getElementById("todo-description-input")

            // Check if the fields are empty
            if (!todoInput.value.trim() || !todoDescriptionInput.value.trim()) {
                // Get the values from the input fields
                Swal.showValidationMessage("Fields cannot be empty");
                return false; // Prevent the modal from closing
            }
            return {
                'todo-input': todoInput.value,
                'todo-description-input': todoDescriptionInput.value
            }
        }

    }).then(res => {
        // To access the input values use: res.value.inputFieldName
        const todoDescriptionInput = res.value['todo-description-input'];
        const todoInput = res.value['todo-input'];

        // Fetch the database
        const todoDatabase = readTodo(todoKey);
        const todoIndex = todoDatabase.findIndex((todo) => todo.id === todoId);
        if (todoIndex !== -1) {
            // Update the todo with the edited task
            todoDatabase[todoIndex].description = todoDescriptionInput;
            todoDatabase[todoIndex].todoName = todoInput;
            // Store in local storage
            storeTodo(todoKey, todoDatabase);
            renderCurrentPreviewTodo()
        }
    })
}