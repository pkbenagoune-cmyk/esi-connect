const subjects = [

    {
        id: 1,
        name: "C Programming",
        description: "Pointers, arrays, memory management and structures.",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" class="size-6">
   <path stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"/>
</svg>
                
    `
    },

    {
        id: 2,
        name: "Mathematics",
        description: "Algebra, calculus and probability.",
        iconcolor: "text-purple-600",
        bgcolor: "bg-purple-100",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor" class="size-6">
  <path stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"/>
</svg>
        
`
    },

    {
        id: 3,
        name: "Algorithms",
        description: "Sorting, graphs and dynamic programming.",
        iconcolor: "text-green-600",
        bgcolor: "bg-green-100",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
       
`
    },

    {
        id: 4,
        name: "Databases",
        description: "SQL and database design.",
        iconcolor: "text-cyan-600",
        bgcolor: "bg-cyan-100",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
</svg>
       
`
    },

    {
        id: 5,
        name: "Web Development",
        description: "HTML, CSS, JavaScript and React.",
        iconcolor: "text-red-600",
        bgcolor: "bg-red-100",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
</svg>
       
`
    },

    {
        id: 6,
        name: "Physics",
        description: "Mechanics and electromagnetism.",
        iconcolor: "text-orange-600",
        bgcolor: "bg-orange-100",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
</svg>
        
`
    }

];
const requests = [

    {
        id: 1,
        title: "Need help with C pointers",
        subject: "C Programming",
        difficulty: "Intermediate",
        status: "PENDING",
        studentName: "Ayoub Meziani"
    },

    {
        id: 2,
        title: "Linear Algebra Exam",
        subject: "Mathematics",
        difficulty: "Advanced",
        status: "ACCEPTED",
        studentName: "Sara Belkacem"
    },

    {
        id: 3,
        title: "Binary Search Trees",
        subject: "Algorithms",
        difficulty: "Intermediate",
        status: "PENDING",
        studentName: "Mohamed Ali"
    },

    {
        id: 4,
        title: "SQL Optimization",
        description: "I'm confused about the difference between primary keys and foreign keys. How are they used to relate tables in a database?",
        subject: "Databases",
        difficulty: "Beginner",
        status: "COMPLETED",
        studentName: "Rami Karim"
    },

    {
        id: 5,
        title: "Flexbox Layout",
        subject: "Web Development",
        difficulty: "Beginner",
        status: "PENDING",
        studentName: "Aya Mecheri"
    },

    {
        id: 6,
        title: "Newton Laws",
        subject: "Physics",
        difficulty: "Intermediate",
        status: "ACCEPTED",
        studentName: "Yasmine Hamidi"
    }

];
const subjectsContainer =
    document.getElementById("subjectsContainer");

subjects.forEach(subject => {

    subjectsContainer.innerHTML += `
<div class="bg-white rounded-2xl shadow p-6 border border-slate-100 hover:shadow-lg transition">

    <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center  ${subject.bgcolor} ${subject.iconcolor} -translate-y-3">
    ${subject.icon}
    </div>
</div>

<div class="bg-white rounded-2xl shadow p-6 border border-slate-100 hover:shadow-lg transition">

<h3 class="text-xl font-semibold">
${subject.name}
</h3>

<p class="mt-2 text-slate-600">
${subject.description}
</p>

</div>

`;

});
// ===============================
// FILTERS
// ===============================

const requestsContainer = document.getElementById("requestsContainer");
const subjectFilter = document.getElementById("subjectFilter");
const statusFilter = document.getElementById("statusFilter");
const searchInput = document.getElementById("searchInput");
const titleInput = document.getElementById("titleInput");
const subjectInput = document.getElementById("subjectInput");
const difficultyInput = document.getElementById("difficultyInput");
const descriptionInput = document.getElementById("descriptionInput");

const submitRequestBtn = document.getElementById("submitRequestBtn");
const errorMessage = document.getElementById("errorMessage");
//===================================
// fonctions 
//===================================

