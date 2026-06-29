import React, { useEffect, useState } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
  getRestaurants, 
  deleteRestaurant 
} from '../services/RestaurantService';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const { data } = await getRestaurants();
      setRestaurants(data);
    } catch (error) {
      setError('Failed to fetch restaurants');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRestaurant(id);
      fetchRestaurants();
    } catch (error) {
      setError('Failed to delete restaurant');
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Button 
        variant="primary" 
        className="mb-3"
        onClick={() => navigate('/restaurants/add')}
      >
        Add Restaurant
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            {/* <th>CreationDate</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((rest) => (
            <tr key={rest.id}>
              <td>{rest.id}</td>
              <td>{rest.restaurantName}</td>
              <td>{rest.restaurantLocation}</td>
              {/* <td>{rest.creationDate}</td> */}
              <td>
                <Button 
                  variant="info" 
                  size="sm"
                  onClick={() => navigate(`/restaurants/edit/${rest.id}`)}
                >
                  Edit
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  className="ms-2"
                  onClick={() => handleDelete(rest.id)}
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

export default RestaurantList;