import os
import io
import re
import jwt
import random
from time import time
from datetime import datetime
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

# call session cookie environment variables
app.config["SESSION_COOKIE_SAMESITE"] = os.environ.get(
    "SESSION_COOKIE_SAMESITE")
app.config["SESSION_COOKIE_SECURE"] = os.environ.get("SESSION_COOKIE_SECURE")

# call mail environment variables
app.config["MAIL_SERVER"] = os.environ.get("MAIL_SERVER")
app.config["MAIL_PORT"] = os.environ.get("MAIL_PORT")
app.config["MAIL_USE_SSL"] = os.environ.get("MAIL_USE_SSL")
app.config["MAIL_USERNAME"] = os.environ.get("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.environ.get("MAIL_PASSWORD")
mail = Mail(app)

# call MongoDB environment variables
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

# call Cloudinary environment variables
cloudinary.config(
    cloud_name=os.environ.get('CLOUD_NAME'),
    api_key=os.environ.get('API_KEY'),
    api_secret=os.environ.get('API_SECRET'))

# base urls for images and passoword reset
base_url = {"profile": (
                "https://res.cloudinary.com/djxae3dnx/image/upload" +
                "/v1701738961/profile/"),
            "dreams": (
                "https://res.cloudinary.com/djxae3dnx/image/upload" +
                "/v1701738961/dreams/"),
            "reset": os.getenv("BASE_URL")
            }


# password reset function (creates token for e-mail)
def get_reset_token(self, expires):
    return jwt.encode({'reset_password': self["email"],
                      'exp':    time() + expires},
                      key=os.getenv('SECRET_KEY'), algorithm='HS256')


# verifies password reset token to retrieve user e-mail
def verify_reset_token(token):
    try:
        email = jwt.decode(
            token, key=os.getenv(
                'SECRET_KEY'), algorithms=['HS256'])['reset_password']
        return email
    except Exception as e:
        print(e)
        return


# converts images to appropriate format and size
def imageConvert(image, width, quality, format):
    with Image.open(image) as img:
        img = Image.open(image)
    img_byte_arr = io.BytesIO()
    wpercent = (width/float(img.size[0]))
    hsize = int((float(img.size[1])*float(wpercent)))
    img = img.resize((width, hsize), PIL.Image.LANCZOS)
    img.save(img_byte_arr, format, optimize=True, quality=quality)
    img_byte_arr = img_byte_arr.getvalue()
    return img_byte_arr


# function to return the filter selection
def return_view(selected):
    user_info = dict(mongo.db.users.find_one(
        {"_id": ObjectId(session["user_id"])}))
    if selected == "trending":
        dream = list(mongo.db.dreams.find().sort("total_followers", -1))
        dream_array = []
        for x in dream:
            if str(x["user_id"]) != session.get("user_id"):
                dream_array.append(x)
        dream = dream_array
    elif selected == "personalized":
        if "interests" in user_info:
            dream = list(mongo.db.dreams.find().sort("timestamp_created", -1))
            dream_array = []
            user_keywords = user_info["interests"]
            for x in dream:
                if "categories" in x:
                    dream_keywords = x["categories"]
                    if any(y in user_keywords for y in dream_keywords):
                        if str(x["user_id"]) != session.get("user_id"):
                            dream_array.append(x)
            dream = list(dream_array)
    elif selected == "followed":
        if "dreams_followed" in user_info:
            dream = list(mongo.db.dreams.find().sort("timestamp_created", -1))
            dream_all = []
            for x in dream:
                if "dreams_followed" in user_info:
                    if x["_id"] in user_info["dreams_followed"]:
                        dream_all.append(x)
                if "users_followed" in user_info:
                    if x["user_id"] in user_info["users_followed"]:
                        dream_all.append(x)
            dream_array = []
            [dream_array.append(x) for x in dream_all if x not in dream_array]
            dream = list(dream_array)
    else:
        dream = list(mongo.db.dreams.find().sort("timestamp_created", -1))
        dream_array = []
        for x in dream:
            if str(x["user_id"]) != session.get("user_id"):
                dream_array.append(x)
        dream = dream_array
    return dream


mongo = PyMongo(app)


# route for landing page
@app.route("/")
def home():
    if session.get("user_id") is not None:
        return redirect(url_for(
            "dreamscape", selected="latest", checked=False))
    return render_template("landing.html")


#  route for signup user journey
@app.route("/dare-to-dream", methods=["GET", "POST"])
def signup():
    if session.get("user_id") is not None:
        return redirect(url_for("dreamscape"))
    categories = list(
        mongo.db.categories.find().sort("total_dreams_selected", -1))
    categories_one = categories[0:10]
    categories_two = categories[10:20]
    categories_custom = categories[20:len(categories)]
    if request.method == "POST":
        categories_selected = request.form.get(
            "selected-categories").removesuffix(',')
        categories_array = categories_selected.split(",")
        existing_user = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()})
        if existing_user:
            flash("This e-mail address is already in use.", "red-flash-reset")
            return redirect(url_for("signup"))
        first_submitted = str(
            re.sub("[.!# $%;@&'*+/=?^_` {|}~]", "",
                   request.form.get("first_name").lower()))
        last_submitted = str(
            re.sub("[.!# $%;@&'*+/=?^_` {|}~]", "",
                   request.form.get("last_name").lower()))
        user_string = str(first_submitted + "-" + last_submitted)
        check_slug = list(mongo.db.users.find({"user_string": user_string}))
        if (check_slug):
            user_number = str(len(check_slug)+1)
            user_slug = str(user_string + "-" + user_number)
        else:
            user_slug = user_string
        avatars = list(mongo.db.avatars.find())
        new_avatar = random.choice(avatars)
        register = {
            "first_name": request.form.get("first_name").lower(),
            "last_name": request.form.get("last_name").lower(),
            "user_string": user_string,
            "user_slug": user_slug,
            "email": request.form.get("email").lower(),
            "password": generate_password_hash(request.form.get("password")),
            "interests": categories_array,
            "role": "user",
            "profile_picture": new_avatar["avatar"],
            "profilepic_alt": new_avatar["avatar_alt"],
            "pic_type": "system"
        }
        mongo.db.users.insert_one(register)
        user_verify = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()})
        if user_verify:
            user_categories = request.form.get(
                "selected-categories").split(",")
            user_categories = [x.strip() for x in user_categories]
            for category in user_categories:
                if category != "":
                    mongo.db.categories.update_one(
                                    {"category": category}, {"$push": {
                                     "users_selected": user_verify["_id"]}})
                    mongo.db.categories.update_one(
                                    {"category": category}, {"$inc": {
                                     "total_users_selected": 1,
                                     "total_times_selected": 1}})
            session["user_id"] = str(user_verify["_id"])
            return redirect(url_for("welcome"))
        flash(
            "Registration not successful, please try again.",
            "red-flash-reset")
        return render_template(
            "signup.html", categories_one=categories_one,
            categories_two=categories_two, categories_custom=categories_custom)
    return render_template(
        "signup.html", categories_one=categories_one,
        categories_two=categories_two, categories_custom=categories_custom)


# welcome page (once user has completed sign-up process)
@app.route("/welcome")
def welcome():
    if session.get("user_id") is not None:
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        return render_template(
            "welcome.html", base_url=base_url, user=user_info)
    return redirect(url_for("home"))


# route to abandon signup
@app.route("/abandon")
def abandon_signup():
    return redirect(url_for("home"))


# route to log in to site
@app.route("/signin", methods=["GET", "POST"])
def signin():
    if request.method == "POST":
        existing_user = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()})
        if existing_user:
            if check_password_hash(
              existing_user["password"], request.form.get("password")):
                session["user_id"] = str(existing_user["_id"])
                return redirect(url_for("dreamscape"))
            else:
                flash(
                    "Username or Password not valid, please try again.",
                    "red-flash-reset")
                return redirect(url_for("home"))
        else:
            flash(
                "Username or Password not valid, please try again.",
                "red-flash-reset")
            return redirect(url_for("home"))
    return render_template("landing.html")


# route if logged in via dream page
@app.route("/signin-dream/<dream_slug>", methods=["GET", "POST"])
def signin_dream(dream_slug):
    if request.method == "POST":
        existing_user = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()})
        if existing_user:
            if check_password_hash(
              existing_user["password"], request.form.get("password")):
                session["user_id"] = str(existing_user["_id"])
                return redirect(url_for("view_dream", dream_slug=dream_slug))
            else:
                flash(
                    "Username or Password not valid, please try again.",
                    "red-flash-reset")
                return redirect(url_for("view_dream", dream_slug=dream_slug))
        else:
            flash(
                "Username or Password not valid, please try again.",
                "red-flash-reset")
            return redirect(url_for("view_dream", dream_slug=dream_slug))
    return render_template("landing.html")


