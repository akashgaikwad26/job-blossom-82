import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Assessment {
  id: number;
  title: string;
  description: string;
  duration: number;
  questions: Question[];
}

const AssessmentPage = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  // Mock assessment data
  const assessments: { [key: string]: Assessment } = {
    "1": {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of JavaScript basics",
      duration: 30,
      questions: [
        {
          id: 1,
          question: "What is the correct way to declare a variable in JavaScript?",
          options: ["var myVar = 5;", "variable myVar = 5;", "v myVar = 5;", "declare myVar = 5;"],
          correctAnswer: 0
        },
        {
          id: 2,
          question: "Which method is used to add an element to the end of an array?",
          options: ["push()", "pop()", "shift()", "unshift()"],
          correctAnswer: 0
        },
        {
          id: 3,
          question: "What does '===' operator do in JavaScript?",
          options: ["Assigns a value", "Compares values only", "Compares values and types", "Performs arithmetic"],
          correctAnswer: 2
        },
        {
          id: 4,
          question: "Which of the following is NOT a JavaScript data type?",
          options: ["String", "Boolean", "Float", "Number"],
          correctAnswer: 2
        },
        {
          id: 5,
          question: "How do you create a function in JavaScript?",
          options: ["function myFunction() {}", "create myFunction() {}", "def myFunction() {}", "func myFunction() {}"],
          correctAnswer: 0
        }
      ]
    },
    "2": {
      id: 2,
      title: "React Development",
      description: "Test your React skills and concepts",
      duration: 45,
      questions: [
        {
          id: 1,
          question: "What is JSX in React?",
          options: ["A JavaScript library", "A syntax extension for JavaScript", "A CSS framework", "A database"],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "Which hook is used to manage state in functional components?",
          options: ["useEffect", "useState", "useContext", "useReducer"],
          correctAnswer: 1
        },
        {
          id: 3,
          question: "What is the purpose of useEffect hook?",
          options: ["To manage state", "To handle side effects", "To create components", "To style components"],
          correctAnswer: 1
        },
        {
          id: 4,
          question: "How do you pass data from parent to child component?",
          options: ["Props", "State", "Context", "Refs"],
          correctAnswer: 0
        },
        {
          id: 5,
          question: "What is the virtual DOM?",
          options: ["A real DOM element", "A JavaScript representation of the real DOM", "A CSS framework", "A database"],
          correctAnswer: 1
        }
      ]
    }
  };

  const assessment = assessments[assessmentId || "1"];
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

  if (!assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>Assessment not found</p>
            <Button onClick={() => navigate("/dashboard/job-seeker")} className="mt-4">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    assessment.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / assessment.questions.length) * 100);
  };

  const handleCompleteAssessment = () => {
    // In a real app, you would save the results to a backend
    // For now, we'll just navigate back to the dashboard
    navigate("/dashboard/job-seeker");
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-medium">
            <CardHeader className="text-center">
              <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
              <CardTitle className="text-2xl">Assessment Complete!</CardTitle>
              <CardDescription>You have successfully completed the {assessment.title} assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-success mb-2">{score}%</div>
                <p className="text-muted-foreground">Your Score</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Correct Answers:</span>
                  <span>{Math.round((score / 100) * assessment.questions.length)} / {assessment.questions.length}</span>
                </div>
                <Progress value={score} className="h-2" />
              </div>

              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  {score >= 80 ? "Excellent work! You have a strong understanding of the concepts." :
                   score >= 60 ? "Good job! Consider reviewing some topics to improve further." :
                   "Keep learning! Review the materials and try again when ready."}
                </p>
                
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => navigate("/dashboard/job-seeker")}>
                    Back to Dashboard
                  </Button>
                  <Button onClick={handleCompleteAssessment}>
                    Continue Learning
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
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/job-seeker")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{assessment.title}</h1>
            <p className="text-muted-foreground">{assessment.description}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {assessment.duration} min
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Question {currentQuestion + 1} of {assessment.questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-lg">
              {assessment.questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup 
              value={answers[currentQuestion]?.toString() || ""} 
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            >
              {assessment.questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              
              <div className="flex gap-2">
                {currentQuestion === assessment.questions.length - 1 ? (
                  <Button 
                    onClick={handleSubmit}
                    disabled={answers[currentQuestion] === undefined}
                  >
                    Submit Assessment
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNext}
                    disabled={answers[currentQuestion] === undefined}
                  >
                    Next Question
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Navigation */}
        <div className="mt-6 flex justify-center">
          <div className="flex gap-2 flex-wrap">
            {assessment.questions.map((_, index) => (
              <Button
                key={index}
                variant={index === currentQuestion ? "default" : answers[index] !== undefined ? "secondary" : "outline"}
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;