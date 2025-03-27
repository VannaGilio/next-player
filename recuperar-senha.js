'use-strict'

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('trade').addEventListener('click', async () => {
    
    const email = document.getElementById('email')?.value || ""
    const wordKey = document.getElementById('wordKey')?.value || ""

    const resultado = await verificarsenha(email, wordKey)
    console.log(resultado)
    })
})

const verificarsenha = async (email, wordKey) =>{
    const url = `https://back-spider.vercel.app/user/RememberPassword`
    const data = {
        email: email,
        wordKey: wordKey
    }
    try {
        //verifica os dados
        if(email === "" || email === null || email === undefined ||
            wordKey === "" || wordKey === null || wordKey === undefined 
        ){
            console.error('Campos obrigatórios não preenchidos') //message.ERROR_REQUIRED_FIELDS //400
            return false
        }else{
            //retorna a menssage para o post
            const options = {
                method: "POST",
                headers: {
                     "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }

            const response = await fetch(url, options)
            

            if (!response.ok) {
                console.error("Erro na requisição:", response)
                return false
                // 404
            }else{
                const result = await response.json()
                window.location.href = "./trocarsenha"
               
                // return result ('deu certo')
        }
        }
    } catch (error) {
        console.error("Erro ao tentar logar:", error)
        return console.error('error')  //message.ERROR_NOT_FOUND 404
    }
}
