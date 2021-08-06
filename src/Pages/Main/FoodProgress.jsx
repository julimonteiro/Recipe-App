import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFoodsByID } from '../../Services/ApiFood';

function FoodProgress(props) {
  const [foodById, setFoodById] = useState([]);
  const [foodIngredient, setFoodIngredient] = useState([]);
  const { match } = props;
  const { id } = match.params;

  async function fetchFoodsByID() {
    const foodByIdAPI = await getFoodsByID(id);
    setFoodById(foodByIdAPI.meals);
  }

  useEffect(() => {
    fetchFoodsByID();
  }, []);

  console.log(foodById);

  useEffect(() => {
    foodById.forEach((ingredient) => {
      const data = [];
      const number = 15;
      Object.entries(ingredient).filter((item) => {
        for (let index = 0; index <= number; index += 1) {
          if (item.includes(`strIngredient${index}`) && item[1]) {
            data.push(Object.values(item).splice(1, 1));
          }
        }
        return data;
      });
      console.log(data);
      setFoodIngredient(data);
    });
  }, [foodById]);

  return (
    <div>
      { foodById.map((item, index) => (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            src={ item.strMealThumb }
            alt={ `Food ${item.strMeal}` }
            width="80"
          />
          <h2 data-testid="recipe-title">
            { item.strMeal }
          </h2>
          <h3 data-testid="recipe-category">
            { item.strCategory }
          </h3>
          <ul>
            {
              foodIngredient.map((ingredient, i) => (
                <li
                  data-testid={ `${i}-ingredient-step` }
                  key={ i }
                >
                  { Object.values(ingredient) }
                </li>
              ))
            }
          </ul>
          <p data-testid="instructions">
            { item.strInstructions }
          </p>
        </div>
      )) }
      <div>
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finish
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favorite
        </button>
        <button
          type="button"
          data-testid="share-btn"
        >
          Share
        </button>
      </div>
    </div>
  );
}

FoodProgress.propTypes = {
  match: PropTypes.object,
  params: PropTypes.shape({
    id: PropTypes.number,
  }),
}.isRequired;

export default FoodProgress;
