'use strict'

//import message from ('../../messages/messageerro.js')
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('login').addEventListener('click', async () => {
    
    const email = document.getElementById('email')?.value || ""
    const senha = document.getElementById('senha')?.value || ""

    const resultado = await logar(email, senha)
    console.log(resultado)
    })
})

const logar = async (email, senha) =>{
    const url = `https://back-spider.vercel.app/login`
    const data = {
        email: email,
        senha: senha
    }
    try {
        //verifica os dados
        if(email === "" || email === null || email === undefined ||
            senha === "" || senha === null || senha === undefined 
        ){
            console.error('error') //message.ERROR_REQUIRED_FIELDS //400
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
            console.log('vsfd') // 404
        }
        const result = await response.json()
        return result && console.log('culpa sua cu de apito')
        }
    } catch (error) {
        console.error("Erro ao tentar logar:", error)
        return console.error('error')  //message.ERROR_NOT_FOUND //404
    }
}
