document.addEventListener('DOMContentLoaded', () => {
    const monsterContainer = document.getElementById('monster-container');
    const createMonsterForm = document.getElementById('create-monster-form');
    const loadMoreButton = document.getElementById('load-more');

    let currentPage = 1;

    // Function to fetch monsters
    const fetchMonsters = async () => {
        const response = await fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`);
        const monsters = await response.json();
        return monsters;
    };

    // Function to render monsters
    const renderMonsters = async () => {
        const monsters = await fetchMonsters();
        monsters.forEach(monster => {
            const monsterElement = document.createElement('div');
            monsterElement.innerHTML = `
                <h3>${monster.name}</h3>
                <p>Age: ${monster.age}</p>
                <p>Description: ${monster.description}</p>
            `;
            monsterContainer.appendChild(monsterElement);
        });
    };

    // Function to handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        const name = event.target.name.value;
        const age = parseFloat(event.target.age.value);
        const description = event.target.description.value;

        const response = await fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ name, age, description })
        });

        const newMonster = await response.json();
        renderNewMonster(newMonster);
        event.target.reset();
    };

    // Function to render a newly created monster
    const renderNewMonster = (monster) => {
        const monsterElement = document.createElement('div');
        monsterElement.innerHTML = `
            <h3>${monster.name}</h3>
            <p>Age: ${monster.age}</p>
            <p>Description: ${monster.description}</p>
        `;
        monsterContainer.prepend(monsterElement);
    };

    // Function to load more monsters
    const loadMoreMonsters = () => {
        currentPage++;
        renderMonsters();
    };

    // Event listeners
    createMonsterForm.addEventListener('submit', handleFormSubmit);
    loadMoreButton.addEventListener('click', loadMoreMonsters);

    // Initial rendering
    renderMonsters();
});