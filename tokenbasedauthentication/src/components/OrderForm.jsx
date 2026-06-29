import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  createOrder, 
  getOrderById, 
  updateOrder 
} from '../services/OrderService';

function OrderForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    ordername: '',
    orderlocation: ''
  });

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        try {
          const { data } = await getOrderById(id);
          setFormData({
            ordername: data.ordername,
            orderlocation: data.orderlocation
          });
        } catch (error) {
          setError('Failed to load order');
        }
      };
      fetchOrder();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateOrder({ ...formData, orderid: id });
      } else {
        await createOrder(formData);
      }
      navigate('/orders');
    } catch (error) {
      setError(id ? 'Failed to update order' : 'Failed to create order');
      console.log(error);
    }
  };

  return (
    <div className="mt-4">
      <h2>{id ? 'Edit Order' : 'Create Order'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Order Name</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.ordername}
            onChange={(e) => setFormData({...formData, ordername: e.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.orderlocation}
            onChange={(e) => setFormData({...formData, orderlocation: e.target.value})}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {id ? 'Update' : 'Create'}
        </Button>
        <Button 
          variant="secondary" 
          className="ms-2"
          onClick={() => navigate('/orders')}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default OrderForm;