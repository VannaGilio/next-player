'use strict'

async function loaderPost() {
    const usuarioId = localStorage.getItem('id')
    if (!usuarioId) {
        console.error("ID de usuário não encontrado no localStorage")
        return null  
    }

    const url = `https://back-spider.vercel.app/publicacoes/listarPublicacoes`
    const response = await fetch(url)
    const data = await response.json()
    const postsDoUsuario = data.filter(publicacao => String(publicacao.idUsuario) === usuarioId)
    
    return postsDoUsuario
}
async function loaderPerfil() {
    const usuarioId =  '2' //localStorage.getItem('id')
    if (!usuarioId) {
        console.error("ID de usuário não encontrado no localStorage")
        return null  
    }

    const url = `https://back-spider.vercel.app/user/pesquisarUser/${usuarioId}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function criartela(usuario, post) {
    const lateral = document.getElementById('lateral')
    const meu_perfil = document.createElement('div')
    meu_perfil.classList.add('meuperfil')

    const imgperfil = document.createElement('img')
    imgperfil.src=usuario.imagemPerfil

    const meuperfillink = document.createElement('a')
    meuperfillink.textContent='Meu perfil'

    meu_perfil.appendChild(imgperfil)
    meu_perfil.appendChild(meuperfillink)
    lateral.appendChild(meu_perfil)

    const input = document.createElement('input')

    lateral.appendChild(input)

    const perfil = document.getElementById('perfil')
    const entrada = document.createElement('div')
    entrada.classList.add('entrada')

    const imgbackground = document.createElement('img')
    imgbackground.src='./img/background2.jpg'
    imgbackground.classList.add('backimg')

    perfil.appendChild(entrada)
    entrada.appendChild(imgbackground)

    const info = document.createElement('div')
    info.classList.add('info')


    const perfilimg = document.createElement('img')
    perfilimg.src=usuario.imagemPerfil
    perfilimg.classList.add('fotoperfil')

    const h1 = document.createElement('h1')
    h1.textContent=usuario.nome
    
    const h2 = document.createElement('h2')
    h2.textContent=`@${usuario.nome}_123`

    const p = document.createElement('p')
    p.textContent=`Sou ${usuario.nome}, gosto muito de jogos`

    info.appendChild(perfilimg)
    info.appendChild(h1)
    info.appendChild(h2)
    info.appendChild(p)

    perfil.appendChild(info)


    const comentariospai = document.createElement('div')
    comentariospai.classList.add('comentarios')
    perfil.appendChild(comentariospai)
    post.forEach(publicacao => {
        const perfilcomentario = document.createElement('div')
        perfilcomentario.classList.add('perfilcomentario')

        const intermediario = document.createElement('div')

        const imgperfil2 = document.createElement('img')
        imgperfil2.src=usuario.imagemPerfil

        const nick = document.createElement('h1')
        nick.textContent=usuario.nome

        perfilcomentario.appendChild(imgperfil2)
        perfilcomentario.appendChild(nick)

        const comentario = document.createElement('div')
        comentario.classList.add('comentario')

        const imgcomentario = document.createElement('img')
        imgcomentario.src=publicacao.imagem

        const p = document.createElement('p')
        p.textContent=publicacao.descricao

        comentario.appendChild(imgcomentario)
        comentario.appendChild(p)



        intermediario.appendChild(perfilcomentario)
        intermediario.appendChild(comentario)

        comentariospai.appendChild(intermediario)
        
    });

    // const comentarios = document.createElement('div')
    // comentarios.classList.add('comentarios')
    // post.forEach(publicacao=> {
    //     const perfilcomentario = document.createElement('div')
    //     perfilcomentario.classList.add('perfilcomentario')

    //     comentarios.appendChild(perfilcomentario)

    //     const img = document.createElement('img')
    //     img.src=usuario.imagemPerfil
    //     comentarios.appendChild(img)

    //     const h1comentario = document.createElement('h1')
    //     h1comentario.textContent=usuario.nome
    //     comentarios.appendChild(h1comentario)

    //     const comentario = document.createElement('div')
    //     comentario.classList.add('comentario')

    //     const imgcomentario = document.createElement('img')
    //     imgcomentario.classList.add('fotocoments')
    //     img.src=publicacao.imagem || './img/background.jpg'
    //     const pcomentario = document.createElement('p')
    //     pcomentario.textContent=publicacao.descricao

    //     perfilcomentario.appendChild(imgcomentario)
    //     perfilcomentario.appendChild(pcomentario)
        

    //     comentarios.appendChild(comentario)
    //     perfil.appendChild(comentarios)
    // });
    

}

async function preencherPerfil() {
    const perfil = await loaderPerfil()
    if (!perfil) return // Evita erro se não houver perfil
    const post = await loaderPost()
    criartela(perfil, post)
}

preencherPerfil()
