var myForm = document.querySelector("#my-form");
myForm.addEventListener("submit", getDetails);

var table = document.querySelector("table");


table.addEventListener("click", removelist);

let maps = new Map();

function updateDetails(){
  axios
  .get(
    "https://crudcrud.com/api/8006f873ec4746e49a356fa6f66e1ebb/Registration"
  )
  .then((res) => {
    let data = res.data;
    for (i of data) {
      maps.set(i.email, i._id);
    }
})
}


function removelist(e) {
  // table.rows[1].cells[1].innerHTML
  if (e.target.classList.contains("btn")) {
    let rowIndex = e.target.parentElement.parentElement.rowIndex
    let email=table.rows[rowIndex].cells[1].innerHTML
    axios
    .delete(
      "https://crudcrud.com/api/8006f873ec4746e49a356fa6f66e1ebb/Registration/" +
        maps.get(email)
    )
    maps.delete(email)
  var removeitem = e.target.parentElement.parentElement;
  table.removeChild(removeitem);
}
}

function getDetails(e) {
  e.preventDefault();
  let email = e.target.elements.email.value;
  let UserName = e.target.elements.name.value;
  if (maps.has(email) || email == "" || UserName == "") {
    alert(
      `Enter Vaid Details 
or Email Id already Exists`
    );
  } else {
    displayDetails(email, UserName);

    // delete if required
    //   let table = document.querySelector(".table");
    //   let row = document.createElement("tr");

    //   row.innerHTML = `
    // <td>${email}</td>
    // <td>${UserName}</td>
    // <td>
    // <button class="btn btn-danger btn-delete">Delete</button>
    // <button class="btn btn-danger btn-edit">Edit</button>
    // </td>
    // `;
    //   table.appendChild(row);

    let Details = {
      Name: UserName,
      email: email,
    };

    axios
      .post(
        "https://crudcrud.com/api/8006f873ec4746e49a356fa6f66e1ebb/Registration",
        Details
      )
      .then((res) => {
        maps.set(email, res.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
    updateDetails()
  }
}

// load data



function loadUsers() {
  axios
  .get(
    "https://crudcrud.com/api/8006f873ec4746e49a356fa6f66e1ebb/Registration"
  )
  .then((res) => {
    let data = res.data;

    for (i of data) {
      maps.set(i.email, i._id);
    }
  
  for (i of maps.keys()) {
    axios
      .get(
        "https://crudcrud.com/api/8006f873ec4746e49a356fa6f66e1ebb/Registration/" +
          maps.get(i)
      )
      .then((res) => {
        displayDetails(res.data.email, res.data.Name);
      });
    }
  })
}

loadUsers()
// Dispalay Details

function displayDetails(email, UserName) {
  let table = document.querySelector(".table");
  let row = document.createElement("tr");

  row.innerHTML = `
<td>${UserName}</td>
<td>${email}</td>
<td>
<button class="btn btn-danger btn-delete">Delete</button>
<button class="btn btn-danger btn-edit">Edit</button>
</td>
`;
  table.appendChild(row);
}
