$(function() {

  $('[data-toggle="tooltip"]').tooltip();

  // Fetch playlists
  (function() {
    findAllPlaylists(
      function(playlists) {
        playlists.forEach(function(playlist) {
          $("#tbl-playlists > tbody").append(getRow(playlist));
        }); 
      },
      function() {
        showResponse('Erro', 'Falha ao buscar <b><em>playlists</em></b>', 'error');
      }
    );
  })();

  // Append table with add row form on add new button click
  $(".add_new_playlist").click(function(){
    $(this).attr("disabled", "disabled");
      var index = $("#tbl-playlists tbody tr:last-child").index();
      $("#tbl-playlists").append(getEditRow());   
      $("#tbl-playlists tbody tr").eq(index + 1).find(".add_playlist, .edit_playlist").toggle();
      $('[data-toggle="tooltip"]').tooltip();
  });

  // Add row on add button click
  $(document).on("click", ".add_playlist", function(){
    var empty = false;
    var $tr = $(this).parents("tr");
    var input = $tr.find('input[type="text"]');
    input.each(function(){
      if(!$(this).val()){
        $(this).addClass("error");
        empty = true;
      } else{
        $(this).removeClass("error");
      }
    });
    $tr.find(".error").first().focus();
    if(!empty) {
      var playlist = {};
      input.each(function(){
        playlist[$(this).attr('name')] = $(this).val();
      });     
      var $colId = $($tr.find('.id_playlist'));
      // save playlist
      if ($colId.text() != '-')
        updatePlaylist($colId.text(), playlist,
          function() { 
            input.each(function(){
              $(this).parent("td").html($(this).val());
            });     
            toggleAttr($tr);
            showResponse('Sucesso', '<b><em>Playlist</em></b> atualizada com sucesso', 'success');
          },
          function() {
            showResponse('Erro', 'Falha ao atualizar <b><em>playlist</em></b>', 'error');
          }
        );
      else {
        insertPlaylist(playlist, 
          function(res) { 
            $colId.html(res['id_playlist']);
            input.each(function(){
              $(this).parents("td").html($(this).val());
            });
            toggleAttr($tr);
            showResponse('Sucesso', '<b><em>Playlist</em></b> adicionada com sucesso', 'success');
          },
          function() {
            showResponse('Erro', 'Falha ao adicionar <b><em>playlist</em></b>', 'error');
          }
        );
      }
    }   
  });

  // Edit row on edit button click
  $(document).on("click", ".edit_playlist", function(){    
      const names = ['nome_playlist', 'estilo_playlist', 'obs_playlist'];   
      $(this).parents("tr").find("td:not(:first-child):not(:last-child)").each(function(index){
        $(this).html(`<input type="text" class="form-control" name="${names[index]}" value="${$(this).text()}">`);
      });   
      toggleAttr($($(this).parents("tr")));
  });

  // Delete row on delete button click
  $(document).on("click", ".delete_playlist", function(){
    var $parent = $(this).parents("tr");
    var id = $($parent.find(".id_playlist")).html();
    if (id != '-') { 
      removePlaylist(id, 
        function() { 
          $parent.remove(); 
          showResponse('Sucesso', '<b><em>Playlist</em></b> removida com sucesso', 'success');
        },
        function() {
          showResponse('Erro', 'Falha ao remover <b><em>playlist</em></b>', 'error');
        }
      );
    } else {
      toggleAttr($(this));
      $parent.remove();
    }
  });

  function toggleAttr($this) {
    $this.find(".add_playlist, .edit_playlist").toggle();
    $(".add_new_playlist").removeAttr("disabled");
  }

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
