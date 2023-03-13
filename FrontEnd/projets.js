fetch("http://localhost:5678/api/works")
  // On convertit la réponse en JSON
  .then((response) => response.json())
  .then((data) => {
    // On boucle sur les données
    for (const item of data) {
      // On crée une nouvelle figure
      const figure = document.createElement("figure");

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


    //Filtres
    const allFilter = document.querySelector(".tous");
    const objectFilter = document.querySelector(".objets");
    const apartmentFilter = document.querySelector(".appartements");
    const hotelRestaurantFilter = document.querySelector(".hotel");


    //Tous (avec fonction anonyme) 
    allFilter.addEventListener("click", function () {
      const figures = document.querySelectorAll("figure");
      for (const figure of figures) {
        figure.style.display = "block";
      }
    });


    //Objets
    objectFilter.addEventListener("click", function () {
      const figures = document.querySelectorAll("figure");
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
      const figures = document.querySelectorAll("figure");
      for (const figure of figures) {
        if (figure.querySelector("img").names === "Appartements") {
          figure.style.display = "block";
        } else {
          figure.style.display = "none";
        }
      }
    });


    // Hotels & Restaurants
    hotelRestaurantFilter.addEventListener('click', function() {
      const figures = document.querySelectorAll('figure');
      for (const figure of figures) {
        if (figure.querySelector('img').names === 'Hotels & restaurants') {
          figure.style.display = 'block';
        } else {
          figure.style.display = 'none';
        }
      }
    });

  
  });
