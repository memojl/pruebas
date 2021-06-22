//CRUD

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
            <div class="card" style="width: 98%;">
                <img src="https://cloudvcard.000webhostapp.com/bloques/files/images/photos/sinfoto.png" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${body}</p>
                    <a href="${id}" class="btn btn-primary">Ver más</a>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg${id}">Ver comentarios</button>
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

async function comentarios(PostId){
const coment = await fetch(`https://jsonplaceholder.typicode.com/posts/${PostId}/comments`);
const datac = await coment.json();

let divc = document.getElementById('div-coment'+PostId);
let contentc = '';
datac.forEach(itemc => {
    const {id,postId,name,email,body}=itemc;
        contentc += `<div class="row">
            <div class="col-md-6"><strong>${name}</strong></div>
            <div class="col-md-6">(${email})</div>
            <div class="col-md-12">${body}</div>
            <div id="${id}" class="col-md-12 text-right">
                <button class="btn btn-primary btnEditar">Editar</button>
                <button class="btn btn-danger btnBorrar">Borrar</button>
            </div>
            <hr>
        </div>`
});
divc.innerHTML = contentc;
}

//ELIMINAR COMENTARIO
$(document).on('click', '.btnBorrar', function(){
  const element = $(this)[0].parentElement;
  const id = $(element).attr('id'); console.log(id);
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