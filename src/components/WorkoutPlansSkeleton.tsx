import { Card, CardContent } from './ui/card';

export default function WorkoutPlansSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div>
                <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>

            {/* Current Plan Skeleton */}
            <Card className="border-2">
                <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <div className="h-7 bg-gray-200 rounded w-56 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </div>
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-4 bg-gray-100 rounded-lg border">
                                    <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tabs Skeleton */}
            <div>
                <div className="flex gap-2 mb-6">
                    {['Today', 'This Week', 'Explore'].map((tab) => (
                        <div key={tab} className="h-10 bg-gray-200 rounded flex-1"></div>
                    ))}
                </div>

                {/* Content Skeleton */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 border rounded-lg">
                                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-5 bg-gray-200 rounded w-40 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-56"></div>
                                </div>
                                <div className="h-9 bg-gray-200 rounded w-28"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
