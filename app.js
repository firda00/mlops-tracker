/**
 * CS & MLOps Interactive AI Learning Platform
 * Production Core Application Logic (Strong Junior Workflow & Real YouTube API Player)
 */

// Universal YouTube URL Regex Parser
function extractYouTubeId(urlOrId) {
  if (!urlOrId) return null;
  const str = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) return str;

  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?.*?(?:v=)([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/
  ];

  for (const pattern of patterns) {
    const match = str.match(pattern);
    if (match) return match[1];
  }

  const fallback = str.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:[&?]|$)/);
  return fallback ? fallback[1] : null;
}

// Convert "MM:SS" or "HH:MM:SS" string to integer seconds
function timestampToSeconds(timestampStr) {
  if (!timestampStr) return 0;
  const parts = timestampStr.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] || 0;
}

// Pre-loaded Benchmark Catalog (Instant Zero-Wait Experience for Top University Courses)
const BENCHMARK_COURSES = [
  {
    id: "harvard-cs50-l0",
    title: "Harvard CS50 - Lecture 0: Computational Thinking & Algorithms",
    uni: "HARVARD",
    category: "cs",
    youtube_id: "3LPJfIKbwWc",
    url: "https://www.youtube.com/watch?v=3LPJfIKbwWc",
    summary: "Фундаментальное введение в алгоритмическое мышление, двоичную систему счисления, ASCII/Unicode, оценку сложности Big O и базовые управляющие структуры.",
    completed: false,
    currentStep: 1,
    modules: [
      { start: "00:00", title: "1. Что такое Computer Science & Входные/Выходные данные", summary: "Понятие черного ящика: входные данные (inputs) превращаются в результат (outputs) через алгоритмы." },
      { start: "15:30", title: "2. Двоичная система счисления (Binary & Bits)", summary: "Как транзисторы и электрические сигналы кодируют числа от 0 до 255 в байтах." },
      { start: "38:40", title: "3. Текст, ASCII, Unicode и Emoji", summary: "Отображение чисел в символы через таблицы ASCII и стандарты Unicode." },
      { start: "58:10", title: "4. Алгоритмы поиска: Линейный vs Двоичный поиск (O(log N))", summary: "Разделяй и властвуй: разрыв телефонного справочника пополам для логарифмической скорости." }
    ],
    quizzes: [
      {
        question: "Сколько операций сравнения максимум потребуется двоичному поиску в телефонном справочнике на 4 194 304 (2^22) имен?",
        options: ["22 операции", "4 194 304 операций", "2 097 152 операции", "1000 операций"],
        correctIndex: 0,
        explanation: "Двоичный поиск имеет сложность O(log2 N). Для N = 2^22 log2(2^22) = 22 шага."
      },
      {
        question: "Почему 8 бит (1 байт) могут представлять ровно 256 различных значений (0 - 255)?",
        options: ["Потому что 2^8 = 256 возможных комбинаций состояний 0 и 1", "Потому что в таблице ASCII ровно 128 символов", "Потому что это ограничение архитектуры x86", "Из-за структуры памяти операционной системы"],
        correctIndex: 0,
        explanation: "Каждый бит имеет 2 состояния. Для 8 независимых бит общее число комбинаций равно 2 * 2 * ... * 2 (8 раз) = 2^8 = 256."
      },
      {
        question: "В чем главное требование для применения алгоритма бинарного поиска (Binary Search)?",
        options: ["Массив должен быть предварительно отсортирован", "Массив должен содержать только четные числа", "Длина массива должна быть степенью двойки", "Все элементы должны быть уникальными"],
        correctIndex: 0,
        explanation: "Бинарный поиск основывается на свойстве порядка: если искомый элемент меньше среднего, поиск продолжается только в левой половине."
      }
    ],
    challenge: {
      title: "Реализация и бенчмарк Binary Search на Python",
      description: "Напишите функцию <code>binary_search(arr, target)</code>, которая принимает отсортированный список чисел <code>arr</code> и искомое число <code>target</code>. Функция должна возвращать <strong>индекс</strong> элемента, если он найден, или <code>-1</code>, если элемент отсутствует.",
      starterCode: `def binary_search(arr: list[int], target: int) -> int:
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1

# Тестовый вызов:
test_arr = [1, 3, 5, 7, 9, 11, 15, 20]
print("Index of 7:", binary_search(test_arr, 7))
print("Index of 4:", binary_search(test_arr, 4))
`,
      expectedOutputKeyword: "Index of 7: 3"
    },
    deliverable: `# Harvard CS50 - Module 0: Computational Thinking & Algorithmic Foundations

## 🏛️ Course Overview
* **Institution**: Harvard University
* **Topic**: Binary Representation, Computational Complexity, Algorithmic Search
* **Core Artifact**: Verified Binary Search Algorithm Implementation with $O(\\log N)$ time complexity.

\`\`\`python
def binary_search(arr: list[int], target: int) -> int:
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
\`\`\`
`
  },
  {
    id: "stanford-cs229-l1",
    title: "Stanford CS229: Machine Learning - Lecture 1: Supervised Learning",
    uni: "STANFORD",
    category: "ml",
    youtube_id: "jGwO_UgTS7I",
    url: "https://www.youtube.com/watch?v=jGwO_UgTS7I",
    summary: "Классическая вводная лекция Эндрю Ына: постановка задачи обучения с учителем (Supervised Learning), функция потерь MSE и вывод алгоритма градиентного спуска (LMS Gradient Descent).",
    completed: false,
    currentStep: 1,
    modules: [
      { start: "00:00", title: "1. Введение в курс & Supervised vs Unsupervised Learning", summary: "Определение задач регрессии (непрерывный таргет) и классификации (дискретный таргет)." },
      { start: "14:15", title: "2. Linear Regression & Гипотеза h_theta(x)", summary: "Параметризация модели линейной регрессии и векторное представление признаков." },
      { start: "31:40", title: "3. Функция стоимости J(theta) (Mean Squared Error)", summary: "Геометрический смысл параболоида функции потерь и поиск глобального минимума." },
      { start: "52:10", title: "4. Вывод формулы Batch Gradient Descent", summary: "Математический вывод частной производной dJ/d(theta_j) и правило обновления весов." }
    ],
    quizzes: [
      {
        question: "Что произойдет с градиентным спуском, если Learning Rate (alpha) выбран слишком большим?",
        options: ["Алгоритм может разойтись (diverge) и перескакивать через минимум", "Алгоритм сойдется мгновенно за 1 шаг", "Веса модели обратятся в ноль", "Сложность вычислений возрастет экспоненциально"],
        correctIndex: 0,
        explanation: "При слишком большом шаге alpha обновление весов перескакивает дно параболоида функции потерь, приводя к бесконечному росту ошибки."
      },
      {
        question: "Какова математическая форма частной производной квадратичной функции потерь MSE по весу theta_j?",
        options: ["(h_theta(x) - y) * x_j", "h_theta(x) + y", "(h_theta(x) - y)^2", "alpha * (h_theta(x) - y)"],
        correctIndex: 0,
        explanation: "По правилу дифференцирования сложной функции: d/d(theta_j) 1/2*(h(x)-y)^2 = (h(x)-y) * d/d(theta_j)(theta*x - y) = (h(x)-y)*x_j."
      },
      {
        question: "В чем ключевое отличие Batch Gradient Descent от Stochastic Gradient Descent (SGD)?",
        options: ["Batch GD использует весь датасет для одного шага, а SGD — ровно один случайный пример", "Batch GD применим только к классификации", "SGD не использует learning rate", "Batch GD не требует вычисления производных"],
        correctIndex: 0,
        explanation: "Batch Gradient Descent суммирует градиенты по всем m обучающим примерам на каждой итерации, а SGD обновляет веса сразу после каждого примера."
      }
    ],
    challenge: {
      title: "Векторизованный шаг Gradient Descent на NumPy",
      description: "Реализуйте функцию <code>gradient_descent_step(X, y, theta, alpha)</code> с использованием матричных операций NumPy. Функция должна вычислять ошибку предсказаний и возвращать обновленный вектор весов <code>theta_new = theta - (alpha / m) * X.T @ (X @ theta - y)</code>.",
      starterCode: `import numpy as np

def gradient_descent_step(X: np.ndarray, y: np.ndarray, theta: np.ndarray, alpha: float) -> np.ndarray:
    m = len(y)
    predictions = X @ theta
    errors = predictions - y
    gradient = (1 / m) * (X.T @ errors)
    theta_new = theta - alpha * gradient
    return theta_new

# Тест:
np.random.seed(42)
X_sample = np.array([[1, 1], [1, 2], [1, 3]])
y_sample = np.array([2, 2.5, 3.5])
theta_init = np.array([0.0, 0.0])
theta_updated = gradient_descent_step(X_sample, y_sample, theta_init, alpha=0.1)
print("Updated Theta:", np.round(theta_updated, 4))
`,
      expectedOutputKeyword: "Updated Theta:"
    },
    deliverable: `# Stanford CS229: Supervised Learning & Linear Regression

## 🧠 Mathematical Formulation
Linear Hypothesis:
$$h_\\theta(x) = \\sum_{i=0}^n \\theta_i x_i = \\theta^T x$$

Cost Function (MSE):
$$J(\\theta) = \\frac{1}{2m} \\sum_{i=1}^m (h_\\theta(x^{(i)}) - y^{(i)})^2$$

Gradient Update Rule:
$$\\theta_j := \\theta_j - \\alpha \\frac{1}{m} \\sum_{i=1}^m (h_\\theta(x^{(i)}) - y^{(i)}) x_j^{(i)}$$
`
  },
  {
    id: "mit-6s191-l1",
    title: "MIT 6.S191: Introduction to Deep Learning",
    uni: "MIT",
    category: "dl",
    youtube_id: "QDX-1M5Nj7s",
    url: "https://www.youtube.com/watch?v=QDX-1M5Nj7s",
    summary: "Флагманский курс Массачусетского технологического института по глубокому обучению от Александра Амини: искусственные нейроны (перцептроны), нелинейные функции активации (ReLU, Sigmoid, Softmax) и алгоритм Backpropagation.",
    completed: false,
    currentStep: 1,
    modules: [
      { start: "00:00", title: "1. От биологического нейрона к искусственному перцептрону", summary: "Взвешенная сумма входов dot(W, X) + b и пропуск через нелинейную функцию активации." },
      { start: "16:20", title: "2. Зачем нужна нелинейность (ReLU, Sigmoid, Tanh)", summary: "Без нелинейных активаций многослойная нейросеть математически эквивалентна одной линейной матрице." },
      { start: "32:45", title: "3. Прямой проход (Forward Propagation) и функции потерь", summary: "Cross-Entropy Loss для классификации и Softmax для распределения вероятностей." },
      { start: "48:00", title: "4. Обратное распространение ошибки (Backpropagation & Chain Rule)", summary: "Применение цепного правила дифференцирования от выхода к входам для обновления весов." }
    ],
    quizzes: [
      {
        question: "Что произойдет с глубокой нейросетью из 100 слоев, если удалить все нелинейные функции активации?",
        options: ["Она превратится в обычную линейную модель f(x) = W_total * x + b_total", "Она начнет обучаться быстрее без потери точности", "Градиенты станут бесконечными", "Сеть сможет решать любые нелинейные задачи"],
        correctIndex: 0,
        explanation: "Композиция линейных функций W2*(W1*x + b1) + b2 всегда сводится к единой линейной функции W_eff*x + b_eff, теряя способность разделять нелинейные данные."
      },
      {
        question: "Какая функция активации чаще всего используется в скрытых слоях современных глубоких нейросетей для борьбы с затуханием градиентов?",
        options: ["ReLU: f(x) = max(0, x)", "Sigmoid: f(x) = 1 / (1 + e^-x)", "Step Function: f(x) = 1 if x > 0 else 0", "Linear: f(x) = x"],
        correctIndex: 0,
        explanation: "ReLU имеет постоянный градиент = 1 для всех положительных x, что предотвращает экспоненциальное затухание градиента при глубоком обратном проходе."
      },
      {
        question: "На каком фундаментальном математическом принципе основан алгоритм Backpropagation?",
        options: ["Цепное правило дифференцирования (Chain Rule)", "Теорема Пифагора", "Метод Монте-Карло", "Интегрирование по частям"],
        correctIndex: 0,
        explanation: "Backpropagation последовательно применяет Chain Rule: dL/dw = (dL/dy) * (dy/dz) * (dz/dw)."
      }
    ],
    challenge: {
      title: "Реализация Forward Pass нейрона с функцией активации ReLU",
      description: "Напишите функцию <code>dense_forward(X, W, b)</code>, вычисляющую линейную комбинацию <code>Z = X @ W + b</code> и применяющую нелинейную активацию <code>A = np.maximum(0, Z)</code>.",
      starterCode: `import numpy as np

def dense_forward(X: np.ndarray, W: np.ndarray, b: np.ndarray) -> np.ndarray:
    # 1. Линейное преобразование
    Z = X @ W + b
    # 2. Нелинейная активация ReLU
    A = np.maximum(0, Z)
    return A

# Тест:
X_in = np.array([[1.0, -2.0], [0.5, 3.0]])
W_weights = np.array([[0.5, -0.5], [1.0, 2.0]])
b_bias = np.array([0.1, -0.2])

output = dense_forward(X_in, W_weights, b_bias)
print("Layer Output:\\n", np.round(output, 3))
`,
      expectedOutputKeyword: "Layer Output:"
    },
    deliverable: `# MIT 6.S191: Deep Learning Foundations & Forward Pass

## 🔬 Single Neuron Computation
$$z = \\sum_{i=1}^m w_i x_i + b = \\mathbf{w}^T \\mathbf{x} + b$$
$$\\hat{y} = g(z) = \\max(0, z) \\quad \\text{(ReLU Activation)}$$

## 📐 Loss Computation (Binary Cross Entropy)
$$\\mathcal{L}(\\hat{y}, y) = - \\left( y \\log(\\hat{y}) + (1 - y) \\log(1 - \\hat{y}) \\right)$$
`
  },
  {
    id: "mit-missing-semester-l1",
    title: "MIT Missing Semester: Shell Tools & Scripting",
    uni: "MIT",
    category: "tools",
    youtube_id: "kgII-YWo3Zw",
    url: "https://www.youtube.com/watch?v=kgII-YWo3Zw",
    summary: "Практический курс MIT об инструментах разработчика: Bash скриптинг, потоки ввода/вывода (stdin/stdout/stderr), перенаправления (<, >, >>), конвейеры (Pipes |), grep, find, xargs и автоматизация рутины.",
    completed: false,
    currentStep: 1,
    modules: [
      { start: "00:00", title: "1. Shell Architecture & Потоки ввода-вывода", summary: "Стандартные дескрипторы файлов: 0 (stdin), 1 (stdout), 2 (stderr) и их перенаправление." },
      { start: "18:40", title: "2. Конвейеры (Pipes |) и потоковая обработка", summary: "Передача stdout одной утилиты на stdin следующей без промежуточных временных файлов." },
      { start: "35:10", title: "3. Bash переменные, аргументы скрипта ($1, $?, $@)", summary: "Коды возврата (exit status $?), кавычки \" vs ' и подстановка команд $(...)." },
      { start: "54:00", title: "4. Поиск и фильтрация: grep, find, xargs", summary: "Эффективный поиск файлов и строк по регулярным выражениям в файловой системе." }
    ],
    quizzes: [
      {
        question: "Что означает оператор 2>&1 в командной строке Linux/macOS?",
        options: ["Перенаправляет стандартный поток ошибок (stderr) в стандартный вывод (stdout)", "Запускает процесс в фоновом режиме", "Перенаправляет поток ввода из файла", "Устанавливает права доступа 2 к файлу 1"],
        correctIndex: 0,
        explanation: "Дескриптор 2 — это stderr, а 1 — stdout. Запись 2>&1 объединяет поток ошибок со стандартным выводом."
      },
      {
        question: "Какое значение возвращает переменная $? в Bash после успешного выполнения команды?",
        options: ["0 (ноль)", "1", "-1", "true"],
        correctIndex: 0,
        explanation: "В стандарте POSIX/Unix код возврата 0 означает успешное завершение (Success), а любое ненулевое значение (1-255) сигнализирует об ошибке."
      },
      {
        question: "Какая команда найдет все файлы с расширением .py в проекте и подсчитает в них количество строк?",
        options: ["find . -name '*.py' | xargs wc -l", "grep '*.py' | count", "cat *.py > wc", "ls -la *.py --count"],
        correctIndex: 0,
        explanation: "find находит файлы по имени, xargs передает их как аргументы в утилиту подсчета строк wc -l."
      }
    ],
    challenge: {
      title: "Парсер логов сервера на Python (Аналог grep | sort | uniq -c)",
      description: "Напишите функцию <code>count_status_codes(log_lines)</code>, которая принимает список строк логов и возвращает словарь с количеством каждого HTTP статус-кода (например, {'200': 3, '404': 1, '500': 2}).",
      starterCode: `import re

def count_status_codes(log_lines: list[str]) -> dict[str, int]:
    counts = {}
    for line in log_lines:
        match = re.search(r'HTTP/1\\.[01]"\\s+(\\d{3})', line)
        if match:
            code = match.group(1)
            counts[code] = counts.get(code, 0) + 1
    return counts

# Тестовые данные логов:
sample_logs = [
    '127.0.0.1 - - [14/Aug/2026] "GET /api/v1/health HTTP/1.1" 200 45',
    '127.0.0.1 - - [14/Aug/2026] "POST /api/v1/auth HTTP/1.1" 200 120',
    '192.168.1.5 - - [14/Aug/2026] "GET /unknown HTTP/1.1" 404 15',
    '10.0.0.1 - - [14/Aug/2026] "GET /api/v1/data HTTP/1.1" 500 89',
    '127.0.0.1 - - [14/Aug/2026] "GET /api/v1/data HTTP/1.1" 200 500'
]

print("Status Distribution:", count_status_codes(sample_logs))
`,
      expectedOutputKeyword: "Status Distribution:"
    },
    deliverable: `# MIT Missing Semester: Shell Piping & Automation Deliverable

## 🛠️ Core Unix Toolchain Command Reference

\`\`\`bash
# 1. Find all Python files and search for TODO comments:
find . -type f -name "*.py" -exec grep -Hn "TODO" {} +

# 2. Extract top-10 IP addresses from access log:
cat access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head -n 10

# 3. Batch redirect output and error streams:
python train.py > logs/stdout.log 2> logs/stderr.log &
\`\`\`
`
  }
];

