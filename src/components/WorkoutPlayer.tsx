import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Play, 
  Pause, 
  SkipForward,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  CheckCircle2,
  Timer,
  Dumbbell,
  Activity
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Exercise {
  name: string;
  sets?: string;
  reps?: string;
  duration?: number; // in seconds
  rest?: number; // rest period in seconds
  instructions: string[];
  image: string;
  type: 'warmup' | 'exercise' | 'rest' | 'cooldown';
}

interface WorkoutPlayerProps {
  workoutName: string;
  exercises: Exercise[];
  onComplete?: () => void;
  onClose?: () => void;
}

export default function WorkoutPlayer({ 
  workoutName, 
  exercises, 
  onComplete,
  onClose 
}: WorkoutPlayerProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const currentExercise = exercises[currentExerciseIndex];
  const totalExercises = exercises.length;
  const progressPercentage = ((currentExerciseIndex + 1) / totalExercises) * 100;

  useEffect(() => {
    if (currentExercise?.duration) {
      setTimeLeft(currentExercise.duration);
    }
  }, [currentExerciseIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleExerciseComplete();
            return 0;
          }
          
          // Voice cues simulation
          if (voiceEnabled) {
            if (prev === 10) {
              console.log('Voice: 10 seconds remaining');
            } else if (prev === 3) {
              console.log('Voice: 3, 2, 1...');
            }
          }
          
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, voiceEnabled]);

  const handleExerciseComplete = () => {
    setIsPlaying(false);
    setCompletedExercises(prev => [...prev, currentExerciseIndex]);

    // Check if there's a rest period
    if (currentExercise.rest && !isResting) {
      setIsResting(true);
      setTimeLeft(currentExercise.rest);
      setIsPlaying(true);
      if (voiceEnabled) {
        console.log('Voice: Great work! Take a rest.');
      }
    } else {
      // Move to next exercise
      if (currentExerciseIndex < totalExercises - 1) {
        setIsResting(false);
        setCurrentExerciseIndex(prev => prev + 1);
      } else {
        // Workout complete
        if (voiceEnabled) {
          console.log('Voice: Workout complete! Great job!');
        }
        onComplete?.();
      }
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && voiceEnabled) {
      console.log(`Voice: ${isResting ? 'Rest period started' : currentExercise.name}`);
    }
  };

  const handleSkip = () => {
    if (isResting) {
      setIsResting(false);
      if (currentExerciseIndex < totalExercises - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
      }
    } else {
      handleExerciseComplete();
    }
  };

  const handleRestart = () => {
    setIsPlaying(false);
    if (currentExercise?.duration) {
      setTimeLeft(currentExercise.duration);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isResting) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-4">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-2xl">Rest Time</CardTitle>
                  <CardDescription className="text-gray-400">Recovery break</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-6 h-6 text-white" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-48 h-48 rounded-full border-8 border-blue-600 flex items-center justify-center mx-auto mb-8">
                  <div className="text-center">
                    <p className="text-6xl text-white mb-2">{timeLeft}</p>
                    <p className="text-gray-400">seconds</p>
                  </div>
                </div>

                <p className="text-xl text-white mb-2">Take a breather</p>
                <p className="text-gray-400 mb-8">Prepare for the next exercise</p>

                <div className="flex gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={handlePlayPause}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Resume
                      </>
                    )}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleSkip}
                    className="border-gray-600 text-white hover:bg-gray-800"
                  >
                    <SkipForward className="w-5 h-5 mr-2" />
                    Skip Rest
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/95 z-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-4 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl text-white mb-1">{workoutName}</h1>
            <p className="text-gray-400">
              Exercise {currentExerciseIndex + 1} of {totalExercises}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className="text-white hover:bg-gray-800"
            >
              {voiceEnabled ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-gray-800">
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
          {/* Exercise Visual */}
          <div>
            <Card className="bg-gray-900 border-gray-700 h-full">
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden mb-4 relative">
                  <ImageWithFallback
                    src={currentExercise.image}
                    alt={currentExercise.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={`${
                      currentExercise.type === 'warmup' ? 'bg-yellow-600' :
                      currentExercise.type === 'cooldown' ? 'bg-purple-600' :
                      currentExercise.type === 'rest' ? 'bg-blue-600' :
                      'bg-green-600'
                    }`}>
                      {currentExercise.type.charAt(0).toUpperCase() + currentExercise.type.slice(1)}
                    </Badge>
                  </div>
                </div>

                {/* Timer Display */}
                {currentExercise.duration && (
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-3 bg-gray-800 rounded-full px-8 py-4">
                      <Timer className="w-8 h-8 text-blue-400" />
                      <div>
                        <p className="text-5xl text-white tabular-nums">
                          {formatTime(timeLeft)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleRestart}
                    className="border-gray-600 text-white hover:bg-gray-800"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Restart
                  </Button>
                  <Button
                    size="lg"
                    onClick={handlePlayPause}
                    className="bg-blue-600 hover:bg-blue-700 w-32"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-6 h-6 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-6 h-6 mr-2" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleSkip}
                    className="border-gray-600 text-white hover:bg-gray-800"
                  >
                    <SkipForward className="w-5 h-5 mr-2" />
                    Skip
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Exercise Details */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center gap-3">
                  <Dumbbell className="w-6 h-6 text-blue-400" />
                  {currentExercise.name}
                </CardTitle>
                {(currentExercise.sets || currentExercise.reps) && (
                  <CardDescription className="text-gray-400 text-lg">
                    {currentExercise.sets && `${currentExercise.sets} sets`}
                    {currentExercise.sets && currentExercise.reps && ' • '}
                    {currentExercise.reps && `${currentExercise.reps} reps`}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white mb-3 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-400" />
                      Instructions
                    </h3>
                    <ol className="space-y-2 list-decimal list-inside text-gray-300">
                      {currentExercise.instructions.map((instruction, index) => (
                        <li key={index} className="leading-relaxed">
                          {instruction}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {currentExercise.rest && (
                    <div className="p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-400">
                        <Timer className="w-4 h-4" />
                        <span>Rest: {currentExercise.rest} seconds after this exercise</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Exercise List */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Workout Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        index === currentExerciseIndex
                          ? 'bg-blue-900/50 border border-blue-700'
                          : completedExercises.includes(index)
                          ? 'bg-green-900/30 border border-green-700'
                          : 'bg-gray-800 border border-gray-700'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        completedExercises.includes(index)
                          ? 'bg-green-600'
                          : index === currentExerciseIndex
                          ? 'bg-blue-600'
                          : 'bg-gray-700'
                      }`}>
                        {completedExercises.includes(index) ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-white text-sm">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`${
                          index === currentExerciseIndex ? 'text-blue-400' :
                          completedExercises.includes(index) ? 'text-green-400' :
                          'text-gray-300'
                        }`}>
                          {exercise.name}
                        </p>
                        {exercise.duration && (
                          <p className="text-sm text-gray-500">
                            {formatTime(exercise.duration)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
