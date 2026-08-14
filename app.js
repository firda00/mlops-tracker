// Default Top University Courses Data
const INITIAL_COURSES = [
  {
    id: "mit-6miss",
    title: "MIT 6.MISS: The Missing Semester of CS",
    uni: "MIT",
    category: "cs",
    url: "https://www.youtube.com/playlist?list=PLyzOVJj3bIFC8wV162wW18p3f15-18mK6",
    notes: "Курс о практических инструментах программирования: Shell, Vim, Git, Data Wrangling, Command Line и автоматизация.",
    completed: false,
    modules: [
      { title: "Course Overview & Shell Basics", start: "00:00", summary: "Знакомство с командной строкой Linux/Unix." },
      { title: "Vim & Modern Editors", start: "14:20", summary: "Редактирование файлов и горячие клавиши." },
      { title: "Git Version Control", start: "32:10", summary: "Коммиты, ветки и разрешение конфликтов." }
    ],
    quizzes: [
      {
        question: "Какая команда UNIX выводит текущий рабочий каталог?",
        options: ["pwd", "ls -la", "cd ~", "whoami"],
        correctIndex: 0,
        explanation: "Команда 'pwd' означает Print Working Directory."
      },
      {
        question: "Какая команда используется для поиска строк по регулярному выражению?",
        options: ["grep", "find", "cat", "echo"],
        correctIndex: 0,
        explanation: "Команда 'grep' позволяет фильтровать строки в файле или потоке ввода по шаблону."
      }
    ],
    flashcards: [
      { term: "Shell Piping (|)", definition: "Перенаправление стандартного вывода одной команды на вход другой." },
      { term: "Vim Normal Mode", definition: "Режим навигации и выполнения команд в редакторе Vim." },
      { term: "Git Stash", definition: "Временное сохранение незакоммиченных изменений в стек." }
    ]
  },
  {
    id: "harvard-cs50",
    title: "Harvard CS50: Intro to Computer Science",
    uni: "HARVARD",
    category: "cs",
    url: "https://www.youtube.com/playlist?list=PLhQjrBD2T382_R136j127018jCFKGGD67",
    notes: "Фундаментальный курс по Computer Science: алгоритмы, C, Python, SQL, веб-разработка и структуры данных.",
    completed: false,
    modules: [
      { title: "Computational Thinking & Scratch", start: "00:00", summary: "Алгоритмическое мышление и переменные." },
      { title: "C Language & Memory Management", start: "22:15", summary: "Типы данных, функции и указатели." },
      { title: "Algorithms & Big O Notation", start: "45:00", summary: "Оценка сложности алгоритмов сортировки." }
    ],
    quizzes: [
      {
        question: "Какова временная сложность бинарного поиска?",
        options: ["O(N)", "O(log N)", "O(N^2)", "O(1)"],
        correctIndex: 1,
        explanation: "Бинарный поиск делит массив пополам на каждом шаге, что дает O(log N)."
      }
    ],
    flashcards: [
      { term: "Pointer in C", definition: "Переменная, хранящая адрес памяти другой переменной." },
      { term: "Big O Notation", definition: "Математическое обозначение верхней границы сложности алгоритма." }
    ]
  },
  {
    id: "stanford-cs229",
    title: "Stanford CS229: Machine Learning (Andrew Ng)",
    uni: "STANFORD",
    category: "ml",
    url: "https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU",
    notes: "Классический курс по машинному обучению от Андрея Ына. Обучение с учителем/без учителя, теория, градиентный спуск, RL.",
    completed: false,
    modules: [
      { title: "Supervised vs Unsupervised Learning", start: "00:00", summary: "Различия задач регрессии и классификации." },
      { title: "Linear Regression & Gradient Descent", start: "12:40", summary: "Функция потерь и шаг обучения (learning rate)." },
      { title: "Logistic Regression & Sigmoid", start: "38:00", summary: "Вероятностная классификация." }
    ],
    quizzes: [
      {
        question: "Что регулирует параметр alpha (Learning Rate) в градиентном спуске?",
        options: ["Размер шага при обновлении весов", "Количество нейронов в скрытом слое", "Число признаков в датасете", "Размер мини-батча"],
        correctIndex: 0,
        explanation: "Learning Rate определяет величину шага в сторону антиградиента."
      }
    ],
    flashcards: [
      { term: "Gradient Descent", definition: "Итеративный алгоритм оптимизации весов модели." },
      { term: "Cost Function", definition: "Функция, измеряющая ошибку предсказания модели." }
    ]
  },
  {
    id: "stanford-cs231n",
    title: "Stanford CS231n: Deep Learning & CV",
    uni: "STANFORD",
    category: "dl",
    url: "https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv",
    notes: "Глубокое обучение для компьютерного зрения. Сверточные сети (CNN), оптимизация, трансферное обучение, детекция объектов.",
    completed: false,
    modules: [
      { title: "Image Classification Pipeline", start: "00:00", summary: "Трудности компьютерного зрения и датасет ImageNet." },
      { title: "Convolutional Layers & Pooling", start: "18:30", summary: "Ядра свертки, stride, padding и рецептивные поля." }
    ],
    quizzes: [
      {
        question: "Какова основная функция слоя Pooling (например, Max Pooling)?",
        options: ["Уменьшение пространственных размеров карт признаков", "Увеличение количества каналов", "Нормализация батча", "Расчет градиентов"],
        correctIndex: 0,
        explanation: "Pooling сокращает размерность карт признаков, сохраняя наиболее важные детали."
      }
    ],
    flashcards: [
      { term: "CNN (Convolutional Neural Network)", definition: "Архитектура нейросети для обработки изображений и пространственных данных." }
    ]
  },
  {
    id: "berkeley-mlops",
    title: "UC Berkeley: Full Stack Deep Learning & MLOps",
    uni: "UC BERKELEY",
    category: "mlops",
    url: "https://www.youtube.com/playlist?list=PL1T8fO7ArWleyIqOy37OVBB5yV2V3ed82",
    notes: "Практический курс по MLOps и деплою моделей. Инфраструктура, мониторинг моделей, CI/CD для ML, пайплайны данных, LLM Stack.",
    completed: false,
    modules: [
      { title: "ML Lifecycle & Problem Formulation", start: "00:00", summary: "Жизненный цикл ML системы от идеи до продакшена." },
      { title: "Data Management & Versioning", start: "20:00", summary: "Версионирование датасетов с DVC и Feature Stores." }
    ],
    quizzes: [
      {
        question: "Что означает понятиe Concept Drift в MLOps?",
        options: ["Изменение статистических свойств целевой переменной с течением времени", "Ошибка компиляции CUDA", "Падение сервера", "Переполнение памяти GPU"],
        correctIndex: 0,
        explanation: "Concept Drift отражает сдвиг реального распределения данных в продакшене."
      }
    ],
    flashcards: [
      { term: "MLOps", definition: "Набор практик для автоматизации и надежного деплоя ML-моделей в продакшен." }
    ]
  }
];

