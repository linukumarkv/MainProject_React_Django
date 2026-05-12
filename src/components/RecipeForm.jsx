import React, { useState, useEffect } from 'react';
import { recipeFetch } from '../api';

const RecipeForm = ({ selectedRecipe, onSaveSuccess }) => {
      const [formData, setFormData] = useState({ title: '', instructions: '', ingredients: [{ name: '', quantity: '', unit: '' }] });

      useEffect(() => {
            if (selectedRecipe) setFormData(selectedRecipe);
      }, [selectedRecipe]);

      const handleIngChange = (index, field, value) => {
            const newIngs = [...formData.ingredients];
            newIngs[index][field] = value;
            setFormData({ ...formData, ingredients: newIngs });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            const method = formData.id ? 'PUT' : 'POST';
            const endpoint = formData.id ? `recipes/${formData.id}/` : 'recipes/';

            try {
                  await recipeFetch(endpoint, {
                        method: method,
                        body: JSON.stringify(formData),
                  });
                  alert("Success!");
                  setFormData({ title: '', instructions: '', ingredients: [{ name: '', quantity: '', unit: '' }] });
                  onSaveSuccess();
            } catch (err) { alert(err.message); }
      };

      return (
            <div className="card p-4 shadow">
                  <h3>{formData.id ? 'Edit Recipe' : 'Add New Recipe'}</h3>
                  <form onSubmit={handleSubmit}>
                        <input className="form-control mb-3" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />

                        <h6>Ingredients</h6>
                        {formData.ingredients.map((ing, i) => (
                              <div key={i} className="row g-2 mb-2">
                                    <div className="col-6"><input className="form-control" placeholder="Name" value={ing.name} onChange={e => handleIngChange(i, 'name', e.target.value)} required /></div>
                                    <div className="col-3"><input className="form-control" placeholder="Qty" value={ing.quantity} onChange={e => handleIngChange(i, 'quantity', e.target.value)} required /></div>
                                    <div className="col-3"><input className="form-control" placeholder="Unit" value={ing.unit} onChange={e => handleIngChange(i, 'unit', e.target.value)} required /></div>
                              </div>
                        ))}

                        <button type="button" className="btn btn-link btn-sm p-0 mb-3" onClick={() => setFormData({ ...formData, ingredients: [...formData.ingredients, { name: '', quantity: '', unit: '' }] })}>+ Add Ingredient</button>
                        <textarea className="form-control mb-3" placeholder="Instructions" rows="3" value={formData.instructions} onChange={e => setFormData({ ...formData, instructions: e.target.value })} required />
                        <button className="btn btn-success w-100">{formData.id ? 'Update' : 'Save'}</button>
                  </form>
            </div>
      );
};

export default RecipeForm;