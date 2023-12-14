import os
import io
import re
import smtplib
import jwt
from time import time
from flask_mail import Mail, Message
import cloudinary
import cloudinary.uploader
import PIL
from PIL import Image
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

if os.path.exists("env.py"):
    import env

app = Flask(__name__)
app.config["SESSION_COOKIE_SAMESITE"] = os.environ.get("SESSION_COOKIE_SAMESITE")
app.config["SESSION_COOKIE_SECURE"] = os.environ.get("SESSION_COOKIE_SECURE")
app.config["MAIL_SERVER"] = os.environ.get("MAIL_SERVER")
app.config["MAIL_PORT"] = os.environ.get("MAIL_PORT")
app.config["MAIL_USE_SSL"] = os.environ.get("MAIL_USE_SSL")
app.config["MAIL_USERNAME"] = os.environ.get("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.environ.get("MAIL_PASSWORD")
mail = Mail(app)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

cloudinary.config(
    cloud_name = os.environ.get('CLOUD_NAME'), 
    api_key=os.environ.get('API_KEY'), 
    api_secret=os.environ.get('API_SECRET'))

#base url for Cloudinary image directories
base_url = { "profile": "https://res.cloudinary.com/djxae3dnx/image/upload/v1701738961/profile/",
            "dreams": "https://res.cloudinary.com/djxae3dnx/image/upload/v1701738961/dreams/",
            "reset": os.getenv("BASE_URL")
}

#password reset function (creates token for e-mail)
def get_reset_token(self, expires):       
        return jwt.encode({'reset_password': self["email"],
                           'exp':    time() + expires},
                           key=os.getenv('SECRET_KEY'), algorithm='HS256')


#verifies token to retrieve user e-mail
def verify_reset_token(token):
        try:
            email = jwt.decode(token,
            key=os.getenv('SECRET_KEY'), algorithms=['HS256'])['reset_password']
            return email
        except Exception as e:
            print(e)
            return


#function converts images to appropriate format and size
def imageConvert(image, width, quality, format):
    img = Image.open(image)
    img_byte_arr = io.BytesIO()
    wpercent = (width/float(img.size[0]))
    hsize = int((float(img.size[1])*float(wpercent)))
    img = img.resize((width,hsize), PIL.Image.ANTIALIAS)
    img.save(img_byte_arr, format, optimize=True, quality=quality)
    img_byte_arr = img_byte_arr.getvalue()
    return img_byte_arr


mongo = PyMongo(app)

@app.route("/")
def home():
    if session.get("user_id") is not None:
        return redirect(url_for("feed_dreamscape"))
    return render_template("landing.html")


# the next three routes encompass the signup process
@app.route("/dare-to-dream", methods=["GET","POST"])
def signup():
    if session.get("user_id") is not None:
        user_info = list(mongo.db.users.find_one({"_id": ObjectId(session["user_id"])}))
        return render_template("dreamscape.html", base_url=base_url, user=user_info)
    if request.method == "POST":
        existing_user = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()})
        if existing_user:
            flash("This e-mail address is already in use")
            return redirect(url_for("signup"))
        first_submitted = str(re.sub("[.!#$%;@&'*+/=?^_` {|}~]", "", request.form.get("first_name").lower()))
        last_submitted = str(re.sub("[.!#$%;@&'*+/=?^_` {|}~]", "", request.form.get("last_name").lower()))
        user_string = str(first_submitted + "-" + last_submitted)
        check_slug = list(mongo.db.users.find({"user_string": user_string}))
        if (check_slug):
            user_number = str(len(check_slug)+1)
            user_slug = str(user_string + "-" + user_number)
        else: 
            user_slug = user_string
        register = {
            "first_name": request.form.get("first_name").lower(),
            "last_name": request.form.get("last_name").lower(),
            "user_string": user_string,
            "user_slug": user_slug,            
            "email": request.form.get("email").lower(),
            "password": generate_password_hash(request.form.get("password")),
            "interests": request.form.get("interests"),
            "skills": request.form.get("skills"),
            "experiences": request.form.get("experiences"),
            "role": "user"
        }
        mongo.db.users.insert_one(register)
        user_verify = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()})
        if user_verify:
            session["user_id"] = str(ObjectId(existing_user["_id"]))
            return redirect(url_for("profile_upload"))        
        flash("Registration not successful, please try again.")
        return render_template("signup.html")
    return render_template("signup.html")
    

