import { Card, CardContent } from './ui/card';

export default function DashboardSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div>
                <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
            </div>

            {/* Quick Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                                    <div className="h-8 bg-gray-200 rounded w-20 mb-1"></div>
                                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                                </div>
                                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Today's Workouts Skeleton */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-40"></div>
                                </div>
                                <div className="h-9 bg-gray-200 rounded w-20"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4 p-4 border rounded-lg">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-48"></div>
                                    </div>
                                    <div className="h-9 bg-gray-200 rounded w-24"></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Today's Meals Skeleton */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-36"></div>
                                </div>
                                <div className="h-9 bg-gray-200 rounded w-20"></div>
                            </div>
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                        <div className="flex-1">
                                            <div className="h-5 bg-gray-200 rounded w-28 mb-2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-40"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Weekly Progress Skeleton */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-28 mb-4"></div>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="p-3 bg-gray-100 rounded-lg">
                                        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                        <div className="h-8 bg-gray-200 rounded w-20"></div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* AI Insights Skeleton */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="h-6 bg-gray-200 rounded w-28 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-40 mb-4"></div>
                            <div className="space-y-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="p-4 bg-gray-100 border rounded-lg">
                                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
