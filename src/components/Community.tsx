import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Users, 
  Trophy, 
  TrendingUp, 
  Calendar,
  Share2,
  Heart,
  MessageCircle,
  Award,
  Target,
  Flame,
  Activity,
  Camera,
  Upload
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function Community() {
  const [joinedChallenges, setJoinedChallenges] = useState<number[]>([1, 3]);

  const activeChallenges = [
    {
      id: 1,
      name: '30-Day Step Challenge',
      description: 'Reach 10,000 steps every day for 30 days',
      participants: 1247,
      daysLeft: 12,
      prize: 'Gold Badge + Premium Month',
      progress: 60,
      icon: Activity,
      color: 'bg-blue-100 text-blue-600',
      joined: true,
    },
    {
      id: 2,
      name: 'Healthy Eating Week',
      description: 'Log all meals and stay within calorie goals',
      participants: 832,
      daysLeft: 4,
      prize: 'Nutrition Guide Bundle',
      progress: 0,
      icon: Trophy,
      color: 'bg-green-100 text-green-600',
      joined: false,
    },
    {
      id: 3,
      name: 'Strength Training Marathon',
      description: 'Complete 20 strength workouts this month',
      participants: 645,
      daysLeft: 18,
      prize: 'Fitness Equipment Discount',
      progress: 45,
      icon: Target,
      color: 'bg-purple-100 text-purple-600',
      joined: true,
    },
    {
      id: 4,
      name: 'Hydration Heroes',
      description: 'Meet daily water goals for 21 consecutive days',
      participants: 1520,
      daysLeft: 9,
      prize: 'Wellness Pack',
      progress: 0,
      icon: Flame,
      color: 'bg-orange-100 text-orange-600',
      joined: false,
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah M.', points: 2850, avatar: 'SM', change: 0 },
    { rank: 2, name: 'John K.', points: 2720, avatar: 'JK', change: 2 },
    { rank: 3, name: 'Emma W.', points: 2690, avatar: 'EW', change: -1 },
    { rank: 4, name: 'Michael R.', points: 2540, avatar: 'MR', change: 1 },
    { rank: 5, name: 'You', points: 2480, avatar: 'VN', change: 3, highlight: true },
    { rank: 6, name: 'Lisa P.', points: 2350, avatar: 'LP', change: -2 },
    { rank: 7, name: 'David L.', points: 2290, avatar: 'DL', change: 0 },
    { rank: 8, name: 'Anna S.', points: 2180, avatar: 'AS', change: 1 },
  ];

  const communityPosts = [
    {
      id: 1,
      author: 'Sarah Martinez',
      avatar: 'SM',
      timeAgo: '2 hours ago',
      content: 'Just completed my first 5K run! The training plan from Medifit AI was perfect. Feeling amazing! 🎉',
      image: 'https://images.unsplash.com/photo-1729280860113-82372b7afad6?w=600&q=80',
      likes: 124,
      comments: 18,
      achievement: 'First 5K Complete',
    },
    {
      id: 2,
      author: 'John Kalisa',
      avatar: 'JK',
      timeAgo: '5 hours ago',
      content: 'Week 4 of my weight loss journey and down 3.5kg! The meal plans have been a game-changer. Thanks to everyone for the support!',
      likes: 89,
      comments: 12,
      stats: { before: '75kg', after: '71.5kg' },
    },
    {
      id: 3,
      author: 'Emma Wilson',
      avatar: 'EW',
      timeAgo: '1 day ago',
      content: 'Morning workout complete! Love the new HIIT routine. Who else is crushing their goals today? 💪',
      image: 'https://images.unsplash.com/photo-1584827387179-355517d8a5fb?w=600&q=80',
      likes: 156,
      comments: 24,
    },
  ];

  const handleJoinChallenge = (challengeId: number) => {
    setJoinedChallenges(prev => 
      prev.includes(challengeId) 
        ? prev.filter(id => id !== challengeId)
        : [...prev, challengeId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Community</h1>
          <p className="text-gray-600 dark:text-gray-400">Connect, compete, and get inspired</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Share2 className="w-4 h-4 mr-2" />
          Share Progress
        </Button>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Your Rank</p>
                <p className="text-3xl text-gray-900 dark:text-white">#5</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Points</p>
                <p className="text-3xl text-gray-900 dark:text-white">2,480</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Challenges Won</p>
                <p className="text-3xl text-gray-900 dark:text-white">8</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Community</p>
                <p className="text-3xl text-gray-900 dark:text-white">5.2K</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="challenges" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="challenges">
            <Trophy className="w-4 h-4 mr-2" />
            Challenges
          </TabsTrigger>
          <TabsTrigger value="leaderboard">
            <TrendingUp className="w-4 h-4 mr-2" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="feed">
            <Users className="w-4 h-4 mr-2" />
            Community Feed
          </TabsTrigger>
        </TabsList>

        {/* Challenges Tab */}
        <TabsContent value="challenges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeChallenges.map((challenge) => {
              const Icon = challenge.icon;
              const isJoined = joinedChallenges.includes(challenge.id);
              
              return (
                <Card key={challenge.id} className={isJoined ? 'border-2 border-blue-200 dark:border-blue-800' : ''}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-full ${challenge.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{challenge.name}</CardTitle>
                          <CardDescription>{challenge.description}</CardDescription>
                        </div>
                      </div>
                      {isJoined && (
                        <Badge className="bg-blue-600">Joined</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <Users className="w-4 h-4" />
                          {challenge.participants.toLocaleString()} participants
                        </span>
                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          {challenge.daysLeft} days left
                        </span>
                      </div>

                      {isJoined && challenge.progress > 0 && (
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600 dark:text-gray-400">Progress</span>
                            <span className="text-gray-900 dark:text-white">{challenge.progress}%</span>
                          </div>
                          <Progress value={challenge.progress} className="h-2" />
                        </div>
                      )}

                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm text-gray-900 dark:text-white">Prize: {challenge.prize}</span>
                        </div>
                      </div>

                      <Button 
                        className={`w-full ${isJoined ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                        onClick={() => handleJoinChallenge(challenge.id)}
                      >
                        {isJoined ? 'Leave Challenge' : 'Join Challenge'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl text-gray-900 dark:text-white mb-2">Want a Custom Challenge?</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Create your own challenge and invite friends to join
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Create Challenge
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Monthly Leaderboard</CardTitle>
                  <CardDescription>Top performers this month</CardDescription>
                </div>
                <Badge variant="secondary">November 2025</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      entry.highlight 
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        entry.rank === 1 ? 'bg-yellow-400' :
                        entry.rank === 2 ? 'bg-gray-300' :
                        entry.rank === 3 ? 'bg-orange-400' :
                        'bg-gray-200 dark:bg-gray-700'
                      }`}>
                        <span className={entry.rank <= 3 ? 'text-white' : 'text-gray-600 dark:text-gray-300'}>
                          #{entry.rank}
                        </span>
                      </div>
                      <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600">
                        <AvatarFallback className="text-white">{entry.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className={`${entry.highlight ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                          {entry.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {entry.points.toLocaleString()} points
                        </p>
                      </div>
                    </div>
                    {entry.change !== 0 && (
                      <Badge variant="secondary" className={
                        entry.change > 0 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }>
                        {entry.change > 0 ? '↑' : '↓'} {Math.abs(entry.change)}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Most Active</p>
                  <p className="text-xl text-gray-900 dark:text-white">Sarah M.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Flame className="w-12 h-12 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Longest Streak</p>
                  <p className="text-xl text-gray-900 dark:text-white">John K.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Most Improved</p>
                  <p className="text-xl text-gray-900 dark:text-white">Emma W.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Community Feed Tab */}
        <TabsContent value="feed" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600">
                  <AvatarFallback className="text-white">VN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <textarea
                    placeholder="Share your progress, achievements, or encourage others..."
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Camera className="w-4 h-4 mr-2" />
                        Photo
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Progress
                      </Button>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {communityPosts.map((post) => (
            <Card key={post.id}>
              <CardContent className="pt-6">
                <div className="flex gap-3 mb-4">
                  <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600">
                    <AvatarFallback className="text-white">{post.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-gray-900 dark:text-white">{post.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{post.timeAgo}</p>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>

                {post.achievement && (
                  <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm text-gray-900 dark:text-white">Achievement Unlocked: {post.achievement}</span>
                  </div>
                )}

                {post.stats && (
                  <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Before</p>
                        <p className="text-2xl text-gray-900 dark:text-white">{post.stats.before}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">After</p>
                        <p className="text-2xl text-green-600">{post.stats.after}</p>
                      </div>
                    </div>
                  </div>
                )}

                {post.image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt="Post"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors ml-auto">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
