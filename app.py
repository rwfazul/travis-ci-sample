import sys, os
from flask import Flask, request, jsonify
from flask_restful import reqparse, Api, Resource
import psycopg2
from psycopg2.extras import RealDictCursor


# Flask init
app = Flask(__name__, static_url_path='/static')
app.url_map.strict_slashes = False
api = Api(app)

# Postgres configurations
DATABASE_URL = os.environ['DATABASE_URL']
conn = psycopg2.connect(DATABASE_URL, sslmode='require')

# parsers creation
playlistParser = reqparse.RequestParser()
playlistParser.add_argument('nome_playlist', type=str, required=True, location='form', help='Nome da playlist')
playlistParser.add_argument('estilo_playlist', type=str, required=True, location='form', help='Estilo musical da playlist')
playlistParser.add_argument('obs_playlist', type=str, required=True, location='form', help='Observações da playlist')
musicaParser = reqparse.RequestParser()
musicaParser.add_argument('nome_musica', type=str, required=True, location='form', help='Nome da música')
musicaParser.add_argument('criador_musica', type=str, required=True, location='form', help='Autor da música')
musicaParser.add_argument('estilo_musica', type=str, required=True, location='form', help='Estilo musical da música')

class HomeRouter(Resource):
	def get(self):
		return app.send_static_file('index.html')

class PlaylistsRouter(Resource):
	def get(self, playlist_id=None):
		try:
			cur = conn.cursor(cursor_factory=RealDictCursor)
			if not playlist_id:
				searchParser = reqparse.RequestParser()
				searchParser.add_argument('s', type=str, required=False, location='args', help='Search query')
				args = searchParser.parse_args()
				if not args['s']:
					cur.execute('SELECT * FROM playlists')
				else:
					cur.execute('SELECT * FROM playlists WHERE nome_playlist LIKE %s', ("%" + str(args['s']) + "%",))
			else:
				cur.execute('SELECT * FROM playlists WHERE id_playlist = %s', (str(playlist_id),))
			data = cur.fetchall()
			cur.close()
			return data, 201
		except Exception as e:
			cur.execute("ROLLBACK")
			conn.commit()
			return {'error': str(e)}, 500

	def delete(self, playlist_id):
		try:
			cur = conn.cursor()
			cur.execute('DELETE FROM playlists WHERE id_playlist = %s', (str(playlist_id),))
			conn.commit()
			cur.close()
			return 200
		except Exception as e:
			cur.execute("ROLLBACK")
			conn.commit()
			return {'error': str(e)}, 500

	def put(self, playlist_id):
		try:
			args = playlistParser.parse_args()
			cur = conn.cursor()
			cur.execute('UPDATE playlists SET nome_playlist = %s, estilo_playlist = %s, obs_playlist = %s WHERE id_playlist = %s', (args['nome_playlist'], args['estilo_playlist'], args['obs_playlist'], str(playlist_id)))
			conn.commit()
			cur.close()
			return 200
		except Exception as e:
			cur.execute("ROLLBACK")
			conn.commit()
			return {'error': str(e)}, 500

	def post(self):
		try:
			args = playlistParser.parse_args()
			cur = conn.cursor()
			cur.execute('INSERT INTO playlists(nome_playlist, estilo_playlist, obs_playlist) VALUES(%s, %s, %s) RETURNING id_playlist', (args['nome_playlist'], args['estilo_playlist'], args['obs_playlist']))
			args['id_playlist'] = cur.fetchone()[0] or -1
			conn.commit()
			cur.close()
			return args, 201
		except Exception as e:
			cur.execute("ROLLBACK")
			conn.commit()
			return {'error': str(e)}, 500

class MusicasRouter(Resource):
	def get(self, playlist_id, musica_id=None):
		try:
			cur = conn.cursor(mdb.cursors.DictCursor)
			if not musica_id:
				searchParser = reqparse.RequestParser()
				searchParser.add_argument('s', type=str, required=False, location='args', help='Search query')
				args = searchParser.parse_args()
				if not args['s']:
					cur.execute('SELECT * FROM musicas WHERE id_playlist = %s', (str(playlist_id),))
				else:
					cur.execute('SELECT * FROM musicas WHERE id_playlist = %s AND nome_musica LIKE %s', (str(playlist_id), "%" + str(args['s']) + "%",))
			else:
				cur.execute('SELECT * FROM musicas WHERE id_playlist = %s AND id_musica = %s', (str(playlist_id), str(musica_id)))
			data = cur.fetchall()
			cur.close()
			return data, 201
		except Exception as e:
			cur.execute("ROLLBACK")
			conn.commit()
			return {'error': str(e)}, 500

	def delete(self, playlist_id, musica_id):
		try:
			cur = conn.cursor()
			cur.execute('DELETE FROM musicas WHERE id_playlist = %s AND id_musica = %s', (str(playlist_id), str(musica_id)))
			conn.commit()
			cur.close()
			return 200
		except Exception as e:
			cur.execute("ROLLBACK")
			conn.commit()
			return {'error': str(e)}, 500

	def put(self, playlist_id, musica_id):
		try:
			args = musicaParser.parse_args()
			cur = conn.cursor()
			cur.execute('UPDATE musicas SET nome_musica = %s, criador_musica = %s, estilo_musica = %s WHERE id_playlist = %s AND id_musica = %s', (args['nome_musica'], args['criador_musica'], args['estilo_musica'], str(playlist_id), str(musica_id)))
			conn.commit()
			cur.close()
			return 200
		except Exception as e:
			cur.execute("ROLLBACK")
			conn.commit()
			return {'error': str(e)}, 500

	def post(self, playlist_id):
		try:
			args = musicaParser.parse_args()
			cur = conn.cursor()
			cur.execute('INSERT INTO musicas(nome_musica, criador_musica, estilo_musica, id_playlist) VALUES(%s, %s, %s, %s) RETURNING id_music', (args['nome_musica'], args['criador_musica'], args['estilo_musica'], str(playlist_id)))
			args['id_musica'] = cur.fetchone()[0] or -1
			conn.commit()
			cur.close()
			return args, 201
		except Exception as e:
			cur.execute("ROLLBACK")
			conn.commit()
			return {'error': str(e)}, 500

# routers 
api.add_resource(HomeRouter, '/')
api.add_resource(PlaylistsRouter, '/playlists', '/playlists/<int:playlist_id>')
api.add_resource(MusicasRouter, '/playlists/<int:playlist_id>/musicas', '/playlists/<int:playlist_id>/musicas/<int:musica_id>')

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0')
