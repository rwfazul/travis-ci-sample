$(function() {

  $s_button_playlist = $("#s_button_playlist");
  $s_nome_playlist = $("#s_nome_playlist")
  $s_reset_playlists = $("#s_reset_playlists");

  $s_button_playlist.on('click', function() {
    findSearchedPlaylists(
      $s_nome_playlist.val(),
      function(playlists) {
        $("#tbl-playlists > tbody").empty();
        playlists.forEach(function(playlist) {
          $("#tbl-playlists > tbody").append(getRow(playlist));
        }); 
      },
      function() {
        showResponse('Erro', 'Falha ao buscar <b><em>playlists</em></b>', 'error');
      }
    );
  });
  
  $s_reset_playlists.on('click', function() {
    findSearchedPlaylists(
      '',
      function(playlists) {
        $("#tbl-playlists > tbody").empty();
        playlists.forEach(function(playlist) {
          $("#tbl-playlists > tbody").append(getRow(playlist));
        }); 
      },
      function() {
        showResponse('Erro', 'Falha ao buscar <b><em>playlists</em></b>', 'error');
      }
    );
  });
  
  function showResponse(heading, msg, type) {
    $.toast({
      heading: heading,
      text: msg,
      showHideTransition: 'slide',
      icon: type
    });
  }

  function getRow(playlist) {
    return (`
      <tr>
        <td class="id_playlist">${playlist.id_playlist}</td>
        <td>${playlist.nome_playlist}</td>
        <td>${playlist.estilo_playlist}</td>
        <td>${playlist.obs_playlist}</td>
        <td>${getActions()}</td>
      </tr>
    `);
  }

  function getActions() {
    return (`
      <a class="add_playlist" title="Salvar" data-toggle="tooltip"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></a>
      <a class="edit_playlist" title="Editar" data-toggle="tooltip"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>
      <a class="delete_playlist" title="Remover" data-toggle="tooltip"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>
      <a class="musicas_playlist" title="Músicas" data-toggle="tooltip"><span class="glyphicon glyphicon-music" aria-hidden="true"></span></a>
    `);
  }

  function getEditRow() {
    return (`<tr><td class="id_playlist">-</td>
      <td><input type="text" class="form-control" name="nome_playlist" id="nome"></td>
      <td><input type="text" class="form-control" name="estilo_playlist" id="estilo"></td>
      <td><input type="text" class="form-control" name="obs_playlist" id="obs"></td>
      <td>${getActions()}</td></tr>`);
  }

});
