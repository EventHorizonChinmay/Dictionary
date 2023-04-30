const inputEl = document.getElementById('input')

inputEl.addEventListener('keyup', (e)=>{
    if (e.target.value && e.key == 'Enter'){
        //console.log(e.target.value)
        meaningAPI(e.target.value)

    }
}
)

async function meaningAPI(word){
    const APIurl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

    const response = await fetch(APIurl).then((res) => res.json())

    console.log(response[response.length -1].meanings[0].definitions[0].definition)
    

}