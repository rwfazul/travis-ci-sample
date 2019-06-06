$(function() {

  const $modal = $('#modal-musicas');
  const $playlist_name = $('#modal_playlist_name');
  const $playlist_ref = $('#id_playlist_musicas');

  $(document).on("click", ".musicas_playlist", function() {
    var $parent = $(this).parents("tr");
    var id_playlist = $($parent.find(".id_playlist")).html();
    if (id_playlist != '-') {
      var nome_playlist = $($parent.children('td').eq(1)).html();
      findAllMusicas(id_playlist,
        function(musicas) {
          $("#tbl-musicas > tbody").html('');
          musicas.forEach(function(musica) {
            $("#tbl-musicas > tbody").append(getRow(musica));
          }); 
          $playlist_name.html($.trim(nome_playlist));
          $playlist_ref.html(id_playlist);
          $modal.modal('show');
        },
        function() {
          showResponse('Erro', 'Falha ao buscar <b>músicas</b>', 'error');
        }
      );
    }
  });   

  // Append table with add row form on add new button click
  $(".add_new_musica").click(function(){
    $(this).attr("disabled", "disabled");
      var index = $("#tbl-musicas tbody tr:last-child").index();
      $("#tbl-musicas").append(getEditRow());   
      $("#tbl-musicas tbody tr").eq(index + 1).find(".add_musica, .edit_musica").toggle();
      $('[data-toggle="tooltip"]').tooltip();
  });

  // Add row on add button click
  $(document).on("click", ".add_musica", function(){
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
      var musica = {};
      input.each(function(){
        musica[$(this).attr('name')] = $(this).val();
      });     
      var $colId = $($tr.find('.id_musica'));
      // save playlist
      var id_playlist = $playlist_ref.html();
      if ($colId.text() != '-')
        updateMusica(id_playlist, $colId.text(), musica,
          function() { 
            input.each(function(){
              $(this).parent("td").html($(this).val());
            });     
            toggleAttr($tr);
            showResponse('Sucesso', '<b>Música</b> atualizada com sucesso', 'success');
          },
          function() {
            showResponse('Erro', 'Falha ao atualizar <b>música</b>', 'error');
          }
        );
      else {
        insertMusica(id_playlist, musica, 
          function(res) { 
            $colId.html(res['id_musica']);
            input.each(function(){
              $(this).parents("td").html($(this).val());
            });
            toggleAttr($tr);
            showResponse('Sucesso', '<b>Música</b> adicionada com sucesso', 'success');
          },
          function() {
            showResponse('Erro', 'Falha ao adicionar <b>música</b>', 'error');
          }
        );
      }
    }   
  });

  // Edit row on edit button click
  $(document).on("click", ".edit_musica", function(){    
      const names = ['nome_musica', 'criador_musica', 'estilo_musica'];   
      $(this).parents("tr").find("td:not(:first-child):not(:last-child)").each(function(index){
        $(this).html(`<input type="text" class="form-control" name="${names[index]}" value="${$(this).text()}">`);
      });   
      toggleAttr($($(this).parents("tr")));
  });

  // Delete row on delete button click
  $(document).on("click", ".delete_musica", function(){
    var $parent = $(this).parents("tr");
    var id_musica = $($parent.find(".id_musica")).html();
    if (id_musica != '-') {
      var id_playlist = $playlist_ref.html();
      removeMusica(id_playlist, id_musica, 
        function() { 
          $parent.remove(); 
          showResponse('Sucesso', '<b>Música</b> removida com sucesso', 'success');
        },
        function() {
          showResponse('Erro', 'Falha ao remover <b>música</b>', 'error');
        }
      );
    } else {
      toggleAttr($(this));
      $parent.remove();
    }
  });

  function toggleAttr($this) {
    $this.find(".add_musica, .edit_musica").toggle();
    $(".add_new_musica").removeAttr("disabled");
  }

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