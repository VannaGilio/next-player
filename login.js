'use strict'

const message =require('../../messages/messageerro.js')

const verificar = async (email, senha) =>{
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
            return message.ERROR_REQUIRED_FIELDS //400
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
        const result = await response.json()

        return result 
        }
    } catch (error) {
        return ERROR_NOT_FOUND //404
    }
}
