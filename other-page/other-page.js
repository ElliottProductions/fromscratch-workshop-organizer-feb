import { checkAuth, logout, getWorkshops } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const workshopsDiv = document.querySelector('.workshop-div');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async () => {
    await displayWorkshops();
});

async function displayWorkshops(){
    const allWorkshops = await getWorkshops();

    for (let shop of allWorkshops){
        const shopEl = document.createElement('div');
        const shopLabel = document.createElement('p');
        
        shopLabel.textContent = shop.name;

        shopEl.append(shopLabel);
        workshopsDiv.append(shopEl);

    }
}