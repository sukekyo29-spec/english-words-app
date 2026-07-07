const App = (() => {
  let questionCount = 20;
  let category = localStorage.getItem('wordCategory') || 'words';
  let questions = [];
  let currentIndex = 0;
  let score = 0;
  let wrongWords = [];
  let answered = false;
  let isReviewMode = false;

  // --- 読み上げ (Text-to-Speech) ---
  let enVoice = null;
  function pickVoice() {
    const voices = speechSynthesis.getVoices();
    enVoice =
      voices.find(v => v.lang === 'en-US' && v.localService) ||
      voices.find(v => v.lang === 'en-US') ||
      voices.find(v => v.lang.startsWith('en')) ||
      null;
  }
  if ('speechSynthesis' in window) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }
  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    if (enVoice) u.voice = enVoice;
    u.rate = 0.9;
    speechSynthesis.speak(u);
  }

  function activePool() {
    if (category === 'phrases') return PHRASES;
    if (category === 'mix') return WORDS.concat(PHRASES);
    return WORDS;
  }

  const screens = {
    home: document.getElementById('screen-home'),
    quiz: document.getElementById('screen-quiz'),
    result: document.getElementById('screen-result'),
    reviewList: document.getElementById('screen-review-list'),
  };

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    screens[name].scrollTop = 0;
  }

  // --- Stats ---
  function loadStats() {
    return JSON.parse(localStorage.getItem('wordStats') || '{"total":0,"correct":0,"bestScore":0,"bestTotal":0}');
  }
  function saveStats(stats) {
    localStorage.setItem('wordStats', JSON.stringify(stats));
  }
  function updateHomeStats() {
    const stats = loadStats();
    document.getElementById('total-answered').textContent = stats.total;
    document.getElementById('best-score').textContent =
      stats.bestTotal ? `${stats.bestScore}/${stats.bestTotal}` : '-';
    document.getElementById('accuracy-rate').textContent =
      stats.total ? Math.round(stats.correct / stats.total * 100) + '%' : '-';
  }

  // --- 復習リスト ---
  function loadReviewList() {
    return JSON.parse(localStorage.getItem('reviewList') || '[]');
  }
  function saveReviewList(list) {
    localStorage.setItem('reviewList', JSON.stringify(list));
  }
  function addToReviewList(words) {
    const list = loadReviewList();
    const existing = new Set(list.map(w => w.en));
    words.forEach(w => {
      if (!existing.has(w.en)) {
        list.push({ en: w.en, ja: w.ja, addedAt: Date.now() });
        existing.add(w.en);
      }
    });
    saveReviewList(list);
    updateReviewBadge();
  }
  function removeFromReviewList(en) {
    const list = loadReviewList().filter(w => w.en !== en);
    saveReviewList(list);
    updateReviewBadge();
  }
  function updateReviewBadge() {
    const count = loadReviewList().length;
    const badge = document.getElementById('review-count-badge');
    badge.textContent = count;
    badge.classList.toggle('has-words', count > 0);
    document.getElementById('review-btn').disabled = count === 0;
  }

  // --- Quiz Logic ---
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function buildQuestions(pool, distractorPool) {
    const count = Math.min(questionCount, pool.length);
    const selected = shuffle([...pool]).slice(0, count);
    return selected.map(word => {
      const wrong = shuffle(distractorPool.filter(w => w.en !== word.en && w.ja !== word.ja)).slice(0, 3);
      const choices = shuffle([word, ...wrong]);
      return { word, choices, correctIndex: choices.indexOf(word) };
    });
  }

  function startQuiz() {
    isReviewMode = false;
    const pool = activePool();
    questions = buildQuestions(pool, pool);
    currentIndex = 0;
    score = 0;
    wrongWords = [];
    renderQuestion();
    showScreen('quiz');
  }

  function startReviewQuiz() {
    const list = loadReviewList();
    if (list.length === 0) return;
    isReviewMode = true;
    questions = buildQuestions(list, WORDS.concat(PHRASES));
    currentIndex = 0;
    score = 0;
    wrongWords = [];
    renderQuestion();
    showScreen('quiz');
  }

  function renderQuestion() {
    const q = questions[currentIndex];
    answered = false;

    document.getElementById('question-counter').textContent =
      `${currentIndex + 1} / ${questions.length}`;
    document.getElementById('current-score').textContent = score;
    document.getElementById('word-number').textContent =
      (isReviewMode ? '🔁 復習 ' : '問題 ') + (currentIndex + 1);
    const wordEl = document.getElementById('word-english');
    wordEl.textContent = q.word.en;
    wordEl.classList.toggle('long', q.word.en.length > 12);
    document.getElementById('word-hint').textContent = '';

    const pct = (currentIndex / questions.length) * 100;
    document.getElementById('progress-bar').style.width = pct + '%';

    const btns = document.querySelectorAll('.choice-btn');
    btns.forEach((btn, i) => {
      btn.textContent = q.choices[i].ja;
      btn.className = 'choice-btn';
      btn.disabled = false;
    });

    speak(q.word.en);
  }

  function handleAnswer(selectedIndex) {
    if (answered) return;
    answered = true;

    const q = questions[currentIndex];
    const btns = document.querySelectorAll('.choice-btn');
    btns.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.correctIndex) {
      score++;
      btns[selectedIndex].classList.add('correct');
      document.getElementById('current-score').textContent = score;
      // 復習モードで正解 → 復習リストから削除
      if (isReviewMode) {
        removeFromReviewList(q.word.en);
      }
    } else {
      btns[selectedIndex].classList.add('wrong');
      btns[q.correctIndex].classList.add('reveal');
      wrongWords.push(q.word);
    }

    setTimeout(() => {
      currentIndex++;
      if (currentIndex < questions.length) {
        renderQuestion();
      } else {
        showResult();
      }
    }, 900);
  }

  function showResult() {
    const total = questions.length;
    const pct = Math.round(score / total * 100);
    document.getElementById('result-score').textContent = score;
    document.getElementById('result-score-total').textContent = `/ ${total}`;
    document.getElementById('result-accuracy').textContent = `正答率 ${pct}%`;
    document.getElementById('result-correct').textContent = `${score}問`;
    document.getElementById('result-wrong').textContent = `${total - score}問`;
    document.getElementById('progress-bar').style.width = '100%';

    const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '👍' : '😅';
    const title = pct >= 90 ? '素晴らしい！' : pct >= 70 ? 'よくできました！' : pct >= 50 ? 'もう少し！' : 'もっと練習しよう！';
    document.getElementById('result-emoji').textContent = emoji;
    document.getElementById('result-title').textContent = title;

    // 不正解を復習リストに追加
    if (wrongWords.length > 0) {
      addToReviewList(wrongWords);
    }

    const wrongList = document.getElementById('result-wrong-list');
    if (wrongWords.length > 0) {
      wrongList.innerHTML = `<h3>復習リストに追加 (${wrongWords.length}語)</h3>` +
        wrongWords.map(w => `
          <div class="wrong-item">
            <span class="wrong-item-en">${w.en}</span>
            <span class="wrong-item-ja">${w.ja}</span>
          </div>`).join('');
    } else {
      wrongList.innerHTML = isReviewMode
        ? '<p class="all-clear">復習リストの単語を全問正解！リストから削除されました 🎉</p>'
        : '';
    }

    if (!isReviewMode) {
      const stats = loadStats();
      stats.total += total;
      stats.correct += score;
      if (score > stats.bestScore || (score === stats.bestScore && total >= stats.bestTotal)) {
        stats.bestScore = score;
        stats.bestTotal = total;
      }
      saveStats(stats);
    }

    showScreen('result');
  }

  // --- 復習リスト画面 ---
  function renderReviewListScreen() {
    const list = loadReviewList();
    const body = document.getElementById('review-list-body');
    const startBtn = document.getElementById('start-review-quiz-btn');

    if (list.length === 0) {
      body.innerHTML = '<p class="empty-review">復習リストは空です。<br>不正解だった単語が自動で追加されます。</p>';
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      body.innerHTML = list.map(w => `
        <div class="review-list-item" data-en="${w.en}">
          <div class="review-item-words">
            <span class="review-item-en">${w.en}</span>
            <span class="review-item-ja">${w.ja}</span>
          </div>
          <button class="item-speak-btn" data-en="${w.en}" title="発音を聞く">🔊</button>
          <button class="remove-btn" data-en="${w.en}" title="リストから削除">✕</button>
        </div>
      `).join('');

      body.querySelectorAll('.item-speak-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          speak(btn.dataset.en);
        });
      });

      body.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          removeFromReviewList(btn.dataset.en);
          btn.closest('.review-list-item').remove();
          const remaining = loadReviewList().length;
          if (remaining === 0) {
            renderReviewListScreen();
          }
        });
      });
    }
  }

  // --- イベント ---
  document.querySelectorAll('#count-buttons .mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#count-buttons .mode-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      questionCount = parseInt(btn.dataset.count);
    });
  });

  document.querySelectorAll('#cat-buttons .mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#cat-buttons .mode-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      category = btn.dataset.cat;
      localStorage.setItem('wordCategory', category);
    });
  });

  document.getElementById('speak-btn').addEventListener('click', () => {
    if (questions[currentIndex]) speak(questions[currentIndex].word.en);
  });
  document.getElementById('word-english').addEventListener('click', () => {
    if (questions[currentIndex]) speak(questions[currentIndex].word.en);
  });

  document.getElementById('start-btn').addEventListener('click', startQuiz);

  document.getElementById('review-btn').addEventListener('click', () => {
    renderReviewListScreen();
    showScreen('reviewList');
  });

  document.getElementById('review-list-back-btn').addEventListener('click', () => {
    showScreen('home');
  });

  document.getElementById('clear-review-btn').addEventListener('click', () => {
    if (confirm('復習リストをすべて削除しますか？')) {
      saveReviewList([]);
      updateReviewBadge();
      renderReviewListScreen();
    }
  });

  document.getElementById('start-review-quiz-btn').addEventListener('click', () => {
    startReviewQuiz();
  });

  document.getElementById('quiz-back-btn').addEventListener('click', () => {
    if (confirm('クイズを終了しますか？')) {
      updateHomeStats();
      showScreen('home');
    }
  });

  document.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.index)));
  });

  document.getElementById('retry-btn').addEventListener('click', () => {
    if (isReviewMode) startReviewQuiz();
    else startQuiz();
  });

  document.getElementById('home-btn').addEventListener('click', () => {
    updateHomeStats();
    updateReviewBadge();
    showScreen('home');
  });

  document.getElementById('reset-stats-btn').addEventListener('click', () => {
    if (confirm('統計をリセットしますか？')) {
      localStorage.removeItem('wordStats');
      updateHomeStats();
    }
  });

  // Init
  document.querySelectorAll('#cat-buttons .mode-btn').forEach(b =>
    b.classList.toggle('selected', b.dataset.cat === category)
  );
  updateHomeStats();
  updateReviewBadge();
})();
