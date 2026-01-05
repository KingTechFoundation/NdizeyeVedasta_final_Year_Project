import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import {
  Clock,
  Flame,
  Plus,
  BookOpen,
  Search,
  Filter,
  X,
  Trash2,
  Loader2
} from 'lucide-react';
import MealPlansSkeleton from './MealPlansSkeleton';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { mealApi, recipeApi, type Meal, type Recipe } from '../services/api';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';

// Helper function to calculate nutrition goals based on user data
const calculateNutritionGoals = (userData: any) => {
  // Default goals (can be enhanced based on onboarding data)
  const defaultGoals = {
    calories: 2200,
    protein: 120,
    carbs: 220,
    fats: 70,
  };

  if (!userData?.onboardingData) {
    return defaultGoals;
  }

  const { age, gender, height, weight, activityLevel, goal } = userData.onboardingData;

  // Simple BMR calculation (Mifflin-St Jeor Equation)
  if (weight && height && age && gender) {
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Activity multipliers
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      'very-active': 1.9,
    };

    const multiplier = activityMultipliers[activityLevel || 'moderate'] || 1.55;
    let calories = Math.round(bmr * multiplier);

    // Adjust based on goal
    if (goal === 'lose-weight') {
      calories = Math.round(calories * 0.85); // 15% deficit
    } else if (goal === 'gain-weight') {
      calories = Math.round(calories * 1.15); // 15% surplus
    } else if (goal === 'build-muscle') {
      calories = Math.round(calories * 1.1); // 10% surplus
    }

    return {
      calories,
      protein: Math.round(calories * 0.25 / 4), // 25% of calories from protein
      carbs: Math.round(calories * 0.45 / 4), // 45% of calories from carbs
      fats: Math.round(calories * 0.30 / 9), // 30% of calories from fats
    };
  }

  return defaultGoals;
};

// Helper to format meal type for display
const formatMealType = (type: string): string => {
  const typeMap: Record<string, string> = {
    'breakfast': 'Breakfast',
    'mid-morning-snack': 'Mid-Morning Snack',
    'lunch': 'Lunch',
    'afternoon-snack': 'Afternoon Snack',
    'dinner': 'Dinner',
    'evening-snack': 'Evening Snack',
  };
  return typeMap[type] || type;
};

