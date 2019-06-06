const API = 'http://localhost/api';
const playlistAPI = `${API}/playlists`;

function doAjax(url, method, data, success, error) {
	$.ajax({
	    url: url,
		method: method,
	    data: data,
	    success: success,
	    error: error
	});
}

function findAllPlaylists(cbSuccess, cbError) {
	doAjax(playlistAPI, 'GET', '', cbSuccess, cbError);
}

function findSearchedPlaylists(query, cbSuccess, cbError) {
	doAjax(`${playlistAPI}?s=${query}`, 'GET', '', cbSuccess, cbError);
}

function insertPlaylist(playlist, cbSuccess, cbError) {
	doAjax(playlistAPI, 'POST', playlist, cbSuccess, cbError);
}

function updatePlaylist(id, playlist, cbSuccess, cbError) {
	doAjax(`${playlistAPI}/${id}`, 'PUT', playlist, cbSuccess, cbError);
}

function removePlaylist(id, cbSuccess, cbError) {
	doAjax(`${playlistAPI}/${id}`, 'DELETE', '', cbSuccess, cbError);
}