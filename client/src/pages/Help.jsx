import React from 'react';

const Help = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Welcome to TradeBuddies!</h1>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why TradeBuddies!</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li><strong>Connect with Like-Minded People:</strong> TradeBuddies allows you to connect with individuals who have similar passions and goals, creating a supportive environment for personal and professional growth.</li>
            <li><strong>Skill Sharing and Learning:</strong> Whether you're looking to teach or learn, you can easily find opportunities to share and acquire new skills.</li>
            <li><strong>Easy Navigation:</strong> The platform is user-friendly, with a simple interface that makes it easy to explore various categories and connect with others.</li>
            <li><strong>Networking Opportunities:</strong> Connect with people who can help you expand your professional and personal network.</li>
            <li><strong>Grow Your Expertise:</strong> Collaborating with others exposes you to new ideas, helping you grow your knowledge and skillset.</li>
            <li><strong>A Safe and Supportive Environment:</strong> We foster a respectful and inclusive community where you can share and collaborate freely.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Will You Gain:</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li><strong>New Connections:</strong> Meet new people who share your passions and goals.</li>
            <li><strong>Learning Opportunities:</strong> Gain access to resources that will help boost your skills.</li>
            <li><strong>Skill Exchange:</strong> Teach others what you know or learn from others to expand your expertise.</li>
            <li><strong>Career Development:</strong> Unlock new career opportunities through networking and skill-building.</li>
            <li><strong>Community Engagement:</strong> Be part of an active and supportive community encouraging growth and collaboration.</li>
          </ul>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">For More Information:</h2>
          <p className="text-lg text-gray-700 mb-4">If you have any questions or need further assistance, feel free to reach out!</p>
          <p className="text-lg text-gray-700 mb-4">You can get in touch with <strong>Sanjana</strong> for any inquiries or support.</p>
          
          <div className="space-x-6">
            <a
              href="https://wa.me/YourPhoneNumber"
              className="text-indigo-600 hover:text-indigo-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on WhatsApp
            </a>
            <span className="text-gray-600">or</span>
            <a
              href="tel:+YourPhoneNumber"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Call: Your Phone Number
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Help;
