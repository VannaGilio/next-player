const listaPostagens = document.querySelector('.conteudo-postagem-lista');

async function carregarPostagens() {
    try {
        const [resPostagens, resUsuarios] = await Promise.all([
            fetch('https://back-spider.vercel.app/publicacoes/listarPublicacoes'),
            fetch('https://back-spider.vercel.app/user/listarUsers')
        ]);

        const postagens = await resPostagens.json()
        const usuarios = await resUsuarios.json()

        listarPostagens(postagens, usuarios)
    } catch (error) {
        console.error('Erro ao carregar postagens:', error)
    }
}

function listarPostagens(postagens, usuarios) {
    listaPostagens.innerHTML = ''

    postagens.forEach(postagem => {
        const usuario = usuarios.find(user => user.id === postagem.idUsuario)

        // Criando a estrutura da postagem
        const novoPost = document.createElement('li')
        novoPost.classList.add('conteudo-postagem')

        const fotoPerfil = document.createElement('img')
        fotoPerfil.classList.add('foto-perfil-postagem')
        fotoPerfil.src = usuario?.imagemPerfil || './img/image.png'
        fotoPerfil.alt = 'Foto de perfil'

        const conteudoPostagem = document.createElement('div')
        conteudoPostagem.classList.add('conteudo-da-postagem')

        const nomeUsuario = document.createElement('h2')
        nomeUsuario.textContent = usuario?.nome || 'Usuário Desconhecido'

        const textoPostagem = document.createElement('p')
        textoPostagem.textContent = postagem.descricao

        conteudoPostagem.appendChild(nomeUsuario)
        conteudoPostagem.appendChild(textoPostagem)

        // Adicionar a imagem da postagem, se existir
        if (postagem.imagem) {
            const imagem = document.createElement('img')
            imagem.src = postagem.imagem
            imagem.alt = 'Imagem da postagem'
            imagem.classList.add('imagem-postagem')
            conteudoPostagem.appendChild(imagem)
        }

        // Criando o campo de comentário
        const formComentario = document.createElement('form')
        formComentario.classList.add('comente')
        const inputComentario = document.createElement('input')
        inputComentario.type = 'text'
        inputComentario.placeholder = 'Escreva um comentário...'
        inputComentario.required = true
        inputComentario.style.marginTop = '10px'
        inputComentario.style.width = '70%'

        const botaoComentario = document.createElement('button')
        botaoComentario.type = 'submit'
        botaoComentario.textContent = 'Comentar'

        formComentario.appendChild(inputComentario)
        formComentario.appendChild(botaoComentario)

        // Criando a lista de comentários
        const listaComentarios = document.createElement('ul')
        listaComentarios.classList.add('lista-comentarios')

        postagem.comentarios?.forEach(comentario => {
            const usuarioComent = usuarios.find(u => u.id === comentario.idUsuario)

            const liComent = document.createElement('li')
            liComent.classList.add('comentario-item')

            const imgComent = document.createElement('img')
            imgComent.src = usuarioComent?.imagemPerfil || './img/image.png'
            imgComent.alt = 'Foto do comentarista'
            imgComent.width = 25
            imgComent.style.borderRadius = '50%'

            const nomeComent = document.createElement('strong');
            nomeComent.textContent = usuarioComent?.nome || 'Usuário'

            const descricaoComent = document.createElement('span')
            descricaoComent.textContent = comentario.descricao

            liComent.appendChild(imgComent)
            liComent.appendChild(nomeComent)
            liComent.appendChild(descricaoComent)

            listaComentarios.appendChild(liComent)
        })

        // Adicionando a lógica para comentar
        formComentario.addEventListener('submit', event => {
            event.preventDefault()
            const textoComentario = inputComentario.value.trim()
            if (!textoComentario) return

            const novoComentario = {
                descricao: textoComentario,
                idUsuario: localStorage.getItem('id')
            }

            fetch(`https://back-spider.vercel.app/publicacoes/commentPublicacao/${postagem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoComentario)
            })
            .then(res => {
                if (!res.ok) throw new Error('Erro ao comentar')
                return res.json()
            })
            .then(() => {
                const novoItem = document.createElement('li')
                novoItem.classList.add('comentario-item')
                const imgUsuario = document.createElement('img')
                imgUsuario.src = usuario?.imagemPerfil || './img/image.png'
                imgUsuario.alt = 'Foto do usuário'
                imgUsuario.width = 25
                imgUsuario.style.borderRadius = '50%'

                const nomeUsuarioComent = document.createElement('strong')
                nomeUsuarioComent.textContent = usuario?.nome || 'Usuário'

                const descricaoComentario = document.createElement('span')
                descricaoComentario.textContent = textoComentario

                novoItem.appendChild(imgUsuario)
                novoItem.appendChild(nomeUsuarioComent)
                novoItem.appendChild(descricaoComentario)
                listaComentarios.appendChild(novoItem)

                inputComentario.value = ''
            })
            .catch(err => alert(err.message))
        });

    
        conteudoPostagem.appendChild(formComentario)
        conteudoPostagem.appendChild(listaComentarios)

        novoPost.appendChild(fotoPerfil)
        novoPost.appendChild(conteudoPostagem)

        listaPostagens.prepend(novoPost)
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const idUsuarioLogado = localStorage.getItem('id')

    if (!idUsuarioLogado) {
        window.location.href = './login.html'
        return;
    }

    try {
        const response = await fetch('https://back-spider.vercel.app/user/listarUsers')
        const usuarios = await response.json()
        const usuario = usuarios.find(user => user.id == idUsuarioLogado)

        if (usuario) {
            console.log("Usuário logado:", usuario.nome)
            document.getElementById('foto-perfil-logado').src = usuario.imagemPerfil
            document.getElementById('nome-usuario-logado').textContent = usuario.nome
        } else {
            console.warn("Usuário não encontrado.")
        }

    } catch (error) {
        console.error("Erro ao buscar usuários:", error)
    }
})

//////CRIA O BOTÃO DE SAIR

carregarPostagens()
