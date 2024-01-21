// const token = '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' 
document.addEventListener('DOMContentLoaded', function () {
    
    initApp();
});

function initApp() {
    
    document.getElementById('imageInput').addEventListener('change', handleImage);
    // Populate language picker
    const languagePicker = document.getElementById('languagePicker');
    const languageDictionary = {
    "Chinese (Simplified)": ["chi_sim","zh-TW"],
    "English": ["eng","en"],
    "Russian": ["rus","ru"],
    // "Afrikaans": "afr",
    // "Amharic": "amh",
    "Arabic": ["ara","ar"],
    // "Assamese": "asm",
    // "Azerbaijani": "aze",
    // "Azerbaijani - Cyrilic": "aze_cyrl",
    // "Belarusian": "bel",
    // "Bengali": "ben",
    "Tibetan": "bod",
    "Bosnian": "bos",
    "Breton": "bre",
    "Bulgarian": "bul",
    "Catalan; Valencian": "cat",
    "Cebuano": "ceb",
    "Czech": "ces",
    "Chinese (Traditional)": "chi_tra",
    "Cherokee": "chr",
    "Corsican": "cos",
    "Welsh": "cym",
    "Danish": "dan",
    "Danish - Fraktur (contrib)": "dan_frak",
    "German": "deu",
    "German - Fraktur (contrib)": "deu_frak",
    "Dzongkha": "dzo",
    // "Greek, Modern (1453-)": "ell",
    // "English, Middle (1100-1500)": "enm",
    // "Esperanto": "epo",
    "Math / equation detection module": "equ",
    "Estonian": "est",
    "Basque": "eus",
    "Faroese": "fao",
    "Persian": "fas",
    "Filipino (old - Tagalog)": "fil",
    "Finnish": "fin",
    "French": "fra",
    "German - Fraktur": "frk",
    // "French, Middle (ca.1400-1600)": "frm",
    "Western Frisian": "fry",
    "Scottish Gaelic": "gla",
    "Irish": "gle",
    "Galician": "glg",
    // "Greek, Ancient (to 1453) (contrib)": "grc",
    "Gujarati": "guj",
    "Haitian; Haitian Creole": "hat",
    "Hebrew": "heb",
    "Hindi": "hin",
    "Croatian": "hrv",
    "Hungarian": "hun",
    "Armenian": "hye",
    "Inuktitut": "iku",
    "Indonesian": "ind",
    "Icelandic": "isl",
    "Italian": "ita",
    "Italian - Old": "ita_old",
    "Javanese": "jav",
    "Japanese": "jpn",
    "Kannada": "kan",
    "Georgian": "kat",
    "Georgian - Old": "kat_old",
    "Kazakh": "kaz",
    "Central Khmer": "khm",
    "Kirghiz; Kyrgyz": "kir",
    "Kurmanji (Kurdish - Latin Script)": "kmr",
    "Korean": "kor",
    "Korean (vertical)": "kor_vert",
    "Kurdish (Arabic Script)": "kur",
    "Lao": "lao",
    "Latin": "lat",
    "Latvian": "lav",
    "Lithuanian": "lit",
    "Luxembourgish": "ltz",
    "Malayalam": "mal",
    "Marathi": "mar",
    "Macedonian": "mkd",
    "Maltese": "mlt",
    "Mongolian": "mon",
    "Maori": "mri",
    "Malay": "msa",
    "Burmese": "mya",
    "Nepali": "nep",
    "Dutch; Flemish": "nld",
    "Norwegian": "nor",
    // "Occitan (post 1500)": "oci",
    "Oriya": "ori",
    "Orientation and script detection module": "osd",
    "Panjabi; Punjabi": "pan",
    "Polish": "pol",
    "Portuguese": "por",
    "Pushto; Pashto": "pus",
    "Quechua": "que",
    "Romanian; Moldavian; Moldovan": "ron",
    "Russian": "rus",
    "Sanskrit": "san",
    "Sinhala; Sinhalese": "sin",
    "Slovak": "slk",
    "Slovak - Fraktur (contrib)": "slk_frak",
    "Slovenian": "slv"
    };

    for (const language in languageDictionary) {
        const option = document.createElement('option');
        option.value = languageDictionary[language];
        option.text = language;
        languagePicker.appendChild(option);
    }

    // Function to take image input
    function handleImage(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    processImage(img);
                    document.getElementById('uploaded_image').src = e.target.result; // display the image
                    document.getElementById('uploaded_image').style.display = 'block'; // display the image
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        document.getElementById('reupload').disabled = false; // Enable the button
    }

    let rawText;
    // Function to process image
    async function processImage(img) {
        const selectedLanguage = languagePicker.value;

        // Transform image to text using Tesseract
        await Tesseract.recognize(
            img,
            selectedLanguage.split(',')[0],
            { logger: info => console.log(info) }
        ).then(({ data: { text } }) => {
            document.getElementById('uploaded-selected-language-text').innerText = text;
            document.getElementById('uploaded-selected-language-text-display').innerText = text;

        }).catch(error => {
            console.error('Error during OCR:', error);
        });

        rawText = document.getElementById('uploaded-selected-language-text').innerText;

        console.log(rawText); //test

        // Translate rawText into English
        if (selectedLanguage.split(',')[0] != 'eng') {
            const options = {
                method: "POST",
                url: "https://api.edenai.run/v2/translation/automatic_translation",
                headers: {
                    authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNGI5YzVlZjUtYzliYS00NDFkLTgzOGItYTQxYTFhNjM0MjhiIiwidHlwZSI6ImZyb250X2FwaV90b2tlbiJ9.EWFrVxdQGtV81PtQO2uo8GvPSBETqAcs9-_PMV8gBi0",
                },
                data: {
                    providers: "google",
                    text: rawText,
                    source_language: selectedLanguage.split(',')[1],
                    target_language: "en",
                    fallback_providers: "",
                },
                };
        
                axios
                    .request(options)
                    .then((response) => {
                        document.getElementById('uploaded-english-text').innerText = response.data['google']['text'];
                        document.getElementById('uploaded-english-text-display').innerText = response.data['google']['text'];
                    })
                    .catch((error) => {
                        console.error(error);
                    });
        
                console.log('Successfully loaded translation'); //test
        } else {
            document.getElementById('uploaded-english-text').innerText = rawText;
        }

        

            
    }

    // // Function to reupload image after the Reupload button is clicked
    // document.getElementById('reupload').addEventListener('click', ReuploadClicked);

    // function ReuploadClicked() {
    //     document.getElementById('uploaded-selected-language-text-display').innerText = "*the text in selected languages*";
    //     document.getElementById('uploaded-english-text-display').innerText = "*the text in english*";
    //     document.getElementById('imageInput').value = ""; // Reset the image input
    //     document.getElementById('reupload').disabled = true; // Enable the button
    //     document.getElementById('uploaded_image').src = ""; // Reset the image
    //     document.getElementById('output-text').innerText = ''; // Reset the image
    //     document.getElementById('uploaded_image').style.display = 'none'; // Reset the image
    // }   

    //TODO:\ OpenAI API to summarize text into dictionary with

    document.getElementById('convert').addEventListener('click', ConvertClicked);

    function ConvertClicked() {

            let rawTextEnglish = document.getElementById('uploaded-english-text').innerText;
            // const openai = new OpenAI({
            //     apiKey: process.env.API_KEY,
            //     });

            // const completion = OpenAI.chat.completions.create({
            //     apiKey: process.env.API_KEY,
            //     messages: [{ role: "system", content: "I am Phineas. I am a student in Sheridan College. I love reading and music. I also work out everyday. Summarize this paragraph into a profiler with keyword-value" }],
            //     model: "gpt-3.5-turbo-1106",
            // });

            // console.log(completion.choices[0]);

            fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo-1106',
                    messages: [{ role: 'user', content: rawTextEnglish+ ". Delete any gibberish and group this paragraph into a human profiler with keyword-value dictionary" }],
                }),
            })
            .then(async response => {
                const result = await response.json();
                document.getElementById('output-text').innerText = result.choices[0].message.content;
                document.getElementById('output-text-display').innerText = result.choices[0].message.content;
            })
        }
    }

    // Submit button
    document.getElementById('submit').addEventListener('click', SubmitClicked);

    async function SubmitClicked() {
        const selectedLanguage = languagePicker.value;
        if (selectedLanguage.split(',')[0] === 'eng') {
            const commentText = document.getElementById('comment_text').value;
            document.getElementById('uploaded-english-text-display').innerText = commentText;
            document.getElementById('uploaded-english-text').innerText = commentText;
        } else{
            const commentText = document.getElementById('comment_text').value;
            document.getElementById('uploaded-selected-language-text-display').innerText = commentText;
            // Translate rawText into English
            const options = {
            method: "POST",
            url: "https://api.edenai.run/v2/translation/automatic_translation",
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNGI5YzVlZjUtYzliYS00NDFkLTgzOGItYTQxYTFhNjM0MjhiIiwidHlwZSI6ImZyb250X2FwaV90b2tlbiJ9.EWFrVxdQGtV81PtQO2uo8GvPSBETqAcs9-_PMV8gBi0",
            },
            data: {
                providers: "google",
                text: commentText,
                source_language: selectedLanguage.split(',')[1],
                target_language: "en",
                fallback_providers: "",
            },
            };
    
            axios
                .request(options)
                .then((response) => {
                    document.getElementById('uploaded-english-text').innerText = response.data['google']['text'];
                    document.getElementById('uploaded-english-text-display').innerText = response.data['google']['text'];
                })
                .catch((error) => {
                    console.error(error);
                });
    
            console.log('Successfully loaded translation'); //test
        }
    }

    
