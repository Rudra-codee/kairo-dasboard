import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Timer, CheckSquare, Folder, FileText, Palette, ArrowRight, Play, Users, Star } from "lucide-react";

const Landing = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const navigate = useNavigate();
  const features = [
    {
      icon: Timer,
      title: "Pomodoro Timer",
      description: "Stay focused with 25-minute work sessions and break reminders."
    },
    {
      icon: CheckSquare,
      title: "Task Management",
      description: "Organize to-do lists and track your progress effortlessly."
    },
    {
      icon: Folder,
      title: "Project Boards",
      description: "Break down goals into tasks: To Do, In Progress, Done."
    },
    {
      icon: FileText,
      title: "Smart Notes",
      description: "Capture ideas instantly and keep them organized."
    },
    {
      icon: Palette,
      title: "Customization",
      description: "Dark/light mode and beautiful accent colors to match your style."
    }
  ];

  const steps = [
    { step: "1", title: "Sign Up", description: "Create your free account in seconds" },
    { step: "2", title: "Create Projects", description: "Set up your first project and add tasks" },
    { step: "3", title: "Track Progress", description: "Use timers and boards to stay productive" }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Note: Connect to Supabase for authentication
    console.log("Login submitted");
    setIsLoginOpen(false);
    navigate('/app');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Note: Connect to Supabase for authentication
    console.log("Signup submitted");
    setIsSignupOpen(false);
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Timer className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Kairo</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">Pricing</Button>
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Login</Button>
                </DialogTrigger>
              </Dialog>
              <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                <DialogTrigger asChild>
                  <Button>Sign Up</Button>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
                Boost Productivity with <span className="text-primary">Kairo</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Manage tasks, projects, and notes in one place. Stay focused with Pomodoro timers and achieve your goals faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="text-lg px-8">
                      Get Started Free
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </DialogTrigger>
                </Dialog>
                <Button variant="outline" size="lg" className="text-lg px-8" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Play className="mr-2 w-5 h-5" />
                  Learn More
                </Button>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-primary text-primary mr-1" />
                  <span>10,000+ productive sessions</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>1,500+ happy users</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex justify-center items-center">
                <div className="relative">
                  <img 
                    src="/lovable-uploads/3bce1470-abda-4e75-a67e-3f5b91debed1.png" 
                    alt="Pomodoro Timer"
                    className="w-80 h-80 drop-shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out"
                    style={{
                      filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15)) drop-shadow(0 10px 10px rgba(0, 0, 0, 0.1))',
                      transform: 'perspective(1000px) rotateX(5deg) rotateY(-5deg)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Everything You Need to Stay Productive</h2>
            <p className="text-xl text-muted-foreground">Powerful features designed to help you focus and get things done.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Get started in three simple steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Boost Your Productivity?</h2>
          <p className="text-xl text-muted-foreground mb-8">Join thousands of users who are already getting more done with Kairo.</p>
          <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="text-lg px-8">
                Start for Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Timer className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Kairo</span>
              </div>
              <p className="text-muted-foreground">The productivity app that helps you focus and get things done.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Features</li>
                <li>Pricing</li>
                <li>Updates</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>About</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Twitter</li>
                <li>GitHub</li>
                <li>Discord</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Kairo. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Welcome back to Kairo</DialogTitle>
            <DialogDescription>
              Enter your credentials to access your productivity dashboard.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input id="login-password" type="password" placeholder="Enter your password" required />
            </div>
            <div className="flex flex-col space-y-2">
              <Button type="submit" className="w-full">Sign In</Button>
              <Button type="button" variant="link" className="text-sm">
                Forgot your password?
              </Button>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => {
                  setIsLoginOpen(false);
                  setIsSignupOpen(true);
                }}
              >
                Sign up
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Join Kairo</DialogTitle>
            <DialogDescription>
              Create your account and start boosting your productivity today.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-name">Full Name</Label>
              <Input id="signup-name" type="text" placeholder="Enter your full name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input id="signup-password" type="password" placeholder="Create a password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-confirm">Confirm Password</Label>
              <Input id="signup-confirm" type="password" placeholder="Confirm your password" required />
            </div>
            <Button type="submit" className="w-full">Create Account</Button>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => {
                  setIsSignupOpen(false);
                  setIsLoginOpen(true);
                }}
              >
                Sign in
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Landing;