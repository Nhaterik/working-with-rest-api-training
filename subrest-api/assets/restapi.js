// restapi.js

var courseApi = 'http://localhost:3000/course';

function start() {
    getCourses(renderCourses);
    handleCreateForm();
}

document.addEventListener('DOMContentLoaded', start);

function getCourses(cb) {
    fetch(courseApi)
        .then(response => response.json())
        .then(cb);
}

function renderCourses(courses) {
    var listCourses = document.querySelector('.list');
    var htmls = courses.map(course => (
        `
        <li>
            <h2>${course.name}</h2>
            <p>${course.des}</p>
            <button onclick="deleteCourse(${course.id})">Delete</button>
        </li>
        `
    )).join('');
    listCourses.innerHTML = htmls;
}

function deleteCourse(id) {

    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(`${courseApi}/${id}`, options)
        .then(response => response.json())
        .then(() => {
            getCourses(renderCourses);
        });
}

function updateCourse(data, id) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(`${courseApi}/${id}`, options)
        .then(response => response.json())
        .then();
}

function createCourse(data) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(courseApi, options)
        .then(response => response.json())
        .then();
}

function handleCreateForm() {
    var createBtn = document.querySelector('.btn-create');
    var updateBtn = document.querySelector('.btn-update');

    createBtn.onclick = () => {
        var valueInputName = document.querySelector('input[name="name"]').value;
        var valueInputDes = document.querySelector('input[name="description"]').value;
        var formData = {
            name: valueInputName,
            des: valueInputDes
        };
        createCourse(formData);
    };

    updateBtn.onclick = () => {
        var valueInputName = document.querySelector('input[name="name"]').value;
        var valueInputDes = document.querySelector('input[name="description"]').value;
        var valueIdInput = document.querySelector('input[name="id"]').value;
        var formData = {
            name: valueInputName,
            des: valueInputDes
        };
        updateCourse(formData, valueIdInput);
    };
}