function applyFilters() {

    // Lire les valeurs des deux filtres
    const selectedSubject = subjectFilter.value;
    const selectedStatus = statusFilter.value;
    const searchText = searchInput.value.toLowerCase();


    // Commencer avec toutes les demandes
    let filteredRequests = requests;

    // Filtre par matière
    if (selectedSubject !== "ALL") {
        filteredRequests = filteredRequests.filter(request =>
            request.subject === selectedSubject
        );
    }

    // Filtre par statut
    if (selectedStatus !== "ALL") {
        filteredRequests = filteredRequests.filter(request =>
            request.status === selectedStatus
        );
    }
    //search 
    if (searchText !== "") {

        filteredRequests = filteredRequests.filter(request =>
            request.title.toLowerCase().includes(searchText)
        );

    }
    // Vider le conteneur avant de réafficher
    requestsContainer.innerHTML = "";

    // Afficher les demandes filtrées
    filteredRequests.forEach(request => {


        const color =
            request.status === "PENDING"
                ? "bg-yellow-100 text-yellow-800"
                : request.status === "ACCEPTED"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800";

        requestsContainer.innerHTML += `

<div class="bg-white rounded-2xl shadow p-6 border border-slate-100 hover:shadow-lg transition duration-300 min-h-[340px] ">

    <!-- Status -->
    <span class="inline-block rounded-full px-3 py-1 text-sm font-medium ${color}">
        ${request.status}
    </span>

    <!-- Title -->
    <h3 class="mt-4 text-xl font-semibold text-slate-900">
        ${request.title}
    </h3>
${request.status === "COMPLETED"
                ? `

<button
    class="toggleDescription mt-4 text-blue-600 font-medium hover:underline"
    data-id="${request.id}">

    📝 View Question

</button>

<div
    id="description-${request.id}"
   class="description hidden mt-3 bg-slate-50 rounded-xl p-4 cursor-pointer">

    <p class="text-slate-600 leading-relaxed">
        ${request.description}
    </p>

</div>

`
                : ""
            }
    <!-- Information -->
    <div class="mt-5 space-y-2 text-slate-600">

        <p>
            <strong>Subject:</strong> ${request.subject}
        </p>

        <p>
            <strong>Difficulty:</strong> ${request.difficulty}
        </p>

    </div>

    <!-- Student -->
    <p class="mt-5 text-sm text-slate-500 border-t pt-4">

        Asked by <strong>${request.studentName}</strong>

    </p>

</div>

`;
    });

    const buttons = document.querySelectorAll(".toggleDescription");

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            const id = this.dataset.id;

            const description =
                document.getElementById("description-" + id);

            description.classList.toggle("hidden");

        });

    });
    const descriptions = document.querySelectorAll(".description");

    descriptions.forEach(description => {

        description.addEventListener("click", function (e) {

            e.stopPropagation();

            this.classList.add("hidden");

        });

    });
}

// Quand on change un filtre
subjectFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);
// load requests
function loadRequests() {

    const savedRequests = localStorage.getItem("requests");

    if (savedRequests !== null) {

        requests = JSON.parse(savedRequests);

    }

}

// Affichage initial
applyFilters();

searchInput.addEventListener("input", applyFilters);

submitRequestBtn.addEventListener("click", function () {

    // Lire les valeurs du formulaire
    const title = titleInput.value.trim();
    const subject = subjectInput.value;
    const difficulty = difficultyInput.value;
    const description = descriptionInput.value.trim();

    // Vérifier que tous les champs sont remplis
    if (
        title === "" ||
        subject === "" ||
        difficulty === "" ||
        description === ""
    ) {

        errorMessage.textContent = "Please fill in all fields.";
        errorMessage.classList.remove("hidden");

        return;
    }

    // Cacher le message d'erreur
    errorMessage.classList.add("hidden");

    // Créer une nouvelle demande
    const newRequest = {

        id: requests.length + 1,

        title: title,

        subject: subject,

        difficulty: difficulty,

        description: description,

        status: "PENDING",

        studentName: "Current Student"

    };


    // Ajouter la demande au tableau
    requests.push(newRequest);

    // Save the updated array
    saveRequests();


    // Réafficher les cartes
    applyFilters();

    // Vider le formulaire
    titleInput.value = "";
    subjectInput.value = "";
    difficultyInput.value = "";
    descriptionInput.value = "";

    // Fermer la modale (si tu utilises une checkbox)
    // document.getElementById("requestModal").checked = false;
    requestModal.classList.remove("flex");
    requestModal.classList.add("hidden");
    // fonctions pour le localstorage
    function saveRequests() {

        localStorage.setItem(
            "requests",
            JSON.stringify(requests)
        );

    }


});
const loginPassword = document.getElementById("loginPassword");
const toggleLoginPassword = document.getElementById("toggleLoginPassword");

toggleLoginPassword.addEventListener("click", () => {

    if (loginPassword.type === "password") {

        loginPassword.type = "text";

    } else {

        loginPassword.type = "password";

    }

}); // <-- Close the first event listener here

const goToRegister = document.getElementById("goToRegister");

goToRegister.addEventListener("click", (event) => {

    event.preventDefault();

    document.getElementById("loginToggle").checked = false;

    document.getElementById("registerToggle").checked = true;

});
// ===============================
// REGISTER MODAL
// ===============================


