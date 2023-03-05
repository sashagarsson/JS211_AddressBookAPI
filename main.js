
    
'use strict';

let contactArray;
window.onload = function () {
  getAddress();
};

const getAddress = () => {
  fetch('https://randomuser.me/api/?results=200')

    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })

    .then((address) => {
      contactArray = address.results;
      displayContacts(contactArray);
      const contactButton = document.querySelectorAll('.btn');
      contactButton.forEach((button) => {
        button.addEventListener('click', (event) => {
          const contactNumber = button.className.split('-')[2];
          const contactInfo = document.querySelector(`.card-${contactNumber}`);
          contactInfo.classList.toggle('visible');
          if (contactInfo.classList.value.includes('visible')) {
            button.innerHTML = 'Show Less';
          } else {
            button.innerHTML = 'Show More';
          }
        });
      });
    })
    .catch((err) => {
      console.log('Error');
      console.log(err);
    });
};

const displayContacts = (array) => {
  array.map((contact, index) => {
    const displayUser = document.getElementById('page-container');
    const html = `
    <div id="card-container">
    <div class="contact-header">
      <picture>
        <img src="${
          contact.picture.large
        }" alt="user image" class="user-image" />
      </picture>
      <h2>${contact.name.first} ${contact.name.last}</h2>
      <p>(${contact.gender})</p>
    </div>
    <div class="contact-info card-${index + 1}">
      <h6 class="email">${contact.email}</h6>
      <h6>${contact.phone} (home)</h6>
      <h6>${contact.cell} (cell)</h6>
      <h6>${contact.location.street.number} ${contact.location.street.name}</h6>
      <h6>${contact.location.city}, ${contact.location.state} ${
      contact.location.postcode
    }</h6>
      </div>
      <button class="btn contact-button-${index + 1}">Show More</button>  
    </div>
    </div>
    </div>
    `;
    displayUser.insertAdjacentHTML('afterbegin', html);
  });
};