# route to the default dreamscape feed
@app.route("/dreamscape", methods=["GET", "POST"])
def dreamscape():
    if session.get("user_id") is not None:
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        dream = list(mongo.db.dreams.find().sort("timestamp_created", -1))
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        dream_array = []
        for x in dream:
            if str(x["user_id"]) != session.get("user_id"):
                dream_array.append(x)
        dream = dream_array
        selected = "latest"
        if request.method == "POST":
            dream = return_view(request.form.get("filter"))
            selected = request.form.get("filter")
            return render_template(
                "dreamscape.html", base_url=base_url, user=user_info,
                dream=dream, selected=selected, comments=comments)
        return render_template(
            "dreamscape.html", base_url=base_url, user=user_info,
            dream=dream, selected=selected, comments=comments)
    return redirect(url_for("home"))


@app.route("/personal-feed")
def personal_feed():
    if session.get("user_id") is not None:
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        dream = list(mongo.db.dreams.find().sort("timestamp_created", -1))
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        return render_template(
            "personal-feed.html", base_url=base_url, user=user_info,
            dream=dream, selected="latest", comments=comments)
    return redirect(url_for("home"))


# route to view, create and edit user dreams
@app.route("/dreams")
def dreams():
    if session.get("user_id") is not None:
        user_info = mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])})
        user_dreams = list(mongo.db.dreams.find(
            {"user_id": ObjectId(session["user_id"])}).sort(
                "timestamp_created", -1))
        return render_template(
            "dreams.html", base_url=base_url, user=user_info,
            user_dreams=user_dreams)
    return redirect(url_for("home"))


# route for personal information section of profile
@app.route("/profile", methods=["GET", "POST"])
def profile_personal():
    if session.get("user_id") is not None:
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        categories = list(mongo.db.categories.find().sort(
            "total_times_selected", -1))
        categories_one = categories[0:10]
        categories_two = categories[10:20]
        categories_custom = categories[20:len(categories)]
        if request.method == "POST":
            categories_selected = request.form.get(
                "selected-categories").removesuffix(',')
            categories_array = categories_selected.split(",")
            first_submitted = str(re.sub(
                "[.!# $%;@&'*+/=?^_` {|}~]", "",
                request.form.get("first_name").lower()))
            last_submitted = str(re.sub(
                "[.!# $%;@&'*+/=?^_` {|}~]", "",
                request.form.get("last_name").lower()))
            user_string = str(first_submitted + "-" + last_submitted)
            image_alt = (
                    "Profile picture for " + request.form.get(
                        "first_name").capitalize()
                    + " " + request.form.get("last_name").capitalize())
            if (user_string != user_info["user_string"]):
                check_slug = list(mongo.db.users.find(
                    {"user_string": user_string}))
                if (check_slug):
                    user_number = str(len(check_slug)+1)
                    user_slug = str(user_string + "-" + user_number)
                else:
                    user_slug = user_string
            else:
                user_slug = user_string
            if request.files['profile_picture']:
                uploaded_image = request.files['profile_picture']
                imgname = uploaded_image.filename.split(".", 1)[0]
                filename = str(imgname + "-" + str(user_info["_id"]))
                converted_image = imageConvert(uploaded_image, 400, 75, "webp")
                if user_info["pic_type"] == "custom":
                    cloudinary.uploader.destroy(
                        "profile/" + user_info["profile_picture"])
                cloudinary.uploader.upload(
                    converted_image, public_id=filename, folder="profile")
                profile_update = {"$set": {
                    "first_name": request.form.get("first_name"),
                    "last_name": request.form.get("last_name"),
                    "user_string": user_string,
                    "user_slug": user_slug,
                    "profile_picture": filename,
                    "profilepic_alt": image_alt,
                    "pic_type": "custom",
                    "interests": categories_array
                }}
            elif request.form.get("delete_image"):
                if user_info["pic_type"] == "custom":
                    cloudinary.uploader.destroy(
                        "profile/" + user_info["profile_picture"])
                avatars = list(mongo.db.avatars.find())
                new_avatar = random.choice(avatars)
                profile_update = {"$set": {
                    "first_name": request.form.get("first_name"),
                    "last_name": request.form.get("last_name"),
                    "user_string": user_string,
                    "user_slug": user_slug,
                    "profile_picture": new_avatar["avatar"],
                    "profilepic_alt": new_avatar["avatar_alt"],
                    "pic_type": "system",
                    "interests": categories_array
                }}
            else:
                if user_info["pic_type"] == "custom":
                    profile_update = {"$set": {
                        "first_name": request.form.get("first_name"),
                        "last_name": request.form.get("last_name"),
                        "user_string": user_string,
                        "user_slug": user_slug,
                        "profilepic_alt": image_alt,
                        "interests": categories_array
                    }}
                else:
                    profile_update = {"$set": {
                        "first_name": request.form.get("first_name"),
                        "last_name": request.form.get("last_name"),
                        "user_string": user_string,
                        "user_slug": user_slug,
                        "interests": categories_array
                    }}
            mongo.db.users.update_one(
                   {"_id": ObjectId(user_info["_id"])}, profile_update)
            # update comments pic data
            user_info = dict(mongo.db.users.find_one(
                {"_id": ObjectId(session["user_id"])}))
            comments = list(mongo.db.comments.find())
            for comment in comments:
                if (str(session["user_id"])).count(str(comment["user_id"])):
                    comment_avatar = {"$set": {
                        "user_pic": user_info["profile_picture"],
                        "user_pic_alt": user_info["profilepic_alt"]
                    }}
                    mongo.db.comments.update_one(
                        {"_id": comment["_id"]}, comment_avatar)
            # update category data
            new_categories = request.form.get(
                "selected-categories").split(",")
            new_categories = [x.strip() for x in new_categories]
            initial_categories = request.form.get(
                "initial-interests").split(",")
            initial_categories = [x.strip() for x in initial_categories]
            to_delete = []
            to_add = []
            for category in new_categories:
                present = initial_categories.count(category)
                if present == 0:
                    to_add.append(category)
            for category in initial_categories:
                present = new_categories.count(category)
                if present == 0:
                    to_delete.append(category)
            for category in to_add:
                if category != "":
                    mongo.db.categories.update_one(
                        {"category": category}, {"$push": {
                            "users_selected": user_info["_id"]}})
                    mongo.db.categories.update_one(
                        {"category": category}, {"$inc": {
                            "total_users_selected": 1,
                            "total_times_selected": 1}})
            for category in to_delete:
                if category != "":
                    mongo.db.categories.update_one(
                        {"category": category}, {"$pull": {
                            "users_selected": user_info["_id"]}})
                    mongo.db.categories.update_one(
                        {"category": category}, {"$inc": {
                            "total_users_selected": -1,
                            "total_times_selected": -1}})
            user_dreams = list(mongo.db.dreams.find(
                {"user_id": session["user_id"]}))
            for dream in user_dreams:
                dream_update = {"$set": {
                    "user_name": str(request.form.get(
                        "first_name") + " " + request.form.get("last_name"))
                }}
                mongo.db.dreams.update_one(
                    {"_id": ObjectId(dream["_id"])}, dream_update)
            categories = list(mongo.db.categories.find().sort(
                "total_times_selected", -1))
            categories_one = categories[0:10]
            categories_two = categories[10:20]
            categories_custom = categories[20:len(categories)]
            flash("Profile Updated.", "amber-flash")
        return render_template(
            "profile-personal.html", base_url=base_url, user=user_info,
            categories_one=categories_one, categories_two=categories_two,
            categories_custom=categories_custom)
    return redirect(url_for("home"))


# route to log out of site
@app.route("/logout")
def log_out():
    if session.get("user_id") is not None:
        flash("It's been fun, don't you be a stranger now.")
        session.clear()
    return redirect(url_for("home"))


# route to request a password reset link from home
@app.route("/password-reset", methods=["GET", "POST"])
def password_reset():
    if request.method == "POST":
        existing_user = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()})
        if existing_user:
            token = get_reset_token(existing_user, 1000)
            messageOne = "<h3>Hi " + existing_user['first_name'] + "!</h3>"
            messageTwo = (
                "<p>Please find below a link to reset your " +
                "password - please note this link will expire in 15 minutes.")
            messageThree = (
                "<br>If you did not request this the security " +
                "of your account may be compromised.</p>")
            messageFour = "<h4>Your reset link:</h4>"
            messageFive = base_url["reset"] + "reset-password/" + token
            msg = Message()
            msg.subject = "Password Reset"
            msg.recipients = [existing_user["email"]]
            msg.sender = 'noreply@hopesanddreams.com'
            msg.html = (messageOne + messageTwo + messageThree +
                        messageFour + messageFive)
            try:
                mail.send(msg)
                flash("Password update link sent, please check your e-mail.",
                      'green-flash-reset')
            except Exception:
                flash("Password update link not sent, " +
                      "please contact support if issues continue.",
                      'red-flash-reset')
                return render_template("password-reset.html")
            return redirect(url_for("profile_personal"))
        flash('Please enter a registered e-mail address.', 'red-flash-reset')
    return render_template("password-reset.html")


