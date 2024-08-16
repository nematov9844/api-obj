let modal = document.getElementById("modal");
let addUser = document.getElementById("addUser");
let saveBtn = document.getElementById("save");
let inputName = document.getElementById("inputName");
let inputEmail = document.getElementById("inputEmail");
let inputNumber = document.getElementById("inputNumber");

modal.style.display = "none";

document.addEventListener("DOMContentLoaded", function () {
  getUsers();
  addUser.addEventListener("click", function () {
    toggleModal();
    saveBtn.onclick = addUserToTable;
  });
});

async function getUsers() {
  try {
    const response = await fetch("http://localhost:8888/users");
    const users = await response.json();
    console.log(users.length);
    console.log(users);
    displayUsers(users);
  } catch (error) {
    console.log(error);
  }
}

function displayUsers(users) {
  let result = document.getElementById("result");
  result.innerHTML = "";
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  table.classList =
    "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-black shadow-lg rounded-lg";
  thead.classList =
    "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400";
  thead.innerHTML = `
    <tr>
    <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
        <th class="border px-4 py-2">ID</th>
        <th class="border px-4 py-2">First Name</th>
        <th class="border px-4 py-2">Email</th>
        <th class="border px-4 py-2">Number</th>
        <th class="border px-4 py-2">Actions</th>
    </tr>
    `;
  table.appendChild(thead);

  users.forEach((item) => {
    let tr = document.createElement("tr");
    tr.classList =
      "bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-300  dark:hover:bg-gray-600";
    tr.innerHTML = `
    <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                </td> 
            <td class="border px-4 py-2">${item.id}</td>
            <td class="border px-4 py-2">${item.name}</td>
            <td class="border px-4 py-2">${item.email}</td>
            <td class="border px-4 py-2">${item.number}</td>
            <td class="border px-4 py-2">
                <button class="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition" onclick="editUser(this)">Edit</button>
                <button class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition" onclick="deleteUser(this)">Delete</button>
            </td>
        `;
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  result.appendChild(table);
}

function toggleModal() {
  if (modal.style.display === "flex") {
    modal.style.display = "none";
  } else {
    modal.style.display = "flex";
  }
}

function addUserToTable() {
  const name = inputName.value;
  const email = inputEmail.value;
  const number = inputNumber.value;

  if (!name || !email || !number) {
    alert("Please fill in all fields");
    return;
  }

  fetch("http://localhost:8888/users")
    .then((response) => response.json())
    .then((users) => {
      const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
      const newUserId = maxId + 1;

      const user = {
        id: newUserId,
        name,
        email,
        number,
      };
      return fetch("http://localhost:8888/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("User added:", data);
      getUsers();
    })
    .catch((error) => console.error("Error adding user:", error));

  toggleModal();

  inputName.value = "";
  inputEmail.value = "";
  inputNumber.value = "";
}
