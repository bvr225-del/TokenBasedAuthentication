import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createRestaurant,
  getRestaurantById,
  updateRestaurant
} from '../services/RestaurantService';

function RestaurantForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    restaurantName: '',
    restaurantLocation: ''
    // creationDate:''
  });

  useEffect(() => {
    if (id) {
      const fetchRestaurant = async () => {
        try {
          const { data } = await getRestaurantById(id);
          setFormData({
            restaurantName: data.restaurantName,
            restaurantLocation: data.restaurantLocation
            // creationDate:data.creationDate
          });
        } catch (error) {
          setError('Failed to load restaurant');
        }
      };
      fetchRestaurant();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateRestaurant({ ...formData, id: id });
      } else {
        await createRestaurant(formData);
      }
      navigate('/restaurants');
    } catch (error) {
      setError(id ? 'Failed to update restaurant' : 'Failed to create restaurant');
      console.log(error);
    }
  };

  return (
    <div className="mt-4">
      <h2>{id ? 'Edit Restaurant' : 'Create Restaurant'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Restaurant Name</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.restaurantName}
            onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.restaurantLocation}
            onChange={(e) => setFormData({ ...formData, restaurantLocation: e.target.value })}
          />
        </Form.Group>

          {/* <Form.Group className="mb-3">
          <Form.Label>CreationDate</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.creationDate}
            onChange={(e) => setFormData({ ...formData, creationDate: e.target.value })}
          />
        </Form.Group> */}
        
        <Button variant="primary" type="submit">
          {id ? 'Update' : 'Create'}
        </Button>
        <Button
          variant="secondary"
          className="ms-2"
          onClick={() => navigate('/restaurants')}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default RestaurantForm;