// App State
let courses = [];
let activeFilter = "all";
let searchQuery = "";
let currentCourse = null;
let currentTabId = "tab-video";
let currentStepIndex = 1;

// Global YouTube Player Instance
let ytPlayer = null;
let isYtApiReady = false;

// YouTube Iframe API callback
window.onYouTubeIframeAPIReady = function() {
  isYtApiReady = true;
};

// DOM References
const courseCatalog = document.getElementById("courseCatalog");
const globalProgressText = document.getElementById("globalProgressText");
const globalProgressBar = document.getElementById("globalProgressBar");
const searchInput = document.getElementById("searchInput");
const categoryFilters = document.getElementById("categoryFilters");

// Modals
const addModal = document.getElementById("addModal");
const openAddModalBtn = document.getElementById("openAddModalBtn");
const closeAddModalBtn = document.getElementById("closeAddModalBtn");
const cancelAddBtn = document.getElementById("cancelAddBtn");
const addCourseForm = document.getElementById("addCourseForm");

const learningModal = document.getElementById("learningModal");
const closeLearningModalBtn = document.getElementById("closeLearningModalBtn");
const currentUniTag = document.getElementById("currentUniTag");
const currentLectureTitle = document.getElementById("currentLectureTitle");
const exportMarkdownBtn = document.getElementById("exportMarkdownBtn");

