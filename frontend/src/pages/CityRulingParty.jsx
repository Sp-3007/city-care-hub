import React from 'react';

const CityRulingParty = () => {
  const newsItems = [
    {
      id: 1,
      title: "New Policy for Waste Management Announced",
      date: "August 28, 2024",
      description: "The ruling party has introduced a new policy aimed at improving waste management across the city. The policy includes plans to increase recycling rates and reduce landfill usage by 30% by 2025.",
      image: "https://picsum.photos/400/300?random=1"
    },
    {
      id: 2,
      title: "Improvement in Public Transport Services",
      date: "August 20, 2024",
      description: "Public transportation in the city is set to improve with the introduction of new buses and extended routes, making commuting easier for residents.",
      image: "https://picsum.photos/400/300?random=2"
    },
    {
      id: 3,
      title: "New Parks and Recreation Areas Planned",
      date: "August 15, 2024",
      description: "The city government has announced plans to develop new parks and recreational areas in various neighborhoods, aimed at promoting outdoor activities and improving community health.",
      image: "https://picsum.photos/400/300?random=3"
    },
    // Add more news items as needed
  ];

  return (
    <div className="text-center py-10 px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Latest News</h1>
      <p className="text-lg text-gray-600 mb-12">
        Stay informed about the latest developments and policies from the current ruling party. Here are some of the key updates.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsItems.map((news) => (
          <div key={news.id} className="bg-white shadow-lg rounded-lg p-6">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h2 className="text-2xl font-semibold text-blue-500 mt-4">{news.title}</h2>
            <p className="text-gray-600 mt-2">{news.date}</p>
            <p className="mt-4 text-gray-600">{news.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityRulingParty;
