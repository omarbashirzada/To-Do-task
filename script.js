const inputBox = document.querySelector("input");
const addBtn = document.querySelector("button");
const todoList = document.querySelector("#todo-list")
const form = document.querySelector("#sub")
const sortIcon = document.querySelector('#sort-button')
const drag = document.querySelector('.drag')
let data = [];
drag.style.display = 'none'

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let value = inputBox.value;
    if (value) {
        inputBox.value = ''
        data.push({
            value: value,
            id: data.length + 1
        })
    gerenateTodos();
        return
    }
    alert('Xanani doldurun!')

})


const gerenateTodos = () => {
    todoList.innerHTML = '';
    data.map(item => {
        const li = document.createElement('li');
        const delButton = document.createElement('img')
        delButton.className = 'imgx';
        const span = document.createElement('span')
        span.className = 'spanList';
        delButton.id = `del-${item.id}`
        delButton.addEventListener('click', () => {
            deleteList(item.id)
        })
        span.innerHTML = item.value
        li.appendChild(span);
        delButton.src = './image/grayx.svg'
        li.appendChild(delButton)
        todoList.appendChild(li)
        li.ondragstart = () => {
            drag.style.display = 'block'
        }
        drag.addEventListener('dragover', (e) => {
            e.preventDefault()
        })
        function drop() {
            deleteList(item.id)
            drag.style.display = 'none'
        }
        drag.ondrop = drop;

    })
}

const deleteList = (id) => {
    data = data.filter(item => item.id !== id)
    gerenateTodos();
}

function compare(a, b) {
    if (a.value < b.value) {
        return -1
    }
    if (a.value > b.value) {
        return 1
    }
    return 0
}

let checkIcon = true

sortIcon.addEventListener('click', () => {
    data = data.sort(compare)
    if (checkIcon) {
        sortIcon.src = './image/blackhigh.svg'
        checkIcon = false

    } else {
        sortIcon.src = './image/blackdown.svg'
        checkIcon = true
        data = data.reverse()
    }
    gerenateTodos()
})




