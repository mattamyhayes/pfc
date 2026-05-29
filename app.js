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
    }
  ],
  classes: [
    {
      id: "class-1",
      name: "Basic Beliefs",
      assignments: [
        { id: "assignment-1", name: "Lesson 1", questionCount: 3 },
        { id: "assignment-2", name: "Lesson 2", questionCount: 2 }
      ]
    },
    {
      id: "class-2",
      name: "Parables of Jesus",
      assignments: [
        { id: "assignment-3", name: "Chapter Reflection", questionCount: 4 }
      ]
    },
    {
      id: "class-3",
      name: "Men of the Bible",
      assignments: []
    },
    {
      id: "class-4",
      name: "Prayer",
      assignments: []
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
  coachReport: document.querySelector("#coach-report"),
  volunteerQueue: document.querySelector("#volunteer-queue"),
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
  fillLanguageOptions(elements.preferredLanguage, state.preferredLanguage);
  fillLanguageOptions(elements.uploadLanguage, "English");
  bindEvents();
  render();
}

function bindEvents() {
  elements.preferredLanguage.addEventListener("change", (event) => {
    state.preferredLanguage = event.target.value;
    renderVolunteerReview();
  });

  elements.activeCoach.addEventListener("change", (event) => {
    state.activeCoachId = event.target.value;
    renderCoachReport();
  });

  elements.activeVolunteer.addEventListener("change", (event) => {
    state.activeVolunteerId = event.target.value;
    state.selectedSubmissionId = null;
    state.translationToggled = false;
    renderVolunteerQueue();
    renderVolunteerReview();
  });

  elements.roleLinks.forEach((button) => {
    button.addEventListener("click", () => {
      state.activeRole = button.dataset.roleLink;
      renderRolePanels();
    });
  });

  elements.uploadStudent.addEventListener("change", syncUploadVolunteerSelection);
  elements.uploadClass.addEventListener("change", renderAssignmentOptions);

  elements.uploadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createSubmission();
  });

  elements.translatePaper.addEventListener("click", () => {
    state.translationToggled = !state.translationToggled;
    renderVolunteerReview();
  });
  elements.generatePdf.addEventListener("click", generatePdfPacket);

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

  elements.userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const role = elements.userRole.value;
    const name = elements.userName.value.trim();
    const email = elements.userEmail.value.trim();
    const password = elements.userPassword.value.trim();

    if (!name || !email || !password) {
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
    elements.userForm.reset();
    toast(`${capitalize(role)} created.`);
    render();
  });

  elements.generateStudentId.addEventListener("click", () => {
    elements.studentIdentifier.value = nextStudentIdentifier();
  });

  elements.studentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    upsertStudent();
  });

  elements.classForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addAssignmentToClass();
  });

  elements.addClassForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addClassFromBuilder();
  });
}

function render() {
  renderRolePanels();
  renderSummary();
  renderEmailLog();
  renderCoachInputs();
  renderCoachReport();
  renderSessionSelectors();
  renderVolunteerQueue();
  renderVolunteerReview();
  renderSponsorForms();
  renderStudents();
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
  populateSelect(
    elements.activeCoach,
    state.users.coaches.map((coach) => ({ value: coach.id, label: `${coach.name} (${coach.email})` }))
  );
  elements.activeCoach.value = state.activeCoachId;

  populateSelect(
    elements.activeVolunteer,
    state.users.volunteers.map((volunteer) => ({ value: volunteer.id, label: `${volunteer.name} (${volunteer.email})` }))
  );
  elements.activeVolunteer.value = state.activeVolunteerId;
}

function renderAssignmentOptions() {
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
  const coach = getCoach(state.activeCoachId) || state.users.coaches[0];
  const rows = state.students
    .filter((student) => student.coachId === coach.id)
    .map((student) => {
      const studentSubmissions = submissionsForStudent(student.id);
      const pending = studentSubmissions
        .filter((submission) => submission.status !== "complete")
        .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0];
      const completed = studentSubmissions
        .filter((submission) => submission.status === "complete")
        .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))[0];

      return `
        <tr>
          <td>${student.firstName} ${student.lastName}</td>
          <td>${pending ? describeSubmission(pending) : nextAssignmentLabel(student)}</td>
          <td>${completed ? describeSubmission(completed) : "None yet"}</td>
          <td>${pending ? `Waiting on ${getVolunteer(pending.volunteerId)?.name || "Volunteer"}` : "No paper pending"}</td>
          <td>${pending ? `${daysSince(pending.uploadedAt)} days` : "—"}</td>
        </tr>
      `;
    })
    .join("");

  elements.coachReport.innerHTML = rows || `<tr><td colspan="5">No students assigned.</td></tr>`;
}

