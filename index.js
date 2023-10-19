class QRCodeGenerator {
    constructor() {
      this.defaultUrl = "https://github.com/di-marko";
      this.colorLight = "#fff";
      this.colorDark = "#111";
      this.text = this.defaultUrl;
      this.size = 300;
  
      this.initDOMElements();
      this.addEventListeners();
      this.generateQRCode();
    }
  
    initDOMElements() {
      this.downloadLink = document.querySelector(".download");
      this.darkColorPicker = document.querySelector(".dark");
      this.lightColorPicker = document.querySelector(".light");
      this.qrContainer = document.querySelector("#qr-code");
      this.qrTextInput = document.querySelector(".qr-txt");
      this.sizeSelector = document.querySelector(".dimensions");
    }
  
    addEventListeners() {
      this.darkColorPicker.addEventListener("input", this.handleDarkColor.bind(this));
      this.lightColorPicker.addEventListener("input", this.handleLightColor.bind(this));
      this.qrTextInput.addEventListener("input", this.handleQRText.bind(this));
      this.sizeSelector.addEventListener("change", this.handleSize.bind(this));
    }
  
    handleDarkColor(e) {
      this.colorDark = e.target.value;
      this.generateQRCode();
    }
  
    handleLightColor(e) {
      this.colorLight = e.target.value;
      this.generateQRCode();
    }
  
    handleQRText(e) {
      this.text = e.target.value || this.defaultUrl;
      this.generateQRCode();
    }
  
    handleSize(e) {
      this.size = e.target.value;
      this.generateQRCode();
    }
  
    generateQRCode() {
      this.qrContainer.innerHTML = "";
      new QRCode("qr-code", {
        text: this.text, 
        height: this.size, 
        width: this.size, 
        colorLight: this.colorLight, 
        colorDark: this.colorDark
      });
      this.downloadLink.href = this.resolveDataUrl();
    }
  
    resolveDataUrl() {
      return new Promise((resolve) => {
        setTimeout(() => {
          const img = document.querySelector("#qr-code img");
          const canvas = document.querySelector("canvas");
          resolve(img.currentSrc || canvas.toDataURL());
        }, 50);
      });
    }
  }
  
  new QRCodeGenerator();
  