

const modal = document.querySelector('.modal-background')
const receitas = document.querySelectorAll('.receitas')

const currentPage = location.pathname
const menuItem = document.querySelectorAll('header div:nth-child(2) a')

for(item of menuItem){
    if(currentPage.includes(item.getAttribute('href'))){
        item.classList.add('active')
    }
}

for(let receita of receitas){
    receita.addEventListener("click", function(){
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
/*
document.querySelector('.close-modal').addEventListener("click", function(){
    modal.classList.remove('active')
})*/

const PhotosUpload = {
    photosList: [],
    filesList: [],
    photoPreview: document.querySelector('#photos-preview'),
    
    fileUpload(event){
        const {files} = event.target

        Array.from(files).forEach(photo => {
            this.filesList.push(photo)
        })

        console.log(this.filesList.length)
    

        if(this.hasLimit()){
            alert('Não é possível enviar mais de 5 fotos')
            event.preventDefault()
        } else{
            this.filesList.forEach(file => {
                this.photosList.push(file)
            })
        }

        console.log(this.photosList.length)

        /*if(this.hasLimit()){
            alert('Não é possível enviar mais de 5 fotos')
            event.preventDefault()
        } else{
            Array.from(this.filesList).forEach(photo => {
                this.photosList.push(photo)
            })

            console.log(this.photosList.length)
            const reader = new FileReader()
            console.log(this.filesList.length)
        }*/


    },

    hasLimit(){
        if(this.photosList.length > 5 || this.filesList.length > 5){
            return true
        }

        return false;
    },

    divPhoto(image){
        const div = document.createElement('div')
        div.classList.add('photo')

        div.appendChild(image)
    }
}
