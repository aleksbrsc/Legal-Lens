const axios = require("axios").default;

const options = {
  method: "POST",
  url: "https://api.edenai.run/v2/translation/automatic_translation",
  headers: {
    authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzVjOTljNjYtZmUzMS00ZGQ1LTgyYmYtNDIyNDcyNWE3YmEyIiwidHlwZSI6ImFwaV90b2tlbiJ9.KpQNE3brFTg0gEAARSO8whHhfqq_wvjmctHse44uMOY",
  },
  data: {
    providers: "google",
    text: "Tôi là Nhật Trường. Tôi là một người rất tốt bụng và tôi yêu mẹ tôi rất nhiều. Tôi thích ăn bánh mì và tôi thích chơi bóng đá. Tôi mong muốn trở thành một triệu phú",
    source_language: "vn",
    target_language: "en",
    fallback_providers: "",
  },
};

axios
  .request(options)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });