'use strict'

const nome = document.getElementById('name').value

const verificar = async (nome, email, senha, premium, imagemPerfil) =>{
    const url = `https://back-spider.vercel.app/user/cadastrarUser`
    const data = {
        nome: nome,
        email: email,
        senha: senha,
        premium: premium,
        imagemPerfil: imagemPerfil
    }
    try {
        //verifica os dados
        if(email === "" || email === null || email === undefined ||
            senha === "" || senha === null || senha === undefined ||
            nome === "" || nome === null || nome === undefined ||
            premium === "" || premium === null || premium === undefined ||
            imagemPerfil === "" || imagemPerfil === null || imagemPerfil === undefined
        ){
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
        }

        const result = await response.json()
        return result
        }
    } catch (error) {
        return false
    }
}
