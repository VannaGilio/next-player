'use strict'

//import message from ('../../messages/messageerro.js')

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('register').addEventListener('click', async () => {
   
        const nome = document.getElementById('nome')?.value || ""
        const email = document.getElementById('email')?.value || ""
        const senha = document.getElementById('senha')?.value || ""
        const premium = document.getElementById('premium')?.value || ""
        const imagemPerfil = document.getElementById('profilePicture')?.value || ""
        const senhaRecuperacao = document.getElementById('key_word')?.value || ""


        const resultado = await criar(nome, email, senha, premium, imagemPerfil, senhaRecuperacao)
        console.log(resultado)
    })
})

const criar = async (nome, email, senha, premium, imagemPerfil, senhaRecuperacao) =>{
    const url = `https://back-spider.vercel.app/user/cadastrarUser`
    const data = {
        nome: nome,
        email: email,
        senha: senha,
        premium: premium,
        imagemPerfil: imagemPerfil,
        senhaRecuperacao: senhaRecuperacao
    }
    console.log(data)
    try {
        //verifica os dados
        if(email === "" || email === null || email === undefined ||
            senha === "" || senha === null || senha === undefined ||
            nome === "" || nome === null || nome === undefined ||
            premium === "" || premium === null || premium === undefined ||
            imagemPerfil === "" || imagemPerfil === null || imagemPerfil === undefined
        ){
            //return message.ERROR_REQUIRED_FIELDS

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
            return false
        }else{
            const result = await response.json()
            window.location.href = './index.html'; // Caminho relativo para uma página interna
            return result ('deu certo')
        }
        }
    } catch (error) {
        return false
        //return message.ERROR_NOT_FOUND
    }
}