# route to request a password reset link from a dream
@app.route("/password-reset-dream/<dream_slug>", methods=["GET", "POST"])
def password_reset_dream(dream_slug):
    if request.method == "POST":
        existing_user = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()})
        if existing_user:
            token = get_reset_token(existing_user, 1000)
            messageOne = "<h3>Hi " + existing_user['first_name'] + "!</h3>"
            messageTwo = (
                "<p>Please find below a link to reset your " +
                "password - please note this link " +
                "will expire in 15 minutes.")
            messageThree = (
                "<br>If you did not request this the security " +
                "of your account may be compromised.</p>")
            messageFour = "<h4>Your reset link:</h4>"
            messageFive = base_url["reset"] + "reset-password/" + token
            msg = Message()
            msg.subject = "Password Reset"
            msg.recipients = [existing_user["email"]]
            msg.sender = 'noreply@hopesanddreams.com'
            msg.html = (
                messageOne + messageTwo + messageThree +
                messageFour + messageFive)
            try:
                mail.send(msg)
                flash(
                    "Password update link sent, please check your e-mail",
                    "green-flash-reset")
            except Exception:
                flash(
                    "Password update link not sent," +
                    "please contact support if issues continue.",
                    "red-flash-reset")
                return render_template(
                    "password-reset-dream.html", dream_slug=dream_slug)
            return redirect(url_for("view_dream", dream_slug=dream_slug))
        flash('Please enter a registered e-mail address', "red-flash-reset")
    return render_template("password-reset-dream.html", dream_slug=dream_slug)


# route to access password reset page and reset password
@app.route("/reset-password/<token>", methods=["GET", "POST"])
def reset_password(token):
    existing_user = verify_reset_token(token)
    if existing_user:
        if request.method == "POST":
            new_password = {"$set": {
                "password": generate_password_hash(
                    request.form.get("password"))
            }}
            mongo.db.users.update_one(
                        {"email": existing_user}, new_password)
            session.clear()
            flash('Password Updated!', 'green-flash-reset')
            return redirect(url_for("home"))
        return render_template(
            'reset-password.html', existing_user=existing_user, token=token)
    flash(
        'Your password reset token is no longer valid, please try again.',
        'red-flash-reset')
    return redirect(url_for("password_reset"))


# route for the dream creation process
@app.route("/dreambuilder", methods=["GET", "POST"])
def dreambuilder():
    if session.get("user_id") is not None:
        categories = list(mongo.db.categories.find().sort(
            "total_dreams_selected", -1))
        categories_one = categories[0:10]
        categories_two = categories[10:20]
        categories_custom = categories[20:len(categories)]
        if request.form.get("disable_comments"):
            comments_enabled = False
        else:
            comments_enabled = True
        if request.method == "POST":
            categories_selected = request.form.get(
                "selected-categories").removesuffix(',')
            categories_array = categories_selected.split(",")
            user_info = dict(mongo.db.users.find_one(
                {"_id": ObjectId(session["user_id"])}))
            dream_string = str(
                re.sub("[.!# \"$%;@&'*+\\/=?^_`{|}~]", "",
                       request.form.get("dream_name").lower()))
            dream_string = str(re.sub(" ", "-", dream_string))
            timestamp = time()
            date_time = datetime.fromtimestamp(timestamp)
            user_dreams = list(mongo.db.dreams.find(
                {"user_id": ObjectId(session["user_id"])}))
            for dream in user_dreams:
                if dream["dream_string"] == dream_string:
                    flash("You have already created a dream with that name.",
                          "amber-flash")
                    return render_template(
                        'dreambuilder.html', categories_one=categories_one,
                        categories_two=categories_two,
                        categories_custom=categories_custom)
            check_slug = list(mongo.db.dreams.find(
                {"dream_string": dream_string}))
            if (check_slug):
                user_number = str(len(check_slug)+1)
                dream_slug = str(dream_string + "-" + user_number)
            else:
                dream_slug = dream_string
            dream_create = {
                "user_id": ObjectId(session.get("user_id")),
                "user_name": str(
                    user_info["first_name"] + " " + user_info["last_name"]),
                "timestamp_created": timestamp,
                "datetime_created": date_time.strftime("%d/%m/%Y at %H:%M:%S"),
                "dream_name": request.form.get("dream_name"),
                "dream_string": dream_string,
                "dream_slug": dream_slug,
                "dream_description": request.form.get("dream_description"),
                "categories": categories_array,
                "comments_enabled": comments_enabled
            }
            mongo.db.dreams.insert_one(dream_create)
            dream_verify = mongo.db.dreams.find_one(
                {"dream_slug": dream_slug})
            if dream_verify:
                dream_categories = request.form.get(
                    "selected-categories").split(",")
                dream_categories = [x.strip() for x in dream_categories]
                for category in dream_categories:
                    if category != "":
                        mongo.db.categories.update_one(
                            {"category": category}, {"$push": {
                                "dreams_selected": dream_verify["_id"]}})
                        mongo.db.categories.update_one(
                            {"category": category}, {"$inc": {
                                "total_dreams_selected": 1,
                                "total_times_selected": 1}})
                return redirect(url_for("image_upload", dream_slug=dream_slug))
            flash(
              "Dream creation not successful, please try again.", "red-flash")
            return render_template(
                'dreambuilder.html', categories_one=categories_one,
                categories_two=categories_two,
                categories_custom=categories_custom)
        return render_template(
            'dreambuilder.html', categories_one=categories_one,
            categories_two=categories_two, categories_custom=categories_custom)


# route to add an image to a newly-created dream
@app.route("/image-upload/<dream_slug>", methods=["GET", "POST"])
def image_upload(dream_slug):
    if session.get("user_id") is not None:
        dream = mongo.db.dreams.find_one({"dream_slug": dream_slug})
        if str(dream['user_id']) == str(session["user_id"]):
            if request.method == "POST":
                uploaded_image = request.files['image_upload']
                imgname = uploaded_image.filename.split(".", 1)[0]
                filename = str(imgname + "-" + str(dream["_id"]))
                image_alt = (
                    "This image represents " + dream["dream_name"])
                if uploaded_image:
                    converted_image = imageConvert(
                        uploaded_image, 400, 75, "webp")
                    if "image" in dream:
                        if dream["image"] != "":
                            cloudinary.uploader.destroy(dream["image"])
                    cloudinary.uploader.upload(
                        converted_image, public_id=filename, folder="dreams")
                    image = {"$set": {
                        "image": filename,
                        "image_alt": image_alt
                    }}
                    mongo.db.dreams.update_one(
                        {"dream_slug": dream_slug}, image)
                    flash("Dream Image Uploaded.", "green-flash-reset")
                    return redirect(url_for("dreams"))
                flash("Image Upload Failed", "red-flash-reset")
            return render_template(
                "image-upload.html", dream_slug=dream_slug, dream=dream,
                base_url=base_url)
        return redirect(url_for("home"))
    return redirect(url_for("home"))


# route to abandon the dream creation process
@app.route("/abandon-dream")
def abandon_dream():
    return redirect(url_for("dreams"))


