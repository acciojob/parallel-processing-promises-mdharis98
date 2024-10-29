const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download an image
function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const imgElement = new Image();
    imgElement.src = image.url;

    imgElement.onload = () => resolve(imgElement);
    imgElement.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
  });
}

// Function to download all images
function downloadAllImages() {
  const imagePromises = images.map(downloadImage);

  Promise.all(imagePromises)
    .then((imgElements) => {
      // Clear previous output
      output.innerHTML = '';

      // Display all images
      imgElements.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
      output.innerHTML = `<p style="color: red;">${error}</p>`;
    });
}

// Event listener for the button click
btn.addEventListener("click", downloadAllImages);
