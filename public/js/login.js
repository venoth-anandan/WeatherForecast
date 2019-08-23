const loginForm = document.querySelector("#loginForm");
const inputUsername  = document.querySelector("#inputUsername");
const inputPassword  = document.querySelector("#inputPassword");

loginForm.addEventListener('submit' , (e) =>{
    e.preventDefault();
    console.log("Entered username "+inputUsername)
})