const url="https://api.dictionaryapi.dev/api/v2/entries/en/";
const sound=document.getElementById("sound");
const btn=document.getElementById("search-btn");
const result=document.getElementById("result");


btn.addEventListener("click", () => {
    processInput();
});
document.getElementById("inp-word").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        processInput();
    }
});

function processInput() {
    let inpVal=document.getElementById("inp-word").value;
    if (!inpVal) {
        
        result.innerHTML = `<h3 class="error"> Please enter a word </h3>`;
    
        setTimeout(() => {
            location.reload();
        }, 1500);
        return; 
    }
    fetch(`${url}${inpVal}`)
    .then((response)=>response.json())
    .then((data)=>{
     console.log(data);
    
     result.innerHTML=` 
     <div class="word">
                    <h3>${inpVal}</h3>
                    <button onclick="playSound()"><i class="fa-solid fa-volume-high"></i> </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}</p>
                </div>
                <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
                </p> `;
                sound.setAttribute("src", `${data[0].phonetics[1].audio}`);  
                btn.innerHTML='Clear';
                btn.addEventListener("click",()=>{
                    clearResult();
                })
    })
    .catch(()=>{
        result.innerHTML=`<h3 class="error"> Couldn't find the word </h3> `;
    });
}
function playSound() {
    sound.play();
}

function clearResult() {
    result.innerHTML = '';
    document.getElementById("inp-word").value = ''; 
    location.reload();
}