# route to edit a dream.
@app.route("/edit-dream/<dream_slug>", methods=["GET", "POST"])
def edit_dream(dream_slug):
    if session.get("user_id") is not None:
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        categories = list(mongo.db.categories.find().sort(
            "total_times_selected", -1))
        categories_one = categories[0:10]
        categories_two = categories[10:20]
        categories_custom = categories[20:len(categories)]
        dream = dict(mongo.db.dreams.find_one({"dream_slug": dream_slug}))
        if str(dream["user_id"]) == str(session.get("user_id")):
            user_info = dict(mongo.db.users.find_one(
                {"_id": ObjectId(session["user_id"])}))
            if request.method == "POST":
                if request.form.get("disable_comments"):
                    comments_enabled = False
                else:
                    comments_enabled = True
                categories_selected = request.form.get(
                    "selected-categories").removesuffix(',')
                categories_array = categories_selected.split(",")
                if (request.form.get(
                  "dream_name").lower() != dream["dream_name"].lower()):
                    dream_string = str(
                        re.sub(
                            "[.!# \"$%;@&'*+\\/=?^_`{|}~]", "",
                            request.form.get("dream_name").lower()))
                    dream_string = str(re.sub(" ", "-", dream_string))
                    check_slug = list(
                        mongo.db.dreams.find({"dream_string": dream_string}))
                    if (check_slug):
                        user_number = str(len(check_slug)+1)
                        dream_slug = str(dream_string + "-" + user_number)
                    else:
                        dream_slug = dream_string
                else:
                    dream_slug = dream["dream_slug"]
                    dream_string = dream["dream_string"]
                timestamp = time()
                date_time = datetime.fromtimestamp(timestamp)
                image_alt = (
                    "This image represents " + request.form.get("dream_name"))
                if request.files['image']:
                    uploaded_image = request.files['image']
                    imgname = uploaded_image.filename.split(".", 1)[0]
                    filename = str(imgname + "-" + str(user_info["_id"]))
                    converted_image = imageConvert(
                        uploaded_image, 400, 75, "webp")
                    if "image" in dream:
                        if dream["image"] != "":
                            cloudinary.uploader.destroy(
                                "dreams/" + dream["image"])
                    cloudinary.uploader.upload(
                        converted_image, public_id=filename, folder="dreams")
                    dream_update = {"$set": {
                        "timestamp_updated": timestamp,
                        "datetime_updated": date_time.strftime(
                            "%d/%m/%Y at %H:%M:%S"),
                        "dream_name": request.form.get("dream_name"),
                        "dream_string": dream_string,
                        "dream_slug": dream_slug,
                        "dream_description": request.form.get(
                            "dream_description"),
                        "image": filename,
                        "image_alt": image_alt,
                        "categories": categories_array,
                        "comments_enabled": comments_enabled
                    }}
                elif request.form.get("delete_image"):
                    if "image" in dream:
                        if (dream["image"] != ""):
                            cloudinary.uploader.destroy(
                                "dreams/" + dream["image"])
                        dream_update = {"$set": {
                            "timestamp_updated": timestamp,
                            "datetime_updated": date_time.strftime(
                                "%d/%m/%Y at %H:%M:%S"),
                            "dream_name": request.form.get("dream_name"),
                            "dream_string": dream_string,
                            "dream_slug": dream_slug,
                            "dream_description": request.form.get(
                                "dream_description"),
                            "image": "",
                            "image_alt": "",
                            "categories": categories_array,
                            "comments_enabled": comments_enabled
                        }}
                    else:
                        dream_update = {"$set": {
                            "timestamp_updated": timestamp,
                            "datetime_updated": date_time.strftime(
                                "%d/%m/%Y at %H:%M:%S"),
                            "dream_name": request.form.get("dream_name"),
                            "dream_string": dream_string,
                            "dream_slug": dream_slug,
                            "dream_description": request.form.get(
                                "dream_description"),
                            "categories": categories_array,
                            "comments_enabled": comments_enabled
                        }}
                else:
                    dream_update = {"$set": {
                        "timestamp_updated": timestamp,
                        "datetime_updated": date_time.strftime(
                            "%d/%m/%Y at %H:%M:%S"),
                        "dream_name": request.form.get("dream_name"),
                        "dream_string": dream_string,
                        "dream_slug": dream_slug,
                        "dream_description": request.form.get(
                            "dream_description"),
                        "image_alt": image_alt,
                        "categories": categories_array,
                        "comments_enabled": comments_enabled
                    }}
                mongo.db.dreams.update_one(
                        {"_id": ObjectId(dream["_id"])}, dream_update)
                # update categories fields
                new_categories = request.form.get(
                    "selected-categories").split(",")
                new_categories = [x.strip() for x in new_categories]
                initial_categories = request.form.get(
                    "initial-interests").split(",")
                initial_categories = [x.strip() for x in initial_categories]
                to_delete = []
                to_add = []
                for category in new_categories:
                    present = initial_categories.count(category)
                    if present == 0:
                        to_add.append(category)
                for category in initial_categories:
                    present = new_categories.count(category)
                    if present == 0:
                        to_delete.append(category)
                for category in to_add:
                    if category != "":
                        mongo.db.categories.update_one(
                            {"category": category}, {"$push": {
                                "dreams_selected": dream["_id"]}})
                        mongo.db.categories.update_one(
                            {"category": category}, {"$inc": {
                                "total_dreams_selected": 1,
                                "total_times_selected": 1}})
                for category in to_delete:
                    if category != "":
                        mongo.db.categories.update_one(
                            {"category": category}, {
                                "$pull": {"dreams_selected": dream["_id"]}})
                        mongo.db.categories.update_one(
                            {"category": category}, {"$inc": {
                                "total_dreams_selected": -1,
                                "total_times_selected": -1}})
                dream = dict(mongo.db.dreams.find_one(
                    {"_id": ObjectId(dream["_id"])}))
                categories = list(mongo.db.categories.find().sort(
                    ("total_times_selected"), -1))
                categories_one = categories[0:10]
                categories_two = categories[10:20]
                categories_custom = categories[20:len(categories)]
                flash("Dream Updated.", "amber-flash-reset")
            return render_template(
                "edit-dream.html", base_url=base_url, user=user_info,
                dream=dream, dream_slug=dream["dream_slug"],
                categories_one=categories_one, categories_two=categories_two,
                categories_custom=categories_custom)
        return redirect(url_for("dreams"))
    return redirect(url_for("home"))


@app.route("/delete-dream/<dream_slug>", methods=["GET", "POST"])
def delete_dream(dream_slug):
    if session.get("user_id") is not None:
        user_info = mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])})
        dream = mongo.db.dreams.find_one({"dream_slug": dream_slug})
        if ObjectId(user_info["_id"]) == ObjectId(
          dream["user_id"]) or user_info["role"] == "administrator":
            mongo.db.dreams.delete_one({"_id": ObjectId(dream["_id"])})
            categories = mongo.db.categories.find()
            for categ in categories:
                if "dreams_selected" in categ:
                    if "categories" in dream:
                        for x in dream["categories"]:
                            if x == categ["category"]:
                                mongo.db.categories.update_one(
                                    {"category": categ["category"]}, {
                                        "$pull": {"dreams_selected": ObjectId(
                                            dream["_id"])}})
                                mongo.db.categories.update_one(
                                    {"category": categ["category"]}, {"$inc": {
                                        "total_dreams_selected": -1,
                                        "total_times_selected": -1}})
            users = mongo.db.users.find()
            for user in users:
                if "dreams_followed" in user:
                    if "users_following" in dream:
                        for x in dream["users_following"]:
                            if ObjectId(x) == ObjectId(user["_id"]):
                                mongo.db.users.update_one(
                                    {"_id": ObjectId(x)}, {"$pull": {
                                        "dreams_followed": ObjectId(
                                            dream["_id"])}})
            comments = mongo.db.comments.find()
            for comment in comments:
                if ObjectId(comment["dream_id"]) == ObjectId(dream["_id"]):
                    mongo.db.comments.delete_one(
                        {"_id": ObjectId(comment["_id"])})
            flash('Dream deleted.  How sad.', 'red-flash-reset')
            return redirect(url_for("dreams"))
        return redirect(url_for("dreams"))
    return redirect(url_for("home"))


@app.route(
    "/dreamscape-follow-dream/<dream_slug>/<selected>",
    methods=["GET", "POST"])
def dreamscape_follow_dream(dream_slug, selected):
    if session.get("user_id") is not None:
        dream_pick = mongo.db.dreams.find_one({"dream_slug": dream_slug})
        if "users_following" in dream_pick:
            if not dream_pick["users_following"].count(
              ObjectId(session["user_id"])):
                add_dream = {"$push": {
                    "dreams_followed": ObjectId(dream_pick["_id"])
                }}
                add_user = {"$push": {
                    "users_following": ObjectId(session["user_id"])
                }}
                mongo.db.dreams.update_one(
                    {"dream_slug": dream_slug}, add_user)
                mongo.db.dreams.update_one(
                    {"dream_slug": dream_slug}, {"$inc": {
                        "total_followers": 1}})
                mongo.db.users.update_one(
                    {"_id": ObjectId(session["user_id"])}, add_dream)
        else:
            add_dream = {"$push": {
                "dreams_followed": ObjectId(dream_pick["_id"])
            }}
            add_user = {"$push": {
                "users_following": ObjectId(session["user_id"])
            }}
            mongo.db.dreams.update_one({"dream_slug": dream_slug}, add_user)
            mongo.db.dreams.update_one({"dream_slug": dream_slug}, {"$inc": {
                        "total_followers": 1}})
            mongo.db.users.update_one(
                {"_id": ObjectId(session["user_id"])}, add_dream)
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        dream = return_view(selected)
    return render_template(
        "dreamscape.html", base_url=base_url, user=user_info, dream=dream,
        selected=selected, dream_slug=dream_slug, comments=comments)


@app.route(
    "/dreamscape-unfollow-dream/<dream_slug>/<selected>",
    methods=["GET", "POST"])
def dreamscape_unfollow_dream(dream_slug, selected):
    if session.get("user_id") is not None:
        dream = mongo.db.dreams.find_one({"dream_slug": dream_slug})
        if dream["users_following"].count(ObjectId(session["user_id"])):
            # remove from dreams followed list in users
            remove_dream = {"$pull": {
                "dreams_followed": ObjectId(dream["_id"])
            }}
            mongo.db.users.update_one(
                {"_id": ObjectId(session["user_id"])}, remove_dream)
            # remove from users following list in dreams
            remove_user = {"$pull": {
                "users_following": ObjectId(session["user_id"])
            }}
            mongo.db.dreams.update_one({"dream_slug": dream_slug}, remove_user)
            mongo.db.dreams.update_one({"dream_slug": dream_slug}, {"$inc": {
                            "total_followers": -1}})
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        dream = return_view(selected)
        return render_template(
            "dreamscape.html", base_url=base_url, user=user_info, dream=dream,
            selected=selected, dream_slug=dream_slug, comments=comments)
    return redirect(url_for("home"))


