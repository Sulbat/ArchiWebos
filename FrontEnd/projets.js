// permet de charger le javascipt après le html css
window.addEventListener("DOMContentLoaded", () => {
  
  fetch("http://localhost:5678/api/works")
    // On convertit la réponse en JSON
    .then((response) => response.json())
    .then((data) => {
      show(data);

      //Filtres
      const allFilter = document.querySelector(".tous");
      const objectFilter = document.querySelector(".objets");
      const apartmentFilter = document.querySelector(".appartements");
      const hotelRestaurantFilter = document.querySelector(".hotel");

      //Tous (avec fonction anonyme)
      allFilter.addEventListener("click", function () {
        const figures = document.querySelectorAll("figures");
        for (const figure of figures) {
          figure.style.display = "block";
        }
      });

      //Objets
      objectFilter.addEventListener("click", function () {
        const figures = document.querySelectorAll("figures");
        for (const figure of figures) {
          if (figure.querySelector("img").names === "Objets") {
            figure.style.display = "block";
          } else {
            figure.style.display = "none";
          }
        }
      });

      // Appartements
      apartmentFilter.addEventListener("click", function () {
        const figures = document.querySelectorAll("figures");
        for (const figure of figures) {
          if (figure.querySelector("img").names === "Appartements") {
            figure.style.display = "block";
          } else {
            figure.style.display = "none";
          }
        }
      });

      // Hotels & Restaurants
      hotelRestaurantFilter.addEventListener("click", function () {
        const figures = document.querySelectorAll("figures");
        for (const figure of figures) {
          if (figure.querySelector("img").names === "Hotels & restaurants") {
            figure.style.display = "block";
          } else {
            figure.style.display = "none";
          }
        }
      });
    });

  // Ajout des projets au DOM
  const show = (data) => {
    // On boucle sur les données
    for (const item of data) {
      // On crée une nouvelle figure
      const figure = document.createElement("figures");

      // On crée la balise image
      const img = document.createElement("img");
      img.src = item.imageUrl;
      img.alt = item.title;
      img.names = item.category.name;
      console.log(img.names);

      // On crée la balise légende
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = item.title;

      // On ajoute l'image et la légende à la figure
      figure.appendChild(img);
      figure.appendChild(figcaption);

      // On ajoute la figure au conteneur "gallery"
      document.querySelector(".gallery").appendChild(figure);
    }
  };
});

// Ajout du bouton modifier si utilisateur login
function connectedUser() {
  const token = localStorage.getItem("token");
  const btnModifier = document.getElementById("modifier");
  const fontBtn = document.querySelector(".fa-sharp");
  if (token) {
    const login = document.querySelector(".login");
    const logout = document.querySelector(".logout");
    const filtersDiv = document.querySelector(".filtres");

    // Si utilisateur est connecté cf token alors :
    filtersDiv.style.display = "none";
    login.style.display = "none";
    logout.style.display = "block";
    btnModifier.style.display = "block";
    fontBtn.style.display = "block";

    console.log(token);

    // Ajouter les éléments d'édition si l'utilisateur est connecté
    const blackHeadbandElement = document.createElement("div");
    blackHeadbandElement.classList.add("admin-headband");

    const editionModeElement = document.createElement("div");
    editionModeElement.classList.add("edition-mode");
    editionModeElement.innerHTML = `<i class="fa-sharp fa-regular fa-pen-to-square"></i><span>Mode édition</span>`;

    const publishEditElement = document.createElement("button");
    publishEditElement.innerHTML = "publier les changements";

    blackHeadbandElement.appendChild(editionModeElement);
    blackHeadbandElement.appendChild(publishEditElement);

    const bodyElement = document.getElementsByTagName("body");
    bodyElement[0].prepend(blackHeadbandElement);
  } else {
    btnModifier.style.display = "none";
    fontBtn.style.display = "none";
  }
}

connectedUser();

//Quand l'utilisateur clique sur logout

function logout() {
  const logout = document.querySelector(".logout");
  logout.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "index.html";
  });
}
logout();

