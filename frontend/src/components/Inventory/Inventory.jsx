import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import './Inventory.css';

const Inventory = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const itemsPerPage = 12;

  const [products, setProducts] = useState([
    { id: 1, name: 'Samsung LED 55"', stock: 45, price: 55000, category: 'TV' },
    { id: 2, name: 'Sony Soundbar', stock: 23, price: 12000, category: 'Audio' },
    { id: 3, name: 'LG Refrigerator', stock: 12, price: 45000, category: 'Appliances' },
    { id: 4, name: 'Dell Laptop', stock: 8, price: 68000, category: 'Computers' },
    { id: 5, name: 'Apple iPhone 15', stock: 15, price: 85000, category: 'Mobile' },
    { id: 6, name: 'Samsung Galaxy S24', stock: 10, price: 75000, category: 'Mobile' },
    { id: 7, name: 'Sony LED 65"', stock: 5, price: 95000, category: 'TV' },
    { id: 8, name: 'Haier AC 1.5 Ton', stock: 18, price: 42000, category: 'Appliances' },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    stock: '',
    price: ''
  });

  // ===== SEARCH LOGIC =====
  const filteredProducts = products.filter(p => {
    const searchLower = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower) ||
      p.price.toString().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // ===== ADD/EDIT PRODUCT =====
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.stock || !newProduct.price) {
      alert('Please fill all fields');
      return;
    }

    if (editingProduct) {
      // Edit existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { 
              ...p, 
              name: newProduct.name, 
              category: newProduct.category, 
              stock: parseInt(newProduct.stock), 
              price: parseInt(newProduct.price) 
            } 
          : p
      ));
    } else {
      // Add new product
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      setProducts([...products, {
        id: newId,
        name: newProduct.name,
        category: newProduct.category,
        stock: parseInt(newProduct.stock),
        price: parseInt(newProduct.price)
      }]);
    }

    closeModal();
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setNewProduct({ name: '', category: '', stock: '', price: '' });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      stock: product.stock.toString(),
      price: product.price.toString()
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setNewProduct({ name: '', category: '', stock: '', price: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // ===== CATEGORIES FOR DROPDOWN =====
  const categories = ['TV', 'Audio', 'Appliances', 'Computers', 'Mobile', 'Furniture', 'Other'];

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h2>Inventory</h2>
        <button className="btn-accent" onClick={openAddModal}>
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>Product List</h3>
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="table-search"
              placeholder="Search by name, category or price..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="table-scroll">
          <table className="table-data">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data">No products found</td>
                </tr>
              ) : (
                currentItems.map((product, index) => (
                  <tr key={product.id}>
                    <td className="text-gray-500">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="font-medium">{product.name}</td>
                    <td><span className="category-badge">{product.category}</span></td>
                    <td>
                      <span className={product.stock < 10 ? 'stock-low' : ''}>
                        {product.stock}
                      </span>
                    </td>
                    <td>₹{product.price.toLocaleString()}</td>
                    <td>
                      <div className="action-btns">
                        <button className="edit" onClick={() => openEditModal(product)}>
                          <Edit size={18} />
                        </button>
                        <button className="delete" onClick={() => handleDelete(product.id)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
            Previous
          </button>
          <span className="page-info">
            {filteredProducts.length > 0 ? (
              `Showing ${startIndex + 1} - ${Math.min(startIndex + itemsPerPage, filteredProducts.length)} of ${filteredProducts.length} records`
            ) : (
              'No records found'
            )}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ===== ADD/EDIT PRODUCT MODAL ===== */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  className="form-input"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                  <option value="">Select Category...</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Stock *</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="0"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal}>Cancel</button>
              <button className="btn-save" onClick={handleAddProduct}>
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;