@app.route(
    "/dreamscape-follow-creator/<dream_slug>/<selected>",
    methods=["GET", "POST"])
def dreamscape_follow_creator(dream_slug, selected):
    if session.get("user_id") is not None:
        this_dream = dict(mongo.db.dreams.find_one({"dream_slug": dream_slug}))
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        if "users_followed" in user_info:
            if not user_info["users_followed"].count(this_dream["user_id"]):
                add_user = {"$push": {
                    "users_following": ObjectId(session["user_id"])
                }}
                follow_user = {"$push": {
                    "users_followed": ObjectId(this_dream["user_id"])
                }}
                mongo.db.users.update_one(
                    {"_id": ObjectId(this_dream["user_id"])}, add_user)
                mongo.db.users.update_one(
                    {"_id": ObjectId(session["user_id"])}, follow_user)
        else:
            add_user = {"$push": {
                "users_following": ObjectId(session["user_id"])
            }}
            follow_user = {"$push": {
                "users_followed": ObjectId(this_dream["user_id"])
            }}
            mongo.db.users.update_one(
                {"_id":  ObjectId(this_dream["user_id"])}, add_user)
            mongo.db.users.update_one(
                {"_id": ObjectId(session["user_id"])}, follow_user)
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        dream = return_view(selected)
        return render_template(
            "dreamscape.html", base_url=base_url, user=user_info, dream=dream,
            selected=selected, dream_slug=dream_slug, comments=comments)
    return redirect(url_for("home"))


@app.route(
    "/dreamscape-unfollow-creator/<dream_slug>/<selected>",
    methods=["GET", "POST"])
def dreamscape_unfollow_creator(dream_slug, selected):
    if session.get("user_id") is not None:
        this_dream = dict(mongo.db.dreams.find_one({"dream_slug": dream_slug}))
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        if user_info["users_followed"].count(this_dream["user_id"]):
            remove_user = {"$pull": {
                "users_following": ObjectId(session["user_id"])
            }}
            unfollow_user = {"$pull": {
                "users_followed": ObjectId(this_dream["user_id"])
            }}
            mongo.db.users.update_one(
                {"_id": ObjectId(this_dream["user_id"])}, remove_user)
            mongo.db.users.update_one(
                {"_id": ObjectId(session["user_id"])}, unfollow_user)
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        dream = return_view(selected)
        return render_template(
            "dreamscape.html", base_url=base_url, user=user_info, dream=dream,
            selected=selected, dream_slug=dream_slug, comments=comments)
    return redirect(url_for("home"))


@app.route(
    "/add-dream-comment/<dream_slug>/<selected>", methods=["GET", "POST"])
def add_dream_comment(dream_slug, selected):
    if session.get("user_id") is not None:
        this_dream = dict(mongo.db.dreams.find_one({"dream_slug": dream_slug}))
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        timestamp = time()
        date_time = datetime.fromtimestamp(timestamp)
        existing_comment = mongo.db.comments.find_one(
                {"comment": request.form.get(dream_slug + "-text")})
        if existing_comment and ObjectId(
          existing_comment["user_id"]) == ObjectId(session["user_id"]):
            flash("You have already posted this comment.", "amber-flash")
        else:
            comment = {
                "comment": request.form.get(dream_slug + "-text"),
                "dream_id": ObjectId(this_dream["_id"]),
                "user_id": ObjectId(session["user_id"]),
                "user_name": user_info["first_name"] +
                " " + user_info["last_name"],
                "timestamp_created": timestamp,
                "datetime_created": date_time.strftime("%d/%m/%Y at %H:%M:%S"),
                "user_pic": user_info["profile_picture"],
                "user_pic_alt": user_info["profilepic_alt"]
            }
            mongo.db.comments.insert_one(comment)
            flash('Comment Added', 'green-flash')
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        dream = return_view(selected)
        return render_template(
            "dreamscape.html", base_url=base_url, user=user_info, dream=dream,
            selected=selected, dream_slug=dream_slug, comments=comments)
    return redirect(url_for("home"))


@app.route(
    "/edit-dream-comment/<dream_slug>/<selected>/<comment_id>",
    methods=["GET", "POST"])
def edit_dream_comment(dream_slug, selected, comment_id):
    if session.get("user_id") is not None:
        if request.method == "POST":
            new_comment = {"$set": {
                "comment": request.form.get(comment_id + "-text"),
            }}
            mongo.db.comments.update_one(
                {"_id": ObjectId(comment_id)}, new_comment)
            flash('Comment Updated', 'amber-flash')
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        dream = return_view(selected)
        return render_template(
            "dreamscape.html", base_url=base_url, user=user_info, dream=dream,
            selected=selected, dream_slug=dream_slug, comments=comments,
            comment_id=comment_id)
    return redirect(url_for("home"))


@app.route(
    "/delete-dream-comment/<dream_slug>/<selected>/<comment_id>",
    methods=["GET", "POST"])
def delete_dream_comment(dream_slug, selected, comment_id):
    if session.get("user_id") is not None:
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        if mongo.db.comments.count_documents(
          {"_id": ObjectId(comment_id)}, limit=1) != 0:
            comment_info = dict(mongo.db.comments.find_one(
                {"_id": ObjectId(comment_id)}))
            if str(session.get("user_id")) == str(
              comment_info["user_id"]) or user_info["role"] == "administrator":
                mongo.db.comments.delete_one({"_id": ObjectId(comment_id)})
                users = list(mongo.db.users.find())
                for user in users:
                    if "comments_liked" in user:
                        if user["comments_liked"].count(comment_id):
                            mongo.db.users.update_one(
                                {"_id": ObjectId(user["_id"])}, {"$pull": {
                                    "comments_liked": comment_id}})
                    if "comments_disliked" in user:
                        if user["comments_disliked"].count(comment_id):
                            mongo.db.users.update_one(
                                {"_id": ObjectId(user["_id"])}, {"$pull": {
                                    "comments_disliked": comment_id}})
                flash('Comment Deleted', 'red-flash')
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        return redirect(
            url_for('edit_dream_comment', dream_slug=dream_slug,
                    selected=selected, comment_id=comment_id))
    return redirect(url_for("home"))


@app.route(
    "/like-dream-comment/<dream_slug>/<selected>/<comment_id>",
    methods=["GET", "POST"])
def like_dream_comment(dream_slug, selected, comment_id):
    if session.get("user_id") is not None:
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        comment_pick = mongo.db.comments.find_one(
            {"_id": ObjectId(comment_id)})
        if "user_likes" in comment_pick:
            if not comment_pick["user_likes"].count(
              ObjectId(session["user_id"])):
                like_comment = {"$push": {
                    "comments_liked": ObjectId(comment_id)
                }}
                user_likes = {"$push": {
                    "user_likes": ObjectId(session["user_id"])
                }}
                mongo.db.comments.update_one(
                    {"_id": ObjectId(comment_id)}, user_likes)
                mongo.db.users.update_one(
                    {"_id": ObjectId(session["user_id"])}, like_comment)
        else:
            like_comment = {"$push": {
                "comments_liked": ObjectId(comment_id)
            }}
            user_likes = {"$push": {
                "user_likes": ObjectId(session["user_id"])
            }}
            mongo.db.comments.update_one(
                {"_id": ObjectId(comment_id)}, user_likes)
            mongo.db.users.update_one(
                {"_id": ObjectId(session["user_id"])}, like_comment)
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        dream = return_view(selected)
        return render_template(
            "dreamscape.html", base_url=base_url, user=user_info, dream=dream,
            selected=selected, dream_slug=dream_slug, comments=comments,
            comment_id=comment_id)
    return redirect(url_for("home"))


@app.route(
    "/unlike-dream-comment/<dream_slug>/<selected>/<comment_id>",
    methods=["GET", "POST"])
def unlike_dream_comment(dream_slug, selected, comment_id):
    if session.get("user_id") is not None:
        comment_pick = mongo.db.comments.find_one(
            {"_id": ObjectId(comment_id)})
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        if comment_pick["user_likes"].count(ObjectId(session["user_id"])):
            like_comment = {"$pull": {
                "comments_liked": ObjectId(comment_id)
            }}
            user_likes = {"$pull": {
                "user_likes": ObjectId(session["user_id"])
            }}
            mongo.db.comments.update_one(
                {"_id": ObjectId(comment_id)}, user_likes)
            mongo.db.users.update_one(
                {"_id": ObjectId(session["user_id"])}, like_comment)
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        dream = return_view(selected)
        return render_template(
            "dreamscape.html", base_url=base_url, user=user_info, dream=dream,
            selected=selected, dream_slug=dream_slug, comments=comments,
            comment_id=comment_id)
    return redirect(url_for("home"))


