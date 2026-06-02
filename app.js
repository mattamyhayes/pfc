const languages = ["English", "Spanish", "French", "Portuguese", "Korean", "Tagalog"];

const translationPhrasebook = {
  Spanish: {
    English: {
      sentences: {
        "mi respuesta manuscrita explica cómo dios me ha dado esperanza mientras estudio la biblia.":
          "My handwritten response explains how God has given me hope while I study the Bible.",
        "escribí sobre juan 3:16 y cómo entiendo el sacrificio de jesús.":
          "I wrote about John 3:16 and how I understand Jesus' sacrifice.",
        "compartí una oración personal y los pasos que estoy tomando para seguir a cristo.":
          "I shared a personal prayer and the steps I am taking to follow Christ."
      },
      words: {
        mi: "my",
        respuesta: "response",
        manuscrita: "handwritten",
        explica: "explains",
        cómo: "how",
        dios: "God",
        me: "me",
        ha: "has",
        dado: "given",
        esperanza: "hope",
        mientras: "while",
        estudio: "study",
        la: "the",
        biblia: "Bible",
        escribí: "I wrote",
        sobre: "about",
        y: "and",
        entiendo: "understand",
        el: "the",
        sacrificio: "sacrifice",
        de: "of",
        jesús: "Jesus",
        compartí: "I shared",
        una: "a",
        oración: "prayer",
        personal: "personal",
        los: "the",
        pasos: "steps",
        estoy: "am",
        tomando: "taking",
        para: "to",
        seguir: "follow",
        a: "to",
        cristo: "Christ"
      }
    }
  },
  English: {
    Spanish: {
      sentences: {
        "you clearly described the main point and stayed grounded in scripture.":
          "Describiste claramente el punto principal y te mantuviste firme en las Escrituras.",
        "excellent reflection on salvation and how it applies in daily life.":
          "Excelente reflexión sobre la salvación y cómo se aplica en la vida diaria.",
        "your prayer response was thoughtful and complete.":
          "Tu respuesta de oración fue reflexiva y completa.",
        "thank you for the honesty in your responses and the scripture references you included.":
          "Gracias por la honestidad en tus respuestas y las referencias bíblicas que incluiste."
      },
      words: {
        thank: "gracias",
        you: "tú",
        for: "por",
        the: "el",
        honesty: "honestidad",
        in: "en",
        your: "tu",
        responses: "respuestas",
        and: "y",
        scripture: "escritura",
        references: "referencias",
        included: "incluiste",
        excellent: "excelente",
        reflection: "reflexión",
        on: "sobre",
        salvation: "salvación",
        how: "cómo",
        it: "esto",
        applies: "se aplica",
        daily: "diaria",
        life: "vida",
        prayer: "oración",
        was: "fue",
        thoughtful: "reflexiva",
        complete: "completa"
      }
    }
  }
};

