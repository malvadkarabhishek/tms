
// database
var db  = null;

var taskList = [];

var noDataText = 'No data to display';




// open database
const request = indexedDB.open('tms');

// upgrade
request.onupgradeneeded = e => {
    db = e.target.result;
    const result = db.createObjectStore('tasks',{keyPath:'id',autoIncrement:true});

}

// success
request.onsuccess = e => {
    db = e.target.result;
    getTasks();

}

// error
request.onerror = e => {

}

// add tasks
const addTask = () => {
    let taskName = document.getElementById('tname');
    let task = {
        name:taskName.value,
        status:'Pending'
    };
    const tx = db.transaction('tasks','readwrite');
    var os = tx.objectStore('tasks');
    const request = os.add(task);
    request.onsuccess = (res) => {
        window.location.href ='./index.html';
    }
    request.onerror = (e) => {
        
    }
};

// get all tasks

const getTasks = () => {
    taskList = [];
    const tx = db.transaction('tasks','readwrite');
    var os = tx.objectStore('tasks');

    var request = os.openCursor();

    request.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            let task = cursor.value;
            taskList.push(task);
            cursor.continue();
        } else {
            console.log(taskList);
            createTableContent(taskList);
        }
    }
};

const createTableContent = (taskList) => {
    var html = "";
    if (taskList && taskList.length) {
        taskList.forEach(task => {
            html+="<tr>";
            html+="<td class='text-center'>"+task.name+"</td>";
            html+="<td class='text-center'><span class='status'>"+task.status+"</span></td>";
            html+="<td class='text-center'><a href='#' class='disable'><i class='fa fa-pencil' aria-hidden='true'></i></a>&nbsp;<a href='#' class='disable' aria-disabled='true'><i class='fa fa-trash'></i></a></td>";
    
            html+="</tr>";
        })
       
    } else {
        html+="<tr>";
        html+="<td colspan='3' class='text-center''>"+noDataText+"</td>";

        html+="</tr>";
    }
    $(".table-content").html(html);
}