@app.route(
    "/dislike-dream-comment/<dream_slug>/<selected>/<comment_id>",
    methods=["GET", "POST"])
def dislike_dream_comment(dream_slug, selected, comment_id):
    if session.get("user_id") is not None:
        comment_pick = mongo.db.comments.find_one(
            {"_id": ObjectId(comment_id)})
        if "user_dislikes" in comment_pick:
            if not comment_pick["user_dislikes"].count(
             ObjectId(session["user_id"])):
                dislike_comment = {"$push": {
                    "comments_disliked": ObjectId(comment_id)
                }}
                user_dislikes = {"$push": {
                    "user_dislikes": ObjectId(session["user_id"])
                }}
                mongo.db.users.update_one(
                    {"_id": ObjectId(session["user_id"])}, dislike_comment)
                mongo.db.comments.update_one(
                    {"_id": ObjectId(comment_id)}, user_dislikes)
        else:
            dislike_comment = {"$push": {
                "comments_disliked": ObjectId(comment_id)
            }}
            user_dislikes = {"$push": {
                "user_dislikes": ObjectId(session["user_id"])
            }}
            mongo.db.users.update_one(
                {"_id": ObjectId(session["user_id"])}, dislike_comment)
            mongo.db.comments.update_one(
                {"_id": ObjectId(comment_id)}, user_dislikes)
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        dream = return_view(selected)
        return render_template(
            "dreamscape.html", base_url=base_url, user=user_info, dream=dream,
            selected=selected, dream_slug=dream_slug, comments=comments,
            comment_id=comment_id)
    return redirect(url_for("home"))


@app.route(
    "/undislike-dream-comment/<dream_slug>/<selected>/<comment_id>",
    methods=["GET", "POST"])
def undislike_dream_comment(dream_slug, selected, comment_id):
    if session.get("user_id") is not None:
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        comment_pick = mongo.db.comments.find_one(
            {"_id": ObjectId(comment_id)})
        if comment_pick["user_dislikes"].count(ObjectId(session["user_id"])):
            undislike_comment = {"$pull": {
                "comments_disliked": ObjectId(comment_id)
            }}
            user_undislikes = {"$pull": {
                "user_dislikes": ObjectId(session["user_id"])
            }}
            mongo.db.comments.update_one(
                {"_id": ObjectId(comment_id)}, user_undislikes)
            mongo.db.users.update_one(
                {"_id": ObjectId(session["user_id"])}, undislike_comment)
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        dream = return_view(selected)
        return render_template(
            "dreamscape.html", base_url=base_url, user=user_info, dream=dream,
            selected=selected, dream_slug=dream_slug, comments=comments,
            comment_id=comment_id)
    return redirect(url_for("home"))


@app.route("/dream/<dream_slug>", methods=["GET", "POST"])
def view_dream(dream_slug):
    if session.get("user_id") is not None:
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
    else:
        user_info = False
    dreams = list(mongo.db.dreams.find())
    for dream in dreams:
        if dream["dream_slug"] == dream_slug:
            comments = list(mongo.db.comments.find().sort(
                "timestamp_created", -1))
            return render_template(
                "dream.html", base_url=base_url, user=user_info, dream=dream,
                dream_slug=dream_slug, comments=comments)
    return render_template('lost-bunnies.html'), 404


#  routes for actions on view dream page
@app.route("/follow-dream/<dream_slug>", methods=["GET", "POST"])
def follow_dream(dream_slug):
    if session.get("user_id") is not None:
        dreams = list(mongo.db.dreams.find())
        for dream in dreams:
            if dream["dream_slug"] == dream_slug:
                if "users_following" in dream:
                    if not dream["users_following"].count(
                      ObjectId(session["user_id"])):
                        add_dream = {"$push": {
                            "dreams_followed": ObjectId(dream["_id"])
                        }}
                        add_user = {"$push": {
                            "users_following": ObjectId(session["user_id"])
                        }}
                        mongo.db.dreams.update_one(
                            {"dream_slug": dream_slug}, add_user)
                        mongo.db.dreams.update_one(
                            {"dream_slug": dream_slug}, {
                                "$inc": {"total_followers": 1}})
                        mongo.db.users.update_one(
                            {"_id": ObjectId(session["user_id"])}, add_dream)
                else:
                    add_dream = {"$push": {
                        "dreams_followed": ObjectId(dream["_id"])
                    }}
                    add_user = {"$push": {
                        "users_following": ObjectId(session["user_id"])
                    }}
                    mongo.db.dreams.update_one(
                        {"dream_slug": dream_slug}, add_user)
                    mongo.db.dreams.update_one(
                        {"dream_slug": dream_slug}, {"$inc": {
                            "total_followers": 1}})
                    mongo.db.users.update_one(
                        {"_id": ObjectId(session["user_id"])}, add_dream)
                user_info = dict(mongo.db.users.find_one(
                    {"_id": ObjectId(session["user_id"])}))
                comments = list(mongo.db.comments.find().sort(
                    "timestamp_created", -1))
                dream = dict(mongo.db.dreams.find_one(
                    {"dream_slug": dream_slug}))
                return render_template(
                    "dream.html", base_url=base_url, user=user_info,
                    dream=dream, dream_slug=dream_slug, comments=comments)
        return render_template('lost-bunnies.html'), 404
    return redirect(url_for("home"))


@app.route("/unfollow-dream/<dream_slug>", methods=["GET", "POST"])
def unfollow_dream(dream_slug):
    if session.get("user_id") is not None:
        dreams = list(mongo.db.dreams.find())
        for dream in dreams:
            if dream["dream_slug"] == dream_slug:
                if dream["users_following"].count(
                  ObjectId(session["user_id"])):
                    # remove from dreams followed list in users
                    remove_dream = {"$pull": {
                        "dreams_followed": ObjectId(dream["_id"])
                    }}
                    mongo.db.users.update_one(
                        {"_id": ObjectId(session["user_id"])}, remove_dream)
                    # remove from users following list in dreams
                    remove_user = {"$pull": {
                        "users_following": ObjectId(session["user_id"])
                    }}
                    mongo.db.dreams.update_one(
                        {"dream_slug": dream_slug}, remove_user)
                    mongo.db.dreams.update_one(
                        {"dream_slug": dream_slug}, {"$inc": {
                            "total_followers": -1}})
                    dream = mongo.db.dreams.find_one(
                        {"dream_slug": dream_slug})
                user_info = dict(mongo.db.users.find_one(
                    {"_id": ObjectId(session["user_id"])}))
                comments = list(mongo.db.comments.find().sort(
                    "timestamp_created", -1))
                dream = dict(mongo.db.dreams.find_one(
                    {"dream_slug": dream_slug}))
                return render_template(
                    "dream.html", base_url=base_url, user=user_info,
                    dream=dream, dream_slug=dream_slug, comments=comments)
        return render_template('lost-bunnies.html'), 404
    return redirect(url_for("home"))


@app.route("/follow-creator/<dream_slug>", methods=["GET", "POST"])
def follow_creator(dream_slug):
    if session.get("user_id") is not None:
        dreams = list(mongo.db.dreams.find())
        for dream in dreams:
            if dream["dream_slug"] == dream_slug:
                user_info = dict(mongo.db.users.find_one(
                    {"_id": ObjectId(session["user_id"])}))
                if "users_followed" in user_info:
                    if not user_info["users_followed"].count(dream["user_id"]):
                        add_user = {"$push": {
                            "users_following": ObjectId(session["user_id"])
                        }}
                        follow_user = {"$push": {
                            "users_followed": ObjectId(dream["user_id"])
                        }}
                        mongo.db.users.update_one(
                            {"_id": ObjectId(dream["user_id"])}, add_user)
                        mongo.db.users.update_one(
                            {"_id": ObjectId(session["user_id"])}, follow_user)
                else:
                    add_user = {"$push": {
                        "users_following": ObjectId(session["user_id"])
                    }}
                    follow_user = {"$push": {
                        "users_followed": ObjectId(dream["user_id"])
                    }}
                    mongo.db.users.update_one(
                        {"_id": ObjectId(dream["user_id"])}, add_user)
                    mongo.db.users.update_one(
                        {"_id": ObjectId(session["user_id"])}, follow_user)
                user_info = dict(mongo.db.users.find_one(
                    {"_id": ObjectId(session["user_id"])}))
                comments = list(mongo.db.comments.find().sort(
                    "timestamp_created", -1))
                dream = dict(mongo.db.dreams.find_one(
                    {"dream_slug": dream_slug}))
                return render_template(
                        "dream.html", base_url=base_url, user=user_info,
                        dream=dream, dream_slug=dream_slug, comments=comments)
        return render_template('lost-bunnies.html'), 404
    return redirect(url_for("home"))


