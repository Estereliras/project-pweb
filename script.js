// Validate from inputs before submit data
function validateForm(){
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var kelas = document.getElementById("kelas").value;
    var email = document.getElementById("email").value;

    if(name == ""){
        alert("Name is required");
        return false;
    }

    if(age == ""){
        alert("Age is required");
        return false;
    }
    else if(age < 1){
        alert("Age must not be zero or less than zero");
    }

    if(kelas ==""){
        alert("Class is required");
        return false;
    }

    if(email ==""){
        alert("Email is required");
        return false;
    }
    else if(!email.includes("@")) {
        alert("Invalid email address");
        return false;
    }

    return true;
}


// function to show Data
function showData(){
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";

    peopleList.forEach(function (element, index){
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.kelas + "</td>";
        html += "<td>" + element.email + "</td>";
        html += 
            '<td><button onclick="deleteData(' +
            index +
            ')" class="btn btn-danger">Delete</button><button onclick="updateData(' +
            index +
            ')" class="btn btn-warning m-2">Edit</button></td>';
        html +="<tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = 
    html;
}

// Loads All data when document or page loaded
document.onload = showData();

// function to add data

function AddData(){
    // if form is validate
    if(validateForm() == true){
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var kelas = document.getElementById("kelas").value; // Fix typo here
        var email = document.getElementById("email").value;

        var peopleList;
        if(localStorage.getItem("peopleList") == null){
            peopleList = [];
        }
        else{
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }    

        peopleList.push({
            name : name,
            age: age,
            kelas: kelas, 
            email: email,
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("kelas").value = "";
        document.getElementById("email").value = "";
    }
}


// function to delete Data from local storage
function deleteData(index){
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

function updateData(index) {
    // Submit button will hide and Update button will show for updating of Data in local storage
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block"; // Correct typo

    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    } else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("kelas").value = peopleList[index].kelas;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#Update").onclick = function() {
        if(validateForm() == true){
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].kelas = document.getElementById("kelas").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("kelas").value = "";
            document.getElementById("email").value = "";

            // Submit button will hide and Submit button will show for updating of Data in local storage
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', function () {
  const searchTerm = searchInput.value.toLowerCase();
  const tableRows = document.querySelectorAll('#crudTable tbody tr');

  for (const row of tableRows) {
    const nameCell = row.getElementsByTagName('td')[0];
    const nameText = nameCell.textContent.toLowerCase();

    if (!nameText.includes(searchTerm)) {
      row.style.display = 'none';
    } else {
      row.style.display = 'table-row';
    }
  }
});

searchButton.style.float = 'right';

