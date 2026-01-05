import { Card, CardContent, CardHeader } from './ui/card';

export default function MealPlansSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div>
                <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>

            {/* Daily Nutrition Overview Skeleton */}
            <Card className="border-2 border-gray-100">
                <CardHeader>
                    <div className="h-6 bg-gray-200 rounded w-40 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between">
                                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                                </div>
                                <div className="h-2 bg-gray-200 rounded w-full"></div>
                                <div className="h-3 bg-gray-200 rounded w-24"></div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>

            {/* Meal Items Skeleton */}
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <Card key={i}>
                        <CardContent className="pt-6">
                            <div className="flex gap-4">
                                <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0"></div>
                                <div className="flex-1 space-y-4">
                                    <div className="flex justify-between">
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                                            <div className="h-6 bg-gray-200 rounded w-48"></div>
                                            <div className="h-4 bg-gray-200 rounded w-64"></div>
                                        </div>
                                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                                    </div>
                                    <div className="flex gap-6 mt-4">
                                        {[1, 2, 3, 4].map((j) => (
                                            <div key={j} className="space-y-1">
                                                <div className="h-3 bg-gray-200 rounded w-12"></div>
                                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
