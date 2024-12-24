document.addEventListener('DOMContentLoaded', function() {
const form = document.getElementById('survey-form');
const ratingInputs = document.querySelectorAll('.rating input[type="radio"]');
const ratingField = document.getElementById('rating');
const errorMessage = document.getElementById('error-message');
const datetimeField = document.getElementById('datetime');

ratingInputs.forEach(input => {
input.addEventListener('change', function() {
if (this.checked) {
ratingField.value = this.value;
}
});
});

form.addEventListener('submit', function(event) {
event.preventDefault();

const name = document.getElementById('name').value;
const phone = document.getElementById('phone').value;
const email = document.getElementById('email').value;
const rating = ratingField.value;
const comments = document.getElementById('comments').value;

if (!name || !phone || !email || !rating || !comments) {
errorMessage.textContent = "All fields are required";
return;
}

// Get current date and time
const currentDatetime = new Date().toISOString();
datetimeField.value = currentDatetime;

errorMessage.textContent = "";

const data = {
name,
phone,
email,
rating,
comments,
datetime: currentDatetime
};

console.log("Data being sent:", data); // Log data being sent

const fetchOptions = {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(data),
timeout: 30000
};

fetch('http://161.97.164.126:3000/submit-rating', fetchOptions)
.then(response => response.json())
.then(data => {
console.log("Response from server:", data); // Log response from server
if (data.success) {
 alert('Thank you for your feedback!');
 form.reset();
} else {
 errorMessage.textContent = data.message;
}
})
.catch(error => {
console.error('Error:', error);
errorMessage.textContent = 'There was an error submitting your rating.';
});
});
});