// App State
let courses = [];
let activeFilter = "all";
let searchQuery = "";
let currentCourse = null;

// Quiz & Flashcards Interactive State
let currentQuizScore = 0;
let totalQuizQuestions = 0;
let currentFlashcardIndex = 0;
let currentFlashcardsList = [];

// Dynamic API Base URL Configuration (supports local development & production deployment)
const API_BASE_URL = (typeof window !== "undefined" && window.API_CONFIG && window.API_CONFIG.BASE_URL)
  || localStorage.getItem("CS_ML_API_URL")
  || (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
      ? "http://localhost:8000"
      : "https://cs-ml-roadmap-api.onrender.com");


// DOM Elements
const courseListContainer = document.getElementById("courseListContainer");
const progressBarFill = document.getElementById("progressBarFill");
const progressText = document.getElementById("progressText");
const searchInput = document.getElementById("searchInput");
const filterPills = document.getElementById("filterPills");

// Modals
const addModal = document.getElementById("addModal");
const openAddModalBtn = document.getElementById("openAddModalBtn");
const closeAddModalBtn = document.getElementById("closeAddModalBtn");
const cancelAddBtn = document.getElementById("cancelAddBtn");
const addCourseForm = document.getElementById("addCourseForm");
const courseUniSelect = document.getElementById("courseUni");
const customUniGroup = document.getElementById("customUniGroup");

