import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Package, 
  CreditCard, 
  DollarSign, 
  ArrowRight,
  Calendar,
  Clock,
  Truck,
  Shield,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import useAuth from '@/hooks/useAuth';
import useAxiosPublic from '@/hooks/useAxiosPublic';



const BookParcelForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const {user} = useAuth();
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({
    pickupAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      contactName: '',
      contactPhone: ''
    },
    deliveryAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      contactName: '',
      contactPhone: ''
    },
    parcelDetails: {
      type: 'package',
      weight: 0,
      dimensions: {
        length: 0,
        width: 0,
        height: 0
      },
      value: 0,
      description: ''
    },
    serviceType: 'standard',
    paymentType: 'prepaid',
    codAmount: 0,
    pickupDate: '',
    pickupTime: '',
    specialInstructions: ''
  });

  console.log(user)

  const steps = [
    { id: 1, title: 'Pickup Address', icon: MapPin },
    { id: 2, title: 'Delivery Address', icon: MapPin },
    { id: 3, title: 'Parcel Details', icon: Package },
    { id: 4, title: 'Service & Payment', icon: CreditCard },
    { id: 5, title: 'Review & Confirm', icon: CheckCircle }
  ];

  const parcelTypes = [
    { id: 'document', label: 'Documents', icon: '📄', description: 'Papers, contracts, certificates' },
    { id: 'package', label: 'General Package', icon: '📦', description: 'Standard items, gifts, clothing' },
    { id: 'fragile', label: 'Fragile Items', icon: '🔍', description: 'Glass, ceramics, delicate items' },
    { id: 'electronics', label: 'Electronics', icon: '💻', description: 'Phones, laptops, gadgets' }
  ];

  const serviceTypes = [
    { 
      id: 'standard', 
      label: 'Standard Delivery', 
      price: 15.99, 
      duration: '3-5 business days',
      description: 'Reliable delivery at an affordable price'
    },
    { 
      id: 'express', 
      label: 'Express Delivery', 
      price: 29.99, 
      duration: '1-2 business days',
      description: 'Faster delivery for urgent parcels'
    },
    { 
      id: 'overnight', 
      label: 'Overnight Delivery', 
      price: 49.99, 
      duration: 'Next business day',
      description: 'Premium overnight service'
    }
  ];

  const handleInputChange = (section, field, value) => {
  setFormData(prev => ({
    ...prev,
    [section]: {
      ...prev[section],
      [field]: value,
    },
  }));
};


  const handleNestedInputChange = (section, subsection, field, value) => {
  setFormData(prev => ({
    ...prev,
    [section]: {
      ...prev[section],
      [subsection]: {
        ...prev[section]?.[subsection],
        [field]: value,
      },
    },
  }));
};


