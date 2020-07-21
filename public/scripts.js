const modal = document.querySelector('.modal-background')
const receitas = document.querySelectorAll('.receitas')

const currentPage = location.pathname
const menuItem = document.querySelectorAll('header div:nth-child(2) a')
console.log(menuItem)

for(item of menuItem){
    if(currentPage.includes(item.getAttribute('href'))){
        item.classList.add('active')
    }
}

for(let receita of receitas){
    receita.addEventListener("click", function(){
        console.log('ola')
        modal.classList.add('active')
        var endereco_imagem = receita.querySelector('img').src
        var nome_imagem = receita.querySelector('img').alt
        var info_receita = receita.querySelector('.info').textContent
        var autor = receita.querySelector('.autor').textContent
        modal.querySelector('img').src = endereco_imagem
        modal.querySelector('img').alt = nome_imagem
        modal.querySelector('.info').textContent = info_receita
        modal.querySelector('.autor').textContent = autor
    })
}

document.querySelector('.close-modal').addEventListener("click", function(){
    modal.classList.remove('active')
})