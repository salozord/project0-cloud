'''
API for the myevents app
'''
from flask import Flask
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_jwt_extended import JWTManager

app = Flask(__name__, instance_relative_config=True)
app.config.from_object('config')
app.config.from_pyfile('config.py')

db = SQLAlchemy(app)
ma = Marshmallow(app)
jwt = JWTManager(app)
api = Api(app)

import myevents.models
import myevents.views
