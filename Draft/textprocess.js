// In your script.js file
document.getElementById('imageInput').addEventListener('change', handleImage);

function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {  
            const img = new Image();
            img.onload = function () {
                processImage(img);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function processImage(img) {
    const languagePicker = document.getElementById('languagePicker');
    const selectedLanguage = languagePicker.value;
    console.log('Successfully loaded image');
    Tesseract.recognize(
        img,
        selectedLanguage,
        { logger: info => console.log(info) }
    ).then(({ data: { text } }) => {
        document.getElementById('output').innerText = text;
    }).catch(error => {
        console.error('Error during OCR:', error);
    });
}
