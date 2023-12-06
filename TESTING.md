Bugs:

Image handling

Used pillow to handle images, most references had the code saving to file which was awkward knowing I was deploying to Heroku.
Managed to get images uploaded to cloudinary, but not converted to the right file size/dimensions/format.
Ran trial using pillow with temp folder to store converted images, but could not then upload to cloudinary because they were in a converted format (Cloudinary required direct uploads)
Managed to find guide to convert and store file in a byte array (after chasing error message on google), eliminating need for local storage and presenting in a format I could upload to cloudinary.
Found that appending file extensions meant images did not display properly, so removed file extensions from filepath.
Ended up with image handling function which compresses file to a usable size, resizes to a set width, converts to preferred file format then stores a filename and alt in the database and uploads to cloudinary.  

I wanted to display an image previoew using JavaScript prior to upload, and found a great guide with an easy to adapt code snippet.  I struggled to make it work for a while, before realising I hadn't added my scrip.js file to the page.  oops.
