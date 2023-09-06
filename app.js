        // Initialize an empty array to store tasks
        let tasks = [];
        const dateDisplay = document.getElementById('dateDisplay');
        const currentDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.textContent = currentDate.toLocaleDateString(undefined, options);
        // Function to add a task to the array and update the display
        function addTask(event) {
            const taskInput = document.getElementById('taskInput');
            const taskText = taskInput.value.trim();
        
            // Check if the key pressed is Enter (key code 13) and the input is not empty
            if (event.key === 'Enter' && taskText !== '') {
                // Add the task to the array
                tasks.push(taskText);
        
                // Save the updated tasks to local storage
                localStorage.setItem('tasks', JSON.stringify(tasks));
        
                // Clear the input field
                taskInput.value = '';
        
                // Update the task list display
                displayTasks();
            }
        }
        

        // Function to display tasks in the HTML
        function displayTasks() {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
        
            // Load tasks from local storage if they exist
            if (localStorage.getItem('tasks')) {
                tasks = JSON.parse(localStorage.getItem('tasks'));
            }
        
            tasks.forEach((task, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span>${task}</span>
                  <div>
                  <button onclick="editTask(${index})" class="edit"><i class="fa-regular fa-pen-to-square"></i></button>
                  <button onclick="removeTask(${index})" class="trash"><i class="fa-solid fa-trash"></i></button>
                  </div>
                `;
                taskList.appendChild(listItem);
            });
        }
        

        function editTask(index) {
            const taskList = document.getElementById('taskList');
                const listItem = taskList.children[index];
                const span = listItem.querySelector('span');
            const currentTask = tasks[index];
        
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = currentTask;
        
            // Replace the span with the input field
            listItem.replaceChild(inputField, span);
        
            // Add an "Update" button to save the edited task
            const updateButton = document.createElement('div');
            updateButton.innerHTML= `<button class="update"><i class="fa-solid fa-cloud-arrow-up"></i></button>`;
            updateButton.onclick = function () {
                tasks[index] = inputField.value;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                displayTasks();
            };
        
            listItem.appendChild(updateButton);
        }
        

        // Function to remove a task from the array and update the display
        function removeTask(index) {
            const taskList = document.getElementById('taskList');
            const listItem = taskList.children[index];
        
            // Add the slide-right class to slide the task to the right
            listItem.classList.add('task-slide-right');
        
            // After sliding to the right, add the slide-left class to slide it back to the left
            setTimeout(() => {
                listItem.classList.remove('task-slide-right');
                listItem.classList.add('task-slide-left');
            }, 300); // Adjust the time to match the transition duration in milliseconds (0.3s in this case)
        
            // After sliding to the left, add the fade-out class and remove the task
            setTimeout(() => {
                listItem.classList.add('task-fade-out');
                // Remove the task from the array after the fade-out animation completes
                setTimeout(() => {
                    tasks.splice(index, 1);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    displayTasks();
        
                    // Save the updated tasks to local storage
                    console.log(tasks);
                }, 300); // Adjust the time to match the transition duration in milliseconds (0.3s in this case)
            }, 600); // Total delay: 0.3s (slide right) + 0.3s (slide left)
        }
        

        // Initially display any existing tasks
        displayTasks();