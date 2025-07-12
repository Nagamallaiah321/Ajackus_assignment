let employees = [{
        id: 1,
        firstName: "Alice",
        lastName: "Smith",
        email: "alice@example.com",
        department: "HR",
        role: "Manager"
    },
    {
        id: 2,
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob@example.com",
        department: "IT",
        role: "Developer"
    },
    {
        id: 3,
        firstName: "Charlie",
        lastName: "Lee",
        email: "charlie@example.com",
        department: "Finance",
        role: "Analyst"
    },
];

let currentPage = 1;

function renderEmployees() {
    const list = document.getElementById("employee-list");
    const sortBy = document.getElementById("sortBy").value;
    const itemsPerPage = parseInt(document.getElementById("itemsPerPage").value);
    const search = document.getElementById("search").value.toLowerCase();

    let filtered = employees.filter(e =>
        e.firstName.toLowerCase().includes(search) ||
        e.lastName.toLowerCase().includes(search) ||
        e.email.toLowerCase().includes(search)
    );

    if (sortBy) {
        filtered.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    }

    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);

    list.innerHTML = paginated.map(emp => `
    <div class="employee-card">
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    </div>
  `).join("");

    renderPagination(filtered.length, itemsPerPage);
}

function renderPagination(total, perPage) {
    const pages = Math.ceil(total / perPage);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    for (let i = 1; i <= pages; i++) {
        pagination.innerHTML += `<button onclick="changePage(${i})">${i}</button>`;
    }
}

function changePage(page) {
    currentPage = page;
    renderEmployees();
}

function openForm() {
    document.getElementById("employee-form").reset();
    document.getElementById("employeeId").value = "";
    document.getElementById("form-title").innerText = "Add Employee";
    document.getElementById("form-container").classList.remove("hidden");
}

function closeForm() {
    document.getElementById("form-container").classList.add("hidden");
}

function deleteEmployee(id) {
    employees = employees.filter(emp => emp.id !== id);
    renderEmployees();
}

function editEmployee(id) {
    const emp = employees.find(e => e.id === id);
    document.getElementById("employeeId").value = emp.id;
    document.getElementById("firstName").value = emp.firstName;
    document.getElementById("lastName").value = emp.lastName;
    document.getElementById("email").value = emp.email;
    document.getElementById("department").value = emp.department;
    document.getElementById("role").value = emp.role;
    document.getElementById("form-title").innerText = "Edit Employee";
    document.getElementById("form-container").classList.remove("hidden");
}

document.getElementById("employee-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const id = document.getElementById("employeeId").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const department = document.getElementById("department").value;
    const role = document.getElementById("role").value;

    if (!firstName || !lastName || !email || !department || !role || !/\S+@\S+\.\S+/.test(email)) {
        alert("Please fill all fields with valid data.");
        return;
    }

    if (id) {
        const emp = employees.find(e => e.id == id);
        Object.assign(emp, {
            firstName,
            lastName,
            email,
            department,
            role
        });
    } else {
        employees.push({
            id: Date.now(),
            firstName,
            lastName,
            email,
            department,
            role
        });
    }

    closeForm();
    renderEmployees();
});

renderEmployees();