const viewModal = document.getElementById("viewModal");
const closeViewModalBtn = document.getElementById("closeViewModalBtn");
const viewUniBadge = document.getElementById("viewUniBadge");
const viewTitle = document.getElementById("viewTitle");
const videoIframe = document.getElementById("videoIframe");
const videoFallback = document.getElementById("videoFallback");
const videoExternalLink = document.getElementById("videoExternalLink");
const viewNotes = document.getElementById("viewNotes");
const saveNotesBtn = document.getElementById("saveNotesBtn");
const saveStatusMsg = document.getElementById("saveStatusMsg");

// AI Tutor Elements
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendMessageBtn = document.getElementById("sendMessageBtn");
const modulesList = document.getElementById("modulesList");
const quizContainer = document.getElementById("quizContainer");
const flashcardsGrid = document.getElementById("flashcardsGrid");

// Initialization
function initApp() {
  loadCoursesFromStorage();
  setupEventListeners();
  setupTabNavigation();
  render();
}

function loadCoursesFromStorage() {
  const stored = localStorage.getItem("cs_ml_roadmap_courses");
  if (stored) {
    try {
      courses = JSON.parse(stored);
    } catch (e) {
      courses = [...INITIAL_COURSES];
    }
  } else {
    courses = [...INITIAL_COURSES];
    saveCoursesToStorage();
  }
}

function saveCoursesToStorage() {
  localStorage.setItem("cs_ml_roadmap_courses", JSON.stringify(courses));
}

function getUniBadgeClass(uniName) {
  const normalized = uniName.toUpperCase().trim();
  if (normalized.includes("MIT")) return "mit";
  if (normalized.includes("HARVARD")) return "harvard";
  if (normalized.includes("STANFORD")) return "stanford";
  if (normalized.includes("BERKELEY")) return "uc-berkeley";
  if (normalized.includes("CMU")) return "cmu";
  return "other";
}

function render() {
  const total = courses.length;
  const completedCount = courses.filter(c => c.completed).length;
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  progressText.textContent = `${percentage}% (${completedCount}/${total})`;
  progressBarFill.style.width = `${percentage}%`;

  const filtered = courses.filter(course => {
    const matchesFilter = activeFilter === "all" || course.category === activeFilter;
    const matchesSearch = searchQuery === "" || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.uni.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.notes && course.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    courseListContainer.innerHTML = `<div class="empty-state"><p>Курсы не найдены</p></div>`;
    return;
  }

  courseListContainer.innerHTML = filtered.map(course => {
    const badgeClass = getUniBadgeClass(course.uni);
    return `
      <div class="course-card ${course.completed ? 'completed' : ''}" data-id="${course.id}">
        <div class="card-left" onclick="openCourseView('${course.id}')">
          <span class="uni-badge ${badgeClass}">${escapeHtml(course.uni)}</span>
          <h2 class="course-title">${escapeHtml(course.title)}</h2>
          <div class="course-meta">
            <span class="course-link">Интерактивное обучение ↗</span>
          </div>
        </div>
        <div class="card-right">
          <label class="checkbox-container" onclick="event.stopPropagation();">
            <input type="checkbox" ${course.completed ? 'checked' : ''} onchange="toggleCourseCompletion('${course.id}')">
            <span class="custom-checkmark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          </label>
        </div>
      </div>
    `;
  }).join('');
}

window.toggleCourseCompletion = function(id) {
  const course = courses.find(c => c.id === id);
  if (course) {
    course.completed = !course.completed;
    saveCoursesToStorage();
    render();
  }
};

function getYouTubeEmbedUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com") || parsed.hostname.includes("youtu.be")) {
      const listParam = parsed.searchParams.get("list");
      if (listParam) {
        return `https://www.youtube.com/embed/videoseries?list=${listParam}`;
      }
      let videoId = parsed.searchParams.get("v");
      if (!videoId && parsed.hostname.includes("youtu.be")) {
        videoId = parsed.pathname.substring(1);
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
  } catch (e) {}
  return null;
}