// Supports basic Latin plus Latin-1/Extended-A characters used in demo phrasebook entries.
const translationTokenPattern = /[A-Za-z\u00C0-\u017F']+/g;
const translationNormalizePattern = /[^a-z0-9\u00C0-\u017F']+/g;
const minimumNameFragmentLength = 3;
// Matches references like "John 3:16", "1 John 2:1-2", and "Juan 3:16".
const bibleReferencePattern = /\b(?:[1-3]\s+)?[A-Za-z\u00C0-\u017F.]+(?:\s+[A-Za-z\u00C0-\u017F.]+)*\s+\d{1,3}:\d{1,3}(?:-\d{1,3})?\b/g;
const bibleReferenceParsePattern = /^(.+?)\s+(\d{1,3}:\d{1,3}(?:-\d{1,3})?)$/;
const bibleApiBaseUrl = "https://bible-api.com";
const bibleApiTimeoutMs = 8000;
const bibleCanonicalBooks = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
  "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah",
  "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah",
  "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah",
  "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke",
  "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians",
  "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon",
  "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
];
const bibleBookAliases = {
  genesis: "Genesis",
  josue: "Joshua",
  jueces: "Judges",
  rut: "Ruth",
  "1 samuel": "1 Samuel",
  "2 samuel": "2 Samuel",
  "1 reyes": "1 Kings",
  "2 reyes": "2 Kings",
  "1 cronicas": "1 Chronicles",
  "2 cronicas": "2 Chronicles",
  esdras: "Ezra",
  nehemias: "Nehemiah",
  ester: "Esther",
  job: "Job",
  exodo: "Exodus",
  exodus: "Exodus",
  levitico: "Leviticus",
  leviticus: "Leviticus",
  numeros: "Numbers",
  numbers: "Numbers",
  deuteronomio: "Deuteronomy",
  deuteronomy: "Deuteronomy",
  salmo: "Psalms",
  salmos: "Psalms",
  psalm: "Psalms",
  psalms: "Psalms",
  proverbios: "Proverbs",
  proverbs: "Proverbs",
  eclesiastes: "Ecclesiastes",
  "cantares": "Song of Solomon",
  "cantar de los cantares": "Song of Solomon",
  isaias: "Isaiah",
  isaiah: "Isaiah",
  jeremias: "Jeremiah",
  lamentaciones: "Lamentations",
  ezequiel: "Ezekiel",
  daniel: "Daniel",
  oseas: "Hosea",
  joel: "Joel",
  amos: "Amos",
  abdias: "Obadiah",
  jonas: "Jonah",
  miqueas: "Micah",
  nahum: "Nahum",
  habacuc: "Habakkuk",
  sofonias: "Zephaniah",
  hageo: "Haggai",
  zacarias: "Zechariah",
  malaquias: "Malachi",
  mateo: "Matthew",
  matthew: "Matthew",
  marcos: "Mark",
  mark: "Mark",
  lucas: "Luke",
  luke: "Luke",
  juan: "John",
  john: "John",
  hechos: "Acts",
  acts: "Acts",
  romanos: "Romans",
  romans: "Romans",
  "1 corintios": "1 Corinthians",
  "2 corintios": "2 Corinthians",
  galatas: "Galatians",
  efesios: "Ephesians",
  filipenses: "Philippians",
  colosenses: "Colossians",
  "1 tesalonicenses": "1 Thessalonians",
  "2 tesalonicenses": "2 Thessalonians",
  "1 timoteo": "1 Timothy",
  "2 timoteo": "2 Timothy",
  tito: "Titus",
  filemon: "Philemon",
  hebreos: "Hebrews",
  santiago: "James",
  "1 pedro": "1 Peter",
  "2 pedro": "2 Peter",
  "1 juan": "1 John",
  "1 john": "1 John",
  "2 juan": "2 John",
  "2 john": "2 John",
  "3 juan": "3 John",
  "3 john": "3 John",
  judas: "Jude",
  apocalipsis: "Revelation"
};
const bibleCanonicalBookLookup = new Map(
  bibleCanonicalBooks.map((book) => [normalizeBibleBookLookupValue(book), book])
);
const bibleLookupCache = new Map();
const bibleLookupInFlight = new Map();

const state = {
  activeRole: "coach",
  preferredLanguage: "English",
  activeCoachId: "coach-1",
  activeVolunteerId: "volunteer-1",
  selectedSubmissionId: null,
  translationToggled: false,
  institutions: [
    "Monroe Correctional Complex",
    "Washington Corrections Center",
    "Coyote Ridge Corrections Center"
  ],
  users: {
    coaches: [
      { id: "coach-1", name: "Rachel Carter", email: "rachel@pfc-demo.org", password: "CoachPass1!" },
      { id: "coach-2", name: "Daniel James", email: "daniel@pfc-demo.org", password: "CoachPass1!" }
    ],
    volunteers: [
      { id: "volunteer-1", name: "Maria Lopez", email: "maria@pfc-demo.org", password: "Volunteer1!" },
      { id: "volunteer-2", name: "James Reed", email: "james@pfc-demo.org", password: "Volunteer1!" }
    ]
  },
  students: [
    {
      id: "student-1",
      identifier: "PFC-1001",
      firstName: "Michael",
      lastName: "Torres",
      institution: "Monroe Correctional Complex",
      coachId: "coach-1",
      defaultVolunteerId: "volunteer-1"
    },
    {
      id: "student-2",
      identifier: "PFC-1002",
      firstName: "Andre",
      lastName: "Williams",
      institution: "Washington Corrections Center",
      coachId: "coach-1",
      defaultVolunteerId: "volunteer-2"
    },
    {
      id: "student-3",
      identifier: "PFC-1003",
      firstName: "Carlos",
      lastName: "Mendez",
      institution: "Coyote Ridge Corrections Center",
      coachId: "coach-2",
      defaultVolunteerId: "volunteer-1"
    },
    {
      id: "student-4",
      identifier: "PFC-1004",
      firstName: "Ethan",
      lastName: "Brooks",
      institution: "Monroe Correctional Complex",
      coachId: "coach-1",
      defaultVolunteerId: "volunteer-2"
    },
    {
      id: "student-5",
      identifier: "PFC-1005",
      firstName: "Isaiah",
      lastName: "Coleman",
      institution: "Washington Corrections Center",
      coachId: "coach-2",
      defaultVolunteerId: "volunteer-2"
    },
    {
      id: "student-6",
      identifier: "PFC-1006",
      firstName: "Jerome",
      lastName: "Parker",
      institution: "Coyote Ridge Corrections Center",
      coachId: "coach-1",
      defaultVolunteerId: "volunteer-1"
    },
    {
      id: "student-7",
      identifier: "PFC-1007",
      firstName: "Leon",
      lastName: "Foster",
      institution: "Monroe Correctional Complex",
      coachId: "coach-2",
      defaultVolunteerId: "volunteer-1"
    },
    {
      id: "student-8",
      identifier: "PFC-1008",
      firstName: "Malik",
      lastName: "Sutton",
      institution: "Washington Corrections Center",
      coachId: "coach-1",
      defaultVolunteerId: "volunteer-2"
    },
    {
      id: "student-9",
      identifier: "PFC-1009",
      firstName: "Noah",
      lastName: "Barnes",
      institution: "Coyote Ridge Corrections Center",
      coachId: "coach-2",
      defaultVolunteerId: "volunteer-1"
    },
    {
      id: "student-10",
      identifier: "PFC-1010",
      firstName: "Ramon",
      lastName: "Diaz",
      institution: "Monroe Correctional Complex",
      coachId: "coach-1",
      defaultVolunteerId: "volunteer-2"
    },
    {
      id: "student-11",
      identifier: "PFC-1011",
      firstName: "Samuel",
      lastName: "Griffin",
      institution: "Washington Corrections Center",
      coachId: "coach-2",
      defaultVolunteerId: "volunteer-2"
    },
    {
      id: "student-12",
      identifier: "PFC-1012",
      firstName: "Victor",
      lastName: "Hayes",
      institution: "Coyote Ridge Corrections Center",
      coachId: "coach-1",
      defaultVolunteerId: "volunteer-1"
    }
  ],
  classes: [
    {
      id: "class-1",
      name: "Basic Beliefs",
      assignments: [
        { id: "assignment-1", name: "1 Nicene Creed Part 1", questionCount: 8 },
        { id: "assignment-2", name: "2 Nicene Creed Part 2", questionCount: 8 },
        { id: "assignment-3", name: "3 Nicene Creed Part 3", questionCount: 8 },
        { id: "assignment-4", name: "4 Nicene Creed Part 4", questionCount: 8 },
        { id: "assignment-5", name: "5 Who is God", questionCount: 8 },
        { id: "assignment-6", name: "6 Who is Jesus", questionCount: 8 },
        { id: "assignment-7", name: "7 Who is the Holy Spirit", questionCount: 8 },
        { id: "assignment-8", name: "8 What is the Bible", questionCount: 8 },
        { id: "assignment-9", name: "9 What is Sin", questionCount: 8 },
        { id: "assignment-10", name: "10 What is Salvation", questionCount: 8 },
        { id: "assignment-11", name: "11 Who is Satan", questionCount: 8 },
        { id: "assignment-12", name: "12 What is the church", questionCount: 8 },
        { id: "assignment-13", name: "13 What is Heaven", questionCount: 8 },
        { id: "assignment-14", name: "14 What is Hell", questionCount: 8 },
        { id: "assignment-15", name: "15 How do I get to Heaven", questionCount: 8 },
        { id: "assignment-16", name: "16 What is Prophecy", questionCount: 8 }
      ]
    },
    {
      id: "class-2",
      name: "Parables of Jesus",
      assignments: [
        { id: "assignment-17", name: "17 The Prodigal Son Part 1", questionCount: 8 },
        { id: "assignment-18", name: "18 The prodigal Son Part 2", questionCount: 8 },
        { id: "assignment-19", name: "19 The Prodigal Son Part 3", questionCount: 8 },
        { id: "assignment-20", name: "20 The Wheat and the Weeds", questionCount: 8 },
        { id: "assignment-21", name: "21 Spiritual Farmers", questionCount: 8 },
        { id: "assignment-22", name: "22 The Good Samaritan", questionCount: 8 },
        { id: "assignment-23", name: "23 The Growing Seed", questionCount: 8 },
        { id: "assignment-24", name: "24 The Lost", questionCount: 8 },
        { id: "assignment-25", name: "25 The Unmerciful Servant", questionCount: 8 },
        { id: "assignment-26", name: "26 The Workers", questionCount: 8 },
        { id: "assignment-27", name: "27 The Wicked Tenants", questionCount: 8 },
        { id: "assignment-28", name: "28 The Wedding Banquet", questionCount: 8 },
        { id: "assignment-29", name: "29 The Ten Virgins", questionCount: 8 },
        { id: "assignment-30", name: "30 The Talents", questionCount: 8 },
        { id: "assignment-31", name: "31 The Wise Builder", questionCount: 8 },
        { id: "assignment-32", name: "32 The Lamp", questionCount: 8 },
        { id: "assignment-33", name: "33 The Judge and the Widow", questionCount: 8 },
        { id: "assignment-34", name: "34 The Cost of Being a Disciple", questionCount: 8 },
        { id: "assignment-35", name: "35 The Friend at Midnight", questionCount: 8 }
      ]
    },
    {
      id: "class-3",
      name: "Men of the Bible",
      assignments: [
        { id: "assignment-43", name: "43 Joseph is sold into Slavery", questionCount: 8 },
        { id: "assignment-44", name: "44 Daniel and the Lion's Den", questionCount: 8 },
        { id: "assignment-45", name: "45 David and Bathsheba", questionCount: 8 },
        { id: "assignment-46", name: "46 TBD", questionCount: 8 },
        { id: "assignment-47", name: "47 Jonah and the Whale", questionCount: 8 },
        { id: "assignment-48", name: "48 Shadrach, Meshack, and Abednego and the Fiery Furnance", questionCount: 8 },
        { id: "assignment-49", name: "49 Gideon's Army", questionCount: 8 },
        { id: "assignment-50", name: "50 Manasseh Part 1", questionCount: 8 },
        { id: "assignment-51", name: "51 Manasseh Part 2", questionCount: 8 },
        { id: "assignment-52", name: "52 Korah's Rebellion", questionCount: 8 },
        { id: "assignment-53", name: "53 Eutychus", questionCount: 8 },
        { id: "assignment-54", name: "54 Nehemiah", questionCount: 8 },
        { id: "assignment-55", name: "55 David and Goliath", questionCount: 8 },
        { id: "assignment-56", name: "56 Nicodemus", questionCount: 8 },
        { id: "assignment-57", name: "57 Caleb Part 1", questionCount: 8 },
        { id: "assignment-58", name: "58 Caleb Part 2", questionCount: 8 },
        { id: "assignment-59", name: "59 Eleazar", questionCount: 8 }
      ]
    },
    {
      id: "class-4",
      name: "Prayer",
      assignments: [
        { id: "assignment-37", name: "37 What is Prayer", questionCount: 8 },
        { id: "assignment-38", name: "38 Prayer in the life of Jesus", questionCount: 8 },
        { id: "assignment-39", name: "39 TBD", questionCount: 8 },
        { id: "assignment-40", name: "40 Answer to Prayer", questionCount: 8 },
        { id: "assignment-41", name: "41 Reasons for Answered Prayer", questionCount: 8 },
        { id: "assignment-42", name: "42 Our own Personal Prayer Life", questionCount: 8 },
        { id: "assignment-60", name: "60 Foundations of Prayer", questionCount: 8 },
        { id: "assignment-61", name: "61 Praying with Scripture", questionCount: 8 },
        { id: "assignment-62", name: "62 Confession and Repentance", questionCount: 8 },
        { id: "assignment-63", name: "63 Intercessory Prayer", questionCount: 8 },
        { id: "assignment-64", name: "64 Praying in Difficult Seasons", questionCount: 8 },
        { id: "assignment-65", name: "65 Prayers of Thanksgiving", questionCount: 8 },
        { id: "assignment-66", name: "66 Trusting God in Silence", questionCount: 8 },
        { id: "assignment-67", name: "67 Prayer and Obedience", questionCount: 8 },
        { id: "assignment-68", name: "68 Fasting and Prayer", questionCount: 8 },
        { id: "assignment-69", name: "69 Growing a Daily Prayer Rhythm", questionCount: 8 },
        { id: "assignment-70", name: "70 Psalms as Prayer", questionCount: 8 },
        { id: "assignment-71", name: "71 Listening in Prayer", questionCount: 8 },
        { id: "assignment-72", name: "72 Prayer in Community", questionCount: 8 },
        { id: "assignment-73", name: "73 Healing Prayer", questionCount: 8 },
        { id: "assignment-74", name: "74 Forgiveness in Prayer", questionCount: 8 },
        { id: "assignment-75", name: "75 Praying for Enemies", questionCount: 8 },
        { id: "assignment-76", name: "76 Prayer and Perseverance", questionCount: 8 },
        { id: "assignment-77", name: "77 Seeking Wisdom Through Prayer", questionCount: 8 },
        { id: "assignment-78", name: "78 Prayer and Spiritual Growth", questionCount: 8 },
        { id: "assignment-79", name: "79 Testimony and Answered Prayer", questionCount: 8 }
      ]
    }
  ],
  submissions: [
    {
      id: "submission-1",
      studentId: "student-1",
      classId: "class-1",
      assignmentId: "assignment-1",
      coachId: "coach-1",
      volunteerId: "volunteer-1",
      language: "Spanish",
      fileName: "lesson-1-michael.pdf",
      uploadedAt: "2026-05-20T10:00:00.000Z",
      status: "pending",
      feedbackLanguage: "English",
      generalComments: "",
      questionFeedback: ["", "", ""],
      answers: [
        "Mi respuesta manuscrita explica cómo Dios me ha dado esperanza mientras estudio la Biblia.",
        "Escribí sobre Juan 3:16 y cómo entiendo el sacrificio de Jesús.",
        "Compartí una oración personal y los pasos que estoy tomando para seguir a Cristo."
      ]
    },
    {
      id: "submission-2",
      studentId: "student-2",
      classId: "class-1",
      assignmentId: "assignment-1",
      coachId: "coach-1",
      volunteerId: "volunteer-2",
      language: "English",
      fileName: "andre-lesson-1.jpg",
      uploadedAt: "2026-05-18T10:00:00.000Z",
      status: "complete",
      completedAt: "2026-05-21T10:00:00.000Z",
      feedbackLanguage: "English",
      generalComments: "Thank you for the honesty in your responses and the Scripture references you included.",
      questionFeedback: [
        "You clearly described the main point and stayed grounded in Scripture.",
        "Excellent reflection on salvation and how it applies in daily life.",
        "Your prayer response was thoughtful and complete."
      ],
      answers: [
        "I wrote about how Bible study is helping me rebuild my life around faith.",
        "I reflected on Jesus offering salvation and the impact that has on me.",
        "I shared my personal prayer and goals for the week."
      ]
    }
  ],
  emailLog: [
    {
      id: "email-1",
      timestamp: "2026-05-20T10:05:00.000Z",
      recipient: "maria@pfc-demo.org",
      subject: "New paper assigned: Michael Torres - Lesson 1"
    }
  ]
};

let volunteerSortColumn = "days";
let volunteerSortAsc = false;
let sponsorActiveSection = "directory";
let coachActiveSection = "upload";
let studentSortColumn = "name";
let studentSortAsc = true;
let progressDetailSelection = null;

const elements = {
  preferredLanguage: document.querySelector("#preferred-language"),
  roleLinks: document.querySelectorAll("[data-role-link]"),
  rolePanels: document.querySelectorAll("[data-role-panel]"),
  summaryStats: document.querySelector("#summary-stats"),
  emailLog: document.querySelector("#email-log"),
  uploadStudent: document.querySelector("#upload-student"),
  uploadClass: document.querySelector("#upload-class"),
  uploadAssignment: document.querySelector("#upload-assignment"),
  uploadLanguage: document.querySelector("#upload-language"),
  uploadVolunteer: document.querySelector("#upload-volunteer"),
  activeCoach: document.querySelector("#active-coach"),
  activeVolunteer: document.querySelector("#active-volunteer"),
  uploadForm: document.querySelector("#upload-form"),
  uploadFile: document.querySelector("#upload-file"),
  coachViewPending: document.querySelector("#coach-view-pending"),
  coachViewWaiting: document.querySelector("#coach-view-waiting"),
  coachPendingView: document.querySelector("#coach-pending-view"),
  coachWaitingView: document.querySelector("#coach-waiting-view"),
  coachReport: document.querySelector("#coach-report"),
  coachWaitingReport: document.querySelector("#coach-waiting-report"),
  coachNavBtns: document.querySelectorAll("[data-coach-section]"),
  coachSections: document.querySelectorAll(".coach-section"),
  volunteerQueue: document.querySelector("#volunteer-queue"),
  volunteerQueueTable: document.querySelector("#volunteer-queue-table"),
  reviewPanel: document.querySelector("#review-panel"),
  reviewEmpty: document.querySelector("#review-empty"),
  reviewMeta: document.querySelector("#review-meta"),
  reviewTitle: document.querySelector("#review-title"),
  reviewFile: document.querySelector("#review-file"),
  reviewLanguage: document.querySelector("#review-language"),
  reviewForm: document.querySelector("#review-form"),
  translatePaper: document.querySelector("#translate-paper"),
  generatePdf: document.querySelector("#generate-pdf"),
  institutionForm: document.querySelector("#institution-form"),
  institutionName: document.querySelector("#institution-name"),
  userForm: document.querySelector("#user-form"),
  userFormSubmit: document.querySelector("#user-form-submit"),
  userEditId: document.querySelector("#user-edit-id"),
  userTable: document.querySelector("#user-table"),
  userRole: document.querySelector("#user-role"),
  userName: document.querySelector("#user-name"),
  userEmail: document.querySelector("#user-email"),
  userPassword: document.querySelector("#user-password"),
  studentForm: document.querySelector("#student-form"),
  studentEditId: document.querySelector("#student-edit-id"),
  studentFirstName: document.querySelector("#student-first-name"),
  studentLastName: document.querySelector("#student-last-name"),
  studentInstitution: document.querySelector("#student-institution"),
  studentIdentifier: document.querySelector("#student-identifier"),
  generateStudentId: document.querySelector("#generate-student-id"),
  studentCoach: document.querySelector("#student-coach"),
  studentTable: document.querySelector("#student-table"),
  sponsorNavBtns: document.querySelectorAll("[data-sponsor-section]"),
  sponsorSections: document.querySelectorAll(".sponsor-section"),
  studentSearch: document.querySelector("#student-search"),
  studentFilterInstitution: document.querySelector("#student-filter-institution"),
  studentFilterCoach: document.querySelector("#student-filter-coach"),
  studentDirectoryTable: document.querySelector("#student-directory-table"),
  progressClassFilter: document.querySelector("#progress-class-filter"),
  progressAssignmentFilter: document.querySelector("#progress-assignment-filter"),
  classProgressSummary: document.querySelector("#class-progress-summary"),
  classProgressDetail: document.querySelector("#class-progress-detail"),
  classForm: document.querySelector("#class-form"),
  addClassForm: document.querySelector("#add-class-form"),
  classSelect: document.querySelector("#class-select"),
  newClassName: document.querySelector("#new-class-name"),
  assignmentName: document.querySelector("#assignment-name"),
  assignmentCount: document.querySelector("#assignment-count"),
  classCatalog: document.querySelector("#class-catalog"),
  toast: document.querySelector("#toast")
};

function init() {
  ensureSubmissionSnapshots();
  if (elements.preferredLanguage) fillLanguageOptions(elements.preferredLanguage, state.preferredLanguage);
  if (elements.uploadLanguage) fillLanguageOptions(elements.uploadLanguage, "English");
  bindEvents();
  render();
}

function bindEvents() {
  if (elements.preferredLanguage) {
    elements.preferredLanguage.addEventListener("change", (event) => {
      state.preferredLanguage = event.target.value;
      renderVolunteerReview();
    });
  }

  if (elements.activeCoach) {
    elements.activeCoach.addEventListener("change", (event) => {
      state.activeCoachId = event.target.value;
      renderCoachReport();
      renderCoachWaitingReport();
    });
  }

  if (elements.coachViewPending) {
    elements.coachViewPending.addEventListener("click", () => {
      setCoachView("pending");
    });
  }

  if (elements.coachViewWaiting) {
    elements.coachViewWaiting.addEventListener("click", () => {
      setCoachView("waiting");
    });
  }

  if (elements.coachNavBtns.length) {
    elements.coachNavBtns.forEach((button) => {
      button.addEventListener("click", () => {
        switchCoachSection(button.dataset.coachSection);
      });
    });
  }

  if (elements.activeVolunteer) {
    elements.activeVolunteer.addEventListener("change", (event) => {
      state.activeVolunteerId = event.target.value;
      state.selectedSubmissionId = null;
      state.translationToggled = false;
      renderVolunteerQueue();
      renderVolunteerReview();
    });
  }

  if (elements.uploadStudent) elements.uploadStudent.addEventListener("change", syncUploadVolunteerSelection);
  if (elements.uploadClass) elements.uploadClass.addEventListener("change", renderAssignmentOptions);

  if (elements.uploadForm) {
    elements.uploadForm.addEventListener("submit", (event) => {
      event.preventDefault();
      createSubmission();
    });
  }

  if (elements.translatePaper) {
    elements.translatePaper.addEventListener("click", () => {
      state.translationToggled = !state.translationToggled;
      renderVolunteerReview();
    });
  }
  if (elements.generatePdf) elements.generatePdf.addEventListener("click", generatePdfPacket);

  if (elements.institutionForm) {
    elements.institutionForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = elements.institutionName.value.trim();
      if (!name) {
        return;
      }

      if (!state.institutions.includes(name)) {
        state.institutions.push(name);
        elements.institutionName.value = "";
        toast(`Institution added: ${name}`);
        renderSponsorForms();
      } else {
        toast("Institution already exists.");
      }
    });
  }

  if (elements.userForm) {
    elements.userForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const editId = elements.userEditId?.value || "";
      const role = elements.userRole.value;
      const name = elements.userName.value.trim();
      const email = elements.userEmail.value.trim();
      const password = elements.userPassword.value.trim();

      if (!name || !email || (!editId && !password)) {
        return;
      }

      if (editId) {
        let user = state.users.coaches.find((candidate) => candidate.id === editId);
        let currentRole = "coach";
        if (!user) {
          user = state.users.volunteers.find((candidate) => candidate.id === editId);
          currentRole = "volunteer";
        }

        if (user) {
          user.name = name;
          user.email = email;
          if (password) {
            user.password = password;
          }

          if (role !== currentRole) {
            const from = currentRole === "coach" ? state.users.coaches : state.users.volunteers;
            const to = role === "coach" ? state.users.coaches : state.users.volunteers;
            from.splice(from.indexOf(user), 1);
            to.push(user);
          }

          toast(`${capitalize(role)} updated.`);
        }

        resetUserForm();
        render();
        return;
      }

      const collection = role === "coach" ? state.users.coaches : state.users.volunteers;
      collection.push({
        id: `${role}-${Date.now()}`,
        name,
        email,
        password
      });

      queueEmail(email, `Welcome to PFC as a ${capitalize(role)}`);
      resetUserForm();
      toast(`${capitalize(role)} created.`);
      render();
    });
  }

  if (elements.generateStudentId) {
    elements.generateStudentId.addEventListener("click", () => {
      elements.studentIdentifier.value = nextStudentIdentifier();
    });
  }

  if (elements.studentForm) {
    elements.studentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      upsertStudent();
    });
  }

  if (elements.sponsorNavBtns.length) {
    elements.sponsorNavBtns.forEach((button) => {
      button.addEventListener("click", () => {
        switchSponsorSection(button.dataset.sponsorSection);
      });
    });
  }

  if (elements.studentSearch) elements.studentSearch.addEventListener("input", renderStudents);
  if (elements.studentFilterInstitution) elements.studentFilterInstitution.addEventListener("change", renderStudents);
  if (elements.studentFilterCoach) elements.studentFilterCoach.addEventListener("change", renderStudents);

  if (elements.studentDirectoryTable) {
    elements.studentDirectoryTable.querySelectorAll("th.sortable").forEach((header) => {
      header.addEventListener("click", () => {
        const column = header.dataset.sort;
        if (studentSortColumn === column) {
          studentSortAsc = !studentSortAsc;
        } else {
          studentSortColumn = column;
          studentSortAsc = true;
        }
        renderStudents();
      });
    });
  }

  if (elements.progressClassFilter) elements.progressClassFilter.addEventListener("change", renderClassProgress);
  if (elements.progressAssignmentFilter) elements.progressAssignmentFilter.addEventListener("change", renderClassProgress);

  if (elements.classForm) {
    elements.classForm.addEventListener("submit", (event) => {
      event.preventDefault();
      addAssignmentToClass();
    });
  }

  if (elements.addClassForm) {
    elements.addClassForm.addEventListener("submit", (event) => {
      event.preventDefault();
      addClassFromBuilder();
    });
  }
}

