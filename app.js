window.addEventListener("load", () => {

  window.addEventListener("load", getWords());

  function getWords() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "words.JSON", true);

    xhr.onload = function () {
       const words = JSON.parse(xhr.responseText);

       const wordsIntoSort = words.sort((a, b) => {
        if(a.word > b.word) {
          return 1;
        }else {
          return -1;
        }
       })

       wordsIntoSort.map((word) => {
        const menu = document.querySelector(".menu");
        const li = document.createElement("li");
        li.classList.add("item");

        li.innerHTML = `
        <a href=${word.pronunciation} class="pronunciation"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 7l8-5v20l-8-5v-10zm-6 10h4v-10h-4v10zm20.264-13.264l-1.497 1.497c1.847 1.783 2.983 4.157 2.983 6.767 0 2.61-1.135 4.984-2.983 6.766l1.498 1.498c2.305-2.153 3.735-5.055 3.735-8.264s-1.43-6.11-3.736-8.264zm-.489 8.264c0-2.084-.915-3.967-2.384-5.391l-1.503 1.503c1.011 1.049 1.637 2.401 1.637 3.888 0 1.488-.623 2.841-1.634 3.891l1.503 1.503c1.468-1.424 2.381-3.309 2.381-5.394z"/></svg></a>
        <h2 class="english-word">${word.word}</h2>
        <h3 class="translating">${word.translate}</h3>
        `
        menu.append(li);
       })

       const englishWord = document.querySelectorAll(".english-word");
       
       englishWord.forEach((title) => {
        title.addEventListener("click", () => {
          title.classList.toggle("minus-icon");
          title.nextElementSibling.classList.toggle("translating--show");
        })
       }); 
    }
    xhr.send();
  }

  function greetForTime () {
    const time = new Date();
    const hour = time.getHours();
    const titleTime = document.querySelector(".time");

    
  if (hour>=4 && hour<=11) {
    titleTime.innerText = "Good morning";
  } else if (hour>=11 && hour<=15) {
    titleTime.innerText = "Good afternoon";
  } else if (hour>= 15 && hour<=23) {
    titleTime.innerText = "Good evening";
  } else {
    titleTime.innerText = "Good night";
  }

  }

  greetForTime();

  setTimeout(() => {
    document.querySelector(".present-window").remove();
  }, 4000);
});