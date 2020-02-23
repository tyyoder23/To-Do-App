
var noTaskText = document.getElementById('noTasksText');
var addTaskform = document.getElementById('addTaskForm');
var taskList = document.getElementById('taskList');
var newTask;
var taskString = window.localStorage.task;
var taskArr = [];
var initTasks = true;


var NOTasks = 0;

// Form submit event
addTaskform.addEventListener('submit', addNewTask);

// Delete task event
taskList.addEventListener('click', removeTask);


if (window.localStorage.task) {
    
    initTasks();
    
    
    // Creates old taks
    function initTasks () {
      
        
        // Turns local storage string and turns it into array
        taskArr = taskString.toString().split(",");
     

        // Filters out duplicate tasks
        taskArr = taskArr.filter( onlyUnique );

        
        // Adds each old task from array
        for (var i = 0; i < taskArr.length; i++) {
            newTask = taskArr[i];
            addTask(newTask);
            
        }
        
        initTasks = false;
    }
    
} else {
    localStorage.clear();
}


// Adds new tasks
function addNewTask(e){
  e.preventDefault();
 
    // Get input value
    newTask = document.getElementById('task').value;
    
    if (newTask) {
        addTask(newTask);

        // Add to local storage

        localStorage.setItem('task', taskString);
        
        
        }
}


// Creates new task
function addTask (newTask) {
     // Create new li element
    var li = document.createElement('li');
 
    // Add class
    li.className = 'list-group-item';
  
    // Add text node with input value
    li.appendChild(document.createTextNode(newTask));
   
    // Create delete button
     var deleteBtn = document.createElement('button');
    
    // Add classes to delete button
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    
    
    
    // Add X to delete button
    deleteBtn.appendChild(document.createTextNode('X'));
    
    // Append delete button to list
    li.appendChild(deleteBtn)
    
    // Append li to list
    taskList.append(li);
    
    // Increases NOTask count so that if there is more than one task noTask text will be deleted
    NOTasks++;
    clearNoTasks();
    
    // Add to task string for local storage

    if (!window.localStorage.task) {
        taskString = newTask;
    }
    
    else  {
        /************
        Here is problem!!!
        ************/
        console.log("problem before: " + taskString);
        taskString = taskString + ',' + newTask;
        console.log("problem after: " + taskString);
    }

    document.getElementById('task').value = '';
}


function removeTask(e){
   
    if(e.target.classList.contains('delete')){
    if(confirm('Are You Sure?')){
        
        
        
        
        // Deletes task from local storage string
         
        var textOfTaskObject = e.target.parentElement.textContent;
        textOfTaskObject = textOfTaskObject.substring(0, textOfTaskObject.length -1); // Removes the X
        
        var partOfTaskString = taskString.indexOf(textOfTaskObject);

        
        taskArr = taskString.toString().split(",");
        
        // Removes duplicates from task array
        taskArr = taskArr.filter( onlyUnique );
        
  console.log(taskArr);
        
        function removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
}
        removeElement(taskArr, textOfTaskObject);
        
          console.log(taskArr);
        
        taskString = taskArr.toString();
        
        // Adds tasks to local storage
        
        localStorage.setItem('task', taskString);
        
        
        // Removes element
        var li = e.target.parentElement;
        
        
        if (NOTasks === 1) {
            clearTasks ();
        }
        
        
        else {
            taskList.removeChild(li);
        }
      
       // Decreases NOTask count so that if there is more than one task noTask text will be added
       NOTasks--;
       AddNoTasks();
        
    }
  }
}

// Clears all tasks
function clearTasks () {
    
    // Clears local storage
    localStorage.clear();
    // Refreshes page
    location.reload();
}


// Deletes noTask text
function clearNoTasks () {
        if (NOTasks !== 0) {
                noTaskText.style.display = 'none';
            }
}

// Deletes noTask text
function AddNoTasks () {
        if (NOTasks === 0) {
                noTaskText.style.display = 'block';
            }
}

// Removes duplicates
function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
}