@app.route("/unfollow-creator/<dream_slug>", methods=["GET", "POST"])
def unfollow_creator(dream_slug):
    if session.get("user_id") is not None:
        dreams = list(mongo.db.dreams.find())
        for dream in dreams:
            if dream["dream_slug"] == dream_slug:
                user_info = dict(mongo.db.users.find_one(
                    {"_id": ObjectId(session["user_id"])}))
                if user_info["users_followed"].count(dream["user_id"]):
                    remove_user = {"$pull": {
                        "users_following": ObjectId(session["user_id"])
                    }}
                    unfollow_user = {"$pull": {
                        "users_followed": ObjectId(dream["user_id"])
                    }}
                    mongo.db.users.update_one(
                        {"_id": ObjectId(dream["user_id"])}, remove_user)
                    mongo.db.users.update_one(
                        {"_id": ObjectId(session["user_id"])}, unfollow_user)
                    dream = dict(mongo.db.dreams.find_one(
                        {"dream_slug": dream_slug}))
                    user_info = dict(mongo.db.users.find_one(
                        {"_id": ObjectId(session["user_id"])}))
                    user_info = dict(mongo.db.users.find_one(
                            {"_id": ObjectId(session["user_id"])}))
                user_info = dict(mongo.db.users.find_one(
                    {"_id": ObjectId(session["user_id"])}))
                comments = list(mongo.db.comments.find().sort(
                    "timestamp_created", -1))
                dream = dict(mongo.db.dreams.find_one(
                    {"dream_slug": dream_slug}))
                return render_template(
                        "dream.html", base_url=base_url, user=user_info,
                        dream=dream, dream_slug=dream_slug, comments=comments)
        return render_template('lost-bunnies.html'), 404
    return redirect(url_for("home"))


@app.route("/add-comment/<dream_slug>", methods=["GET", "POST"])
def add_comment(dream_slug):
    if session.get("user_id") is not None:
        if session.get("user_id") is not None:
            dreams = list(mongo.db.dreams.find())
            for dream in dreams:
                if dream["dream_slug"] == dream_slug:
                    user_info = dict(mongo.db.users.find_one(
                        {"_id": ObjectId(session["user_id"])}))
                    timestamp = time()
                    date_time = datetime.fromtimestamp(timestamp)
                    existing_comment = mongo.db.comments.find_one(
                            {"comment": request.form.get(
                                dream_slug + "-text")})
                    if (
                      existing_comment and
                      ObjectId(existing_comment["user_id"]) ==
                      ObjectId(session["user_id"])):
                        flash(
                            "You have already posted this comment.",
                            "amber-flash")
                    else:
                        comment = {
                            "comment": request.form.get(dream_slug + "-text"),
                            "dream_id": ObjectId(dream["_id"]),
                            "user_id": ObjectId(session["user_id"]),
                            "user_name": user_info["first_name"] +
                            " " + user_info["last_name"],
                            "timestamp_created": timestamp,
                            "datetime_created": date_time.strftime(
                                "%d/%m/%Y at %H:%M:%S"),
                            "user_pic": user_info["profile_picture"],
                            "user_pic_alt": user_info["profilepic_alt"]
                        }
                        mongo.db.comments.insert_one(comment)
                        flash('Comment Added', 'green-flash')
                        dream = dict(mongo.db.dreams.find_one(
                            {"dream_slug": dream_slug}))
                        comments = list(mongo.db.comments.find().sort(
                            "timestamp_created", -1))
                        return render_template(
                            "dream.html", base_url=base_url, user=user_info,
                            dream=dream, dream_slug=dream_slug,
                            comments=comments)
            return render_template('lost-bunnies.html'), 404
        return redirect(url_for("home"))


@app.route("/edit-comment/<dream_slug>/<comment_id>", methods=["GET", "POST"])
def edit_comment(dream_slug, comment_id):
    if session.get("user_id") is not None:
        if request.method == "POST":
            new_comment = {"$set": {
                "comment": request.form.get(comment_id + "-text"),
            }}
            mongo.db.comments.update_one(
                {"_id": ObjectId(comment_id)}, new_comment)
            flash('Comment Updated', 'amber-flash')
        dreams = list(mongo.db.dreams.find())
        for dream in dreams:
            if dream["dream_slug"] == dream_slug:
                user_info = dict(mongo.db.users.find_one(
                    {"_id": ObjectId(session["user_id"])}))
                dream = dict(mongo.db.dreams.find_one(
                    {"dream_slug": dream_slug}))
                comments = list(mongo.db.comments.find().sort(
                    "timestamp_created", -1))
                for comment in comments:
                    if str(comment["_id"]) == comment_id:
                        return render_template(
                            "dream.html", base_url=base_url,
                            user=user_info, dream=dream,
                            dream_slug=dream_slug,
                            comments=comments, comment_id=comment_id)
                flash('Comment Not Found', 'amber-flash')
                return render_template(
                        "dream.html", base_url=base_url,
                        user=user_info, dream=dream,
                        dream_slug=dream_slug,
                        comments=comments, comment_id=comment_id)
        return render_template('lost-bunnies.html'), 404
    return redirect(url_for("home"))


@app.route(
    "/delete-comment/<dream_slug>/<comment_id>", methods=["GET", "POST"])
def delete_comment(dream_slug, comment_id):
    if session.get("user_id") is not None:
        dreams = list(mongo.db.dreams.find())
        for dream in dreams:
            if dream["dream_slug"] == dream_slug:
                comments = list(mongo.db.comments.find().sort(
                    "timestamp_created", -1))
                for comment in comments:
                    if str(comment["_id"]) == comment_id:
                        user_info = dict(mongo.db.users.find_one(
                            {"_id": ObjectId(session["user_id"])}))
                        if str(session.get("user_id")) == (
                          (str(comment["user_id"])) or
                          (user_info["role"] == "administrator")):
                            mongo.db.comments.delete_one(
                                {"_id": ObjectId(comment_id)})
                            users = list(mongo.db.users.find())
                            for user in users:
                                if "comments_liked" in user:
                                    if user["comments_liked"].count(
                                      comment_id):
                                        mongo.db.users.update_one(
                                            {"_id": ObjectId(
                                                user["_id"])}, {
                                                    "$pull": {
                                                        "comments_liked":
                                                        comment_id}})
                                if "comments_disliked" in user:
                                    if user["comments_disliked"].count(
                                      comment_id):
                                        mongo.db.users.update_one(
                                          {"_id": ObjectId(user["_id"])},
                                          {"$pull": {
                                            "comments_disliked": comment_id}})
                            flash('Comment Deleted', 'red-flash')
                            dream = dict(
                                mongo.db.dreams.find_one(
                                    {"dream_slug": dream_slug}))
                            comments = list(
                                mongo.db.comments.find().sort(
                                    "timestamp_created", -1))
                            return render_template(
                                "dream.html", base_url=base_url,
                                user=user_info, dream=dream,
                                dream_slug=dream_slug, comments=comments,
                                comment_id=comment_id)
                flash('Comment Not Found', 'amber-flash')
                user_info = dict(mongo.db.users.find_one(
                    {"_id": ObjectId(session["user_id"])}))
                dream = dict(
                    mongo.db.dreams.find_one(
                        {"dream_slug": dream_slug}))
                comments = list(
                    mongo.db.comments.find().sort(
                        "timestamp_created", -1))
                return render_template(
                    "dream.html", base_url=base_url,
                    user=user_info, dream=dream,
                    dream_slug=dream_slug, comments=comments,
                    comment_id=comment_id)
        return render_template('lost-bunnies.html'), 404
    return redirect(url_for("home"))


@app.route("/like-comment/<dream_slug>/<comment_id>", methods=["GET", "POST"])
def like_comment(dream_slug, comment_id):
    if session.get("user_id") is not None:
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        comment_pick = mongo.db.comments.find_one(
            {"_id": ObjectId(comment_id)})
        if "user_likes" in comment_pick:
            if not comment_pick["user_likes"].count(
              ObjectId(session["user_id"])):
                like_comment = {"$push": {
                    "comments_liked": ObjectId(comment_id)
                }}
                user_likes = {"$push": {
                    "user_likes": ObjectId(session["user_id"])
                }}
                mongo.db.comments.update_one(
                    {"_id": ObjectId(comment_id)}, user_likes)
                mongo.db.users.update_one(
                    {"_id": ObjectId(session["user_id"])}, like_comment)
        else:
            like_comment = {"$push": {
                "comments_liked": ObjectId(comment_id)
            }}
            user_likes = {"$push": {
                "user_likes": ObjectId(session["user_id"])
            }}
            mongo.db.comments.update_one(
                {"_id": ObjectId(comment_id)}, user_likes)
            mongo.db.users.update_one(
                {"_id": ObjectId(session["user_id"])}, like_comment)
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        dream = dict(mongo.db.dreams.find_one({"dream_slug": dream_slug}))
        return render_template(
            "dream.html", base_url=base_url, user=user_info, dream=dream,
            dream_slug=dream_slug, comments=comments, comment_id=comment_id)
    return redirect(url_for("home"))


@app.route(
    "/unlike-comment/<dream_slug>/<comment_id>", methods=["GET", "POST"])
