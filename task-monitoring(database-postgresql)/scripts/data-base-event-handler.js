
const get_task_list = async () =>{
    // get all task list 
    // return promise array of task list (use async~await function to get the data)
    const url = '/task_list';
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error.message);
    }
}

const get_task_by_id = async (id) =>{
    // get task use id as an argument
    // return promise of task (use async~await function to get the data)
    let     url =`/task_list/${id}`;
    try {
        let res = await fetch(url);
        return (await res.json())[0];
    } catch (error) {
        console.log(error.message);
    }
}

const add_task = (temp_post_task) =>{
    // post task, need all off the element from task 
    // add new task to the database
    try {
        let result = fetch('/task_list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(temp_post_task)
        })
        result.then((sucess) => { console.log(sucess) })
    } catch (error) {
        console.log(error)
    }
}

const update_task = (temp_post_task) =>{
    // update task, temp_post_task is object of task (need to parsed)
    // change value of task element in the database to the new one
    try {
        let result = fetch(`/task_list/${temp_post_task.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(temp_post_task)
        })
        result.then((sucess) => { console.log(sucess) })
    } catch (error) {
        console.log(error)
    }
}

const delete_task = (id) => {
    try {
        let result = fetch(`/task_list/${id}`, {
        method: 'DELETE'
        })
        result.then((sucess) => { console.log(sucess) })
    } catch (error) {
        console.log(error)
    }
}

export { get_task_list , get_task_by_id , add_task , update_task , delete_task }