var emailIn = document.getElementById('emailIn');
var passIn = document.getElementById('passIn');
var submitBtn = document.getElementById('submitBtn');
var nameUs = document.getElementById('nameUs');
var confirmPass = document.getElementById('confirmpass');
var ofName = document.querySelector('.of-name');
var ofNameLogin = document.querySelector('.of-name-login');
var logoutBtn = document.getElementById('logoutBtn');
var myusername = document.getElementById('myusername');
var errorPage = document.getElementById('error');
var togglePass = document.getElementById('toggle-pass');
var toggleConPass = document.getElementById('toggle-conpass');
var inputs = [nameUs, emailIn, passIn, confirmPass];
var myRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$%^&*])/;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var arrEmails = JSON.parse(localStorage.getItem('arrEmails')) || [];


// =============Email excitance checker================
function excite(arrEmails, email) {
    return arrEmails.some(function (item) {
        return item.email === email;
    });
};

// =============Password excitance checker================
function emailPassMatch(arrEmails, pass, email) {
    return arrEmails.some(function (item) {
        return item.pass === pass && item.email == email;
    });
};

// =============Geting the values and Check excitance to sign up===========
function getValues() {
    var personalValues = {
        name: nameUs.value,
        email: emailIn.value,
        pass: passIn.value,
        confPass: confirmPass.value
    };
    if (nameUs.value.trim() != "" && emailIn.value.trim() != "" && passIn.value.trim() != '' && confirmPass.value.trim() != "" && nameUs.value.length > 3 && passIn.value.length >= 8) {
        if (myRegex.test(passIn.value)) {
            if (emailRegex.test(emailIn.value)) {
                if (!excite(arrEmails, personalValues.email) && confirmPass.value == passIn.value) {
                    arrEmails.push(personalValues);
                    localStorage.setItem('arrEmails', JSON.stringify(arrEmails));
                    ofName.style.display = "none";
                    clearsignup();
                    location.href = ("https://hossamfarrag20.github.io/Sign-Up/index.html");
                } else if (excite(arrEmails, personalValues.email)) {
                    ofName.innerHTML = `Email Already Excite`;
                    emailIn.classList.add('is-invalid');
                }
            } else {
                ofName.innerHTML = `Email is not valid`;
            }
            if (confirmPass.value != passIn.value) {
                ofName.innerHTML = `Password Dose not match`;
                confirmPass.classList.add('is-invalid');
            }
            if (nameUs.value.length < 3) {
                nameUs.classList.add('is-invalid');
            }
        } else {
            ofName.innerHTML = `The Password Must Include at least one Small and Captal Letter, and one of these [#@$%^&*] at least`
            passIn.classList.add('is-invalid');
            confirmPass.classList.add('is-invalid');
        }
    } else {
        ofName.innerHTML = `You should not leave any Empty Input`;
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value == "") {
                inputs[i].classList.add('is-invalid');
            }
        }
    }
};

// ============ clearing  sign up function ===========
function clearsignup() {
    emailIn.value = "";
    passIn.value = "";
    nameUs.value = "";
    confirmPass.value = "";
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].classList.contains('is-invalid')) {
            inputs[i].classList.remove('is-invalid');
        }
    }

};
function clearLogIn() {
    emailIn.value = "";
    passIn.value = "";
}

// ==============the main action================
if (location.href === ("https://hossamfarrag20.github.io/Sign-Up/signup.html")) {

    submitBtn.addEventListener('click', function () {
        getValues();
        console.log(arrEmails);
    });
    togglePass.addEventListener('click', function () {
        if (passIn.type == 'password') {
            passIn.type = 'text';
            togglePass.classList.replace(`fa-eye`, `fa-eye-slash`);
        }
        else {
            passIn.type = 'password';
            togglePass.classList.replace(`fa-eye-slash`, `fa-eye`);
        }
    });

    toggleConPass.addEventListener('click', function () {
        if (confirmPass.type == 'password') {
            confirmPass.type = 'text';
            toggleConPass.classList.replace(`fa-eye`, `fa-eye-slash`);
        }
        else {
            confirmPass.type = 'password';
            toggleConPass.classList.replace(`fa-eye-slash`, `fa-eye`);
        }

    });
}
else if (location.href === ("https://hossamfarrag20.github.io/Sign-Up/index.html")) {
    togglePass.addEventListener('click', function () {
        if (passIn.type == 'password') {
            passIn.type = 'text';
            togglePass.classList.replace(`fa-eye`, `fa-eye-slash`);
        }
        else {
            passIn.type = 'password';
            togglePass.classList.replace(`fa-eye-slash`, `fa-eye`);
        }
    });
    submitBtn.addEventListener('click', function () {
        getLogin();
    });
}
else if (location.href === ("https://hossamfarrag20.github.io/Sign-Up/home.html")) {
    getDate();
    setInterval(getDate, 1000);
    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUserEmail');
        errorPage.classList.add('d-none');
        location.assign("https://hossamfarrag20.github.io/Sign-Up/index.html");
        location.replace = "https://hossamfarrag20.github.io/Sign-Up/index.html";

    });

    if (localStorage.getItem('isLoggedIn') != 'true') {
        location.href = "https://hossamfarrag20.github.io/Sign-Up/index.html";
    } else {
        getUserName();
    }
};

