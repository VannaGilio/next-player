'use-strict'

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('trade').addEventListener('click', async () => {
    
    const newPassword = document.getElementById('newpassword')?.value || ""

    const resultado = await verificarsenha(newPassword)
    console.log(resultado)
    })
})

const verificarsenha = async (newPassword) =>{
    const url = `https://back-spider.vercel.app/user/newPassword/2`
    const data = {
        senha:newPassword
    }
    try {
        //verifica os dados
        if(newPassword === "" || newPassword === null || newPassword === undefined ){
            console.error('Campos obrigatórios não preenchidos') //message.ERROR_REQUIRED_FIELDS //400
            return false
        }else{
            //retorna a menssage para o post
            const options = {
                method: "PUT",
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
                window.location.href = "./index.html"
                // return result ('deu certo')
        }
        }
    } catch (error) {
        console.error("Erro ao tentar logar:", error)
        return console.error('error')  //message.ERROR_NOT_FOUND 404
    }
}