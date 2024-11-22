// Calendar data
const calendarData = [
    { day: 1, text: "Le refuge des miettes", image: "1.jpg" },
    { day: 2, text: "Le quartier général des ustensiles du quotidien", image: "2.jpg" },
     { day: 3, text: "Là ou les apéros commencent", image: "3.jpg" },
    { day: 4, text: "Là oú l'eau chaude fait chanter les arômes", image: "4.jpg" },
    { day: 5, text: "Sous la lumière studieuse", image: "5.jpg" },
    { day: 6, text: "Passera bientot de 2D à 3D", image: "6.jpg" },
    { day: 7, text: "Je me cache au seuil de tous les départs", image: "7.jpg" },
    { day: 8, text: "Là ou l'hiver cache ses trésors oubliés", image: "8.jpg" },
    { day: 9, text: "Le royaume de la glace", image: "9.jpg" },
    { day: 10, text: "Une cachette mobile pour un trésor immobile", image: "10.jpg" },
    { day: 11, text: "Là ou les produits se bousculent pour briller", image: "11.jpg" },
    { day: 12, text: "Un parfum de vécu s'y mélange", image: "12.jpg" },
    { day: 13, text: "Dans le confort des plumes", image: "13.jpg" },
    { day: 14, text: "Au royaume des racines", image: "14.jpg" },
    { day: 15, text: "Au portail de téleportation des chaussettes", image: "15.jpg" },
    { day: 16, text: "Au dela de ce qui te fixe", image: "16.jpg" },
    { day: 17, text: "A mi chemin entre Vargas et Voltaire", image: "17.jpg" },
    { day: 18, text: "Là ou le fromage fait la loi", image: "18.jpg" },
    { day: 19, text: "Là ou chaque matin commence avec un choix", image: "19.jpg" },
    { day: 20, text: "Là ou gauche et droite se retrouvent en cachette", image: "20.jpg" },
    { day: 21, text: "Là ou les gateaux se lévent", image: "21.jpg" },
    { day: 22, text: "L'antre des moutons … de poussière!", image: "22.jpg" },
    { day: 23, text: "Elle fait danser les murs", image: "23.jpg" },
    { day: 24, text: "La magie des repas y mijote lentement.", image: "24.jpg" }
];

// Create snowflakes
function createSnowflakes() {
    const numberOfSnowflakes = 100;
    for (let i = 0; i < numberOfSnowflakes; i++) {
        createSnowflake();
    }
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = '❄️';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.top = '-10px'; // Start from top of the screen
    snowflake.style.fontSize = (Math.random() * 10 + 5) + 'px'; // Varying sizes
    snowflake.style.opacity = Math.random();
    snowflake.style.animationDuration = (Math.random() * 5 + 3) + 's';
    document.body.appendChild(snowflake);

    // Remove snowflake after animation and create a new one
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
        createSnowflake();
    });
}

// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to get box content for a specific day
function getBoxContent(day) {
    const boxData = calendarData.find(item => item.day === day);
    return boxData || { text: "Surprise!", image: "placeholder.jpg" };
}

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
    if (currentMonth !== 10 || day > currentDay) {
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
