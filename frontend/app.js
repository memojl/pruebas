//CRUD

async function listarPost(){    
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const res = await fetch(url);
    const data = await res.json();

    let div = document.getElementById('div-post');
    let content = '';

    data.forEach(item => {
        const {id,userId,title,body}=item;
        if(id<=6){ //console.log(id);
            content += `
        <div class="col-lg-4 col-sm-12">
            <div class="card" style="width: 18rem;">
                <img src="https://cloudvcard.000webhostapp.com/bloques/files/images/photos/sinfoto.png" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${body}</p>
                    <a href="${id}" class="btn btn-primary">Ver más</a>
                </div>
            </div>
        </div>`
        }
    });        
    div.innerHTML = content;
}

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