const registerBtn = document.getElementById("registerBtn");
const registerModal = document.getElementById("registerModal");
const closeRegister = document.getElementById("closeRegister");
const registerOverlay = document.getElementById("registerOverlay");
const goToLogin = document.getElementById("goToLogin");
const registerPassword = document.getElementById("registerPassword");
const confirmRegisterPassword = document.getElementById("confirmRegisterPassword");
const toggleRegisterPassword = document.getElementById("toggleRegisterPassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
const createAccountBtn = document.getElementById("createAccountBtn");
registerBtn.addEventListener("click", () => {
    registerModal.classList.remove("hidden");
    registerModal.classList.add("flex");
});
closeRegister.addEventListener("click", () => {
    registerModal.classList.remove("flex");
    registerModal.classList.add("hidden");
});
registerOverlay.addEventListener("click", () => {
    registerModal.classList.remove("flex");
    registerModal.classList.add("hidden");
});
toggleRegisterPassword.addEventListener("click", () => {
    if (registerPassword.type === "password") {
        registerPassword.type = "text";

    } else {
        registerPassword.type = "password";

    }
});
toggleConfirmPassword.addEventListener("click", () => {
    if (confirmRegisterPassword.type === "password") {
        confirmRegisterPassword.type = "text";

    } else {
        confirmRegisterPassword.type = "password";

    }
});
createAccountBtn.addEventListener("click", () => {
    alert("Account created!");

});
goToLogin.addEventListener("click", function (e) {

    e.preventDefault();

    registerModal.classList.remove("flex");
    registerModal.classList.add("hidden");

    loginModal.classList.remove("hidden");
    loginModal.classList.add("flex");

});
// ================================
// LOGIN MODAL
// ================================

const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeLogin = document.getElementById("closeLogin");
const loginOverlay = document.getElementById("loginOverlay");






const signInBtn = document.getElementById("signInBtn");

// Open login modal
loginBtn.addEventListener("click", () => {

    loginModal.classList.remove("hidden");
    loginModal.classList.add("flex");

});

// Close login modal (X button)
closeLogin.addEventListener("click", () => {

    loginModal.classList.remove("flex");
    loginModal.classList.add("hidden");

});

// Close login modal (click on background)
loginOverlay.addEventListener("click", () => {

    loginModal.classList.remove("flex");
    loginModal.classList.add("hidden");

});

// Show / Hide password
toggleLoginPassword.addEventListener("click", () => {

    if (loginPassword.type === "password") {

        loginPassword.type = "text";

    } else {

        loginPassword.type = "password";

    }

});

// Go to Register
goToRegister.addEventListener("click", (event) => {

    event.preventDefault();

    // Close login
    loginModal.classList.remove("flex");
    loginModal.classList.add("hidden");

    // Open register
    registerModal.classList.remove("hidden");
    registerModal.classList.add("flex");

});

// Login button
signInBtn.addEventListener("click", () => {

    alert("Successfully logged in!");

});
// Tutor Modal

const tutorBtn = document.getElementById("tutorBtn");
const tutorModal = document.getElementById("tutorModal");
const closeTutor = document.getElementById("closeTutor");
const tutorOverlay = document.getElementById("tutorOverlay");
const applyTutorBtn = document.getElementById("applyTutorBtn");

// Open modal
tutorBtn.addEventListener("click", () => {

    tutorModal.classList.remove("hidden");
    tutorModal.classList.add("flex");

});

// Close with X
closeTutor.addEventListener("click", () => {

    tutorModal.classList.remove("flex");
    tutorModal.classList.add("hidden");

});

// Close by clicking outside
tutorOverlay.addEventListener("click", () => {

    tutorModal.classList.remove("flex");
    tutorModal.classList.add("hidden");

});

// Apply button
applyTutorBtn.addEventListener("click", () => {

    alert("Tutor application submitted successfully!");

    tutorModal.classList.remove("flex");
    tutorModal.classList.add("hidden");

});
// request 
const requestBtn = document.getElementById("requestBtn");
const requestModal = document.getElementById("requestModal");
const closeRequest = document.getElementById("closeRequest");
const requestOverlay = document.getElementById("requestOverlay");


// Open modal
requestBtn.addEventListener("click", () => {

    requestModal.classList.remove("hidden");
    requestModal.classList.add("flex");

});

// Close with X
closeRequest.addEventListener("click", () => {

    requestModal.classList.remove("flex");
    requestModal.classList.add("hidden");

});

// Close by clicking outside
requestOverlay.addEventListener("click", () => {

    requestModal.classList.remove("flex");
    requestModal.classList.add("hidden");

});

// Submit
submitRequestBtn.addEventListener("click", () => {

    const title = document.getElementById("titleInput").value.trim();
    const subject = document.getElementById("subjectInput").value;
    const difficulty = document.getElementById("difficultyInput").value;
    const description = document.getElementById("descriptionInput").value.trim();

    const errorMessage = document.getElementById("errorMessage");

    if (
        title === "" ||
        subject === "" ||
        difficulty === "" ||
        description === ""
    ) {

        errorMessage.textContent = "Please fill in all fields.";
        errorMessage.classList.remove("hidden");
        return;

    }

    errorMessage.classList.add("hidden");

    alert("Request submitted successfully!");

    requestModal.classList.remove("flex");
    requestModal.classList.add("hidden");

    // Reset the form
    document.getElementById("titleInput").value = "";
    document.getElementById("subjectInput").value = "";
    document.getElementById("difficultyInput").value = "";
    document.getElementById("descriptionInput").value = "";

});