// Récupération des éléments nécessaires
const modifier = document.getElementById("modifier");
const modal = document.getElementById("modal");
const close = document.getElementsByClassName("close")[0];

// Fonction pour afficher la fenêtre modale
function openModal() {
  modal.style.display = "block";
}

// Fonction pour masquer la fenêtre modale
function closeModal() {
  modal.style.display = "none";
}

// Gestionnaire d'événements pour afficher la fenêtre modale
modifier.addEventListener("click", function (event) {
  event.preventDefault();
  openModal();
});

// Gestionnaire d'événements pour masquer la fenêtre modale lorsqu'on clique sur le bouton "x"
close.addEventListener("click", function (event) {
  event.preventDefault();
  closeModal();
});

// Gestionnaire d'événements pour masquer la fenêtre modale lorsqu'on clique en dehors de la zone modale
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    closeModal();
  }
});

fetch("http://localhost:5678/api/works")
  .then((response) => response.json()) // On convertit la réponse en JSON
  .then((data) => {
    // On crée un tableau pour stocker les images
    const images = [];

    // On boucle sur les données
    for (const item of data) {
      // On crée une nouvelle figure
      const figure = document.createElement("figures");

      // On crée l'image
      const img = document.createElement("img");
      img.src = item.imageUrl;
      img.alt = item.title;
      img.names = item.category.name;
      img.id = item.id;
      console.log(img.names);
      img.setAttribute("crossorigin", "anonymous"); // Ajout du tag "crossorigin"

      // On ajoute l'image au tableau
      images.push(img);

      // On crée la légende
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = item.title;

      // On ajoute l'image et la légende à la figure
      figure.appendChild(img);
      figure.appendChild(figcaption);
    }

    // On écoute l'événement clic sur le bouton "Modifier"
    modifier.addEventListener("click", function (event) {
      event.preventDefault();
      displayGalleryImages(images);
      openModal();
    });
  });

function displayGalleryImages(images) {
  const modalBody = document.querySelector(".modal-body");
  const tokens = localStorage.getItem("token");
  modalBody.innerHTML = "";

  images.forEach((image) => {
    // Créer le conteneur de l'image et de l'icône de suppression
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    // Créer l'élément image
    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;
    img.id = image.id;
    img.classList.add("modal-image");
    img.setAttribute("crossorigin", "anonymous"); // Ajout du tag "crossorigin"

    // Ajouter l'élément image au conteneur
    imageContainer.appendChild(img);

    // Ajouter le texte "éditer" en bas de chaque image
    const editSpan = document.createElement("span");
    editSpan.textContent = "éditer";
    imageContainer.appendChild(editSpan);

    // Créer l'icône de suppression
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");

    // Ajouter l'icône de suppression au conteneur
    imageContainer.appendChild(deleteIcon);

    // Ajouter le conteneur d'image au corps de la modale
    modalBody.appendChild(imageContainer);

    deleteIcon.addEventListener("click", function () {
      // Récupération de l'index de l'image dans le tableau
      const index = images.indexOf(image);

      // Demande de confirmation
      if (confirm("Voulez-vous vraiment supprimer cette image ?")) {
        // Suppression de l'image de la galerie
        images.splice(index, 1);

        // Suppression de l'élément de la modale
        const parent = deleteIcon.parentElement;
        parent.remove();

        // Suppression de l'image depuis l'API
        const options = {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + tokens,
          },
        };

        fetch(`http://localhost:5678/api/works/${img.id}`, options)
          .then((response) => {
            if (response.ok) {
              console.log("Image supprimée avec succès");

              // Suppression de l'image du DOM
              const imageElement = document.getElementById(image.id);
              if (imageElement) {
                imageElement.parentNode.remove();
              }
            } else {
              console.log("Une erreur est survenue");
            }
          })
          .catch((error) => {
            console.error("Une erreur est survenue", error);
          });
      }
    });
  });
}

const addPhotoBtn = document.querySelector("#ajouter-photo");
addPhotoBtn.addEventListener("click", () => {
  const addPhotoModal = document.querySelector("#add-photo-modal");
  addPhotoModal.style.display = "block";
});

