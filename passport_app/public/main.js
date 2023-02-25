const text = document.querySelector('.content');
const date = new Date();

text.textContent = `Today's date and current time is ${date.toDateString()} - ${date.toLocaleTimeString()}`;

