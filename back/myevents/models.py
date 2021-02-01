'''
Clase con los modelos de la aplicación
'''
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from myevents import db, ma


### MODELOS
class Usuario(db.Model):
    '''
    Representa un usuario
    '''
    id = db.Column(db.Integer, primary_key=True)
    correo = db.Column(db.String(100), unique=True, nullable=False)
    clave = db.Column(db.String(256), nullable=False)
    eventos = db.relationship('Evento', backref='usuario', lazy=True)

    def hashear_clave(self):
        '''
        Hashea la clave en la base de datos
        '''
        self.clave = generate_password_hash(self.clave, 'sha256')

    def verificar_clave(self, clave):
        '''
        Verifica la clave hasheada con la del parámetro
        '''
        return check_password_hash(self.clave, clave)


class Evento(db.Model):
    '''
    Representa un evento
    '''
    CONFERENCIA = 'Conferencia'
    SEMINARIO = 'Seminario'
    CONGRESO = 'Congreso'
    CURSO = 'Curso'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    categoria = db.Column(db.String(10), nullable=False)
    lugar = db.Column(db.String(100), nullable=False)
    direccion = db.Column(db.String(255), nullable=False)
    fecha_inicio = db.Column(db.DateTime, nullable=False)
    fecha_fin = db.Column(db.DateTime, nullable=False)
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)
    presencial = db.Column(db.Boolean, nullable=False)
    id_creador = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)


### SCHEMAS
class UsuarioSchema(ma.Schema):
    '''
    Representa el schema de un usuario
    '''
    class Meta:
        '''
        Representa los metadatos del esquema de un usuario
        '''
        fields = ("id", "correo", "clave")


class EventoSchema(ma.Schema):
    '''
    Representa el schema de un evento
    '''
    class Meta:
        '''
        Representa los metadatos del esquema de un evento
        '''
        fields = ("id", "nombre", "categoria", "lugar", "direccion", "fecha_inicio", "fecha_fin", "fecha_creacion", "presencial")


evento_schema = EventoSchema()
eventos_schema = EventoSchema(many = True)
usuario_schema = UsuarioSchema()
