
// database
var db  = null;



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

}

// error
request.onerror = e => {

}

// add tasks

const addTask = () => {
    let taskname = document.getElementById('tname');
    let task = {
        name:taskname.value
    };
    alert('add task called');
    const tx = db.transaction('tasks','readwrite');
    var os = tx.objectStore('tasks');
    os.add(task);
};
