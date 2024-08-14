const result = document.getElementById("result");

let body = document.querySelector("body");
body.style.backgroundColor = "#ccc"

// document.addEventListener("DOMContentLoaded", function () {
//   getUsers();
// });

async function userFn() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  displayUsers(users);
}

function displayUsers(users) {
  result.innerHTML = "";
  let style = [
    "table",
    "table-primary",
    "table-hover",
    "table-dark",
    "table-striped",
    "table-hover",
    "table-bordered",
    "table-sm",
    "table-responsive-sm",
  ];
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  users.forEach((item, index) => {
    let tr = document.createElement("tr");
    thead.innerHTML = `
    <tr>
    <th>T/R</th>
    <th>Name</th>
    <th>UserName</th>
    <th>Email</th>
    <th>Address</th>
    <th>Phone Number</th>
    <th>Website</th>
    <th>Company</th>    
    </tr>
    `;
    tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.username}</td>
        <td>${item.email}</td>
        <td>${item.address.city}</td>
        <td>${item.phone}</td>
        <td>${item.website}</td>
        <td>${item.company.name}</td>
        `;
    tbody.appendChild(tr);
  });
  table.appendChild(thead);
  table.appendChild(tbody);
  table.classList.add(...style);
  result.appendChild(table);
}

async function todosFn() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await response.json();
  displayTodos(todos);
}
// function displayTodos(todos) {
//   result.innerHTML = "";
//   todos.forEach((item) => {
//     let ul = document.createElement("ul");
//     ul.innerHTML = `
//       <li class="col-1">${item.id}</li>
//       <li class="col">${item.title}</li>
//       `;

//     if (item.completed) {
//       ul.style.backgroundColor = "red";
//       ul.style.fontStyle = "bold"
//     } else {
//       ul.style.backgroundColor = "green";
//     }
//     ul.style.listStyle = "none";
//     ul.classList.add("row", "offset-1", "text-white");
//     result.appendChild(ul);
//   });
// }

function displayTodos(todos) {
  result.innerHTML = "";

  todos.forEach((item) => {
    const ul = document.createElement("ul");

    ul.innerHTML = `
      <li class="todo-id">${item.id}</li>
      <li class="todo-title">${item.title}</li>
      <li class="todo-status">${item.completed ? "✓" : "✗"}</li>
    `;

    ul.style.padding = "10px";
    ul.style.margin = "10px 0";
    ul.style.borderRadius = "5px";
    ul.style.display = "flex";
    ul.style.alignItems = "center";

    if (item.completed) {
      ul.style.backgroundColor = "#C8E6C9";
      ul.style.borderLeft = "5px solid #388E3C";
      ul.style.fontWeight = "bold";
    } else {
      ul.style.backgroundColor = "#FFCDD2";
      ul.style.borderLeft = "5px solid #D32F2F";
    }

    ul.style.listStyleType = "none";
    ul.classList.add("row", "offset-1", "text-dark");

    const idLi = ul.querySelector(".todo-id");
    const titleLi = ul.querySelector(".todo-title");
    const statusLi = ul.querySelector(".todo-status");

    idLi.style.marginRight = "15px";
    idLi.style.flex = "0 0 auto";
    titleLi.style.flex = "1";
    statusLi.style.marginLeft = "auto";

    result.appendChild(ul);
  });
}

async function photosFn() {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  const photos = await response.json();
  displayPhotos(photos);
}

let style = document.createElement("style");

function displayPhotos(photos) {
  result.innerHTML = "";

  let res = document.createElement("div");
  res.classList.add("photo-grid");

  const photosToShow = Math.min(100, photos.length);

  for (let i = 0; i < photosToShow; i++) {
    let div = document.createElement("div");
    div.classList.add("photo-card");

    div.innerHTML = `
      <img src="${photos[i].url}" alt="${photos[i].title}">
      <h4>${photos[i].title}</h4>
    `;

    res.appendChild(div);
  }

  result.appendChild(res);

  style.textContent = `
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
  }

  .photo-card {
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.2s;
  }

  .photo-card:hover {
    transform: scale(1.05);
  }

  .photo-card img {
    width: 100%;
    height: auto;
    display: block;
  }

  .photo-card h4 {
    padding: 10px;
    font-size: 1.1em;
    color: #333;
  }
`;
  document.head.appendChild(style);
}

async function albumsFn() {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  const albums = await response.json();
  displayAlbums(albums);
}

function displayAlbums(albums) {
  result.innerHTML = "";

  let ul = document.createElement("ul");
  ul.style.listStyle = "none";
  ul.style.padding = "0";

  albums.forEach((item) => {
    let li = document.createElement("li");
    li.classList.add("album-item");
    li.innerHTML = `${item.id} : ${item.title}`;
    ul.appendChild(li);
  });

  result.appendChild(ul);

  console.log(albums);

  style.textContent = "";
  style.textContent = `
  .album-item {
    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
    margin: 10px 0;
    padding: 15px;
    border-radius: 8px;
    font-size: 1.2em;
    color: #333;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background 0.3s ease;
  }

  .album-item:hover {
    background: linear-gradient(135deg, #fda085 0%, #f6d365 100%);
  }
`;
  document.head.appendChild(style);
}

async function commentsFn() {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  const comments = await response.json();
  displayComments(comments);
}

function displayComments(comments) {
  result.innerHTML = "";

  comments.forEach((item) => {
    let div = document.createElement("div");
    div.classList.add("comment-card");
    div.innerHTML = `
      <h3 class="comment-name">${item.name.toUpperCase()}</h3>
      <h4 class="comment-email">${item.email}</h4>
      <p class="comment-body">${item.body}</p>
    `;
    result.appendChild(div);
  });

  style.textContent = "";
  style.textContent = `
  .comment-card {
    background-color: rgba(178,190,181,0.6);
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    margin: 10px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }

  .comment-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }

  .comment-name {
    font-size: 1.5em;
    margin-bottom: 5px;
    color: #333;
  }

  .comment-email {
    font-size: 1.2em;
    color: #777;
    margin-bottom: 10px;
  }

  .comment-body {
    font-size: 1em;
    color: #555;
    line-height: 1.5;
  }
`;
  document.head.appendChild(style);
}

async function postFunc() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  displayPosts(posts);
}

// function displayPosts(posts) {
//   result.innerHTML = "";
//   posts.forEach((item) => {
//     let div = document.createElement("div");
//     div.innerHTML = `
//     <h3>${item.id}: ${item.title.toUpperCase()}</h2>
//     <p>${item.body}</p>
//     `;
//     result.appendChild(div);
//   });
// }

function displayPosts(posts) {
  result.innerHTML = "";

  posts.forEach((item) => {
    let div = document.createElement("div");
    div.classList.add("post-card");
    div.innerHTML = `
      <h3 class="post-title">${item.id}: ${item.title.toUpperCase()}</h3>
      <p class="post-body">${item.body}</p>
    `;
    result.appendChild(div);
  });

  style.textContent = "";
  style.textContent = `
  .post-card {
    background: linear-gradient(135deg, #D81990 0%, #19D7C0 100%);
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    margin: 10px 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }

  .post-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }

  .post-title {
    font-size: 1.5em;
    margin-bottom: 10px;
    color: #2FD719;
  }

  .post-body {
    font-size: 1em;
    color: #fff;
    line-height: 1.6;
  }
`;
  document.head.appendChild(style);
}
