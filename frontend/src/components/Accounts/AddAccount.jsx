import React, { useState, useRef } from 'react';
import { Search, User, Phone, CreditCard, MapPin, Briefcase, Users, Package, DollarSign, Calendar, Upload, X } from 'lucide-react';
import './AddAccount.css';

const AddAccount = () => {
  const [step, setStep] = useState(1);
  const [searchCNIC, setSearchCNIC] = useState('');
  const [showExisting, setShowExisting] = useState(false);
  const [existingAccounts, setExistingAccounts] = useState([]);

  // ===== FORM STATE =====
  const [formData, setFormData] = useState({
    name: '',
    cnic: '',
    phone: '',
    address: '',
    work: '',
    cnicFront: null,
    cnicBack: null,
    cnicFrontPreview: '',
    cnicBackPreview: '',
    guarantors: [
      { 
        name: '', 
        cnic: '', 
        phone: '', 
        address: '',
        cnicFront: null,
        cnicBack: null,
        cnicFrontPreview: '',
        cnicBackPreview: '',
      },
      { 
        name: '', 
        cnic: '', 
        phone: '', 
        address: '',
        cnicFront: null,
        cnicBack: null,
        cnicFrontPreview: '',
        cnicBackPreview: '',
      },
      { 
        name: '', 
        cnic: '', 
        phone: '', 
        address: '',
        cnicFront: null,
        cnicBack: null,
        cnicFrontPreview: '',
        cnicBackPreview: '',
      },
    ],
    productType: 'new',
    productName: '',
    productPrice: '',
    advanceAmount: '',
    invoicePrice: '',
    noOfInstallments: '',
    dueDate: '',
    installmentAmount: '',
    chalanFront: null,
    chalanBack: null,
    chalanFrontPreview: '',
    chalanBackPreview: '',
    accountType: 'regular',
    branch: 1,
  });

  const [errors, setErrors] = useState({});

  // ===== REFS FOR FILE INPUTS =====
  const cnicFrontRef = useRef(null);
  const cnicBackRef = useRef(null);
  const chalanFrontRef = useRef(null);
  const chalanBackRef = useRef(null);
  
  // Guarantor file refs
  const guarantorRefs = useRef([]);

  // ===== CNIC SEARCH =====
  const handleCNICSearch = () => {
    if (searchCNIC.length < 5) {
      alert('Please enter at least 5 characters of CNIC');
      return;
    }
    
    const mockAccounts = [
      { id: 1, name: 'Ahmed Khan', cnic: '12345-6789012-3', phone: '0300-1234567', address: 'House #12, Street 5', work: 'Business' },
      { id: 2, name: 'Sara Ali', cnic: '12345-6789012-4', phone: '0300-7654321', address: 'House #34, Street 8', work: 'Service' },
    ];
    
    const filtered = mockAccounts.filter(acc => acc.cnic.includes(searchCNIC));
    setExistingAccounts(filtered);
    setShowExisting(true);
  };

  // ===== LOAD EXISTING ACCOUNT =====
  const loadExistingAccount = (account) => {
    setFormData({
      ...formData,
      name: account.name,
      cnic: account.cnic,
      phone: account.phone,
      address: account.address,
      work: account.work,
    });
    setShowExisting(false);
    setSearchCNIC('');
  };

  // ===== HANDLE INPUT CHANGE =====
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ===== HANDLE GUARANTOR CHANGE =====
  const handleGuarantorChange = (index, field, value) => {
    const updated = [...formData.guarantors];
    updated[index][field] = value;
    setFormData({ ...formData, guarantors: updated });
  };

  // ===== HANDLE GUARANTOR FILE UPLOAD =====
  const handleGuarantorFileUpload = (e, index, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...formData.guarantors];
      if (type === 'cnicFront') {
        updated[index].cnicFront = file;
        updated[index].cnicFrontPreview = reader.result;
      } else if (type === 'cnicBack') {
        updated[index].cnicBack = file;
        updated[index].cnicBackPreview = reader.result;
      }
      setFormData({ ...formData, guarantors: updated });
    };
    reader.readAsDataURL(file);
  };

  // ===== REMOVE GUARANTOR FILE =====
  const removeGuarantorFile = (index, type) => {
    const updated = [...formData.guarantors];
    if (type === 'cnicFront') {
      updated[index].cnicFront = null;
      updated[index].cnicFrontPreview = '';
    } else if (type === 'cnicBack') {
      updated[index].cnicBack = null;
      updated[index].cnicBackPreview = '';
    }
    setFormData({ ...formData, guarantors: updated });
  };

  // ===== HANDLE FILE UPLOAD =====
  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'cnicFront') {
        setFormData({ ...formData, cnicFront: file, cnicFrontPreview: reader.result });
      } else if (type === 'cnicBack') {
        setFormData({ ...formData, cnicBack: file, cnicBackPreview: reader.result });
      } else if (type === 'chalanFront') {
        setFormData({ ...formData, chalanFront: file, chalanFrontPreview: reader.result });
      } else if (type === 'chalanBack') {
        setFormData({ ...formData, chalanBack: file, chalanBackPreview: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  // ===== REMOVE FILE =====
  const removeFile = (type) => {
    if (type === 'cnicFront') {
      setFormData({ ...formData, cnicFront: null, cnicFrontPreview: '' });
      if (cnicFrontRef.current) cnicFrontRef.current.value = '';
    } else if (type === 'cnicBack') {
      setFormData({ ...formData, cnicBack: null, cnicBackPreview: '' });
      if (cnicBackRef.current) cnicBackRef.current.value = '';
    } else if (type === 'chalanFront') {
      setFormData({ ...formData, chalanFront: null, chalanFrontPreview: '' });
      if (chalanFrontRef.current) chalanFrontRef.current.value = '';
    } else if (type === 'chalanBack') {
      setFormData({ ...formData, chalanBack: null, chalanBackPreview: '' });
      if (chalanBackRef.current) chalanBackRef.current.value = '';
    }
  };

  // ===== VALIDATE STEP 1 =====
  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.cnic) newErrors.cnic = 'CNIC is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.work) newErrors.work = 'Work is required';
    if (!formData.cnicFront) newErrors.cnicFront = 'CNIC Front image is required';
    if (!formData.cnicBack) newErrors.cnicBack = 'CNIC Back image is required';
    
    // Validate guarantors
    let guarantorErrors = [];
    formData.guarantors.forEach((g, index) => {
      const hasName = g.name.trim() !== '';
      const hasCnic = g.cnic.trim() !== '';
      const hasPhone = g.phone.trim() !== '';
      const hasAddress = g.address.trim() !== '';
      const hasFront = g.cnicFront !== null;
      const hasBack = g.cnicBack !== null;
      
      // If any field is filled, all fields + images must be filled
      if (hasName || hasCnic || hasPhone || hasAddress) {
        if (!hasName) guarantorErrors.push(`Guarantor ${index + 1}: Name required`);
        if (!hasCnic) guarantorErrors.push(`Guarantor ${index + 1}: CNIC required`);
        if (!hasPhone) guarantorErrors.push(`Guarantor ${index + 1}: Phone required`);
        if (!hasAddress) guarantorErrors.push(`Guarantor ${index + 1}: Address required`);
        if (!hasFront) guarantorErrors.push(`Guarantor ${index + 1}: CNIC Front image required`);
        if (!hasBack) guarantorErrors.push(`Guarantor ${index + 1}: CNIC Back image required`);
      }
    });

    // Check minimum 2 complete guarantors
    const completeGuarantors = formData.guarantors.filter(g => 
      g.name.trim() && g.cnic.trim() && g.phone.trim() && g.address.trim() &&
      g.cnicFront !== null && g.cnicBack !== null
    );
    
    if (completeGuarantors.length < 2) {
      newErrors.guarantors = 'Minimum 2 complete guarantors required (Name, CNIC, Phone, Address + CNIC Images)';
    }

    setErrors({ ...newErrors, guarantorErrors });
    return Object.keys(newErrors).length === 0;
  };

  // ===== VALIDATE STEP 2 =====
  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.productName) newErrors.productName = 'Product name is required';
    if (!formData.productPrice) newErrors.productPrice = 'Product price is required';
    if (!formData.invoicePrice) newErrors.invoicePrice = 'Invoice price is required';
    if (!formData.noOfInstallments) newErrors.noOfInstallments = 'Number of installments is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (!formData.chalanFront) newErrors.chalanFront = 'Chalan Front image is required';
    if (!formData.chalanBack) newErrors.chalanBack = 'Chalan Back image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== NEXT STEP =====
  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  // ===== PREV STEP =====
  const handlePrev = () => {
    setStep(1);
  };

  // ===== SUBMIT =====
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      console.log('Account Created:', formData);
      alert('Account created successfully!');
    }
  };

  // ===== GET GUARANTOR COUNT =====
  const getGuarantorCount = () => {
    return formData.guarantors.filter(g => 
      g.name && g.cnic && g.phone && g.address && 
      g.cnicFront !== null && g.cnicBack !== null
    ).length;
  };

  return (
    <div className="add-account-container">
      <h3>Create New Account</h3>

      {/* ===== CNIC SEARCH ===== */}
      <div className="cnic-search-section">
        <div className="cnic-search">
          <input
            type="text"
            className="form-input"
            placeholder="Search by CNIC..."
            value={searchCNIC}
            onChange={(e) => setSearchCNIC(e.target.value)}
          />
          <button className="btn-search" onClick={handleCNICSearch}>
            <Search size={18} />
            Search
          </button>
        </div>

        {showExisting && existingAccounts.length > 0 && (
          <div className="existing-accounts">
            <p className="existing-title">Existing Accounts Found:</p>
            {existingAccounts.map(acc => (
              <div key={acc.id} className="existing-item" onClick={() => loadExistingAccount(acc)}>
                <span><strong>{acc.name}</strong> - {acc.cnic}</span>
                <button className="btn-load">Load</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {/* ===== STEP 1: PERSONAL INFO + GUARANTORS + CNIC IMAGES ===== */}
        {step === 1 && (
          <div className="step-content">
            <div className="step-title">Step 1: Personal Information</div>

            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <div className="input-with-icon">
                  <User size={18} />
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Enter customer full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>CNIC *</label>
                <div className="input-with-icon">
                  <CreditCard size={18} />
                  <input
                    type="text"
                    name="cnic"
                    className="form-input"
                    placeholder="XXXXX-XXXXXXX-X"
                    value={formData.cnic}
                    onChange={handleChange}
                  />
                </div>
                {errors.cnic && <span className="error-text">{errors.cnic}</span>}
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <div className="input-with-icon">
                  <Phone size={18} />
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="03XX-XXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Branch *</label>
                <select
                  name="branch"
                  className="form-input"
                  value={formData.branch}
                  onChange={handleChange}
                >
                  <option value={1}>Branch 1</option>
                  <option value={2}>Branch 2</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Address *</label>
                <div className="input-with-icon">
                  <MapPin size={18} />
                  <input
                    type="text"
                    name="address"
                    className="form-input"
                    placeholder="Enter complete address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-group full-width">
                <label>Work / Occupation *</label>
                <div className="input-with-icon">
                  <Briefcase size={18} />
                  <input
                    type="text"
                    name="work"
                    className="form-input"
                    placeholder="Enter work/occupation"
                    value={formData.work}
                    onChange={handleChange}
                  />
                </div>
                {errors.work && <span className="error-text">{errors.work}</span>}
              </div>
            </div>

            {/* ===== CNIC IMAGES ===== */}
            <div className="image-section">
              <h4>CNIC Images *</h4>
              <div className="image-grid">
                <div className="image-upload-box">
                  <label>CNIC Front</label>
                  <div className="upload-area" onClick={() => cnicFrontRef.current?.click()}>
                    {formData.cnicFrontPreview ? (
                      <div className="preview-container">
                        <img src={formData.cnicFrontPreview} alt="CNIC Front" />
                        <button className="remove-btn" onClick={(e) => { e.stopPropagation(); removeFile('cnicFront'); }}>
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload size={32} />
                        <span>Click to upload</span>
                      </>
                    )}
                  </div>
                  <input type="file" ref={cnicFrontRef} accept="image/*" onChange={(e) => handleFileUpload(e, 'cnicFront')} style={{ display: 'none' }} />
                  {errors.cnicFront && <span className="error-text">{errors.cnicFront}</span>}
                </div>

                <div className="image-upload-box">
                  <label>CNIC Back</label>
                  <div className="upload-area" onClick={() => cnicBackRef.current?.click()}>
                    {formData.cnicBackPreview ? (
                      <div className="preview-container">
                        <img src={formData.cnicBackPreview} alt="CNIC Back" />
                        <button className="remove-btn" onClick={(e) => { e.stopPropagation(); removeFile('cnicBack'); }}>
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload size={32} />
                        <span>Click to upload</span>
                      </>
                    )}
                  </div>
                  <input type="file" ref={cnicBackRef} accept="image/*" onChange={(e) => handleFileUpload(e, 'cnicBack')} style={{ display: 'none' }} />
                  {errors.cnicBack && <span className="error-text">{errors.cnicBack}</span>}
                </div>
              </div>
            </div>

            {/* ===== GUARANTORS WITH CNIC IMAGES ===== */}
            <div className="guarantors-section">
              <h4>Guarantors <span className="required-badge">Minimum 2 Required</span></h4>
              <p className="guarantor-count">Complete: {getGuarantorCount()}/3</p>
              
              {formData.guarantors.map((g, index) => (
                <div key={index} className="guarantor-card">
                  <div className="guarantor-header">
                    <Users size={16} />
                    <span>Guarantor {index + 1}</span>
                    {g.name && g.cnic && g.cnicFront && g.cnicBack && (
                      <span className="filled-badge">✓ Complete</span>
                    )}
                  </div>
                  <div className="guarantor-grid">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Full Name"
                      value={g.name}
                      onChange={(e) => handleGuarantorChange(index, 'name', e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="CNIC"
                      value={g.cnic}
                      onChange={(e) => handleGuarantorChange(index, 'cnic', e.target.value)}
                    />
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="Phone"
                      value={g.phone}
                      onChange={(e) => handleGuarantorChange(index, 'phone', e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Address"
                      value={g.address}
                      onChange={(e) => handleGuarantorChange(index, 'address', e.target.value)}
                    />
                  </div>
                  
                  {/* Guarantor CNIC Images */}
                  <div className="guarantor-images">
                    <div className="guarantor-image-box">
                      <label>CNIC Front</label>
                      <div className="upload-area small" onClick={() => {
                        if (!guarantorRefs.current[index]) guarantorRefs.current[index] = {};
                        guarantorRefs.current[index].front?.click();
                      }}>
                        {g.cnicFrontPreview ? (
                          <div className="preview-container">
                            <img src={g.cnicFrontPreview} alt="Guarantor CNIC Front" />
                            <button className="remove-btn" onClick={(e) => { e.stopPropagation(); removeGuarantorFile(index, 'cnicFront'); }}>
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <Upload size={20} />
                            <span>Upload Front</span>
                          </>
                        )}
                      </div>
                      <input 
                        type="file" 
                        ref={(el) => {
                          if (!guarantorRefs.current[index]) guarantorRefs.current[index] = {};
                          guarantorRefs.current[index].front = el;
                        }} 
                        accept="image/*" 
                        onChange={(e) => handleGuarantorFileUpload(e, index, 'cnicFront')} 
                        style={{ display: 'none' }} 
                      />
                    </div>
                    <div className="guarantor-image-box">
                      <label>CNIC Back</label>
                      <div className="upload-area small" onClick={() => {
                        if (!guarantorRefs.current[index]) guarantorRefs.current[index] = {};
                        guarantorRefs.current[index].back?.click();
                      }}>
                        {g.cnicBackPreview ? (
                          <div className="preview-container">
                            <img src={g.cnicBackPreview} alt="Guarantor CNIC Back" />
                            <button className="remove-btn" onClick={(e) => { e.stopPropagation(); removeGuarantorFile(index, 'cnicBack'); }}>
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <Upload size={20} />
                            <span>Upload Back</span>
                          </>
                        )}
                      </div>
                      <input 
                        type="file" 
                        ref={(el) => {
                          if (!guarantorRefs.current[index]) guarantorRefs.current[index] = {};
                          guarantorRefs.current[index].back = el;
                        }} 
                        accept="image/*" 
                        onChange={(e) => handleGuarantorFileUpload(e, index, 'cnicBack')} 
                        style={{ display: 'none' }} 
                      />
                    </div>
                  </div>
                </div>
              ))}
              {errors.guarantors && <span className="error-text">{errors.guarantors}</span>}
            </div>
          </div>
        )}

        {/* ===== STEP 2: PRODUCT + INSTALLMENTS + CHALAN ===== */}
        {step === 2 && (
          <div className="step-content">
            <div className="step-title">Step 2: Product & Installment Details</div>

            <div className="form-grid">
              <div className="form-group">
                <label>Product Type *</label>
                <select
                  name="productType"
                  className="form-input"
                  value={formData.productType}
                  onChange={handleChange}
                >
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </select>
              </div>

              <div className="form-group">
                <label>Product Name *</label>
                <div className="input-with-icon">
                  <Package size={18} />
                  <input
                    type="text"
                    name="productName"
                    className="form-input"
                    placeholder="Enter product name"
                    value={formData.productName}
                    onChange={handleChange}
                  />
                </div>
                {errors.productName && <span className="error-text">{errors.productName}</span>}
              </div>

              <div className="form-group">
                <label>Product Price (₹) *</label>
                <div className="input-with-icon">
                  <DollarSign size={18} />
                  <input
                    type="number"
                    name="productPrice"
                    className="form-input"
                    placeholder="Enter product price"
                    value={formData.productPrice}
                    onChange={handleChange}
                  />
                </div>
                {errors.productPrice && <span className="error-text">{errors.productPrice}</span>}
              </div>

              <div className="form-group">
                <label>Invoice Price (₹) *</label>
                <div className="input-with-icon">
                  <DollarSign size={18} />
                  <input
                    type="number"
                    name="invoicePrice"
                    className="form-input"
                    placeholder="Enter invoice price"
                    value={formData.invoicePrice}
                    onChange={handleChange}
                  />
                </div>
                {errors.invoicePrice && <span className="error-text">{errors.invoicePrice}</span>}
              </div>

              <div className="form-group">
                <label>Advance / 1st Installment (₹)</label>
                <div className="input-with-icon">
                  <DollarSign size={18} />
                  <input
                    type="number"
                    name="advanceAmount"
                    className="form-input"
                    placeholder="Enter advance amount"
                    value={formData.advanceAmount}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Number of Installments *</label>
                <div className="input-with-icon">
                  <Calendar size={18} />
                  <input
                    type="number"
                    name="noOfInstallments"
                    className="form-input"
                    placeholder="e.g., 6, 12, 24"
                    value={formData.noOfInstallments}
                    onChange={handleChange}
                  />
                </div>
                {errors.noOfInstallments && <span className="error-text">{errors.noOfInstallments}</span>}
              </div>

              <div className="form-group">
                <label>Due Date *</label>
                <input
                  type="date"
                  name="dueDate"
                  className="form-input"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
                {errors.dueDate && <span className="error-text">{errors.dueDate}</span>}
              </div>

              <div className="form-group">
                <label>Installment Amount</label>
                <div className="input-with-icon">
                  <DollarSign size={18} />
                  <input
                    type="text"
                    className="form-input"
                    value={formData.productPrice && formData.noOfInstallments ? 
                      `₹${(parseInt(formData.productPrice) / parseInt(formData.noOfInstallments)).toLocaleString()}` : 
                      'Calculate from price and installments'}
                    readOnly
                    style={{ background: '#f8f9fa' }}
                  />
                </div>
              </div>
            </div>

            {/* ===== CHALAN IMAGES ===== */}
            <div className="image-section">
              <h4>Chalan Images *</h4>
              <div className="image-grid">
                <div className="image-upload-box">
                  <label>Chalan Front</label>
                  <div className="upload-area" onClick={() => chalanFrontRef.current?.click()}>
                    {formData.chalanFrontPreview ? (
                      <div className="preview-container">
                        <img src={formData.chalanFrontPreview} alt="Chalan Front" />
                        <button className="remove-btn" onClick={(e) => { e.stopPropagation(); removeFile('chalanFront'); }}>
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload size={32} />
                        <span>Click to upload</span>
                      </>
                    )}
                  </div>
                  <input type="file" ref={chalanFrontRef} accept="image/*" onChange={(e) => handleFileUpload(e, 'chalanFront')} style={{ display: 'none' }} />
                  {errors.chalanFront && <span className="error-text">{errors.chalanFront}</span>}
                </div>

                <div className="image-upload-box">
                  <label>Chalan Back</label>
                  <div className="upload-area" onClick={() => chalanBackRef.current?.click()}>
                    {formData.chalanBackPreview ? (
                      <div className="preview-container">
                        <img src={formData.chalanBackPreview} alt="Chalan Back" />
                        <button className="remove-btn" onClick={(e) => { e.stopPropagation(); removeFile('chalanBack'); }}>
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload size={32} />
                        <span>Click to upload</span>
                      </>
                    )}
                  </div>
                  <input type="file" ref={chalanBackRef} accept="image/*" onChange={(e) => handleFileUpload(e, 'chalanBack')} style={{ display: 'none' }} />
                  {errors.chalanBack && <span className="error-text">{errors.chalanBack}</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== FORM ACTIONS ===== */}
        <div className="form-actions">
          {step === 2 && (
            <button type="button" className="btn-prev" onClick={handlePrev}>
              ← Previous
            </button>
          )}
          
          {step === 1 ? (
            <button type="button" className="btn-next" onClick={handleNext}>
              Next →
            </button>
          ) : (
            <button type="submit" className="btn-submit">
              Create Account
            </button>
          )}
        </div>

        {/* ===== STEP INDICATOR ===== */}
        <div className="step-indicator">
          <span className={step === 1 ? 'active' : 'done'}>1. Personal Info</span>
          <span className="step-line"></span>
          <span className={step === 2 ? 'active' : ''}>2. Product & Installments</span>
        </div>
      </form>
    </div>
  );
};

export default AddAccount;