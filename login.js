'use strict'

const obterdados= async (email, senha) =>{
    let usuarioEncontrado
    const url = `https://back-spider.vercel.app/user/listarUsers`
    const resultado = await fetch(url)
    const dados = await response.json()
    dados.api.forEach(user => {
        if (user.email === email && !usuarioEncontrado) {
            usuarioEncontrado = user
        }
    })
    if (usuarioEncontrado){
        return usuarioEncontrado
    }else{
        console.log("Usuario não encontrado")
    }
}




/////////////////////////////////////////////////////////////////////////////////

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
                localStorage.setItem('id', result.user.id)

                // Agora redirecionamos para o perfil.html
                window.location.href = "./home.html"
               
                // return result ('deu certo')
        }
        }
    } catch (error) {
        console.error("Erro ao tentar logar:", error)
        return console.error('error')  //message.ERROR_NOT_FOUND 404
    }
}

