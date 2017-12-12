class WordListListener {
  constructor() {
    this.wordListEl = document.getElementById("wordlist");
  }

  push(s) {
    this.wordListEl.innerHTML = this.wordListEl.innerHTML + ", " + s;
  }

  clear() {
    this.wordListEl.innerHTML = "";
  }
}

export default WordListListener;
