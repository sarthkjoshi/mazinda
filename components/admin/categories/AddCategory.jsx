'use client'
import { useState } from 'react';

const AddCategory = ({ onAddCategory }) => {
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);

  const handleChangeCategory = (e) => {
    setNewCategory(e.target.value);
  };

  const handleChangeSubcategory = (e) => {
    setNewSubcategory(e.target.value);
  };

  const handleAddSubcategory = () => {
    if (newSubcategory.trim() !== '') {
      setSubcategories([...subcategories, newSubcategory]);
      setNewSubcategory('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategory.trim() !== '') {
      onAddCategory(newCategory);
      setNewCategory('');
    }
  };

  return (
    <div className='m-2 bg-white rounded-xl p-4'>
      <h2 className='text-2xl'>Add Category</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
            Category Name
          </label>
          <input
            type="text"
            id="category"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter category name"
            value={newCategory}
            onChange={handleChangeCategory}
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-black hover:opacity-70 rounded-full text-white font-bold py-2 px-4"
          >
            Add Category
          </button>
        </div>
      </form>
      <div className="mt-4">
        <h3>Add Subcategories:</h3>
        <div className="flex items-center">
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter subcategory name"
            value={newSubcategory}
            onChange={handleChangeSubcategory}
            />
          <button
            onClick={handleAddSubcategory}
            className="bg-black hover:opacity-70 text-white font-bold py-2 px-4 rounded ml-2"
            >
            +
          </button>
        </div>
      </div>
      {subcategories.length > 0 && (
        <div>
          <h3>Subcategories:</h3>
          <ul>
            {subcategories.map((subcategory, index) => (
              <li key={index}>{subcategory}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
