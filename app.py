import os
import cloudinary
from flask import (
    Flask, flash, render_template, jsonify,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from flask_restful import Resource, Api
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.datastructures import FileStorage
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

mongo = PyMongo(app)

@app.route("/")
def home():    
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
            return render_template("profile-submit.html", email=session["email"])
        else:
            flash("Registration not successful, please try again.")
        return render_template("signup.html")
    return render_template("signup.html")

@app.route("/be-confident")
def profile_upload():
    return render_template("profile-submit.html")

@app.route("/abandon")
def abandon_signup():
    return redirect(url_for("home"))

@app.route("/welcome", methods=["GET","POST"])
def signin():
    if request.method == "POST":
        existing_user = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()})
        if existing_user:
            if check_password_hash(existing_user["password"], request.form.get("password")):
                session["email"] = existing_user["email"]
                return render_template("profile-submit.html", email=session["email"])
            else:
                flash("Username or Password not valid, please try again.")
                return render_template("landing.html")
        else:
            flash("Username or Password not valid, please try again.")
            return render_template("landing.html")
    return render_template("landing.html")


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)


