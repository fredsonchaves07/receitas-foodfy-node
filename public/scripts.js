// TODO -> refatorar todo os scripts
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

// TODO -> Refatorar objeto de envio de fotos (Pensar em uma ideia mais simples)
const PhotosUpload = {
    limitPhoto: 5,
    photosList: [],
    photoPreview: document.querySelector('#photos-preview'),
    fileList: null,
    inputFile: '',

    fileUpload(event){
        const divPhotoCount = document.querySelector('#photos-preview').childElementCount

        PhotosUpload.inputFile = event.target

        const {files} = event.target
        PhotosUpload.fileList = files
        
        if(this.hasLimit(files)){
            event.preventDefault()
            alert('Não é possível enviar mais de 5 fotos')
        } else{
            Array.from(files).forEach(file => {
                PhotosUpload.photosList.push(file)
    
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
        const i = document.createElement('i')
        
        i.classList.add('material-icons')
        i.addEventListener('click', this.removePhoto)
        i.innerText = 'close'

        div.classList.add('photo')
        div.appendChild(image)
        div.appendChild(i)

        return div
    },

    hasLimit(files){
        const divPhotoCount = document.querySelector('#photos-preview').childElementCount
        
        
        if((divPhotoCount + files.length) > this.limitPhoto){
            return true
        }

        return false;
    },

    removePhoto(event){
        const photoDiv = event.target.parentNode
        const photoArray = Array.from(PhotosUpload.photoPreview.children)
        const index = photoArray.indexOf(photoDiv)

        if(PhotosUpload.fileList){
            Array.from(PhotosUpload.fileList).splice(index, 1);
        }
        
        PhotosUpload.photosList.splice(index, 1)
        photoDiv.remove()

    },
}
