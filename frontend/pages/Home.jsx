import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <div className="bg-gray-300 w-full h-40 flex items-center justify-center">
        <div className="flex items-center justify-center">
          <img src="/api/placeholder/100/100" alt="Hero banner" className="opacity-50" />
        </div>
      </div>

      {/* Explore Products Section */}
      <div className="py-6 px-4">
        <h2 className="text-xl font-semibold mb-2">Explore our products</h2>
        <p className="text-sm text-gray-500 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo
          sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat.
        </p>

        {/* Product Categories */}
        <div className="flex justify-between mb-8">
          <CategoryCircle title="Gym equipment" />
          <CategoryCircle title="Supplements" />
          <CategoryCircle title="Used items" />
        </div>

        {/* Top Items Section */}
        <h2 className="text-xl font-semibold mb-4">Top items near you</h2>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
        </div>
      </div>

      {/* Dark Divider */}
      <div className="bg-gray-300 w-full h-5 mt-auto"></div>

      {/* Bottom Features Section */}
      <div className="py-6 px-4">
        <div className="grid grid-cols-3 gap-4">
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
        </div>
      </div>
    </div>
  );
}

// Category Circle Component
function CategoryCircle({ title }) {
  return (
    <div className="flex flex-col items-center">
      <div 
        className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center mb-2 cursor-pointer hover:border-gray-400 transition-all"
        onClick={() => console.log(`Clicked on ${title}`)}
      >
        <img src="/api/placeholder/50/50" alt={title} className="opacity-50" />
      </div>
      <span className="text-sm text-center">{title}</span>
    </div>
  );
}

// Feature Card Component
function FeatureCard() {
  return (
    <div 
      className="bg-gray-100 p-4 rounded cursor-pointer hover:shadow-md transition-all"
      onClick={() => console.log('Feature clicked')}
    >
      <div className="mb-2">
        <img src="/api/placeholder/100/60" alt="Feature" className="w-full opacity-50" />
      </div>
      <h3 className="font-semibold mb-1">Feature</h3>
      <p className="text-xs text-gray-500">
        Lorem ipsum dolor sit amet nulla adipiscing elit. Nunc maximus, nulla adipiscing elit. Nunc...
      </p>
    </div>
  );
}

