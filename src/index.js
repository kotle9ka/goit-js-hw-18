const API_URL = "https://698369449c3efeb892a5aa17.mockapi.io/v1/students";

async function getStudents() {
  try {
    console.log("Fetching:", API_URL);
    const res = await fetch(API_URL, { mode: 'cors' }); // включаем CORS
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const students = await res.json();
    console.log("Response data:", students);

    renderStudents(students);
  } catch (err) {
    console.error("Помилка отримання студентів:", err);
  }
}

function renderStudents(students) {
  const tbody = document.querySelector("#students-table tbody");
  tbody.innerHTML = "";

  if (!Array.isArray(students)) {
    console.error("Полученные данные не массив:", students);
    return;
  }

  students.forEach(student => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills.join(", ")}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? "✅" : "❌"}</td>
      <td>
        <button onclick="updateStudent(${student.id})">✏️</button>
        <button onclick="deleteStudent(${student.id})">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function addStudent(e) {
  e.preventDefault();

  const student = {
    name: document.getElementById("name").value,
    age: Number(document.getElementById("age").value),
    course: document.getElementById("course").value,
    skills: document.getElementById("skills").value.split(",").map(s => s.trim()),
    email: document.getElementById("email").value,
    isEnrolled: document.getElementById("isEnrolled").checked
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    getStudents();
    e.target.reset();
  } catch (err) {
    console.error("Помилка додавання студента:", err);
  }
}

async function updateStudent(id) {
  const name = prompt("Ім'я:");
  const age = prompt("Вік:");

  if (!name || !age) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age: Number(age) })
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    getStudents();
  } catch (err) {
    console.error("Помилка оновлення студента:", err);
  }
}

async function deleteStudent(id) {
  if (!confirm("Ви впевнені?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      mode: 'cors'
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    getStudents();
  } catch (err) {
    console.error("Помилка видалення студента:", err);
  }
}

document.getElementById("get-students-btn").addEventListener("click", getStudents);
document.getElementById("add-student-form").addEventListener("submit", addStudent);

getStudents();