const handleRootInputChange = (field, value) => {
  setFormData(prev => ({
    ...prev,
    [field]: value,
  }));
};



  const validateStep = (step) => {
    switch (step) {
      case 1:
        return !!(formData.pickupAddress.street && formData.pickupAddress.city && 
                 formData.pickupAddress.contactName && formData.pickupAddress.contactPhone);
      case 2:
        return !!(formData.deliveryAddress.street && formData.deliveryAddress.city && 
                 formData.deliveryAddress.contactName && formData.deliveryAddress.contactPhone);
      case 3:
        return !!(formData.parcelDetails.weight > 0 && formData.parcelDetails.value > 0);
      case 4:
        return !!(formData.pickupDate && formData.pickupTime);
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const calculatePrice = () => {
    const basePrice = serviceTypes.find(s => s.id === formData.serviceType)?.price || 0;
    const weightSurcharge = formData.parcelDetails.weight > 5 ? (formData.parcelDetails.weight - 5) * 2 : 0;
    const fragileCharge = formData.parcelDetails.type === 'fragile' ? 10 : 0;
    return basePrice + weightSurcharge + fragileCharge;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const trackingNumber = 'CP' + Date.now().toString().slice(-10);

      const parcelInfo = {
        customerId:user.customerId,
        trackingNumber,
        customer:user.name,
        customerPhone:user.phone,
        recipient:formData.deliveryAddress.contactName,
        recipientPhone:formData.deliveryAddress.contactPhone,
        ...formData}

      console.log('Parcel booked:', parcelInfo);

      // create parcel for database 
      const parcelStoreDatabase = await axiosPublic.post('/api/parcel', parcelInfo);
      console.log(parcelStoreDatabase);



      toast.success(`Parcel booked successfully! Tracking: ${trackingNumber}`);
      navigate('/customer/parcels');
    } catch (error) {
      if(error){
        toast.error('Failed to book parcel. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Pickup Address</h2>
              <p className="text-gray-600">Where should we collect your parcel?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter street address"
                  value={formData.pickupAddress.street}
                  onChange={(e) => handleInputChange('pickupAddress', 'street', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter city"
                  value={formData.pickupAddress.city}
                  onChange={(e) => handleInputChange('pickupAddress', 'city', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter state"
                  value={formData.pickupAddress.state}
                  onChange={(e) => handleInputChange('pickupAddress', 'state', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter ZIP code"
                  value={formData.pickupAddress.zipCode}
                  onChange={(e) => handleInputChange('pickupAddress', 'zipCode', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contact person name"
                  value={formData.pickupAddress.contactName}
                  onChange={(e) => handleInputChange('pickupAddress', 'contactName', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Phone number"
                  value={formData.pickupAddress.contactPhone}
                  onChange={(e) => handleInputChange('pickupAddress', 'contactPhone', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Delivery Address</h2>
              <p className="text-gray-600">Where should we deliver your parcel?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter street address"
                  value={formData.deliveryAddress.street}
                  onChange={(e) => handleInputChange('deliveryAddress', 'street', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter city"
                  value={formData.deliveryAddress.city}
                  onChange={(e) => handleInputChange('deliveryAddress', 'city', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter state"
                  value={formData.deliveryAddress.state}
                  onChange={(e) => handleInputChange('deliveryAddress', 'state', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter ZIP code"
                  value={formData.deliveryAddress.zipCode}
                  onChange={(e) => handleInputChange('deliveryAddress', 'zipCode', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Contact person name"
                  value={formData.deliveryAddress.contactName}
                  onChange={(e) => handleInputChange('deliveryAddress', 'contactName', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Phone number"
                  value={formData.deliveryAddress.contactPhone}
                  onChange={(e) => handleInputChange('deliveryAddress', 'contactPhone', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Package className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Parcel Details</h2>
              <p className="text-gray-600">Tell us about your parcel</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Parcel Type *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {parcelTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.parcelDetails.type === type.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => handleInputChange('parcelDetails', 'type', type.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{type.icon}</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{type.label}</h3>
                        <p className="text-sm text-gray-500">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="0.0"
                  value={formData.parcelDetails.weight || ''}
                  onChange={(e) => handleInputChange('parcelDetails', 'weight', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Declared Value ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="0.00"
                  value={formData.parcelDetails.value || ''}
                  onChange={(e) => handleInputChange('parcelDetails', 'value', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dimensions (cm)
              </label>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Length"
                  value={formData.parcelDetails.dimensions.length || ''}
                  onChange={(e) => handleNestedInputChange('parcelDetails', 'dimensions', 'length', parseFloat(e.target.value) || 0)}
                />
                <input
                  type="number"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Width"
                  value={formData.parcelDetails.dimensions.width || ''}
                  onChange={(e) => handleNestedInputChange('parcelDetails', 'dimensions', 'width', parseFloat(e.target.value) || 0)}
                />
                <input
                  type="number"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Height"
                  value={formData.parcelDetails.dimensions.height || ''}
                  onChange={(e) => handleNestedInputChange('parcelDetails', 'dimensions', 'height', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Brief description of the parcel contents"
                value={formData.parcelDetails.description}
                onChange={(e) => handleInputChange('parcelDetails', 'description', e.target.value)}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Truck className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Service & Payment</h2>
              <p className="text-gray-600">Choose your delivery service and payment method</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Delivery Service *
              </label>
              <div className="space-y-4">
                {serviceTypes.map((service) => (
                  <div
                    key={service.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.serviceType === service.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                    onClick={() => handleRootInputChange('serviceType', service.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{service.label}</h3>
                        <p className="text-sm text-gray-500">{service.description}</p>
                        <p className="text-sm text-orange-600 font-medium">{service.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">${service.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Date *
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.pickupDate}
                  onChange={(e) => handleRootInputChange('pickupDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Time *
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.pickupTime}
                  onChange={(e) => handleRootInputChange('pickupTime', e.target.value)}
                >
                  <option value="">Select time</option>
                  <option value="09:00-12:00">9:00 AM - 12:00 PM</option>
                  <option value="12:00-15:00">12:00 PM - 3:00 PM</option>
                  <option value="15:00-18:00">3:00 PM - 6:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Payment Method *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.paymentType === 'prepaid'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                 onClick={() => handleRootInputChange('paymentType', 'prepaid')}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Prepaid</h3>
                      <p className="text-sm text-gray-500">Pay now with card</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.paymentType === 'cod'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleRootInputChange('paymentType', 'cod')}
                >
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Cash on Delivery</h3>
                      <p className="text-sm text-gray-500">Pay when delivered</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {formData.paymentType === 'cod' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  COD Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  value={formData.codAmount || ''}
                onChange={(e) => handleRootInputChange('codAmount', parseFloat(e.target.value) || 0)}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Instructions
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Any special handling instructions..."
                value={formData.specialInstructions}
                onChange={(e) => handleRootInputChange('specialInstructions', e.target.value)}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Review & Confirm</h2>
              <p className="text-gray-600">Please review your booking details</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-6">
              {/* Addresses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 text-red-500 mr-2" />
                    Pickup Address
                  </h3>
                  <p className="text-sm text-gray-600">
                    {formData.pickupAddress.street}<br />
                    {formData.pickupAddress.city}, {formData.pickupAddress.state} {formData.pickupAddress.zipCode}<br />
                    Contact: {formData.pickupAddress.contactName}<br />
                    Phone: {formData.pickupAddress.contactPhone}
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 text-green-500 mr-2" />
                    Delivery Address
                  </h3>
                  <p className="text-sm text-gray-600">
                    {formData.deliveryAddress.street}<br />
                    {formData.deliveryAddress.city}, {formData.deliveryAddress.state} {formData.deliveryAddress.zipCode}<br />
                    Contact: {formData.deliveryAddress.contactName}<br />
                    Phone: {formData.deliveryAddress.contactPhone}
                  </p>
                </div>
              </div>

              {/* Parcel Details */}
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Package className="h-4 w-4 text-purple-500 mr-2" />
                  Parcel Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Type:</span>
                    <p className="font-medium capitalize">{formData.parcelDetails.type}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Weight:</span>
                    <p className="font-medium">{formData.parcelDetails.weight} kg</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Value:</span>
                    <p className="font-medium">${formData.parcelDetails.value}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Service:</span>
                    <p className="font-medium capitalize">{formData.serviceType}</p>
                  </div>
                </div>
              </div>

              {/* Service & Payment */}
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Truck className="h-4 w-4 text-orange-500 mr-2" />
                  Service & Payment
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Pickup Date:</span>
                    <p className="font-medium">{new Date(formData.pickupDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Pickup Time:</span>
                    <p className="font-medium">{formData.pickupTime}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Payment:</span>
                    <p className="font-medium capitalize">{formData.paymentType}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Cost:</span>
                    <p className="font-medium text-lg">${calculatePrice().toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {formData.paymentType === 'cod' && formData.codAmount > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-900">
                      COD Amount: ${formData.codAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Important Notes:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Please ensure someone is available at the pickup location during the selected time slot</li>
                    <li>Have a valid ID ready for verification</li>
                    <li>Parcel will be insured up to the declared value</li>
                    <li>You will receive SMS updates on your parcel status</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 ml-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center space-x-4">
              {currentStep < 5 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Booking...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>Confirm Booking</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookParcelForm;