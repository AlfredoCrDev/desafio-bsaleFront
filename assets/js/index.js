// Selectores del HTML
const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()

// Evento para cargar funciones al cargar la pagina
document.addEventListener('DOMContentLoaded', ()=>{
  fecthAllProducts()
  buscarPorCategorias()
})

// Variables para los Endpoint
const API_URL_ALLPRODUCTS = "https://test-bsale.onrender.com/api/v1/products";
const API_URL_PRODUCT = "https://test-bsale.onrender.com/api/v1/product"
const API_URL_PRODUCTBYCATEGORY = "https://test-bsale.onrender.com/api/v1/category"


// Funcion para consultar todos los productos
const fecthAllProducts = async () =>{
  try {
    const res = await fetch(API_URL_ALLPRODUCTS)
    let data = await res.json()
    cards(data)
  } catch (error) {
    console.log(error)
  }
}

// Pintar resultados en plantilla de cartas
const cards = (data) => {
  data.forEach(product => {
    templateCard.querySelector('h5').textContent = product.name
    templateCard.querySelector('p').textContent = product.price
    templateCard.querySelector('img').setAttribute('src', product.url_image)
    templateCard.querySelector('.btn-dark').dataset.id = product.id
    
    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
  })
  items.appendChild(fragment)
}

// Funcion para filtrar por categorias
const buscarPorCategorias = async() => {
  try{
    const seleccion = document.getElementById('selectCategory').value
    const res = await fetch(`${API_URL_PRODUCTBYCATEGORY}/${seleccion}`)
    console.log("RES", res)
    const data = await res.json()
    console.log("DATA", data)
    document.getElementById("items").innerHTML = data.map(producto => `
    <div class="col-12 mb-2 col-md-3">
      <div class="card">
          <img src="${producto.url_image}" class="img-card-top">
            <div class="card-body">
                  <h5>${producto.name}</h5>
                  <p>Valor : $ ${producto.price}</p>
                  <button class="btn btn-dark">Comprar</button>
            </div>
      </div>    
    </div>    
      `)
  } catch (error) {
  console.log(error)
  }
}

// Funcion para buscar productos
const buscadorProductos = async () => {
  try {
      const texto = document.getElementById('buscar').value
      document.getElementById('buscar').value = ''
      if (texto === '') return
      const res = await fetch(`${API_URL_PRODUCT}/${texto}`)
      const data = await res.json()
      document.getElementById("items").innerHTML = `<h3 class="text-center"> Articulos Filtrados por "${texto}"</h3>` 
      + data.map(producto => `
      <div class="col-12 mb-2 col-md-4">
      <div class="card">
          <img src="${producto.url_image}" class="img-card-top">
            <div class="card-body">
                  <h5>${producto.name}</h5>
                  <p>Valor : $ ${producto.price}</p>
                  <button class="btn btn-dark">Comprar</button>
            </div>
      </div>    
    </div>    
      `)
  } catch (error) {
      console.log(error)
  }
}  