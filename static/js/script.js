document.addEventListener("DOMContentLoaded", function() {
    //EVENT LISTNERS
    //event listner for 'enter' keyboard presses
    document.addEventListener("keydown", function(e) {
        if (e.code == "Enter") {
            document.activeElement.click();
    }});
    //prevent implicit form submission on pressing enter
    const signupForm = document.querySelector('[name="signup-form"]');
    signupForm.addEventListener("keydown", function(e) {
        if (e.code == "Enter") {
            e.preventDefault();
        }
    });
    //activate sign-in form
    document.addEventListener("click", function(e){
        const target = e.target.closest("#singin-click");
        if(target){
            signInShow();
        }
    });
    //show sign-in form
    function signInShow() {
        document.getElementById('signin-form').style.display = "block";
    }

    //move on from part one of sign up process
    document.addEventListener("click", function(e){
        const target = e.target.closest("#part-one");
        if(target){
            partOneHide();
        }
    });

    //activates function to add an interest to the interests array in the value field
    document.addEventListener("click", function(e){
        const target = e.target.closest("#add-interest");
        if(target){
            addInterest();
        }
    });
    //moves on to the skills section
    document.addEventListener("click", function(e){
        const target = e.target.closest("#end-interests"); 
        if(target){
            endInterests();
        }
    });
    //activates function to add a skill to the skills array in the value field
    document.addEventListener("click", function(e){
        const target = e.target.closest("#add-skill"); 
        if(target){
            addSkill();
        }
    });
    //moves on to the experiences section
    document.addEventListener("click", function(e){
        const target = e.target.closest("#end-skills"); 
        if(target){
            endSkills();
        }
    });
    //activates function to add an experience to the experiences array in the value field
    document.addEventListener("click", function(e){
        const target = e.target.closest("#add-experience"); 
        if(target){
            addExperience();
        }
    });

    //validates fields in part one of sign up, hides part one and shows part two.
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
            const setName = document.getElementsByClassName('sayMyName');
            for (let i = 0; i < setName.length; i++) {
                setName[i].innerHTML = firstName + " " + lastName;
            }
            document.getElementById('signup-two').style.display = "block";
            document.getElementById('signup-one').style.display = "none";
        }
    }
    // adds interests to an array and populates the value field of the form
    const interests = [];
    function addInterest() {
        document.getElementById('form-alert').style.display = "none";
        let interest = document.getElementById('interest-add').value.toLowerCase();
        if (interest.match(/\d/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "Interest should not include numbers";
        } else if (interest.match(/[^a-zA-Z\d]/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "Interest should not contain special characters";
        } else {
            interests.push(interest)
        }
        document.getElementById('interest-add').value = "";
        document.getElementById('interests').style.display = "block";
        document.getElementById('interests').value = interests;
        if (interests.length > 0) {
            document.getElementById('end-interests').style.display = "block";
        }
    }
    //adjusts the DOM to display skills section
    function endInterests() {
        document.getElementById('interests-section').style.display = "none";
        document.getElementById('skills-section').style.display = "block";
    }
    //adds skillss to an array and populates the value field of the form
    const skills = [];
    function addSkill() {
        document.getElementById('form-alert').style.display = "none";
        let skill = document.getElementById('skill-add').value.toLowerCase();
        if (skill.match(/\d/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "Skill should not include numbers";
        } else if (skill.match(/[^a-zA-Z\d]/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "Skill should not contain special characters";
        } else {
            skills.push(skill)
        }
        document.getElementById('skill-add').value = "";
        document.getElementById('skills').style.display = "block";
        document.getElementById('skills').value = skills;
        if (skills.length > 0) {
            document.getElementById('end-skills').style.display = "block";
        }
    }
    //adjusts the DOM to display experiecnes section
    function endSkills() {
        document.getElementById('skills-section').style.display = "none";
        document.getElementById('experiences-section').style.display = "block";
    }
    //adds experiences to an array and populates the value field of the form
    const experiences = [];
    function addExperience() {
        document.getElementById('form-alert').style.display = "none";
        let experience = document.getElementById('experience-add').value.toLowerCase();
        if (experience.match(/\d/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "experience should not include numbers";
        } else if (experience.match(/[^a-zA-Z\d]/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "experience should not contain special characters";
        } else {
            experiences.push(experience)
        }
        document.getElementById('experience-add').value = "";
        document.getElementById('experiences').style.display = "block";
        document.getElementById('experiences').value = experiences;
        if (experiences.length > 0) {
            document.getElementById('submit-everything').removeAttribute("disabled", "");
            document.getElementById('submit-everything').style.display = "block";
        }
    }

    //previews image during sign-in user journey
    const imageUpload= document.getElementById('profile_picture');
    const previewPhoto = () => {
        const previewPic = imageUpload.files;
        if (previewPic) {
            const fileReader = new FileReader();
            const preview = document.getElementById('profile_preview');
            fileReader.onload = function (event) {
                preview.setAttribute('src', event.target.result);
            }
            fileReader.readAsDataURL(previewPic[0]);
        }
    }
    if (imageUpload) {
        imageUpload.addEventListener("change", previewPhoto);
    }
});