const addPhotoForm = document.querySelector("#add-photo-form");
addPhotoForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Récupérer les données du formulaire
  const title = document.querySelector("#title").value;
  const category = document.querySelector("#category").value;
  const image = document.querySelector("#image").files[0];

  let categoryId;

  console.log(categoryId, category);

  switch (category) {
    case "Objets":
      categoryId = 1;
      break;
    case "Appartements":
      categoryId = 2;
      break;
    case "Hotel_Restaurant":
      categoryId = 3;
      break;
    default:
      categoryId = 1; // ou une autre valeur par défaut
  }

  console.log(categoryId);

  const token = localStorage.getItem("token");

  // Envoyer les données à l'API
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", categoryId);
  formData.append("image", image);

  console.log(formData.getAll("category"));
  console.log(formData.getAll("title"));
  console.log(formData.getAll("image.name"));
  console.log(formData.get("image"));

  console.log(title, categoryId, image, image.name);

  const options = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const response = await fetch("http://localhost:5678/api/works", options);
    categoryId = Number(categoryId);
    console.log(categoryId);

    if (response.ok) {
      console.log("Image ajoutée avec succès");

      // Fermer la modale
      const addPhotoModal = document.querySelector("#add-photo-modal");
      addPhotoModal.style.display = "none";

      // Rafraîchir la galerie d'images
      fetchGalleryImages();
    } else {
      console.log("Une erreur est survenue");
      alert("Une erreur est survenue lors de l'ajout de l'image");
    }
  } catch (error) {
    console.error("Une erreur est survenue", error);
  }
});

const addPhotoModal = document.querySelector("#add-photo-modal");
const addPhotoCloseBtn = addPhotoModal.querySelector(".close");
const addPhotoReturnBtn = addPhotoModal.querySelector(".fa-solid");

// Si l'utilisateur clique sur la croix, fermer la modale image
addPhotoCloseBtn.addEventListener("click", () => {
  addPhotoModal.style.display = "none";
});
window.addEventListener("click", (event) => {
  // Si l'événement de clic se produit en dehors de la modale, la fermer
  if (event.target == addPhotoModal) {
    addPhotoModal.style.display = "none";
  }

  // Si l'utilisateur clique sur la flèche de retour, fermer la modale image
  addPhotoReturnBtn.addEventListener("click", () => {
    addPhotoModal.style.display = "none";
  });
});

// Afficher la prévisualisation de l'image à télécharger
function readFile(e) {
  e.preventDefault();

  // Constante et fonction pour la lecture de l'image
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    // Créer l'élément d'image de prévisualisation
    const previewImage = document.createElement("img");
    previewImage.setAttribute("id", "preview_image");
    previewImage.setAttribute("src", reader.result);

    // Ajouter les styles à l'élément de prévisualisation
    previewImage.style.maxWidth = "380px";
    previewImage.style.maxHeight = "220px";
    previewImage.style.width = "auto";
    previewImage.style.height = "auto";
    previewImage.style.objectFit = "cover";
    previewImage.style.objectPosition = "center center";
    previewImage.style.transform = "translateY(-17px)";
    previewImage.style.opacity = "1";

    // Ajouter l'image de prévisualisation au conteneur
    const picture = document.querySelector(".picture");
    picture.appendChild(previewImage);

    // Masquer le label de sélection de fichier
    const label = document.querySelector(".picture > label");
    label.style.opacity = "0";

    // Masquer l'image de logo et le paragraphe suivant la prévisualisation de l'image
    const logoImage = document.querySelector("#logo_image");
    const pMaxSize = document.querySelector(".picture > p");
    logoImage.style.display = "none";
    pMaxSize.style.display = "none";
  });

  // Lire le fichier sélectionné
  reader.readAsDataURL(inputFile.files[0]);
}

// Récupérer l'élément de fichier
const inputFile = document.getElementById("image");

// Ajouter un gestionnaire d'événements pour la sélection de fichier
inputFile.addEventListener("change", readFile);
