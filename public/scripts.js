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

const PhotosUpload = {
    limitPhoto: 5,
    photosList: [],
    photoPreview: document.querySelector('#photos-preview'),
    
    fileUpload(event){
        const {files} = event.target
        

        if(this.hasLimit(files)){
            event.preventDefault()
            alert('Não é possível enviar mais de 5 fotos')
        } else{
            Array.from(files).forEach(file => {
                this.photosList.push(file)
    
                const reader = new FileReader()

                reader.onload = () => {
                    const image = new Image()
                    image.src = String(reader.result)

                    const div = this.containerPhoto(image)

                    this.photoPreview.appendChild(div)
                }

                reader.readAsDataURL(file)
            })

        }

    },

    containerPhoto(image){
        const div = document.createElement('div')
        div.classList.add('photo')

        div.appendChild(image)

        return div
    },

    hasLimit(files){
        if((this.photosList.length + files.length) > this.limitPhoto){
            return true
        }

        return false;
    },
}
