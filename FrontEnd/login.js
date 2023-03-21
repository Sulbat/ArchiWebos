// permet de charger le javascipt après le html css
window.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");
  const loginButton = document.getElementById("loginButton");
  const loginErrorMsg = document.querySelector(".login-error-msg");

  // envent listener sur l'envoi en asynchrone
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    console.log(email, password);

    loginButton.innerHTML = " ";
    loginButton.setAttribute("disabled", true);

    // envoi des données à l'API
    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      loginButton.innerHTML += "";
      if (!response.ok) {
        throw new Error("Echec de la connexion");
      }

      const { userId, token } = await response.json();

      // pour que l'utilisateur ne soit pas logout automatiquement après fermeture de la page par exemple
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
      console.log(userId, token);

      // envoi vers l'index
      window.location.href = "index.html";
    } catch (error) {
      console.log(error);
      loginErrorMsg.style.display = "block";
      loginButton.innerHTML += "Erreur dans l’identifiant ou le mot de passe";
      loginButton.removeAttribute("disabled");
    }
  });
});
