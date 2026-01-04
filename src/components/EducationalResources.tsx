import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import {
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
  ChevronRight,
  Loader2,
  X,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { resourceApi, type Resource } from '../services/api';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';

type ViewMode = 'list' | 'article' | 'video';

export default function EducationalResources() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [featuredResource, setFeaturedResource] = useState<Resource | null>(null);
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'article' | 'video' | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchResources();
    fetchCategories();
  }, [selectedCategory, selectedType, searchQuery, currentPage]);

  const fetchResources = async () => {
    setIsLoading(true);
    try {
      const response = await resourceApi.getResources({
        type: selectedType === 'all' ? undefined : selectedType,
        category: selectedCategory || undefined,
        search: searchQuery || undefined,
        featured: false,
        page: currentPage,
        limit: 12,
      });
      if (response.success && response.data) {
        setResources(response.data.resources);
        setTotalPages(response.data.pagination.pages);
      }
    } catch (error) {
      toast.error('Failed to load resources');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFeatured = async () => {
    try {
      const response = await resourceApi.getResources({
        featured: true,
        limit: 1,
      });
      if (response.success && response.data && response.data.resources.length > 0) {
        setFeaturedResource(response.data.resources[0]);
      }
    } catch (error) {
      console.error('Failed to load featured resource');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await resourceApi.getCategories();
      if (response.success && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error('Failed to load categories');
    }
  };

  useEffect(() => {
    fetchFeatured();
  }, []);

  const handleResourceClick = async (resource: Resource) => {
    try {
      const response = await resourceApi.getResourceById(resource._id);
      if (response.success && response.data) {
        setSelectedResource(response.data.resource);
        setViewMode(resource.type === 'article' ? 'article' : 'video');
      }
    } catch (error) {
      toast.error('Failed to load resource');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchResources();
  };

  const categoryIcons: Record<string, any> = {
    'fitness': Dumbbell,
    'nutrition': Apple,
    'health-education': Brain,
    'wellness': Heart,
    'workout-guides': Dumbbell,
    'meal-planning': Apple,
    'mental-health': Brain,
    'disease-prevention': Heart,
  };

  const categoryColors: Record<string, string> = {
    'fitness': 'bg-purple-100 text-purple-600',
    'nutrition': 'bg-green-100 text-green-600',
    'health-education': 'bg-blue-100 text-blue-600',
    'wellness': 'bg-pink-100 text-pink-600',
    'workout-guides': 'bg-purple-100 text-purple-600',
    'meal-planning': 'bg-green-100 text-green-600',
    'mental-health': 'bg-pink-100 text-pink-600',
    'disease-prevention': 'bg-red-100 text-red-600',
  };

  // Article View
  if (viewMode === 'article' && selectedResource) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 p-6">
        <Button
          variant="ghost"
          onClick={() => {
            setViewMode('list');
            setSelectedResource(null);
          }}
          className="mb-4"
        >
          <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
          Back to Resources
        </Button>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">{selectedResource.category}</Badge>
                  {selectedResource.featured && <Badge className="bg-blue-600">Featured</Badge>}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedResource.title}</h1>
                <p className="text-lg text-gray-600 mb-4">{selectedResource.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>By {selectedResource.author}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedResource.duration} min read
                  </span>
                  <span>{selectedResource.views} views</span>
                </div>
              </div>

              {selectedResource.thumbnail && (
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={selectedResource.thumbnail}
                    alt={selectedResource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="prose prose-lg max-w-none">
                {selectedResource.content ? (
                  <ReactMarkdown>{selectedResource.content}</ReactMarkdown>
                ) : (
                  <p className="text-gray-600">Content not available.</p>
                )}
              </div>

              {selectedResource.tags && selectedResource.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  {selectedResource.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Video View
  if (viewMode === 'video' && selectedResource) {
    const getVideoEmbedUrl = (url: string): string => {
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId = '';
        if (url.includes('youtube.com/embed/')) {
          videoId = url.split('youtube.com/embed/')[1]?.split('?')[0] || '';
        } else if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
        } else if (url.includes('youtube.com/watch?v=')) {
          videoId = url.split('v=')[1]?.split('&')[0] || '';
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
      }
      return url;
    };

    return (
      <div className="max-w-5xl mx-auto space-y-6 p-6">
        <Button
          variant="ghost"
          onClick={() => {
            setViewMode('list');
            setSelectedResource(null);
          }}
          className="mb-4"
        >
          <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
          Back to Resources
        </Button>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">{selectedResource.category}</Badge>
                  {selectedResource.featured && <Badge className="bg-blue-600">Featured</Badge>}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedResource.title}</h1>
                <p className="text-lg text-gray-600 mb-4">{selectedResource.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>By {selectedResource.author}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedResource.duration} min
                  </span>
                  <span>{selectedResource.views} views</span>
                </div>
              </div>

              {selectedResource.videoUrl && (
                <div className="aspect-video rounded-lg overflow-hidden bg-black">
                  <iframe
                    src={getVideoEmbedUrl(selectedResource.videoUrl)}
                    title={selectedResource.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {selectedResource.content && (
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 whitespace-pre-line">{selectedResource.content}</p>
                </div>
              )}

              {selectedResource.tags && selectedResource.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  {selectedResource.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // List View
  const articles = resources.filter(r => r.type === 'article');
  const videos = resources.filter(r => r.type === 'video');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Educational Resources</h1>
        <p className="text-gray-600">Learn about health, fitness, and nutrition</p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search articles, videos, and guides..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                  fetchResources();
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Featured Content */}
      {featuredResource && (
        <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 flex flex-col justify-center">
              <Badge className="w-fit mb-4 bg-blue-600">Featured</Badge>
              <h2 className="text-2xl text-gray-900 mb-3">{featuredResource.title}</h2>
              <p className="text-gray-600 mb-4">{featuredResource.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {featuredResource.duration} min {featuredResource.type === 'article' ? 'read' : ''}
                </span>
                <Badge variant="secondary">{featuredResource.category}</Badge>
              </div>
              <Button
                className="w-fit bg-blue-600 hover:bg-blue-700"
                onClick={() => handleResourceClick(featuredResource)}
              >
                {featuredResource.type === 'article' ? 'Read Now' : 'Watch Now'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="aspect-video lg:aspect-auto">
              <ImageWithFallback
                src={featuredResource.thumbnail || ''}
                alt={featuredResource.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h2 className="text-xl text-gray-900 mb-4">Browse by Topic</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card
              className={`hover:shadow-lg transition-shadow cursor-pointer ${selectedCategory === '' ? 'ring-2 ring-blue-600' : ''}`}
              onClick={() => {
                setSelectedCategory('');
                setCurrentPage(1);
              }}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-gray-600" />
                </div>
                <p className="text-sm text-gray-900 mb-1">All</p>
                <p className="text-xs text-gray-500">{resources.length} items</p>
              </CardContent>
            </Card>
            {categories.map((category) => {
              const Icon = categoryIcons[category.name] || TrendingUp;
              const color = categoryColors[category.name] || 'bg-gray-100 text-gray-600';
              return (
                <Card
                  key={category.name}
                  className={`hover:shadow-lg transition-shadow cursor-pointer ${selectedCategory === category.name ? 'ring-2 ring-blue-600' : ''}`}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setCurrentPage(1);
                  }}
                >
                  <CardContent className="pt-6 text-center">
                    <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mx-auto mb-3`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-sm text-gray-900 mb-1">{category.name}</p>
                    <p className="text-xs text-gray-500">{category.count} items</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      <Tabs defaultValue="articles" className="w-full" onValueChange={(value) => setSelectedType(value === 'articles' ? 'article' : value === 'videos' ? 'video' : 'all')}>
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
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : articles.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-600">No articles found.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Card key={article._id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleResourceClick(article)}>
                    <div className="aspect-video relative">
                      <ImageWithFallback
                        src={article.thumbnail || ''}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{article.category}</Badge>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.duration} min
                        </span>
                      </div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <CardDescription>{article.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">Read Article</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4 text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos" className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : videos.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-600">No videos found.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((video) => (
                  <Card key={video._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative group cursor-pointer" onClick={() => handleResourceClick(video)}>
                      <ImageWithFallback
                        src={video.thumbnail || ''}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                          <Play className="w-8 h-8 text-gray-900 ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white text-sm px-2 py-1 rounded">
                        {video.duration} min
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
                      <Button className="w-full" onClick={() => handleResourceClick(video)}>
                        <Play className="w-4 h-4 mr-2" />
                        Watch Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4 text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>

        {/* Saved Tab */}
        <TabsContent value="saved" className="space-y-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
