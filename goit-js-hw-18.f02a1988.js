const API_URL="http://localhost:3000";async function getStudents(){try{let t=await fetch(API_URL),e=await t.json();renderStudents(e)}catch(t){console.error("Помилка отримання студентів:",t)}}function renderStudents(t){let e=document.querySelector("#students-table tbody");e.innerHTML="",t.forEach(t=>{let n=document.createElement("tr");n.innerHTML=`
      <td>${t.id}</td>
      <td>${t.name}</td>
      <td>${t.age}</td>
      <td>${t.course}</td>
      <td>${t.skills.join(", ")}</td>
      <td>${t.email}</td>
      <td>${t.isEnrolled?"✅":"❌"}</td>
      <td>
        <button onclick="updateStudent(${t.id})">\u{270F}\u{FE0F}</button>
        <button onclick="deleteStudent(${t.id})">\u{1F5D1}\u{FE0F}</button>
      </td>
    `,e.appendChild(n)})}async function addStudent(t){t.preventDefault();let e={name:document.getElementById("name").value,age:Number(document.getElementById("age").value),course:document.getElementById("course").value,skills:document.getElementById("skills").value.split(",").map(t=>t.trim()),email:document.getElementById("email").value,isEnrolled:document.getElementById("isEnrolled").checked};try{await fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),getStudents(),t.target.reset()}catch(t){console.error("Помилка додавання студента:",t)}}async function updateStudent(t){let e=prompt("Ім'я:"),n=prompt("Вік:");if(e&&n)try{await fetch(`${API_URL}/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,age:Number(n)})}),getStudents()}catch(t){console.error("Помилка оновлення студента:",t)}}async function deleteStudent(t){if(confirm("Ви впевнені?"))try{await fetch(`${API_URL}/${t}`,{method:"DELETE"}),getStudents()}catch(t){console.error("Помилка видалення студента:",t)}}document.getElementById("get-students-btn").addEventListener("click",getStudents),document.getElementById("add-student-form").addEventListener("submit",addStudent);
//# sourceMappingURL=goit-js-hw-18.f02a1988.js.map
