class Todo {
    constructor() {
        this.totalTasks = document.querySelectorAll('.task').length;
    }

    addTask(taskText) {
        // Clonar template
        let template = document.querySelector('.task').cloneNode(true);
        // Remover classe 'hide' do template
        template.classList.remove('hide');

        let templateText = template.querySelector('.task-title');
        templateText.textContent = taskText;

        let list = document.querySelector('#tasks-container');

        // Inserir na lista
        list.appendChild(template);

        // Adicionar eventos às tasks
        this.addEvents();

        this.checkTasks('add');
    }

    removeTask(task) {
        // Encontrar o elemento pai
        let parentEl = task.parentElement;

        // Remover elemento
        parentEl.remove();

        this.checkTasks('remove');
    }

    editTask(task) {
        let taskTextElement = task.querySelector('.task-title');

        // Criar um campo de texto para edição
        let editText = document.createElement('textarea');
        editText.value = taskTextElement.innerText;

        // Substituir o texto pelo campo de texto
        taskTextElement.innerHTML = '';
        taskTextElement.appendChild(editText);

        // Adicionar evento para salvar a edição quando pressionar Enter
        editText.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                taskTextElement.innerText = editText.value;
                // Remover o campo de texto
                editText.remove();

                // Atualizar o total de tarefas após a edição
                this.totalTasks = document.querySelectorAll('.task').length;
                this.checkTasks('edit');
            }
        });

        // Focar no campo de texto
        editText.focus();
    }

    addEvents() {
        let removeBtns = document.querySelectorAll('.fa-trash');
        let editBtns = document.querySelectorAll('.edit-btn');

        removeBtns.forEach((removeBtn) => {
            removeBtn.addEventListener('click', () => {
                this.removeTask(removeBtn.parentElement);
            });
        });        

        editBtns.forEach((editBtn) => {
            editBtn.addEventListener('click', () => {
                this.editTask(editBtn.parentElement.parentElement);
            });
        });
    }

    checkTasks(command) {
        let msg = document.querySelector('#empty-tasks');

        // Adicionar, remover ou editar tarefas
        if (command === 'add' || command === 'edit') {
            this.totalTasks = document.querySelectorAll('.task').length;
        } else if (command === 'remove') {
            this.totalTasks -= 1;
        }

        // Checar se há mais de uma tarefa e adicionar ou remover a classe
        if (this.totalTasks == 0) {
            msg.classList.remove('hide');
        } else {
            msg.classList.add('hide');
        }
    }
}

let todo = new Todo();

// Eventos
let addBtn = document.querySelector('#add');

addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let taskText = document.querySelector('#task');

    if (taskText.value.trim() !== '') {
        todo.addTask(taskText.value);
    }

    // Limpar campo de texto
    taskText.value = '';
});