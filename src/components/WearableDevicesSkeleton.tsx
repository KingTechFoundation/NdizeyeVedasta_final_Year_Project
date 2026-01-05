import { Card, CardContent, CardHeader } from './ui/card';

export default function WearableDevicesSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>

            {/* Connected Devices Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                    <Card key={i}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
                                    <div>
                                        <div className="h-6 bg-gray-200 rounded w-40 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                                    </div>
                                </div>
                                <div className="h-6 bg-gray-200 rounded w-20"></div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="flex gap-2 pt-2">
                                <div className="h-10 bg-gray-200 rounded flex-1"></div>
                                <div className="h-10 bg-gray-200 rounded w-10"></div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Sync Data Skeleton */}
            <Card>
                <CardHeader>
                    <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-64"></div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="p-4 border border-gray-100 rounded-lg">
                                <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                                <div className="h-8 bg-gray-200 rounded w-20"></div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Sync Settings Skeleton */}
            <Card>
                <CardContent className="p-6 space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                                <div>
                                    <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                                    <div className="h-3 bg-gray-200 rounded w-48"></div>
                                </div>
                            </div>
                            <div className="w-10 h-6 bg-gray-200 rounded-full"></div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
