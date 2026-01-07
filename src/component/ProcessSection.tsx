import { Search, Paintbrush, Code, TestTube, Rocket, Settings } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Discovery & Planning",
      description: "Understanding your business goals, target audience, and technical requirements to create a solid foundation.",
    },
    {
      icon: Paintbrush,
      number: "02",
      title: "Architecture Design",
      description: "Designing scalable system architecture, database schemas, and API structures that support future growth.",
    },
    {
      icon: Code,
      number: "03",
      title: "Development",
      description: "Building your application with clean, maintainable code following industry best practices and standards.",
    },
    {
      icon: TestTube,
      number: "04",
      title: "Testing & QA",
      description: "Rigorous testing to ensure functionality, security, and performance meet the highest standards.",
    },
    {
      icon: Rocket,
      number: "05",
      title: "Deployment",
      description: "Smooth deployment with CI/CD pipelines, monitoring setup, and performance optimization.",
    },
    {
      icon: Settings,
      number: "06",
      title: "Maintenance & Scale",
      description: "Ongoing support, updates, and scaling strategies to keep your application running at peak performance.",
    },
  ];

  return (
    <section id="process" className="section-padding bg-secondary/20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 mb-6">
            <span className="text-xs text-primary font-medium">MY PROCESS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How I <span className="text-gradient">Deliver</span> Results
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A proven, systematic approach that ensures every project is delivered 
            on time, on budget, and exceeds expectations.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover-lift"
            >
              {/* Step Number */}
              <span className="absolute top-6 right-6 text-5xl font-bold text-secondary/80 group-hover:text-primary/20 transition-colors">
                {step.number}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <step.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
