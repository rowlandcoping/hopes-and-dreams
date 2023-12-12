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

user slug

I decided to build unique readable user IDs that I could pass to the site urls and use as session cookies based on first and last names.  On building the process to edit user data I discovered that I had to update this if a user's name changed.  Unfortunately this would also invalidate their session cookie and crash the website. As such I changed back to storing the user's _id as the session data as it is the only immutable part of the dataset.

converting cursor objects

During the course we were taught that converting database queries to list objects meant we were able to iterate over data multiple times using Jinja2.  When I ran into this problem naturally this was the first thing I did.  unfortunately this led to the site crashing.  The reason was some data queries from the database aren't suitable for being converted to a list, and therefore when my query was converted it ended up returning an empty dataset - the list was only being populated by the keys. It took me a long time to realise this. I tried multiple solutions and eventually realised that instead of a list the cursor object is converted to a dictionary then it returned an equivalent object that I was able to pass to Jinja.

A sidenote to this discovery is that I originally hit on this solution a long time before I implemented - once I initially tried it I saw no difference because of an html error, where a hidden div remained open due to missing forward slash,  hiding all the content I was trying to view.  It was working, but I didn't see it on the page.  As a result I hastily refactored all my code into seperate pages to solve the issue, before realising my mistake the next day and equally hastily re-building it how it was in the first place!

A further sidenote is that neither this problem nor this solution seems to be reported anywhere on the internet (that I could see!).  I really had to work it out through trial and error.

Creating a password reset.

This posed a number of challenges, mainly, again that there is little available documentation.  Eventually after several hours I solved it useing this blog: https://medium.com/@stevenrmonaghan/password-reset-with-flask-mail-protocol-ddcdfc190968 although it doesn't bear massive resemblance to my final code on behalf of it being created with SQLAlchemy and using a very different file structure.  I still consider it a mysetery exactly how the token was extracted from the site url.  My assumption is it pulled everything after the backslash into the token varialbe, so after manually creating the url more in hope than expectaion you can imagine my surprise when it worked.  The final thing I did not know and which the blog did not include was that the jwt method needed an algorithm/algorithms assigned to tell it how to encode/decode it.  I consider it a christmas miracle that this produced the desired result, and it took a couple of hours to come to the solution. Generally speaking it seems using Python with flask, PyMongo and MongoDB is not a popular choice, and I'm having to find solutions by piecing things together from multiple sources.  As an aside given this is the case it might be useful if this sort of thing were included in the course!  

Session cookie issue

I noticed that when I logged out of a session using session.pop() as instructed on the course I was getting a warning message about SameSite cookies.  presumably there was some trace left behind which the browser was detecting as a secutiry risk. I solved this issue by using session.clear() instead

Image delete issue

I noticed that images were not being deleted from cloudinary when replaced or removed as the code intended. It turned out I needed to add an additional condition to ensure an emptry field was treated the same as a null value - this is important as the server returns an error if it tries to return soimething tha tis not there but an empty string is treated as something being there, so it wasn't deleting the image if the database field had previously been populated.
