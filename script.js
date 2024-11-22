// Calendar data structure with provided content
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

// Function to create calendar boxes
function createCalendarBoxes() {
    const container = document.getElementById('calendarContainer');
    const days = Array.from({length: 24}, (_, i) => i + 1);
    const shuffledDays = shuffleArray([...days]);
    
    shuffledDays.forEach(day => {
        const box = document.createElement('div');
        box.className = 'calendar-box';
        box.setAttribute('data-day', day);

        // Check if this box was previously opened
        const isOpen = localStorage.getItem(`day${day}Opened`) === 'true';

        // Get box content
        const boxContent = getBoxContent(day);

        box.innerHTML = `
            <div class="box-number">${day}</div>
            <div class="box-content">
                <p>${boxContent.text}</p>
                <a href="#" class="reveal-btn" data-day="${day}" data-image="${boxContent.image}">Ouvrir 🎁</a>
            </div>
        `;

        // If previously opened, add open class and modify display
        if (isOpen) {
            box.classList.add('open');
            const boxContentElement = box.querySelector('.box-content');
            const boxNumberElement = box.querySelector('.box-number');
            
            boxContentElement.style.display = 'flex';
            boxNumberElement.style.display = 'none';
        }

        box.addEventListener('click', handleBoxClick);
        container.appendChild(box);
    });

    // Create modal for image reveal
    createImageModal();
}

// Function to handle box clicks
function handleBoxClick(event) {
    // Prevent handling if the reveal button was clicked
    if (event.target.classList.contains('reveal-btn')) {
        return;
    }

    const box = event.currentTarget;
    const day = parseInt(box.getAttribute('data-day'));
    const today = new Date();
    const november = 10;
    
    // Check if box is already open
    if (box.classList.contains('open')) {
        return;
    }

    // Only allow opening if it's November 24 and the current day is >= the box day
    // For testing, you might want to comment out this condition
    if (today.getMonth() === november && today.getDate() >= day) {
        // Show box content
        const boxContent = box.querySelector('.box-content');
        const boxNumber = box.querySelector('.box-number');
        
        boxContent.style.display = 'flex';
        boxNumber.style.display = 'none';
        
        box.classList.add('open');
        localStorage.setItem(`day${day}Opened`, 'true');
    } else {
        alert(`Ce cadeau ne peut pas être ouvert maintenant ! Veuillez attendre le ${day} décembre.`);
    }
}

// Function to reset opened boxes
function resetAdventCalendar() {
    // Remove all opened states from localStorage
    for (let i = 1; i <= 24; i++) {
        localStorage.removeItem(`day${i}Opened`);
    }

    // Remove open class from all boxes
    const boxes = document.querySelectorAll('.calendar-box');
    boxes.forEach(box => {
        box.classList.remove('open');
        // Restore box number
        const boxNumber = box.querySelector('.box-number');
        if (boxNumber) {
            boxNumber.style.display = 'block';
        }
    });

    alert("Le calendrier de l'Avent a été réinitialisé !");
}

// Create image modal
function createImageModal() {
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <img id="modalImage" src="" alt="Advent Calendar Image">
        </div>
    `;
    document.body.appendChild(modal);

    // Add event listeners to reveal buttons
    document.querySelectorAll('.reveal-btn').forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            const imageSrc = this.getAttribute('data-image');
            const modal = document.getElementById('imageModal');
            const modalImage = document.getElementById('modalImage');
            
            modalImage.src = imageSrc;
            modal.style.display = 'block';
        });
    });

    // Close modal when clicking close button
    document.querySelector('.close-btn').addEventListener('click', () => {
        document.getElementById('imageModal').style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('imageModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Add reset button to the page
function addResetButton() {
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Réinitialiser le calendrier';
    resetButton.className = 'reset-button';
    resetButton.addEventListener('click', resetAdventCalendar);
    
    // Add button just after the title
    const title = document.querySelector('h1');
    title.insertAdjacentElement('afterend', resetButton);
}

// Initialize calendar when page loads
document.addEventListener('DOMContentLoaded', () => {
    createCalendarBoxes();
    createSnowflakes();
    addResetButton();
});
