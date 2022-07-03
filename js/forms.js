const url = "http://localhost:5000/enquiry";

function submitForm(e) {
  e.preventDefault();
  var checked = [];
  var checkboxes = document.getElementsByName("typeOfProject");
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checked.push(checkboxes[i].dataset.value);
    }
  }
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var projectBrief = document.getElementById("projectBrief").value;
  var projectBudget = document.getElementById("projectBudget").value;
  postData(url, {
    username: username,
    email: email,
    checked: checked,
    projectBrief: projectBrief,
    projectBudget: projectBudget,
  });
  return false;
}

const postData = async (url = "", data = {}) => {
  window.location = "/index.html";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.username,
      email: data.email,
      details: data.projectBrief,
      budget: data.projectBudget,
      requirements: data.checked,
    }),
  });

  try {
    console.log(await response.json());
  } catch (error) {
    console.log("error", error);
  }
};

var form = document.getElementById("queryForm");
form.addEventListener("submit", submitForm);