// Open Course Learning Environment
window.openCourseView = async function(id) {
  currentCourse = courses.find(c => c.id === id);
  if (!currentCourse) return;

  viewUniBadge.textContent = currentCourse.uni;
  viewUniBadge.className = `uni-badge ${getUniBadgeClass(currentCourse.uni)}`;
  viewTitle.textContent = currentCourse.title;
  viewNotes.value = currentCourse.notes || "";

  const embedUrl = getYouTubeEmbedUrl(currentCourse.url);
  if (embedUrl) {
    videoIframe.style.display = "block";
    videoFallback.style.display = "none";
    videoIframe.src = embedUrl;
  } else {
    videoIframe.style.display = "none";
    videoFallback.style.display = "flex";
    videoExternalLink.href = currentCourse.url;
  }

  // Reset active tab to video tab
  document.querySelectorAll(".tab-btn").forEach((b, i) => b.classList.toggle("active", i === 0));
  document.querySelectorAll(".tab-content").forEach((c, i) => c.classList.toggle("active", i === 0));

  // Render initial modules, quizzes, flashcards
  renderModules(currentCourse.modules || []);
  renderQuiz(currentCourse.quizzes || []);
  renderFlashcards(currentCourse.flashcards || []);

  viewModal.classList.add("active");

  // Attempt backend sync for AI data
  try {
    const res = await fetch(`${API_BASE_URL}/api/process-video`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ youtube_url: currentCourse.url })
    });
    if (res.ok) {
      const result = await res.json();
      if (result.success && result.data) {
        const data = result.data;
        if (data.modules && data.modules.length > 0) renderModules(data.modules);
        if (data.quizzes && data.quizzes.length > 0) {
          currentCourse.quizzes = data.quizzes;
          renderQuiz(data.quizzes);
        }
        if (data.flashcards && data.flashcards.length > 0) {
          currentCourse.flashcards = data.flashcards;
          renderFlashcards(data.flashcards);
        }
        saveCoursesToStorage();
      }
    }
  } catch (e) {
    console.log("[Backend API] Offline or not reachable. Operating in local mode.");
  }
};

function closeViewModal() {
  viewModal.classList.remove("active");
  videoIframe.src = "";
  currentCourse = null;
}

// Tab Switching
function setupTabNavigation() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const tabId = btn.getAttribute("data-tab");
      
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const target = document.getElementById(`tab-${tabId}`);
      if (target) target.classList.add("active");
    });
  });
}

function renderModules(modules) {
  if (!modules || modules.length === 0) {
    modulesList.innerHTML = `<p style="color:#9ca3af;">Модули лекции формируются...</p>`;
    return;
  }
  modulesList.innerHTML = modules.map(m => `
    <div class="module-item">
      <div>
        <strong>${escapeHtml(m.title)}</strong>
        <p style="font-size:0.8rem; color:#9ca3af;">${escapeHtml(m.summary || m.key_takeaway || "")}</p>
      </div>
      <span class="timestamp-tag" onclick="jumpToTimestamp('${m.start || m.start_timestamp}')">⏱ ${m.start || m.start_timestamp}</span>
    </div>
  `).join('');
}

window.jumpToTimestamp = function(timestampStr) {
  alert(`Переход к таймкоду ${timestampStr} в лекции.`);
};

/* ==========================================================================
   Quiz Interactivity & Live Score Counter
   ========================================================================== */
