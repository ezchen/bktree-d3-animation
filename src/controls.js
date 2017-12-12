class TreeControls {
  /**
   * Takes in a BKTreeD3 instance
   *
   * Creates a new instance of controls which listens to the input/buttons
   */
  constructor(bktree_d3) {
    this.bktree_d3 = bktree_d3;
    this.insertControl = new InsertControl(bktree_d3);
    this.searchControl = new SearchControl(bktree_d3);
  }
}

class InsertControl {
  constructor(bktree_d3) {
    this.bktree_d3 = bktree_d3;
    this.insertInputEl = document.getElementById("insert-input");
    this.insertButton = document.getElementById("insert-button");

    let that = this;
    this.insertButton.addEventListener("click", function() {
      that.insertFromInputIfValid();
    });

    this.insertInputEl.addEventListener("keydown", function(e) {
      if (e.which == 13 || e.keyCode == 13) {
        that.insertFromInputIfValid();
      }
    });
  }

  insertFromInputIfValid() {
    let word = this.insertInputEl.value;
    if (word != null && word != undefined && word != "") {
      console.log(this.bktree_d3);
      this.bktree_d3.addWithAnimations(word);
    }
  }
}

class SearchControl {
  constructor(bktree_d3) {
    this.bktree_d3 = bktree_d3;
    this.searchInputEl = document.getElementById("search-input");
    this.searchButton = document.getElementById("search-button");

    var that = this;
    this.searchButton.addEventListener("click", function() {
      bktree_d3.resetColors();
      that.searchFromInputIfValid();
    });

    this.searchInputEl.addEventListener("keydown", function(e) {
      if (e.which == 13 || e.keyCode == 13) {
        that.searchFromInputIfValid();
      }
    });
  }

  searchFromInputIfValid() {
    let word = this.searchInputEl.value;
    if (word != null && word != undefined) {
      this.bktree_d3.get_similar_words(word);
    }
  }
}

export default TreeControls;
