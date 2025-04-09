import React from 'react';

const HowItWorksBrief = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          How It Works
        </h1>
        <p className="text-xl text-gray-600">
          Start sharing and connecting with your community in just a few simple steps
        </p>
      </div>

      {/* Process Steps */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-xl shadow-lg p-6 h-full transform hover:scale-[1.02] transition-transform">
                <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold z-10">
                  {index + 1}
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 bg-blue-50 p-4 rounded-full text-4xl">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-2xl">
                  ➡️
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Guidelines Section */}
      <div className="max-w-4xl mx-auto mb-16 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Community Guidelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guidelines.map((guideline, index) => (
            <div key={index} className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
              <div className="text-3xl">🛡️</div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">{guideline.title}</h3>
                <p className="text-gray-600">{guideline.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-transform">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">⭐</div>
                <div>
                  <p className="text-gray-600 italic mb-4">{story.quote}</p>
                  <p className="text-gray-900 font-medium">{story.author}</p>
                  <p className="text-gray-500 text-sm">{story.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mb-16 bg-blue-50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600 mb-8">
          Join our community today and start sharing resources with your neighbors
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors transform hover:scale-105">
          Create Account
        </button>
      </div>
    </div>
  );
};

const steps = [
  {
    icon: "👤",
    title: "Create Your Profile",
    description: "Sign up and create your profile with your skills, interests, and the resources you're willing to share."
  },
  {
    icon: "🔍",
    title: "Browse & Connect",
    description: "Search for available resources or post what you're looking for. Find community members with matching offers."
  },
  {
    icon: "🤝",
    title: "Exchange & Share",
    description: "Arrange exchanges, share resources, and build trust through successful transactions and feedback."
  }
];

const guidelines = [
  {
    title: "Respect & Trust",
    description: "Treat all community members with respect and maintain open communication."
  },
  {
    title: "Safety First",
    description: "Follow safety guidelines for in-person exchanges and maintain privacy."
  },
  {
    title: "Clear Communication",
    description: "Be clear about expectations, timing, and conditions of resource sharing."
  },
  {
    title: "Reliable Exchange",
    description: "Honor your commitments and return borrowed items in good condition."
  }
];

const stories = [
  {
    quote: "I borrowed a power drill for my home project and ended up making a great friend in my neighborhood!",
    author: "Sarah M.",
    type: "Tool Exchange"
  },
  {
    quote: "Teaching Spanish to a neighbor while learning gardening tips from them has been an amazing experience.",
    author: "Michael K.",
    type: "Skill Exchange"
  }
];

const faqs = [
  {
    question: "How do I know if I can trust other members?",
    answer: "Our platform includes a verification system, user ratings, and reviews. Members build reputation through successful exchanges and community participation."
  },
  {
    question: "What kind of items can I share?",
    answer: "You can share tools, equipment, books, skills, knowledge, or any resource that might be valuable to others. All items must comply with our community guidelines."
  },
  {
    question: "Is there a fee to join?",
    answer: "Basic membership is free! We believe in making resource sharing accessible to everyone in the community."
  }
];

export default HowItWorksBrief;