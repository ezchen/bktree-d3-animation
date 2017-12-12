class TextAnimationListener {
  constructor() {
    this.descriptionEl = document.getElementById("animation-description");
  }

  descriptionUpdate(s) {
    this.changeLabel(s);
  }

  changeLabel(s) {
    this.descriptionEl.innerHTML = s;
  }
}

export default TextAnimationListener;
