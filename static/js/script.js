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
    //add event listners to all category button clicks
    const attachCategoryListners= Array.from(document.getElementsByClassName('category-selector'));
    attachCategoryListners.forEach(item => {
        item.addEventListener('click', function handleClick(event) {
            const itemId = item.getAttribute('id');                
            addSignupCategory(itemId);
        });
    });

    //CATEGORY SELECTION PROCESSES
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
    //add mouseover effects
    const attachMouseoverListners= Array.from(document.getElementsByClassName('category-selector'));
    attachMouseoverListners.forEach(item => {
        item.addEventListener('mouseover', function handleClick(event) {
            const itemId = item.getAttribute('id');                
            categoryMouseover(itemId);
        });
    });
    //add mouseout effects
    const attachMouseoutListners= Array.from(document.getElementsByClassName('category-selector'));
    attachMouseoutListners.forEach(item => {
        item.addEventListener('mouseout', function handleClick(event) {
            const itemId = item.getAttribute('id');                
            categoryMouseout(itemId);
        });
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

    //DREAMS PAGE
    //attach event listners to all delete alerts
    const attachDeleteDreamListners= Array.from(document.getElementsByClassName('delete-dream'));
    attachDeleteDreamListners.forEach(item => {
        item.addEventListener('click', function handleClick(event) {
            const itemId = item.getAttribute('id');                
            deleteDream(itemId);
        });
    });
   

    //DREAMSCAPE/VIEW DREAM
    //add event listners to all add comment buttons
    const attachCommentListners= Array.from(document.getElementsByClassName('add-comment'));
    attachCommentListners.forEach(item => {
        item.addEventListener('click', function handleClick(event) {
            const itemId = item.getAttribute('id');                
            addComment(itemId);
        });
    });
    const attachAddCancelListners = Array.from(document.getElementsByClassName('cancel-add-comment'));
    attachAddCancelListners.forEach(item => {
        item.addEventListener('click', function handleClick(event) {
            const itemId = item.getAttribute('id');                
            cancelAddComment(itemId);
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
    //add event listneners to delete comment buttons
    const attachCommentDeleteListners= Array.from(document.getElementsByClassName('delete-comment'));
    attachCommentDeleteListners.forEach(item => {
        item.addEventListener('click', function handleClick(event) {
            const itemId = item.getAttribute('id');                
            deleteComment(itemId);
        });
    });
    //mouseover/out events for dreams icon & caption
    document.addEventListener("mouseover", function(e){
        const target = e.target.closest("#dreams-icon"); 
        if(target){
            mouseoverDreams();
        }
    });
    document.addEventListener("mouseover", function(e){
        const target = e.target.closest("#dreams-caption"); 
        if(target){
            mouseoverDreams();
        }
    });
    document.addEventListener("mouseout", function(e){
        const target = e.target.closest("#dreams-icon"); 
        if(target){
            mouseoutDreams();
        }
    });
    document.addEventListener("mouseout", function(e){
        const target = e.target.closest("#dreams-caption"); 
        if(target){            
            mouseoutDreams();
        }
    });
    
    //mouseover/out events for dreamscape icon & caption
    document.addEventListener("mouseover", function(e){
        const target = e.target.closest("#dreamscape-icon"); 
        if(target){
            mouseoverDreamscape();
        }
    });
    document.addEventListener("mouseover", function(e){
        const target = e.target.closest("#dreamscape-caption"); 
        if(target){
            mouseoverDreamscape();
        }
    });
    document.addEventListener("mouseout", function(e){
        const target = e.target.closest("#dreamscape-icon"); 
        if(target){
            mouseoutDreamscape();
        }
    });
    document.addEventListener("mouseout", function(e){
        const target = e.target.closest("#dreamscape-caption"); 
        if(target){
            mouseoutDreamscape();
        }
    });
    //mouseover/out events for profile icon & caption
    document.addEventListener("mouseover", function(e){
        const target = e.target.closest("#profile-icon"); 
        if(target){
            mouseoverProfile();
        }
    });
    document.addEventListener("mouseover", function(e){
        const target = e.target.closest("#profile-caption"); 
        if(target){
            mouseoverProfile();
        }
    });
    document.addEventListener("mouseout", function(e){
        const target = e.target.closest("#profile-icon"); 
        if(target){
            mouseoutProfile();
        }
    });
    document.addEventListener("mouseout", function(e){
        const target = e.target.closest("#profile-caption"); 
        if(target){
            mouseoutProfile();
        }
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
    if (document.getElementById("initial-interests")) {
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
        if (document.getElementById(itemId).style.color === "white") {
            document.getElementById(itemId).style.backgroundColor = "grey";
            document.getElementById(itemId).style.color = "black";
            document.getElementById(itemId).style.border = "2px solid rgb(53, 52, 52)";
            oldText = document.getElementById("selected-categories").value;
            newText = oldText.replace(itemId+ "," ,'');
            document.getElementById("selected-categories").value = newText;
        } else {
            document.getElementById(itemId).style.backgroundColor = "green";
            document.getElementById(itemId).style.color = "white";
            document.getElementById(itemId).style.border = "2px solid white";
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
            if (document.getElementById('current-image')) {
                document.getElementById('current-image').style.display="none";
            }
            document.getElementById('image-preview').style.display="inline-block";
            if (document.getElementById('info-update')) {
                document.getElementById('info-update').style.display = "block";
            }
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
        if (document.getElementById('show-more')) {
            document.getElementById('show-more').style.display = "none";
        }
        if (document.getElementById('show-all')) {
            document.getElementById('show-all').style.display = "block";
        }
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
    //mouseover effects for categories
    function categoryMouseover(itemId) {        
        if (document.getElementById(itemId).style.backgroundColor === "green") {
            document.getElementById(itemId).style.backgroundColor = "rgb(49, 68, 49)";
            document.getElementById(itemId).style.color = "white";
            document.getElementById(itemId).style.border = "2px solid white";
        } else {
            document.getElementById(itemId).style.backgroundColor = "rgb(49, 68, 49)";
            document.getElementById(itemId).style.color = "black";
            document.getElementById(itemId).style.border = "2px solid rgb(53, 52, 52)";
        }
    }
    function categoryMouseout(itemId) {        
        if (document.getElementById(itemId).style.color === "white") {
            document.getElementById(itemId).style.backgroundColor = "green";
            document.getElementById(itemId).style.color = "white";
            document.getElementById(itemId).style.border = "2px solid white";
        } else {
            document.getElementById(itemId).style.backgroundColor = "grey";
            document.getElementById(itemId).style.color = "black";
            document.getElementById(itemId).style.border = "2px solid border:rgb(53, 52, 52)";
        }
    }

    //EDITING PROFILE INFO    
    //cancel profile pic change 
    function cancelProfilePic() {
        if (document.getElementById('current-image')) {
            document.getElementById('current-image').style.display="inline-block";
        }
        document.getElementById('image-preview').style.display="none";
        document.getElementById('uploaded-image').value = "";
        document.getElementById('profile-pic-cancel').style.display = "none";
    }

    //DREAMS PAGE
    //Open dream delete alert
    function deleteDream(itemId) {
        document.getElementById("alert-" + itemId).style.display="block";
        const removeElements = document.getElementsByClassName('general-bar');
        for (let i = 0; i < removeElements.length; i++) {
            removeElements[i].innerHTML="<i class='fas fa-edit'> </i><i class='fas fa-trash'> </i> View Dream";
        }
        const disableMenu = document.getElementsByClassName('clickable-item');
        for (let i = 0; i < disableMenu.length; i++) {
            disableMenu[i].style.pointerEvents = "none";
            disableMenu[i].style.color = "rgba(1,1,1,0.4)";
        }
        const fadeImageElements = document.querySelectorAll('img');
        for (let i = 0; i < fadeImageElements.length; i++) {
            fadeImageElements[i].style.opacity = "0.4";
        }
        document.body.style.backgroundColor = "rgba(1,1,1,0.4)";
        document.body.style.color = "rgba(1,1,1,0.4)";
        document.getElementById('main-template-wrapper').style.opacity="0.4";
        document.getElementById('main-content').style.border="5px solid rgba(1,1,1,0.4)";
        document.getElementById('active-page').style.border="5px solid rgba(1,1,1,0.4)";
        
    };

    //DREAMSCAPE/VIEW DREAM
    //enable add comment box
    function addComment(itemId) {
        form= itemId + "-comment";
        cancel= itemId + "-cancel";
        console.log(form);
        if (document.getElementById("comment-flash")) {
            document.getElementById("comment-flash").style.display="none";
        }
        document.getElementById(form).style.display="block";
        document.getElementById(cancel).style.display="inline-block";
        const hideEdit = document.getElementsByClassName('edit-comment');
        for (let i = 0; i < hideEdit.length; i++) {
            hideEdit[i].style.display = "none";
        }
        const hideAdd = document.getElementsByClassName('add-comment');
        for (let i = 0; i < hideAdd.length; i++) {
            hideAdd[i].style.display = "none";
        }
        const hideDelete = document.getElementsByClassName('delete-comment');
        for (let i = 0; i < hideDelete.length; i++) {
            hideDelete[i].style.display = "none";
        }
    }
    function cancelAddComment(itemId) {
        const fullString = itemId.split('-');
        const selectedDream = fullString.slice(0, -1).join("-");
        form= selectedDream + "-comment";
        cancel= selectedDream + "-cancel";
        document.getElementById(form).style.display="none";
        document.getElementById(cancel).style.display="none";
        const hideEdit = document.getElementsByClassName('edit-comment');
        for (let i = 0; i < hideEdit.length; i++) {
            hideEdit[i].style.display = "inline-block";
        }
        const hideAdd = document.getElementsByClassName('add-comment');
        for (let i = 0; i < hideAdd.length; i++) {
            hideAdd[i].style.display = "block";
        }
        const hideDelete = document.getElementsByClassName('delete-comment');
        for (let i = 0; i < hideDelete.length; i++) {
            hideDelete[i].style.display = "inline-block";
        }
    }
    //enable comment edit
    function editComment(itemId) {
        const selectedComment = itemId.split('-')[0];
        const clickType = itemId.split('-')[1];
        if (document.getElementById("comment-flash")) {
            document.getElementById("comment-flash").style.display="none";
        }
        console.log(selectedComment + "-cancel");
        document.getElementById(selectedComment + "-cancel").style.display="inline-block";
        commentTextarea = selectedComment + "-display"
        document.getElementById(commentTextarea).readOnly =false;
        document.getElementById(commentTextarea).focus();
        document.getElementById(selectedComment + "-submit").style.display="block";
        const hideEdit = document.getElementsByClassName('edit-comment');
        for (let i = 0; i < hideEdit.length; i++) {
            hideEdit[i].style.display = "none";
        }
        if (clickType==="cancel") {
            for (let i = 0; i < hideEdit.length; i++) {
                hideEdit[i].style.display = "inline-block";
            }
            document.getElementById(selectedComment + "-submit").style.display="none";
            document.getElementById(commentTextarea).readOnly =true;
            document.getElementById(commentTextarea).value = document.getElementById(selectedComment + "-original").value;
            document.getElementById(selectedComment + "-cancel").style.display="none";
        }
    }
    //open comment delete alert
    function deleteComment(itemId) {
        console.log(itemId);
        console.log("alert-" + itemId);
        document.getElementById("alert-" + itemId).style.display="block";
        const disableMenu = document.getElementsByClassName('clickable-item');
        for (let i = 0; i < disableMenu.length; i++) {
            disableMenu[i].style.pointerEvents = "none";
            disableMenu[i].style.color = "rgba(1,1,1,0.4)";
        }
        const fadeImageElements = document.querySelectorAll('img');
        for (let i = 0; i < fadeImageElements.length; i++) {
            fadeImageElements[i].style.opacity = "0.4";
        }
        const fadeFormElements = document.querySelectorAll('textarea');
        for (let i = 0; i < fadeFormElements.length; i++) {
            fadeFormElements[i].style.opacity = "0.4";
        }
        const fadeSelectElements = document.querySelectorAll('select');
        for (let i = 0; i < fadeSelectElements.length; i++) {
            fadeSelectElements[i].style.opacity = "0.4";
        }
        const fadeButtonElements = document.querySelectorAll('button');
        for (let i = 0; i < fadeButtonElements.length; i++) {
            fadeButtonElements[i].style.opacity = "0.4";
        }
        document.body.style.backgroundColor = "rgba(1,1,1,0.4)";
        document.body.style.color = "rgba(1,1,1,0.4)";
        document.getElementById('main-template-wrapper').style.opacity="0.4";
        document.getElementById('main-content').style.border="5px solid rgba(1,1,1,0.4)";
        document.getElementById('active-page').style.border="5px solid rgba(1,1,1,0.4)";
    }
    
    //functions for mouseover/out for the dreams icon
    function mouseoverDreams() {
        document.getElementById("dreams-icon").src = "../../../static/images/general-assets/dreams-icon-hover.svg";
        document.getElementById("dreams-icon-container").style.color = "#0091ffff";
    }
    function mouseoutDreams() {
        document.getElementById("dreams-icon").src = "../../../static/images/general-assets/dreams-icon.svg";
        document.getElementById("dreams-icon-container").style.color = "white";
    }
    //functions for mouseover/out for the dreamscape icon
    function mouseoverDreamscape() {
        document.getElementById("dreamscape-icon").src = "../../../static/images/general-assets/sun-icon-hover.svg";
        document.getElementById("dreamscape-icon-container").style.color = "#e4ff00ff";
    }
    function mouseoutDreamscape() {
        document.getElementById("dreamscape-icon").src = "../../../static/images/general-assets/sun-icon.svg";
        document.getElementById("dreamscape-icon-container").style.color = "white"; 
    }
    //functions for mouseover/out for the profile icon
    function mouseoverProfile() {
        document.getElementById("profile-icon").src = "../../../static/images/general-assets/profile-icon-hover.svg";
        document.getElementById("profile-icon-container").style.color = "#ff6866ff";

    }
    function mouseoutProfile() {
        document.getElementById("profile-icon").src = "../../../static/images/general-assets/profile-icon.svg";
        document.getElementById("profile-icon-container").style.color = "white";
    }
    //sets border color for active page based on section
    if (document.getElementById("dreams-icon-container")) {
        if (document.getElementById("dreams-icon-container").classList.contains("active-page")) {
            document.getElementById("dreams-icon-container").style.borderColor = "#0091ffff";
        } else if (document.getElementById("dreamscape-icon-container").classList.contains("active-page")) {
            document.getElementById("dreamscape-icon-container").style.borderColor = "#e4ff00ff";
        } else {
            document.getElementById("profile-icon-container").style.borderColor = "#ff6866ff"
        }
    }
    //ensure following or unfollowing returns to dream the user followed/unfollowed
    if (document.getElementById('focussed-dream')) {
        document.getElementById('focussed-dream').focus();
    }
});
