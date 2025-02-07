const dropFile = document.getElementsByClassName('dropfile')[0]
const selectFile = document.querySelector('input')
const fileDataContainter = document.getElementsByClassName('file-data')[0]
const uploadFile = document.querySelector('button')
const uploadDescription = document.getElementsByClassName('upload-description')[0]
const fileMessage = document.getElementsByClassName('file-message')[0]
const innerValue = fileMessage.innerHTML
const submitButton = document.getElementsByClassName('submit-button')[0]
const formSection = document.getElementsByClassName('register-form')[0]



let fileImg = {}
let srcAvatarImg = ""

//* Check the type and file size
const checkFile = (file) => {

    if (file.type !== ('image/jpeg' || 'image/png')) {
        fileMessage.innerHTML = 'File format not accepted. Please try again'
        fileMessage.classList.add('file-error')
        return false
    } else if (file.size > 500000) {
        fileMessage.innerHTML = 'File too large. Please upload a photo under 500KB'
        fileMessage.classList.add('file-error')
        return false
    }
    fileMessage.innerHTML = innerValue
    fileMessage.classList.remove('file-error')
    return true
}

//* Proccesing the file
const processFile = (files) => {

    const verified = checkFile(files[0]);

    if (verified) {
        uploadFile.style.display = "none";
        uploadDescription.style.display = "none"
        const avatarImg = document.querySelectorAll('.avatar-img');

        console.log(avatarImg);

        const reader = new FileReader()

        reader.onload = (e) => {
            avatarImg.forEach(img => {
                img.src = e.target.result;
                img.alt = files[0].name;
            })

        }
        reader.readAsDataURL(files[0])

        fileDataContainter.hidden = false;
        fileImg = files[0]
        if (!errors.length) submitButton.disabled = false

    } else return false

}

//* Opens the files selector
uploadFile.addEventListener('click', () => {
    selectFile.click()
})

selectFile.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files.length > 0) processFile(files)

})

//* Drag and Drop feature
dropFile.addEventListener('drop', (e) => {
    e.preventDefault()
    const files = e.dataTransfer.files;

    if (files.length > 0) processFile(files)

})

dropFile.addEventListener('dragover', (e) => {
    e.preventDefault()

})


//* Remove or edit file 
const removeImg = document.getElementById('remove');
const changeImg = document.getElementById('change');

removeImg.addEventListener('click', () => {
    fileImg = {}
    fileDataContainter.hidden = true
    uploadFile.style.display = 'block'
    uploadDescription.style.display = "block"
})

changeImg.addEventListener('click', () => {
    fileImg = {}
    selectFile.click()
})


//* Handle inputs value
const userName = document.getElementById('name');
const email = document.getElementById('email');
const github = document.getElementById('github');
const inputs = [userName, email, github];

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function isAlphanumeric(input) {
    const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9_-]+$/; // Allow underscores and hyphens in usernames
    return alphanumericRegex.test(input);
}

const errors = [1, 2, 3] // Used for form validation 

inputs.forEach(input => {
    input.addEventListener('change', (e) => {

        const inputError = input.nextElementSibling;
        const inputValue = e.target.value;

        if (inputValue.length < 4) {
            inputError.style.opacity = "1";
            inputError.textContent = "Must be longer than 4 characters";
            input.style.border = "1px solid #e16151"
            return

        } else {
            inputError.style.opacity = "0";
            input.style.border = "1px solid #8784a4"


            if (input.name === 'email') {
                const testResult = isValidEmail(inputValue);
                if (!testResult) {
                    inputError.style.opacity = "1";
                    inputError.textContent = "Must be a valid email";
                    input.style.border = "1px solid #e16151"
                    return
                }
            } else if (input.name === 'username') {
                const testResult = isAlphanumeric(inputValue);
                if (!testResult) {
                    inputError.style.opacity = "1";
                    inputError.textContent = "Must contain alphanumeric symbols";
                    input.style.border = "1px solid #e16151"
                    return
                }
            }
        }
        errors.pop()
        if (!errors.length && fileImg.name.length) submitButton.disabled = false

    });
});


//* Handle Form data 
const form = document.querySelector('form');


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = {
        id: `#000${Math.floor(Math.random() * 10)}`,
        file: fileImg,
        name: userName.value,
        email: email.value,
        github: github.value
    }

    //Clean all inputs
    inputs.forEach(input => input.value = "")
    fileDataContainter.hidden = true;
    uploadFile.style.display = 'block'
    uploadDescription.style.display = "block"
    fileImg = {}
    submitButton.disabled = true

    //Generate the ticket
    form.style.display = "none"
    const header = document.getElementsByTagName('header')[0]
    header.style.display = "none"
    const ticketCreated = document.getElementsByClassName('ticket-generated')[0]
    ticketCreated.classList.add('ticket-ready')

    const fullName = document.getElementById("fullname")
    const userEmail = document.getElementById("user-email")
    fullName.textContent = formData.name
    userEmail.textContent = formData.email
    console.log(formData.id);


})