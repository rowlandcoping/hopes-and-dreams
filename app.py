import os
import io
import re
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

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

cloudinary.config(
    cloud_name = os.environ.get('CLOUD_NAME'), 
    api_key=os.environ.get('API_KEY'), 
    api_secret=os.environ.get('API_SECRET'))

#base url for Cloudinary image directories
base_url = { "profile": "https://res.cloudinary.com/djxae3dnx/image/upload/v1701738961/profile/",
            "dream": "https://res.cloudinary.com/djxae3dnx/image/upload/v1701738961/dream/"
}


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
        user_info = list(mongo.db.users.find_one({"user_id": ObjectId(session["user_id"])}))
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
        user_info = user_info = dict(mongo.db.users.find_one({"_id": ObjectId(session["user_id"])}))
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
                if (user_info.get("profile_picture") is not None) and (user_info.get("profile_picture")!=""):
                    cloudinary.uploader.destroy(user_info["profile_picture"])               
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
            user_info = mongo.db.users.find_one({"_id": ObjectId(session["user_id"])})
            flash("Profile Updated")
        return render_template("profile-personal.html", base_url=base_url, user=user_info)
    return redirect(url_for("home"))

@app.route("/site-preferences")
def site_preferences():
    if session.get("user_id") is not None:
        user_info = user_info = mongo.db.users.find_one({"_id": ObjectId(session["user_id"])})
        return render_template("site-preferences.html", base_url=base_url, user=user_info)    
    return redirect(url_for("home"))

@app.route("/edit-interests", methods=["GET", "POST"])
def interests_edit():
    if session.get("user_id") is not None:
        user_info = user_info = mongo.db.users.find_one({"_id": ObjectId(session["user_id"])})
        return render_template("edit-interests.html", base_url=base_url, user=user_info)    
    return redirect(url_for("home"))

@app.route("/edit-skills", methods=["GET", "POST"])
def skills_edit():
    if session.get("user_id") is not None:
        user_info = user_info = mongo.db.users.find_one({"_id": ObjectId(session["user_id"])})
        return render_template("edit-skills.html", base_url=base_url, user=user_info)    
    return redirect(url_for("home"))

@app.route("/edit-experiences", methods=["GET", "POST"])
def experiences_edit():
    if session.get("user_id") is not None:
        user_info = user_info = mongo.db.users.find_one({"_id": ObjectId(session["user_id"])})
        return render_template("edit-experiences.html", base_url=base_url, user=user_info)    
    return redirect(url_for("home"))

def users_edit():
    if session.get("user_id") is not None:
        user_info = user_info = mongo.db.users.find_one({"_id": ObjectId(session["user_id"])})
        return render_template("edit-preferences.html", base_url=base_url, user=user_info)    
    return redirect(url_for("home"))

@app.route("/logout")
def log_out():
    if session.get("user_id") is not None:
        flash("It's been fun, don't you be a stranger now.")
        session.pop("user_id")
    return redirect(url_for("home"))

            
if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)



