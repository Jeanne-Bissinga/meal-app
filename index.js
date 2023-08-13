const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");
let meals = [];

//fonction qui va chercher l'api
async function fetchMeals(search){
    
    await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search).then((res) => res.json()).then((data) => (meals = data.meals));

    console.log(meals);
}

//affichage des données
function mealsDisplay() {
    if (meals === null) {
      result.innerHTML = "<h2>Aucun résultat</h2>";
    } else {
      meals.length = 12;
  
      result.innerHTML = meals
        .map((meal) => {
          let ingredients = [];
  
          for (let i = 1; i < 21; i++) {
            if (meal[`strIngredient${i}`]) {
              let ingredient = meal[`strIngredient${i}`];
              let measure = meal[`strMeasure${i}`];
  
              ingredients.push(`<li>${ingredient} - ${measure}</li>`);
            }
          }
  
          return `
            <li class="card">
              <h2>${meal.strMeal}</h2>
              <p>${meal.strArea}</p>
              <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}">
              <ul>${ingredients.join("")}</ul>
            </li>
            `;
        })
        .join("");
    }
  }

// pour lancer la recherche dans l'input
input.addEventListener("input", (e) => {
    //tout ce qui est taper dans l'input.(le lien de l'api + la valeur de e.target.value)
    fetchMeals(e.target.value);
    
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    mealsDisplay();
});

