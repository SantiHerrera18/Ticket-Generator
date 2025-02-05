const dropFile = document.getElementsByClassName('dropfile')[0]
const selectFile = document.querySelector('input')
const fileDataContainter = document.getElementsByClassName('file-data')[0]
const uploadFile = document.querySelector('img')

//* Opens the files selector
uploadFile.addEventListener('click', () => {
    selectFile.click()
})

selectFile.addEventListener('change', (e) => {
    const files = e.target.files;
    console.log(files);

})

//* Drag and Drop feature
dropFile.addEventListener('drop', (e) => {
    e.preventDefault()
    const files = e.dataTransfer.files;
    console.log(files);

    if (files.length > 0) {
        uploadFile.style.display = "none";
        const avatarImg = document.getElementsByClassName('avatar-img')[0];
        const reader = new FileReader()

        reader.onload = (e) => {
            avatarImg.src = e.target.result;
            avatarImg.alt = files[0].name;
        }
        reader.readAsDataURL(files[0])

        fileDataContainter.hidden = false;
    }
})

dropFile.addEventListener('dragover', (e) => {
    e.preventDefault()

})