@app.route("/be-confident", methods=["GET","POST"])
def profile_upload():
    if session.get("user_id") is not None:
        user_info = mongo.db.users.find_one({"_id": ObjectId(session["user_id"])})  
        if request.method == "POST":
            uploaded_image = request.files['profile_picture']
            imgname= uploaded_image.filename.split(".", 1)[0]
            filename= str(imgname + "-" + str(user_info["_id"]))
            image_alt = (
                "Profile picture for " + user_info["first_name"].capitalize() 
                + " " + user_info["last_name"].capitalize())
            if uploaded_image:
                converted_image = imageConvert(uploaded_image, 400, 75, "webp")
                if user_info.get("profile_picture") is not None: 
                    if user_info["profile_picture"]  != "":
                        cloudinary.uploader.destroy(user_info["profile_picture"])               
                cloudinary.uploader.upload(
                    converted_image, public_id=filename, folder = "profile")  
                profile_picture = {"$set": {
                    "profile_picture": filename,
                    "profilepic_alt": image_alt
                }}
                mongo.db.users.update_one(
                    {"_id": ObjectId(user_info["_id"])}, profile_picture)
                return redirect(url_for("welcome"))
        return render_template("profile-submit.html", user=user_info)
    return redirect(url_for("home"))


#welcome page (once profile complete)
@app.route("/welcome")
def welcome():
    if session.get("user_id") is not None:
        user_info = dict(mongo.db.users.find_one({"_id": ObjectId(session["user_id"])}))
        return render_template("welcome.html", base_url=base_url, user=user_info)
    return redirect(url_for("home"))
    

@app.route("/abandon")
def abandon_signup():
    return redirect(url_for("home"))


@app.route("/signin", methods=["GET","POST"])
def signin():
    if request.method == "POST":
        existing_user = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()})
        if existing_user:
            if check_password_hash(existing_user["password"], request.form.get("password")):
                session["user_id"] = str(ObjectId(existing_user["_id"]))
                return redirect(url_for("feed_dreamscape"))
            else:
                flash("Username or Password not valid, please try again.")
                return redirect(url_for("home"))
        else:
            flash("Username or Password not valid, please try again.")
            return redirect(url_for("home"))
    return render_template("landing.html")


@app.route("/dreamscape")
def feed_dreamscape():
    if session.get("user_id") is not None:
        user_info = dict(mongo.db.users.find_one({"_id": ObjectId(session["user_id"])}) )
        return render_template("dreamscape.html", base_url=base_url, user=user_info)
    return redirect(url_for("home"))


@app.route("/dreams")
def dreams():
    if session.get("user_id") is not None:
        user_info = mongo.db.users.find_one({"_id": ObjectId(session["user_id"])})  
        return render_template("dreams.html", base_url=base_url,  user=user_info)
    return redirect(url_for("home"))