function renderQuiz(quizzes) {
  if (!quizzes || quizzes.length === 0) {
    quizContainer.innerHTML = `<p style="color:#9ca3af;">Вопросы по лекции не найдены.</p>`;
    return;
  }

  currentQuizScore = 0;
  totalQuizQuestions = quizzes.length;

  let html = `
    <div class="quiz-header-banner">
      <span>Проверка знаний по лекции</span>
      <span class="quiz-score-badge" id="quizScoreBadge">Счёт: 0 из ${totalQuizQuestions}</span>
    </div>
  `;

  html += quizzes.map((q, idx) => {
    const correctIdx = (q.correctIndex !== undefined) ? q.correctIndex : (q.correct_option_index || 0);
    return `
      <div class="quiz-card" id="quiz-card-${idx}">
        <div class="quiz-question">${idx + 1}. ${escapeHtml(q.question)}</div>
        <div class="quiz-options">
          ${q.options.map((opt, optIdx) => `
            <button class="option-btn" onclick="checkQuizAnswer(this, ${idx}, ${optIdx}, ${correctIdx}, '${escapeHtml(q.explanation || '')}')">
              ${escapeHtml(opt)}
            </button>
          `).join('')}
        </div>
        <div class="explanation-container" id="explanation-${idx}" style="display: none;"></div>
      </div>
    `;
  }).join('');

  quizContainer.innerHTML = html;
}

window.checkQuizAnswer = function(btn, questionIdx, selectedIdx, correctIdx, explanation) {
  const card = document.getElementById(`quiz-card-${questionIdx}`);
  const buttons = card.querySelectorAll(".option-btn");
  buttons.forEach(b => b.disabled = true);

  const isCorrect = (selectedIdx === correctIdx);
  if (isCorrect) {
    btn.classList.add("correct");
    btn.innerHTML += " ✅ (Верно!)";
    currentQuizScore++;
  } else {
    btn.classList.add("wrong");
    btn.innerHTML += " ❌";
    if (buttons[correctIdx]) {
      buttons[correctIdx].classList.add("correct");
      buttons[correctIdx].innerHTML += " ✅ (Правильный ответ)";
    }
  }

  // Update Score Badge
  const scoreBadge = document.getElementById("quizScoreBadge");
  if (scoreBadge) {
    scoreBadge.textContent = `Счёт: ${currentQuizScore} из ${totalQuizQuestions}`;
  }

  // Show explanation block
  const expBox = document.getElementById(`explanation-${questionIdx}`);
  if (expBox) {
    expBox.style.display = "block";
    expBox.className = "explanation-box";
    expBox.innerHTML = `💡 <strong>Объяснение:</strong> ${explanation || 'Ответ основан на материале лекции.'}`;
  }
};

/* ==========================================================================
   Interactive 3D Flip Flashcards Carousel
   ========================================================================== */
function renderFlashcards(cards) {
  if (!cards || cards.length === 0) {
    flashcardsGrid.innerHTML = `<p style="color:#9ca3af;">Термины не найдены.</p>`;
    return;
  }

  currentFlashcardsList = cards;
  currentFlashcardIndex = 0;
  updateFlashcardCarousel();
}

function updateFlashcardCarousel() {
  if (currentFlashcardsList.length === 0) return;

  const card = currentFlashcardsList[currentFlashcardIndex];
  flashcardsGrid.innerHTML = `
    <div class="flashcard-carousel-container">
      <div class="flip-card" id="activeFlipCard" onclick="toggleFlipCard(this)">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <h3>${escapeHtml(card.term)}</h3>
            <span class="hint">🔄 Нажмите, чтобы посмотреть определение</span>
          </div>
          <div class="flip-card-back">
            <p>${escapeHtml(card.definition)}</p>
            ${card.timestamp ? `<span style="font-size:0.8rem; color:#38bdf8; margin-top:10px; display:inline-block;">⏱ ${card.timestamp}</span>` : ''}
          </div>
        </div>
      </div>

      <div class="flashcard-nav">
        <button class="btn-secondary" onclick="prevFlashcard()" ${currentFlashcardIndex === 0 ? 'disabled' : ''}>← Предыдущая</button>
        <span class="flashcard-counter">Карточка ${currentFlashcardIndex + 1} из ${currentFlashcardsList.length}</span>
        <button class="btn-secondary" onclick="nextFlashcard()" ${currentFlashcardIndex === currentFlashcardsList.length - 1 ? 'disabled' : ''}>Следующая →</button>
      </div>
    </div>
  `;
}

