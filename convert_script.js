document.getElementById('imageInput').addEventListener('change', handleImage);

// Populate language picker
const languagePicker = document.getElementById('languagePicker');
const languageDictionary = {
    "Afrikaans": "afr",
    "Amharic": "amh",
    "Arabic": "ara",
    "Assamese": "asm",
    "Azerbaijani": "aze",
    "Azerbaijani - Cyrilic": "aze_cyrl",
    "Belarusian": "bel",
    "Bengali": "ben",
    "Tibetan": "bod",
    "Bosnian": "bos",
    "Breton": "bre",
    "Bulgarian": "bul",
    "Catalan; Valencian": "cat",
    "Cebuano": "ceb",
    "Czech": "ces",
    "Chinese - Simplified": "chi_sim",
    "Chinese - Traditional": "chi_tra",
    "Cherokee": "chr",
    "Corsican": "cos",
    "Welsh": "cym",
    "Danish": "dan",
    "Danish - Fraktur (contrib)": "dan_frak",
    "German": "deu",
    "German - Fraktur (contrib)": "deu_frak",
    "Dzongkha": "dzo",
    "Greek, Modern (1453-)": "ell",
    "English": "eng",
    "English, Middle (1100-1500)": "enm",
    "Esperanto": "epo",
    "Math / equation detection module": "equ",
    "Estonian": "est",
    "Basque": "eus",
    "Faroese": "fao",
    "Persian": "fas",
    "Filipino (old - Tagalog)": "fil",
    "Finnish": "fin",
    "French": "fra",
    "German - Fraktur": "frk",
    "French, Middle (ca.1400-1600)": "frm",
    "Western Frisian": "fry",
    "Scottish Gaelic": "gla",
    "Irish": "gle",
    "Galician": "glg",
    "Greek, Ancient (to 1453) (contrib)": "grc",
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
    "Occitan (post 1500)": "oci",
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
    const selectedLanguage = languagePicker.value;

    Tesseract.recognize(
        img,
        selectedLanguage,
        { logger: info => console.log(info) }
    ).then(({ data: { text } }) => {
        document.getElementById('textbox').value = text;
    }).catch(error => {
        console.error('Error during OCR:', error);
    });
}