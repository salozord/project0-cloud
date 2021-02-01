'''
Setup del paquete de python
'''
from setuptools import setup

setup(
    name='myevents',
    packages=['myevents'],
    include_package_data=True,
    install_requires=[
        'flask',
        'flask-sqlalchemy',
        'marshmallow-sqlalchemy',
        'flask-restful',
        'flask-marshmallow',
        'flask-jwt-extended'
    ],
)