window.toggleFlipCard = function(cardEl) {
  cardEl.classList.toggle("flipped");
};

window.prevFlashcard = function() {
  if (currentFlashcardIndex > 0) {
    currentFlashcardIndex--;
    updateFlashcardCarousel();
  }
};

window.nextFlashcard = function() {
  if (currentFlashcardIndex < currentFlashcardsList.length - 1) {
    currentFlashcardIndex++;
    updateFlashcardCarousel();
  }
};

/* ==========================================================================
   AI Tutor Chat (RAG Integration)
   ========================================================================== */
if (sendMessageBtn) sendMessageBtn.addEventListener("click", sendChatMessage);
if (chatInput) {
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendChatMessage();
  });
}

async function sendChatMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  appendMessage(text, "user-msg");
  chatInput.value = "";

  // Attempt Vector RAG API request
  try {
    const res = await fetch(`${API_BASE_URL}/api/chat-rag`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        youtube_url: currentCourse ? currentCourse.url : "",
        question: text
      })
    });
    if (res.ok) {
      const result = await res.json();
      if (result.success && result.data && result.data.answer) {
        appendMessage(result.data.answer, "ai-msg");
        return;
      }
    }
  } catch (e) {}

  // Fallback local response
  setTimeout(() => {
    const aiResponse = `Согласно материалам лекции: Вопрос <strong>"${escapeHtml(text)}"</strong> рассматривается на этапе <strong>[12:40]</strong>. Ключевая концепция состоит в оптимизации параметров и согласовании архитектурных решений.`;
    appendMessage(aiResponse, "ai-msg");
  }, 600);
}

function appendMessage(text, className) {
  const msg = document.createElement("div");
  msg.className = `message ${className}`;
  msg.innerHTML = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Save Notes
if (saveNotesBtn) {
  saveNotesBtn.addEventListener("click", () => {
    if (!currentCourse) return;
    currentCourse.notes = viewNotes.value;
    saveCoursesToStorage();
    saveStatusMsg.classList.add("show");
    setTimeout(() => saveStatusMsg.classList.remove("show"), 2000);
  });
}

function setupEventListeners() {
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    render();
  });

  filterPills.addEventListener("click", (e) => {
    if (e.target.classList.contains("pill-btn")) {
      document.querySelectorAll(".pill-btn").forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");
      activeFilter = e.target.getAttribute("data-filter");
      render();
    }
  });

  openAddModalBtn.addEventListener("click", () => addModal.classList.add("active"));
  closeAddModalBtn.addEventListener("click", () => addModal.classList.remove("active"));
  cancelAddBtn.addEventListener("click", () => addModal.classList.remove("active"));
  closeViewModalBtn.addEventListener("click", closeViewModal);

  courseUniSelect.addEventListener("change", (e) => {
    customUniGroup.style.display = e.target.value === "OTHER" ? "flex" : "none";
  });

  addCourseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("courseTitle").value.trim();
    let uni = courseUniSelect.value;
    if (uni === "OTHER") uni = document.getElementById("customUni.value").trim() || "ОБРАЗОВАНИЕ";
    const category = document.getElementById("courseCategory").value;
    const url = document.getElementById("courseUrl").value.trim();
    const notes = document.getElementById("courseNotes").value.trim();

    const newCourse = {
      id: "custom-" + Date.now(),
      title,
      uni,
      category,
      url,
      notes,
      completed: false,
      modules: [{ title: "Введение в лекцию", start: "00:00", summary: "Основной материал лекции" }],
      quizzes: [],
      flashcards: []
    };

    courses.unshift(newCourse);
    saveCoursesToStorage();
    render();
    addCourseForm.reset();
    addModal.classList.remove("active");
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}

document.addEventListener("DOMContentLoaded", initApp);