@app.route("/profile-personal", methods=["GET", "POST"])
def profile_personal():
    if session.get("user_id") is not None:
        user_info = dict(mongo.db.users.find_one({"_id": ObjectId(session["user_id"])}))
        if request.method == "POST":
            first_submitted = str(re.sub("[.!#$%;@&'*+/=?^_` {|}~]", "", request.form.get("first_name").lower()))
            last_submitted = str(re.sub("[.!#$%;@&'*+/=?^_` {|}~]", "", request.form.get("last_name").lower()))
            user_string = str(first_submitted + "-" + last_submitted)
            image_alt = (
                    "Profile picture for " + request.form.get("first_name").capitalize() 
                    + " " + request.form.get("last_name").capitalize())
            if (user_string != user_info["user_string"]):
                check_slug = list(mongo.db.users.find({"user_string": user_string}))
                if (check_slug):
                    user_number = str(len(check_slug)+1)
                    user_slug = str(user_string + "-" + user_number)
                else: 
                    user_slug = user_string
            else:
                user_slug = user_string            
            if request.files['profile_picture']:
                uploaded_image = request.files['profile_picture']
                imgname= uploaded_image.filename.split(".", 1)[0]
                filename= str(imgname + "-" + str(user_info["_id"]))
                converted_image = imageConvert(uploaded_image, 400, 75, "webp")
                if user_info["profile_picture"] is not None:
                    if user_info["profile_picture"] != "":
                        cloudinary.uploader.destroy("profile/" + user_info["profile_picture"])              
                cloudinary.uploader.upload(
                    converted_image, public_id=filename, folder = "profile")  
                profile_update = {"$set": {
                    "first_name": request.form.get("first_name"),
                    "last_name": request.form.get("last_name"),
                    "user_string": user_string,
                    "user_slug": user_slug,
                    "email": request.form.get("email"),
                    "profile_picture": filename,
                    "profilepic_alt": image_alt
                }}
            elif request.form.get("delete_image"):
                if (user_info["profile_picture"] is not None) or (user_info["profile_picture"]  != ""):
                    cloudinary.uploader.destroy("profile/" + user_info["profile_picture"])
                profile_update = {"$set": {
                    "first_name": request.form.get("first_name"),
                    "last_name": request.form.get("last_name"),
                    "user_string": user_string,
                    "user_slug": user_slug,
                    "email": request.form.get("email"),
                    "profile_picture": "",
                    "profilepic_alt": ""
            }}
            else:
                profile_update = {"$set": {
                    "first_name": request.form.get("first_name"),
                    "last_name": request.form.get("last_name"),
                    "user_string": user_string,
                    "user_slug": user_slug,
                    "email": request.form.get("email"),
                    "profilepic_alt": image_alt
            }}
            mongo.db.users.update_one(
                    {"_id": ObjectId(user_info["_id"])}, profile_update)
            flash("Profile Updated")
            user_info = dict(mongo.db.users.find_one({"_id": ObjectId(session["user_id"])}))
        return render_template("profile-personal.html", base_url=base_url, user=user_info)
    return redirect(url_for("home"))


@app.route("/site-preferences", methods=["GET", "POST"])
def site_preferences():
    if session.get("user_id") is not None:
        user_info = dict(mongo.db.users.find_one({"_id": ObjectId(session["user_id"])}))
        if request.method == "POST":
            interests = request.form.get("interests")
            skills = request.form.get("skills")
            experiences = request.form.get("experiences")
            interests = interests.split(",")
            delete_interests = []
            for i in range(len(interests)):                
                if request.form.get("interests-"+ str(i) +"-delete"):
                    delete_interests.append(i)
            interest_deletions=sorted(delete_interests, reverse=True)
            for i in interest_deletions:
                if i < len(interests):
                    interests.pop(i)
            skills = skills.split(",")
            delete_skills = []
            for i in range(len(skills)):                
                if request.form.get("skills-"+ str(i) +"-delete"):
                    delete_skills.append(i)
            skill_deletions=sorted(delete_skills, reverse=True)
            for i in skill_deletions:
                if i < len(skills):
                    skills.pop(i)
            experiences = experiences.split(",")
            delete_experiences = []
            for i in range(len(experiences)):                
                if request.form.get("experiences-"+ str(i) +"-delete"):
                    delete_experiences.append(i)
            experience_deletions=sorted(delete_experiences, reverse=True)
            for i in experience_deletions:
                if i < len(experiences):
                    experiences.pop(i)
            interests = ','.join(interests)
            skills = ','.join(skills)
            experiences = ','.join(experiences)
            preferences_update = {"$set": {
                    "interests": interests,
                    "skills": skills,
                    "experiences": experiences
            }}
            mongo.db.users.update_one(
                    {"_id": ObjectId(user_info["_id"])}, preferences_update)
            user_info = dict(mongo.db.users.find_one({"_id": ObjectId(session["user_id"])}))
            return render_template("site-preferences.html", base_url=base_url, user=user_info)
        return render_template("site-preferences.html", base_url=base_url, user=user_info)  
    return redirect(url_for("home"))


def users_edit():
    if session.get("user_id") is not None:
        user_info = mongo.db.users.find_one({"_id": ObjectId(session["user_id"])})
        return render_template("edit-preferences.html", base_url=base_url, user=user_info)    
    return redirect(url_for("home"))


@app.route("/logout")
def log_out():
    if session.get("user_id") is not None:
        flash("It's been fun, don't you be a stranger now.")
        session.clear()
    return redirect(url_for("home"))