def unlike_comment(dream_slug, comment_id):
    if session.get("user_id") is not None:
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        comment_pick = mongo.db.comments.find_one(
            {"_id": ObjectId(comment_id)})
        if comment_pick["user_likes"].count(ObjectId(session["user_id"])):
            like_comment = {"$pull": {
                "comments_liked": ObjectId(comment_id)
            }}
            user_likes = {"$pull": {
                "user_likes": ObjectId(session["user_id"])
            }}
            mongo.db.comments.update_one(
                {"_id": ObjectId(comment_id)}, user_likes)
            mongo.db.users.update_one(
                {"_id": ObjectId(session["user_id"])}, like_comment)
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        dream = dict(mongo.db.dreams.find_one({"dream_slug": dream_slug}))
        return render_template(
            "dream.html", base_url=base_url, user=user_info, dream=dream,
            dream_slug=dream_slug, comments=comments, comment_id=comment_id)
    return redirect(url_for("home"))


@app.route(
    "/dislike-comment/<dream_slug>/<comment_id>", methods=["GET", "POST"])
def dislike_comment(dream_slug, comment_id):
    if session.get("user_id") is not None:
        comment_pick = mongo.db.comments.find_one(
            {"_id": ObjectId(comment_id)})
        if "user_dislikes" in comment_pick:
            if not comment_pick["user_dislikes"].count(
              ObjectId(session["user_id"])):
                dislike_comment = {"$push": {
                    "comments_disliked": ObjectId(comment_id)
                }}
                user_dislikes = {"$push": {
                    "user_dislikes": ObjectId(session["user_id"])
                }}
                mongo.db.users.update_one(
                    {"_id": ObjectId(session["user_id"])}, dislike_comment)
                mongo.db.comments.update_one(
                    {"_id": ObjectId(comment_id)}, user_dislikes)
        else:
            dislike_comment = {"$push": {
                "comments_disliked": ObjectId(comment_id)
            }}
            user_dislikes = {"$push": {
                "user_dislikes": ObjectId(session["user_id"])
            }}
            mongo.db.users.update_one(
                {"_id": ObjectId(session["user_id"])}, dislike_comment)
            mongo.db.comments.update_one(
                {"_id": ObjectId(comment_id)}, user_dislikes)
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        dream = dict(mongo.db.dreams.find_one({"dream_slug": dream_slug}))
        return render_template(
            "dream.html", base_url=base_url, user=user_info, dream=dream,
            dream_slug=dream_slug, comments=comments, comment_id=comment_id)
    return redirect(url_for("home"))


@app.route(
    "/undislike-comment/<dream_slug>/<comment_id>", methods=["GET", "POST"])
def undislike_comment(dream_slug, comment_id):
    if session.get("user_id") is not None:
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        comment_pick = mongo.db.comments.find_one(
            {"_id": ObjectId(comment_id)})
        if comment_pick["user_dislikes"].count(ObjectId(session["user_id"])):
            undislike_comment = {"$pull": {
                "comments_disliked": ObjectId(comment_id)
            }}
            user_undislikes = {"$pull": {
                "user_dislikes": ObjectId(session["user_id"])
            }}
            mongo.db.comments.update_one(
                {"_id": ObjectId(comment_id)}, user_undislikes)
            mongo.db.users.update_one({"_id": ObjectId(
                session["user_id"])}, undislike_comment)
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        comments = list(mongo.db.comments.find().sort("timestamp_created", -1))
        dream = dict(mongo.db.dreams.find_one({"dream_slug": dream_slug}))
        return render_template(
            "dream.html", base_url=base_url, user=user_info, dream=dream,
            dream_slug=dream_slug, comments=comments, comment_id=comment_id)
    return redirect(url_for("home"))


@app.route("/categories", methods=["GET", "POST"])
def categories():
    if session.get("user_id") is not None:
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        if user_info["role"] == "administrator":
            categories = list(mongo.db.categories.find())
            if request.method == "POST":
                if request.form.get("new_categories").strip() != "":
                    new_categories = request.form.get(
                        "new_categories").split(",")
                    new_categories = [x.strip() for x in new_categories]
                    existing_categories = [x["category"] for x in categories]
                    # de-dupe new categories
                    categories_to_add = []
                    [categories_to_add.append(x)
                     for x in new_categories if x not in categories_to_add]
                    # check they're not already added
                    for each_category in existing_categories:
                        if each_category in categories_to_add:
                            categories_to_add.remove(each_category)
                    # add them
                    for next_category in categories_to_add:
                        new_category = {
                            "category": next_category,
                            "created_by": "administrator",
                            "dreams_selected": [],
                            "users_selected": [],
                        }
                        mongo.db.categories.insert_one(new_category)
                # EDIT OR DELETE
                users = mongo.db.users.find()
                dreams = mongo.db.dreams.find()
                for category in categories:
                    if request.form.get(str(category["_id"]) + "-delete"):
                        for user in users:
                            print(user["first_name"])
                            if "interests" in user:
                                for interest in user["interests"]:
                                    if interest == category["category"]:
                                        mongo.db.users.update_one(
                                         {"user_slug": user["user_slug"]}, {
                                          "$pull": {
                                           "interests": category["category"]}})
                        for dream in dreams:
                            if "categories" in dream:
                                for interest in dream["categories"]:
                                    if interest == category["category"]:
                                        mongo.db.dreams.update_one(
                                         {"_id": dream["_id"]}, {"$pull": {
                                          "categories": category["category"]}})
                        mongo.db.categories.delete_one(
                            {"category": request.form.get(
                                str(category["_id"]) + "-current")})
                    else:
                        if request.form.get(str(
                          category["_id"]) + "-new") != "":
                            update_category = {"$set": {
                             "category": request.form.get(
                              str(category["_id"]) + "-new")
                            }}
                            mongo.db.categories.update_one(
                                {"category": request.form.get(
                                    str(category["_id"]) +
                                    "-current")}, update_category)
            categories = list(mongo.db.categories.find())
            return render_template("categories.html", categories=categories)
        return redirect(url_for("dreams"))
    return redirect(url_for("home"))


@app.route("/counting", methods=["GET", "POST"])
def count_followers():
    if session.get("user_id") is not None:
        user_info = dict(mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}))
        if user_info["role"] == "administrator":
            dreams = list(mongo.db.dreams.find())
            for dream in dreams:
                if "users_following" in dream:
                    followers = len(dream["users_following"])
                    print(followers)
                    mongo.db.dreams.update_one(
                        {"_id": dream["_id"]}, {
                            "$set": {
                                "total_followers": int(followers)}})
            return redirect(url_for("profile_personal"))
        return redirect(url_for("profile_personal"))
    return redirect(url_for("home"))


@app.route("/allocate-avatars", methods=["GET", "POST"])
def allocate_avatars():
    if session.get("user_id") is not None:
        user_info = dict(
            mongo.db.users.find_one(
                {"_id": ObjectId(session["user_id"])}))
        if user_info["role"] == "administrator":
            users = list(mongo.db.users.find())
            comments = list(mongo.db.comments.find())
            for user in users:
                for comment in comments:
                    if (str(user["_id"])).count(str(comment["user_id"])):
                        comment_avatar = {"$set": {
                            "user_pic": user["profile_picture"],
                            "user_pic_alt": user["profilepic_alt"]
                        }}
                        mongo.db.comments.update_one(
                            {"_id": comment["_id"]},
                            comment_avatar)
            return redirect(url_for("profile_personal"))
        return redirect(url_for("profile_personal"))
    return redirect(url_for("home"))


@app.route("/add-avatars", methods=["GET", "POST"])
def add_avatars():
    if session.get("user_id") is not None:
        user_info = dict(
            mongo.db.users.find_one(
                {"_id": ObjectId(session["user_id"])}))
        if user_info["role"] == "administrator":
            avatars = list(mongo.db.avatars.find())
            if request.method == "POST":
                uploaded_image = request.files['new_avatar']
                imgname = uploaded_image.filename.split(".", 1)[0]
                filename = str(imgname + "-" + str(user_info["_id"]))
                image_alt = request.form.get("image-alt")
                if uploaded_image:
                    converted_image = imageConvert(
                        uploaded_image, 400, 75, "webp")
                    cloudinary.uploader.upload(
                        converted_image, public_id=filename, folder="profile")
                    profile_picture = {
                        "avatar": filename,
                        "avatar_alt": image_alt
                    }
                    mongo.db.avatars.insert_one(profile_picture)
                return redirect(url_for("add_avatars"))
            return render_template(
                "avatars.html", base_url=base_url, avatars=avatars)
        return render_template(
            "avatars.html", base_url=base_url, avatars=avatars)
    return redirect(url_for("home"))


@app.errorhandler(404)
def page_not_found(e):
    return render_template('lost-bunnies.html'), 404


# launches Hopes and Dreams, calls app environment variables
if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=bool(os.environ.get("DEBUG")))
