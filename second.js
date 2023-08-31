window.addEventListener("load", ()=> {

 class Words {
  constructor(text, translate, pronunciation) {
    this.text = text;
    this.translate = translate;
    this.pronunciation = pronunciation;
  }
 }
              //  class UI

 class UI {

  addWords (word) {
    const wrapperMenu = document.querySelector(".wrapper-menu");
    const li = document.createElement("li");
    li.classList.add("wrapper-item");

    li.innerHTML = `
      <pre class="pre">
        <code>
    {
      "word": "${word.text}",
      "translate": "${word.translate}"
      "pronunciation": "${word.pronunciation}",
    },
        </code>
      </pre>
    `;

    wrapperMenu.append(li);
  }

  showAlert (className, message) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.innerText = message;

    const navbarLogo = document.querySelector(".navbar-logo");
    navbarLogo.after(div);

    setTimeout(()=> {
      document.querySelector('.alert').remove();
    }, 4000);
  }

  clearStrings () {
    document.getElementById("english-word").value = "";
    document.getElementById("translating").value = "";
    document.getElementById("pronunciation").value = "";
  }
 }

              //  class Store

    class Store {
      constructor() {
        this.key = "words";
      }

      getStore () {
        let words;

        if(localStorage.getItem(this.key) !== null) {
          words = JSON.parse(localStorage.getItem(this.key));
        }else {
          words = [];
        }
        return words;
      }

      addStore (word) {
        let words = this.getStore();
        words.push(word);
        localStorage.setItem(this.key, JSON.stringify(words));
      }

      displayStore () {
        let words = this.getStore();

        words.forEach(function (word) {
          const ui = new UI();
          ui.addWords(word);
        })
      }
    }


    document.querySelector(".input-toggle").addEventListener("click", ()=> {

      const englishWord = document.getElementById("english-word").value.trim();
      const translating = document.getElementById("translating").value.trim();
      const pronunciation = document.getElementById("pronunciation").value.trim();

      const words = new Words(englishWord, translating, pronunciation);
      const ui = new UI();
      const store = new Store();

      if(pronunciation === "" || englishWord === "" || translating === "") {
        ui.showAlert("error", "Add your words")
      }else {
        ui.addWords(words);
        store.addStore(words);
        ui.clearStrings();
        ui.showAlert("success", "Your words added");
      }
    })

    const store = new Store();
    window.addEventListener("load", store.displayStore());

    document.querySelector(".remove-toggle").addEventListener("click", ()=> {
      localStorage.clear();
      const ui = new UI();
      ui.showAlert("success", "Your stores deleted");
    })
})