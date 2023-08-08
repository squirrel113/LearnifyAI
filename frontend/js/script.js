const form = document.querySelector("form");
fileInput = form.querySelector(".file-input")
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area"),

form.addEventListener("click", () => {
    fileInput.click();
});

fileInput.onchange = ({target}) => {
    let file = target.files[0]; // getting file and [0] means if user has selected multuiple files then get multiple
    if (file){ // if file is selected 
        let fileName = file.name; // getting selected filename
        console.log(fileName);
        uploadFile(fileName); // calling uploadFile with passing filename as an argument
    }
}

function uploadFile(name) {
    let xhr = new XMLHttpRequest(); // Creating new xml obj (AJAX)
    xhr.open("POST", "php/upload.php");
    xhr.upload.addEventListener("progress", ({loaded, total}) => {
        let fileUpload = Math.floor((loaded / total) * 100);
        let fileTotal = Math.florr(total / 1000);
        console.log(fileLoaded, fileTotal);
        let progressHTML = `<div class="row">
        <i class="fas fa-file"></i>
        <div class="details">
            <span>File1.txt</span>
            <div class="progress-bar">
                <div class="progress"></div>
            </div>
        </div>
    </div>
    <div class="row">
        <i class="fas fa-file"></i>
        <div class="details">
            <span>File2.jpg</span>
            <div class="progress-bar">
                <div class="progress"></div>
            </div>
        </div>
    </div>`;
    });
    let formData = new FormData(form);
    xhr.send(formData); //sending form
}