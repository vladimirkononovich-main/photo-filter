const reset = document.querySelector(".btn-reset");
const inputInvert = document.querySelector(".invert");
const inputSepia = document.querySelector(".sepia");
const inputHue = document.querySelector(".hue");
const inputSaturate = document.querySelector(".saturate");
const resultBlur = document.querySelector(".result-blur");
const resultInvert = document.querySelector(".result-invert");
const resultSepia = document.querySelector(".result-sepia");
const resultHue = document.querySelector(".result-hue");
const resultSaturate = document.querySelector(".result-saturate");
const btnSave = document.querySelector(".btn-save");
const inputFile = document.querySelector(".btn-load--input");
const inputBlur = document.querySelector(".blur");
const canvas = document.querySelector(".canvas");
const mainImg = document.querySelector(".main-img");
const btnNext = document.querySelector(".btn-next");
let canvasFilter = getComputedStyle(mainImg);
const hours = new Date();
const getHours = hours.getHours();
const getMinutes = hours.getMinutes();
const getTime = getHours + "." + getMinutes;

function changeLinkDate() {
  let getDay;
  if (+getTime > 0 && +getTime < 5.59) {
    getDay = "night/";
  }
  if (+getTime > 6 && +getTime < 11.59) {
    getDay = "morning/";
  }
  if (+getTime > 12 && +getTime < 17.59) {
    getDay = "afternoon/";
  }
  if (+getTime > 18 && +getTime < 23.59) {
    getDay = "evening/";
  }
  return getDay;
}
const images = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
];
let base =
  "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/";

function createDownloadElement() {
  const link = document.createElement("a");
  let dataURL = canvas.toDataURL("image/png");
  link.download = "download.png";
  link.href = dataURL;
  link.click();
  link.delete;
}
btnSave.addEventListener("mouseover", () => {
  drawImage(mainImg.src);
});
btnSave.addEventListener("click", () => {
  createDownloadElement();
});
function viewBgImage(src) {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    mainImg.setAttribute("src", src);
  };
}
let i = 0;
function getNextImage() {
  const index = i % images.length;
  const imageSrc = base + changeLinkDate() + images[index];
  i++; 
  viewBgImage(imageSrc);
  drawImage(imageSrc);
}
btnNext.addEventListener("click", () => {
  getNextImage();
});
function drawImage(canvasLink) {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = canvasLink;
  img.onload = function() {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    let coef = Math.ceil((img.naturalWidth / img.naturalWidth) * 2 );
    let blur = parseInt(canvasFilter.getPropertyValue("--blur").replace("px", "")) * coef; 
    let invert = canvasFilter.getPropertyValue("--invert"); 
    let sepia = canvasFilter.getPropertyValue("--sepia");
    let saturate = canvasFilter.getPropertyValue("--saturate");
    let hue = canvasFilter.getPropertyValue("--hue");
    
    ctx.filter = 'blur' + "(" + blur + "px" + ")" + " " + 'invert' + "(" + invert + ")" + " " + 'sepia' + "(" + sepia + ")" + " " + 'saturate' + "(" + saturate + ")" + " " + 'hue-rotate' + "(" + hue + ")";
    console.log(coef);
    // console.log();Math.ceil(img.naturalWidth / img.naturalHeight)
    ctx.drawImage(img, 0, 0);

}
  };  

const firstBase = "assets/img/img.jpg";
drawImage(firstBase);
reset.addEventListener("click", (event) => {
  inputBlur.value = 0;
  inputInvert.value = 0;
  inputSepia.value = 0;
  inputHue.value = 0;
  inputSaturate.value = 100;
  resultBlur.textContent = 0;
  resultInvert.textContent = 0;
  resultSepia.textContent = 0;
  resultHue.textContent = 0;
  resultSaturate.textContent = 100;
  mainImg.setAttribute("style", "");
  canvasFilter;
});

document.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("all-input")) {
    event.target.oninput = function () {
      const output = event.target.parentNode.childNodes[3];
      const suffix = this.dataset.sizing;
      output.textContent = this.value;
      mainImg.style.setProperty(`--${this.name}`, this.value + suffix);
        

    };
  }
});
function download(input) {
  let file = input.files[0];
  let reader = new FileReader();

  reader.onloadend = () => {
    viewBgImage(reader.result);
    drawImage(reader.result);
  };
  if (file) {
    reader.readAsDataURL(file);
  }
  inputFile.value = null;
}

document.addEventListener("click", (event) => {
  if (
    !event.target.classList.contains("btn-active") &&
    event.target.classList.contains("btn-all")
  ) {
    document.querySelector(".btn-active").classList.remove("btn-active");
    event.target.classList.add("btn-active");
  }
  if (
    !event.target.classList.contains("btn-active") &&
    event.target.classList.contains("btn-two")
  ) {
    document.querySelector(".btn-active").classList.remove("btn-active");
    document.querySelector(".btn-load").classList.add("btn-active");
  }
  if (event.target.classList.contains("fullscreen")) {
    toggleFullScreen();
  }
});
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
