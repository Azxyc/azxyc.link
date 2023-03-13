require("dotenv").config();

function isValidURL (string) {
  try {
    new URL(string);
  } catch (_) {
    return false;  
  }

  return true;
}


export default async function handler(req, res) {
  try {
    const url = (req.body.url);
    if(!isValidURL(url)) {
        return res.status(400).json({ shortenedURL: "Please enter a valid URL." });
    }
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: process.env.SIO_API_KEY,
      },
      body: JSON.stringify({
        domain: process.env.SIO_BASE_URL,
        originalURL: url,
        allowDuplicates: true,
      }),
    };

    const response = await fetch("https://api.short.io/links/public", options);
    const data = await response.json();
    return res.status(200).json({ shortenedURL: data.shortURL });
  } catch (error) {
    return res
      .status(500)
      .json({ shortenedURL: "Error shortening URL. Please make sure you entered a valid URL." });
  }
}
