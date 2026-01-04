const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://meditbackend.onrender.com/api';

// Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}

// Onboarding types (defined before User to avoid circular reference)
export type OnboardingData = {
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  activityLevel?: string;
  goal?: string;
  medicalConditions?: string[];
  dietaryRestrictions?: string[];
  sleepHours?: number;
  stressLevel?: string;
  waterIntake?: number;
  notes?: string;
};

export type User = {
  id: string;
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  isEmailVerified?: boolean;
  onboardingCompleted: boolean;
  onboardingData?: OnboardingData;
  notificationPreferences?: {
    workoutReminders: boolean;
    mealReminders: boolean;
    progressUpdates: boolean;
    weeklyReports: boolean;
    motivationalMessages: boolean;
    communityUpdates: boolean;
  };
};

export interface AuthResponse {
  token: string;
  user: User;
}

export interface SignupData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Get token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Set token in localStorage
export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

// Remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem('token');
};

// API request helper
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const token = getToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // If not JSON, read as text to see what we got
      const text = await response.text();
      console.error('Non-JSON response from server:', text.substring(0, 200));
      throw new Error(`Server returned non-JSON response (Status: ${response.status}). The endpoint may not exist or the server may have encountered an error.`);
    }

    if (!response.ok) {
      // Include validation errors in the error message if available
      if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
        const errorMessages = data.errors.map((err: any) => err.message || err.msg).join(', ');
        throw new Error(`${data.message || 'Validation failed'}: ${errorMessages}`);
      }
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
};

// Auth API functions
export const authApi = {
  // Signup
  signup: async (signupData: SignupData): Promise<ApiResponse<AuthResponse>> => {
    return apiRequest<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(signupData),
    });
  },

  // Login
  login: async (loginData: LoginData): Promise<ApiResponse<AuthResponse>> => {
    return apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    });
  },

  // Get current user
  getCurrentUser: async (): Promise<ApiResponse<{ user: User }>> => {
    return apiRequest<{ user: User }>('/auth/me', {
      method: 'GET',
    });
  },
};

