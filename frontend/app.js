//CRUD
var edit = false;

//Listar POST
async function listarPost(){    
    const post = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await post.json();

    let div = document.getElementById('div-post');
    let content = '';

    data.forEach(item => {
        const {id,userId,title,body}=item;
                
        if(id<=6){ //console.log(id);
            content += `
        <div class="col-lg-4 col-sm-12">
            <div idP="${id}" class="card" style="width: 98%;">
                <img src="https://cloudvcard.000webhostapp.com/bloques/files/images/photos/sinfoto.png" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 id="tit${id}" class="card-title">${title}</h5>
                    <p id="des${id}" class="card-text">${body}</p>
                    <a href="${id}" class="btn btn-primary">Ver más</a>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg${id}">Ver comentarios</button>
                </div>
                <div id="${id}" class="card-footer text-center">
                    <button class="btn btn-primary btnEditar" data-toggle="modal" data-target="#exampleModal">Editar</button>
                    <button class="btn btn-danger btnBorrar">Borrar</button>
                </div>
            </div>
        </div>
<!-- Large modal -->
<div class="modal fade bd-example-modal-lg${id}" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title h4" id="myLargeModalLabel">Comentarios Post-${id}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div id="div-coment${id}" class="modal-body">
      </div>
    </div>
  </div>
</div>`
comentarios(id);        
        }
    });        
    div.innerHTML = content;
}

//BOTON AGREGAR POST
$('.btn-add').click(function(){
    const tit_acc = document.querySelector('#exampleModalLabel');
    tit_acc.innerHTML = 'Agregar';
    $("#form1").trigger('reset');    
});

//BOTON EDITAR POST
$('#div-post').on('click','.btnEditar',function(){
    const tit_acc = document.querySelector('#exampleModalLabel');
    tit_acc.innerHTML = 'Editar';	
    const element = $(this)[0].parentElement;
    const id = $(element).attr('id'); //console.log(id);
    let tit = $('#tit'+id).text(); //console.log(tit);
    let des = $('#des'+id).text(); //console.log(des);

    $('#id').val(id);
    $('#title').val(tit);
    $('#body').val(des);

    edit = true;
});

//SUBMIT AGREGAR/EDITAR
$('#form1').submit(function(e){
  e.preventDefault();
  let id=$('#id').val(); //console.log(id);
  let idp = (id!='')?'/'+id:'';
  let action = (id!='')?'Editado':'Agregado';
  let metodo='';
  let postData = {};
  if(edit==false){
    metodo = 'POST';
    postData = {
      id,
      title: $('#title').val(),
      body: $('#body').val(),
      userId: 1,
    };
  }else{
    metodo = 'PUT';
    postData = {
      title: $('#title').val(),
      body: $('#body').val(),
      userId: 1,
    };
  }

  fetch(`https://jsonplaceholder.typicode.com/posts${idp}`, {
    method: metodo,
    body: JSON.stringify(postData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json())
  .then((data) => console.log(data));

  console.log('Se ha '+action+' el registro '+id);
  $("#form1").trigger('reset');
  $('#exampleModal').modal('hide');
  edit = false;
});

//ELIMINAR POST
$('#div-post').on('click', '.btnBorrar', function(){
  const element = $(this)[0].parentElement;
  const id = $(element).attr('id');//console.log(id);
  Swal.fire({
    title: '¿Está seguro de eliminar este Post '+id+'?',
    text: "¡Está operación no se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Borrar'
  }).then((result) => {
    if (result.value) {
        // Eliminamos el comentario       
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'
        });
        console.log('Borrado Correctamente Fake');
        listarPost();
        Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.','success')
    }
  })        
});



//LISTAR COMENTARIOS
async function comentarios(PostId){
const coment = await fetch(`https://jsonplaceholder.typicode.com/posts/${PostId}/comments`);
const datac = await coment.json();

let divc = document.getElementById('div-coment'+PostId);
let contentc = '';
datac.forEach(itemc => {
    const {id,postId,name,email,body}=itemc;
        contentc += `
        <div idPost="${PostId}" class="row">
            <div class="col-md-6"><strong>${name}</strong></div>
            <div class="col-md-6">(${email})</div>
            <div class="col-md-12">${body}</div>
            <div id="${id}" class="col-md-12 text-right">
                <button class="btn btn-primary btnEditarc">Editar</button>
                <button class="btn btn-danger btnBorrarc">Borrar</button>
            </div>
            <hr>
        </div>`
});
divc.innerHTML = contentc;
}

//ELIMINAR COMENTARIO
$(document).on('click', '.btnBorrarc', function(){
  const element = $(this)[0].parentElement;
  const elePost = element.parentElement;
  const id = $(element).attr('id');//console.log(id);
  const idPost = $(elePost).attr('idPost'); //console.log(idPost);
  Swal.fire({
    title: '¿Está seguro de eliminar el comentario '+id+'?',
    text: "¡Está operación no se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Borrar'
  }).then((result) => {
    if (result.value) {
        // Eliminamos el comentario
        
        fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}/comments?id=${id}`, {
            method: 'DELETE'
        });
        
        comentarios(idPost);
        Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.','success')
    }
  })        
});

function iniciar(){
    listarPost();
}

iniciar();

//ERROR
function alError(error){
  if (error){
    alert('Ha habido problemas al realizar la operación: '+error.code);
  }else{
    alert('Operación realizada con éxito !');
  }
}