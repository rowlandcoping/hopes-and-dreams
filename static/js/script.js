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
    //show more categories
    document.addEventListener("click", function(e){
        const target = e.target.closest("#show-more");
        if(target){
            showMore();
        }
    });
    //show all categories
    document.addEventListener("click", function(e){
        const target = e.target.closest("#show-all");
        if(target){
            showAll();
        }
    });
    //show fewer categories
    document.addEventListener("click", function(e){
        const target = e.target.closest("#show-fewer");
        if(target){
            showFewer();
        }
    });

    //EDIT PERSONAL INFO
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

    //EDIT DREAM (general info)
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

    //SIGN-UP/EDIT/DREAMBUILDER PROCESSES   
    //clears categories on page refresh
    if (document.getElementById("selected-categories")) {
        document.getElementById("selected-categories").value="";
    }
    //ensures buttons on edit page have appropriate styling based on current interests
    if (document.getElementById("initial-interests").value) {
        if (document.getElementById('show-all') || document.getElementById('show-more')) {
            document.getElementById('show-fewer').style.display = "block";
        } else {
            document.getElementById('show-fewer').style.display = "none";
        }
        buttonsArray = Array.from(document.getElementsByClassName('category-selector'));
        categoryButtons= buttonsArray.map(div => div.innerHTML);
        categorySelected = document.getElementById("initial-interests").value.split(",");
        for (let i = 0; i < categoryButtons.length; i++) {
            for (let j = 0; j < categorySelected.length; j++) {
                if (categoryButtons[i] === categorySelected[j]) {
                    document.getElementById(categoryButtons[i]).style.backgroundColor = "green";
                    document.getElementById(categoryButtons[i]).style.color = "white";
                    document.getElementById(categoryButtons[i]).style.borderColor = "white";
                    document.getElementById("selected-categories").value += categoryButtons[i] + ",";
                }
            }
        }
    }
    //changes colour of category when clicked and adds the category to the selected categories field
    function addSignupCategory(itemId) {
        if (document.getElementById(itemId).style.backgroundColor === "green") {
            document.getElementById(itemId).style.backgroundColor = "grey";
            document.getElementById(itemId).style.color = "black";
            document.getElementById(itemId).style.borderColor = "grey";
            oldText = document.getElementById("selected-categories").value;
            newText = oldText.replace(itemId+ "," ,'');
            document.getElementById("selected-categories").value = newText;
        } else {
            document.getElementById(itemId).style.backgroundColor = "green";
            document.getElementById(itemId).style.color = "white";
            document.getElementById(itemId).style.borderColor = "white";
            document.getElementById("selected-categories").value += itemId + ",";
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
            document.getElementById('profile-pic-cancel').style.display = "inline-block";
        }
    }
    if (imageUpload) {
        imageUpload.addEventListener("change", previewPhoto);
    }
    //shows more categories
    function showMore() {
        document.getElementById('show-fewer').style.display = "block";
        document.getElementById('categories-two').style.display = "block";
        document.getElementById('show-more').style.display = "none";
        document.getElementById('show-all').style.display = "block";
    }
    //shows all categories
    function showAll() {
        document.getElementById('show-fewer').style.display = "block";
        document.getElementById('categories-two').style.display = "block";
        document.getElementById('categories-custom').style.display = "block";
        document.getElementById('show-more').style.display = "none";
        document.getElementById('show-all').style.display = "none";
    }
    //shows fewer categories
    function showFewer() {
        if (document.getElementById('categories-custom').style.display != "none") {
            if (document.getElementById('show-all')) {
                document.getElementById('show-all').style.display = "block";
            }
            if (document.getElementById('show-all') || document.getElementById('show-more')) {
                document.getElementById('show-fewer').style.display = "block";
            }
            document.getElementById('categories-custom').style.display = "none"
        } else {
            if (document.getElementById('show-more')) {
                document.getElementById('show-more').style.display = "block";
            }
            document.getElementById('show-fewer').style.display = "none";
            document.getElementById('categories-two').style.display = "none";
        }        
    }    

    //EDITING PROFILE INFO    
    //cancel profile pic change 
    function cancelProfilePic() {
        document.getElementById('current-image').style.display="inline-block";
        document.getElementById('image-preview').style.display="none";
        document.getElementById('uploaded-image').value = "";
        document.getElementById('profile-pic-cancel').style.display = "none";
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