function render() {
  renderRolePanels();
  renderSummary();
  renderEmailLog();
  renderCoachInputs();
  renderCoachReport();
  renderCoachWaitingReport();
  renderSessionSelectors();
  renderVolunteerQueue();
  renderVolunteerReview();
  renderSponsorSections();
  renderCoachSections();
  renderSponsorForms();
  renderUsers();
  renderStudentDirectoryFilters();
  renderStudents();
  renderClassProgress();
  renderClassBuilderOptions();
  renderClassCatalog();
}

function renderRolePanels() {
  elements.roleLinks.forEach((button) => {
    button.classList.toggle("active", button.dataset.roleLink === state.activeRole);
  });

  elements.rolePanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.rolePanel === state.activeRole);
  });
}

function renderSummary() {
  if (!elements.summaryStats) return;
  const pendingCount = state.submissions.filter((submission) => submission.status !== "complete").length;
  const completeCount = state.submissions.filter((submission) => submission.status === "complete").length;
  const cards = [
    { label: "Students", value: state.students.length },
    { label: "Classes", value: state.classes.length },
    { label: "Open reviews", value: pendingCount },
    { label: "Completed packets", value: completeCount }
  ];

  elements.summaryStats.innerHTML = cards
    .map((card) => `<article class="stat-card"><span>${card.label}</span><strong>${card.value}</strong></article>`)
    .join("");
}

function renderEmailLog() {
  if (!elements.emailLog) return;
  elements.emailLog.innerHTML = state.emailLog
    .slice()
    .reverse()
    .map(
      (item) => `
        <li class="activity-item">
          <strong>${item.subject}</strong>
          <div>${item.recipient}</div>
          <small>${formatDate(item.timestamp)}</small>
        </li>
      `
    )
    .join("");
}

function renderCoachInputs() {
  if (!elements.uploadStudent) return;
  const coach = getCoach(state.activeCoachId) || state.users.coaches[0];
  const coachStudents = state.students.filter((student) => student.coachId === coach.id);

  populateSelect(
    elements.uploadStudent,
    coachStudents.map((student) => ({
      value: student.id,
      label: `${student.firstName} ${student.lastName}`
    }))
  );

  populateSelect(
    elements.uploadClass,
    state.classes.map((item) => ({ value: item.id, label: item.name }))
  );

  populateSelect(
    elements.uploadVolunteer,
    state.users.volunteers.map((volunteer) => ({ value: volunteer.id, label: volunteer.name }))
  );

  renderAssignmentOptions();
  syncUploadVolunteerSelection();
}

