let slider = document.querySelector('.slider')
let sliderImages = slider.children[0];
let sliderButtons = slider.children[1].children;

let configForm = document.querySelector('.config');
let intervalId;

let activeSlide = 0;
let prevSlide = 0;

let imageUrls = [
  'https://tse2.explicit.bing.net/th?id=OIP.xL0d1jdNJMcunqr-ejaJRgHaEN&pid=Api&P=0&h=220',
  'https://tse2.mm.bing.net/th?id=OIP.J9jwlaUGI764vuCwREQLgQHaGg&pid=Api&P=0&h=220',
  'https://tse3.mm.bing.net/th?id=OIP.bPBPvdqQ5-qQLPlZ5uKYxgHaFj&pid=Api&P=0&h=220',
  'https://tse1.mm.bing.net/th?id=OIP.AXvtqG903PgMJvOhTwpliwHaFj&pid=Api&P=0&h=220',
  'https://tse2.mm.bing.net/th?id=OIP.WSYT5oAufiAVeYXZM_BedgHaC0&pid=Api&P=0&h=220',
  'https://tse2.mm.bing.net/th?id=OIP.uczAAkmsqiMJDuMy2qf9NwHaE7&pid=Api&P=0&h=220'
]
let imgElements = [];

// configForm.imageFiles.addEventListener('change', () => {
//   let files = Array.from(configForm.imageFiles.files)

//   files.forEach(file => {
//     let fileReader = new FileReader();

//     fileReader.onload = (event) => {
//       let img = document.createElement('img');
//       img.src = event.target.result;
//       img.alt = 'slider';

//       imgElements.push(img);
//       placeImageElementsToUI(img);
//     }

//     fileReader.readAsDataURL(file);
//   })

//   configForm.imageFiles.value = ""
// })

createImageElements();

imgElements[activeSlide].classList.add('active');

function createAutoplay() {
  clearInterval(intervalId)
  if (configForm.autoplay.checked) {
    intervalId = autoPlay(Number(configForm.autoplayValue.value));
  }
}

// configForm.autoplay.addEventListener('change', createAutoplay)
// configForm.autoplayValue.addEventListener('change', createAutoplay)


sliderButtons[0].addEventListener('click', () => {
  prev()
})

sliderButtons[1].addEventListener('click', () => {
  next()
})


function next() {
  if (activeSlide < imgElements.length - 1) {
    activeSlide += 1;
    prevSlide = activeSlide - 1;
    renderSlide();
  } else {
    if (configForm.loop.checked) {
      activeSlide = 0;
      prevSlide = imgElements.length - 1;
      renderSlide();
    }
  }
}

function prev() {
  if (activeSlide > 0) {
    activeSlide -= 1;
    prevSlide = activeSlide + 1;
    renderSlide();
  } else {
    if (configForm.loop.checked) {
      activeSlide = imgElements.length - 1;
      prevSlide = 0;
      renderSlide();
    }
  }
}

function renderSlide() {
  imgElements[activeSlide].classList.add('active');
  imgElements[prevSlide].classList.remove('active');
}

function autoPlay(delay = 3000) {
  return setInterval(() => {
    next();
  }, delay)
}

function createImageElements() {
  imageUrls.forEach(imgUrl => {
    let img = document.createElement('img');
    img.src = imgUrl;
    img.alt = 'slider';

    imgElements.push(img);
    placeImageElementsToUI(img);
  })
}

function placeImageElementsToUI(element) {
  sliderImages.appendChild(element);
}