export default function MealPlans() {
  const { user } = useAuth();
  const { navigateTo } = useNavigation();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totals, setTotals] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
  const [isLoadingMeals, setIsLoadingMeals] = useState(true);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddMealDialog, setShowAddMealDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mealForm, setMealForm] = useState({
    name: '',
    description: '',
    type: 'breakfast' as const,
    date: new Date().toISOString().split('T')[0],
    time: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    image: '',
  });

  // Calculate nutrition goals from user data
  const nutritionGoals = calculateNutritionGoals(user);
  const fetchMeals = async () => {
    setIsLoadingMeals(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await mealApi.getMeals(today);
      if (response.success && response.data) {
        setMeals(response.data.meals);
        setTotals(response.data.totals);
      }
    } catch (error) {
      console.error('Failed to fetch meals:', error);
      toast.error('Failed to load meals');
    } finally {
      setIsLoadingMeals(false);
    }
  };

  const fetchRecipes = async () => {
    setIsLoadingRecipes(true);
    try {
      const response = await recipeApi.getRecipes();
      if (response.success && response.data) {
        setRecipes(response.data.recipes);
      }
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      toast.error('Failed to load recipes');
    } finally {
      setIsLoadingRecipes(false);
    }
  };

  useEffect(() => {
    fetchMeals();
    fetchRecipes();
  }, []);

  if (isLoadingMeals) {
    return <MealPlansSkeleton />;
  }

  const dailyNutrition = {
    calories: { consumed: totals.calories, goal: nutritionGoals.calories },
    protein: { consumed: totals.protein, goal: nutritionGoals.protein },
    carbs: { consumed: totals.carbs, goal: nutritionGoals.carbs },
    fats: { consumed: totals.fats, goal: nutritionGoals.fats },
  };

  const handleDeleteMeal = async (mealId: string) => {
    try {
      const response = await mealApi.deleteMeal(mealId);
      if (response.success) {
        toast.success('Meal deleted successfully');
        fetchMeals(); // Refresh meals
      }
    } catch (error) {
      toast.error('Failed to delete meal');
    }
  };

  const handleAddMealFromRecipe = async (recipeId: string, type: string) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await mealApi.addMealFromRecipe(recipeId, type, today);
      if (response.success) {
        toast.success('Meal added successfully');
        fetchMeals(); // Refresh meals
      }
    } catch (error) {
      toast.error('Failed to add meal from recipe');
    }
  };

  const handleSearchRecipes = async () => {
    setIsLoadingRecipes(true);
    try {
      const response = await recipeApi.getRecipes(searchQuery);
      if (response.success && response.data) {
        setRecipes(response.data.recipes);
      }
    } catch (error) {
      toast.error('Failed to search recipes');
    } finally {
      setIsLoadingRecipes(false);
    }
  };

  const handleAddCustomMeal = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!mealForm.name.trim()) {
      toast.error('Meal name is required');
      return;
    }
    if (!mealForm.calories || parseFloat(mealForm.calories) <= 0) {
      toast.error('Calories must be greater than 0');
      return;
    }
    if (!mealForm.protein || parseFloat(mealForm.protein) < 0) {
      toast.error('Protein cannot be negative');
      return;
    }
    if (!mealForm.carbs || parseFloat(mealForm.carbs) < 0) {
      toast.error('Carbs cannot be negative');
      return;
    }
    if (!mealForm.fats || parseFloat(mealForm.fats) < 0) {
      toast.error('Fats cannot be negative');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await mealApi.addMeal({
        name: mealForm.name.trim(),
        description: mealForm.description.trim(),
        type: mealForm.type,
        date: mealForm.date,
        time: mealForm.time || undefined,
        calories: parseFloat(mealForm.calories),
        protein: parseFloat(mealForm.protein || '0'),
        carbs: parseFloat(mealForm.carbs || '0'),
        fats: parseFloat(mealForm.fats || '0'),
        image: mealForm.image.trim() || undefined,
      });

      if (response.success) {
        toast.success('Meal added successfully');
        setShowAddMealDialog(false);
        // Reset form
        setMealForm({
          name: '',
          description: '',
          type: 'breakfast',
          date: new Date().toISOString().split('T')[0],
          time: '',
          calories: '',
          protein: '',
          carbs: '',
          fats: '',
          image: '',
        });
        fetchMeals(); // Refresh meals
      } else {
        toast.error(response.message || 'Failed to add meal');
      }
    } catch (error: any) {
      console.error('Failed to add meal:', error);
      toast.error(error.message || 'Failed to add meal');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    setShowAddMealDialog(false);
    // Reset form when closing
    setMealForm({
      name: '',
      description: '',
      type: 'breakfast',
      date: new Date().toISOString().split('T')[0],
      time: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
      image: '',
    });
  };

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
                value={Math.min((dailyNutrition.calories.consumed / dailyNutrition.calories.goal) * 100, 100)}
                className="h-2"
              />
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-gray-600">
                  {Math.max(0, dailyNutrition.calories.goal - dailyNutrition.calories.consumed)} kcal remaining
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
                value={Math.min((dailyNutrition.protein.consumed / dailyNutrition.protein.goal) * 100, 100)}
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
                value={Math.min((dailyNutrition.carbs.consumed / dailyNutrition.carbs.goal) * 100, 100)}
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
                value={Math.min((dailyNutrition.fats.consumed / dailyNutrition.fats.goal) * 100, 100)}
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
          {meals.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-600 mb-4">No meals logged for today</p>
                <Button
                  onClick={() => setShowAddMealDialog(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Meal
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {meals.map((meal) => (
                <Card key={meal._id} className={meal.logged ? 'bg-gray-50' : ''}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={meal.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80'}
                          alt={meal.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline">{formatMealType(meal.type)}</Badge>
                              {meal.logged && <Badge className="bg-green-600">Logged</Badge>}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{meal.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{meal.description || ''}</p>
                          </div>
                          <div className="text-right">
                            {meal.time && (
                              <p className="text-sm text-gray-600">
                                <Clock className="w-3 h-3 inline mr-1" />
                                {meal.time}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-6 mt-4">
                          <div>
                            <p className="text-sm text-gray-600">Calories</p>
                            <p className="text-gray-900 font-semibold">{meal.calories} kcal</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Protein</p>
                            <p className="text-gray-900 font-semibold">{meal.protein}g</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Carbs</p>
                            <p className="text-gray-900 font-semibold">{meal.carbs}g</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Fats</p>
                            <p className="text-gray-900 font-semibold">{meal.fats}g</p>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteMeal(meal._id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardContent className="pt-6">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowAddMealDialog(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Custom Meal
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Recipe Library */}
        <TabsContent value="recipes" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearchRecipes();
                }}
                className="flex gap-2"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search recipes..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                      onClick={() => {
                        setSearchQuery('');
                        fetchRecipes();
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <Button type="submit" variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>

          {isLoadingRecipes ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-800" />
                  <CardHeader>
                    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-12" />
                      <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-12" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded" />
                      <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : recipes.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-600">No recipes found.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <Card key={recipe._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <ImageWithFallback
                      src={recipe.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80'}
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
                    <CardDescription>{recipe.description}</CardDescription>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
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
                      {recipe.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleAddMealFromRecipe(recipe._id, 'lunch')}
                      >
                        Add to Lunch
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleAddMealFromRecipe(recipe._id, 'dinner')}
                      >
                        Add to Dinner
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">Need Custom Meal Ideas?</h3>
                <p className="text-gray-600 mb-4">
                  Ask our AI Coach to generate personalized recipes based on your dietary preferences and goals
                </p>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => navigateTo('coach')}
                >
                  Ask AI Coach
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Custom Meal Dialog */}
      <Dialog open={showAddMealDialog} onOpenChange={setShowAddMealDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Custom Meal</DialogTitle>
            <DialogDescription>
              Enter the details for your custom meal. All nutritional values are per serving.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddCustomMeal} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Meal Name */}
              <div className="md:col-span-2">
                <Label htmlFor="meal-name">Meal Name *</Label>
                <Input
                  id="meal-name"
                  placeholder="e.g., Grilled Chicken Salad"
                  value={mealForm.name}
                  onChange={(e) => setMealForm({ ...mealForm, name: e.target.value })}
                  required
                />
              </div>

              {/* Meal Type */}
              <div>
                <Label htmlFor="meal-type">Meal Type *</Label>
                <Select
                  value={mealForm.type}
                  onValueChange={(value: any) => setMealForm({ ...mealForm, type: value })}
                >
                  <SelectTrigger id="meal-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="mid-morning-snack">Mid-Morning Snack</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="afternoon-snack">Afternoon Snack</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="evening-snack">Evening Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div>
                <Label htmlFor="meal-date">Date *</Label>
                <Input
                  id="meal-date"
                  type="date"
                  value={mealForm.date}
                  onChange={(e) => setMealForm({ ...mealForm, date: e.target.value })}
                  required
                />
              </div>

              {/* Time */}
              <div>
                <Label htmlFor="meal-time">Time (optional)</Label>
                <Input
                  id="meal-time"
                  type="time"
                  value={mealForm.time}
                  onChange={(e) => setMealForm({ ...mealForm, time: e.target.value })}
                />
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <Label htmlFor="meal-image">Image URL (optional)</Label>
                <Input
                  id="meal-image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={mealForm.image}
                  onChange={(e) => setMealForm({ ...mealForm, image: e.target.value })}
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <Label htmlFor="meal-description">Description (optional)</Label>
                <Input
                  id="meal-description"
                  placeholder="Brief description of the meal..."
                  value={mealForm.description}
                  onChange={(e) => setMealForm({ ...mealForm, description: e.target.value })}
                />
              </div>

              {/* Calories */}
              <div>
                <Label htmlFor="meal-calories">Calories (kcal) *</Label>
                <Input
                  id="meal-calories"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="e.g., 450"
                  value={mealForm.calories}
                  onChange={(e) => setMealForm({ ...mealForm, calories: e.target.value })}
                  required
                />
              </div>

              {/* Protein */}
              <div>
                <Label htmlFor="meal-protein">Protein (g) *</Label>
                <Input
                  id="meal-protein"
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="e.g., 30"
                  value={mealForm.protein}
                  onChange={(e) => setMealForm({ ...mealForm, protein: e.target.value })}
                  required
                />
              </div>

              {/* Carbs */}
              <div>
                <Label htmlFor="meal-carbs">Carbs (g) *</Label>
                <Input
                  id="meal-carbs"
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="e.g., 40"
                  value={mealForm.carbs}
                  onChange={(e) => setMealForm({ ...mealForm, carbs: e.target.value })}
                  required
                />
              </div>

              {/* Fats */}
              <div>
                <Label htmlFor="meal-fats">Fats (g) *</Label>
                <Input
                  id="meal-fats"
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="e.g., 15"
                  value={mealForm.fats}
                  onChange={(e) => setMealForm({ ...mealForm, fats: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Meal
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