function renderSessionSelectors() {
  if (!elements.activeCoach && !elements.activeVolunteer) return;
  if (elements.activeCoach) {
    populateSelect(
      elements.activeCoach,
      state.users.coaches.map((coach) => ({ value: coach.id, label: `${coach.name} (${coach.email})` }))
    );
    elements.activeCoach.value = state.activeCoachId;
  }

  if (elements.activeVolunteer) {
    populateSelect(
      elements.activeVolunteer,
      state.users.volunteers.map((volunteer) => ({ value: volunteer.id, label: `${volunteer.name} (${volunteer.email})` }))
    );
    elements.activeVolunteer.value = state.activeVolunteerId;
  }
}

function renderAssignmentOptions() {
  if (!elements.uploadClass || !elements.uploadAssignment) return;
  const classRecord = getClass(elements.uploadClass.value) || state.classes[0];
  if (!classRecord) {
    elements.uploadAssignment.innerHTML = "";
    return;
  }

  populateSelect(
    elements.uploadAssignment,
    classRecord.assignments.map((assignment) => ({
      value: assignment.id,
      label: `${assignment.name} (${assignment.questionCount} questions)`
    }))
  );
}

function syncUploadVolunteerSelection() {
  if (!elements.uploadStudent || !elements.uploadVolunteer) return;
  const student = getStudent(elements.uploadStudent.value);
  if (student?.defaultVolunteerId) {
    elements.uploadVolunteer.value = student.defaultVolunteerId;
  }
}

function createSubmission() {
  const student = getStudent(elements.uploadStudent.value);
  const classRecord = getClass(elements.uploadClass.value);
  const assignment = classRecord?.assignments.find((item) => item.id === elements.uploadAssignment.value);
  const volunteer = getVolunteer(elements.uploadVolunteer.value);
  const file = elements.uploadFile.files[0];

  if (!student || !classRecord || !assignment || !volunteer || !file) {
    toast("Please complete the upload form.");
    return;
  }

  student.defaultVolunteerId = volunteer.id;

  state.submissions.push({
    id: `submission-${Date.now()}`,
    studentId: student.id,
    classId: classRecord.id,
    classNameSnapshot: classRecord.name,
    assignmentId: assignment.id,
    assignmentNameSnapshot: assignment.name,
    questionCountSnapshot: assignment.questionCount,
    coachId: student.coachId,
    volunteerId: volunteer.id,
    language: elements.uploadLanguage.value || "English",
    fileName: file.name,
    uploadedAt: new Date().toISOString(),
    status: "pending",
    feedbackLanguage: state.preferredLanguage,
    generalComments: "",
    questionFeedback: Array.from({ length: assignment.questionCount }, () => ""),
    answerScriptures: Array.from({ length: assignment.questionCount }, () => []),
    answers: Array.from(
      { length: assignment.questionCount },
      (_, index) => `Uploaded handwritten response for question ${index + 1}. Open ${file.name} to view the original paper.`
    )
  });

  queueEmail(
    volunteer.email,
    `New paper assigned: ${student.firstName} ${student.lastName} - ${assignment.name}`
  );

  elements.uploadForm.reset();
  fillLanguageOptions(elements.uploadLanguage, "English");
  render();
  toast("Paper uploaded and grader notified.");
}

function renderCoachReport() {
  if (!elements.coachReport) return;
  const coach = getCoach(state.activeCoachId) || state.users.coaches[0];
  const rows = state.students
    .filter((student) => student.coachId === coach.id)
    .map((student) => ({
      student,
      pending: getLatestStudentSubmission(student.id, (submission) => submission.status !== "complete", "uploadedAt")
    }))
    .filter((entry) => entry.pending)
    .map(({ student, pending }) => {
      return `
        <tr>
          <td>${student.firstName} ${student.lastName}</td>
          <td>${describeSubmission(pending)}</td>
          <td>${getVolunteer(pending.volunteerId)?.name || "Volunteer"}</td>
          <td>${daysSince(pending.uploadedAt)} days</td>
        </tr>
      `;
    })
    .join("");

  elements.coachReport.innerHTML = rows || `<tr><td colspan="4">No papers are currently with a volunteer for grading.</td></tr>`;
}

function renderCoachWaitingReport() {
  if (!elements.coachWaitingReport) return;
  const coach = getCoach(state.activeCoachId) || state.users.coaches[0];
  const rows = state.students
    .filter((student) => student.coachId === coach.id)
    .map((student) => {
      const pending = getLatestStudentSubmission(student.id, (submission) => submission.status !== "complete", "uploadedAt");
      const completed = getLatestStudentSubmission(student.id, (submission) => submission.status === "complete", "completedAt");

      return `
        <tr>
          <td>${student.firstName} ${student.lastName}</td>
          <td>${pending ? describeSubmission(pending) : nextAssignmentLabel(student)}</td>
          <td>${completed ? describeSubmission(completed) : "None yet"}</td>
          <td>${pending ? `Waiting on ${getVolunteer(pending.volunteerId)?.name || "Volunteer"}` : "With Student"}</td>
          <td>${pending ? `${daysSince(pending.uploadedAt)} days` : "—"}</td>
        </tr>
      `;
    })
    .join("");

  elements.coachWaitingReport.innerHTML = rows || `<tr><td colspan="5">No students assigned.</td></tr>`;
}

function setCoachView(view) {
  if (!elements.coachPendingView || !elements.coachWaitingView || !elements.coachViewPending || !elements.coachViewWaiting) {
    return;
  }

  const showPending = view !== "waiting";
  elements.coachPendingView.classList.toggle("hidden", !showPending);
  elements.coachWaitingView.classList.toggle("hidden", showPending);
  elements.coachViewPending.classList.toggle("active", showPending);
  elements.coachViewWaiting.classList.toggle("active", !showPending);
}

function renderVolunteerQueue() {
  if (!elements.volunteerQueue || !elements.volunteerQueueTable) return;

  const volunteer = getVolunteer(state.activeVolunteerId) || state.users.volunteers[0];
  const assigned = state.submissions
    .filter((submission) => submission.volunteerId === volunteer.id)
    .slice()
    .sort((left, right) => {
      const leftPendingRank = left.status === "complete" ? 1 : 0;
      const rightPendingRank = right.status === "complete" ? 1 : 0;

      if (volunteerSortColumn !== "status" && leftPendingRank !== rightPendingRank) {
        return leftPendingRank - rightPendingRank;
      }

      const leftStudent = getStudent(left.studentId);
      const rightStudent = getStudent(right.studentId);
      const leftValues = {
        student: `${leftStudent?.firstName || ""} ${leftStudent?.lastName || ""}`.trim().toLowerCase(),
        assignment: describeSubmission(left).toLowerCase(),
        date: new Date(left.uploadedAt).getTime(),
        days: daysSince(left.uploadedAt),
        status: left.status === "complete" ? "complete" : "pending"
      };
      const rightValues = {
        student: `${rightStudent?.firstName || ""} ${rightStudent?.lastName || ""}`.trim().toLowerCase(),
        assignment: describeSubmission(right).toLowerCase(),
        date: new Date(right.uploadedAt).getTime(),
        days: daysSince(right.uploadedAt),
        status: right.status === "complete" ? "complete" : "pending"
      };

      let result = 0;
      if (typeof leftValues[volunteerSortColumn] === "string") {
        result = leftValues[volunteerSortColumn].localeCompare(rightValues[volunteerSortColumn]);
      } else {
        result = leftValues[volunteerSortColumn] - rightValues[volunteerSortColumn];
      }

      if (result === 0) {
        result = new Date(left.uploadedAt).getTime() - new Date(right.uploadedAt).getTime();
      }

      return volunteerSortAsc ? result : -result;
    });

  elements.volunteerQueue.innerHTML = assigned.length
    ? assigned
        .map((submission) => {
          const student = getStudent(submission.studentId);
          const isComplete = submission.status === "complete";
          const outstandingDays = daysSince(submission.uploadedAt);
          const rowClass = !isComplete && outstandingDays > 7 ? ' class="row-overdue"' : "";
          return `
            <tr${rowClass}>
              <td>${student ? `${student.firstName} ${student.lastName}` : "Unknown student"}</td>
              <td>${describeSubmission(submission)}</td>
              <td>${formatDate(submission.uploadedAt)}</td>
              <td>${outstandingDays}</td>
              <td>
                <span class="status-chip ${isComplete ? "complete" : ""}">
                  ${isComplete ? "Completed" : "Waiting for review"}
                </span>
              </td>
              <td>
                <button type="button" class="secondary" data-open-review="${submission.id}">
                  ${isComplete ? "View" : "Review"}
                </button>
              </td>
            </tr>
          `;
        })
        .join("")
    : '<tr><td colspan="6">No papers assigned.</td></tr>';

  elements.volunteerQueueTable.querySelectorAll("th.sortable").forEach((header) => {
    const isActive = header.dataset.sort === volunteerSortColumn;
    header.classList.toggle("sort-asc", isActive && volunteerSortAsc);
    header.classList.toggle("sort-desc", isActive && !volunteerSortAsc);
    header.onclick = () => {
      const nextColumn = header.dataset.sort;
      if (volunteerSortColumn === nextColumn) {
        volunteerSortAsc = !volunteerSortAsc;
      } else {
        volunteerSortColumn = nextColumn;
        volunteerSortAsc = nextColumn !== "days";
      }
      renderVolunteerQueue();
    };
  });

  elements.volunteerQueue.querySelectorAll("[data-open-review]").forEach((button) => {
    button.onclick = () => {
      state.selectedSubmissionId = button.dataset.openReview;
      state.translationToggled = false;
      renderVolunteerReview();
    };
  });
}

