//------------OBJECTS-------------//

const currentValues = {
    firstName: "",
    lastName: "",
    email:"",
    dreamName:"",
    dreamDescription:""
}

const currentInfo = {
    interests:"",
    skills:"",
    experiences:""
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
        const target = e.target.closest("#signin-click");
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
    //add event listners to all category buttons
    const attachCategoryListners= Array.from(document.getElementsByClassName('category-selector'));
    attachCategoryListners.forEach(item => {
        item.addEventListener('click', function handleClick(event) {
            const itemId = item.getAttribute('id');                
            addSignupCategory(itemId);
        });
    });
    
    //DREAMBUILDER DREAM CREATION PROCESS
    //move on from part one of dream-building process
    document.addEventListener("click", function(e){
        const target = e.target.closest("#dream-one");
        if(target){
            dreambuilderOneComplete();
        }
    });
    //activates function to add acategory to the categories array in the value field
    document.addEventListener("click", function(e){
        const target = e.target.closest("#add-category");
        if(target){
            addCategory();
        }
    });
    //moves on to the skills required section
    document.addEventListener("click", function(e){
        const target = e.target.closest("#end-categories"); 
        if(target){
            document.getElementById('category-section').style.display = "none";
            document.getElementById('skills-required').style.display = "block";
        }
    });
    //activates function to add a skill to the skills array in the value field
    document.addEventListener("click", function(e){
        const target = e.target.closest("#add-required-skill"); 
        if(target){
            addRequiredSkill();
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
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                document.getElementById('info-update').style.display = "block";
            }
        });
    }

    //Edit Preferences
    
    //attach event listners to all the edit buttons
    const attachPreferenceListners= Array.from(document.getElementsByClassName('a-preference'));
    attachPreferenceListners.forEach(item => {
        item.addEventListener('click', function handleClick(event) {
            const itemId = item.getAttribute('id');                
            updateSection(itemId);
        });
    });
    //select edit interests to reveal the fields for different interests
    document.addEventListener("click", function(e){
        const target = e.target.closest("#interests-edit"); 
        if(target){
            editInterests();
        }
    });
    //select edit skills to reveal the fields for different skills
    document.addEventListener("click", function(e){
        const target = e.target.closest("#skills-edit"); 
        if(target){
            editSkills();
        }
    });
    document.addEventListener("click", function(e){
        const target = e.target.closest("#experiences-edit"); 
        if(target){
            editExperiences();
        }
    });
    //view add interest field
    document.addEventListener("click", function(e){
        const target = e.target.closest("#add-new-interest"); 
        if(target){
            document.getElementById('add-interest-field').style.display = "inline-block";
        }
    });
    //add another interest
    document.addEventListener("click", function(e){
        const target = e.target.closest("#add-this-interest"); 
        if(target){
            addAnInterest();
        }
    });
    //view add skill field
    document.addEventListener("click", function(e){
        const target = e.target.closest("#add-new-skill"); 
        if(target){
            document.getElementById('add-skill-field').style.display = "inline-block";
        }
    });
    //add another skill
    document.addEventListener("click", function(e){
        const target = e.target.closest("#add-this-skill"); 
        if(target){
            addNewSkill();
        }
    });
     //view add experience field
    document.addEventListener("click", function(e){
        const target = e.target.closest("#add-new-experience"); 
        if(target){
            document.getElementById('add-experience-field').style.display = "inline-block";
        }
    });
    //add another experience
    document.addEventListener("click", function(e){
        const target = e.target.closest("#add-this-experience"); 
        if(target){
            addNewExperience();
        }
    });

    //Edit dream (general info)

    //activate dream name field + commit change button (use a tick / cross)
    document.addEventListener("click", function(e){
        const target = e.target.closest("#dream-name-edit"); 
        if(target){
            editDreamName();
        }
    });
    //commit dream name change (on clicking tick)
    document.addEventListener("click", function(e){
        const target = e.target.closest("#dream-name-confirm"); 
        if(target){
            confirmDreamName();
        }
    });
    //cancel dream name change (on clicking cross)
    document.addEventListener("click", function(e){
        const target = e.target.closest("#dream-name-cancel"); 
        if(target){
            cancelDreamName();
        }
    });
    //activate dream description field + commit change button (use a tick / cross)
    document.addEventListener("click", function(e){
        const target = e.target.closest("#dream-description-edit"); 
        if(target){
            editDreamDescription();
        }
    });
    //commit dream description change (on clicking tick)
    document.addEventListener("click", function(e){
        const target = e.target.closest("#dream-description-confirm"); 
        if(target){
            confirmDreamDescription();
        }
    });
    //cancel dream description change (on clicking cross)
    document.addEventListener("click", function(e){
        const target = e.target.closest("#dream-description-cancel"); 
        if(target){
            cancelDreamDescription();
        }
    });
    //display edit category section
    document.addEventListener("click", function(e){
        const target = e.target.closest("#categories-edit"); 
        if(target){
            editCategories();
        }
    });
    //display edit required skills section
    document.addEventListener("click", function(e){
        const target = e.target.closest("#required-edit"); 
        if(target){
            editSkillsRequired();
        }
    });
    //view add category field
    document.addEventListener("click", function(e){
        const target = e.target.closest("#add-new-category"); 
        if(target){
            document.getElementById('add-category-field').style.display = "inline-block";
        }
    });
    //add another category
    document.addEventListener("click", function(e){
        const target = e.target.closest("#add-this-category"); 
        if(target){
            addNewCategory();
        }
    });
    //view add skill required field
    document.addEventListener("click", function(e){
        const target = e.target.closest("#add-new-required"); 
        if(target){
            document.getElementById('add-required-field').style.display = "inline-block";
        }
    });
    //add another required skill
    document.addEventListener("click", function(e){
        const target = e.target.closest("#add-this-required"); 
        if(target){
            addNewSkillRequired();
        }
    });

    //DREAMSCAPE
    //add event listners to all add comment buttons
    const attachCommentListners= Array.from(document.getElementsByClassName('add-comment'));
    attachCommentListners.forEach(item => {
        item.addEventListener('click', function handleClick(event) {
            const itemId = item.getAttribute('id');                
            addComment(itemId);
        });
    });
    //add event listners to all edit comment buttons
    const attachCommentEditListners= Array.from(document.getElementsByClassName('edit-comment'));
    attachCommentEditListners.forEach(item => {
        item.addEventListener('click', function handleClick(event) {
            const itemId = item.getAttribute('id');                
            editComment(itemId);
        });
    });
    //add event listners to all cancel comment buttons
    const attachCommentCancelListners= Array.from(document.getElementsByClassName('cancel-comment'));
    attachCommentCancelListners.forEach(item => {
        item.addEventListener('click', function handleClick(event) {
            const itemId = item.getAttribute('id');                
            editComment(itemId);
        });
    });

    

    //------------ACTIONS-------------//
    
    //SIGN IN
    //show sign-in form
    function signInShow() {
        document.getElementById('signin-form').style.display = "block";
        document.getElementById('signin-click').style.display = "none";
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
    //if signup category clicked on
    function addSignupCategory(itemId) {
        if (document.getElementById(itemId).style.backgroundColor === "green") {
            document.getElementById(itemId).style.backgroundColor = "grey";
            document.getElementById(itemId).style.color = "black";
            document.getElementById(itemId).style.borderColor = "grey";
            oldText = document.getElementById("selected-categories").value;
            newText = oldText.replace(itemId+ "," ,'');
            document.getElementById("selected-categories").value = newText;
            console.log(document.getElementById("selected-categories").value);        
        } else {
            document.getElementById(itemId).style.backgroundColor = "green";
            document.getElementById(itemId).style.color = "white";
            document.getElementById(itemId).style.borderColor = "white";
            document.getElementById("selected-categories").value += itemId + ",";
            console.log(document.getElementById("selected-categories").value);
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

    //DREAMBUILDER DREAM CREATION PROCESS

    function dreambuilderOneComplete() {
        let dreamName = document.getElementById('dream_name').value;
        let dreamDescription = document.getElementById('dream_description').value;
        let invalidDreamText = /[.!#$%;@&'*+/=?^_`{|}~]/
        let invalidDescriptionText= /[#@&^_`{|}~]/;
        if (dreamName.match(invalidDreamText)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "Please don't use special characters in your Dream Name.  <br>Perhaps your next dream could be to one day be able to do this";
        } else if (dreamDescription.match(invalidDescriptionText)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "Please don't use the following characters in the description: {},[],#,@,&,^,_,`,~, or |.  <br>Perhaps your next dream could be to one day be able to do this";
        } else {
            document.getElementById('form-alert').style.display = "none";
            const setDream = document.getElementsByClassName('sayMyDream');
            for (let i = 0; i < setDream.length; i++) {
                setDream[i].innerHTML = dreamName;
            }
            document.getElementById('dreambuilder-two').style.display = "block";
            document.getElementById('dreambuilder-one').style.display = "none";
        }
    }
    const categories = [];
    function addCategory() {
        document.getElementById('form-alert').style.display = "none";
        let category= document.getElementById('category-add').value.toLowerCase();
        if (category.match(/\d/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "Category should not include numbers";
        } else if (category.match(/[.!#$%;@&'*+/=?^_` {|}~]/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "Category should not contain should not contain spaces or special characters<br>Use a hyphen instead of spaces!";
        } else {
            categories.push(category)
        }
        document.getElementById('category-add').value = "";
        document.getElementById('categories').style.display = "block";
        document.getElementById('categories').value = categories;
        if (categories.length > 0) {
            document.getElementById('end-categories').style.display = "block";
        }
    }
    const requiredSkills = [];
    function addRequiredSkill() {
        document.getElementById('form-alert').style.display = "none";
        let skillRequired = document.getElementById('required-skill-add').value.toLowerCase();
        if (skillRequired.match(/\d/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "Skill Required should not include numbers";
        } else if (skillRequired.match(/[.!#$%;@&'*+/=?^_` {|}~]/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "Skill Required should not contain should not contain spaces or special characters<br>Use a hyphen instead of spaces!";
        } else {
            requiredSkills.push(skillRequired)
        }
        document.getElementById('required-skill-add').value = "";
        document.getElementById('skills_required').style.display = "block";
        document.getElementById('skills_required').value = requiredSkills;
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
        if (!currentValues.firstName) {
            currentValues.firstName = document.getElementById('first-name').value;
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
        if (currentValues.firstName) {
            document.getElementById('first-name').value = currentValues.firstName;
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
        if (!currentValues.lastName) {
            currentValues.lastName = document.getElementById('last-name').value;
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
        if (currentValues.lastName) {
            document.getElementById('last-name').value = currentValues.lastName;
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
        if (!currentValues.email) {
            currentValues.email = document.getElementById('email').value;
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
        document.getElementById('email').value = currentValues.email;
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

    //EDIT SITE PREFERENCES
    //reveal list of skills to edit    
    function editInterests() {
        //prepare DOM
        document.getElementById('preference-options').style.display="block";
        document.getElementById('individual-interests').style.display="block";
        document.getElementById('select-edit-section').style.display="none";     
    }
    function editSkills() {
        //prepare DOM
        document.getElementById('preference-options').style.display="block";
        document.getElementById('individual-skills').style.display="block";
        document.getElementById('select-edit-section').style.display="none";     
    }
    function editExperiences() {
        //prepare DOM
        document.getElementById('preference-options').style.display="block";
        document.getElementById('individual-experiences').style.display="block";
        document.getElementById('select-edit-section').style.display="none";     
    }
    //handle the click to update the selected section.
    function updateSection(itemId) {
        const selectedSection = itemId.split('-')[0];
        const selectedIndex = Number(itemId.split('-')[1]);        
        const selectedOption = itemId.split('-')[2];
        const selectedElement = selectedSection + "-" + selectedIndex;
        const initialArray = document.getElementById("initial-" + selectedSection).value.split(',');
        currentInfo.selectedSection = initialArray;
        if (selectedOption == "edit") {
            document.getElementById(selectedElement).readOnly =false;
            document.getElementById(itemId).style.display = "none";
            document.getElementById(selectedElement + '-confirm').style.display = "inline-block";
            document.getElementById(selectedElement + '-cancel').style.display = "inline-block";
        }
        if (selectedOption == "confirm") {
            let newPreference = document.getElementById(selectedElement).value.toLowerCase();
            if (newPreference.match(/\d/)) {
                document.getElementById('form-alert').style.display = "block";
                document.getElementById('form-alert').innerHTML = "Interest should not include numbers";
            } else if (newPreference.match(/[.!#$%;@&'*+/=?^_` {|}~]/)) {
                document.getElementById('form-alert').style.display = "block";
                document.getElementById('form-alert').innerHTML = "Interest should not contain special characters<br>Use a hyphen instead of spaces!";
            } else {
                document.getElementById(selectedElement).readOnly = true;
                document.getElementById(selectedElement + '-edit').style.display = "inline-block";
                document.getElementById(itemId).style.display = "none";
                document.getElementById('form-alert').style.display = "none";
                arrayUpdate = document.getElementById(selectedSection).value.split(',')
                arrayUpdate[selectedIndex] = document.getElementById(selectedElement).value;
                document.getElementById(selectedSection).value = arrayUpdate;
            }
        }
        if (selectedOption == "cancel") {
            document.getElementById(selectedElement).readOnly = true;
            document.getElementById(selectedElement + '-edit').style.display = "inline-block";
            document.getElementById(selectedElement + '-delete').style.display = "inline-block";
            document.getElementById(itemId).style.display = "none";
            document.getElementById(selectedElement + '-confirm').style.display = "none";
            document.getElementById(selectedElement).value = initialArray[selectedIndex];
            document.getElementById(selectedSection).value = initialArray;
            document.getElementById('form-alert').style.display = "none";
        }
        if (selectedOption == "delete") {
            document.getElementById(selectedElement).readOnly = true;            
            if (document.getElementById(selectedElement).style.textDecoration == "") {
                document.getElementById(selectedElement).style.textDecoration = "line-through";
            } else if (document.getElementById(selectedElement).style.textDecoration == "line-through") {
                document.getElementById(selectedElement).style.textDecoration = "";
            } 
        }
    }
    //Add an interest
    function addAnInterest() {
        let newInterest = document.getElementById('new-interest-add').value.toLowerCase();
        let currentInterests= document.getElementById("interests").value.split(',');
        if (newInterest.match(/\d/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "Interest should not include numbers";
        } else if (newInterest.match(/[.!#$%;@&'*+/=?^_` {|}~]/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "Interest should not contain special characters.<br>Use a hyphen instead of spaces!";
        } else if (newInterest == "") {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "You must write something in the field. <br>Throw me a bone here.";
        } else {
            currentInterests.push(newInterest);
            document.getElementById("interests").value = currentInterests;
            let newDiv = document.createElement("div");
            newDiv.className="new-interest";
            newDiv.innerHTML=newInterest;
            document.getElementById("new-interests").append(newDiv);
            document.getElementById('new-interest-add').value = "";
            document.getElementById('new-interests-title').style.display="block";
            const addLine = document.getElementsByClassName('profile-update');
            for (let i = 0; i < addLine.length; i++) {
                addLine[i].style.display = "block";
            }
        }
    }
    function addNewSkill() {
        let newSkill = document.getElementById('new-skill-add').value.toLowerCase();
        let currentSkills= document.getElementById("skills").value.split(',');
        if (newSkill.match(/\d/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "Skill should not include numbers";
        } else if (newSkill.match(/[.!#$%;@&'*+/=?^_` {|}~]/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "Skill should not contain special characters. <br>Use a hyphen instead of spaces!";
        } else if (newSkill == "") {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "You must write something in the field. <br>Throw me a bone here.";
        } else {
            currentSkills.push(newSkill);
            document.getElementById("skills").value = currentSkills;
            let newDiv = document.createElement("div");
            newDiv.className="new-skill";
            newDiv.innerHTML=newSkill;
            document.getElementById("new-skills").append(newDiv);
            document.getElementById('new-skill-add').value = "";
            document.getElementById('new-skills-title').style.display="block";
            const addLine = document.getElementsByClassName('profile-update');
            for (let i = 0; i < addLine.length; i++) {
                addLine[i].style.display = "block";
            }
        }
    }
    function addNewExperience() {
        let newExperience = document.getElementById('new-experience-add').value.toLowerCase();
        let currentExperiences= document.getElementById("experiences").value.split(',');
        if (newExperience.match(/\d/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "Experience should not include numbers";
        } else if (newExperience.match(/[.!#$%;@&'*+/=?^_` {|}~]/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "Experience should not contain special characters. <br>Use a hyphen instead of spaces!";
        } else if (newExperience == "") {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "You must write something in the field. <br>Throw me a bone here.";
        } else {
            currentExperiences.push(newExperience);
            document.getElementById("experiences").value = currentExperiences;
            let newDiv = document.createElement("div");
            newDiv.className="new-experience";
            newDiv.innerHTML=newExperience;
            document.getElementById("new-experiences").append(newDiv);
            document.getElementById('new-experience-add').value = "";
            document.getElementById('new-experiences-title').style.display="block";
            const addLine = document.getElementsByClassName('profile-update');
            for (let i = 0; i < addLine.length; i++) {
                addLine[i].style.display = "block";
            }       
        }
    }

    //EDIT DREAM GENERAL
    //edit dream name
    function editDreamName() {        
        document.getElementById('dream-name').readOnly =false;
        document.getElementById('dream-name-edit').style.display = "none";
        document.getElementById('dream-description-edit').style.display = "none";
        document.getElementById('dream-name-confirm').style.display = "inline-block";
        document.getElementById('dream-name-cancel').style.display = "inline-block";
        if (!currentValues.dreamName) {
            currentValues.dreamName = document.getElementById('dream-name').value;
        }
    }
    //Committing dream name amends to field
    function confirmDreamName() {        
        document.getElementById('dream-name').readOnly =true;
        document.getElementById('dream-name-edit').style.display = "inline-block";
        document.getElementById('dream-description-edit').style.display = "inline-block";
        document.getElementById('dream-name-confirm').style.display = "none";
        document.getElementById('dream-name-cancel').style.display = "inline-block";
    }
    //cancelling any changes
    function cancelDreamName() {        
        document.getElementById('dream-name').readOnly =true;
        document.getElementById('dream-name-edit').style.display = "inline-block";
        document.getElementById('dream-description-edit').style.display = "inline-block";
        document.getElementById('dream-name-confirm').style.display = "none";
        document.getElementById('dream-name-cancel').style.display = "none";
        if (currentValues.dreamName) {
            document.getElementById('dream-name').value = currentValues.dreamName;
        }
    }
    //Editing last name
    function editDreamDescription() {        
        document.getElementById('dream-description').readOnly =false;
        document.getElementById('dream-name-edit').style.display = "none";
        document.getElementById('dream-description-edit').style.display = "none";
        document.getElementById('dream-description-confirm').style.display = "inline-block";
        document.getElementById('dream-description-cancel').style.display = "inline-block";
        if (!currentValues.dreamDescription) {
            currentValues.dreamDescription = document.getElementById('dream-description').value;
        }
    }
    //Committing dream description amends to field
    function confirmDreamDescription() {        
        document.getElementById('dream-description').readOnly =true;
        document.getElementById('dream-name-edit').style.display = "inline-block";
        document.getElementById('dream-description-edit').style.display = "inline-block";
        document.getElementById('dream-description-confirm').style.display = "none";
        document.getElementById('dream-description-cancel').style.display = "inline-block";
    }
    //Cancelling dream description update
    function cancelDreamDescription() {        
        document.getElementById('dream-description').readOnly =true;
        document.getElementById('dream-name-edit').style.display = "inline-block";
        document.getElementById('dream-description-edit').style.display = "inline-block";
        document.getElementById('dream-description-confirm').style.display = "none";
        document.getElementById('dream-description-cancel').style.display = "none";
        if (currentValues.dreamDescription) {
            document.getElementById('dream-description').value = currentValues.dreamDescription;
        }
    }

    //EDIT DREAM KEYWORDS
    function editCategories() {
        //prepare DOM
        document.getElementById('preference-options').style.display="block";
        document.getElementById('individual-categories').style.display="block";
        document.getElementById('select-edit-section').style.display="none";
    }
    function editSkillsRequired() {
        //prepare DOM
        document.getElementById('preference-options').style.display="block";
        document.getElementById('individual-required').style.display="block";
        document.getElementById('select-edit-section').style.display="none";     
    }
    function addNewCategory() {
        let newCategory = document.getElementById('new-category-add').value.toLowerCase();
        let currentCategories= document.getElementById("categories").value.split(',');
        if (newCategory.match(/\d/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "category should not include numbers";
        } else if (newCategory.match(/[.!#$%;@&'*+/=?^_` {|}~]/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "category should not contain special characters.<br>Use a hyphen instead of spaces!";
        } else if (newCategory == "") {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "You must write something in the field. <br>Throw me a bone here.";
        } else {
            currentCategories.push(newCategory);
            document.getElementById("categories").value = currentCategories;
            let newDiv = document.createElement("div");
            newDiv.className="new-category";
            newDiv.innerHTML=newCategory;
            document.getElementById("new-categories").append(newDiv);
            document.getElementById('new-category-add').value = "";
            document.getElementById('new-categories-title').style.display="block";
            const addLine = document.getElementsByClassName('profile-update');
            for (let i = 0; i < addLine.length; i++) {
                addLine[i].style.display = "block";
            }
        }
    }
    function addNewSkillRequired() {
        let newRequired = document.getElementById('new-required-add').value.toLowerCase();
        let currentRequired= document.getElementById("required").value.split(',');
        if (newRequired.match(/\d/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "skill required should not include numbers";
        } else if (newRequired.match(/[.!#$%;@&'*+/=?^_` {|}~]/)) {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "skill required should not contain special characters. <br>Use a hyphen instead of spaces!";
        } else if (newRequired == "") {
            document.getElementById('form-alert').style.display = "block";
            document.getElementById('form-alert').innerHTML = "You must write something in the field. <br>Throw me a bone here.";
        } else {
            currentRequired.push(newRequired);
            document.getElementById("required").value = currentRequired;
            let newDiv = document.createElement("div");
            newDiv.className="new-required";
            newDiv.innerHTML=newRequired;
            document.getElementById("new-required").append(newDiv);
            document.getElementById('new-required-add').value = "";
            document.getElementById('new-required-title').style.display="block";
            const addLine = document.getElementsByClassName('profile-update');
            for (let i = 0; i < addLine.length; i++) {
                addLine[i].style.display = "block";
            }
        }
    }

    //DREAMSCAPE
    //ensure following or unfollowing returns to dream the user followed/unfollowed
    if (document.getElementById('focussed-dream')) {
    document.getElementById('focussed-dream').focus();
    }
    //enable add comment box
    function addComment(itemId) {
        form= itemId + "-comment"
        document.getElementById(form).style.display="block";
    }
    //enable comment edit
    function editComment(itemId) {
        const selectedComment = itemId.split('-')[0];
        const clickType = itemId.split('-')[1];
        document.getElementById(selectedComment + "-cancel").style.display="inline-block";
        commentTextarea = selectedComment + "-display"
        document.getElementById(commentTextarea).readOnly =false;
        document.getElementById(commentTextarea).focus();
        document.getElementById(selectedComment + "-submit").style.display="block";
        const hideEdit = document.getElementsByClassName('edit-comment');
        for (let i = 0; i < hideEdit.length; i++) {
            hideEdit[i].style.display = "none";
        }
        if (clickType=="cancel") {
            for (let i = 0; i < hideEdit.length; i++) {
                hideEdit[i].style.display = "inline-block";
            }
            document.getElementById(selectedComment + "-submit").style.display="none";
            document.getElementById(commentTextarea).readOnly =true;
            document.getElementById(commentTextarea).value = document.getElementById(selectedComment + "-original").value;
            document.getElementById(selectedComment + "-cancel").style.display="none";
        }
    }

});