function renderVolunteerQueue() {
  const volunteer = getVolunteer(state.activeVolunteerId) || state.users.volunteers[0];
  const assigned = state.submissions
    .filter((submission) => submission.volunteerId === volunteer.id)
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

  elements.volunteerQueue.innerHTML = assigned
    .map((submission) => {
      const student = getStudent(submission.studentId);
      return `
        <article class="queue-card">
          <header>
            <div>
              <strong>${student.firstName} ${student.lastName}</strong>
              <div class="muted">${describeSubmission(submission)}</div>
            </div>
            <span class="status-chip ${submission.status === "complete" ? "complete" : ""}">
              ${submission.status === "complete" ? "Completed" : "Open"}
            </span>
          </header>
          <div class="muted">
            ${getSubmissionQuestionCount(submission)} questions · Uploaded ${formatDate(submission.uploadedAt)}
          </div>
          <button type="button" class="secondary" data-open-review="${submission.id}">
            ${submission.status === "complete" ? "View packet" : "Review assignment"}
          </button>
        </article>
      `;
    })
    .join("");

  elements.volunteerQueue.querySelectorAll("[data-open-review]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedSubmissionId = button.dataset.openReview;
      state.translationToggled = false;
      renderVolunteerReview();
    });
  });
}

function renderVolunteerReview() {
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

  elements.reviewForm.querySelector("#complete-review").addEventListener("click", () => {
    syncReviewForm(submission);
    const isComplete = submission.questionFeedback.every((entry) => entry.trim().length > 0);
    if (!isComplete) {
      toast("Each question needs volunteer feedback before completion.");
      return;
    }

    submission.status = "complete";
    submission.completedAt = new Date().toISOString();
    queueEmail(
      getCoach(submission.coachId)?.email || "coach@pfc-demo.org",
      `Assignment complete: ${student.firstName} ${student.lastName} - ${getSubmissionAssignmentName(submission)}`
    );
    toast("Assignment marked complete. PDF packet is ready.");
    render();
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

function renderSponsorForms() {
  populateSelect(
    elements.studentInstitution,
    state.institutions.map((item) => ({ value: item, label: item }))
  );

  populateSelect(
    elements.studentCoach,
    state.users.coaches.map((coach) => ({ value: coach.id, label: coach.name }))
  );
}

function renderStudents() {
  elements.studentTable.innerHTML = state.students
    .map((student) => {
      const coach = getCoach(student.coachId);
      return `
        <tr>
          <td>${student.firstName} ${student.lastName}</td>
          <td>${student.identifier}</td>
          <td>${student.institution}</td>
          <td>${coach?.name || ""}</td>
          <td><button type="button" class="secondary" data-edit-student="${student.id}">Edit</button></td>
        </tr>
      `;
    })
    .join("");

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
      toast("Student loaded for editing. The ID stays locked after creation.");
    });
  });
}

function renderClassBuilderOptions() {
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
                  .map((assignment) => `<li>${assignment.name} — ${assignment.questionCount} questions</li>`)
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
  const currentValue = element.value;
  element.innerHTML = options.map((option) => `<option value="${option.value}">${option.label}</option>`).join("");
  if (options.some((option) => option.value === currentValue)) {
    element.value = currentValue;
  }
}

function fillLanguageOptions(element, selected) {
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

function nextAssignmentLabel(student) {
  const completed = submissionsForStudent(student.id)
    .filter((submission) => submission.status === "complete")
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))[0];

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
    return text;
  }

  const sentenceMatch = phrasebook.sentences[normalizeTranslationLookup(text)];
  if (sentenceMatch) {
    return sentenceMatch;
  }

  return text.replace(/[A-Za-zÀ-ÖØ-öø-ÿ']+/g, (token) => {
    const translated = phrasebook.words[token.toLowerCase()];
    if (!translated) {
      return token;
    }

    if (token === token.toUpperCase()) {
      return translated.toUpperCase();
    }

    if (token[0] === token[0].toUpperCase()) {
      return capitalize(translated);
    }

    return translated;
  });
}

function normalizeTranslationLookup(text) {
  return text.trim().replace(/\s+/g, " ").toLowerCase();
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
  elements.toast.textContent = message;
  elements.toast.classList.remove("hidden");
  window.clearTimeout(toast.timeoutId);
  toast.timeoutId = window.setTimeout(() => {
    elements.toast.classList.add("hidden");
  }, 2400);
}

// Read role from URL query parameter
function initFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const role = params.get("role");
  if (role && ["coach", "volunteer", "sponsor", "admin"].includes(role)) {
    state.activeRole = role;
  }
}

initFromUrl();
init();
