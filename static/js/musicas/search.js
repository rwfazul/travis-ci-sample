$(function() {

  $s_button_musica = $("#s_button_musica");
  $s_nome_musica = $("#s_nome_musica")
  $s_reset_musicas = $("#s_reset_musicas");

  $s_button_musica.on('click', function() {
    findSearchedMusicas(
      $('#id_playlist_musicas').html(),
      $s_nome_musica.val(),
      function(musicas) {
        $("#tbl-musicas > tbody").empty();
        musicas.forEach(function(musica) {
          $("#tbl-musicas > tbody").append(getRow(musica));
        }); 
      },
      function() {
        showResponse('Erro', 'Falha ao buscar <b>músicas</b>', 'error');
      }
    );
  });
  
  $s_reset_musicas.on('click', function() {
    findSearchedMusicas(
      $('#id_playlist_musicas').html(),
      '',
      function(musicas) {
        $("#tbl-musicas > tbody").empty();
        musicas.forEach(function(musica) {
          $("#tbl-musicas > tbody").append(getRow(musica));
        }); 
      },
      function() {
        showResponse('Erro', 'Falha ao buscar <b>músicas</b>', 'error');
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

  function getRow(musica) {
    return (`
      <tr>
        <td class="id_musica">${musica.id_musica}</td>
        <td>${musica.nome_musica}</td>
        <td>${musica.criador_musica}</td>
        <td>${musica.estilo_musica}</td>
        <td>${getActions()}</td>
      </tr>
    `);
  }

  function getActions() {
    return (`
      <a class="add_musica" title="Salvar" data-toggle="tooltip"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></a>
      <a class="edit_musica" title="Editar" data-toggle="tooltip"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>
      <a class="delete_musica" title="Remover" data-toggle="tooltip"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>
    `);
  }

  function getEditRow() {
    return (`<tr><td class="id_musica">-</td>
      <td><input type="text" class="form-control" name="nome_musica" id="nome"></td>
      <td><input type="text" class="form-control" name="criador_musica" id="criador"></td>
      <td><input type="text" class="form-control" name="estilo_musica" id="estilo"></td>
      <td>${getActions()}</td></tr>`);
  }

});