function renderVolunteerReview() {
  if (!elements.reviewPanel) return;
  const submission = state.submissions.find((item) => item.id === state.selectedSubmissionId);
  if (!submission) {
    elements.reviewEmpty.classList.remove("hidden");
    elements.reviewPanel.classList.add("hidden");
    return;
  }

  const student = getStudent(submission.studentId);
  const targetLanguage = state.preferredLanguage;
  const needsTranslation = submission.language !== targetLanguage;
  // When translation is needed it is shown automatically (auto-apply for all questions).
  // state.translationToggled is flipped each time the user clicks the button:
  //   • needsTranslation=true  → default showTranslated=true; toggle hides it
  //   • needsTranslation=false → default showTranslated=false; toggle shows it
  const showTranslated = needsTranslation ? !state.translationToggled : state.translationToggled;

  elements.reviewEmpty.classList.add("hidden");
  elements.reviewPanel.classList.remove("hidden");
  elements.reviewMeta.textContent = `${student.firstName} ${student.lastName} · ${describeSubmission(submission)}`;
  elements.reviewTitle.textContent = `${getSubmissionAssignmentName(submission)} review`;
  elements.reviewFile.textContent = submission.fileName;
  elements.reviewLanguage.textContent = submission.language;
  elements.generatePdf.disabled = submission.status !== "complete";
  elements.translatePaper.classList.toggle("hidden", !needsTranslation);
  elements.translatePaper.textContent = showTranslated ? "Hide translation" : "Show translation";

  elements.reviewForm.innerHTML = `
    <label>
      Feedback language
      <select id="feedback-language">
        ${languages
          .map(
            (language) =>
              `<option value="${language}" ${language === submission.feedbackLanguage ? "selected" : ""}>${language}</option>`
          )
          .join("")}
      </select>
    </label>
    ${submission.answers
      .map((answer, index) => {
        const feedback = submission.questionFeedback[index] || "";
        const translated = translateText(answer, submission.language, targetLanguage);
        const scripturePassages = submission.answerScriptures?.[index] || [];
        return `
          <section class="question-card">
            <div>
              <strong>Question ${index + 1}</strong>
            </div>
            <div>
              <div class="helper-text">Original response</div>
              <div class="original-answer">${escapeHtml(answer)}</div>
            </div>
            ${
              scripturePassages.length
                ? `
                  <div>
                    <div class="helper-text">Detected Bible passages</div>
                    <div class="translated-answer">
                      ${scripturePassages
                        .map(
                          (passage) => `
                            <p><strong>${escapeHtml(passage.reference)}</strong></p>
                            <p>${escapeHtml(passage.text)}</p>
                          `
                        )
                        .join("")}
                    </div>
                  </div>
                `
                : ""
            }
            ${
              showTranslated
                ? `
                  <div>
                    <div class="helper-text">Preferred language view (${targetLanguage})</div>
                    <div class="translated-answer">${escapeHtml(translated)}</div>
                  </div>
                `
                : needsTranslation
                  ? `<div class="helper-text">Translation hidden. Click "Show translation" to view the response in ${targetLanguage}.</div>`
                  : ""
            }
            <label>
              Feedback
              <textarea data-feedback-index="${index}" required>${escapeHtml(feedback)}</textarea>
            </label>
          </section>
        `;
      })
      .join("")}
    <label>
      General comments
      <textarea id="general-comments">${escapeHtml(submission.generalComments)}</textarea>
    </label>
    <p class="helper-text">
      To mark this assignment complete, include part of ${escapeHtml(student.firstName)} ${escapeHtml(
        student.lastName
      )}'s name in at least two feedback answers.
    </p>
    <div class="button-row">
      <button type="button" id="save-review" class="secondary">Save progress</button>
      <button type="button" id="complete-review" class="primary">Mark assignment complete</button>
    </div>
  `;

  elements.reviewForm.querySelector("#feedback-language").addEventListener("change", (event) => {
    submission.feedbackLanguage = event.target.value;
  });

  elements.reviewForm.querySelector("#save-review").addEventListener("click", () => {
    syncReviewForm(submission);
    toast("Review saved.");
    renderCoachReport();
    renderVolunteerQueue();
  });

  const completeReviewButton = elements.reviewForm.querySelector("#complete-review");
  completeReviewButton.addEventListener("click", async () => {
    syncReviewForm(submission);
    const isComplete = submission.questionFeedback.every((entry) => entry.trim().length > 0);
    if (!isComplete) {
      toast("Each question needs volunteer feedback before completion.");
      return;
    }

    const matchingFeedbackCount = countFeedbackWithStudentName(submission.questionFeedback, student);
    if (matchingFeedbackCount < 2) {
      toast("Include part of the student's name in at least two feedback answers before completion.");
      return;
    }

    completeReviewButton.disabled = true;
    try {
      toast("Looking up Bible passages in answers…");
      await lookupSubmissionBiblePassages(submission);
      submission.status = "complete";
      submission.completedAt = new Date().toISOString();
      queueEmail(
        getCoach(submission.coachId)?.email || "coach@pfc-demo.org",
        `Assignment complete: ${student.firstName} ${student.lastName} - ${getSubmissionAssignmentName(submission)}`
      );
      toast("Assignment marked complete. PDF packet is ready.");
      render();
    } finally {
      completeReviewButton.disabled = false;
    }
  });
}

function syncReviewForm(submission) {
  submission.feedbackLanguage = elements.reviewForm.querySelector("#feedback-language").value;
  submission.questionFeedback = Array.from(elements.reviewForm.querySelectorAll("[data-feedback-index]")).map((field) =>
    field.value.trim()
  );
  submission.generalComments = elements.reviewForm.querySelector("#general-comments").value.trim();
}

