'use-strict'

const idUsuario = localStorage.getItem('idUsuario')

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('trade').addEventListener('click', async () => {
    
    const newPassword = document.getElementById('newpassword')?.value || ""

    const resultado = await verificarsenha(newPassword)
    console.log(resultado)
    })
})



const verificarsenha = async (newPassword) => {
    const idUsuario = localStorage.getItem('idUsuario')
    const url = `https://back-spider.vercel.app/user/newPassword/${idUsuario}`
    const data = { senha: newPassword }

    try {
        if (!newPassword) {
            console.error('Senha não informada.')
            return false
        }

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        console.log("URL:", url)
        console.log("Payload:", data)

        const response = await fetch(url, options)

        if (!response.ok) {
            const erroTexto = await response.text()
            console.error("Erro na requisição:", response.status, erroTexto)
            return false
        }

        const result = await response.json()
        console.log("Senha atualizada com sucesso:", result)
        window.location.href = "./index.html"

    } catch (error) {
        console.error("Erro ao tentar atualizar senha:", error)
        return false
    }
}