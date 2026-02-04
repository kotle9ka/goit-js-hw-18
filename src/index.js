const API_URL = "http://localhost:3000";

// Завантаження студентів (GET)
async function getStudents() {
  try {
    const res = await fetch(API_URL);
    const students = await res.json();
    renderStudents(students);
  } catch (err) {
    console.error("Помилка отримання студентів:", err);
  }
}

// Відображення студентів
function renderStudents(students) {
  const tbody = document.querySelector("#students-table tbody");
  tbody.innerHTML = "";

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

// Додавання студента (POST)
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
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    });
    getStudents();
    e.target.reset();
  } catch (err) {
    console.error("Помилка додавання студента:", err);
  }
}

// Оновлення студента (PATCH)
async function updateStudent(id) {
  const name = prompt("Ім'я:");
  const age = prompt("Вік:");

  if (!name || !age) return;

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age: Number(age) })
    });
    getStudents();
  } catch (err) {
    console.error("Помилка оновлення студента:", err);
  }
}

// Видалення студента (DELETE)
async function deleteStudent(id) {
  if (!confirm("Ви впевнені?")) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    getStudents();
  } catch (err) {
    console.error("Помилка видалення студента:", err);
  }
}

// Події
document.getElementById("get-students-btn").addEventListener("click", getStudents);
document.getElementById("add-student-form").addEventListener("submit", addStudent);