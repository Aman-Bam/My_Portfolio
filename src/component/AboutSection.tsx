import { Code2, Lightbulb, Target } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Image/Visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* Code Block Visual */}
              <div className="border-gradient p-6 rounded-2xl bg-card">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <pre className="font-mono text-sm text-muted-foreground overflow-x-auto">
                  <code>
{`const developer = {
  name: "Aman",
  role: "Full-Stack Developer",
  passion: "Building scalable apps",
  philosophy: "Clean code, real impact",
  focus: [
    "Performance",
    "Security", 
    "User Experience"
  ]
};`}
                  </code>
                </pre>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          </div>

          {/* Right Column - Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 mb-6">
              <span className="text-xs text-primary font-medium">ABOUT ME</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Engineer by Mind,<br />
              <span className="text-gradient">Problem Solver</span> by Heart
            </h2>

            <p className="text-muted-foreground text-lg mb-6">
              I'm Aman, a Senior Full-Stack Developer who believes that great software 
              isn't just about writing code—it's about solving real business problems 
              with elegant, scalable solutions.
            </p>

            <p className="text-muted-foreground mb-8">
              With expertise spanning frontend to backend, I architect systems that 
              not only work flawlessly today but scale effortlessly tomorrow. I think 
              like an engineer and partner, understanding that every line of code 
              should drive business value.
            </p>

            {/* Key Points */}
            <div className="grid gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Clean Architecture</h3>
                  <p className="text-sm text-muted-foreground">
                    Writing maintainable, scalable code that teams can build upon
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Business-First Thinking</h3>
                  <p className="text-sm text-muted-foreground">
                    Every technical decision is aligned with your business goals
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Results-Driven</h3>
                  <p className="text-sm text-muted-foreground">
                    Focused on delivering measurable outcomes, not just features
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
