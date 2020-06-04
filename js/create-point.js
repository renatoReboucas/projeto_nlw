function populateUFs() {
  const ufSelect = document.querySelector("[name=uf]")
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}

populateUFs()

function getCities(event){
  
  const citiesSelect = document.querySelector("[name=city]")
  const stateSelect = document.querySelector("[name=state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateSelect.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  citiesSelect.innerHTML = `<option value="">Selecione a Cidade</option>`
  citiesSelect.disabled = true
  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for (const city of cities) {
        citiesSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }
      citiesSelect.disabled = false
    })
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

const itemsToCollect = document.querySelectorAll(".items-grid li")

for( const item of itemsToCollect ){
  item.addEventListener("click", handleSelectedItem)
}

let selectedItems = []
let collectedItems = document.querySelector("[name=items]")
function handleSelectedItem(event){
  const itemLi = event.target
  // toggle adiciona se tiver a classe e remove se ele ja tiver ela
  itemLi.classList.toggle("selected")
  const itemId = event.target.dataset.id
  
  const areadySelected = selectedItems.findIndex( item => {
    return item === itemId //isso sera true ou false
  })

  if( areadySelected != -1 ){
    const filteredItems = selectedItems.filter( item => {
      return  item != itemId
    } )
    selectedItems = filteredItems
  }else{
    selectedItems.push(itemId)
  }
  collectedItems.value = selectedItems
  

}