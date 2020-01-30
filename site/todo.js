  const $toDoList = document.getElementById("toDoList");

  // Envoi de la requete de connexion au serveur
  function getTodoList() {
      fetch('http://localhost:3000/api/v1/todos/')
          .then(res => res.json())
          .then(data => updateToDoList(data))
          .catch(err => handleError(err));
  }

  function handleError(err) {
      console.error(err);
  }
  // fonction pour mettre a jour le tableau des todos
  function updateToDoList(data) {
      let html = "";

      for (let todo of data) {
          html += createlalistehtml(todo);
      }
      $toDoList.innerHTML = html;

      function createlalistehtml(todo) {
          return `
    <div class="form-check border">
        
        <label class="form-check-label" for="defaultCheck1"></label>
        <div class="accordion" id="accordionExample">
            <div class="card">
                <div class="card-header" id="headingOne">
                
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                    <button class="btn btn-info" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        ${todo.title},
                        
                        
                    </button>
                    <a href="#"><i id ="trash" data-id=${todo.id} class="fas fa-trash text-info"></i></a>
                </div>
                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div class="card-body">                        
                        ${todo.content}
                    </div>
                </div>
            </div>
        </div>
    </div>
      `;
      }
  }
  getTodoList();

  //recuperer l evenement add new bouton

  const $newTodo = document.getElementById("button-addon1");

  $newTodo.addEventListener('click', addNewToDo);

  function addNewToDo() {

      const titleContent = document.getElementById("titreToDo").value;
      const contentContent = document.getElementById("contentToDo").value;

      const data = {
          'title': titleContent,
          'content': contentContent,

      }

      fetch('http://localhost:3000/api/v1/todos/', {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          })
          .then(res => res.json())
          .then(data => getTodoList(data))
          .catch(err => handleError(err));
  }

  //supprimer un todo


  document.addEventListener('click', function (e) {
      const $target = e.target;
      if ($target.hasAttribute("data-id")) {
        const $id = Number($target.getAttribute("data-id"));
          deleteTodo($id);
      }
  });

  function deleteTodo($id) {

      fetch(`http://localhost:3000/api/v1/todos/${$id}`, {
              method: "DELETE",
              headers: {
                  'Content-Type': 'application/json',
              },
          })
          .then(res => res.json())
          .then(data => getTodoList(data))
          .catch(err => handleError(err));

  }