// Calendar data structure
const calendarData = [
    // Example data structure for each day
    {
        day: 1,
        text: "Welcome to day 1!",
        image: "https://via.placeholder.com/150",
        link: "https://example.com"
    }
    // Add more days following the same structure
];

// Create snowflakes
function createSnowflakes() {
    const numberOfSnowflakes = 50;
    for (let i = 0; i < numberOfSnowflakes; i++) {
        createSnowflake();
    }
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animation = `snowfall ${Math.random() * 3 + 2}s linear infinite`;
    snowflake.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(snowflake);

    // Remove snowflake after animation
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
        if (isOpen) {
            box.classList.add('open');
        }

        box.innerHTML = `
            <div class="box-number">${day}</div>
            <div class="box-content">
                <p>Merry Christmas! 🎄</p>
                <img src="https://via.placeholder.com/150" alt="Day ${day}">
                <a href="#" target="_blank">Open Your Gift 🎁</a>
            </div>
        `;

        box.addEventListener('click', handleBoxClick);
        container.appendChild(box);
    });
}

// Function to handle box clicks
function handleBoxClick(event) {
    const box = event.currentTarget;
    const day = parseInt(box.getAttribute('data-day'));
    const today = new Date();
    const december = 11; // December is 11 (0-based months)
    
    // Only allow opening if it's December and the current day is >= the box day
    if (today.getMonth() === december && today.getDate() >= day) {
        box.classList.add('open');
        localStorage.setItem(`day${day}Opened`, 'true');
    } else {
        alert("This gift can't be opened yet! Please wait until December " + day);
    }
}

// Initialize calendar when page loads
document.addEventListener('DOMContentLoaded', () => {
    createCalendarBoxes();
    createSnowflakes();
});
