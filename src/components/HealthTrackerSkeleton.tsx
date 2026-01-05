import { Card, CardContent, CardHeader } from './ui/card';

export default function HealthTrackerSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-64"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>

            {/* Vital Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                                    <div className="h-8 bg-gray-200 rounded w-20 mb-1"></div>
                                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                                </div>
                                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                            </div>
                            <div className="h-6 bg-gray-200 rounded w-20"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                        <CardHeader>
                            <div className="h-6 bg-gray-200 rounded w-40 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 bg-gray-100 rounded-lg"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
