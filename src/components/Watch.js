import React, { useState, useEffect } from 'react';

const Watch = () => {
  const [event, setEvent] = useState('');
  const [eventEdit, setEventEdit] = useState(null);
  const [watched, setWatched] = useState(false);

  // Saves data to Local Storage
  useEffect(() => {
    if (eventEdit) {
      localStorage.setItem('watchList', JSON.stringify({ ...eventEdit, watched }));
    }
  }, [eventEdit, watched]);

  // Pulls data from Local Storage
  useEffect(() => {
    const storedEvent = JSON.parse(localStorage.getItem('watchList'));
    if (storedEvent) {
      setEvent(storedEvent.title);
      setEventEdit(storedEvent);
      setWatched(storedEvent.watched || false);
    }
  }, []);

  // Defines the submit, edit, delete functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (event.trim()) {
      const newEvent = { id: Date.now(), title: event, watched };
      setEventEdit(newEvent);
    }
    setEvent(''); 
  };

  const handleEdit = (item) => {
    setEvent(item.title);
    setEventEdit(item);
  };

  const handleDelete = () => {
    setEvent('');
    setEventEdit(null);
    setWatched(false);
    localStorage.removeItem('watchList');
  };

  const handleWatch = () => {
    setWatched(!watched); // Changes the button to "watched" when selected
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <h1>My Watch List</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          placeholder="Enter a title"
        />
        <button type="submit">Submit</button>
      </form>
      {eventEdit && (
        <div className="event-item">
          <br />
          <span>{eventEdit.title}</span>
          <button onClick={() => handleEdit(eventEdit)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleWatch}>
            {watched ? 'Watched' : 'Watch'}
          </button>
          <br />
        </div>
      )}
    </div>
  );
};

export default Watch;