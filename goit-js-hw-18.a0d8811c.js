const API_URL="https://69835de39c3efeb892a58383.mockapi.io/students";async function getStudents(){try{let t=await fetch(API_URL);if(!t.ok)throw Error(`HTTP error! status: ${t.status}`);let e=await t.json();if(!Array.isArray(e))throw Error("Полученные данные не массив");renderStudents(e)}catch(t){console.error("Помилка отримання студентів:",t),alert("Не удалось загрузить студентов. Проверьте API URL.")}}function renderStudents(t){if(!Array.isArray(t))return;let e=document.querySelector("#students-table tbody");e.innerHTML="",t.forEach(t=>{let r=document.createElement("tr");r.innerHTML=`
      <td>${t.id}</td>
      <td>${t.name}</td>
      <td>${t.age}</td>
      <td>${t.course}</td>
      <td>${t.skills?.join(", ")||""}</td>
      <td>${t.email}</td>
      <td>${t.isEnrolled?"✅":"❌"}</td>
      <td>
        <button onclick="updateStudent(${t.id})">\u{270F}\u{FE0F}</button>
        <button onclick="deleteStudent(${t.id})">\u{1F5D1}\u{FE0F}</button>
      </td>
    `,e.appendChild(r)})}async function addStudent(t){t.preventDefault();let e={name:document.getElementById("name").value,age:Number(document.getElementById("age").value),course:document.getElementById("course").value,skills:document.getElementById("skills").value.split(",").map(t=>t.trim()),email:document.getElementById("email").value,isEnrolled:document.getElementById("isEnrolled").checked};try{let r=await fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!r.ok)throw Error(`HTTP error! status: ${r.status}`);getStudents(),t.target.reset()}catch(t){console.error("Помилка додавання студента:",t)}}async function updateStudent(t){let e=prompt("Ім'я:"),r=prompt("Вік:");if(e&&r)try{let n=await fetch(`${API_URL}/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,age:Number(r)})});if(!n.ok)throw Error(`HTTP error! status: ${n.status}`);getStudents()}catch(t){console.error("Помилка оновлення студента:",t)}}async function deleteStudent(t){if(confirm("Ви впевнені?"))try{let e=await fetch(`${API_URL}/${t}`,{method:"DELETE"});if(!e.ok)throw Error(`HTTP error! status: ${e.status}`);getStudents()}catch(t){console.error("Помилка видалення студента:",t)}}document.getElementById("get-students-btn").addEventListener("click",getStudents),document.getElementById("add-student-form").addEventListener("submit",addStudent),getStudents();
//# sourceMappingURL=goit-js-hw-18.a0d8811c.js.map
