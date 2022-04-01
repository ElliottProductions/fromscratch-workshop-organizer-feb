import { checkAuth, logout, getWorkshops, deleteParticipant } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const createButton = document.getElementById('create');
const workshopsDiv = document.querySelector('.workshop-div');

logoutButton.addEventListener('click', () => {
    logout();
});

createButton.addEventListener('click', () => {
    location.replace('../create');
});


window.addEventListener('load', async () => {
    await displayWorkshops();
});

async function displayWorkshops(){
    workshopsDiv.textContent = '';
    const allWorkshops = await getWorkshops(); //add await

    for (let shop of allWorkshops){ 
        const shopEl = document.createElement('div');
        shopEl.classList.add('shopel');
        const shopLabel = document.createElement('p');
        const participantDiv = document.createElement('div');
        
        shopLabel.textContent = shop.workshop;
        shopEl.append(shopLabel);

        for (let participant of shop.participants){
            const partEl = document.createElement('div');
            partEl.classList.add('crew-card');
            const partName = document.createElement('p');
            const emojiEl = document.createElement('div');

            if (participant.emoji === 1){emojiEl.textContent = '🤵';}
            if (participant.emoji === 2){emojiEl.textContent = '🧝';}
            if (participant.emoji === 3){emojiEl.textContent = '👽';}

            partEl.addEventListener('click', async ()=> {
                await deleteParticipant(participant.id);
                await displayWorkshops();
                
                
            });


            partName.textContent = participant.name;

            partEl.append(partName, emojiEl);
            shopEl.append(partEl);

        }

        shopEl.append(participantDiv);
        workshopsDiv.append(shopEl);

    }
}