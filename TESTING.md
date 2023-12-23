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

Following / unfollowing dreams and retaining page state

I spent a considerable amount of time trying to ensure the current page state is retained when reloading the dreamscape template after following or unfollowing a dream.  This will also apply to liking or unliking comments, so I thought it was worth spending time on.  I tried a number of methods, but struggled to properly affect the 'show own dreams' checkbox, which meant I eventually gave up on it.

I also forsee a need to return the focus of the page to the dream which has just been clicked on.  

My main method was passing parameters to the URL using the get method, but it wasn't clear how this would work with multiple parameters. Most examples online use a different method to that which I have been taught on the course, which would require learning an entirely new methodology and re-writing a bunch of code.

My end decision has been get rid of a checkbox which enables a user to videw their own dreams in the feed, as it seemed to be causing an issue (the checkbox was never marked correctly).  However on further revision the problem was solved by passing the entire dreamscape script to create a feed into the follow/unfollow functions, and calling the template directly with the parameters passed rather than redirecting.  hitting on this solution suggests to me that the show own dreams option may be viable, but if I'm honest now I've removed it I don't seem much point in having this option anyway!

I was then able to assign an element of the followed dream the id of focussed if it was reached through onie of the follow app routes, and use javascript to focus the page on the selected dream.

IMAGE FORMAT ISSUE - HEROKU

When deploying to Heroku I discovered that the code to reformat images did not work.  After a bit of reading and research, it was discovered that this was an issue with the image module, which for some reason only supports the 'png' image format when deployed with Python 3.12.1.  When it comes to compressing images 'png' probably isn't the best option, so I opted to use an older version of Python (3.10.12) which appears to cause no conflicts with Pillow, and therefore works fine with the 'webp' image format which I want to use.

Hopefully I'll eventually get to the bottom of what is causing the PIL Image module to have most of the image extensions removed on Heroku with the latest Python version - it seems to be a known issue and something to do with a dependency of another module: 

https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/5603

This could pretty much be anything that either I've used or that Heroku uses with Python or even something within Python itself over-writing the list of file extensions in the Image module - since my workaround causes no issues or conflicts I'll continue to use Python 3.10.12 for now and add finding and resolving the source of this problem as a future feature.
