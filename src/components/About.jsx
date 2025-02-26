import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Community Resource Exchange
        </h1>
        <p className="text-xl text-gray-600">
          Empowering communities through collaborative sharing and mutual support
        </p>
      </div>

      {/* Mission Statement */}
      <div className="max-w-4xl mx-auto mb-16 bg-white rounded-xl shadow-lg p-8 transform hover:scale-[1.02] transition-transform">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          The Community Resource Exchange System is dedicated to creating a platform 
          where neighbors can share resources, skills, and support with one another. 
          We believe in building stronger communities through collaborative consumption 
          and mutual aid, making resources more accessible while reducing waste and 
          fostering meaningful connections.
        </p>
      </div>

      {/* Key Features */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Feature 
            icon="🔄"
            title="Resource Sharing"
            description="List items you're willing to share or browse what others are offering. From tools to skills, every resource counts."
          />
          <Feature 
            icon="👥"
            title="Community Building"
            description="Connect with neighbors, build trust, and strengthen local community bonds through meaningful exchanges."
          />
          <Feature 
            icon="🤝"
            title="Mutual Support"
            description="Contribute your unique skills and resources while benefiting from what others can offer. Everyone has something valuable to share."
          />
          <Feature 
            icon="🛡️"
            title="Trust & Safety"
            description="Our platform includes verification systems and community guidelines to ensure safe and reliable exchanges."
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-4xl mx-auto mb-16 bg-blue-50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Value
            icon="🏘️"
            title="Community First"
            description="We prioritize building strong, lasting connections within neighborhoods."
          />
          <Value
            icon="🌱"
            title="Sustainability"
            description="Reducing waste and promoting resource efficiency through sharing."
          />
          <Value
            icon="🌈"
            title="Inclusivity"
            description="Creating a platform that's accessible and welcoming to everyone."
          />
        </div>
      </div>

      {/* Impact Stats */}
      <div className="max-w-4xl mx-auto mb-16 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <Stat 
            icon="👥"
            number="5000+" 
            label="Active Members" 
          />
          <Stat 
            icon="🤝"
            number="10000+" 
            label="Successful Exchanges" 
          />
          <Stat 
            icon="🌍"
            number="50+" 
            label="Local Communities" 
          />
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-4xl mx-auto mb-16 bg-green-50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Benefit
            icon="💰"
            title="Save Money"
            description="Access resources without the need to purchase everything yourself."
          />
          <Benefit
            icon="♻️"
            title="Reduce Waste"
            description="Share rarely-used items instead of buying new ones."
          />
          <Benefit
            icon="🤝"
            title="Build Connections"
            description="Meet neighbors and form lasting community bonds."
          />
          <Benefit
            icon="📚"
            title="Share Knowledge"
            description="Exchange skills and learn from community members."
          />
        </div>
      </div>

      {/* Join Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Join Our Community
        </h2>
        <p className="text-gray-600 mb-8">
          Start sharing, connecting, and building a stronger community today. 
          Every member makes our network more valuable for everyone.
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors transform hover:scale-105">
          Get Started
        </button>
      </div>
    </div>
  );
};

const Feature = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-transform">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 bg-gray-50 p-4 rounded-full text-4xl">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

const Value = ({ icon, title, description }) => {
  return (
    <div className="text-center p-4">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Stat = ({ icon, number, label }) => {
  return (
    <div className="p-4">
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-3xl font-bold text-blue-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

const Benefit = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-start space-x-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default About;