function generatePdfPacket() {
  const submission = state.submissions.find((item) => item.id === state.selectedSubmissionId);
  if (!submission || submission.status !== "complete") {
    return;
  }

  const student = getStudent(submission.studentId);
  const answerScriptures = submission.answerScriptures || [];
  const translatedFeedback = submission.questionFeedback.map((feedback) =>
    translateText(feedback, submission.feedbackLanguage, submission.language)
  );
  const translatedGeneralComments = translateText(
    submission.generalComments,
    submission.feedbackLanguage,
    submission.language
  );

  const packet = window.open("", "_blank", "noopener,noreferrer,width=960,height=900");
  if (!packet) {
    toast("Allow pop-ups to generate the PDF packet.");
    return;
  }

  packet.document.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>${student.firstName} ${student.lastName} - ${getSubmissionAssignmentName(submission)}</title>
        <style>
          body { font-family: Inter, Arial, sans-serif; color: #111827; padding: 24px; }
          .pdf-page { min-height: 92vh; page-break-after: always; }
          .pdf-page:last-child { page-break-after: auto; }
          h1, h2 { color: #8e2326; }
          .pdf-question { margin-bottom: 18px; padding-bottom: 18px; border-bottom: 1px solid #d1d5db; }
        </style>
      </head>
      <body class="pdf-packet">
        <section class="pdf-page">
          <h1>PFC Assignment Packet</h1>
          <p><strong>Student:</strong> ${student.firstName} ${student.lastName}</p>
          <p><strong>Class:</strong> ${getSubmissionClassName(submission)}</p>
          <p><strong>Assignment:</strong> ${getSubmissionAssignmentName(submission)}</p>
          <p><strong>Uploaded language:</strong> ${submission.language}</p>
          ${submission.answers
            .map(
              (answer, index) => `
                <div class="pdf-question">
                  <h2>Question ${index + 1}</h2>
                  <p>${escapeHtml(answer)}</p>
                  ${(answerScriptures[index] || [])
                    .map(
                      (passage) => `
                        <p><strong>${escapeHtml(passage.reference)}</strong></p>
                        <p>${escapeHtml(passage.text)}</p>
                      `
                    )
                    .join("")}
                </div>
              `
            )
            .join("")}
        </section>
        <section class="pdf-page">
          <h1>Volunteer Feedback (${submission.language})</h1>
          ${translatedFeedback
            .map(
              (feedback, index) => `
                <div class="pdf-question">
                  <h2>Question ${index + 1}</h2>
                  <p>${escapeHtml(feedback)}</p>
                </div>
              `
            )
            .join("")}
          <div class="pdf-question">
            <h2>General Comments</h2>
            <p>${escapeHtml(translatedGeneralComments)}</p>
          </div>
        </section>
        <script>window.onload = () => window.print();<\/script>
      </body>
    </html>
  `);
  packet.document.close();
}

function renderSponsorSections() {
  if (!elements.sponsorNavBtns.length || !elements.sponsorSections.length) return;
  const availableSections = Array.from(elements.sponsorNavBtns).map((button) => button.dataset.sponsorSection);
  if (!availableSections.includes(sponsorActiveSection)) {
    sponsorActiveSection = availableSections[0];
  }

  elements.sponsorNavBtns.forEach((button) => {
    button.classList.toggle("active", button.dataset.sponsorSection === sponsorActiveSection);
  });

  elements.sponsorSections.forEach((section) => {
    section.classList.toggle("hidden", section.id !== `sponsor-section-${sponsorActiveSection}`);
  });
}

function switchSponsorSection(sectionName) {
  sponsorActiveSection = sectionName || sponsorActiveSection;
  renderSponsorSections();
}

function renderCoachSections() {
  if (!elements.coachNavBtns.length || !elements.coachSections.length) return;
  const availableSections = Array.from(elements.coachNavBtns).map((button) => button.dataset.coachSection);
  if (!availableSections.includes(coachActiveSection)) {
    coachActiveSection = availableSections[0];
  }

  elements.coachNavBtns.forEach((button) => {
    button.classList.toggle("active", button.dataset.coachSection === coachActiveSection);
  });

  elements.coachSections.forEach((section) => {
    section.classList.toggle("hidden", section.id !== `coach-section-${coachActiveSection}`);
  });
}

function switchCoachSection(sectionName) {
  coachActiveSection = sectionName || coachActiveSection;
  renderCoachSections();
}

function renderSponsorForms() {
  if (!elements.studentInstitution) return;
  populateSelect(
    elements.studentInstitution,
    state.institutions.map((item) => ({ value: item, label: item }))
  );

  populateSelect(
    elements.studentCoach,
    state.users.coaches.map((coach) => ({ value: coach.id, label: coach.name }))
  );
}

function resetUserForm() {
  if (!elements.userForm) return;
  elements.userForm.reset();
  if (elements.userEditId) elements.userEditId.value = "";
  if (elements.userPassword) {
    elements.userPassword.required = true;
    elements.userPassword.placeholder = "";
  }
  if (elements.userFormSubmit) elements.userFormSubmit.textContent = "Create User";
}

function renderUsers() {
  if (!elements.userTable) return;

  const rows = [
    ...state.users.coaches.map((user) => ({ ...user, role: "coach" })),
    ...state.users.volunteers.map((user) => ({ ...user, role: "volunteer" }))
  ];

  elements.userTable.innerHTML = rows.length
    ? rows
        .map(
          (user) => `
            <tr>
              <td>${escapeHtml(user.name)}</td>
              <td>${escapeHtml(user.email)}</td>
              <td>${capitalize(user.role)}</td>
              <td><button type="button" class="secondary" data-edit-user="${user.id}">Edit</button></td>
            </tr>
          `
        )
        .join("")
    : '<tr><td colspan="4">No users yet.</td></tr>';

  elements.userTable.querySelectorAll("[data-edit-user]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.editUser;
      const coach = getCoach(id);
      const user = coach || getVolunteer(id);
      if (!user) {
        return;
      }

      elements.userEditId.value = user.id;
      elements.userRole.value = coach ? "coach" : "volunteer";
      elements.userName.value = user.name;
      elements.userEmail.value = user.email;
      elements.userPassword.value = "";
      elements.userPassword.required = false;
      elements.userPassword.placeholder = "Leave blank to keep current password";
      if (elements.userFormSubmit) elements.userFormSubmit.textContent = "Save User";
      switchSponsorSection("users");
      toast("User loaded for editing.");
    });
  });
}

function renderStudentDirectoryFilters() {
  if (!elements.studentFilterInstitution || !elements.studentFilterCoach) return;

  const institutionValue = elements.studentFilterInstitution.value;
  const coachValue = elements.studentFilterCoach.value;
  const institutions = [...new Set(state.institutions.filter(Boolean))].sort((a, b) => a.localeCompare(b));
  const coaches = state.users.coaches
    .map((coach) => ({ id: coach.id, name: coach.name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  elements.studentFilterInstitution.innerHTML = [
    '<option value="">All Institutions</option>',
    ...institutions.map((institution) => `<option value="${escapeHtml(institution)}">${escapeHtml(institution)}</option>`)
  ].join("");
  if (institutions.includes(institutionValue)) {
    elements.studentFilterInstitution.value = institutionValue;
  }

  elements.studentFilterCoach.innerHTML = [
    '<option value="">All Coaches</option>',
    ...coaches.map((coach) => `<option value="${coach.id}">${escapeHtml(coach.name)}</option>`)
  ].join("");
  if (coaches.some((coach) => coach.id === coachValue)) {
    elements.studentFilterCoach.value = coachValue;
  }
}

function renderStudents() {
  if (!elements.studentTable) return;

  const search = elements.studentSearch?.value.trim().toLowerCase() || "";
  const institutionFilter = elements.studentFilterInstitution?.value || "";
  const coachFilter = elements.studentFilterCoach?.value || "";

  const students = state.students
    .map((student) => {
      const coach = getCoach(student.coachId);
      return {
        ...student,
        fullName: `${student.firstName} ${student.lastName}`,
        coachName: coach?.name || ""
      };
    })
    .filter((student) => {
      const matchesSearch =
        !search ||
        [student.fullName, student.identifier, student.institution, student.coachName]
          .join(" ")
          .toLowerCase()
          .includes(search);
      const matchesInstitution = !institutionFilter || student.institution === institutionFilter;
      const matchesCoach = !coachFilter || student.coachId === coachFilter;
      return matchesSearch && matchesInstitution && matchesCoach;
    })
    .sort((left, right) => {
      const direction = studentSortAsc ? 1 : -1;
      const leftValue =
        studentSortColumn === "name"
          ? left.fullName
          : studentSortColumn === "id"
            ? left.identifier
            : studentSortColumn === "institution"
              ? left.institution
              : left.coachName;
      const rightValue =
        studentSortColumn === "name"
          ? right.fullName
          : studentSortColumn === "id"
            ? right.identifier
            : studentSortColumn === "institution"
              ? right.institution
              : right.coachName;
      return leftValue.localeCompare(rightValue, undefined, { numeric: true, sensitivity: "base" }) * direction;
    });

  elements.studentTable.innerHTML = students.length
    ? students
        .map(
          (student) => `
            <tr>
              <td>${escapeHtml(student.fullName)}</td>
              <td>${escapeHtml(student.identifier)}</td>
              <td>${escapeHtml(student.institution)}</td>
              <td>${escapeHtml(student.coachName)}</td>
              <td><button type="button" class="secondary" data-edit-student="${student.id}">Edit</button></td>
            </tr>
          `
        )
        .join("")
    : '<tr><td colspan="5">No students match the current search and filters.</td></tr>';

  elements.studentDirectoryTable?.querySelectorAll("th.sortable").forEach((header) => {
    header.classList.toggle("sort-asc", header.dataset.sort === studentSortColumn && studentSortAsc);
    header.classList.toggle("sort-desc", header.dataset.sort === studentSortColumn && !studentSortAsc);
  });

  elements.studentTable.querySelectorAll("[data-edit-student]").forEach((button) => {
    button.addEventListener("click", () => {
      const student = getStudent(button.dataset.editStudent);
      if (!student) {
        return;
      }

      elements.studentEditId.value = student.id;
      elements.studentFirstName.value = student.firstName;
      elements.studentLastName.value = student.lastName;
      elements.studentInstitution.value = student.institution;
      elements.studentIdentifier.value = student.identifier;
      elements.studentIdentifier.disabled = true;
      elements.studentCoach.value = student.coachId;
      switchSponsorSection("students");
      toast("Student loaded for editing. The ID stays locked after creation.");
    });
  });
}

function renderClassProgress() {
  if (!elements.classProgressSummary || !elements.progressClassFilter || !elements.progressAssignmentFilter) return;

  const classFilterValue = elements.progressClassFilter.value;
  const phaseRecords = state.students.map(getStudentProgressPhase).filter(Boolean);
  const availableClassIds = state.classes.map((classRecord) => classRecord.id);

  elements.progressClassFilter.innerHTML = [
    '<option value="">All Classes</option>',
    ...state.classes.map((classRecord) => `<option value="${classRecord.id}">${escapeHtml(classRecord.name)}</option>`)
  ].join("");
  if (availableClassIds.includes(classFilterValue)) {
    elements.progressClassFilter.value = classFilterValue;
  }

  const activeClassFilter = elements.progressClassFilter.value || "";
  const assignmentCandidates = (activeClassFilter
    ? phaseRecords.filter((record) => record.classId === activeClassFilter)
    : phaseRecords
  ).reduce((items, record) => {
    if (!items.some((item) => item.assignmentId === record.assignmentId && item.classId === record.classId)) {
      items.push({
        classId: record.classId,
        assignmentId: record.assignmentId,
        assignmentName: record.assignmentName
      });
    }
    return items;
  }, []);

  assignmentCandidates.sort((left, right) => {
    if (left.classId !== right.classId) {
      const leftClass = getClass(left.classId)?.name || "";
      const rightClass = getClass(right.classId)?.name || "";
      return leftClass.localeCompare(rightClass);
    }
    return compareProgressAssignments(left.classId, left.assignmentId, left.assignmentName, right.assignmentId, right.assignmentName);
  });

  const assignmentFilterValue = elements.progressAssignmentFilter.value;
  elements.progressAssignmentFilter.innerHTML = [
    '<option value="">All Assignments</option>',
    ...assignmentCandidates.map((assignment) => `<option value="${assignment.assignmentId}">${escapeHtml(assignment.assignmentName)}</option>`)
  ].join("");
  if (assignmentCandidates.some((assignment) => assignment.assignmentId === assignmentFilterValue)) {
    elements.progressAssignmentFilter.value = assignmentFilterValue;
  }

  const activeAssignmentFilter = elements.progressAssignmentFilter.value || "";
  const filteredRecords = phaseRecords.filter((record) => {
    const matchesClass = !activeClassFilter || record.classId === activeClassFilter;
    const matchesAssignment = !activeAssignmentFilter || record.assignmentId === activeAssignmentFilter;
    return matchesClass && matchesAssignment;
  });

  const classSummaries = state.classes
    .map((classRecord) => {
      const students = filteredRecords.filter((record) => record.classId === classRecord.id);
      if (!students.length && activeClassFilter && activeClassFilter !== classRecord.id) {
        return null;
      }
      const assignments = students.reduce((items, record) => {
        const existing = items.find((item) => item.assignmentId === record.assignmentId);
        if (existing) {
          existing.count += 1;
          existing.students.push(record);
        } else {
          items.push({
            assignmentId: record.assignmentId,
            assignmentName: record.assignmentName,
            count: 1,
            students: [record]
          });
        }
        return items;
      }, []);
      assignments.sort((left, right) =>
        compareProgressAssignments(classRecord.id, left.assignmentId, left.assignmentName, right.assignmentId, right.assignmentName)
      );
      return {
        classId: classRecord.id,
        className: classRecord.name,
        count: students.length,
        students,
        assignments
      };
    })
    .filter(Boolean)
    .filter((summary) => summary.count || !filteredRecords.length);

  if (!classSummaries.length) {
    elements.classProgressSummary.innerHTML = '<div class="progress-empty">No students match the current class progress filters.</div>';
    elements.classProgressDetail.classList.remove("visible");
    elements.classProgressDetail.innerHTML = "";
    progressDetailSelection = null;
    return;
  }

  elements.classProgressSummary.innerHTML = classSummaries
    .map((summary) => {
      const isActiveClass =
        progressDetailSelection?.type === "class" && progressDetailSelection.classId === summary.classId;
      return `
        <article class="progress-card ${isActiveClass ? "active" : ""}" data-progress-class="${summary.classId}">
          <h4>${escapeHtml(summary.className)}</h4>
          <div class="count">${summary.count}</div>
          <div class="muted">Students enrolled in this phase</div>
          <div class="progress-assignment-list">
            ${summary.assignments
              .map((assignment) => {
                const isActiveAssignment =
                  progressDetailSelection?.type === "assignment" &&
                  progressDetailSelection.classId === summary.classId &&
                  progressDetailSelection.assignmentId === assignment.assignmentId;
                return `
                  <button
                    type="button"
                    class="progress-assignment-btn ${isActiveAssignment ? "active" : ""}"
                    data-progress-assignment="${assignment.assignmentId}"
                    data-progress-assignment-class="${summary.classId}">
                    <span>${escapeHtml(assignment.assignmentName)}</span>
                    <strong>${assignment.count}</strong>
                  </button>
                `;
              })
              .join("")}
          </div>
        </article>
      `;
    })
    .join("");

  elements.classProgressSummary.querySelectorAll("[data-progress-class]").forEach((card) => {
    card.addEventListener("click", () => {
      const classId = card.dataset.progressClass;
      progressDetailSelection =
        progressDetailSelection?.type === "class" && progressDetailSelection.classId === classId
          ? null
          : { type: "class", classId };
      renderClassProgress();
    });
  });

  elements.classProgressSummary.querySelectorAll("[data-progress-assignment]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const classId = button.dataset.progressAssignmentClass;
      const assignmentId = button.dataset.progressAssignment;
      progressDetailSelection =
        progressDetailSelection?.type === "assignment" &&
        progressDetailSelection.classId === classId &&
        progressDetailSelection.assignmentId === assignmentId
          ? null
          : { type: "assignment", classId, assignmentId };
      renderClassProgress();
    });
  });

  const detailRecords =
    progressDetailSelection?.type === "assignment"
      ? filteredRecords.filter(
          (record) =>
            record.classId === progressDetailSelection.classId &&
            record.assignmentId === progressDetailSelection.assignmentId
        )
      : progressDetailSelection?.type === "class"
        ? filteredRecords.filter((record) => record.classId === progressDetailSelection.classId)
        : [];

  if (!detailRecords.length) {
    elements.classProgressDetail.classList.remove("visible");
    elements.classProgressDetail.innerHTML = "";
    if (progressDetailSelection) progressDetailSelection = null;
    return;
  }

  const detailTitle =
    progressDetailSelection.type === "assignment"
      ? `${detailRecords[0].className} — ${detailRecords[0].assignmentName}`
      : `${detailRecords[0].className} — Current Students`;

  elements.classProgressDetail.innerHTML = `
    <h4>${escapeHtml(detailTitle)}</h4>
    <ul>
      ${detailRecords
        .slice()
        .sort((left, right) => left.studentName.localeCompare(right.studentName))
        .map((record) => `<li>${escapeHtml(record.studentName)}${record.coachName ? ` <span class="muted">· ${escapeHtml(record.coachName)}</span>` : ""}</li>`)
        .join("")}
    </ul>
  `;
  elements.classProgressDetail.classList.add("visible");
}

function getStudentProgressPhase(student) {
  const studentName = `${student.firstName} ${student.lastName}`;
  const coachName = getCoach(student.coachId)?.name || "";
  const submissions = submissionsForStudent(student.id);
  const pendingSubmission = submissions
    .filter((submission) => submission.status !== "complete")
    .sort((left, right) => new Date(right.uploadedAt) - new Date(left.uploadedAt))[0];

  if (pendingSubmission) {
    return {
      studentId: student.id,
      studentName,
      coachName,
      classId: pendingSubmission.classId,
      className: getSubmissionClassName(pendingSubmission),
      assignmentId: pendingSubmission.assignmentId,
      assignmentName: getSubmissionAssignmentName(pendingSubmission)
    };
  }

  const latestCompleted = submissions
    .filter((submission) => submission.status === "complete")
    .sort((left, right) => new Date(right.completedAt || right.uploadedAt) - new Date(left.completedAt || left.uploadedAt))[0];

  if (!latestCompleted) {
    const firstClass = state.classes[0];
    const firstAssignment = firstClass?.assignments[0];
    if (!firstClass) return null;
    return {
      studentId: student.id,
      studentName,
      coachName,
      classId: firstClass.id,
      className: firstClass.name,
      assignmentId: firstAssignment?.id || `pending-${firstClass.id}`,
      assignmentName: firstAssignment?.name || "Awaiting assignments"
    };
  }

  const classRecord = getClass(latestCompleted.classId);
  const assignmentIndex = classRecord?.assignments.findIndex((item) => item.id === latestCompleted.assignmentId) ?? -1;
  const nextAssignment = classRecord?.assignments[assignmentIndex + 1];
  if (classRecord && nextAssignment) {
    return {
      studentId: student.id,
      studentName,
      coachName,
      classId: classRecord.id,
      className: classRecord.name,
      assignmentId: nextAssignment.id,
      assignmentName: nextAssignment.name
    };
  }

  const classIndex = state.classes.findIndex((item) => item.id === latestCompleted.classId);
  const nextClass = classIndex >= 0 ? state.classes[classIndex + 1] : null;
  const nextClassAssignment = nextClass?.assignments[0];
  if (nextClass && nextClassAssignment) {
    return {
      studentId: student.id,
      studentName,
      coachName,
      classId: nextClass.id,
      className: nextClass.name,
      assignmentId: nextClassAssignment.id,
      assignmentName: nextClassAssignment.name
    };
  }

  return {
    studentId: student.id,
    studentName,
    coachName,
    classId: latestCompleted.classId,
    className: getSubmissionClassName(latestCompleted),
    assignmentId: `completed-${latestCompleted.classId}`,
    assignmentName: "Completed all assignments"
  };
}

function compareProgressAssignments(classId, leftAssignmentId, leftAssignmentName, rightAssignmentId, rightAssignmentName) {
  const classRecord = getClass(classId);
  const leftIndex = classRecord?.assignments.findIndex((assignment) => assignment.id === leftAssignmentId) ?? -1;
  const rightIndex = classRecord?.assignments.findIndex((assignment) => assignment.id === rightAssignmentId) ?? -1;
  const normalizedLeft = leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex;
  const normalizedRight = rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex;
  if (normalizedLeft !== normalizedRight) {
    return normalizedLeft - normalizedRight;
  }
  return leftAssignmentName.localeCompare(rightAssignmentName);
}

function renderClassBuilderOptions() {
  if (!elements.classSelect) return;
  populateSelect(
    elements.classSelect,
    state.classes.map((classRecord) => ({ value: classRecord.id, label: classRecord.name }))
  );
}

function upsertStudent() {
  const editId = elements.studentEditId.value;
  const payload = {
    firstName: elements.studentFirstName.value.trim(),
    lastName: elements.studentLastName.value.trim(),
    institution: elements.studentInstitution.value,
    identifier: elements.studentIdentifier.value.trim(),
    coachId: elements.studentCoach.value
  };

  if (!payload.firstName || !payload.lastName || !payload.institution || !payload.identifier || !payload.coachId) {
    toast("Complete the student record before saving.");
    return;
  }

  if (!editId && state.students.some((student) => student.identifier === payload.identifier)) {
    toast("Student ID must be unique.");
    return;
  }

  if (editId) {
    const student = getStudent(editId);
    Object.assign(student, {
      firstName: payload.firstName,
      lastName: payload.lastName,
      institution: payload.institution,
      coachId: payload.coachId
    });
    toast("Student updated.");
  } else {
    state.students.push({
      id: `student-${Date.now()}`,
      identifier: payload.identifier,
      firstName: payload.firstName,
      lastName: payload.lastName,
      institution: payload.institution,
      coachId: payload.coachId,
      defaultVolunteerId: state.users.volunteers[0]?.id || ""
    });
    toast("Student created.");
  }

  elements.studentForm.reset();
  elements.studentEditId.value = "";
  elements.studentIdentifier.disabled = false;
  render();
}

function renderClassCatalog() {
  if (!elements.classCatalog) return;
  elements.classCatalog.innerHTML = state.classes
    .map(
      (classRecord) => `
        <article class="catalog-card" data-class-id="${classRecord.id}">
          <header class="catalog-header">
            <strong class="catalog-class-name" data-toggle-class="${classRecord.id}" style="cursor:pointer;">${classRecord.name}</strong>
            <div class="catalog-actions">
              <button type="button" class="secondary" data-rename-class="${classRecord.id}">Rename</button>
              <button type="button" class="secondary" data-delete-class="${classRecord.id}">Delete</button>
            </div>
          </header>
          <ul class="catalog-assignments hidden" data-assignments-for="${classRecord.id}">
            ${classRecord.assignments.length === 0
              ? '<li class="muted">No assignments yet</li>'
              : classRecord.assignments
                  .map(
                    (assignment) => `
                      <li class="catalog-assignment-item">
                        <span class="catalog-assignment-text">${assignment.name} — ${assignment.questionCount} questions</span>
                        <div class="catalog-actions catalog-assignment-actions">
                          <button type="button" class="secondary" data-edit-assignment="${assignment.id}" data-class-id="${classRecord.id}">Edit</button>
                          <button type="button" class="secondary" data-delete-assignment="${assignment.id}" data-class-id="${classRecord.id}">Delete</button>
                        </div>
                      </li>
                    `
                  )
                  .join("")}
          </ul>
        </article>
      `
    )
    .join("");

  elements.classCatalog.querySelectorAll("[data-toggle-class]").forEach((el) => {
    el.addEventListener("click", () => {
      const assignmentList = elements.classCatalog.querySelector(`[data-assignments-for="${el.dataset.toggleClass}"]`);
      if (assignmentList) {
        assignmentList.classList.toggle("hidden");
        el.classList.toggle("expanded");
      }
    });
  });

  elements.classCatalog.querySelectorAll("[data-rename-class]").forEach((button) => {
    button.addEventListener("click", () => {
      const classRecord = getClass(button.dataset.renameClass);
      if (!classRecord) return;
      const newName = prompt("Enter new class name:", classRecord.name);
      if (!newName || !newName.trim()) return;
      const trimmed = newName.trim();
      if (state.classes.some((item) => item.id !== classRecord.id && item.name.toLowerCase() === trimmed.toLowerCase())) {
        toast("Class name already exists.");
        return;
      }
      classRecord.name = trimmed;
      toast(`Class renamed to: ${trimmed}`);
      render();
    });
  });

  elements.classCatalog.querySelectorAll("[data-edit-assignment]").forEach((button) => {
    button.addEventListener("click", () => {
      const classRecord = getClass(button.dataset.classId);
      const assignment = classRecord?.assignments.find((item) => item.id === button.dataset.editAssignment);
      if (!assignment) return;

      const newName = prompt("Enter new assignment name:", assignment.name);
      if (!newName || !newName.trim()) return;
      const trimmedName = newName.trim();

      const newQuestionCount = prompt("Enter new question count:", String(assignment.questionCount));
      if (newQuestionCount === null) return;
      const parsedQuestionCount = Number(newQuestionCount);
      if (!Number.isInteger(parsedQuestionCount) || parsedQuestionCount < 1) {
        toast("Question count must be at least 1.");
        return;
      }

      assignment.name = trimmedName;
      assignment.questionCount = parsedQuestionCount;
      toast(`Updated assignment: ${trimmedName}`);
      render();
    });
  });

  elements.classCatalog.querySelectorAll("[data-delete-assignment]").forEach((button) => {
    button.addEventListener("click", () => {
      const classRecord = getClass(button.dataset.classId);
      if (!classRecord) return;
      const assignment = classRecord.assignments.find((item) => item.id === button.dataset.deleteAssignment);
      if (!assignment) return;
      classRecord.assignments = classRecord.assignments.filter((item) => item.id !== assignment.id);
      toast(`Deleted assignment: ${assignment.name}`);
      render();
    });
  });

  elements.classCatalog.querySelectorAll("[data-delete-class]").forEach((button) => {
    button.addEventListener("click", () => {
      const classRecord = getClass(button.dataset.deleteClass);
      if (!classRecord) return;
      state.classes = state.classes.filter((item) => item.id !== classRecord.id);
      toast(`Deleted class: ${classRecord.name}`);
      render();
    });
  });
}

function addAssignmentToClass() {
  const selectedClassId = elements.classSelect.value;
  const assignmentName = elements.assignmentName.value.trim();
  const questionCount = Number(elements.assignmentCount.value);

  const classRecord = getClass(selectedClassId);
  if (!classRecord) {
    toast("Select a class before saving.");
    return;
  }

  if (!assignmentName || questionCount < 1) {
    toast("Provide an assignment name and question count.");
    return;
  }

  classRecord.assignments.push({
    id: `assignment-${Date.now()}`,
    name: assignmentName,
    questionCount
  });

  elements.classForm.reset();
  elements.assignmentCount.value = "1";
  toast(`Assignment added to ${classRecord.name}.`);
  render();
}

function addClassFromBuilder() {
  const className = elements.newClassName.value.trim();
  if (!className) {
    toast("Enter a class name to add.");
    return;
  }

  if (state.classes.some((item) => item.name.toLowerCase() === className.toLowerCase())) {
    toast("Class already exists.");
    return;
  }

  const newClass = {
    id: `class-${Date.now()}`,
    name: className,
    assignments: []
  };
  state.classes.push(newClass);
  elements.newClassName.value = "";
  render();
  elements.classSelect.value = newClass.id;
  toast(`Class added: ${className}`);
}

function populateSelect(element, options) {
  if (!element) return;
  const currentValue = element.value;
  element.innerHTML = options.map((option) => `<option value="${option.value}">${option.label}</option>`).join("");
  if (options.some((option) => option.value === currentValue)) {
    element.value = currentValue;
  }
}

function fillLanguageOptions(element, selected) {
  if (!element) return;
  populateSelect(
    element,
    languages.map((language) => ({ value: language, label: language }))
  );
  element.value = selected;
}

function queueEmail(recipient, subject) {
  state.emailLog.push({
    id: `email-${Date.now()}`,
    timestamp: new Date().toISOString(),
    recipient,
    subject
  });
}

function submissionsForStudent(studentId) {
  return state.submissions.filter((submission) => submission.studentId === studentId);
}

function getLatestStudentSubmission(studentId, predicate, dateField) {
  return submissionsForStudent(studentId)
    .filter(predicate)
    .sort((a, b) => new Date(b[dateField] || b.uploadedAt) - new Date(a[dateField] || a.uploadedAt))[0];
}

function nextAssignmentLabel(student) {
  const completed = getLatestStudentSubmission(student.id, (submission) => submission.status === "complete", "completedAt");

  if (!completed) {
    const firstClass = state.classes[0];
    const firstAssignment = firstClass?.assignments[0];
    return firstClass && firstAssignment ? `${firstClass.name} / ${firstAssignment.name}` : "Awaiting class setup";
  }

  const classRecord = getClass(completed.classId);
  const assignmentIndex = classRecord?.assignments.findIndex((item) => item.id === completed.assignmentId) ?? -1;
  const nextAssignment = classRecord?.assignments[assignmentIndex + 1];
  return nextAssignment ? `${classRecord.name} / ${nextAssignment.name}` : "Ready for next class";
}

function describeSubmission(submission) {
  return `${getSubmissionClassName(submission)} / ${getSubmissionAssignmentName(submission)}`;
}

function getSubmissionClassName(submission) {
  return submission.classNameSnapshot || getClass(submission.classId)?.name || "Class";
}

function getSubmissionAssignmentName(submission) {
  return submission.assignmentNameSnapshot || getAssignment(submission.classId, submission.assignmentId)?.name || "Assignment";
}

function getSubmissionQuestionCount(submission) {
  return (
    submission.questionCountSnapshot ??
    getAssignment(submission.classId, submission.assignmentId)?.questionCount ??
    submission.questionFeedback.length
  );
}

function ensureSubmissionSnapshots() {
  // Existing submission records are intentionally updated in-place so historical labels stay stable.
  state.submissions.forEach((submission) => {
    const classRecord = getClass(submission.classId);
    const assignment = getAssignment(submission.classId, submission.assignmentId);
    submission.classNameSnapshot = submission.classNameSnapshot || classRecord?.name || "Class";
    submission.assignmentNameSnapshot = submission.assignmentNameSnapshot || assignment?.name || "Assignment";
    submission.questionCountSnapshot =
      submission.questionCountSnapshot ?? assignment?.questionCount ?? submission.questionFeedback.length;
  });
}

function getStudent(id) {
  return state.students.find((student) => student.id === id);
}

function getCoach(id) {
  return state.users.coaches.find((coach) => coach.id === id);
}

function getVolunteer(id) {
  return state.users.volunteers.find((volunteer) => volunteer.id === id);
}

function getClass(id) {
  return state.classes.find((classRecord) => classRecord.id === id);
}

function getAssignment(classId, assignmentId) {
  return getClass(classId)?.assignments.find((assignment) => assignment.id === assignmentId);
}

function nextStudentIdentifier() {
  const max = state.students.reduce((currentMax, student) => {
    const number = Number(student.identifier.replace(/[^\d]/g, ""));
    return Number.isFinite(number) ? Math.max(currentMax, number) : currentMax;
  }, 1000);
  return `PFC-${max + 1}`;
}

function translateText(text, sourceLanguage, targetLanguage) {
  if (!text) {
    return "";
  }

  if (sourceLanguage === targetLanguage) {
    return text;
  }

  const phrasebook = translationPhrasebook[sourceLanguage]?.[targetLanguage];
  if (!phrasebook) {
    console.warn(`No phrasebook available for ${sourceLanguage} → ${targetLanguage}.`);
    return text;
  }

  const normalizedInput = normalizeTranslationLookup(text);
  for (const [sentence, translation] of Object.entries(phrasebook.sentences)) {
    if (normalizeTranslationLookup(sentence) === normalizedInput) {
      return translation;
    }
  }

  return text.replace(translationTokenPattern, (token) => {
    const translated = phrasebook.words[token.toLowerCase()];
    if (!translated) {
      return token;
    }

    const lettersOnly = token.replace(/[^A-Za-z\u00C0-\u017F]/g, "");
    if (lettersOnly.length > 1 && lettersOnly === lettersOnly.toUpperCase()) {
      return translated.toUpperCase();
    }

    if (token[0] === token[0].toUpperCase()) {
      return capitalize(translated);
    }

    return translated;
  });
}

function normalizeTranslationLookup(text) {
  return text
    .toLowerCase()
    .replace(translationNormalizePattern, " ")
    .trim()
    .replace(/\s+/g, " ");
}

async function lookupSubmissionBiblePassages(submission) {
  const answers = Array.isArray(submission.answers) ? submission.answers : [];
  const lookupResults = await Promise.allSettled(answers.map((answer) => lookupBiblePassagesForAnswer(answer)));
  const passagesByAnswer = lookupResults.map((result) => (result.status === "fulfilled" ? result.value : []));
  submission.answerScriptures = passagesByAnswer;
}

async function lookupBiblePassagesForAnswer(answer) {
  const references = extractBibleReferences(answer);
  if (!references.length) {
    return [];
  }

  const lookupResults = await Promise.allSettled(references.map((reference) => fetchBiblePassage(reference)));
  return lookupResults
    .map((result) => (result.status === "fulfilled" ? result.value : null))
    .filter(Boolean);
}

function extractBibleReferences(answer) {
  const matches = String(answer || "").match(bibleReferencePattern) || [];
  const deduped = new Map();
  matches.forEach((match) => {
    const cleaned = match.trim().replace(/^[("'“”‘’\[]+|[),.;!?'“”‘’\]]+$/g, "");
    const normalized = normalizeBibleReference(cleaned);
    if (!normalized) {
      return;
    }
    const key = normalized.toLowerCase();
    if (!deduped.has(key)) {
      deduped.set(key, normalized);
    }
  });
  return Array.from(deduped.values());
}

function normalizeBibleReference(reference) {
  const match = String(reference || "").trim().match(bibleReferenceParsePattern);
  if (!match) {
    return null;
  }

  const [, rawBook, chapterAndVerse] = match;
  const normalizedBook = normalizeBibleBookName(rawBook);
  if (!normalizedBook) {
    return null;
  }
  return `${normalizedBook} ${chapterAndVerse}`;
}

function normalizeBibleBookName(bookName) {
  const normalized = normalizeBibleBookLookupValue(bookName);
  const aliasMatch = bibleBookAliases[normalized];
  if (aliasMatch) {
    return aliasMatch;
  }
  return bibleCanonicalBookLookup.get(normalized) || null;
}

function normalizeBibleBookLookupValue(bookName) {
  return String(bookName || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^(iii|ii|i)\b\s+/, (value) => `${{ iii: "3", ii: "2", i: "1" }[value.trim().toLowerCase()] || value} `);
}

async function fetchBiblePassage(reference) {
  const key = String(reference || "").trim().toLowerCase();
  if (!key) {
    return null;
  }

  if (bibleLookupCache.has(key)) {
    return bibleLookupCache.get(key);
  }

  if (bibleLookupInFlight.has(key)) {
    return bibleLookupInFlight.get(key);
  }

  const lookupPromise = (async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), bibleApiTimeoutMs);
    try {
      const response = await fetch(`${bibleApiBaseUrl}/${encodeURIComponent(reference)}`, { signal: controller.signal });
      if (!response.ok) {
        return null;
      }
      const payload = await response.json();
      const verseText = String(payload?.text || "").trim();
      if (!verseText) {
        return null;
      }
      const result = {
        reference: payload.reference || reference,
        text: verseText
      };
      bibleLookupCache.set(key, result);
      return result;
    } catch (error) {
      if (error?.name === "AbortError") {
        console.warn("Bible verse lookup timed out:", reference);
      } else {
        console.warn("Bible verse lookup failed:", reference, error);
      }
      return null;
    } finally {
      clearTimeout(timeoutId);
      bibleLookupInFlight.delete(key);
    }
  })();

  bibleLookupInFlight.set(key, lookupPromise);
  return lookupPromise;
}

function countFeedbackWithStudentName(feedbackEntries, student) {
  const nameFragments = getStudentNameFragments(student);
  return feedbackEntries.filter((entry) => feedbackMentionsStudentName(entry, nameFragments)).length;
}

function feedbackMentionsStudentName(feedback, nameFragments) {
  const normalizedFeedback = normalizeNameCheckText(feedback);
  return nameFragments.some((fragment) => normalizedFeedback.includes(fragment));
}

function getStudentNameFragments(student) {
  return Array.from(
    new Set(
      [student.firstName, student.lastName]
        .flatMap((value) => getNameFragments(normalizeNameCheckText(value)))
        .filter(Boolean)
    )
  );
}

function getNameFragments(name) {
  if (!name) {
    return [];
  }

  const minimumFragmentLength = Math.max(minimumNameFragmentLength, Math.ceil(name.length / 2));
  return Array.from(new Set([name, name.slice(0, minimumFragmentLength)]));
}

function normalizeNameCheckText(value) {
  return `${value ?? ""}`.toLowerCase().replace(/[^a-z]/g, "");
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function daysSince(value) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / oneDay));
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeHtml(value) {
  return `${value ?? ""}`
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function toast(message) {
  if (!elements.toast) return;
  elements.toast.textContent = message;
  elements.toast.classList.remove("hidden");
  window.clearTimeout(toast.timeoutId);
  toast.timeoutId = window.setTimeout(() => {
    elements.toast.classList.add("hidden");
  }, 2400);
}

// Read role from URL query parameter or page filename
function initFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const role = params.get("role");
  if (role && ["coach", "volunteer", "sponsor", "admin"].includes(role)) {
    state.activeRole = role;
    return;
  }

  // Detect role from page filename (e.g., coach.html, volunteer.html)
  const page = window.location.pathname.split("/").pop().replace(".html", "");
  if (["coach", "volunteer", "sponsor", "admin"].includes(page)) {
    state.activeRole = page;
  }
}

initFromUrl();
init();