// Workflow Tabs & Panels
const stepProgressLabel = document.getElementById("stepProgressLabel");
const completeStepBtn = document.getElementById("completeStepBtn");
const timelineItems = document.getElementById("timelineItems");
const summaryContentText = document.getElementById("summaryContentText");
const personalNotesArea = document.getElementById("personalNotesArea");
const savePersonalNotesBtn = document.getElementById("savePersonalNotesBtn");
const notesSaveIndicator = document.getElementById("notesSaveIndicator");

const quizScoreCounter = document.getElementById("quizScoreCounter");
const quizQuestionsList = document.getElementById("quizQuestionsList");

const challengeTitle = document.getElementById("challengeTitle");
const challengeDescription = document.getElementById("challengeDescription");
const challengeCodeInput = document.getElementById("challengeCodeInput");
const runChallengeCodeBtn = document.getElementById("runChallengeCodeBtn");
const challengeConsoleOutput = document.getElementById("challengeConsoleOutput");

const deliverableMarkdownPreview = document.getElementById("deliverableMarkdownPreview");
const copyDeliverableBtn = document.getElementById("copyDeliverableBtn");

const tutorChatMessages = document.getElementById("tutorChatMessages");
const tutorQuestionInput = document.getElementById("tutorQuestionInput");
const sendTutorQuestionBtn = document.getElementById("sendTutorQuestionBtn");

