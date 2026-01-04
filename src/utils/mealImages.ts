// Helper function to get appropriate meal images based on meal type and name
export const getMealImage = (mealType: string, mealName: string = ''): string => {
  const name = mealName.toLowerCase();
  
  // Breakfast images
  if (mealType.includes('breakfast') || mealType === 'breakfast') {
    if (name.includes('oatmeal') || name.includes('oats')) {
      return 'https://images.unsplash.com/photo-1576035098217-aa0bb64ec03e?w=800&q=80';
    }
    if (name.includes('egg') || name.includes('omelet')) {
      return 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&q=80';
    }
    if (name.includes('pancake') || name.includes('waffle')) {
      return 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80';
    }
    if (name.includes('smoothie') || name.includes('bowl')) {
      return 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80';
    }
    return 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80'; // Generic breakfast
  }
  
  // Lunch/Dinner images
  if (mealType.includes('lunch') || mealType === 'lunch' || mealType.includes('dinner') || mealType === 'dinner') {
    if (name.includes('salad')) {
      return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80';
    }
    if (name.includes('chicken')) {
      return 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&q=80';
    }
    if (name.includes('salmon') || name.includes('fish')) {
      return 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80';
    }
    if (name.includes('pasta') || name.includes('spaghetti')) {
      return 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80';
    }
    if (name.includes('burger') || name.includes('sandwich')) {
      return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80';
    }
    if (name.includes('rice') || name.includes('quinoa')) {
      return 'https://images.unsplash.com/photo-1516684669134-de6f7e473e1a?w=800&q=80';
    }
    return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'; // Generic lunch/dinner
  }
  
  // Snack images
  if (mealType.includes('snack')) {
    if (name.includes('yogurt')) {
      return 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80';
    }
    if (name.includes('smoothie') || name.includes('shake')) {
      return 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80';
    }
    if (name.includes('fruit') || name.includes('apple') || name.includes('banana')) {
      return 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&q=80';
    }
    if (name.includes('nuts') || name.includes('trail mix')) {
      return 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80';
    }
    return 'https://images.unsplash.com/photo-1571190404650-cd1c31e7e0a3?w=800&q=80'; // Generic snack
  }
  
  // Default image
  return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80';
};

// Helper function to get recipe images
export const getRecipeImage = (recipeName: string, tags: string[] = []): string => {
  const name = recipeName.toLowerCase();
  const tagStr = tags.join(' ').toLowerCase();
  const combined = `${name} ${tagStr}`;
  
  if (combined.includes('breakfast') || combined.includes('bowl')) {
    return 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80';
  }
  if (combined.includes('salad') || combined.includes('quinoa')) {
    return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80';
  }
  if (combined.includes('chicken')) {
    return 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&q=80';
  }
  if (combined.includes('salmon') || combined.includes('fish')) {
    return 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80';
  }
  if (combined.includes('stir-fry') || combined.includes('vegetable')) {
    return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80';
  }
  if (combined.includes('smoothie')) {
    return 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80';
  }
  
  return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80';
};

