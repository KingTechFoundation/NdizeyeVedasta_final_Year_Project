import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { 
  BookOpen, 
  Video,
  FileText,
  Search,
  Clock,
  TrendingUp,
  Heart,
  Apple,
  Dumbbell,
  Brain,
  Bookmark,
  Play,
  ChevronRight
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function EducationalResources() {
  const articles = [
    {
      id: 1,
      title: 'Understanding Your BMI and What It Means',
      category: 'Health Basics',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1645652367526-a0ecb717650a?w=400&q=80',
      excerpt: 'Learn what your Body Mass Index tells you about your health and its limitations.',
      saved: false,
    },
    {
      id: 2,
      title: 'The Importance of Protein in Muscle Recovery',
      category: 'Nutrition',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1621484488308-3fc11031f2b6?w=400&q=80',
      excerpt: 'Discover how protein helps your muscles recover and grow after workouts.',
      saved: true,
    },
    {
      id: 3,
      title: 'HIIT vs Steady-State Cardio: Which is Better?',
      category: 'Fitness',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1729280860113-82372b7afad6?w=400&q=80',
      excerpt: 'Compare the benefits of high-intensity interval training and traditional cardio.',
      saved: false,
    },
    {
      id: 4,
      title: 'Sleep and Recovery: The Missing Link',
      category: 'Wellness',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1645652367526-a0ecb717650a?w=400&q=80',
      excerpt: 'Why quality sleep is crucial for your fitness goals and overall health.',
      saved: true,
    },
    {
      id: 5,
      title: 'Preventing Common Workout Injuries',
      category: 'Safety',
      readTime: '10 min',
      image: 'https://images.unsplash.com/photo-1584827387179-355517d8a5fb?w=400&q=80',
      excerpt: 'Essential tips to stay safe and injury-free during your fitness journey.',
      saved: false,
    },
    {
      id: 6,
      title: 'Meal Prep 101: Save Time and Stay on Track',
      category: 'Nutrition',
      readTime: '12 min',
      image: 'https://images.unsplash.com/photo-1621484488308-3fc11031f2b6?w=400&q=80',
      excerpt: 'A beginner\'s guide to planning and preparing healthy meals in advance.',
      saved: false,
    },
  ];

  const videos = [
    {
      id: 1,
      title: 'Perfect Push-Up Form Tutorial',
      duration: '8:23',
      category: 'Exercise Technique',
      thumbnail: 'https://images.unsplash.com/photo-1584827387179-355517d8a5fb?w=400&q=80',
      views: '12.5K',
    },
    {
      id: 2,
      title: 'Healthy Meal Prep for Beginners',
      duration: '15:42',
      category: 'Cooking',
      thumbnail: 'https://images.unsplash.com/photo-1621484488308-3fc11031f2b6?w=400&q=80',
      views: '28.3K',
    },
    {
      id: 3,
      title: '20-Minute Full Body Workout',
      duration: '20:15',
      category: 'Workout',
      thumbnail: 'https://images.unsplash.com/photo-1729280860113-82372b7afad6?w=400&q=80',
      views: '45.2K',
    },
    {
      id: 4,
      title: 'Understanding Macronutrients',
      duration: '12:30',
      category: 'Nutrition Education',
      thumbnail: 'https://images.unsplash.com/photo-1621484488308-3fc11031f2b6?w=400&q=80',
      views: '19.8K',
    },
  ];

  const topics = [
    { name: 'Weight Loss', icon: TrendingUp, color: 'bg-blue-100 text-blue-600', articles: 24 },
    { name: 'Muscle Gain', icon: Dumbbell, color: 'bg-purple-100 text-purple-600', articles: 18 },
    { name: 'Nutrition', icon: Apple, color: 'bg-green-100 text-green-600', articles: 32 },
    { name: 'Mental Health', icon: Brain, color: 'bg-pink-100 text-pink-600', articles: 15 },
    { name: 'Heart Health', icon: Heart, color: 'bg-red-100 text-red-600', articles: 21 },
    { name: 'Wellness', icon: Heart, color: 'bg-orange-100 text-orange-600', articles: 27 },
  ];

  const featuredContent = {
    title: 'Understanding Non-Communicable Diseases (NCDs)',
    description: 'A comprehensive guide to preventing lifestyle-related diseases through proper diet and exercise',
    duration: '15 min read',
    image: 'https://images.unsplash.com/photo-1645652367526-a0ecb717650a?w=800&q=80',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Educational Resources</h1>
        <p className="text-gray-600">Learn about health, fitness, and nutrition</p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search articles, videos, and guides..."
              className="pl-10 h-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Featured Content */}
      <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 flex flex-col justify-center">
            <Badge className="w-fit mb-4 bg-blue-600">Featured</Badge>
            <h2 className="text-2xl text-gray-900 mb-3">{featuredContent.title}</h2>
            <p className="text-gray-600 mb-4">{featuredContent.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {featuredContent.duration}
              </span>
              <Badge variant="secondary">Health Education</Badge>
            </div>
            <Button className="w-fit bg-blue-600 hover:bg-blue-700">
              Read Now
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="aspect-video lg:aspect-auto">
            <ImageWithFallback
              src={featuredContent.image}
              alt={featuredContent.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Card>

      {/* Topics Grid */}
      <div>
        <h2 className="text-xl text-gray-900 mb-4">Browse by Topic</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {topics.map((topic, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className={`w-12 h-12 rounded-full ${topic.color} flex items-center justify-center mx-auto mb-3`}>
                  <topic.icon className="w-6 h-6" />
                </div>
                <p className="text-sm text-gray-900 mb-1">{topic.name}</p>
                <p className="text-xs text-gray-500">{topic.articles} articles</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="articles">
            <FileText className="w-4 h-4 mr-2" />
            Articles
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="w-4 h-4 mr-2" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="saved">
            <Bookmark className="w-4 h-4 mr-2" />
            Saved
          </TabsTrigger>
        </TabsList>

        {/* Articles Tab */}
        <TabsContent value="articles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  {article.saved && (
                    <div className="absolute top-3 right-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <Bookmark className="w-4 h-4 text-blue-600 fill-blue-600" />
                      </div>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button className="flex-1">Read Article</Button>
                    <Button variant="outline" size="icon">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="outline">
              Load More Articles
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative group cursor-pointer">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                      <Play className="w-8 h-8 text-gray-900 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white text-sm px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{video.category}</Badge>
                    <span className="text-sm text-gray-500">{video.views} views</span>
                  </div>
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Saved Tab */}
        <TabsContent value="saved" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.filter(a => a.saved).map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <Bookmark className="w-4 h-4 text-blue-600 fill-blue-600" />
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button className="flex-1">Read Article</Button>
                    <Button variant="outline" size="icon">
                      <Bookmark className="w-4 h-4 fill-current" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {articles.filter(a => a.saved).length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Bookmark className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">No Saved Content</h3>
                <p className="text-gray-600 mb-4">
                  Start saving articles and videos to access them quickly later
                </p>
                <Button variant="outline">Browse Content</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
