  const $toDoList = document.getElementById("toDoList");
  
  // Envoi de la requete de connexion au serveur
  function getTodoList(){
    fetch('http://localhost:3000/api/v1/todos/')
      .then(res => res.json())
      .then(data => updateToDoList(data))
      .catch(err => handleError(err));
  }
  function handleError(err){
      console.error(err);
  }
  let html = "";
  function updateToDoList(data){
      for(let todo of data){
        html+=
        $toDoList.innerHTML = html;
        `
        <li class="list-group-item active m">${todo.title}</li>
        <li class="list-group-item active">${todo.content}</li>
        `;
      }
  }
  getTodoList();

  