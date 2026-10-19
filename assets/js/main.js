/* TAE — interacoes do site. Vanilla JS, sem dependencias. */
(function () {
  "use strict";

  var WHATSAPP = "5513991690175";
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- 1. Ano no rodape ---------- */
  var ano = $("#ano");
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- 2. Sombra do header ao rolar ---------- */
  var header = $("#header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 12); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 3. Menu mobile ---------- */
  var burger = $("#burger");
  var drawer = $("#drawer");

  function fecharDrawer() {
    if (!burger || !drawer) return;
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Abrir menu");
    drawer.classList.remove("is-open");
  }

  if (burger && drawer) {
    burger.addEventListener("click", function () {
      var aberto = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!aberto));
      burger.setAttribute("aria-label", aberto ? "Abrir menu" : "Fechar menu");
      drawer.classList.toggle("is-open", !aberto);
    });
    drawer.addEventListener("click", function (e) {
      if (e.target.closest("a")) fecharDrawer();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") fecharDrawer();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1100) fecharDrawer();
    });
  }

  /* ---------- 4. Scrollspy do menu ---------- */
  var links = $$(".nav__link");
  var secoes = links
    .map(function (a) { return $(a.getAttribute("href")); })
    .filter(Boolean);

  if (secoes.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    secoes.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 5. Reveal ao entrar na tela ---------- */
  var alvos = $$(".reveal");
  if (alvos.length) {
    if ("IntersectionObserver" in window) {
      var rev = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add("is-in");
          obs.unobserve(en.target);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      alvos.forEach(function (el) { rev.observe(el); });
    } else {
      alvos.forEach(function (el) { el.classList.add("is-in"); });
    }
  }

  /* ---------- 6. Filtro da galeria de projetos ---------- */
  var botoes = $$(".filtro");
  var galeria = $("#galeria");

  if (botoes.length && galeria) {
    var figuras = $$("figure", galeria);
    botoes.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cat = btn.getAttribute("data-filtro");
        botoes.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        figuras.forEach(function (f) {
          f.hidden = !(cat === "todos" || f.getAttribute("data-cat") === cat);
        });
      });
    });
  }

  /* ---------- 7. Mapa sob demanda ---------- */
  var btnMapa = $("#btn-mapa");
  var caixaMapa = $("#mapa");

  if (btnMapa && caixaMapa) {
    btnMapa.addEventListener("click", function () {
      var src = caixaMapa.getAttribute("data-embed");
      if (!src) return;
      var frame = document.createElement("iframe");
      frame.src = src;
      frame.title = "Mapa da localização da TAE em Cubatão - SP";
      frame.loading = "lazy";
      frame.referrerPolicy = "no-referrer-when-downgrade";
      caixaMapa.replaceChild(frame, btnMapa);
    });
  }

  /* ---------- 8. Formulario -> WhatsApp ---------- */
  var form = $("#form-orcamento");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var faltando = null;
    ["f-nome", "f-telefone", "f-msg"].forEach(function (id) {
      var campo = document.getElementById(id);
      if (!campo) return;
      var vazio = !campo.value.trim();
      campo.setAttribute("aria-invalid", vazio ? "true" : "false");
      campo.style.borderColor = vazio ? "#c0392b" : "";
      if (vazio && !faltando) faltando = campo;
    });

    if (faltando) { faltando.focus(); return; }

    var v = function (id) {
      var el = document.getElementById(id);
      return el ? el.value.trim() : "";
    };

    var linhas = [
      "Ola, TAE! Gostaria de solicitar um orcamento.",
      "",
      "Nome: " + v("f-nome"),
      v("f-empresa") ? "Empresa: " + v("f-empresa") : "",
      "Telefone: " + v("f-telefone"),
      v("f-email") ? "E-mail: " + v("f-email") : "",
      "Servico: " + v("f-servico"),
      "",
      "Necessidade:",
      v("f-msg")
    ].filter(function (l) { return l !== ""; });

    window.open(
      "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(linhas.join("\n")),
      "_blank",
      "noopener"
    );
  });
})();
