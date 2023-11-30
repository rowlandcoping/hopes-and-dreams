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
@app.route("/welcome")
def welcome():
    user_id = mongo.db.users.find_one(
        {"user_id": session["user"]})["_id"]
    if session["user"]:
        return render_template("/feed.html", user_id=user_id)
    return render_template("welcome.html")
    



