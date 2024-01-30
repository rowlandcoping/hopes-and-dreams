# Testing Documentation

([return to README](README.md))

## Contents

### Audit and Validation

[HTML Validation](#html-validation)\
[CSS Validation](#css-validation)\
[JavaScript Validation](#javascript-validation)\
[Python Validation](#python-validation)

### User Story Validation

[Site Owner User Stories](#site-owner-user-stories)\
[Site Visitor User Stories](#site-visitor-user-stories)

### Testing

[Automated Testing](#automated-testing)\
[Manual Testing](#manual-testing)\
[Bugs and Issues](#bugs-and-issues)

## Code Validation

### HTML Validation
([back to top](#testing-documentation))

I have validated the html code by copying and pasting the source code from each page into the w3c validator [HERE](https://validator.w3.org/).

Please note I have not validated (or styled) the admin only pages as they are not intended to be user facing.\
Only myself and the user created for assessment purposes will have admin access for this iteration of the site.

Page validated: Landing Page\
URL: https://hopes-and-dreams-15b83f2d1383.herokuapp.com/ \
Repaired Issues: Missing image alt tags.\
Outstanding Issues: None.

Page validated: Signup Page\
URL: https://hopes-and-dreams-15b83f2d1383.herokuapp.com/dare-to-dream \
Repaired Issues: H2 tag not closed, missing image alts, stray closing tag for div.\
Outstanding Issues: None.

Page validated: Password Reset Page\
URL: https://hopes-and-dreams-15b83f2d1383.herokuapp.com/password-reset \
Repaired Issues: Missing image alts.\
Outstanding Issues: None.

Page validated: Password Reset Page (Dream Route)\
URL: https://hopes-and-dreams-15b83f2d1383.herokuapp.com/password-reset-dream/compete-at-le-mans \
Repaired Issues: Missing image alts.\
Outstanding Issues: None.

Page validated: Reset Password Page\
URL: https://hopes-and-dreams-15b83f2d1383.herokuapp.com/reset-password/xxxxxxxresetkeyxxxxxxxxx \
Repaired Issues: Missing image alts.\
Outstanding Issues: None.

Page validated: 404 Page\
URL: https://hopes-and-dreams-15b83f2d1383.herokuapp.com/lost-bunnies \
Repaired Issues: Missing image alts.\
Outstanding Issues: None.

Page validated: View Dream Page\
URL: https://hopes-and-dreams-15b83f2d1383.herokuapp.com/dream/compete-at-le-mans \
Repaired Issues: Missing image alts, duplicate IDs for feed images.\
Outstanding Issues: None.

Page validated: Welcome Page\
URL: https://hopes-and-dreams-15b83f2d1383.herokuapp.com/welcome \
Repaired Issues: Missing image alts, duplicate IDs for intro text (not used anywhere!).\
Outstanding Issues: None.

Page validated: Create Dream Page\
URL: https://hopes-and-dreams-15b83f2d1383.herokuapp.com/dream/compete-at-le-mans \
Repaired Issues: stray/erroneous tags, table issues requiring major refactoring, missing image alts.\
Outstanding Issues: None.

Page validated: Dream Image Upload Page\
URL: https://hopes-and-dreams-15b83f2d1383.herokuapp.com/image-upload/compete-at-le-mans \
Repaired Issues: missing image alts, stray/erroneous tags, an empty javascript-populated field, misdirected labels.\
Outstanding Issues: None.

Page validated: Edit Dream Page\
URL: https://hopes-and-dreams-15b83f2d1383.herokuapp.com/edit-dream/compete-at-le-mans \
Repaired Issues: missing image alts, stray/erroneous tags, misdirected labels, table issues requiring major refactoring.\
Outstanding Issues: None.

Page validated: Personal Profile Page\
URL: https://hopes-and-dreams-15b83f2d1383.herokuapp.com/profile \
Repaired Issues: missing image alts, stray/erroneous tags, misdirected labels.\
Outstanding Issues: None.

Page validated: Dreamscape\
URL: https://hopes-and-dreams-15b83f2d1383.herokuapp.com/dreamscape \
Repaired Issues: duplicate ids in multiple places, stray tags, missing image alts, misdirected label.\
Outstanding Issues: None.

Page validated: Dreams\
URL: https://hopes-and-dreams-15b83f2d1383.herokuapp.com/dreams \
Repaired Issues: duplicate ids in multiple places, stray tags, missing image alts.\
Outstanding Issues: None.


### CSS Validation
([back to top](#testing-documentation))

File Validated: style.css\
URL: https://hopes-and-dreams-15b83f2d1383.herokuapp.com/ \
Repaired Issues: 4 errors total - invalid font-style and ineligable margin values (due to typo).\
Outstanding Issues: None.

![image](static/images/testing/css-validation.png)

### JavaScript Validation
([back to top](#testing-documentation))

I have validated my JavaScript file using [JSHint](https://jshint.com/)

Repaired Issues: There were a number of missing semicolons and some undeclared variables, but no major issues.\
Outstanding Issues: None.

![image](static/images/testing/jshint-validation.png)

### Python Validation
([back to top](#testing-documentation))

I have used the [CI Python Linter](https://pep8ci.herokuapp.com/#) to ensure my app.py file is PEP 8 compliant, although curiously the requirement of the linter seems to be set to 79 rather than 80 characters.

Repaired Issues: The majority of issues involved whitespace, intentation or line length issues.\
Outstanding Issues: None.

![image](static/images/testing/python-validation.png)

## User Stories
([back to top](#testing-documentation))

### Site Owner User Stories

([back to top](#testing-documentation))

_"Brand Identity: The branding needs to be strong and clear from page one"_\
The art style and color palate is clearly established on the landing page and continued throughout the signup process.

![image](static/images/user-stories/hopes-logo.png)

_"The site mission and purpose needs to be clearly stated to encourage sign-up.  It needs to inspire people."_\
The landing page includes a site description which alongside the imagary is designed to inspire curiosity

![image](static/images/user-stories/hopes-intro.png)

_"...users need a simple sign-up process just as soon as they hit the homepage."_\
The sign-up process has been reduced to a single page and is immediately accessible from the homepage.

![image](static/images/feature-list/sign-up.png)

_"I want the UI to be a stripped down and simple as possible so that it functions as well on mobile as it does on desktop_"\
The UI has been designed with big, colorful icons and buttons which make the site easy and intuitive to use on any platform.

![image](static/images/user-stories/hopes-UI.png)

_"As soon as (the user) have signed up and land in the site for the first time, the question 'what do I do now' needs to be answered._"\
The welcome page provides a detailed introduction to the site and an immediate option to either create a dream or visit the feed.

![image](static/images/user-stories/next-steps.png)

_"Logic for displaying dreams must be clean and effective."_\
Dream display consists of a feed which can be filtered by a number of easy to understand criteria - dreams can be filtered chronologically, by popularity (most followers), matched by category to user interests, or according to those that a specific user is following.

![image](static/images/feature-list/feed-filter.png)

### Site Visitor User Stories
([back to top](#testing-documentation))

_"The homepage needs to give users instant motivation to sign up, through brand imagery and a clear concept."_\
The imagery and concept combine to generate a sense of curiosity which encourages user sign-up.

![image](static/images/user-stories/imagery-concept.png)

_"The user journey needs to be interesting, but not too long, particularly through the sign-up phase."_\
The signup now consists of a one page form and a welcome page, which introduces users to core site concepts.  Both pages also consolidate core branding and themes.

![image](static/images/user-stories/signup-journey.png)

_"Quick and intuitive UI: to avoid drop-outs the user should not be hunting for anything."_\
Key site content and activities are immediately discoverable both through the bright, clear navigation and large, obviously sited buttons.

![image](static/images/feature-list/dream-creation.png)

_"Customisable look and feel: People like to be able to make their corner of the web their own."_\
Users are able to either create their own avatars or randomly generate a brand new cute fluffy friend from the database, which will appear next to all their comments.

![image](static/images/user-stories/furry-friend.png)

_"Feeds need to reflect what people are following and the things they have interest in..."_\
The feed filter can be used to focus on followed dreams, or user interests can be tailored to produce a relevant personalized feed.

![image](static/images/user-stories/personal-interests.png)

_"Users need to feel ... that they have control over comments and content they see."_\
Users may delete any comments on their own dreams they find unacceptable, or if they prefer disable comments entirely.

![image](static/images/user-stories/disabled.png)

## Testing
([back to top](#testing-documentation))

### Automated Testing
([back to top](#testing-documentation))

Automated testing has not been included in this project for a number of reasons:
 - I do not know how to set up automatic tests for Flask applications written in Python, which forms the majority of the codebase, and since the suject of automatically testing Python scripts has not been mentioned at all in the course material it won't form part of the assessment criteria.
 - What Javascript there is performs straightforward DOM functions and can more easily be tested manually.
 - The time it would take to set up automated testing environments and then learning how to use them are simply not practical given the timescales involved with this project.

My view is that given the scope of the project and the above constraints it is a lot more practical and sensible to put together a comprehensive suite of manual tests to assess core functionality of each page, than it would be to put into place automated testing procedures.

### Manual Testing
([back to top](#testing-documentation))

#### Logic Manual testing

For me the most sensible way of approaching this is to systematically check the functionality on every page to ensure that everything appears as intended when an action is taken on the site and that the database is updated accoringly.  As such I've created a table for each of the pages on the site and tested all of the features therein.

LANDING PAGE:

| Feature Tested                        | Expected Outcome                 | Result  |
| ------------------------------------- | -------------------------------- | ------- |
| DOM | all page elements load as expected | Success |
| DOM | all interactable elements change on hover and show pointer | Success |
| Sign-in button | reveals form fields and hides sign up button | Success |
| Cancel button | hides form fields and reveals sign up button | Success |
| email field | highlights when selected | Success |
| email field | required field must be populated to submit form | Success |
| email field | must be in correct format to submit form | Success |
| password field | highlights when selected | Success |
| password field | required field must be populated to submit form | Success |
| password field | must be in correct format to submit form | Success |
| submit button | submits data to database and loads dreamscape if form correctly completed and user details correct | Success |
| submit button | creates new user session if form correctly completed and user details correct | Success |
| submit button | Will not submit data if form not correctly filled out | Success |
| submit button | returns to landing page and displays error message if e-mail does not exist | Success |
| submit button | returns to landing page and displays error message if password is incorrect | Success |
| Forgotten password link | takes user to the password reset page | Success |
| sign up button | takes user to the user sign-up page | Success |
| manually editing url to non-existent address | takes user to 404 | Success |

SIGN_UP PAGE:

| Feature Tested                        | Expected Outcome                 | Result  |
| ------------------------------------- | -------------------------------- | ------- |
| DOM | all page elements load as expected | Success |
| DOM | all interactable elements change on hover and show pointer | Success |
| First name field | highlights when selected | Success |
| First name field | required field must be populated to submit form | Success |
| Last name field | highlights when selected | Success |
| Last name field | required field must be populated to submit form | Success |
| email field | highlights when selected | Success |
| email field | required field must be populated to submit form | Success |
| email field | must be in correct format to submit form | Success |
| password field | highlights when selected | Success |
| password field | required field must be populated to submit form | Success |
| password field | must be in correct format to submit form | Success |
| abandon button | takes user back to the landing page | Success |
| submit button | submits data to back-end and loads welcome page if form correctly completed | Success |
| submit button | Will not submit data if form not correctly filled out | Success |
| On submit | First Name field populated in database | Success |
| On submit | Last Name field populated in database | Success |
| On submit | user string created and populated in database | Success |
| On submit | user slug created and populated in database, with correct adjustment for duplicate names | Success |
| On submit | e-mail address populated in database | Success |
| On submit | password hashed and populated in database | Success |
| On submit | role is sssigned as "user" and populated in database | Success |
| On submit | a user avatar is randonly selected and the url saved to the database | Success |
| On submit | the image alt for the random avatar is saved to the database | Success |
| On submit | the pic_type is set to "system" and populated in the database | Success |
| On submit | a new session is created for the user | Success |
| manually editing url to non-existent address | takes user to 404 | Success |


WELCOME PAGE:

| Feature Tested                        | Expected Outcome                 | Result  |
| ------------------------------------- | -------------------------------- | ------- |
| DOM | all page elements load as expected | Success |
| DOM | all interactable elements change on hover and show pointer | Success |
| Let's Create a Dream button | takes user to 'Dreambuilder' (create dream) page | Success |
| Take me to the Dreamscape button | takes user to the 'Dreamscape' (feed) | Success |
| manually editing url to non-existent address | takes user to 404 | Success |


PASSWORD RESET PAGE:

| Feature Tested                        | Expected Outcome                 | Result  |
| ------------------------------------- | -------------------------------- | ------- |
| DOM | all page elements load as expected | Success |
| DOM | all interactable elements change on hover and show pointer | Success |
| Return to Homepage | Displays if user came from landing page | Success |
| Return to Profile | Displays if user came from profile page | Success |
| email field | highlights when selected | Success |
| email field | required field must be populated to submit form | Success |
| email field | must be in correct format to submit form | Success |
| reset password button | Will not submit data if form not correctly filled out | Success |
| reset password button | submits data and re-routes user with confirmation message if form correctly completed | Success |
| reset password button | if e-mail does not exist re-loads page with error message | Success |
| on successful submit | reset token created and e-mail sent to the user with message | Success |
| on successful submit (if user was logged out) | returns user to landing page and displays confirmation message | Success |
| on successful submit (if user was logged in) | returns user to profile page | Success |
| on clicking link sent to e-mail | returns user to reset-password page with correct token | Success|
| manually editing url to non-existent address | takes user to 404 | Success |

PASSWORD RESET PAGE (Dream)

| Feature Tested                        | Expected Outcome                 | Result  |
| ------------------------------------- | -------------------------------- | ------- |
| DOM | all page elements load as expected | Success |
| DOM | all interactable elements change on hover and show pointer | Success |
| Return to Dream | Returns user to the dream they were looking at | Success |
| email field | highlights when selected | Success |
| email field | required field must be populated to submit form | Success |
| email field | must be in correct format to submit form | Success |
| reset password button | Will not submit data if form not correctly filled out | Success |
| reset password button | submits data and re-routes user with confirmation message if form correctly completed | Success |
| reset password button | if e-mail does not exist re-loads page with error message | Success |
| on submit | reset token created and e-mail sent to the user with message | Success |
| on submit | returns user to dream they were viewing and displays confirmation message | Success |
| on clicking link sent to e-mail | returns user to reset-password page with correct token | Success|
| manually editing first part of url to non-existent address | takes user to 404 | Success |
| manually editing any part of the dream slug in the url | remains on the same page | Success |
| Return to Dream | returns 404 if dream slug does not exist after editing | Success |

RESET PASSWORD:

| Feature Tested                        | Expected Outcome                 | Result  |
| ------------------------------------- | -------------------------------- | ------- |
| DOM | all page elements load as expected | Success |
| DOM | all interactable elements change on hover and show pointer | Success |
| Return to Homepage | Returns user to homepage | Success |
| password field | highlights when selected | Success |
| password field | required field must be populated to submit form | Success |
| password field | must be in correct format to submit form | Success |
| reset password button | Will not submit data if form not correctly filled out | Success |
| reset password button | submits data and re-routes user with confirmation message if form correctly completed | Success |
| on submit | reset token securely identifies correct user and creates new hashed password in database | Success |
| on submit | user is returned to homepage with success message | Success |
| on login | new password works | Success |
| manually editing token | returns page with token not valid message | Success |
| manually editing first part of url to non-existent address | takes user to 404 | Success |

LOST BUNNIES (404 PAGE)

| Feature Tested                        | Expected Outcome                 | Result  |
| ------------------------------------- | -------------------------------- | ------- |
| DOM | all page elements load as expected | Success |
| DOM | all interactable elements change on hover and show pointer | Success |
| (if signed out) | Displays sign up / sign in buttons and link to homepage | Success |
| Return to Homepage button (if signed out) | returns user to landing page | Success |
| Sign-in button (if signed out) | reveals form fields and hides sign up button | Success |
| Cancel button (if signed out) | hides form fields and reveals sign up button | Success |
| email field (if signed out) | highlights when selected | Success |
| email field (if signed out) | required field must be populated to submit form | Success |
| email field (if signed out) | must be in correct format to submit form | Success |
| password field (if signed out) | highlights when selected | Success |
| password field (if signed out) | required field must be populated to submit form | Success |
| password field (if signed out) | must be in correct format to submit form | Success |
| submit button (if signed out) | submits data to database and loads dreamscape if form correctly completed | Success |
| submit button (if signed out) | creates new user session if form correctly completed and user details correct | Success |
| submit button (if signed out) | Will not submit data if form not correctly filled out | Success |
| submit button (if signed out) | returns to landing page and displays error message if e-mail does not exist | Success |
| submit button (if signed out) | returns to landing page and displays error message if password is incorrect | Success |
| (if signed in) | Displays return to dreams and return to dreamscape options | Success |
| Return to Dreams (if signed in) | Returns user to dreams page | Success |
| Return to Dreamscape (if signed in) | Returns user to dreamscape page | Success |

MAIN TEMPLATE

| Feature Tested                        | Expected Outcome                 | Result  |
| ------------------------------------- | -------------------------------- | ------- |
| Main logo | disaplys as expected | Success |
| navigation icons | Display as expected | Success |
| Dreams icon | image and text changes on mouseover | Success |
| Feed icon | image and text changes on mouseover | Success |
| Profile | image and text changes on mouseover | Success |
| DOM | all interactable elements show pointer on mouseover | Success |
| Selected Page | Routing displays selected page box as expected | To be tested on page by page basis |
| (if signed out) | sign-in/sign-out/password reset buttons displayed instead of navigation on view dream page | Success |
| Sign-in button (if signed out) | reveals form fields and hides sign up button | Success |
| Cancel button (if signed out) | hides form fields and reveals sign up button | Success |
| email field (if signed out) | highlights when selected | Success |
| email field (if signed out) | required field must be populated to submit form | Success |
| email field (if signed out) | must be in correct format to submit form | Success |
| password field (if signed out) | highlights when selected | Success |
| password field (if signed out) | required field must be populated to submit form | Success |
| password field (if signed out) | must be in correct format to submit form | Success |
| submit button (if signed out) | submits data to database and re-loads the correct dream | Success |
| submit button (if signed out) | creates new user session if form correctly completed and user details correct | Success |
| submit button (if signed out) | Will not submit data if form not correctly filled out | Success |
| submit button (if signed out) | returns to the same dream and displays error message if e-mail does not exist | Success |
| submit button (if signed out) | returns to the same dream and displays error message if password is incorrect | Success |

DREAMS PAGE

| Feature Tested                        | Expected Outcome                 | Result  |
| ------------------------------------- | -------------------------------- | ------- |
| DOM | all page elements load as expected | Success |
| navigation icons | selected dream box set to dreams icon | Success |
| Create New Dream button | takes user to Dreambuilder page (create dream) | Success |
| Create New Dream button | color and pointer change on mouseover | Success |
| Edit dream icon | takes user to edit the selected dream | Success |
| Delete Dream Icon | color and pointer change on mouseover | Success |
| Delete Dream Icon | on click opens confirmation box for selected dream | Success |
| Delete Dream Alert | all other navigation on page disabled | Success |
| Delete Dream Alert | all other content on page greyed out | Success |
| Delete Dream Alert Cancel Button | closes the alert and returns the page to a normal state | Success |
| Delete Dream Confirm Button | tells server to delete selected dream and returns confirmation message | Success |
| on dream delete | selected dreams is deleted and page is returned without it displaying | Success |
| on dream delete | the dream id is removed from the 'dreams_followed' array of any user following it | Success |
| on dream delete | all comments on the dream are deleted | Success |
| on dream delete | the dream id is removed from the 'dreams_selected' array for any categories selected | Success |
| on dream delete | for any categories selected the 'total_dreams_selected' number is decremented by 1 | Success |
| on dream delete | for any categories selected the 'total_times_selected' number is decremented by 1 | Success |
| on dream delete | if present, the image for the dream is deleted from the 'dreams' Cloudinary folder | Success |
| View Dream Icon | color and pointer change on mouseover | Success |
| View Dream Icon | on click opens view dream page for selected dream | Success |
| manually editing url to non-existent address | takes user to 404 | Success |






#### Data Manipulation Manual Testing

As well as ensuring the site delivers expected outcomes, it is also important that I test to ensure create and delete actions update all the collections affected as intended, as well as other data stores such as Cloudinary.  As such this section tests data operations that may not be visible to the user.

#### Responsiveness Testing

I have tested at (in descending order) 3072px, 1920px (default), 1200px, 920px, 650px, 450px, 360px, 320px.  This is reflective of the major break points.

As well as using google developer tools in responsive mode, this has been tested in the real world on Chrome and Firefox in Windows on a 1920 x 1080 HD monitor, and on a Samsung Galaxy S8 (at c. 360px width).

| Page tested | Screen width tested | Result |


#### Issues found during manual testing

Although I and others have tested the game extensively, a small number of issues were uncovered during formal manual testing.
It should be noted that the orb issues in particular are never encountered during normal gameplay on account of a known game balance issue that needs addressing (see Code Issues).

 - Slime object image was not displaying due to typographical error.
 - Glowing Orb did not populate item slot if found in dining room.
 - Glowing Orb could be discovered multiple times in abandoned dining room
 - In battle a weapon with an attack value of 0 would actually reduce your minimum attack, and a weapon with a value of 1 did nothig to improve it.  Updated code so this was no longer the case.
 - This is not a bug, but after testing I believe the vulnerability buff may be somewhat overpowered.


### Bugs and Issues
([back to top](#testing-documentation))


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

Passwords not saved!

REbuild on boxing day removed the code to store passwords along with the old interests and categories fields by accident.  This didn't show itself until last week, when a user who had signed up since then tried to log in a second time, as on initial sign-in the user is validated by e-mail and logged into a session straight away.  This was an extremely alarming bug.

Textbox manipulation

Textbox sizing and focussing.

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

broken link error issue:

re-build everything to test the existance of the values passed via the URL before processing it.  Analyzing same overhead as a normal server query.  Should mean however the user manipulates the url it won't break the code and in many cases provide logical error messages ()

IMAGE FORMAT ISSUE - HEROKU

When deploying to Heroku I discovered that the code to reformat images did not work. First I checked the code I used for any deprecated methods and re-wrote it.  When the problem persisted, and after a bit of reading and research, I discovered that this was an issue with the Image module, which for some reason only supports the 'png' image format when deployed with Python 3.12.1.  When it comes to compressing images 'png' probably isn't the best option, so I opted to use an older version of Python (3.10.12) which appears to cause no conflicts with Pillow, and therefore works fine with the 'webp' image format which I want to use.

Hopefully I'll eventually get to the bottom of what is causing the PIL Image module to have most of the image extensions removed on Heroku with the latest Python version - it seems to be a known issue and something to do with a dependency of another module: 

https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/5603

This could pretty much be anything that either I've used or that Heroku uses with Python or even something within Python itself over-writing the list of file extensions in the Image module - since my workaround causes no issues or conflicts I'll continue to use Python 3.10.12 for now and add finding and resolving the source of this problem as a future feature.  Alongside a number of other issues I've had, it does raise some concerns in my mind about working with so many moving parts. Because this issue is not limited to Flask (it also seems to affect Django deployments) and seems to affect a lot of people I think that in the future I should seek out a different library for handling images.












