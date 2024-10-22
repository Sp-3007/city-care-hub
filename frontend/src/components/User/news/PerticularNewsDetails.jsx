import React from 'react';
import { useParams } from 'react-router-dom';

const PerticularNewsDetails = () => {
  const { id } = useParams();

  const newsItems = [
    {
      id: 1,
      title: "New Policy for Waste Management Announced",
      date: "August 28, 2024",
      description: "The ruling party has introduced a new policy aimed at improving waste management across the city. The policy includes plans to increase recycling rates and reduce landfill usage by 30% by 2025. The policy is expected to take effect starting in January 2025. Residents are encouraged to participate in the new recycling programs...",
      image: "https://picsum.photos/400/300?random=1"
    },
    {
      id: 2,
      title: "Improvement in Public Transport Services",
      date: "August 20, 2024",
      description: "Public transportation in the city is set to improve with the introduction of new buses and extended routes, making commuting easier for residents. The city government has allocated a significant budget to ensure that all neighborhoods have access to public transport by 2025...",
      image: "https://picsum.photos/400/300?random=2"
    },
    {
      id: 3,
      title: "New Parks and Recreation Areas Planned",
      date: "August 15, 2024",
      description: "The city government has announced plans to develop new parks and recreational areas in various neighborhoods. The goal is to promote outdoor activities and improve community health. Construction of the first park will begin in September 2024...",
      image: "https://picsum.photos/400/300?random=3"
    },
    // More news items...
  ];

  // Find the news item based on the id
  const newsItem = newsItems.find(item => item.id === parseInt(id));

  if (!newsItem) {
    return <div>News item not found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <img
        src={newsItem.image}
        alt={newsItem.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold text-blue-600 mb-4">{newsItem.title}</h1>
      <p className="text-gray-500 text-lg mb-6">{newsItem.date}</p>
      <p className="text-lg text-gray-700">{newsItem.description}</p>
    </div>
  );
};

export default PerticularNewsDetails;
