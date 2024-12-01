// Calendar data
const calendarData = [
    { day: 1, text: "Le refuge des miettes"},
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

// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

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
    snowflake.style.top = '-10px'; // Start from the top
    snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
    snowflake.style.opacity = Math.random();
    snowflake.style.animationDuration = (Math.random() * 5 + 3) + 's';
    document.body.appendChild(snowflake);

    // Remove and recreate after animation
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
        createSnowflake();
    });
}

// Create calendar boxes
function createCalendarBoxes() {
    const container = document.getElementById('calendarContainer');
    // Clear any existing content to avoid duplication
    container.innerHTML = '';
    const shuffledData = shuffleArray([...calendarData]);

    shuffledData.forEach(({ day, text, image }) => {
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
        `;

        box.appendChild(boxNumber);
        box.appendChild(boxContent);
        container.appendChild(box);

        // Click functionality
        box.addEventListener('click', () => revealBox(box));
    });
}

// Reveal box content
function revealBox(box) {
    if (box.classList.contains('open')) return;

    const day = parseInt(box.dataset.day, 10);
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();

    if (currentMonth !== 11 || day > currentDay) {
        alert(`Petite curieuse !! Attends le ${day} décembre.`);
        return;
    }

    box.classList.add('open');
    localStorage.setItem(`day${day}Opened`, 'true');
}

// Load previously opened boxes
function loadOpenedBoxes() {
    document.querySelectorAll('.calendar-box').forEach(box => {
        const day = parseInt(box.dataset.day, 10);
        if (localStorage.getItem(`day${day}Opened`) === 'true') {
            box.classList.add('open');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createCalendarBoxes();
    createSnowflakes();
    loadOpenedBoxes();
});
// Function to reset all opened boxes
function resetCalendar() {
    // Clear localStorage for all days
    for (let i = 1; i <= 24; i++) {
        localStorage.removeItem(`day${i}Opened`);
    }

    // Remove the "open" class from all boxes
    document.querySelectorAll('.calendar-box').forEach(box => {
        box.classList.remove('open');
    });

    alert("Le calendrier a été réinitialisé !");
}

// Add a reset button to the DOM
function addResetButton() {
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Réinitialiser le calendrier';
    resetButton.className = 'reset-button';
    resetButton.addEventListener('click', resetCalendar);

    // Append the button below the title
    const title = document.querySelector('h1');
    title.insertAdjacentElement('afterend', resetButton);
}

// Modify initialization to include reset button
document.addEventListener('DOMContentLoaded', () => {
    createCalendarBoxes();
    createSnowflakes();
    loadOpenedBoxes();
    addResetButton(); // Add the reset button to the page
});
