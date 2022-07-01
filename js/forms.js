const url = 'localhost:5000/enquiry'

function submitForm(e) {
    e.preventDefault();
    var checked = [];
    var checkboxes = document.getElementsByName('typeOfProject');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checked.push(checkboxes[i].dataset.value);
        }
    }
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var projectBrief = document.getElementById("projectBrief").value;
    var projectBudget = document.getElementById("projectBudget").value;
    postData('', { username: username, email: email, checked: checked, projectBrief: projectBrief, projectBudget: projectBudget })
    return false;
}

const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}


var form = document.getElementById("queryForm");
form.addEventListener("submit", submitForm);