const inputEl = document.getElementById("input")

const infoTextEl = document.getElementById("info-text")
const meaningContainerEl = document.getElementById("meaning-container")

const titleEl = document.getElementById('title')

const meaningEl = document.getElementById('meaning')
const audioEl = document.getElementById('audio')

const extrainfoEl = document.getElementById("extrainfo")
const nextDefBtnEl = document.getElementById('next-def')
async function fetchAPI(word){
    try {
        infoTextEl.style.display = "block"
        
        meaningContainerEl.style.display = "none"
        infoTextEl.innerText = `Searching the meaning of "${word}"... `
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}` // dynamic
        console.log(word)
        
        const result = await fetch(url).then((res)=> 
        res.json());

        if (result.title){
            meaningContainerEl.style.display = "block"
            titleEl.innerText = word
            meaningEl.innerText = 'N/A'
            audioEl.style.display = 'none'
            infoTextEl.style.display = "none"
        }
        else{
            infoTextEl.style.display = "none"
            meaningContainerEl.style.display = "block"
            titleEl.innerText = result[0].word
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition
            
            audioEl.style.display = 'block'
            audioEl.style.display = 'inline-flex'

            audioEl.src = result[0].phonetics[0].audio
            let i=0;
            let defs = 0;
            while (i<result.length ){
                let j=0;
                while (j<result[i].meanings.length){
                    
                    let k=0;
                    defs = defs +  result[i].meanings[j].definitions.length;
//                    while (k<result[i].meanings[j].definitions.length){
 //                       defs= 
//                    }
                    j++

                }
                i++
                
            }
            console.log(defs)
            
            if (defs> 1){
                extrainfoEl.style.display = 'inline-flex'

                extrainfoEl.innerText =`There are ${defs -1} other meanings`
                nextDefBtnEl.style.display = 'inline-flex' 
                let defcount=0;
                let resultcount = 0;
                let meaningcount = 0;
                let count =2;



                nextDefBtnEl.addEventListener('click', (e)=>{
                    try {
                        defcount ++;
                        
                        if (defcount >= result[resultcount].meanings[meaningcount].definitions.length){
                            defcount =0
                            meaningcount ++;
                            if (meaningcount>= result[resultcount].meanings.length){
                                meaningcount=0;
                                resultcount++;
                                if (resultcount >= result.length){
                                    resultcount=0
                                }
                            }


                        }
                        meaningEl.innerText = String(count)+') '+ result[resultcount].meanings[meaningcount].definitions[defcount].definition
                        
                        count ++
                        if (count > defs){
                            count=1
                        }

                
                    } catch (error) {
                        meaningEl.innerText = result[0].meanings[0].definitions[defcount].definition
            
                        
                    }
                    
                }
                )

//                infoTextEl.style.display = 'inline-flex'
//                infoTextEl.innerText = `There are ${defs-1} more definitions`
            }


            //console.log(result.length)
        }
    } catch (error) {
        console.log(error)
        infoTextEl.innerText = 'An error happened, try again later'

        
    }

    //console.log(result)
    

}

//let APIurl = 'https://api.dictionaryapi.dev/api/v2/entries/en/'+word 

inputEl.addEventListener("keyup",(e)=>{//keyup is used to associate action with a key
    //console.log(e.key)//e.target.value)
    if (e.target.value && e.key==="Enter"){
        //console.log(e.target.value)
        fetchAPI(e.target.value)
    }
})