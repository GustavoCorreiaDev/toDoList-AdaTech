class Todo {
    constructor() {
        this.tasks = []; // Array para armazenar as tarefas
        this.totalTasks = 0; // Inicializa o total de tarefas como 0
        this.nextTaskId = 1; // Inicializa o próximo ID como 1
    }

    addTask(taskText) {
        // Obtém o próximo ID sequencial
        let taskId = this.nextTaskId++;

        // Cria um objeto representando a tarefa
        let newTask = {
            id: taskId,
            text: taskText
        };

        // Adiciona a nova tarefa e atualiza o total
        this.tasks.push(newTask);
        this.totalTasks = this.tasks.length;

        // Clona o template
        let template = document.querySelector('.task').cloneNode(true);

        // Remove a classe 'hide' do template
        template.classList.remove('hide');

        let templateText = template.querySelector('.task-title');
        templateText.textContent = taskText;

        // Adiciona ID à nova tarefa e insere na lista
        template.setAttribute('data-task-id', taskId);
        let list = document.querySelector('#tasks-container');
        list.appendChild(template);

        // Adiciona eventos às tarefas
        this.addEvents();

        // Atualiza o total de tarefas após a adição
        this.checkTasks('add');
    }

    removeTask(task) {
        // Encontra o elemento pai
        let parentEl = task.parentElement;

        // Remove eventos associados à tarefa antes de removê-la
        this.removeEvents(parentEl);

        // Remove elemento do array de tarefas
        let taskId = parentEl.getAttribute('data-task-id');
        this.tasks = this.tasks.filter(task => task.id != taskId);

        // Remove elemento do HTML
        parentEl.remove();

        // Atualiza o total de tarefas após a remoção
        this.totalTasks = this.tasks.length;

        this.checkTasks('remove');
    }

    removeEvents(task) {
        // Remover eventos associados à tarefa
        let removeBtn = task.querySelector('.fa-trash');
        let editBtn = task.querySelector('.edit-btn');

        removeBtn.removeEventListener('click', () => {
            this.removeTask(task);
        });

        editBtn.removeEventListener('click', () => {
            this.editTask(task);
        });
    }


    editTask(task) {
        let taskTextElement = task.querySelector('.task-title');

        // Obter o ID da tarefa
        let taskId = task.getAttribute('data-task-id');

        // Criar um campo de texto para edição
        let editText = document.createElement('textarea');
        editText.value = taskTextElement.innerText;

        // Substituir o texto pelo campo de texto
        taskTextElement.innerHTML = '';
        taskTextElement.appendChild(editText);

        // Adicionar evento para salvar a edição quando pressionar Enter
        editText.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                // Atualizar o valor no array `tasks`
                this.tasks = this.tasks.map(task => {
                    if (task.id === parseInt(taskId)) {
                        task.text = editText.value;
                    }
                    return task;
                });

                // Atualizar o texto no elemento HTML
                taskTextElement.innerText = editText.value;

                // Remover o campo de texto
                editText.remove();

                // Atualizar o total de tarefas após a edição
                this.totalTasks = this.tasks.length;
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
            this.totalTasks = this.tasks.length;
        } else if (command === 'remove') {
            this.totalTasks = this.tasks.length;
        }

        // Checar se há mais de uma tarefa e adicionar ou remover a classe
        if (this.totalTasks === 0) {
            msg.classList.remove('hide');
        } else {
            msg.classList.add('hide');
        }

        // exibir a lista no console, confirmar ID.
        this.logAllTasks();
    }

    searchTask() {
        let searchText = prompt('Digite o texto da tarefa a ser pesquisada:');

        if (!searchText) {
            return;
        }

        let foundTask = this.tasks.find(task => task.text === searchText);

        if (foundTask) {
            alert(`Tarefa encontrada!\nID: ${foundTask.id}\nTexto: ${foundTask.text}`);
        } else {
            alert('Nenhuma tarefa encontrada com esse texto.');
        }
    }


    logAllTasks() {
        // Exibe todas as tarefas no console
        console.log("Lista de Tarefas:");
        this.tasks.forEach(task => {
            console.log(`ID: ${task.id}, Texto: ${task.text}`);
        });
    }
}

let todo = new Todo();

// Eventos
let addBtn = document.querySelector('#add');
let searchBtn = document.querySelector('#searchBtn');


addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let taskText = document.querySelector('#task');

    if (taskText.value.trim() !== '') {
        todo.addTask(taskText.value);
    }

    // Limpar campo de texto
    taskText.value = '';
});

searchBtn.addEventListener('click', () => {
    todo.searchTask();
});