import { checkAuth, logout, getWorkshops, createParticipant } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const createDiv = document.querySelector('.create-div');
const workshopDropdown = document.querySelector('.workshop-dropdown');
const emojidropDown = document.querySelector('.emoji-menu');
const form = document.querySelector('.create-form');

logoutButton.addEventListener('click', () => {
    location.replace('../other-page');
});

window.addEventListener('load', async () => {
    await displayCreate();
});

form.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const data = new FormData(form);

    await createParticipant(data.get('name'), emojidropDown.value, workshopDropdown.value);

    form.reset();
});

async function displayCreate(){
    const allWorkshops = await getWorkshops();

    for (let shop of allWorkshops){
        const optionEl = document.createElement('option');
        optionEl.textContent = shop.workshop;
        optionEl.value = shop.id;

        console.log('for loop');
        workshopDropdown.append(optionEl);
    }
    
}