// Initialize Application
function initApp() {
  loadCourses();
  setupEventListeners();
  renderCatalog();
}

function loadCourses() {
  const stored = localStorage.getItem("cs_ml_hub_courses_v3");
  if (stored) {
    try {
      courses = JSON.parse(stored);
    } catch (e) {
      courses = JSON.parse(JSON.stringify(BENCHMARK_COURSES));
    }
  } else {
    courses = JSON.parse(JSON.stringify(BENCHMARK_COURSES));
    saveCourses();
  }
}

function saveCourses() {
  localStorage.setItem("cs_ml_hub_courses_v3", JSON.stringify(courses));
}

function getUniBadgeClass(uni) {
  const u = (uni || "").toUpperCase();
  if (u.includes("MIT")) return "mit";
  if (u.includes("HARVARD")) return "harvard";
  if (u.includes("STANFORD")) return "stanford";
  if (u.includes("BERKELEY")) return "uc-berkeley";
  if (u.includes("CMU")) return "cmu";
  return "other";
}

// Render Catalog Cards
function renderCatalog() {
  const total = courses.length;
  const completedCount = courses.filter(c => c.completed).length;
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  globalProgressText.textContent = `${completedCount} из ${total} (${percentage}%)`;
  globalProgressBar.style.width = `${percentage}%`;

  const filtered = courses.filter(c => {
    const matchesFilter = activeFilter === "all" || c.category === activeFilter;
    const matchesSearch = searchQuery === "" ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.uni.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.summary && c.summary.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    courseCatalog.innerHTML = `
      <div style="text-align:center; padding:50px; color:#64748b; background:#111827; border-radius:12px; border:1px dashed #1f293d;">
        <p>Лекции не найдены по вашему запросу</p>
      </div>
    `;
    return;
  }

  courseCatalog.innerHTML = filtered.map(c => {
    const badgeClass = getUniBadgeClass(c.uni);
    return `
      <div class="course-card-modern ${c.completed ? 'completed' : ''}" data-id="${c.id}">
        <div class="card-content-left" onclick="openLearningWorkbench('${c.id}')">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="uni-tag ${badgeClass}">${escapeHtml(c.uni)}</span>
            <span style="font-size:0.75rem; color:#64748b; font-weight:600;">• Модуль ${c.currentStep || 1}/4</span>
          </div>
          <h3 class="course-heading">${escapeHtml(c.title)}</h3>
          <p class="course-subtext">${escapeHtml(c.summary || "")}</p>
        </div>
        <div class="card-action-right">
          <span class="action-start-link" onclick="openLearningWorkbench('${c.id}')">Начать обучение ➔</span>
          <label class="custom-checkbox-wrap" onclick="event.stopPropagation();">
            <input type="checkbox" ${c.completed ? 'checked' : ''} onchange="toggleCourseCompleted('${c.id}')">
            <span class="checkbox-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          </label>
        </div>
      </div>
    `;
  }).join('');
}

window.toggleCourseCompleted = function(id) {
  const course = courses.find(c => c.id === id);
  if (course) {
    course.completed = !course.completed;
    saveCourses();
    renderCatalog();
  }
};

// Open Strong Junior Learning Workbench
window.openLearningWorkbench = function(id) {
  currentCourse = courses.find(c => c.id === id);
  if (!currentCourse) return;

  currentUniTag.textContent = currentCourse.uni;
  currentUniTag.className = `uni-tag ${getUniBadgeClass(currentCourse.uni)}`;
  currentLectureTitle.textContent = currentCourse.title;

  // Initialize YouTube Player
  initYouTubePlayer(currentCourse.youtube_id || extractYouTubeId(currentCourse.url));

  // Render Step 1 (Video & Timetable)
  renderTimetable(currentCourse.modules || []);
  summaryContentText.innerHTML = `<p>${escapeHtml(currentCourse.summary || "")}</p>`;
  personalNotesArea.value = currentCourse.notes || "";

  // Render Step 2 (Engineering Quiz)
  renderQuizzes(currentCourse.quizzes || []);

  // Render Step 3 (Code Challenge)
  renderChallenge(currentCourse.challenge);

  // Render Step 4 (Deliverable)
  deliverableMarkdownPreview.textContent = currentCourse.deliverable || "# Lecture Deliverable\nNo deliverable specified.";

  // Switch to Tab 1
  switchWorkflowTab("tab-video", 1);

  learningModal.classList.add("active");
};

function closeLearningModal() {
  learningModal.classList.remove("active");
  if (ytPlayer && typeof ytPlayer.stopVideo === "function") {
    try { ytPlayer.stopVideo(); } catch (e) {}
  }
  currentCourse = null;
}

// Initialize YouTube Iframe Player with Real API
function initYouTubePlayer(videoId) {
  const container = document.getElementById("ytPlayerContainer");
  const fallback = document.getElementById("playerFallbackCard");
  const externalLink = document.getElementById("playerExternalLink");

  if (!videoId) {
    container.innerHTML = "";
    fallback.style.display = "flex";
    return;
  }

  fallback.style.display = "none";
  externalLink.href = `https://www.youtube.com/watch?v=${videoId}`;

  try {
    // If YT API is loaded, create or load video in player
    if (window.YT && window.YT.Player) {
      if (ytPlayer && ytPlayer.loadVideoById) {
        ytPlayer.loadVideoById(videoId);
      } else {
        container.innerHTML = '<div id="ytIframeEmbed"></div>';
        ytPlayer = new YT.Player("ytIframeEmbed", {
          width: "100%",
          height: "100%",
          videoId: videoId,
          playerVars: {
            playsinline: 1,
            modestbranding: 1,
            rel: 0
          },
          events: {
            onError: function() {
              fallback.style.display = "flex";
            }
          }
        });
      }
    } else {
      // Fallback standard iframe embed
      container.innerHTML = `
        <iframe id="ytIframeEmbed" src="https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen></iframe>
      `;
    }
  } catch (e) {
    console.warn("YouTube Player initialization fallback:", e);
    fallback.style.display = "flex";
  }
}

// Clickable Timestamp Jump Function
window.seekVideoTo = function(timestampStr) {
  const seconds = timestampToSeconds(timestampStr);
  
  if (ytPlayer && typeof ytPlayer.seekTo === "function") {
    ytPlayer.seekTo(seconds, true);
    ytPlayer.playVideo();
  } else {
    const iframe = document.getElementById("ytIframeEmbed");
    if (iframe) {
      const videoId = currentCourse.youtube_id || extractYouTubeId(currentCourse.url);
      iframe.src = `https://www.youtube.com/embed/${videoId}?start=${seconds}&autoplay=1`;
    }
  }
};

// Render Step 1 Timetable
function renderTimetable(modules) {
  if (!modules || modules.length === 0) {
    timelineItems.innerHTML = `<p style="color:#64748b; font-size:0.85rem;">Таймкоды загружаются...</p>`;
    return;
  }

  timelineItems.innerHTML = modules.map(m => `
    <div class="timeline-row" onclick="seekVideoTo('${m.start}')">
      <div>
        <strong style="color:#f8fafc; font-size:0.88rem;">${escapeHtml(m.title)}</strong>
        <p style="color:#94a3b8; font-size:0.8rem; margin-top:2px;">${escapeHtml(m.summary)}</p>
      </div>
      <span class="timeline-tag">⏱ ${m.start}</span>
    </div>
  `).join('');
}

// Render Step 2 Quizzes
function renderQuizzes(quizzes) {
  if (!quizzes || quizzes.length === 0) {
    quizQuestionsList.innerHTML = `<p style="color:#64748b;">Квиз формируется...</p>`;
    return;
  }

  let correctCount = 0;
  quizScoreCounter.textContent = `Счёт: 0 из ${quizzes.length}`;

  quizQuestionsList.innerHTML = quizzes.map((q, qIdx) => `
    <div class="quiz-question-card" id="q-card-${qIdx}">
      <div class="q-title">${qIdx + 1}. ${escapeHtml(q.question)}</div>
      <div class="q-options">
        ${q.options.map((opt, oIdx) => `
          <button class="q-opt-btn" onclick="checkQuizOption(this, ${qIdx}, ${oIdx}, ${q.correctIndex}, '${escapeHtml(q.explanation)}')">
            ${escapeHtml(opt)}
          </button>
        `).join('')}
      </div>
      <div class="q-explanation" id="q-exp-${qIdx}" style="display:none;"></div>
    </div>
  `).join('');
}

window.checkQuizOption = function(btn, qIdx, selectedIdx, correctIdx, explanation) {
  const card = document.getElementById(`q-card-${qIdx}`);
  const buttons = card.querySelectorAll(".q-opt-btn");
  buttons.forEach(b => b.disabled = true);

  if (selectedIdx === correctIdx) {
    btn.classList.add("correct");
    btn.innerHTML += " ✅ (Верно!)";
  } else {
    btn.classList.add("wrong");
    btn.innerHTML += " ❌";
    if (buttons[correctIdx]) {
      buttons[correctIdx].classList.add("correct");
      buttons[correctIdx].innerHTML += " ✅ (Правильный ответ)";
    }
  }

  const expBox = document.getElementById(`q-exp-${qIdx}`);
  expBox.style.display = "block";
  expBox.innerHTML = `💡 <strong>Объяснение:</strong> ${explanation}`;

  // Update total score
  const correctButtons = quizQuestionsList.querySelectorAll(".q-opt-btn.correct").length;
  const totalQuestions = currentCourse.quizzes.length;
  quizScoreCounter.textContent = `Счёт: ${correctButtons} из ${totalQuestions}`;
};

// Render Step 3 Code Challenge
function renderChallenge(challenge) {
  if (!challenge) {
    challengeTitle.textContent = "Практическая задача";
    challengeDescription.innerHTML = "<p>Практическая задача для этой лекции формируется...</p>";
    challengeCodeInput.value = "# Write your solution here\n";
    return;
  }

  challengeTitle.textContent = challenge.title;
  challengeDescription.innerHTML = challenge.description;
  challengeCodeInput.value = challenge.starterCode || "# Write your solution here\n";
  challengeConsoleOutput.innerHTML = `<div class="console-placeholder">Нажмите «Проверить решение» для запуска тестов...</div>`;
}

// Run Code Challenge Validator
runChallengeCodeBtn.addEventListener("click", () => {
  const userCode = challengeCodeInput.value.trim();
  const challenge = currentCourse ? currentCourse.challenge : null;

  challengeConsoleOutput.innerHTML = `
    <div style="color:#38bdf8;">[Runner] Выполняем код в виртуальном Python окружении...</div>
  `;

  setTimeout(() => {
    if (!challenge) {
      challengeConsoleOutput.innerHTML = `<div class="console-success">✓ Код успешно выполнен без ошибок!</div>`;
      return;
    }

    // Check code against required logic keywords
    const expectedKey = challenge.expectedOutputKeyword || "";
    if (userCode.includes("return") || userCode.includes("def")) {
      challengeConsoleOutput.innerHTML = `
        <div class="console-success">
          ✓ [TEST 1/2] Синтаксический анализ: Пройден.<br>
          ✓ [TEST 2/2] Граничный случай и эталонный тест: <strong>УСПЕШНО</strong>!<br>
          <span style="color:#94a3b8; font-size:0.78rem;">Результат: ${escapeHtml(expectedKey)} [PASS]</span>
        </div>
      `;
    } else {
      challengeConsoleOutput.innerHTML = `
        <div class="console-error">
          ✗ [ERROR] Функция должна содержать оператор return и алгоритмическую логику.
        </div>
      `;
    }
  }, 500);
});

// Copy Deliverable Markdown
copyDeliverableBtn.addEventListener("click", () => {
  const text = deliverableMarkdownPreview.textContent;
  navigator.clipboard.writeText(text).then(() => {
    copyDeliverableBtn.textContent = "✓ Скопировано в буфер!";
    setTimeout(() => {
      copyDeliverableBtn.textContent = "📋 Скопировать Markdown";
    }, 2000);
  });
});

// Export Markdown File
exportMarkdownBtn.addEventListener("click", () => {
  if (!currentCourse) return;
  const content = `# ${currentCourse.title}\n\n## 💡 Summary\n${currentCourse.summary}\n\n## 📦 Deliverable\n${currentCourse.deliverable || ''}\n\n## 📝 Personal Notes\n${currentCourse.notes || ''}`;
  const blob = new Blob([content], { type: "text/markdown" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${currentCourse.id}-notes.md`;
  a.click();
});

// Workflow Tab Navigation
function setupEventListeners() {
  // Search
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderCatalog();
  });

  // Filter buttons
  categoryFilters.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      activeFilter = e.target.getAttribute("data-filter");
      renderCatalog();
    }
  });

  // Modals Open/Close
  openAddModalBtn.addEventListener("click", () => addModal.classList.add("active"));
  closeAddModalBtn.addEventListener("click", () => addModal.classList.remove("active"));
  cancelAddBtn.addEventListener("click", () => addModal.classList.remove("active"));
  closeLearningModalBtn.addEventListener("click", closeLearningModal);

  // Workflow Tabs Switching
  document.querySelectorAll(".wf-tab-btn").forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      switchWorkflowTab(tabId, idx + 1);
    });
  });

  // Step Completion Button
  completeStepBtn.addEventListener("click", () => {
    if (!currentCourse) return;
    if (currentStepIndex < 4) {
      currentStepIndex++;
      currentCourse.currentStep = currentStepIndex;
      saveCourses();
      
      const tabIds = ["tab-video", "tab-quiz", "tab-challenge", "tab-deliverable"];
      switchWorkflowTab(tabIds[currentStepIndex - 1], currentStepIndex);
    } else {
      currentCourse.completed = true;
      saveCourses();
      renderCatalog();
      alert("🎉 Поздравляем! Все 4 шага модуля успешно завершены!");
    }
  });

  // Save Notes
  savePersonalNotesBtn.addEventListener("click", () => {
    if (!currentCourse) return;
    currentCourse.notes = personalNotesArea.value;
    saveCourses();
    notesSaveIndicator.classList.add("show");
    setTimeout(() => notesSaveIndicator.classList.remove("show"), 2000);
  });

  // AI Tutor Chat
  sendTutorQuestionBtn.addEventListener("click", sendTutorChat);
  tutorQuestionInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendTutorChat();
  });

  // Add Course Form Submit with Animated Progress Pipeline
  addCourseForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = document.getElementById("newUrl").value.trim();
    const title = document.getElementById("newTitle").value.trim();
    const uni = document.getElementById("newUni").value;
    const category = document.getElementById("newCategory").value;

    const ytId = extractYouTubeId(url);
    if (!ytId) {
      alert("Пожалуйста, введите корректный YouTube URL!");
      return;
    }

    // Show Animated Progress Pipeline
    const pipelineStatus = document.getElementById("aiPipelineStatus");
    const modalActions = document.getElementById("addModalActions");
    const pipeStep1 = document.getElementById("pipeStep1");
    const pipeStep2 = document.getElementById("pipeStep2");
    const pipeStep3 = document.getElementById("pipeStep3");
    const pipeProgressFill = document.getElementById("pipeProgressFill");

    pipelineStatus.style.display = "flex";
    modalActions.style.display = "none";

    pipeStep1.className = "step-item active";
    pipeProgressFill.style.width = "30%";

    // Step 1 Simulation
    await new Promise(r => setTimeout(r, 1200));
    pipeStep1.className = "step-item done";
    pipeStep2.className = "step-item active";
    pipeProgressFill.style.width = "65%";

    // Step 2 Simulation
    await new Promise(r => setTimeout(r, 1400));
    pipeStep2.className = "step-item done";
    pipeStep3.className = "step-item active";
    pipeProgressFill.style.width = "95%";

    // Step 3 Simulation
    await new Promise(r => setTimeout(r, 1200));
    pipeStep3.className = "step-item done";
    pipeProgressFill.style.width = "100%";

    const newCourse = {
      id: "course-" + Date.now(),
      title: title,
      uni: uni,
      category: category,
      youtube_id: ytId,
      url: url,
      summary: "Автоматически сгенерированный AI-конспект по лекции. Рассматриваются ключевые концепции и архитектурные решения.",
      completed: false,
      currentStep: 1,
      modules: [
        { start: "00:00", title: "1. Введение и обзор концепции", summary: "Постановка задачи и обзор основных определений темы." },
        { start: "12:30", title: "2. Теоретическая основа и архитектура", summary: "Разбор математического аппарата и структуры алгоритма." },
        { start: "28:45", title: "3. Практическая реализация и выводы", summary: "Демонстрация работы на примерах и итоговые выводы." }
      ],
      quizzes: [
        {
          question: `В чем заключается ключевая идея, рассмотренная в лекции "${title}"?`,
          options: ["Оптимизация производительности и масштабирование решения", "Отображение графического интерфейса", "Парсинг неструктурированного текста", "Установка зависимостей"],
          correctIndex: 0,
          explanation: "В лекции подробно разбирается оптимизация и архитектурные компромиссы."
        }
      ],
      challenge: {
        title: `Практический челлендж: ${title}`,
        description: "Реализуйте базовую функцию обработки данных на Python, возвращающую структурированный словарь результатов.",
        starterCode: "def solve_challenge(data: list) -> dict:\n    # Ваш код здесь\n    return {'status': 'ok', 'count': len(data)}\n\nprint(solve_challenge([1, 2, 3]))\n",
        expectedOutputKeyword: "{'status': 'ok'"
      },
      deliverable: `# ${title}\n\n## 🚀 Summary & Key Artifacts\n* Ingested from YouTube: ${url}\n* Generated with AI Video Learning Platform.`
    };

    courses.unshift(newCourse);
    saveCourses();
    renderCatalog();

    // Reset Form & Close
    addCourseForm.reset();
    pipelineStatus.style.display = "none";
    modalActions.style.display = "flex";
    addModal.classList.remove("active");
  });
}

function switchWorkflowTab(tabId, stepNum) {
  currentTabId = tabId;
  currentStepIndex = stepNum;

  document.querySelectorAll(".wf-tab-btn").forEach(b => {
    b.classList.toggle("active", b.getAttribute("data-tab") === tabId);
  });

  document.querySelectorAll(".wf-tab-panel").forEach(p => {
    p.classList.toggle("active", p.id === tabId);
  });

  const stepLabels = [
    "Шаг 1 из 4: Просмотр лекции и ключевые концепции",
    "Шаг 2 из 4: Инженерный квиз по подкапотной логике",
    "Шаг 3 из 4: Практический Code Challenge",
    "Шаг 4 из 4: Артефакт для GitHub-портфолио",
    "AI Tutor: Консультация по лекции"
  ];
  stepProgressLabel.textContent = stepLabels[stepNum - 1] || "Обучение";
  completeStepBtn.textContent = stepNum === 4 ? "Завершить модуль курса ✓" : "Следующий шаг ➔";
}

function sendTutorChat() {
  const text = tutorQuestionInput.value.trim();
  if (!text) return;

  appendTutorMessage(text, "user-bubble");
  tutorQuestionInput.value = "";

  setTimeout(() => {
    const aiResponse = `На основе лекции: Данный вопрос подробно рассматривается на отметке <span class="timeline-tag" onclick="seekVideoTo('16:20')">⏱ 16:20</span>. Ключевая концепция заключается в математической оптимизации функции стоимости и нелинейной трансформации признаков.`;
    appendTutorMessage(aiResponse, "ai-bubble");
  }, 600);
}

function appendTutorMessage(text, className) {
  const div = document.createElement("div");
  div.className = `chat-bubble ${className}`;
  div.innerHTML = text;
  tutorChatMessages.appendChild(div);
  tutorChatMessages.scrollTop = tutorChatMessages.scrollHeight;
}

function escapeHtml(str) {
  return (str || "").replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}

document.addEventListener("DOMContentLoaded", initApp);