@app.route("/password-reset", methods=["GET", "POST"])
def password_reset():
    if request.method == "POST":
        existing_user = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()})
        if existing_user:
            token = get_reset_token(existing_user, 1000)
            messageOne= "<h3>Hi " + existing_user['first_name'] +"!</h3>"
            messageTwo= "<p>Please find below a link to reset your password - please note this link will expire in 15 minutes."
            messageThree="<br>If you did not request this the security of your account may be compromised.</p>"
            messageFour="<h4>Your reset link:</h4>"
            messageFive= base_url["reset"] + "reset-password/" + token            
            msg = Message()
            msg.subject = "Password Reset"
            msg.recipients = ['rowlandcoping@gmail.com']
            msg.sender = 'noreply@hopesanddreams.com'
            msg.html = messageOne + messageTwo + messageThree + messageFour + messageFive
            try:
                mail.send(msg)
                flash("Password update link sent, please check your e-mail")
            except:
                flash("Password update link not sent, please contact support if issues continue.")
            return redirect(url_for("home"))
        flash('Please enter a registered e-mail address')       
    return render_template("password-reset.html")


@app.route("/reset-password/<token>", methods=["GET", "POST"])
def reset_password(token):
    existing_user = verify_reset_token(token)
    if existing_user:
        if request.method == "POST":
                new_password = {"$set": {
                    "password": generate_password_hash(request.form.get("password"))
                }}
                mongo.db.users.update_one(
                            {"email": existing_user}, new_password)
                flash('Password Updated')
                return redirect(url_for("home"))
        return render_template('reset-password.html', existing_user=existing_user, token=token)
    flash('Your password reset token is no longer valid, please try again.')
    return redirect(url_for("password_reset"))


@app.route("/dreambuilder", methods=["GET", "POST"])
def dreambuilder():
    if session.get("user_id") is not None:
        if request.method == "POST":
            dream_string = str(re.sub("[.!#\"$%;@&'*+\\/=?^_`{|}~]", "", request.form.get("dream_name").lower()))
            dream_string = str(re.sub(" ", "-", dream_string))
            check_slug = list(mongo.db.dreams.find({"dream_string": dream_string}))
            if (check_slug):
                user_number = str(len(check_slug)+1)
                dream_slug = str(dream_string + "-" + user_number)
            else: 
                dream_slug = dream_string
            dream_create = {
                "user_id": session.get("user_id"),
                "dream_name": request.form.get("dream_name"),
                "dream_string": dream_string,
                "dream_slug": dream_slug,
                "dream_description": request.form.get("dream_description"),            
                "categories": request.form.get("categories"),
                "skills_required": request.form.get("skills_required")
            }
            mongo.db.dreams.insert_one(dream_create)
            dream_verify = mongo.db.dreams.find_one(
                {"dream_slug": dream_slug})
            if dream_verify:
                return redirect(url_for("image_upload", dream_slug=dream_slug, dream=dream_verify, base_url=base_url))        
            flash("Dream creation not successful, please try again.")
            return render_template('dreambuilder.html')
        return render_template('dreambuilder.html')
    
@app.route("/image-upload/<dream_slug>", methods=["GET","POST"])
def image_upload(dream_slug):
    if session.get("user_id") is not None:
        dream = mongo.db.dreams.find_one({"dream_slug": dream_slug})
        if dream['user_id'] == session["user_id"]:
            if request.method == "POST":
                uploaded_image = request.files['image_upload']
                imgname= uploaded_image.filename.split(".", 1)[0]
                filename= str(imgname + "-" + str(dream["_id"]))
                image_alt = (
                    "This image represents " + dream["dream_name"])
                if uploaded_image:
                    converted_image = imageConvert(uploaded_image, 400, 75, "webp")
                    if dream.get("image") is not None:
                        if dream["image"]  != "":
                            cloudinary.uploader.destroy(dream["image"])               
                    cloudinary.uploader.upload(
                        converted_image, public_id=filename, folder = "dreams")  
                    image = {"$set": {
                        "image": filename,
                        "image_alt": image_alt
                    }}
                    mongo.db.dreams.update_one(
                        {"dream_slug": dream_slug}, image)
                    flash("Dream Image Uploaded")
                    return redirect(url_for("dreams"))
                flash("Image Upload Failed")
            return render_template("image-upload.html", dream_slug=dream_slug, dream=dream, base_url=base_url)
        return redirect(url_for("home"))
    return redirect(url_for("home"))

@app.route("/abandon-dream")
def abandon_dream ():
    return redirect(url_for("dreams"))




    

    

        

# me == the sender's email address
# you == the recipient's email address


# Send the message via our own SMTP server.

            
if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)



