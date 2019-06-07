import string, random

def get_random_str(size=8, chars=string.ascii_lowercase + string.digits):
	return ''.join(random.choice(chars) for _ in range(size))

def gen_playlists(repeat=10, start_id=1):
	playlists = []
	for i in range(repeat): 
		playlists.append({"id_playlist": i + start_id, "nome_playlist": get_random_str(), "estilo_playlist":  get_random_str(), "obs_playlist":  get_random_str(20)})
	return playlists

def gen_musics(repeat=10, start_id=1):
	musics= []
	for i in range(repeat): 
		musics.append({"id_musica": i + start_id, "nome_musica": get_random_str(), "criador_musica": get_random_str(), "estilo_musica": get_random_str(), "id_playlist": 1})
	return musics

def get_playlist_by_id(playlists, id):
	for p in playlists:
		if p['id_playlist'] is id:	
			return p
	return None

def get_music_by_id(musics, id):
	for m in musics:
		if m['id_musica'] is id:
			return m
	return None

def add_playlist(playlists, new):
	playlists.append(new)
	return playlists

def add_music(musics, new):
	musics.append(new)
	return musics

def remove_playlist_by_id(playlists, id):
	for p in playlists:
		if p['id_playlist'] is id:
			playlists.remove(p)
	return playlists

def remove_music_by_id(musics, id):
	for m in musics:
		if m['id_musica'] is id:
			musics.remove(m)
	return musics

if __name__ == '__main__':
	playlists = gen_playlists()
	musics = gen_musics()
	print(len(playlists))
	print(len(musics))
	print(len(remove_playlist_by_id(playlists, 1)))
	print(len(remove_music_by_id(musics, 1)))
	print(len(add_playlist(playlists, gen_playlists(1, 11)[0])))
	print(len(add_music(musics, gen_musics(1, 11)[0])))
	print(get_playlist_by_id(playlists, 11) is not None)
	print(get_music_by_id(musics, 11) is not None)
