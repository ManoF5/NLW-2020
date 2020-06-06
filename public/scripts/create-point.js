console.log("Hello")

function populateUFs () {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`  
        }

    })

}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = false

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.come}">${city.nome}</option>`  
        }

        citySelect.disabled = false

    })

}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)   

  // Itens de coleta
  // pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItens)
}


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []


function handleSelectedItens(event) {
    const itemLi = event.target

  //adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id



  // verificar se existem itens selecionados, se sim
  // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId  // Isso sera True ou False
        return itemFound
    })

  // se já estiver selecionado, tirar da seleção

    if(alreadySelected >= 0 ) {
        // tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems

    }else{  // se não estiver selecionado, adicionar da seleção
        selectedItems.push(itemId)
    }
  
  // atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems
}