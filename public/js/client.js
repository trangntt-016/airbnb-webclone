// Ajax for sign up form
let signUpForm = document.querySelector('#form-signUp');

signUpForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const formData = new FormData(signUpForm);

    let Params = {
        method:'POST',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            fname:formData.get('fname'),
            lname:formData.get('lname'),
            email: formData.get('email'),
            password: formData.get('password'),
            month:formData.get('month'),
            day:formData.get('day'),
            year:formData.get('year')
        })
    }

    fetch('/user/signup',Params).then(res=>res.json()).then(data=>{
        if(data.errors){
            var eM_msg = document.getElementById("errors-email");
            eM_msg.innerHTML = data.errors.email;
        }
        else if(data.status=='Success'){
            console.log('Sign up Successfully');
            window.location = data.redirect;
        }
    }).catch((err)=>{
        console.log(err);
    })
});


// Ajax for login Form
let logInForm = document.querySelector('#form-logIn');

logInForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const formData = new FormData(logInForm);
    
    let Params = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password'),
            url:window.location.href
        })
    }

    fetch('/user/login',Params)
    .then(res=>res.json())
    .then(data=>{
        // get errors from the user's controllers and display them
        var eM_msg =document.getElementById("logIn-email-errors");
        var pwd_msg =document.getElementById("logIn-pwd-errors");
        if(data.errors){
            if(data.errors.email){
                eM_msg.innerHTML = data.errors.email;
            }
            if(data.errors.password){
                pwd_msg.innerHTML = data.errors.password;
            }
        }
        else{
            if(data.isAdmin){
                window.location='/admin/dashboard';
            }
            else{
                window.location = window.location.href;
            }
            
        }
    })
    .catch(err=>{
        console.log(err);
    })
});