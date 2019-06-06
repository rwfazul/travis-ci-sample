function findAllMusicas(id_playlist, cbSuccess, cbError) {
	doAjax(`${playlistAPI}/${id_playlist}/musicas`, 'GET', '', cbSuccess, cbError);
}

function findSearchedMusicas(id_playlist, query, cbSuccess, cbError) {
	doAjax(`${playlistAPI}/${id_playlist}/musicas?s=${query}`, 'GET', '', cbSuccess, cbError);
}

function insertMusica(id_playlist, musica, cbSuccess, cbError) {
	doAjax(`${playlistAPI}/${id_playlist}/musicas`, 'POST', musica, cbSuccess, cbError);
}

function updateMusica(id_playlist, id_musica, musica, cbSuccess, cbError) {
	doAjax(`${playlistAPI}/${id_playlist}/musicas/${id_musica}`, 'PUT', musica, cbSuccess, cbError);
}

function removeMusica(id_playlist, id_musica, cbSuccess, cbError) {
	doAjax(`${playlistAPI}/${id_playlist}/musicas/${id_musica}`, 'DELETE', '', cbSuccess, cbError);
}