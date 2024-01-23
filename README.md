# Legal Lens
A tool for processing physical/digital legal documents of any language into key-value organized data.

![](https://github.com/aleksbrsc/Legal-Lens/blob/main/legal-lens-showcase.gif)

### Inspiration
Applying for many American government documents is far too time-consuming and inconveniences those whose native language is not English. Immigrants and newcomers to English countries needed a solution to save their time and energy in this process.

### What It Does
Legal Lens was built exactly to solve this problem. It is a web app that performs image-to-text transcriptions for legal documents in over 100+ languages, translates them into English, and then organizes the textual data in a straightforward, key-value format. The user can then paste this simplified data into their applications, use it in their auto-fills, organize and save their personal information digitally, etc. 

You can select the document's language, drag an image of it onto the screen (you may even copy-paste words into the textbox / use voice dictation in your native language), and click a button to convert the translated English text into a parameterized format similar to legal applications. 

### How We Built It
This project was made in 2 days using plain HTML/CSS/JS. It uses Tesseract.js for image-to-text transcription, EdenAI for translation, and OpenAI's GPT-3.5 Turbo API for organizing and processing text to send back to the user.

### What's Next for Legal Lens
If we were to revisit this:
- speech-to-text + language recognition
- multilingual website
- web extension/browser plugin for autofill
- more focus on mobile, option to make it work on camera
