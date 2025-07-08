
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GraduationCap, Users, Award, Target } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Students Served', value: '10,000+', icon: <Users className="w-8 h-8" /> },
    { label: 'Years of Excellence', value: '25+', icon: <Award className="w-8 h-8" /> },
    { label: 'Success Rate', value: '98%', icon: <Target className="w-8 h-8" /> },
    { label: 'Faculty Members', value: '150+', icon: <GraduationCap className="w-8 h-8" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About Excellence Education Institute
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Committed to educational excellence and transparent billing solutions for over two decades
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Excellence Education Institute, we believe that transparency in education extends beyond 
                the classroom. Our mission is to provide world-class education while maintaining complete 
                transparency in our billing and administrative processes.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We understand that parents need clear, comprehensive information about educational expenses. 
                That's why we've developed this state-of-the-art billing system that provides detailed 
                breakdowns and flexible formatting options.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Our Values</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• Transparency in all financial matters</li>
                  <li>• Excellence in educational delivery</li>
                  <li>• Innovation in administrative processes</li>
                  <li>• Commitment to student and parent satisfaction</li>
                </ul>
              </div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Excellence Education Institute Building"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12 animate-fade-in">
            Our Impact in Numbers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center text-white animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4 text-blue-200">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 animate-fade-in">
            Why Choose Our Billing System?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Flexible Billing Formats",
                description: "Choose from 2-part, 3-part, or 5-part bill formats based on your needs and preferences.",
                color: "blue"
              },
              {
                title: "Complete Transparency",
                description: "Every fee component is clearly itemized with detailed descriptions and amounts.",
                color: "green"
              },
              {
                title: "Easy Access & Download",
                description: "Generate, preview, and download bills instantly with professional formatting.",
                color: "purple"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className={`text-xl font-semibold text-${feature.color}-600 mb-4`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
