// Calendar data
const calendarData = [
    { day: 1, text: "Le refuge des miettes", image: "1.jpg" },
    { day: 2, text: "Le quartier général des ustensiles du quotidien", image: "2.jpg" },
    // ... (add more entries for days 3–24 as needed)
];

// Create calendar boxes
function createCalendarBoxes() {
    const container = document.getElementById('calendarContainer');
    calendarData.forEach(({ day, text, image }) => {
        const box = document.createElement('div');
        box.classList.add('calendar-box');
        box.dataset.day = day;

        // Box number
        const boxNumber = document.createElement('div');
        boxNumber.classList.add('box-number');
        boxNumber.textContent = day;

        // Hidden content
        const boxContent = document.createElement('div');
        boxContent.classList.add('box-content');
        boxContent.innerHTML = `
            <p>${text}</p>
            <a href="${image}" target="_blank">Voir l'image 🎁</a>
        `;

        // Append elements
        box.appendChild(boxNumber);
        box.appendChild(boxContent);
        container.appendChild(box);

        // Add click event
        box.addEventListener('click', () => revealBox(box));
    });
}

// Reveal box content
function revealBox(box) {
    if (box.classList.contains('open')) return; // Skip if already opened

    const day = parseInt(box.dataset.day, 10);
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();

    // Restrict based on date
    if (currentMonth !== 11 || day > currentDay) {
        alert(`Ce cadeau ne peut pas être ouvert maintenant ! Veuillez attendre le ${day} décembre.`);
        return;
    }

    box.classList.add('open'); // Add open class
    localStorage.setItem(`day${day}Opened`, 'true'); // Persist state
}

// Load previously opened boxes
function loadOpenedBoxes() {
    const boxes = document.querySelectorAll('.calendar-box');
    boxes.forEach(box => {
        const day = parseInt(box.dataset.day, 10);
        if (localStorage.getItem(`day${day}Opened`) === 'true') {
            box.classList.add('open');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createCalendarBoxes();
    loadOpenedBoxes();
});
