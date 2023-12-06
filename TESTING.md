Bugs:

Image handling

Used pillow to handle images, most references had the code saving to file which was awkward knowing I was deploying to Heroku.
Managed to get images uploaded to cloudinary, but not converted to the right file size/dimensions/format.
Ran trial using pillow with temp folder to store converted images, but could not then upload to cloudinary because they were in a converted format (Cloudinary required direct uploads)
Managed to find guide to convert and store file in a byte array (after chasing error message on google), eliminating need for local storage and presenting in a format I could upload to cloudinary.
Found that appending file extensions meant images did not display properly, so removed file extensions from filepath.
Ended up with image handling function which compresses file to a usable size, resizes to a set width, converts to preferred file format then stores a filename and alt in the database and uploads to cloudinary.  

I wanted to display an image previoew using JavaScript prior to upload, and found a great guide with an easy to adapt code snippet.  I struggled to make it work for a while, before realising I hadn't added my scrip.js file to the page.  oops.

BUGS

Form submission

I discovered that when adding skills etc through my staged sign-in process, selecting the add button submitted the form ahead of it being ready for submission.
I replaced the additional buttons with div elements, which I oculd then style.
On testing with a user, I discoveered they preferred to tab and pres enter thorugh form elements.  
I found out how to enable this for the divs, but then discovered a bug where pressing the enter key i the final stage of the form once the submit button had been enabled implicitly submitted the whole form regardless of where the focus was.  
Disabling default submit behaviour for the entire form would have meant handling the whole thing in Javascript, which was not a favourable option.  
I discivered that using an if statement and keydown with preventDefault() meant that I could prevent enter from triggering the default behaviour, whilst still enabling me to use that method to activate the submit method on focus.  I was please with this solution because I came up with it all by my very self. 

key missing

I discovered that if in flask I was checking if a key existed in the database or a session then it would throw an error when it didn't, stopping the application.
I solved this using .get and is not None, referencing the key implicitly.  This also prevented the error where if session cookies were deleted and the site couldn't find them it brought the whole thing down, which I also noticed in the walkthrough project.  I recommend it!
