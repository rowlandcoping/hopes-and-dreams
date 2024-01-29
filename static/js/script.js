document.addEventListener("DOMContentLoaded", function() {
    //-------------Helper Functions--------------//
    
    function autoResize() {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + 'px';
    }

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
    //de-activate sign-in form
    document.addEventListener("click", function(e){
        const target = e.target.closest("#signin-cancel");
        if(target){
            signInHide();
        }
    });
    
    //SIGN-UP PROCESS
    //add event listners to all category button clicks
    const attachDupeFieldListeners= Array.from(document.getElementsByClassName('input-field-duplicate'));
    attachDupeFieldListeners.forEach(item => {
        item.addEventListener('focus', function handleClick(event) {
            const itemId = item.getAttribute('id');                
            duplicateField(itemId);
        });
    });

    //Create Dream page
    //add event listeners to listen for key up on input fields and populate the mobile field as well
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
    //add event listners to show/hide comments
    const showHideComments= Array.from(document.getElementsByClassName('all-dreamscape-comments'));
    showHideComments.forEach(item => {
        item.addEventListener('click', function handleClick(event) {
            const itemId = item.getAttribute('id');                
            showHide(itemId);
        });
    });
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
    //auto-resizing for dreambuilder textarea
    document.addEventListener("click", function(e){
        const target = e.target.closest("#dream_description-mob"); 
        if(target){
            document.getElementById("dream_description-mob").style.height = "auto";
            document.getElementById("dream_description-mob").style.height = document.getElementById("dream_description-mob").scrollHeight + 'px';           
        }
    });
    document.addEventListener("click", function(e){
        const target = e.target.closest("#dream_description-desk"); 
        if(target){
            document.getElementById("dream_description-desk").style.height = "auto";
            document.getElementById("dream_description-desk").style.height = document.getElementById("dream_description-desk").scrollHeight + 'px';           
        }
    });
    //add evemt listeners for cancelling delete alerts
    const attachCancelAlertListners= Array.from(document.getElementsByClassName('delete-cancel'));
    attachCancelAlertListners.forEach(item => {
        item.addEventListener('click', function handleClick(event) {
            const itemId = item.getAttribute('id');                
            cancelAlert(itemId);
        });
    });


    //------------ACTIONS-------------//
    
    //SIGN IN
    //show sign-in form
    function signInShow() {
        document.getElementById('signin-form').style.display = "block";
        document.getElementById('signin-click').style.display = "none";
        document.getElementById('main-signup').style.display = "none";
    }
    //hide sign-in form
    function signInHide() {
        document.getElementById('signin-form').style.display = "none";
        document.getElementById('signin-click').style.display = "block";
        document.getElementById('main-signup').style.display = "block";
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
    //Warns user if more than 5 categories selected.
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
        categories = document.getElementById("selected-categories").value.split(",")
        if (categories.length < 7) {
            if (document.getElementById("warning-message")) {
                document.getElementById("warning-message").innerHTML ="";
                document.getElementById("disable-button").disabled = false;
                document.getElementById("disable-button").style.pointerEvents = "auto";
                document.getElementById("disable-button").style.opacity = "1"
            }
        } else {
            if (document.getElementById("warning-message")) {
                document.getElementById("warning-message").innerHTML = "<p>Too many categories selected. <br>Please select a maximum of five.</p>"
                document.getElementById("disable-button").disabled = true;
                document.getElementById("disable-button").style.pointerEvents = "none";
                document.getElementById("disable-button").style.opacity = "0.2"
            }
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
            if (document.getElementById('current-edit-image')) {
                document.getElementById('current-edit-image').style.display="none";
            }
            document.getElementById('image-preview').style.display="inline-block";
            if (document.getElementById('info-update')) {
                document.getElementById('info-update').style.display = "block";
            }
            document.getElementById('profile-pic-cancel').style.display = "inline-block";
            if (document.getElementById('image-submit')) {
                document.getElementById('image-submit').style.display = "inline-block";
            }
            if (document.getElementById('remove-picture')) {
                document.getElementById('remove-picture').style.display = "none";
            }
        }
    }
    if (imageUpload) {
        imageUpload.addEventListener("change", previewPhoto);
    }
    //shows more categories
    function showMore() {
        document.getElementById('show-fewer').style.display = "block";
        const addCatTwo = document.getElementsByClassName('categories-two');
        for (let i = 0; i < addCatTwo.length; i++) {
            addCatTwo[i].style.display = "inline-block";
        }
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
        const addCatTwo = document.getElementsByClassName('categories-two');
        for (let i = 0; i < addCatTwo.length; i++) {
            addCatTwo[i].style.display = "inline-block";
        }
        const addCatCustom= document.getElementsByClassName('categories-two');
        for (let i = 0; i < addCatCustom.length; i++) {
            addCatCustom[i].style.display = "inline-block";
        }
        document.getElementById('show-more').style.display = "none";
        document.getElementById('show-all').style.display = "none";
    }
    //shows fewer categories
    function showFewer() {
        if (document.getElementsByClassName('categories-custom').length) {
            if (document.getElementById('show-all')) {
                document.getElementById('show-all').style.display = "block";
            }
            if (document.getElementById('show-all') || document.getElementById('show-more')) {
                document.getElementById('show-fewer').style.display = "block";
            }
            const removeCatCustom = document.getElementsByClassName('categories-custom');
            for (let i = 0; i < removeCatCustom.length; i++) {
                removeCatCustom[i].style.display = "none";
            }
        } else {
            if (document.getElementById('show-more')) {
                document.getElementById('show-more').style.display = "block";
            }
            document.getElementById('show-fewer').style.display = "none";
            const removeCatTwo = document.getElementsByClassName('categories-two');
            for (let i = 0; i < removeCatTwo.length; i++) {
                removeCatTwo[i].style.display = "none";
            }
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
    //ensure all form fields populated
    function duplicateField(itemId) {
        formField = itemId.split('-')[0]
        formSection = itemId.split('-')[1];
        console.log(formSection);
        if (formSection === "desk") {
            document.getElementById(itemId).onkeyup = function () { 
                document.getElementById(formField + "-mob").value = this.value;
                this.style.height = "auto";
                this.style.height = this.scrollHeight + 'px';
            };
        }
        if (formSection === "mob") {
            document.getElementById(itemId).onkeyup = function () { 
                document.getElementById(formField + "-desk").value = this.value;
                this.style.height = "auto";
                this.style.height =  this.scrollHeight + 'px';
            };
            
        }
    }



    //EDITING PROFILE INFO    
    //cancel profile pic change 
    function cancelProfilePic() {
        if (document.getElementById('current-edit-image')) {
            document.getElementById('current-edit-image').style.display="inline-block";
        }
        document.getElementById('image-preview').style.display="none";
        document.getElementById('uploaded-image').value = "";
        document.getElementById('profile-pic-cancel').style.display = "none";
        if (document.getElementById('image-submit')) {
            document.getElementById('image-submit').style.display = "none";
        }
        if (document.getElementById('remove-picture')) {
            document.getElementById('remove-picture').style.display = "flex";
        }

    }

    //ALERTS
    //Open delete dream alert
    function deleteDream(itemId) {
        document.getElementById("alert-" + itemId).style.display="block";
        document.getElementById("alert-" + itemId).focus();
        document.getElementById("alert-" + itemId).scrollIntoView({behavior: "instant", block: "center"}); 
        const disableMenu = document.getElementsByClassName('opaque-element');
        for (let i = 0; i < disableMenu.length; i++) {
            disableMenu[i].style.pointerEvents = "none";
            disableMenu[i].style.opacity = "0.3";
        }
    };
    //open comment delete alert
    function deleteComment(itemId) {
        document.getElementById("alert-" + itemId).style.display="block";
        document.getElementById("alert-" + itemId).focus();
        document.getElementById("alert-" + itemId).scrollIntoView({behavior: "instant", block: "center"}); 
        const disableMenu = document.getElementsByClassName('opaque-element');
        for (let i = 0; i < disableMenu.length; i++) {
            disableMenu[i].style.pointerEvents = "none";
            disableMenu[i].style.opacity = "0.3";
        }
        const opaqueBorderList = document.getElementsByClassName('dreamscape-list');
        for (let i = 0; i < opaqueBorderList.length; i++) {
            opaqueBorderList[i].style.borderBottom = "3px solid rgb(228,255, 0, .3)";
        }
        const opaqueBorderComments = document.getElementsByClassName('comment-dreamscape-bar');
            for (let i = 0; i < opaqueBorderComments.length; i++) {
                opaqueBorderComments[i].style.borderBottom = "2px solid rgb(228,255, 0, .3)";
                opaqueBorderComments[i].style.borderTop = "2px solid rgb(228,255, 0, .3)";
            }
        const opaqueBorderCommentsDream = document.getElementsByClassName('comment-dream-bar');
        for (let i = 0; i < opaqueBorderCommentsDream.length; i++) {
            opaqueBorderCommentsDream[i].style.borderBottom = "2px solid rgb(0,145,255, .3)";
            opaqueBorderCommentsDream[i].style.borderTop = "2px solid rgb(0,145,255, .3)";
        }
    }
    //Close (cancel) alert
    function cancelAlert(itemId) {
        const fullString = itemId.split('-');
        const selectedItem = fullString.slice(0, -3).join("-");
        const alertPage = fullString.slice(-1).join("-");
        if (alertPage==="dream") {
            document.getElementById("alert-" + selectedItem).style.display="none";
            const disableMenu = document.getElementsByClassName('opaque-element');
            for (let i = 0; i < disableMenu.length; i++) {
                disableMenu[i].style.pointerEvents = "auto";
                disableMenu[i].style.opacity = "1";
            }
        }
        if (alertPage==="comment") {
            document.getElementById("alert-" + selectedItem).style.display="none";
            const disableMenu = document.getElementsByClassName('opaque-element');
            for (let i = 0; i < disableMenu.length; i++) {
                disableMenu[i].style.pointerEvents = "auto";
                disableMenu[i].style.opacity = "1";
            }
            const opaqueBorderList = document.getElementsByClassName('dreamscape-list');
            for (let i = 0; i < opaqueBorderList.length; i++) {
                opaqueBorderList[i].style.borderBottom = "3px solid rgb(228,255, 0, 1)";
            }
            const opaqueBorderComments = document.getElementsByClassName('comment-dreamscape-bar');
            for (let i = 0; i < opaqueBorderComments.length; i++) {
                opaqueBorderComments[i].style.borderBottom = "2px solid rgb(228,255, 0, 1)";
                opaqueBorderComments[i].style.borderTop = "2px solid rgb(228,255, 0, 1)";
            }
            const opaqueBorderCommentsDream = document.getElementsByClassName('comment-dream-bar');
            for (let i = 0; i < opaqueBorderCommentsDream.length; i++) {
                opaqueBorderCommentsDream[i].style.borderBottom = "2px solid rgb(0,145,255, 1)";
                opaqueBorderCommentsDream[i].style.borderTop = "2px solid rgb(0,145,255, 1)";
            }        
        }
    }

    //DREAMSCAPE/VIEW DREAM
    //show/hide comments section 
    function showHide(itemId) {
        idArray = itemId.split('-');
        itemSlug = idArray.slice(0, -3).join("-");
        itemClass= idArray[idArray.length -1];
        if (itemClass === "show") {
            document.getElementById(itemSlug + "-view-all").style.display="none";
            document.getElementById(itemSlug + "-hide-all").style.display="block";
            document.getElementById(itemSlug + "-all-comments").style.display="block";
            document.getElementById(itemSlug + "-bar").style.borderBottom="3px solid rgb(228, 255, 0)";
        }
        if (itemClass === "hide") {
            document.getElementById(itemSlug + "-view-all").style.display="block";
            document.getElementById(itemSlug + "-hide-all").style.display="none";
            document.getElementById(itemSlug + "-all-comments").style.display="none";
            document.getElementById(itemSlug + "-bar").style.borderBottom="none";
        }

    }
    //enable add comment box
    function addComment(itemId) {
        form= itemId + "-comment";
        cancel= itemId + "-cancel";
        widthNow = document.getElementById(itemId + "-bar").offsetWidth;
        newWidth = String((widthNow/1.3) + "px");
        if (document.getElementById("comment-flash")) {
            document.getElementById("comment-flash").style.display="none";
        }
        document.getElementById(form).style.display="block";
        document.getElementById(itemId + "-text").style.width=newWidth;
        document.getElementById(itemId + "-text").focus(); 
        document.getElementById(cancel).style.display="block";
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
        document.getElementById(itemId + "-text").addEventListener('input', autoResize, false);
        function autoResize() {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + 'px';
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
        const fullString = itemId.split('-');
        const selectedComment = fullString.slice(0, -1).join("-");
        const clickType = itemId.split('-').pop();
        if (document.getElementById("comment-flash")) {
            document.getElementById("comment-flash").style.display="none";
        }
        document.getElementById(selectedComment + "-cancel").style.display="inline-block";
        commentTextarea = selectedComment + "-display";
        commentDivarea = selectedComment + "-fixed";
        commentCancel=selectedComment + "-cancel";
        commentSubmit=selectedComment + "-submit";
        if (document.getElementById(commentDivarea)) {
            widthNow = document.getElementById(commentDivarea).offsetWidth;
            newWidth = String((widthNow -10) + "px");
            document.getElementById(commentTextarea).addEventListener('focus', autoResize, false);
            document.getElementById(commentTextarea).addEventListener('input', autoResize, false);
            document.getElementById(commentDivarea).style.whiteSpace = "break-spaces";
            document.getElementById(commentDivarea).style.display = "none";
            document.getElementById(commentTextarea).style.display = "block";            
            document.getElementById(commentTextarea).style.width = newWidth;
            document.getElementById(commentTextarea).readOnly =false;
            document.getElementById(commentTextarea).focus();            
            document.getElementById(selectedComment + "-submit").style.display="inline-block";
        }
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
        if (clickType==="cancel") {
            for (let i = 0; i < hideEdit.length; i++) {
                hideEdit[i].style.display = "inline-block";
            }
            for (let i = 0; i < hideDelete.length; i++) {
                hideDelete[i].style.display = "inline-block";
            }
            for (let i = 0; i < hideAdd.length; i++) {
                hideAdd[i].style.display = "block";
            }
            if (document.getElementById(commentDivarea)) {
                document.getElementById(commentTextarea).value = document.getElementById(selectedComment + "-original").value;
                document.getElementById(commentTextarea).style.display = "none";
                document.getElementById(commentDivarea).style.display = "block";
                document.getElementById(commentCancel).style.display = "none";
                document.getElementById(commentSubmit).style.display = "none";
                document.getElementById(commentTextarea).readOnly =true;
            }
        }
    }
    //functions for mouseover/out for the dreams icon
    function mouseoverDreams() {
        document.getElementById("dreams-icon").src = "../../../static/images/general-assets/dreams-icon-hover.svg";
        document.getElementById("dreams-icon-container").style.color = "rgb(0, 145, 255)";
    }
    function mouseoutDreams() {
        document.getElementById("dreams-icon").src = "../../../static/images/general-assets/dreams-icon.svg";
        document.getElementById("dreams-icon-container").style.color = "white";
    }
    //functions for mouseover/out for the dreamscape icon
    function mouseoverDreamscape() {
        document.getElementById("dreamscape-icon").src = "../../../static/images/general-assets/sun-icon-hover.svg";
        document.getElementById("dreamscape-icon-container").style.color = "rgb(228, 255, 0)";
    }
    function mouseoutDreamscape() {
        document.getElementById("dreamscape-icon").src = "../../../static/images/general-assets/sun-icon.svg";
        document.getElementById("dreamscape-icon-container").style.color = "white"; 
    }
    //functions for mouseover/out for the profile icon
    function mouseoverProfile() {
        document.getElementById("profile-icon").src = "../../../static/images/general-assets/profile-icon-hover.svg";
        document.getElementById("profile-icon-container").style.color = "rgb(255, 104, 102)";
    }
    function mouseoutProfile() {
        document.getElementById("profile-icon").src = "../../../static/images/general-assets/profile-icon.svg";
        document.getElementById("profile-icon-container").style.color = "white";
    }
    //sets border color for active page based on section
    if (document.getElementById("dreams-icon-container")) {
        if (document.getElementById("dreams-icon-container").classList.contains("active-page")) {
            document.getElementById("dreams-icon-container").style.borderColor = "rgb(0, 145, 255)";
        } else if (document.getElementById("dreamscape-icon-container").classList.contains("active-page")) {
            document.getElementById("dreamscape-icon-container").style.borderColor = "rgb(228, 255, 0)";
        } else {
            document.getElementById("profile-icon-container").style.borderColor = "rgb(255, 104, 102)";
        }
    }
    //ensure following or unfollowing returns to dream the user followed/unfollowed
    if (document.getElementById('focussed-dream')) {
        document.getElementById('focussed-dream').focus();
        document.getElementById('focussed-dream').scrollIntoView({behavior: "instant", block: "center"});
    }
});
