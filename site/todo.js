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
      tableaufiltre = data.filter(todo => !todo.done);
      for (let todo of tableaufiltre ) {

          html += createlalistehtml(todo);
      }
      $toDoList.innerHTML = html;

      function createlalistehtml(todo) {
          let checkboxAttribute = "";
          if (todo.done) {
              checkboxAttribute = "checked";
          }
          return `
    <div class="form-check border">
        
        <label class="form-check-label" for="defaultCheck1"></label>

        <div class="accordion" id="accordionExample">
            <div class="card">
                <div class="card-header" id="headingOne">
                
                <input class="form-check-input" data-checked-id=${todo.id} type="checkbox" ${checkboxAttribute}>

                    <button class="btn btn-info" type="button" data-toggle="collapse" data-target="#collapseOne${todo.id}" aria-expanded="true" aria-controls="collapseOne">
                        ${todo.title}
                    </button>
                    


                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal${todo.id}">
                      Modifier ToDo
                    </button>

                    <a href="#"><i id ="trash" data-delete-id=${todo.id} class="fas fa-trash text-info"></i></a>
                    
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal${todo.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value ="${todo.title}">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                          <input type="email" class="form-control" id="content" aria-describedby="emailHelp" value ="${todo.content}">
                          </div>
                          <div class="modal-footer">
                            <button type="button" data-edit-id=${todo.id} class="btn btn-secondary" data-dismiss="modal">Edit</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    
                </div>
                <div id="collapseOne${todo.id}" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
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
  // ajout nouveau todo

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
      if ($target.hasAttribute("data-delete-id")) {
          const $id = Number($target.getAttribute("data-delete-id"));
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
  // ecoute du click edit du modal qui va fetcher en patch

  document.addEventListener('click', function (e) {
      const $target = e.target;
      if ($target.hasAttribute("data-edit-id")) {
          const $id = Number($target.getAttribute("data-edit-id"));
          editToDo($id);
      }
  });

  //   fonction edit todo : fetch

  function editToDo($id) {
      const titleContent = document.getElementById("exampleInputEmail1").value;
      const contentContent = document.getElementById("content").value;

      const data = {
          'title': titleContent,
          'content': contentContent,

      }

      fetch(`http://localhost:3000/api/v1/todos/${$id}`, {
              method: "PATCH",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          })
          .then(res => res.json())
          .then(data => getTodoList(data))
          .catch(err => handleError(err));

  }

  // Ecouter 

  document.addEventListener('click', function (e) {
      const $target = e.target;
      if ($target.hasAttribute("data-checked-id")) {
          const $id = Number($target.getAttribute("data-checked-id"));
          const isDone = $target.checked;
          todoDone($id, isDone);
      }
  });

  function todoDone($id, isDone) {

      const data = {
          'done': isDone,
      }

      fetch(`http://localhost:3000/api/v1/todos/${$id}`, {
              method: "PATCH",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          })
          .then(res => res.json())
          .then(data => getTodoList(data))
          .catch(err => handleError(err));
  }