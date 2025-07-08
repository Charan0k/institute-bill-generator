
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, FileText, Users, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Excellence Education
              <span className="block text-blue-600">Institute</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamlined billing solutions for modern educational institutions. 
              Generate professional fee bills with ease and transparency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/generate-bill" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Generate Bill
              </Link>
              <Link 
                to="/about" 
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Billing System?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive, flexible, and user-friendly billing solutions tailored for educational institutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FileText className="w-8 h-8" />,
                title: "Dynamic Bills",
                description: "Generate 2-part, 3-part, or 5-part bills based on your needs"
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: "Student-Centric",
                description: "Organized by student details with comprehensive fee breakdown"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Parent-Friendly",
                description: "Clear, transparent billing that parents can easily understand"
              },
              {
                icon: <Phone className="w-8 h-8" />,
                title: "Support Ready",
                description: "Professional support for all your billing queries"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Streamline Your Billing?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of educational institutions using our professional billing system
          </p>
          <Link 
            to="/generate-bill"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg inline-block"
          >
            Start Generating Bills
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