// ===========login Page==============
function getLogin() {
    var personalValues = {
        email: emailIn.value,
        pass: passIn.value
    };
    if (excite(arrEmails, personalValues.email)) {
        if (emailPassMatch(arrEmails, personalValues.pass, personalValues.email)) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('emailid', personalValues.email);
            location.href = ("https://hossamfarrag20.github.io/Sign-Up/home.html");
            clearLogIn();
            errorPage.classList.remove('d-none');
            errorPage.classList.add('d-block');
        } else {
            ofNameLogin.innerHTML = `Wrong Password! Please Retype it`;
        }
    } else {
        ofNameLogin.innerHTML = `Email Dose Not Excite, Please SignUp`;
    }
};

function getUserName() {
    var getTheEmail = localStorage.getItem('emailid');
    if (getTheEmail) {
        for (var i = 0; i < arrEmails.length; i++) {
            if (arrEmails[i].email === getTheEmail) {
                myusername.innerHTML = arrEmails[i].name;
                break;
            }
        }
    }
};

// =======================================================================================================================================
// ============================================================ For Design ===============================================================
// =======================================================================================================================================

var myQuote = document.getElementById('quoteHere');
var myQuote2 = document.getElementById('quoteHere2');
// var questsArea = document.querySelector('.quests-container');

var checker = [];

function getQuote() {
    var quotes = ["Be yourself; everyone else is already taken.",
        "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
        "So many books, so little time.",
        "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
        "A room without books is like a body without a soul.",
        "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
        "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
        "You only live once, but if you do it right, once is enough.",
        "Be the change that you wish to see in the world.",
        "In three words I can sum up everything I've learned about life: it goes on.",
        "If you tell the truth, you don't have to remember anything.",
        "You must be the change you wish to see in the world.",
        "The only thing we have to fear is fear itself.",
        "Do one thing every day that scares you.",
        "Well done is better than well said.",
        "It is during our darkest moments that we must focus to see the light.",
        "The believer who mixes with people and endures their injury is better than the person who does not mix with people nor endure their injury.",
        "Let none of you be prevented by his youth from expressing his opinion, for knowledge is not contingent upon youth or old age, but Allah places it wherever He wills.",
        "Don't underestimate your ambitions, for I have seen nothing that hinders a man more than the downfall of his ambition.",
        "Whoever keeps a secret has the upper hand."];
    var quotesMaker = ["― Oscar Wilde",
        "― Marilyn Monroe",
        "― Frank Zappa",
        "― Albert Einstein",
        "― Marcus Tullius Cicero",
        "― Bernard M. Baruch",
        "― Dr. Seuss",
        "― Mae West",
        "― Mahatma Gandhi",
        "― Robert Frost",
        "― Mark Twain",
        "-Mahatma Gandhi",
        "-Franklin D. Roosevelt",
        "-Eleanor Roosevelt",
        "-Benjamin Franklin",
        "-Aristotle",
        "Prophet Mohamed",
        "― Omer Ebn EL-Khattab",
        "― Omer Ebn EL-Khattab",
        "― Omer Ebn EL-Khattab"];

    var num = Math.floor(Math.random() * quotes.length);
    if (num == checker[checker.length - 1]) {
        num++;
        if (num >= quotes.length) {
            num = num - 2;
        }
    }

    checker.push(num);
    myQuote.innerHTML = quotes[num];
    myQuote2.innerHTML = quotesMaker[num];
    // console.log(num, quotes[num], quotesMaker[num]);
    // questsArea.style.height = 160 + "px";
}
//  ============Date and time============
function getDate() {
    var dateTime = new Date();
    var hours = dateTime.getHours();
    var minuts = dateTime.getMinutes();
    var seconds = dateTime.getSeconds();
    if (hours > 12) {
        hours = hours - 12;
    }

    const currentDate = dateTime.toDateString().split(" ");
    var months = document.querySelector('.months');
    var day = document.querySelector('.day-count');
    months.innerHTML = currentDate[1];
    day.innerHTML = currentDate[2]


    var timeNow = document.querySelectorAll('.gettime p');
    if (timeNow.length > 0) {
        timeNow[0].innerHTML = hours;
        timeNow[1].innerHTML = minuts;
        timeNow[2].innerHTML = seconds;
    };
};
