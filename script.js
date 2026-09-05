const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const addBtn = $(".add-btn");
const form = $("#addTaskModal");
const dauX = $(".modal-close"); // dấu x
const btnCancel = $(".btn-cancel"); // nút huỷ
const firstInput = $("#taskTitle"); // input đầu
const todoForm = $(".todo-app-form");
const todoList = $("#todoList"); // LẤY PHẦN TỬ CHỨA DANH SÁCH TASK

console.log(todoForm);

function dongform() {
    form.className = "modal-overlay";
}
function moform() {
    form.className = "modal-overlay show";

    setTimeout(() => {
        firstInput.focus();
    }, 100);
}

// 1.hiện thị form Add New Task
addBtn.onclick = moform;

// Đóng form
dauX.onclick = dongform;
btnCancel.onclick = dongform;

const todoTask = []; // trong này sẽ có obj
//3. Xử lý form submission

todoForm.onsubmit = function (event) {
    console.log("ĐÃ SUBMIT");
    event.preventDefault(); // Ngăn hành động mặc định của form, cụ thể là không cho trang web reload khi submit.
    // lấy dữ liệu từ todoForm
    const newTask = Object.fromEntries(new FormData(todoForm));
    console.log(newTask);

    newTask.isCompleted = false;
    todoTask.unshift(newTask);
    renderTasks(todoTask);

    // 6. reset input cũ của todoForm và đóng form
    todoForm.reset();
    dongform();

    todoList.innerHTML = renderTasks(todoTask); //5.hiện ra giao diện
};

//5.hiện ra giao diện
function renderTasks(tasks) {
    const html = tasks
        .map(function (task) {
            return `<div class="task-card ${task.color} ${task.isCompleted ? "completed" : ""}">
                    <div class="task-header">
                        <h3 class="task-title"> ${task.title} </h3>
                        <button class="task-menu">
                            <i class="fa-solid fa-ellipsis fa-icon"></i>
                            <div class="dropdown-menu">
                                <div class="dropdown-item">
                                    <i
                                        class="fa-solid fa-pen-to-square fa-icon"
                                    ></i>
                                    Edit
                                </div>
                                <div class="dropdown-item complete">
                                    <i class="fa-solid fa-check fa-icon"></i>
                                    Mark as Active
                                    ${task.isCompleted ? "Mark as Active" : "Mark as Complete"}
                                </div>
                                <div class="dropdown-item delete">
                                    <i class="fa-solid fa-trash fa-icon"></i>
                                    Delete
                                </div>
                            </div>
                        </button>
                    </div>
                    <p class="task-description">
                      ${task.description}
                    </p>
                    <div class="task-time"> ${task.startTime} AM - ${task.endTime} PM </div>
                </div>`;
        })
        .join("");

    return html;
}
