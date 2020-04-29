




// database
var db = null;

var taskList = [];



var noDataText = 'No data to display';




// open database
const request = indexedDB.open('tms');

// upgrade
request.onupgradeneeded = e => {
    db = e.target.result;
    const result = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });

}

// success
request.onsuccess = e => {
    db = e.target.result;
        getTasks();
    // if (location.href.includes("edit")) {
    //     var currentUrl = window.location.href;
    //     var urlArray = currentUrl.split("=");
    //     editId = parseInt(urlArray[1]);
    //     getTask();
    // }


}

// error
request.onerror = e => {

}

// add tasks
const addTask = () => {
    let taskName = document.getElementById('tname');
    let task = {
        name: taskName.value,
        status: 'Pending'
    };
    const tx = db.transaction('tasks', 'readwrite');
    var os = tx.objectStore('tasks');
    const request = os.add(task);

    request.onsuccess = (res) => {
        window.location.href = './index.html';
    }
    request.onerror = (e) => {

    }
};

function success() {
    if (document.getElementById("tname").value.length > 0) {
        document.getElementById('addBtn').disabled = false;
    } else {
        document.getElementById('addBtn').disabled = true;
    }
}

function disableAdd() {
    document.getElementById('addBtn').disabled = true;
}

// get all tasks

const getTasks = () => {
    taskList = [];
    const tx = db.transaction('tasks', 'readwrite');
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
            html += "<tr>";
            html += "<td class='data'>" + task.name + "</td>";
            // html += "<td class='text-center'><span class='status'>" + task.status + "</span></td>";
            html += "<td class='text-center'><a class='btn btn-danger disable'>Delete</a></td>";

            html += "</tr>";
        })

    } else {
        html += "<tr>";
        html += "<td colspan='3' class='text-center''>" + noDataText + "</td>";

        html += "</tr>";
        $('#delete').hide();
    }
    $(".table-content").html(html);
}


const deleteDatabase = () => {
    var request = indexedDB.deleteDatabase('tms');
    window.location.href = './index.html';
}