const Mural = (function(_render, Filtro, LoginUsuario){
    "use strict"
    let cartoes = []
    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});

    Filtro.on("filtrado", render)

    function adiciona(cartao){
        if(LoginUsuario.logado()){
            cartoes.push(cartao)
            cartao.on("mudanca.**", render)
            cartao.on("remocao", ()=>{
                cartoes = cartoes.slice(0)
                cartoes.splice(cartoes.indexOf(cartao),1)
                render()
            })
            render()
            return true
        } else {
            alert("Você não está logado")
            return false
        }
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro, LoginUsuario)
