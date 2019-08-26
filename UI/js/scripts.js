
const validate = () => {
  let msg = '';
  const fnames = document.querySelector('#fullname').value;
  const uname = document.querySelector('#username').value;
  const email = document.querySelector('#usermail').value;
  const pswd = document.querySelector('#userpswd').value;
  const repswd = document.querySelector('#confpswd').value;
  // let exp =" /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/";
  // var patt = new RegExp(exp);
  if (fnames === '' || uname === '' || email === '' || pswd === '' || repswd === '') {
    msg = 'Please fill out all required fields';

    dialogbox(msg);
  }
};
const check = () => {
  let msg = '';
  const email = document.querySelector('#ermail').value;
  const pswd = document.querySelector('#pswd').value;
  // let exp =" /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/";
  // var patt = new RegExp(exp);
  if (email === '' || pswd === '') {
    msg = 'Please fill out all required fields';

    dialogbox(msg);
  }
};

let dialogbox = (message) => { // Get the modal
  const modal = document.querySelector('#dialogbox');

  const divMsg = document.querySelector('.dialog-content-js');


  divMsg.textContent = message;
  // Display the modal
  modal.style.display = 'block';
};
// Function close the dialog box
const closeDialog = () => {
  document.querySelector('.modal').style.display = 'none';
  const modal = document.querySelector('#dialogbox');
  modal.style.display = 'none';
};

// Side Navigation
const openNav = () => {
  document.getElementById('mySidenav').style.width = '250px';
};

const closeNav = () => {
  document.getElementById('mySidenav').style.width = '0';
};

// Create a trip
const createTrip = () => {
  // document.querySelector('.modal').style.display="block";
  document.querySelector('.modal').style.display = 'block';
};
// close Create trip Modal
const closecreateTrip = () => {
  // document.querySelector('.modal').style.display="block";
  document.querySelector('.modal-new-trip').style.display = 'none';
};
// edit a trip
const editTrip = () => {
  document.querySelector('.modal-edit').style.display = 'block';
};
const saveTrip = () => {

};
// close editing modal
const closeModalEdit = () => {
  document.querySelector('.modal-edit').style.display = 'none';
};
// view a trip
const viewTrip = () => {
  document.querySelector('.modal-view').style.display = 'block';
};


const closeModalView = () => {
  document.querySelector('.modal-view').style.display = 'none';
};
const bookTrip = () => {

};
// View Booking
const viewBooking = () => {
  document.querySelector('.modal-view').style.display = 'block';
};

// Cancel Trip
const cancelTrip = () => {

};
// view a user
const viewUser = () => {
  document.querySelector('.modal-view').style.display = 'block';
};
const createBooking = () => {
  document.querySelector('.modal-edit').style.display = 'block';
};
const cancelBooking = () => {
  document.querySelector('.modal').style.display = 'block';
};
