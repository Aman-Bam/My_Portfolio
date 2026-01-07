import { CheckCircle2, Code2, Shield, Zap, MessageSquare, Clock, Users } from "lucide-react";

const WhyHireSection = () => {
  const reasons = [
    {
      icon: Code2,
      title: "Clean & Maintainable Code",
      description: "Every line of code is written with clarity and future-proofing in mind. Your codebase will be easy to understand, extend, and maintain.",
    },
    {
      icon: Zap,
      title: "Performance-First Approach",
      description: "Applications are optimized for speed from day one. Fast load times, efficient queries, and smooth user experiences are non-negotiable.",
    },
    {
      icon: Shield,
      title: "Security Built-In",
      description: "Security isn't an afterthought—it's fundamental. From authentication to data protection, your application is built to resist threats.",
    },
    {
      icon: MessageSquare,
      title: "Clear Communication",
      description: "Regular updates, transparent progress reports, and always-available communication. You'll never be left wondering about project status.",
    },
    {
      icon: Users,
      title: "Business-Focused Development",
      description: "Technical decisions are made with your business goals in mind. Every feature is designed to drive real value and ROI.",
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "Deadlines are respected. With realistic planning and efficient execution, your project launches when promised.",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 mb-6">
              <span className="text-xs text-primary font-medium">WHY CHOOSE ME</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Building Software That<br />
              <span className="text-gradient">Actually Works</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8">
              I don't just write code—I solve problems. When you work with me, 
              you get a partner who understands that great software is about 
              delivering real business outcomes.
            </p>

            <div className="space-y-4">
              {["Production-ready code from day one", "Full transparency in development process", "Long-term partnership mindset"].map(
                (item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right Column - Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover-lift"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <reason.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1 text-sm">{reason.title}</h3>
                <p className="text-xs text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyHireSection;
