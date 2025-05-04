//When loads fades in 

// window.addEventListener('click', () => {
//     const contentDiv = document.getElementsByClassName('carousel-indicators');
//     contentDiv.classList.add('fade-in');
// });


window.addEventListener('load', () => {
    const contentDiv = document.getElementById('content');
    contentDiv.classList.add('fade-in');
});


//Back to top button
window.addEventListener('scroll', () => {
    const backToTopButton = document.querySelector('.back-to-top');
    if (window.scrollY > 200) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

//login and register
document.addEventListener('DOMContentLoaded', () => {
    updateDropdown();
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleSignup);
    document.getElementById('logoutOption').addEventListener('click', logout);
});

// Regex Patterns
const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

// Function to handle user registration (Sign-up)
function handleSignup(event) {
    event.preventDefault();
    const enteredUsername = document.getElementById('registerName').value;
    const enteredEmail = document.getElementById('registerEmail').value;
    const enteredPassword = document.getElementById('registerPassword').value;

    if (!validateInputs(enteredUsername, enteredEmail, enteredPassword)) {
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.email === enteredEmail)) {
        alert("User already registered! Please log in.");
        return;
    }

    users.push({ username: enteredUsername, email: enteredEmail, password: enteredPassword });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Signup successful! Please log in.");
    document.getElementById('registerForm').reset();
    bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
}

// Function to handle user login
function handleLogin(event) {
    event.preventDefault();
    const enteredEmail = document.getElementById('loginEmail').value;
    const enteredPassword = document.getElementById('loginPassword').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    let existingUser = users.find(user => user.email === enteredEmail && user.password === enteredPassword);
    
    if (!existingUser) {
        alert("Invalid email or password!");
        return;
    }

    saveUser(existingUser.username, existingUser.email);

    document.getElementById('loginForm').reset();
    bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
}

// Function to validate user inputs using RegEx
function validateInputs(username, email, password) {
    if (!usernameRegex.test(username)) {
        alert("Invalid username! Use 3-15 letters or numbers.");
        return false;
    }
    if (!emailRegex.test(email)) {
        alert("Invalid email format!");
        return false;
    }
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 6 characters long and include a number.");
        return false;
    }
    return true;
}

// Function to save user authentication in Cookies
function saveUser(username, email) {
    document.cookie = `isLoggedIn=true; path=/;`;
    document.cookie = `userName=${username}; path=/;`;
    document.cookie = `userEmail=${email}; path=/;`;
    updateDropdown();
}

// Function to get user from Cookies
function getUser() {
    let cookies = document.cookie.split('; ');
    let user = { isLoggedIn: false, userName: '', userEmail: '' };

    cookies.forEach(cookie => {
        let [key, value] = cookie.split('=');
        if (key === 'isLoggedIn') user.isLoggedIn = value === 'true';
        if (key === 'userName') user.userName = value;
        if (key === 'userEmail') user.userEmail = value;
    });

    return user;
}

// Function to logout (Clears Cookies but not Local Storage)
function logout() {
    document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    updateDropdown();
}

// Function to update UI based on authentication state
function updateDropdown() {
    let user = getUser();

    document.getElementById('loginOption').style.display = user.isLoggedIn ? 'none' : 'block';
    document.getElementById('signupOption').style.display = user.isLoggedIn ? 'none' : 'block';
    document.getElementById('nameOption').style.display = user.isLoggedIn ? 'block' : 'none';
    document.getElementById('userName').textContent = user.userName;
    document.getElementById('emailOption').style.display = user.isLoggedIn ? 'block' : 'none';
    document.getElementById('userEmail').textContent = user.userEmail;
    document.getElementById('logoutOption').style.display = user.isLoggedIn ? 'block' : 'none';
}

//accordion 
function toggleAccordion(id) {
    const bodies = document.querySelectorAll('.accordion-body');
    bodies.forEach(body => {
        if (body.id === id) {
            body.style.display = body.style.display === 'block' ? 'none' : 'block';
        } else {
            body.style.display = 'none';
        }
    });
}

//contact us
function sendMessage(event) {
    event.preventDefault();
    alert('Message sent');
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}

var Button = document.getElementById('img');
Button.addEventListener('click', function(){
    Element.classList.add('fade-in');
});
Button.style.animation = 'fadein 2s ease-in-out';