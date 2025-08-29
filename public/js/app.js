const API = "/api";
let token = localStorage.getItem("token");

if (!token && location.pathname !== "/login.html" && location.pathname !== "/signup.html") {
  location = "/login.html";
}

function $(q) {
  return document.querySelector(q);
}

function headers() {
  return { "x-auth": token };
}

async function json(url, body, method = "POST", isForm = false) {
  let o = { method, headers: headers() };
  if (body) {
    if (isForm) {
      o.body = body;
    } else {
      o.headers["Content-Type"] = "application/json";
      o.body = JSON.stringify(body);
    }
  }
  let r = await fetch(url, o);
  if (!r.ok) {
    alert((await r.json()).msg || "error");
    throw new Error();
  }
  return r.json();
}

async function signup() {
  let d = await json(API + "/auth/register", {
    name: $("#name").value,
    email: $("#email").value,
    password: $("#pass").value
  });
  token = d.token;
  localStorage.setItem("token", token);
  location = "/feed.html";
}

async function login() {
  let d = await json(API + "/auth/login", {
    email: $("#email").value,
    password: $("#pass").value
  });
  token = d.token;
  localStorage.setItem("token", token);
  location = "/feed.html";
}

function logout() {
  localStorage.clear();
  location = "/login.html";
}

if ($("#feed")) {
  loadFeed();
}

async function loadFeed() {
  let p = await json(API + "/posts", null, "GET");
  $("#feed").innerHTML = p.map(render).join("");
}

async function createPost() {
  let fd = new FormData();
  fd.append("text", $("#newPost").value);
  if ($("#pick").files[0]) fd.append("media", $("#pick").files[0]);
  fd.append("tags", $("#tags").value);

  await fetch(API + "/posts", {
    method: "POST",
    headers: headers(),
    body: fd
  });

  $("#newPost").value = "";
  $("#pick").value = "";
  $("#tags").value = "";
  loadFeed();
}

function render(p) {
  let m = "";
  if (p.media) {
    m = /\.(mp4|webm|ogg)$/i.test(p.media)
      ? `<video src="${p.media}" class="post-media" controls></video>`
      : `<img src="${p.media}" class="post-media">`;
  }

  let t = p.tags && p.tags.length ? `<small>#${p.tags.join(" #")}</small>` : "";

  return `
    <div class="card" id="${p._id}">
      <b>${p.author.name}</b><br>
      <small>${new Date(p.date).toLocaleString()}</small>
      <p>${p.text || ""}</p>
      ${m}
      ${t}<br>
      <span class="like" onclick="likePost('${p._id}')">👍 ${p.likes.length}</span>
      <details>
        <summary>Comments (${p.comments.length})</summary>
        ${p.comments.map(c => `<p><b>${c.user.name}</b> ${c.text}</p>`).join("")}
        <input placeholder="Add comment" onkeypress="if(event.key==='Enter')addComment('${p._id}',this)">
      </details>
    </div>`;
}

async function likePost(id) {
  let r = await json(API + "/posts/" + id + "/like", null, "PUT");
  $("#" + id + " .like").innerText = "👍 " + r.likes;
}

async function addComment(id, el) {
  await json(API + "/posts/" + id + "/comment", { text: el.value });
  el.value = "";
  loadFeed();
}

async function goTrending() {
  let p = await json(API + "/posts/trending", null, "GET");
  $("#feed").innerHTML = "<h3>Trending</h3>" + p.map(render).join("");
}

async function showNotifs() {
  let d = $("#notifs");
  if (d.style.display === "block") {
    d.style.display = "none";
    return;
  }

  let n = await json(API + "/users/me/notifications", null, "GET");
  d.style.display = "block";
  d.innerHTML = n.length
    ? n.map(x => `<p><a href="${x.link}">${x.text}</a></p>`).join("")
    : "<p>No notifications</p>";
}

setInterval(async () => {
  if (!token || !$("#nt")) return;
  let n = await json(API + "/users/me/notifications", null, "GET");
  $("#nt").innerText = n.filter(x => !x.read).length;
}, 15000);
