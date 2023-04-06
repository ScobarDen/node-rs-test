document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const title = prompt("Enter a new title");
    title &&
      edit(id, title).then(() => {
        event.target.closest("li").children[0].innerText = title;
      });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, title) {
  const body = JSON.stringify({ title, id });
  await fetch(`/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body,
  });
}
