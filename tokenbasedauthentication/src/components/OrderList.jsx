import React, { useEffect, useState } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
  getOrders, 
  deleteOrder 
} from '../services/OrderService';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await getOrders();
      setOrders(data);
    } catch (error) {
      setError('Failed to fetch orders');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      fetchOrders();
    } catch (error) {
      setError('Failed to delete Order');
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Button 
        variant="primary" 
        className="mb-3"
        onClick={() => navigate('/orders/add')}
      >
        Add Order
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((ord) => (
            <tr key={ord.orderid}>
              <td>{ord.orderid}</td>
              <td>{ord.ordername}</td>
              <td>{ord.orderlocation}</td>
              <td>
                <Button 
                  variant="info" 
                  size="sm"
                  onClick={() => navigate(`/orders/edit/${ord.orderid}`)}
                >
                  Edit
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  className="ms-2"
                  onClick={() => handleDelete(ord.orderid)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default OrderList;