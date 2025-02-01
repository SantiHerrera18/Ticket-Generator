const dropFile = document.getElementsByClassName('dropfile')[0]
const selectFile = document.querySelector('input')
const fileName = document.getElementsByClassName('file-name')[0]

//* Opens the files selector
dropFile.addEventListener('click', () => {
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
        fileName.hidden = false;
    }
})

dropFile.addEventListener('dragover', (e) => {
    e.preventDefault()

})
