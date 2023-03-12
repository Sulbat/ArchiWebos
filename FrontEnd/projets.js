fetch('http://localhost:5678/api/works')


// On convertit la réponse en JSON
.then(response => response.json())
.then(data => {


  // On boucle sur les données
  for (const item of data) {


  // On crée une nouvelle figure
    const figure = document.createElement('figure');
    
    // On crée la balise image
    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.title;
    img.names = item.category.name;
    console.log(img.names);
    
    
    // On crée la balise légende
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = item.title;

    
    // On ajoute l'image et la légende à la figure
    figure.appendChild(img);
    figure.appendChild(figcaption);
    
    
    // On ajoute la figure au conteneur "gallery"
    document.querySelector('.gallery').appendChild(figure);
  }
  
});

