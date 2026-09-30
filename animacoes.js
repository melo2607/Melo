(function () {
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const titulo = document.getElementById('tituloPagina');
    if (titulo && titulo.firstChild && titulo.firstChild.nodeType === 3 && !reduzir) {
        const texto = titulo.firstChild.textContent.trim();
        titulo.setAttribute('aria-label', texto);
        const fragmento = document.createDocumentFragment();
        const palavras = texto.split(' ');
        let indice = 0;

        palavras.forEach((palavra, i) => {
            const caixa = document.createElement('span');
            caixa.className = 'palavra';
            caixa.setAttribute('aria-hidden', 'true');

            Array.from(palavra).forEach((letra) => {
                const span = document.createElement('span');
                span.className = 'ch';
                span.textContent = letra;
                span.style.animationDelay = (1 + indice * 0.03) + 's';
                indice++;
                caixa.appendChild(span);
            });

            fragmento.appendChild(caixa);
            if (i < palavras.length - 1) {
                fragmento.appendChild(document.createTextNode(' '));
            }
        });

        titulo.firstChild.replaceWith(fragmento);
    }

    const botaoTema = document.getElementById('themeBtn');
    if (botaoTema && typeof aplicarTema === 'function') {
        botaoTema.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            const alvoClaro = !document.body.classList.contains('light-mode');
            if (document.startViewTransition && !reduzir) {
                document.startViewTransition(() => aplicarTema(alvoClaro, true));
            } else {
                aplicarTema(alvoClaro, true);
            }
        }, true);
    }

    if (!reduzir) {
        document.querySelectorAll('.bloco-redes a').forEach((link) => {
            link.addEventListener('pointermove', (e) => {
                if (e.pointerType !== 'mouse') return;
                const r = link.getBoundingClientRect();
                const x = (e.clientX - r.left - r.width / 2) * 0.35;
                const y = (e.clientY - r.top - r.height / 2) * 0.35;
                link.style.transform = 'translate(' + x + 'px,' + y + 'px)';
            });
            link.addEventListener('pointerleave', () => {
                link.style.transform = '';
            });
        });
    }
})();
