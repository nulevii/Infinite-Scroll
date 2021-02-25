const ImageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];


// Unsplash API
let count  = 8;
const apiKey = 'A5wUte0G2AHzpd3I8acy8DivCH5-eAnH5EDXwp4oaNo';
const collections = '31873523,11371241,1916426,32354013,51607279023179,1653544,1351708,10457477,9834903,4466867'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&collections=${collections}`;


// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++ ;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        loader.hidden = true;
        ready = true;
        console.log('ready= ', ready);
        imageQuantityIncriser()
    }
}


//Increase quantity of loaded photos
 
function imageQuantityIncriser() {
    if (ready == true) {
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&collections=${collections}`;
    }

}
    


// Set Attributes to DOM Elements
function setAttributes(element , attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements for Links&Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photoArray.length;
    console.log('total images' , totalImages);

    // Run function for each object in photosArray
    photoArray.forEach((photo) => {
    // Create link  to Unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item. setAttribute('target', 'blank');

    setAttributes(item, {
        href: photo.links.html,
        target: '_blank',

    });
    // Create <img> for photo
    const img = document.createElement('img');
    img.classList.add('image')
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);

    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener('load' , imageLoaded)
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    ImageContainer.appendChild(item);
    

    });
}
// Get photos from Unsplash API
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
        
    }catch (error) {
        //Catch Error Here
    }
}


// Check to see if scrolling near bottom, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4000 && ready) {
        ready = false;
        getPhotos();
    }
});
// On load
getPhotos();