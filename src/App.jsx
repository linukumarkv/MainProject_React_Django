import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-dark mb-4"><div className="container"><span className="navbar-brand">RecipeAPP Dashboard</span></div></nav>
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <RecipeList refreshTrigger={refresh} onEdit={setSelectedRecipe} />
          </div>
          <div className="col-lg-5">
            <RecipeForm selectedRecipe={selectedRecipe} onSaveSuccess={() => { setRefresh(r => r + 1); setSelectedRecipe(null); }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;