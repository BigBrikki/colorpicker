const seedColorBtn = document.getElementById('seed-color-btn')
const schemeSelect = document.getElementById('scheme-select')
const getColorBtn = document.getElementById('get-color-btn')
const main = document.getElementById('main')
const hexArea = document.getElementById('hex-wrapper')

Coloris({
  themeMode: 'dark',
  alpha: false,
  el: '.seed-color-btn',
});

document.addEventListener('click', e =>{
    if (e.target.id==="hex-0" || e.target.id==="hex-1"
        || e.target.id==="hex-2" || e.target.id==="hex-3"
        || e.target.id==="hex-4" ){
        copy(e.target.dataset.hex)
        
    }
})


getColorBtn.addEventListener('click', () =>{
    let scheme = schemeSelect.value
    let seed = seedColorBtn.value.slice(1, 7)
    console.log(seed)
    getSchemeArr(seed, scheme)
    
})

function getSchemeArr(seed, scheme){
    let mainHtml = ""
    fetch(`https://www.thecolorapi.com/scheme?hex=${seed}&mode=${scheme}`)
        .then(response => response.json())
        .then(data => {
            renderColors(data)          
    })
}

function renderColors(data){
    main.innerHTML = ""
    hexArea.innerHTML = ""
    for(let i = 0; i<data.colors.length; i++){
                    main.innerHTML += 
                            `<div class="color-container" id='color-container'>
                            <div class="color-box" id='color-box-${i}'>
                            </div>`
                    hexArea.innerHTML +=        
                            `<div class='hex'>
                                <p id='hex-${i}' data-hex='${data.colors[i].hex.value}'>${data.colors[i].hex.value}</p>
                            </div>`  
                    document.getElementById(`color-box-${i}`).style
                    .setProperty('background-color', `${data.colors[i].hex.value}`)
    } 
}
function copy(text) {
  let tempText = document.createElement("input");
  tempText.value = text;
  document.body.appendChild(tempText);
  tempText.select();
  
  document.execCommand("copy");
  document.body.removeChild(tempText);
  
  alert("Copied the text: " + tempText.value);
}