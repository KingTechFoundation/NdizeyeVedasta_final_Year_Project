import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  ShoppingCart,
  Plus,
  Trash2,
  Check,
  Download,
  Share2,
  Calendar,
  Apple,
  Beef,
  Milk,
  Wheat,

  Leaf
} from 'lucide-react';
import { Separator } from './ui/separator';

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
  price?: number;
}

export default function ShoppingList() {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([
    // Proteins
    { id: '1', name: 'Chicken Breast', quantity: '1 kg', category: 'Proteins', checked: false, price: 8000 },
    { id: '2', name: 'Salmon Fillet', quantity: '500g', category: 'Proteins', checked: false, price: 12000 },
    { id: '3', name: 'Greek Yogurt', quantity: '4 cups', category: 'Dairy', checked: true, price: 3000 },
    { id: '4', name: 'Eggs', quantity: '12 pcs', category: 'Proteins', checked: false, price: 2500 },

    // Vegetables
    { id: '5', name: 'Broccoli', quantity: '500g', category: 'Vegetables', checked: false, price: 1500 },
    { id: '6', name: 'Spinach', quantity: '200g', category: 'Vegetables', checked: false, price: 800 },
    { id: '7', name: 'Bell Peppers', quantity: '3 pcs', category: 'Vegetables', checked: true, price: 1200 },
    { id: '8', name: 'Tomatoes', quantity: '1 kg', category: 'Vegetables', checked: false, price: 1000 },

    // Fruits
    { id: '9', name: 'Bananas', quantity: '6 pcs', category: 'Fruits', checked: false, price: 1500 },
    { id: '10', name: 'Berries (Mixed)', quantity: '300g', category: 'Fruits', checked: false, price: 4000 },
    { id: '11', name: 'Avocado', quantity: '3 pcs', category: 'Fruits', checked: false, price: 2100 },

    // Grains
    { id: '12', name: 'Brown Rice', quantity: '2 kg', category: 'Grains', checked: false, price: 3500 },
    { id: '13', name: 'Quinoa', quantity: '500g', category: 'Grains', checked: false, price: 5000 },
    { id: '14', name: 'Oatmeal', quantity: '1 kg', category: 'Grains', checked: true, price: 2800 },

    // Others
    { id: '15', name: 'Almond Butter', quantity: '1 jar', category: 'Others', checked: false, price: 6000 },
    { id: '16', name: 'Olive Oil', quantity: '500ml', category: 'Others', checked: false, price: 4500 },
    { id: '17', name: 'Protein Powder', quantity: '1 kg', category: 'Supplements', checked: false, price: 15000 },
  ]);

  const [newItem, setNewItem] = useState('');

  const categories = {
    'Proteins': { icon: Beef, color: 'bg-red-100 dark:bg-red-900/30 text-red-600' },
    'Vegetables': { icon: Leaf, color: 'bg-green-100 dark:bg-green-900/30 text-green-600' },
    'Fruits': { icon: Apple, color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' },
    'Dairy': { icon: Milk, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
    'Grains': { icon: Wheat, color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' },
    'Supplements': { icon: Plus, color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' },
    'Others': { icon: ShoppingCart, color: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300' },
  };

  const toggleItem = (id: string) => {
    setShoppingList(list =>
      list.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setShoppingList(list => list.filter(item => item.id !== id));
  };

  const addItem = () => {
    if (newItem.trim()) {
      const item: ShoppingItem = {
        id: Date.now().toString(),
        name: newItem,
        quantity: '1',
        category: 'Others',
        checked: false,
      };
      setShoppingList([...shoppingList, item]);
      setNewItem('');
    }
  };

  const clearChecked = () => {
    setShoppingList(list => list.filter(item => !item.checked));
  };

  const totalItems = shoppingList.length;
  const checkedItems = shoppingList.filter(item => item.checked).length;
  const totalPrice = shoppingList
    .filter(item => !item.checked && item.price)
    .reduce((sum, item) => sum + (item.price || 0), 0);

  const groupedByCategory = shoppingList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ShoppingItem[]>);

  const mealPlanSuggestions = [
    { day: 'Monday', meals: ['Grilled Chicken Salad', 'Protein Smoothie', 'Salmon with Veggies'] },
    { day: 'Tuesday', meals: ['Oatmeal Bowl', 'Quinoa Buddha Bowl', 'Chicken Stir-fry'] },
    { day: 'Wednesday', meals: ['Greek Yogurt & Berries', 'Salmon Poke Bowl', 'Egg White Omelette'] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Shopping List</h1>
          <p className="text-gray-600 dark:text-gray-400">Plan your grocery shopping for healthy meals</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Items</p>
                <p className="text-3xl text-gray-900 dark:text-white">{totalItems}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Checked Off</p>
                <p className="text-3xl text-gray-900 dark:text-white">{checkedItems}/{totalItems}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Estimated Total</p>
                <p className="text-3xl text-gray-900 dark:text-white">RWF {totalPrice.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Shopping List</TabsTrigger>
          <TabsTrigger value="meals">Meal Plan</TabsTrigger>
        </TabsList>

        {/* Shopping List Tab */}
        <TabsContent value="list" className="space-y-6">
          {/* Add New Item */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Add new item..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addItem()}
                  className="flex-1"
                />
                <Button onClick={addItem} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Shopping List by Category */}
          {Object.entries(groupedByCategory).map(([category, items]) => {
            const categoryInfo = categories[category as keyof typeof categories] || categories.Others;
            const Icon = categoryInfo.icon;

            return (
              <Card key={category}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${categoryInfo.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <CardTitle>{category}</CardTitle>
                      <CardDescription>
                        {items.length} item{items.length !== 1 ? 's' : ''} • {items.filter(i => i.checked).length} checked
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${item.checked
                            ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                            : 'border-gray-200 dark:border-gray-700'
                          }`}
                      >
                        <Checkbox
                          checked={item.checked}
                          onCheckedChange={() => toggleItem(item.id)}
                        />
                        <div className="flex-1">
                          <p className={`${item.checked ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.quantity}</p>
                        </div>
                        {item.price && (
                          <Badge variant="secondary" className={item.checked ? 'opacity-50' : ''}>
                            RWF {item.price.toLocaleString()}
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Actions */}
          {checkedItems > 0 && (
            <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-gray-900 dark:text-white">
                      {checkedItems} item{checkedItems !== 1 ? 's' : ''} checked off
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={clearChecked}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Checked
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Meal Plan Tab */}
        <TabsContent value="meals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>This Week's Meal Plan</CardTitle>
              <CardDescription>Meals that use items from your shopping list</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mealPlanSuggestions.map((day, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-blue-600">{day.day}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pl-4">
                      {day.meals.map((meal, mealIndex) => (
                        <div
                          key={mealIndex}
                          className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <p className="text-sm text-gray-900 dark:text-white">{meal}</p>
                        </div>
                      ))}
                    </div>
                    {index < mealPlanSuggestions.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl text-gray-900 dark:text-white mb-2">Need a Custom Meal Plan?</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Generate a personalized meal plan and shopping list based on your goals
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  Generate Meal Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
