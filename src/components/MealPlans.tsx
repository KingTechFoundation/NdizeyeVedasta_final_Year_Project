import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Apple, 
  Clock, 
  Flame,
  ChevronRight,
  Plus,
  BookOpen,
  Check,
  Search,
  Filter
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Input } from './ui/input';

export default function MealPlans() {
  const dailyNutrition = {
    calories: { consumed: 1450, goal: 2200 },
    protein: { consumed: 85, goal: 120 },
    carbs: { consumed: 165, goal: 220 },
    fats: { consumed: 45, goal: 70 },
  };

  const todayMeals = [
    {
      id: 1,
      type: 'Breakfast',
      time: '8:00 AM',
      name: 'Protein Oatmeal Bowl',
      description: 'Oatmeal with berries, almonds, and protein powder',
      calories: 420,
      protein: 28,
      carbs: 52,
      fats: 12,
      image: 'https://images.unsplash.com/photo-1621484488308-3fc11031f2b6?w=400&q=80',
      logged: true,
    },
    {
      id: 2,
      type: 'Mid-Morning Snack',
      time: '10:30 AM',
      name: 'Greek Yogurt & Fruit',
      description: 'Low-fat Greek yogurt with mixed berries',
      calories: 180,
      protein: 15,
      carbs: 22,
      fats: 3,
      image: 'https://images.unsplash.com/photo-1621484488308-3fc11031f2b6?w=400&q=80',
      logged: true,
    },
    {
      id: 3,
      type: 'Lunch',
      time: '1:00 PM',
      name: 'Grilled Chicken Salad',
      description: 'Mixed greens, grilled chicken, quinoa, avocado',
      calories: 520,
      protein: 42,
      carbs: 45,
      fats: 18,
      image: 'https://images.unsplash.com/photo-1621484488308-3fc11031f2b6?w=400&q=80',
      logged: true,
    },
    {
      id: 4,
      type: 'Afternoon Snack',
      time: '4:00 PM',
      name: 'Protein Smoothie',
      description: 'Banana, spinach, protein powder, almond milk',
      calories: 280,
      protein: 25,
      carbs: 35,
      fats: 8,
      image: 'https://images.unsplash.com/photo-1621484488308-3fc11031f2b6?w=400&q=80',
      logged: false,
    },
    {
      id: 5,
      type: 'Dinner',
      time: '7:00 PM',
      name: 'Salmon with Vegetables',
      description: 'Baked salmon, brown rice, steamed broccoli',
      calories: 580,
      protein: 48,
      carbs: 52,
      fats: 22,
      image: 'https://images.unsplash.com/photo-1621484488308-3fc11031f2b6?w=400&q=80',
      logged: false,
    },
  ];

  const recipes = [
    {
      id: 1,
      name: 'High-Protein Breakfast Bowl',
      prepTime: '15 min',
      calories: 450,
      difficulty: 'Easy',
      tags: ['High Protein', 'Breakfast', 'Vegetarian'],
      image: 'https://images.unsplash.com/photo-1621484488308-3fc11031f2b6?w=400&q=80',
    },
    {
      id: 2,
      name: 'Mediterranean Quinoa Salad',
      prepTime: '20 min',
      calories: 380,
      difficulty: 'Easy',
      tags: ['Lunch', 'Vegan', 'High Fiber'],
      image: 'https://images.unsplash.com/photo-1621484488308-3fc11031f2b6?w=400&q=80',
    },
    {
      id: 3,
      name: 'Grilled Chicken Meal Prep',
      prepTime: '30 min',
      calories: 520,
      difficulty: 'Medium',
      tags: ['High Protein', 'Meal Prep', 'Dinner'],
      image: 'https://images.unsplash.com/photo-1621484488308-3fc11031f2b6?w=400&q=80',
    },
    {
      id: 4,
      name: 'Veggie Stir-Fry',
      prepTime: '25 min',
      calories: 320,
      difficulty: 'Easy',
      tags: ['Vegan', 'Low Calorie', 'Dinner'],
      image: 'https://images.unsplash.com/photo-1621484488308-3fc11031f2b6?w=400&q=80',
    },
    {
      id: 5,
      name: 'Protein Smoothie Bowl',
      prepTime: '10 min',
      calories: 380,
      difficulty: 'Easy',
      tags: ['Breakfast', 'High Protein', 'Quick'],
      image: 'https://images.unsplash.com/photo-1621484488308-3fc11031f2b6?w=400&q=80',
    },
    {
      id: 6,
      name: 'Baked Salmon with Asparagus',
      prepTime: '35 min',
      calories: 480,
      difficulty: 'Medium',
      tags: ['Dinner', 'High Protein', 'Omega-3'],
      image: 'https://images.unsplash.com/photo-1621484488308-3fc11031f2b6?w=400&q=80',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Meal Plans</h1>
        <p className="text-gray-600">Your personalized nutrition guide</p>
      </div>

      {/* Daily Nutrition Overview */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
        <CardHeader>
          <CardTitle>Today's Nutrition</CardTitle>
          <CardDescription>Track your daily intake</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Calories</span>
                <span className="text-sm text-gray-900">
                  {dailyNutrition.calories.consumed}/{dailyNutrition.calories.goal}
                </span>
              </div>
              <Progress 
                value={(dailyNutrition.calories.consumed / dailyNutrition.calories.goal) * 100} 
                className="h-2"
              />
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-gray-600">
                  {dailyNutrition.calories.goal - dailyNutrition.calories.consumed} kcal remaining
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Protein</span>
                <span className="text-sm text-gray-900">
                  {dailyNutrition.protein.consumed}/{dailyNutrition.protein.goal}g
                </span>
              </div>
              <Progress 
                value={(dailyNutrition.protein.consumed / dailyNutrition.protein.goal) * 100} 
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Carbs</span>
                <span className="text-sm text-gray-900">
                  {dailyNutrition.carbs.consumed}/{dailyNutrition.carbs.goal}g
                </span>
              </div>
              <Progress 
                value={(dailyNutrition.carbs.consumed / dailyNutrition.carbs.goal) * 100} 
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Fats</span>
                <span className="text-sm text-gray-900">
                  {dailyNutrition.fats.consumed}/{dailyNutrition.fats.goal}g
                </span>
              </div>
              <Progress 
                value={(dailyNutrition.fats.consumed / dailyNutrition.fats.goal) * 100} 
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="today">Today's Meals</TabsTrigger>
          <TabsTrigger value="recipes">Recipe Library</TabsTrigger>
        </TabsList>

        {/* Today's Meals */}
        <TabsContent value="today" className="space-y-4">
          {todayMeals.map((meal) => (
            <Card key={meal.id} className={meal.logged ? 'bg-gray-50' : ''}>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={meal.image}
                      alt={meal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{meal.type}</Badge>
                          {meal.logged && <Badge className="bg-green-600">Logged</Badge>}
                        </div>
                        <h3 className={meal.logged ? 'text-gray-500 line-through' : 'text-gray-900'}>
                          {meal.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{meal.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {meal.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-6 mt-4">
                      <div>
                        <p className="text-sm text-gray-600">Calories</p>
                        <p className="text-gray-900">{meal.calories} kcal</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Protein</p>
                        <p className="text-gray-900">{meal.protein}g</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Carbs</p>
                        <p className="text-gray-900">{meal.carbs}g</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Fats</p>
                        <p className="text-gray-900">{meal.fats}g</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      {meal.logged ? (
                        <Button variant="outline" size="sm" disabled>
                          <Check className="w-4 h-4 mr-2" />
                          Logged
                        </Button>
                      ) : (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Log Meal
                          </Button>
                          <Button variant="outline" size="sm">
                            View Recipe
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardContent className="pt-6">
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Custom Meal
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recipe Library */}
        <TabsContent value="recipes" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search recipes..."
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white text-gray-900">
                      {recipe.difficulty}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{recipe.name}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recipe.prepTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      {recipe.calories} kcal
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    View Recipe
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">Need Custom Meal Ideas?</h3>
                <p className="text-gray-600 mb-4">
                  Let our AI generate personalized recipes based on your dietary preferences and goals
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  Generate Custom Recipes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