// OTP/Email Verification API functions
export const otpApi = {
  // Send OTP
  sendOTP: async (email: string): Promise<ApiResponse<{}>> => {
    return apiRequest<{}>('/auth/verify-email/send', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Verify OTP
  verifyOTP: async (email: string, code: string): Promise<ApiResponse<{}>> => {
    return apiRequest<{}>('/auth/verify-email/verify', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
  },

  // Resend OTP
  resendOTP: async (email: string): Promise<ApiResponse<{}>> => {
    return apiRequest<{}>('/auth/verify-email/resend', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};

// AI Chat API functions
export interface ChatMessage {
  id?: number;
  sender: 'user' | 'ai';
  text: string;
  timestamp?: string;
}

export const aiApi = {
  // Send message to AI coach
  chat: async (message: string, conversationHistory: ChatMessage[] = []): Promise<ApiResponse<{ message: string }>> => {
    return apiRequest<{ message: string }>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, conversationHistory }),
    });
  },
};

// Resource API functions
export interface Resource {
  _id: string;
  title: string;
  description: string;
  type: 'article' | 'video';
  category: string;
  content?: string;
  thumbnail?: string;
  videoUrl?: string;
  duration: number;
  author: string;
  tags: string[];
  featured: boolean;
  views: number;
  likes: number;
  publishedAt: string;
}

export interface ResourceListResponse {
  resources: Resource[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const resourceApi = {
  // Get all resources with filters
  getResources: async (params?: {
    type?: 'article' | 'video';
    category?: string;
    search?: string;
    featured?: boolean;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<ResourceListResponse>> => {
    const queryParams = new URLSearchParams();
    if (params?.type) queryParams.append('type', params.type);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.featured) queryParams.append('featured', 'true');
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const query = queryParams.toString();
    return apiRequest<ResourceListResponse>(`/resources${query ? `?${query}` : ''}`, {
      method: 'GET',
    });
  },

  // Get single resource by ID
  getResourceById: async (id: string): Promise<ApiResponse<{ resource: Resource }>> => {
    return apiRequest<{ resource: Resource }>(`/resources/${id}`, {
      method: 'GET',
    });
  },

  // Get categories
  getCategories: async (): Promise<ApiResponse<{ categories: { name: string; count: number }[] }>> => {
    return apiRequest<{ categories: { name: string; count: number }[] }>('/resources/categories', {
      method: 'GET',
    });
  },
};

// Meal API functions
export interface Meal {
  _id: string;
  userId: string;
  name: string;
  description: string;
  type: 'breakfast' | 'mid-morning-snack' | 'lunch' | 'afternoon-snack' | 'dinner' | 'evening-snack';
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  image?: string;
  time: string;
  logged: boolean;
  isCustom: boolean;
  recipeId?: string;
}

export interface MealTotals {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface MealsResponse {
  meals: Meal[];
  totals: MealTotals;
}

export interface Recipe {
  _id: string;
  name: string;
  description: string;
  image?: string;
  prepTime: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  ingredients: string[];
  instructions: string[];
  servings: number;
  createdBy?: string;
  isPublic: boolean;
}

export const mealApi = {
  // Get meals for a date
  getMeals: async (date?: string): Promise<ApiResponse<MealsResponse>> => {
    const query = date ? `?date=${date}` : '';
    return apiRequest<MealsResponse>(`/meals${query}`, {
      method: 'GET',
    });
  },

  // Add a meal
  addMeal: async (mealData: {
    name: string;
    description?: string;
    type: string;
    date?: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    image?: string;
    time?: string;
    recipeId?: string;
  }): Promise<ApiResponse<{ meal: Meal }>> => {
    return apiRequest<{ meal: Meal }>('/meals', {
      method: 'POST',
      body: JSON.stringify(mealData),
    });
  },

  // Update meal
  updateMeal: async (id: string, updates: Partial<Meal>): Promise<ApiResponse<{ meal: Meal }>> => {
    return apiRequest<{ meal: Meal }>(`/meals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // Delete meal
  deleteMeal: async (id: string): Promise<ApiResponse<{}>> => {
    return apiRequest<{}>(`/meals/${id}`, {
      method: 'DELETE',
    });
  },

  // Add meal from recipe
  addMealFromRecipe: async (recipeId: string, type: string, date?: string, time?: string): Promise<ApiResponse<{ meal: Meal }>> => {
    return apiRequest<{ meal: Meal }>('/meals/from-recipe', {
      method: 'POST',
      body: JSON.stringify({ recipeId, type, date, time }),
    });
  },
};

export const recipeApi = {
  // Get all recipes
  getRecipes: async (search?: string, difficulty?: string, tags?: string[]): Promise<ApiResponse<{ recipes: Recipe[] }>> => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (difficulty) params.append('difficulty', difficulty);
    if (tags && tags.length > 0) params.append('tags', tags.join(','));
    const query = params.toString();
    return apiRequest<{ recipes: Recipe[] }>(`/recipes${query ? `?${query}` : ''}`, {
      method: 'GET',
    });
  },

  // Get single recipe
  getRecipeById: async (id: string): Promise<ApiResponse<{ recipe: Recipe }>> => {
    return apiRequest<{ recipe: Recipe }>(`/recipes/${id}`, {
      method: 'GET',
    });
  },

  // Create recipe
  createRecipe: async (recipeData: {
    name: string;
    description?: string;
    image?: string;
    prepTime?: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    tags?: string[];
    ingredients?: string[];
    instructions?: string[];
    servings?: number;
  }): Promise<ApiResponse<{ recipe: Recipe }>> => {
    return apiRequest<{ recipe: Recipe }>('/recipes', {
      method: 'POST',
      body: JSON.stringify(recipeData),
    });
  },
};

// Dashboard API functions
export interface DashboardData {
  user: {
    fullName: string;
  };
  dailyStats: {
    steps: number;
    stepsGoal: number;
    calories: number;
    caloriesGoal: number;
    water: number;
    waterGoal: number;
    sleep: number;
    sleepGoal: number;
  };
  todayMeals: Array<{
    id: string;
    name: string;
    time: string;
    items: string;
    calories: number;
    completed: boolean;
  }>;
  weeklyProgress: {
    workoutsCompleted: number;
    workoutsGoal: number;
    avgDailyCalories: number;
    weightChange: number | null;
  };
  nutritionTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  nutritionGoals: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

export const dashboardApi = {
  // Get dashboard data
  getDashboard: async (): Promise<ApiResponse<DashboardData>> => {
    return apiRequest<DashboardData>('/dashboard', {
      method: 'GET',
    });
  },
};

// Workout API functions
export interface WorkoutPlan {
  _id: string;
  userId?: string;
  name: string;
  description: string;
  duration: number; // weeks
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  goal: string;
  image: string;
  totalWorkouts: number;
  isActive: boolean;
  isPublic: boolean;
  workouts: Array<{
    week: number;
    day: number;
    name: string;
    description: string;
    duration: number;
    calories: number;
    difficulty: string;
    exercises: Array<{
      name: string;
      type: string;
      sets?: string;
      reps?: string;
      duration?: string;
      rest?: string;
      notes?: string;
    }>;
  }>;
}

export interface WorkoutProgress {
  currentWeek: number;
  totalWeeks: number;
  workoutsCompleted: number;
  totalWorkouts: number;
  progressPercentage: number;
  consistency: number;
}

export interface WorkoutSession {
  _id?: string;
  workoutPlanId?: string;
  workoutName: string;
  date: string;
  duration: number;
  calories: number;
  difficulty: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'skipped';
  exercises: Array<{
    name: string;
    sets?: string;
    reps?: string;
    duration?: string;
    completed: boolean;
    notes?: string;
  }>;
}

export interface WeekScheduleItem {
  day: string;
  workout: string;
  duration: string;
  completed: boolean;
  active: boolean;
}

export const workoutApi = {
  // Get all workout plans
  getWorkoutPlans: async (): Promise<ApiResponse<{ plans: WorkoutPlan[] }>> => {
    return apiRequest<{ plans: WorkoutPlan[] }>('/workouts/plans', {
      method: 'GET',
    });
  },

  // Get single workout plan
  getWorkoutPlanById: async (id: string): Promise<ApiResponse<{ plan: WorkoutPlan }>> => {
    return apiRequest<{ plan: WorkoutPlan }>(`/workouts/plans/${id}`, {
      method: 'GET',
    });
  },

  // Get current active plan with progress
  getCurrentPlan: async (): Promise<ApiResponse<{ plan: WorkoutPlan | null; progress: WorkoutProgress | null }>> => {
    return apiRequest<{ plan: WorkoutPlan | null; progress: WorkoutProgress | null }>('/workouts/current', {
      method: 'GET',
    });
  },

  // Get today's workout
  getTodayWorkout: async (): Promise<ApiResponse<{ workout: WorkoutSession | null }>> => {
    return apiRequest<{ workout: WorkoutSession | null }>('/workouts/today', {
      method: 'GET',
    });
  },

  // Get week schedule
  getWeekSchedule: async (): Promise<ApiResponse<{ schedule: WeekScheduleItem[]; currentWeek: number }>> => {
    return apiRequest<{ schedule: WeekScheduleItem[]; currentWeek: number }>('/workouts/week', {
      method: 'GET',
    });
  },

  // Activate a workout plan
  activatePlan: async (id: string): Promise<ApiResponse<{ plan: WorkoutPlan }>> => {
    return apiRequest<{ plan: WorkoutPlan }>(`/workouts/plans/${id}/activate`, {
      method: 'POST',
    });
  },

  // Create a new workout plan
  createWorkoutPlan: async (planData: {
    name: string;
    description?: string;
    duration: number;
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
    goal?: string;
    image?: string;
    workouts?: Array<{
      week: number;
      day: number;
      name: string;
      description?: string;
      duration: number;
      calories?: number;
      difficulty?: string;
      exercises?: Array<{
        name: string;
        type?: string;
        sets?: string;
        reps?: string;
        duration?: string;
        rest?: string;
        notes?: string;
      }>;
    }>;
  }): Promise<ApiResponse<{ plan: WorkoutPlan }>> => {
    return apiRequest<{ plan: WorkoutPlan }>('/workouts/plans', {
      method: 'POST',
      body: JSON.stringify(planData),
    });
  },

  // Create or update workout session
  createWorkoutSession: async (sessionData: {
    workoutPlanId?: string;
    workoutName: string;
    date?: string;
    duration?: number;
    calories?: number;
    difficulty?: string;
    exercises?: Array<{
      name: string;
      sets?: string;
      reps?: string;
      duration?: string;
      completed: boolean;
    }>;
    status?: string;
  }): Promise<ApiResponse<{ session: WorkoutSession }>> => {
    return apiRequest<{ session: WorkoutSession }>('/workouts/sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  },
};

// Health Tracker API functions
export interface HealthTrackerData {
  _id: string;
  userId: string;
  date: string;
  steps: number;
  stepsGoal: number;
  water: number;
  waterGoal: number;
  sleep: number;
  sleepGoal: number;
  weight?: number | null;
  activeMinutes: number;
  activeMinutesGoal: number;
  caloriesBurned: number;
  notes?: string;
}

export const healthTrackerApi = {
  // Get health tracker data
  getHealthTracker: async (date?: string): Promise<ApiResponse<{ tracker: HealthTrackerData }>> => {
    const query = date ? `?date=${date}` : '';
    return apiRequest<{ tracker: HealthTrackerData }>(`/health-tracker${query}`, {
      method: 'GET',
    });
  },

  // Update health tracker data
  updateHealthTracker: async (data: {
    steps?: number;
    water?: number;
    sleep?: number;
    weight?: number;
    activeMinutes?: number;
    caloriesBurned?: number;
    notes?: string;
  }): Promise<ApiResponse<{ tracker: HealthTrackerData }>> => {
    return apiRequest<{ tracker: HealthTrackerData }>('/health-tracker', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Add steps
  addSteps: async (steps: number): Promise<ApiResponse<{ tracker: HealthTrackerData }>> => {
    return apiRequest<{ tracker: HealthTrackerData }>('/health-tracker/add-steps', {
      method: 'POST',
      body: JSON.stringify({ steps }),
    });
  },

  // Add water
  addWater: async (glasses: number): Promise<ApiResponse<{ tracker: HealthTrackerData }>> => {
    return apiRequest<{ tracker: HealthTrackerData }>('/health-tracker/add-water', {
      method: 'POST',
      body: JSON.stringify({ glasses }),
    });
  },
};

// Analytics API functions
export interface AnalyticsData {
  overallHealthScore: number;
  riskFactors: {
    level: 'Low' | 'Moderate' | 'High';
    factors: string[];
    status: string;
  };
  goalsAchieved: {
    achieved: number;
    total: number;
    percentage: number;
    goals: Array<{
      name: string;
      achieved: boolean;
      progress?: string;
    }>;
  };
  bodyCompositionTrends: Array<{
    week: string;
    weight: number | null;
    steps: number;
    calories: number;
  }>;
  calorieBalance: Array<{
    week: string;
    intake: number;
    expenditure: number;
    balance: number;
  }>;
  workoutPerformance: {
    totalWorkouts: number;
    totalDuration: number;
    totalCaloriesBurned: number;
    avgDuration: number;
    avgCaloriesBurned: number;
  };
  nutritionTrends: Array<{
    week: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  }>;
  period: string;
}

export const analyticsApi = {
  // Get analytics data
  getAnalytics: async (period?: '1week' | '2weeks' | '4weeks' | '3months' | '6months'): Promise<ApiResponse<AnalyticsData>> => {
    const query = period ? `?period=${period}` : '';
    return apiRequest<AnalyticsData>(`/analytics${query}`, {
      method: 'GET',
    });
  },
};

// Device API functions
export interface Device {
  _id: string;
  userId: string;
  name: string;
  type: 'apple-watch' | 'fitbit' | 'garmin' | 'samsung-health' | 'google-fit' | 'other';
  deviceId: string;
  isConnected: boolean;
  lastSynced: Date | null;
  syncSettings: {
    steps: boolean;
    heartRate: boolean;
    sleep: boolean;
    workouts: boolean;
    weight: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export const deviceApi = {
  // Get all devices
  getDevices: async (): Promise<ApiResponse<{ devices: Device[] }>> => {
    return apiRequest<{ devices: Device[] }>('/devices', {
      method: 'GET',
    });
  },

  // Connect a device
  connectDevice: async (data: {
    name: string;
    type: Device['type'];
    deviceId: string;
    accessToken: string;
    refreshToken?: string;
    syncSettings?: Partial<Device['syncSettings']>;
  }): Promise<ApiResponse<{ device: Device }>> => {
    return apiRequest<{ device: Device }>('/devices', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update device
  updateDevice: async (
    deviceId: string,
    data: {
      name?: string;
      syncSettings?: Partial<Device['syncSettings']>;
      isConnected?: boolean;
    }
  ): Promise<ApiResponse<{ device: Device }>> => {
    return apiRequest<{ device: Device }>(`/devices/${deviceId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Disconnect device
  disconnectDevice: async (deviceId: string): Promise<ApiResponse<void>> => {
    return apiRequest<void>(`/devices/${deviceId}`, {
      method: 'DELETE',
    });
  },

  // Sync device
  syncDevice: async (
    deviceId: string,
    data: {
      steps?: number;
      heartRate?: number;
      sleep?: number;
      workouts?: any[];
      weight?: number;
    }
  ): Promise<ApiResponse<{ syncedData: any; lastSynced: Date }>> => {
    return apiRequest<{ syncedData: any; lastSynced: Date }>(`/devices/${deviceId}/sync`, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  },
};

// Notification API functions
export interface Notification {
  _id: string;
  userId: string;
  type: 'workout' | 'meal' | 'reminder' | 'achievement' | 'goal' | 'system' | 'device';
  title: string;
  message: string;
  isRead: boolean;
  emailSent: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl: string;
  createdAt: Date;
}

export const notificationApi = {
  // Get notifications
  getNotifications: async (unreadOnly?: boolean, limit?: number): Promise<ApiResponse<{ notifications: Notification[]; unreadCount: number }>> => {
    const params = new URLSearchParams();
    if (unreadOnly) params.append('unreadOnly', 'true');
    if (limit) params.append('limit', limit.toString());
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiRequest<{ notifications: Notification[]; unreadCount: number }>(`/notifications${query}`, {
      method: 'GET',
    });
  },

  // Mark as read
  markAsRead: async (notificationId: string): Promise<ApiResponse<{ notification: Notification }>> => {
    return apiRequest<{ notification: Notification }>(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  },

  // Mark all as read
  markAllAsRead: async (): Promise<ApiResponse<void>> => {
    return apiRequest<void>('/notifications/read-all', {
      method: 'PUT',
    });
  },

  // Delete notification
  deleteNotification: async (notificationId: string): Promise<ApiResponse<void>> => {
    return apiRequest<void>(`/notifications/${notificationId}`, {
      method: 'DELETE',
    });
  },
};

// User API functions
export const userApi = {
  // Get user profile
  getProfile: async (): Promise<ApiResponse<{ user: User }>> => {
    return apiRequest<{ user: User }>('/user/profile', {
      method: 'GET',
    });
  },

  // Update user profile
  updateProfile: async (profileData: {
    fullName?: string;
    phone?: string;
    onboardingData?: Partial<OnboardingData>;
    notificationPreferences?: {
      workoutReminders?: boolean;
      mealReminders?: boolean;
      progressUpdates?: boolean;
      weeklyReports?: boolean;
      motivationalMessages?: boolean;
      communityUpdates?: boolean;
    };
  }): Promise<ApiResponse<{ user: User }>> => {
    return apiRequest<{ user: User }>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// Onboarding API functions
export const onboardingApi = {
  // Save onboarding data
  saveOnboardingData: async (data: OnboardingData): Promise<ApiResponse<{ user: User }>> => {
    return apiRequest<{ user: User }>('/onboarding', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Get onboarding data
  getOnboardingData: async (): Promise<ApiResponse<{ onboardingCompleted: boolean; onboardingData: OnboardingData }>> => {
    return apiRequest<{ onboardingCompleted: boolean; onboardingData: OnboardingData }>('/onboarding', {
      method: 'GET',
    });
  },
};

// Dashboard API functions
export interface DashboardData {
  user: {
    fullName: string;
  };
  dailyStats: {
    steps: number;
    stepsGoal: number;
    calories: number;
    caloriesGoal: number;
    water: number;
    waterGoal: number;
    sleep: number;
    sleepGoal: number;
  };
  todayMeals: Array<{
    id: string;
    name: string;
    time: string;
    items: string;
    calories: number;
    completed: boolean;
  }>;
  weeklyProgress: {
    workoutsCompleted: number;
    workoutsGoal: number;
    avgDailyCalories: number;
    weightChange: number | null;
  };
  nutritionTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  nutritionGoals: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}


