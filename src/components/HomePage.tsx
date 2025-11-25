import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Activity, Heart, TrendingUp, Users, Smartphone, Brain, Shield, Award, ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTheme } from './ThemeProvider';
import { Moon, Sun } from 'lucide-react';

interface HomePageProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const heroImages = [
  'https://images.unsplash.com/photo-1756115484694-009466dbaa67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29ya291dCUyMGd5bXxlbnwxfHx8fDE3NjIwMTExNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1670164747721-d3500ef757a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMG51dHJpdGlvbnxlbnwxfHx8fDE3NjE5NjYyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1598221859975-ad080eba6ba3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwZXhlcmNpc2UlMjBvdXRkb29yfGVufDF8fHx8MTc2MTk4Mzg3OHww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1645652367526-a0ecb717650a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHdlbGxuZXNzfGVufDF8fHx8MTc2MjAzMDkyOHww&ixlib=rb-4.1.0&q=80&w=1080',
];

const testimonials = [
  {
    name: 'Uwase Marie',
    role: 'Fitness Enthusiast',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    content: 'Medifit AI has completely transformed my fitness journey. The personalized workout plans and nutrition guidance have helped me achieve goals I never thought possible.',
    rating: 5,
  },
  {
    name: 'Mugisha Jean',
    role: 'Marathon Runner',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    content: 'The AI-powered coaching is incredible! It adapts to my progress and keeps me motivated. The health tracking integration with my smartwatch is seamless.',
    rating: 5,
  },
  {
    name: 'Ingabire Sarah',
    role: 'Yoga Instructor',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    content: 'As a yoga instructor, I appreciate how Medifit AI understands the importance of balance. The meal plans are perfectly tailored to my vegetarian lifestyle.',
    rating: 5,
  },
  {
    name: 'Niyonzima David',
    role: 'Businessman',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    content: 'With my busy schedule, Medifit AI helps me stay on track. The 24/7 chatbot coach is like having a personal trainer in my pocket.',
    rating: 5,
  },
  {
    name: 'Mutesi Grace',
    role: 'Teacher',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    content: 'The educational resources have taught me so much about health and wellness. I feel empowered to make better choices every day.',
    rating: 5,
  },
];

export default function HomePage({ onLoginClick, onSignupClick }: HomePageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { theme, setTheme } = useTheme();

  // Auto-advance hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <span className="text-xl text-gray-900 dark:text-white">Medifit AI</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('hero')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('vision')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Vision
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Testimonials
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Button variant="ghost" onClick={onLoginClick}>
                Login
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={onSignupClick}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Background Images */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={heroImages[currentImageIndex]}
                alt="Hero background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl text-white mb-6">
              Your AI-Powered
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Health Companion
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Transform your health journey with personalized fitness plans, nutrition guidance, and real-time health tracking powered by artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
                onClick={onSignupClick}
              >
                Start Your Journey
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10 text-lg px-8 py-6"
                onClick={() => scrollToSection('vision')}
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Image Indicators */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
              Our Vision
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Empowering Rwanda's Smart Health initiative with AI-driven preventive healthcare, 
              making personalized wellness accessible to both urban and rural populations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-12 h-12 text-blue-600" />,
                title: 'AI-Powered Personalization',
                description: 'Advanced algorithms create customized fitness and nutrition plans tailored to your unique health profile and goals.',
              },
              {
                icon: <Heart className="w-12 h-12 text-red-600" />,
                title: 'Preventive Healthcare',
                description: 'Identify NCD risk factors early with predictive models and take proactive steps towards a healthier future.',
              },
              {
                icon: <Smartphone className="w-12 h-12 text-green-600" />,
                title: 'Wearable Integration',
                description: 'Seamlessly connect with your fitness trackers and smartwatches for real-time health monitoring and insights.',
              },
              {
                icon: <Users className="w-12 h-12 text-purple-600" />,
                title: '24/7 AI Coaching',
                description: 'Get instant guidance and support from our intelligent chatbot coach, available whenever you need it.',
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-orange-600" />,
                title: 'Smart Analytics',
                description: 'Track your progress with comprehensive analytics and visualizations that help you understand your health journey.',
              },
              {
                icon: <Shield className="w-12 h-12 text-indigo-600" />,
                title: 'Data Privacy',
                description: 'Your health data is encrypted and secure. We prioritize your privacy with enterprise-grade security measures.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="text-xl mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of satisfied users transforming their health
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="relative">
                  <CardContent className="p-8 md:p-12">
                    <Quote className="w-12 h-12 text-blue-600 mb-6 opacity-50" />
                    <div className="flex mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 italic">
                      "{testimonials[currentTestimonial].content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <ImageWithFallback
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-gray-900 dark:text-white">
                          {testimonials[currentTestimonial].name}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {testimonials[currentTestimonial].role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTestimonial
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Join Rwanda's Smart Health initiative and start your personalized wellness journey today.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
            onClick={onSignupClick}
          >
            Get Started Free
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-8 h-8 text-blue-600" />
                <span className="text-xl">Medifit AI</span>
              </div>
              <p className="text-gray-400">
                AI-powered fitness and nutrition coaching for a healthier Rwanda.
              </p>
            </div>
            <div>
              <h3 className="mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Medifit AI - Rwanda Smart Health Initiative. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
