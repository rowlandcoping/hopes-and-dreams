document.addEventListener("click", function(e){
    const target = e.target.closest("#part-one"); 
    if(target){
        partOneHide();
    }
});
function partOneHide() {
    let firstName = document.getElementById('first_name').value;
    let lastName = document.getElementById('last_name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let validEmail= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!firstName || !lastName) {
        document.getElementById('form-alert').style.display = "block";
        document.getElementById('form-alert').innerHTML = "You need to fill out your name";
    } else if (!email.match(validEmail)){
        document.getElementById('form-alert').style.display = "block";
        document.getElementById('form-alert').innerHTML = "You need to fill out a valid e-mail address";
    } else if (password.length < 8) {
        document.getElementById('form-alert').style.display = "block";
        document.getElementById('form-alert').innerHTML = "Password must be at least 8 characters";
    } else if (!password.match(/[a-z]/) || !password.match(/[A-Z]/)) {
        document.getElementById('form-alert').style.display = "block";
        document.getElementById('form-alert').innerHTML = "Password must have both uppercase and lowercase letters";
    } else if (!password.match(/\d/)) {
        document.getElementById('form-alert').style.display = "block";
        document.getElementById('form-alert').innerHTML = "Password must include at least one number";
    } else {
        document.getElementById('form-alert').style.display = "none";
        document.getElementById('sayMyName').innerHTML = firstName + " " + lastName;
        document.getElementById('signup-two').style.display = "block";
        document.getElementById('signup-one').style.display = "none";
    }
}
