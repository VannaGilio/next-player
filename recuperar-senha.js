"use strict"

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('trade').addEventListener('click', async () => {
    
    const email = document.getElementById('email')?.value || ""
    const wordKey = document.getElementById('wordKey')?.value || ""

    const resultado = await verificarsenha(email, wordKey)
    console.log(resultado)
    })
})

const verificarsenha = async (email, wordKey) =>{

    const id = await buscarIdPorEmail(email)

    localStorage.setItem('idUsuario', id)

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
            console.log(response)
            

            if (!response.ok) {
                console.error("Erro na requisição:", response)
                return false
                // 404
            }else{

                window.location.href = "./trocarsenha.html"

                // return result ('deu certo')
        }
        }
    } catch (error) {
        console.error("Erro ao tentar logar:", error)
        return console.error("Erro ao tentar recuperar senha:", error)  //message.ERROR_NOT_FOUND 404
    }
}


async function buscarIdPorEmail(emailProcurado) {
    try {
        const resposta = await fetch('https://back-spider.vercel.app/user/listarUsers')
        const usuarios = await resposta.json()

        const usuario = usuarios.find(user => user.email === emailProcurado)

        if (usuario) {
            return usuario.id
        } else {
            console.warn('Usuário não encontrado.')
            return null
        }
    } catch (erro) {
        console.error('Erro ao buscar usuários:', erro)
        return null
    }
}