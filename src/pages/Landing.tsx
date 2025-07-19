import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Timer, CheckSquare, Folder, FileText, Palette, ArrowRight, Play, Users, Star } from "lucide-react";

const Landing = () => {
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

  const testimonials = [
    {
      quote: "Dealboard transformed how I manage my daily tasks. The Pomodoro timer keeps me focused!",
      author: "Sarah Chen",
      role: "Product Designer"
    },
    {
      quote: "Simple, elegant, and powerful. Everything I need for productivity in one place.",
      author: "Mike Rodriguez",
      role: "Software Engineer"
    }
  ];

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
              <span className="text-xl font-bold text-foreground">Dealboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">Pricing</Button>
              <Button variant="outline">Login</Button>
              <Button>Sign Up</Button>
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
                Boost Productivity with <span className="text-primary">Dealboard</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Manage tasks, projects, and notes in one place. Stay focused with Pomodoro timers and achieve your goals faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8">
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
              <Card className="p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Today's Focus</h3>
                    <div className="text-2xl font-mono text-primary">25:00</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-primary"></div>
                      <span>Complete project proposal</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full border-2 border-muted"></div>
                      <span className="text-muted-foreground">Review team feedback</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full border-2 border-muted"></div>
                      <span className="text-muted-foreground">Plan next sprint</span>
                    </div>
                  </div>
                  <Button className="w-full">Start Pomodoro</Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
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

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Our Users Say</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg text-foreground mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Boost Your Productivity?</h2>
          <p className="text-xl text-muted-foreground mb-8">Join thousands of users who are already getting more done with Dealboard.</p>
          <Button size="lg" className="text-lg px-8">
            Start for Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
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
                <span className="text-xl font-bold">Dealboard</span>
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
            <p>&copy; 2024 Dealboard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;