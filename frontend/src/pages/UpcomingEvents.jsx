import React from 'react';

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      name: "City Marathon 2024",
      date: "September 15, 2024",
      location: "Central Park",
      description: "Join us for the annual City Marathon. Open to all ages with various distance categories.",
      image: "https://picsum.photos/400/300?random=4"
    },
    {
      id: 2,
      name: "Music in the Park",
      date: "October 5, 2024",
      location: "City Amphitheater",
      description: "An evening of live music performances featuring local bands and artists.",
      image: "https://picsum.photos/400/300?random=5"
    },
    {
      id: 3,
      name: "Food Festival",
      date: "November 10, 2024",
      location: "Downtown Square",
      description: "Experience the best of local and international cuisine at the City Food Festival.",
      image: "https://picsum.photos/400/300?random=6"
    },
    // Add more events as needed
  ];

  return (
    <div className="text-center py-10 px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Upcoming Public Events</h1>
      <p className="text-lg text-gray-600 mb-12">
        Stay updated with the latest public events happening in your city. Mark your calendars and join the community!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event.id} className="bg-white shadow-lg rounded-lg p-6">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h2 className="text-2xl font-semibold text-blue-500 mt-4">{event.name}</h2>
            <p className="text-gray-600 mt-2">{event.date}</p>
            <p className="text-gray-600">{event.location}</p>
            <p className="mt-4 text-gray-600">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
