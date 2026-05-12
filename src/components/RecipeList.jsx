import React, { useEffect, useState } from 'react';
import { recipeFetch } from '../api';

const RecipeList = ({ refreshTrigger, onEdit }) => {
      const [recipes, setRecipes] = useState([]);

      useEffect(() => {
            recipeFetch('recipes/').then(setRecipes).catch(console.error);
      }, [refreshTrigger]); // Reloads when a recipe is added/updated

      const handleDelete = async (id) => {
            if (window.confirm("Are you sure you want to delete this recipe?")) {
                  await recipeFetch(`recipes/${id}/`, { method: 'DELETE' });
                  setRecipes(recipes.filter(r => r.id !== id));
            }
      };

      return (
            <div className="row">
                  {recipes.map(recipe => (
                        <div key={recipe.id} className="col-md-6 mb-4">
                              <div className="card shadow-sm h-100">
                                    <div className="card-body">
                                          <h5 className="card-title">{recipe.title}</h5>
                                          <p className="card-text text-muted">{recipe.instructions.substring(0, 80)}...</p>
                                          <div className="d-flex justify-content-between align-items-center">
                                                <span className="badge bg-info">{recipe.ingredients.length} Items</span>
                                                <div>
                                                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(recipe)}>Edit</button>
                                                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(recipe.id)}>Delete</button>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  ))}
            </div>
      );
};

export default RecipeList;