// // SignUp Page
// Display DOB, MOB and YOB
const monthInShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  monthInLength = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

displayYOB = () => {

  var select = document.querySelector("#YOB");
  var year = new Date().getFullYear();
  for (let i = year; i >= 1950; i--) {
    let option = document.createElement("option");
    option.innerHTML = i;
    option.value = i;
    select.appendChild(option);
  }
}

displayMOB = () => {
  var select = document.querySelector("#MOB");
  for (let i = 0; i < 12; i++) {
    let option = document.createElement("option");
    option.innerHTML = monthInLength[i];
    option.value = monthInShort[i];
    select.appendChild(option);
  }
}

displayDOB = () => {
  var select = document.querySelector("#DOB");
  var check = document.querySelectorAll('#DOB option');
  for (let i = 1; i <= 31; i++) {
    let option = document.createElement("option");
    option.innerHTML = i;
    option.value = i;
    select.appendChild(option);
  }
}


function closeModal__signUp() {
  const signUpPage = document.querySelector('#signUpPage');
  signUpPage.style.display = 'none';
}


// put at the bottom to load the content of the page faster, because the scripts have to be downloaded and the content is only loaded after the scripts. 
function display_signUp() {
  let signUpPage = document.querySelector('#signUpPage');
  signUpPage.style.display = 'flex';
  displayYOB();
  displayMOB();
  displayDOB();
}


// LogIn Modal
// Close If Outside Click
function close_logIn(e) {
  // It looks abit messy now but I'll find a way to improve these snippets later. 
  // These code make sure it can be used in the header which is rendered in multiple pages, don't wanna have the error 'cannot find some DOM elemtns
  // Cannot use window.addEventListener because on detailedPlace Page, it has reserve button that opens the login modal when clicked.
  // Was trying to grab all of the DOM Elements that are not affected when logIn Modal pops up, then the others elements will be display:none
  const logInBtn = document.querySelector('#userHeadContainer');
  const logInModal = document.querySelector('#logInDiv');
  const logInDown = document.querySelector('#logIn-down');
  const iClass1 = document.querySelector('.fas.fa-bars');
  const iClass2 = document.querySelector('.fas.fa-user-circle');
  const form_email = document.querySelector('#email_login');
  const form_pwd = document.querySelector('#pwd_login');
  const submit_lI = document.querySelector('#submit-login');
  if ((e.target != logInBtn) && (e.target != logInDown) && (e.target != form_email) && (e.target != form_pwd) && (e.target != iClass1) && (e.target != iClass2)&&(e.target!=submit_lI)) {
    logInModal.setAttribute('style', 'display:none');
  }
}

function display_logIn() {
  let logInModal = document.querySelector('#logInDiv');
  logInModal.style.display = 'flex';
}



//validation
validate_fName = (fName, msg) => {

  if (fName === "" || fName === null) {
    msg.innerHTML = "First name should not be null"
  } else if (!(fName.match('^([a-zA-Z]){3,10}$'))) {
    msg.innerHTML = 'First name should be a single word including 3-10 characters, only alphabetic letters.'
  } else {
    msg.innerHTML = "";
  }
}

validate_lName = (lName, msg) => {
  if (lName === "" || lName === null) {
    msg.innerHTML = "Last name should not be null"
  } else if (!(lName.match('^([a-zA-Z]){3,10}$'))) {
    msg.innerHTML = 'Last name should be a single word including 3-10 characters, only alphabetic letters.'
  } else {
    msg.innerHTML = "";
  }
}

validate_eMail = (email, msg) => {
  if (email === "" || email === null) {
    msg.innerHTML = "Email should not be null"
  } else if (!(email.match('^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'))) {
    msg.innerHTML = 'Enter a valid email address'
  } else {
    msg.innerHTML = "";
  }
}

validate_pwd = (pwd, msg) => {
  if (pwd === "" || pwd === null) {
    msg.innerHTML = "Password should not be null"
  } else if (!(pwd.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,15}$'))) {
    msg.innerHTML = 'A password contains 8-15 characters, including at least 01 number,01 lowercase, 01 uppercase letter and no special characters'
  } else {
    msg.innerHTML = "";
  }
}

validate_birthday = (month, day, year,msg)=>{
  if(month === "" || month === null||day === "" || day === null||year === "" || year === null){
    msg.innerHTML = "Please select a valid birthday. You cannot leave it an empty place like that.";
  }
  else{
    var string = month + ' ' + day + ', ' + year;
    var birthday = new Date(string);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);
    if(age < 18){
      msg.innerHTML = "Hey kid, you need to be 18+ to sign up. Maybe can ask your parents or bro/sis to give you you a hand"
    }
  }

}

function validate_signup(e) {
  var fName = document.getElementById("firstname").value.trim();
  var fN_msg = document.getElementById("errors-fName");
  var lName = document.getElementById("lastname").value.trim();
  var lN_msg = document.getElementById("errors-lName");
  var email = document.getElementById("email_signup").value.trim();
  var eM_msg = document.getElementById("errors-email");
  var pwd = document.getElementById("pwd_signup").value;
  var pwd_msg = document.getElementById("errors-pwd");
  var month = document.querySelector("#MOB").value;
  var day = document.querySelector("#DOB").value;
  var year = document.querySelector("#YOB").value;
  var bd_msg = document.getElementById("errors-birthday");
  validate_fName(fName, fN_msg);
  validate_lName(lName, lN_msg);
  validate_eMail(email, eM_msg);
  validate_pwd(pwd, pwd_msg);
  validate_birthday(month, day, year, bd_msg);
  if (fN_msg.innerHTML != "" || lN_msg.innerHTML != "" || eM_msg.innerHTML != "" || pwd_msg.innerHTML != "") {
    e.preventDefault();
  }
}

function validate_login(e) {
  var email = document.getElementById("email_login").value.trim();
  var eM_msg = document.getElementById("logIn-email-errors");
  var pwd = document.getElementById("pwd_login").value;
  var pwd_msg = document.getElementById("logIn-pwd-errors");
  validate_eMail(email, eM_msg);
  validate_pwd(pwd, pwd_msg);
  if (eM_msg.innerHTML != "" || pwd_msg.innerHTML != "") {
    e.preventDefault();
  }
}