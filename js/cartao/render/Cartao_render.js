const Cartao_render = (function($, CartaoOpcoes_render, CartaoConteudo_render, helpers){
    return function (globalProps){
        const $cartao = $("<div>")

        const opcoes_render = CartaoOpcoes_render(globalProps)
        const coteudo_render = CartaoConteudo_render(globalProps)

        return function(props = {}, state = {}, handlers = {}){
            const $opcoes = opcoes_render(props, state, handlers)
            const $conteudo = coteudo_render(props, state, handlers)

            !$cartao.children().length && $cartao.append($opcoes, $conteudo)

            $cartao
                .removeClass("cartao--textoPequeno cartao--textoGrande cartao--textoMedio")
                .addClass("cartao")
                .css("background-color", state.tipo.cor)
                .removeClass("cartao--keyboardNavigationEnabled")
                .attr("tabindex", !state.navegavel ? 0 : -1)

            if(!state.editavel){
                $cartao.addClass(helpers.decideTamanhoDoCartao(state.conteudo))
            }

            if(state.navegavel){
                $cartao.addClass("cartao--keyboardNavigationEnabled")
                if(!helpers.cartaoEstaNaTela($cartao)){
                    $cartao[0].scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    })
                }
            }

            if(state.focado){
                $cartao.focus()
            } else {
                $cartao.blur()
            }

            $cartao
                .off()
                .on("keydown", function(event){
                    if((event.key === "Enter" || event.key === " ") && !state.editavel){
                        if(!event.isDefaultPrevented()){
                            event.preventDefault()
                            $(this).trigger("navegacaoInicia")
                        }
                    } else if(event.key === "Escape"){
                        $(this).trigger("navegacaoTermina")
                    }
                })
                .on("click", function(event){
                    if(!state.navegavel){
                        $(this).trigger("navegacaoInicia")
                    }
                })
                .on("mouseleave", function(){
                    if(!state.editavel){
                        $(this).trigger("navegacaoTermina")
                    }
                })
                .on("navegacaoInicia", function(){
                    handlers.onNavegacaoInicia()
                })
                .on("navegacaoTermina", function(){
                    handlers.onNavegacaoTermina()
                })

            return $cartao
        }
    }
})(jQuery, CartaoOpcoes_render, CartaoConteudo_render, Cartao_renderHelpers)