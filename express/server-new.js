const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());


let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];
let nextId = 3; 



app.post('/api/items', (req, res) => {
  const newItem = {
    id: nextId++,
    name: req.body.name, 
  };
  
  items.push(newItem);
  console.log('Created:', newItem);
  res.status(201).json(newItem); // 201 = Created
});


app.get('/api/items', (req, res) => {
  console.log('Read all items');
  res.status(200).json(items); // 200 = OK
});

app.get('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id); // The ID from the URL
  const item = items.find(i => i.id === itemId);

  if (!item) {
    // If item not found, send 404
    return res.status(404).json({ msg: 'Item not found' });
  }
  
  console.log('Read single:', item);
  res.status(200).json(item); // 200 = OK
});


app.put('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(i => i.id === itemId);

  if (!item) {
    return res.status(404).json({ msg: 'Item not found' });
  }


  item.name = req.body.name;
  console.log('Updated:', item);
  res.status(200).json(item); // 200 = OK
});

app.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ msg: 'Item not found' });
  }

  // Remove the item from the array
  const deletedItem = items.splice(itemIndex, 1);
  console.log('Deleted:', deletedItem);
  res.status(200).json({ msg: 'Item deleted successfully' }); // 200 = OK
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});