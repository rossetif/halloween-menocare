(function () {
  var CHARS = {
    coragem: { emoji: '🐶', img: 'assets/personagens/coragem.jpg', pos: '50% 70%', name: 'Coragem, o Cão Covarde',
      desc: 'Você tem medo de tudo, mas aparece quando alguém precisa de você.',
      quote: '"Eu não tenho medo. Eu só estou tremendo... de frio."' },
    freddy: { emoji: '🔥', img: 'assets/personagens/freddy.jpg', pos: '50% 35%', name: 'Freddy Krueger',
      desc: 'Você é o(a) piadista da turma e aparece sempre com uma piada que só você achou engraçada.',
      quote: '"Bom dia, flor do dia! Dormiu bem?"' },
    dracula: { emoji: '🧛', img: 'assets/personagens/dracula.jpg', pos: '50% 20%', name: 'Drácula',
      desc: 'Você é dramático(a), noturno(a) e cheio(a) de pose. Entra em qualquer lugar como numa estreia.',
      quote: '"Eu não estou atrasado(a). A festa é que começou cedo demais."' },
    morticia: { emoji: '🖤', img: 'assets/personagens/morticia.jpg', pos: '50% 10%', name: 'Mortícia Addams',
      desc: 'Você é calma, elegante e acha o macabro lindo. Nada te assusta.',
      quote: '"Isso foi um susto ou um elogio?"' },
    ze: { emoji: '🎩', img: 'assets/personagens/ze.jpg', pos: '50% 25%', name: 'Zé do Caixão',
      desc: 'Você tem opinião sobre tudo, confiança de sobra e nenhuma vergonha de mostrar. Ninguém discute (nem tenta).',
      quote: '"Eu não errei. A vida é que não entendeu."' }
  };

  var QUESTIONS = [
    { q: 'Filme de terror: como você assiste?', o: [
      ['coragem', 'Com almofada na cara'],
      ['freddy',  'Comentando cada cena com uma piada'],
      ['dracula', 'Só os clássicos bem produzidos'],
      ['morticia','De boa, nem me assusto'],
      ['ze',      'Já vi tanto que acho que faria melhor'] ] },
    { q: '2h da manhã, sede. Você vai pegar água no escuro.', o: [
      ['coragem', 'Corro na ida e na volta'],
      ['freddy',  'Vou rindo sozinho(a)'],
      ['dracula', 'Sem pressa, adoro essa hora'],
      ['morticia','Vou de boa, nem acendo a luz'],
      ['ze',      'Vou decidido(a). Se aparecer alguém, vai ouvir umas verdades'] ] },
    { q: 'Seu sábado à noite perfeito:', o: [
      ['coragem', 'Em casa, com a porta trancada'],
      ['freddy',  'Rolê com a galera, fazendo todo mundo rir'],
      ['dracula', 'Na rua até o sol nascer'],
      ['morticia','Em casa, fazendo algo esquisito (e adorando)'],
      ['ze',      'Onde tiver plateia para eu opinar sobre tudo'] ] },
    { q: 'Você ouve um barulho estranho em casa.', o: [
      ['coragem', 'Congelo'],
      ['freddy',  'Pergunto "quem está aí?" já com uma piada pronta'],
      ['dracula', 'Vou investigar com elegância'],
      ['morticia','Continuo o que eu estava fazendo'],
      ['ze',      'Vou lá resolver, e sozinho(a)'] ] },
    { q: 'Como é o seu estilo no dia a dia?', o: [
      ['coragem', 'Discreto, nada que chame atenção'],
      ['freddy',  'Confortável e meio sem combinar'],
      ['dracula', 'Sempre produzido(a), até para ir ao mercado'],
      ['morticia','Estilo próprio: ninguém entende, mas todos respeitam'],
      ['ze',      'Uma peça marcante que eu uso sempre, sem vergonha'] ] },
    { q: 'Sua fantasia de Halloween costuma ser:', o: [
      ['coragem', 'Algo simples, que dá para tirar rápido se der medo'],
      ['freddy',  'Improviso de última hora, achando graça'],
      ['dracula', 'Produção completa, com maquiagem'],
      ['morticia','Sempre caprichada, e eu não explico'],
      ['ze',      'A que eu quiser. Quem vai me impedir?'] ] }
  ];

  var $ = function (id) { return document.getElementById(id); };
  var answers = [];
  var current = 0;

  // fundo com emojis flutuando
  (function () {
    var icons = ['🦇','👻','🎃','🕷️','💀','🕸️','🍬'];
    var box = $('floaters');
    for (var i = 0; i < 16; i++) {
      var s = document.createElement('span');
      s.textContent = icons[i % icons.length];
      s.style.left = (Math.random() * 100) + '%';
      s.style.fontSize = (20 + Math.random() * 26) + 'px';
      s.style.animationDuration = (14 + Math.random() * 18) + 's';
      s.style.animationDelay = (-Math.random() * 25) + 's';
      box.appendChild(s);
    }
  })();

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function show(id) {
    ['intro', 'quiz', 'result'].forEach(function (s) { $(s).classList.toggle('hidden', s !== id); });
    window.scrollTo(0, 0);
  }

  function renderQuestion() {
    var item = QUESTIONS[current];
    $('count').textContent = 'Pergunta ' + (current + 1) + ' de ' + QUESTIONS.length;
    $('bar').style.width = (current / QUESTIONS.length * 100) + '%';
    $('question').textContent = item.q;
    var box = $('options');
    box.innerHTML = '';
    shuffle(item.o).forEach(function (opt) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'opt';
      b.textContent = opt[1];
      b.addEventListener('click', function () { choose(opt[0], b); });
      box.appendChild(b);
    });
    var card = $('quiz');
    card.style.animation = 'none'; void card.offsetWidth; card.style.animation = '';
  }

  var locked = false;
  function choose(key, btn) {
    if (locked) return;
    locked = true;
    btn.classList.add('picked');
    answers.push(key);
    setTimeout(function () {
      locked = false;
      current++;
      if (current < QUESTIONS.length) renderQuestion(); else finish();
    }, 280);
  }

  function finish() {
    $('bar').style.width = '100%';
    var score = {};
    answers.forEach(function (k) { score[k] = (score[k] || 0) + 1; });
    var max = Math.max.apply(null, Object.keys(score).map(function (k) { return score[k]; }));
    var tied = Object.keys(score).filter(function (k) { return score[k] === max; });
    var winner = tied[0];
    if (tied.length > 1) {
      // desempate: a resposta mais recente (pergunta 6, a fantasia) entre os empatados
      for (var i = answers.length - 1; i >= 0; i--) {
        if (tied.indexOf(answers[i]) !== -1) { winner = answers[i]; break; }
      }
    }
    var c = CHARS[winner];
    var photo = $('r-photo');
    photo.textContent = c.emoji; // fica atrás da foto, aparece se a imagem não carregar
    var img = document.createElement('img');
    img.alt = c.name;
    img.src = c.img;
    img.style.objectPosition = c.pos;
    img.onerror = function () { img.remove(); };
    photo.appendChild(img);
    $('r-name').textContent = c.name;
    $('r-desc').textContent = c.desc;
    $('r-quote').textContent = c.quote;
    show('result');
  }

  function start() {
    answers = []; current = 0; locked = false;
    show('quiz');
    renderQuestion();
  }

  $('start').addEventListener('click', start);
  $('again').addEventListener('click', start);
})();
