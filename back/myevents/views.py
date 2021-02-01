'''
Define las vistas y endpoints del API
'''
from datetime import datetime, timedelta
from flask import request
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from myevents import api, db
from myevents.models import Evento, Usuario, evento_schema, eventos_schema


### Recursos de Autenticación
class RecursoLogin(Resource):
    '''
    Define las operaciones de inicio de sesion
    '''
    def post(self):
        '''
        Inicia sesión a un usuario
        '''
        correo = request.json['correo']
        clave = request.json['clave']

        usuario = Usuario.query.filter_by(correo=correo).first()
        if not usuario or not usuario.verificar_clave(clave):
            return {'success': False, 'message':'Las credenciales no son correctas'}, 401

        expiration = timedelta(days=1)
        token = create_access_token(identity=str(usuario.correo), expires_delta=expiration)

        return {'success': True, 'token': token}, 200


class RecursoRegistro(Resource):
    '''
    Define las operaciones de registro
    '''
    def post(self):
        '''
        Registra a un usuario
        '''
        correo = request.json['correo']
        clave = request.json['clave']

        usuario = Usuario.query.filter_by(correo=correo).first()
        if usuario:
            return {'success': False, 'message':'Ya existe un usuario con ese correo'}, 401

        nuevo_usuario = Usuario(correo=correo, clave=clave)
        nuevo_usuario.hashear_clave()
        db.session.add(nuevo_usuario)
        db.session.commit()

        return {'success': True, 'message': 'Usuario creado exitosamente'}, 201


### Recursos del api de eventos
class RecursoEventos(Resource):
    '''
    Define las operaciones de listar eventos y crear un evento
    '''
    @jwt_required
    def get(self):
        '''
        Devuelve todos los eventos de un usuario
        '''
        correo_usuario = get_jwt_identity()
        creador = Usuario.query.filter_by(correo=correo_usuario).first()
        eventos = creador.eventos
        return eventos_schema.dump(eventos)

    @jwt_required
    def post(self):
        '''
        Crea un evento
        '''
        correo_usuario = get_jwt_identity()
        creador = Usuario.query.filter_by(correo=correo_usuario).first()
        nuevo_evento = Evento(
            nombre=request.json['nombre'],
            categoria=request.json['categoria'],
            lugar=request.json['lugar'],
            direccion=request.json['direccion'],
            fecha_inicio=datetime.strptime(request.json['fecha_inicio'], "%Y-%m-%dT%H:%M:%S.%fZ"),
            fecha_fin=datetime.strptime(request.json['fecha_fin'], "%Y-%m-%dT%H:%M:%S.%fZ"),
            presencial=request.json['presencial'],
            id_creador=creador.id
        )
        db.session.add(nuevo_evento)
        db.session.commit()

        return evento_schema.dump(nuevo_evento)


class RecursoDetalleEvento(Resource):
    '''
    Define las operaciones de detalle de un evento, editar un evento y eliminar un evento
    '''
    @jwt_required
    def get(self, id_evento):
        '''
        Devuelve el evento segun el id del path
        '''
        correo_usuario = get_jwt_identity()
        creador = Usuario.query.filter_by(correo=correo_usuario).first()
        evento = Evento.query.filter_by(usuario=creador, id=id_evento).first()

        if not evento:
            return {'success': False, 'message': 'El evento buscado no existe'}, 404

        return evento_schema.dump(evento)

    @jwt_required
    def put(self, id_evento):
        '''
        Actualiza los campos del evento del path segun los enviados por la petición
        '''
        correo_usuario = get_jwt_identity()
        creador = Usuario.query.filter_by(correo=correo_usuario).first()
        evento = Evento.query.filter_by(usuario=creador, id=id_evento).first()

        if not evento:
            return {'success': False, 'message': 'El evento buscado no existe'}, 404

        if 'nombre' in request.json:
            evento.nombre = request.json['nombre']
        if 'categoria' in request.json:
            evento.categoria = request.json['categoria']
        if 'lugar' in request.json:
            evento.lugar = request.json['lugar']
        if 'direccion' in request.json:
            evento.direccion = request.json['direccion']
        if 'fecha_inicio' in request.json:
            evento.fecha_inicio = datetime.strptime(request.json['fecha_inicio'], "%Y-%m-%dT%H:%M:%S.%fZ")
        if 'fecha_fin' in request.json:
            evento.fecha_fin = datetime.strptime(request.json['fecha_fin'], "%Y-%m-%dT%H:%M:%S.%fZ")
        if 'presencial' in request.json:
            evento.presencial = request.json['presencial']

        db.session.commit()
        return evento_schema.dump(evento)

    @jwt_required
    def delete(self, id_evento):
        '''
        Elimina el evento del id del path
        '''
        correo_usuario = get_jwt_identity()
        creador = Usuario.query.filter_by(correo=correo_usuario).first()
        evento = Evento.query.filter_by(usuario=creador, id=id_evento).first()

        if not evento:
            return {'success': False, 'message': 'El evento buscado no existe'}, 404

        db.session.delete(evento)
        db.session.commit()
        return '', 204



api.add_resource(RecursoLogin, '/api/auth/login')
api.add_resource(RecursoRegistro, '/api/auth/registro')

api.add_resource(RecursoEventos, '/api/eventos')
api.add_resource(RecursoDetalleEvento, '/api/eventos/<int:id_evento>')
