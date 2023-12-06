import os
import io
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
    if session:
        return redirect(url_for("feed_dreamscape"))
    return render_template("landing.html")

# the next three routes encompass the signup process
@app.route("/dare-to-dream", methods=["GET","POST"])
def signup():
    if request.method == "POST":
        existing_user = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()})
        if existing_user:
            flash("This e-mail address is already in use")
            return redirect(url_for("signup"))
        register = {
            "first_name": request.form.get("first_name").lower(),
            "last_name": request.form.get("last_name").lower(),
            "email": request.form.get("email").lower(),
            "password": generate_password_hash(request.form.get("password")),
            "interests": request.form.get("interests"),
            "skills": request.form.get("skills"),
            "experiences": request.form.get("experiences")
        }
        mongo.db.users.insert_one(register)
        user_verify = mongo.db.users.find_one({"email": request.form.get("email").lower()})
        if user_verify:
            session["email"] = user_verify["email"]
            return redirect(url_for("profile_upload"))
        else:
            flash("Registration not successful, please try again.")
        return render_template("signup.html")
    return render_template("signup.html")

@app.route("/be-confident", methods=["GET","POST"])
def profile_upload():
    app.logger.info('in upload route')
    if session:
        user_info = mongo.db.users.find_one({"email": session["email"]})
        if request.method == "POST":
            uploaded_image = request.files['profile_picture']
            imgname= uploaded_image.filename.split(".", 1)[0]
            filename= str(imgname + "-" + str(user_info["_id"]))
            image_alt = "Profile picture for " + user_info["first_name"].capitalize() + " " + user_info["last_name"].capitalize()
            if uploaded_image:
                converted_image = imageConvert(uploaded_image, 400, 75, "webp")
                if user_info["profile_picture"]:
                    cloudinary.uploader.destroy(user_info["profile_picture"])               
                cloudinary.uploader.upload(converted_image, public_id=filename, folder = "profile")  
                profile_picture = {"$set": {
                    "profile_picture": filename,
                    "profilepic_alt": image_alt
                }}
                mongo.db.users.update_one({"_id": ObjectId(user_info["_id"])}, profile_picture)
                flash("Profile Picture Uploaded")
                return redirect(url_for("welcome"))
        return render_template("profile-submit.html", user=user_info)
    else:
        flash("something broke")
        return redirect(url_for("home"))

#welcome page (once profile complete)
@app.route("/welcome")
def welcome():
    if session:
        user_info = mongo.db.users.find_one({"email": session["email"]})    
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
                session["email"] = existing_user["email"]
                return redirect(url_for("feed_dreamscape"))
            else:
                flash("Username or Password not valid, please try again.")
                return redirect(url_for("landing.html"))
        else:
            flash("Username or Password not valid, please try again.")
            return redirect(url_for("landing.html"))
    return render_template("landing.html")

@app.route("/dreamscape")
def feed_dreamscape():
    if session:
        user_info = mongo.db.users.find_one({"email": session["email"]})  
        return render_template("dreamscape.html", base_url=base_url, user=user_info)
    return redirect(url_for("landing.html"))

if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)



