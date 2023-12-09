//------------OBJECTS-------------//

const currentPersonal = {
    firstName: "",
    lastName: "",
    email:""
}

document.addEventListener("DOMContentLoaded", function() {

    //-------------EVENT LISTNERS--------------//

    //EVERYWHERE
    //event listner for 'enter' keyboard presses
    document.addEventListener("keydown", function(e) {
        if (e.code == "Enter") {
            document.activeElement.click();
    }});    
    //prevent implicit form submission on pressing enter
    const signupForm = document.querySelector('[name="signup-form"]');
    if (signupForm) {
            signupForm.addEventListener("keydown", function(e) {
            if (e.code == "Enter") {
                e.preventDefault();
            }
    
        });
    }

    //SIGN-IN FORM
    //activate sign-in form
    document.addEventListener("click", function(e){
        const target = e.target.closest("#singin-click");
        if(target){
            signInShow();
        }
    });

    //SIGN-UP PROCESS
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

    //EDIT PERSONAL INFO
    //activate first name field + commit change button (use a tick / cross)
    document.addEventListener("click", function(e){
        const target = e.target.closest("#first-name-edit"); 
        if(target){
            editFirst();
        }
    });
    //commit first name change (on clicking tick)
    document.addEventListener("click", function(e){
        const target = e.target.closest("#first-name-confirm"); 
        if(target){
            confirmFirst();
        }
    });
    //cancel first name change (on clicking cross)
    document.addEventListener("click", function(e){
        const target = e.target.closest("#first-name-cancel"); 
        if(target){
            cancelFirst();
        }
    });
    //activate last name field + commit change button (use a tick / cross)
    document.addEventListener("click", function(e){
        const target = e.target.closest("#last-name-edit"); 
        if(target){
            editLast();
        }
    });
    //commit last name change (on clicking tick)
    document.addEventListener("click", function(e){
        const target = e.target.closest("#last-name-confirm"); 
        if(target){
            confirmLast();
        }
    });
    //cancel last name change (on clicking cross)
    document.addEventListener("click", function(e){
        const target = e.target.closest("#last-name-cancel"); 
        if(target){
            cancelLast();
        }
    });
    //activate email name field + commit change button (use a tick / cross)
    document.addEventListener("click", function(e){
        const target = e.target.closest("#email-edit"); 
        if(target){
            editEmail();
        }
    });
    //commit email name change (on clicking tick)
    document.addEventListener("click", function(e){
        const target = e.target.closest("#email-confirm"); 
        if(target){
            confirmEmail();
        }
    });
    //cancel email name change (on clicking cross)
    document.addEventListener("click", function(e){
        const target = e.target.closest("#email-cancel"); 
        if(target){
            cancelEmail();
        }
    });
    //activate image upload field
    document.addEventListener("click", function(e){
        const target = e.target.closest("#profile-pic-edit"); 
        if(target){
            editProfilePic();
        }
    });
    //cancel image edit(NB for edit using existing event listner)
    document.addEventListener("click", function(e){
        const target = e.target.closest("#profile-pic-cancel"); 
        if(target){
            cancelProfilePic();
        }
    });
    //check image remove box
    const checkbox = document.querySelector("input[name=delete_image]");

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('info-update').style.display = "block";
        } 
    });
    

    //------------ACTIONS-------------//
    
    //SIGN IN
    //show sign-in form
    function signInShow() {
        document.getElementById('signin-form').style.display = "block";
    }

    //SIGN-UP PROCESS
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
        } else if (interest.match(/[^a-z -A-Z]/)) {
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
        } else if (skill.match(/[^a-z -A-Z]/)) {
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
        } else if (experience.match(/[^a-z -A-Z]/)) {
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
    //previews images due for upload
    const imageUpload= document.getElementById('uploaded-image');
    const previewPhoto = () => {
        const previewPic = imageUpload.files;
        if (previewPic) {
            const fileReader = new FileReader();
            const preview = document.getElementById('image-preview');
            fileReader.onload = function (event) {
                preview.setAttribute('src', event.target.result);
            }
            fileReader.readAsDataURL(previewPic[0]);
            document.getElementById('current-image').style.display="none";
            document.getElementById('image-preview').style.display="inline-block";
            document.getElementById('info-update').style.display = "block";
        }
    }
    if (imageUpload) {
        imageUpload.addEventListener("change", previewPhoto);
    }

    //EDITING PROFILE INFO    
    //Editing first name
    function editFirst() {        
        document.getElementById('first-name').readOnly =false;
        document.getElementById('first-name-edit').style.display = "none";
        document.getElementById('last-name-edit').style.display = "none";
        document.getElementById('email-edit').style.display = "none";
        document.getElementById('first-name-confirm').style.display = "inline-block";
        document.getElementById('first-name-cancel').style.display = "inline-block";
        if (!currentPersonal.firstName) {
            currentPersonal.firstName = document.getElementById('first-name').value;
        }
    }
    //Committing first name to field
    function confirmFirst() {        
        document.getElementById('first-name').readOnly = true;
        document.getElementById('first-name-edit').style.display = "inline-block";
        document.getElementById('last-name-edit').style.display = "inline-block";
        document.getElementById('email-edit').style.display = "inline-block";
        document.getElementById('first-name-confirm').style.display = "none";
        document.getElementById('info-update').style.display = "block";
    }
    //Cancelling first name update
    function cancelFirst() {        
        document.getElementById('first-name').readOnly = true;
        document.getElementById('first-name-edit').style.display = "inline-block";
        document.getElementById('last-name-edit').style.display = "inline-block";
        document.getElementById('email-edit').style.display = "inline-block";
        document.getElementById('first-name-confirm').style.display = "none";
        document.getElementById('first-name-cancel').style.display = "none";
        if (currentPersonal.firstName) {
            document.getElementById('first-name').value = currentPersonal.firstName;
        }
    }
    //Editing last name
    function editLast() {        
        document.getElementById('last-name').readOnly =false;
        document.getElementById('first-name-edit').style.display = "none";
        document.getElementById('last-name-edit').style.display = "none";
        document.getElementById('email-edit').style.display = "none";
        document.getElementById('last-name-confirm').style.display = "inline-block";
        document.getElementById('last-name-cancel').style.display = "inline-block";
        if (!currentPersonal.lastName) {
            currentPersonal.lastName = document.getElementById('last-name').value;
        }
    }
    //Committing last name to field
    function confirmLast() {        
        document.getElementById('last-name').readOnly = true;
        document.getElementById('first-name-edit').style.display = "inline-block";
        document.getElementById('last-name-edit').style.display = "inline-block";
        document.getElementById('email-edit').style.display = "inline-block";
        document.getElementById('last-name-confirm').style.display = "none";
        document.getElementById('info-update').style.display = "block";
    }
    //Cancelling last name update
    function cancelLast() {        
        document.getElementById('last-name').readOnly = true;
        document.getElementById('first-name-edit').style.display = "inline-block";
        document.getElementById('last-name-edit').style.display = "inline-block";
        document.getElementById('email-edit').style.display = "inline-block";
        document.getElementById('last-name-confirm').style.display = "none";
        document.getElementById('last-name-cancel').style.display = "none";
        if (currentPersonal.lastName) {
            document.getElementById('last-name').value = currentPersonal.lastName;
        }
    }
    //Editing email name
    function editEmail() {        
        document.getElementById('email').readOnly =false;
        document.getElementById('first-name-edit').style.display = "none";
        document.getElementById('last-name-edit').style.display = "none";
        document.getElementById('email-edit').style.display = "none";
        document.getElementById('email-confirm').style.display = "inline-block";
        document.getElementById('email-cancel').style.display = "inline-block";
        if (!currentPersonal.email) {
            currentPersonal.email = document.getElementById('email').value;
        }
    }
    //Committing email name to field
    function confirmEmail() { 
        let validEmail= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (document.getElementById('email').value.match(validEmail)){
            document.getElementById('email').readOnly = true;
            document.getElementById('form-alert').style.display = "none";
            document.getElementById('first-name-edit').style.display = "inline-block";
            document.getElementById('last-name-edit').style.display = "inline-block";
            document.getElementById('email-edit').style.display = "inline-block";
            document.getElementById('email-confirm').style.display = "none";
            document.getElementById('info-update').style.display = "block";
        } else {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "This e-mail address is not valid";
        }
    }
    //Cancelling email name update
    function cancelEmail() {        
        document.getElementById('email').readOnly = true;
        document.getElementById('form-alert').style.display = "none";
        document.getElementById('first-name-edit').style.display = "inline-block";
        document.getElementById('last-name-edit').style.display = "inline-block";
        document.getElementById('email-edit').style.display = "inline-block";
        document.getElementById('email-confirm').style.display = "none";
        document.getElementById('email-cancel').style.display = "none";
        if (currentPersonal.lastName) {
            document.getElementById('email').value = currentPersonal.email;
        }

    }
    //editing profile picture
    function editProfilePic() {
        document.getElementById('uploaded-image').style.display = "inline-block";
        document.getElementById('profile-pic-edit').style.display = "none";
        document.getElementById('profile-pic-cancel').style.display = "inline-block";
    }
    //cancel profile pic change 
    function cancelProfilePic() {
        document.getElementById('profile-pic-edit').style.display = "inline-block";
        document.getElementById('current-image').style.display="inline-block";
        document.getElementById('image-preview').style.display="none";
        document.getElementById('uploaded-image').value = "";
        document.getElementById('uploaded-image').style.display = "none";
        document.getElementById('profile-pic-cancel').style.display = "none";
    }
});