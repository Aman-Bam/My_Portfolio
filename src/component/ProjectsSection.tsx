import { ExternalLink, Github, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProjectsSection = () => {
  const projects = [
    {
      title: "SaaS Dashboard Platform",
      problem: "Startup needed a comprehensive analytics dashboard to track user engagement and revenue metrics in real-time.",
      solution: "Built a full-stack dashboard with real-time data visualization, role-based access control, and automated reporting.",
      tech: ["React", "Node.js", "MongoDB", "WebSocket", "Chart.js"],
      features: ["Real-time updates", "Role-based auth", "Custom reports", "API integrations"],
      highlights: [
        { icon: Zap, text: "50% faster load times" },
        { icon: Shield, text: "Enterprise-grade security" },
      ],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "E-Commerce Platform",
      problem: "Business owner needed a modern, scalable online store with inventory management and payment processing.",
      solution: "Developed a complete e-commerce solution with product management, shopping cart, secure checkout, and admin panel.",
      tech: ["React", "Express.js", "MongoDB", "Stripe", "Tailwind CSS"],
      features: ["Product catalog", "Cart system", "Secure payments", "Order tracking"],
      highlights: [
        { icon: Zap, text: "99.9% uptime" },
        { icon: Shield, text: "PCI compliant" },
      ],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Authentication System",
      problem: "Client required a robust, secure authentication system supporting multiple auth methods and session management.",
      solution: "Implemented JWT-based auth with OAuth integration, password recovery, and comprehensive session handling.",
      tech: ["Node.js", "Express", "JWT", "OAuth 2.0", "MongoDB"],
      features: ["Multi-factor auth", "Social login", "Session management", "Password policies"],
      highlights: [
        { icon: Shield, text: "OWASP compliant" },
        { icon: Zap, text: "Sub-100ms response" },
      ],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Task Management App",
      problem: "Team needed a collaborative project management tool with real-time updates and task dependencies.",
      solution: "Created a Trello-like application with drag-and-drop, real-time collaboration, and detailed analytics.",
      tech: ["React", "Node.js", "Socket.io", "PostgreSQL", "Redis"],
      features: ["Drag & drop", "Real-time sync", "Team collaboration", "Analytics"],
      highlights: [
        { icon: Zap, text: "Instant sync" },
        { icon: Shield, text: "Data encryption" },
      ],
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 mb-6">
            <span className="text-xs text-primary font-medium">FEATURED WORK</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Projects That <span className="text-gradient">Deliver Results</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-world applications built to solve complex problems, 
            drive business growth, and deliver exceptional user experiences.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group border-gradient p-6 rounded-2xl bg-card hover-lift"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <a
                    href={project.githubUrl}
                    className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={project.liveUrl}
                    className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Problem & Solution */}
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="text-foreground font-medium">Challenge: </span>
                  {project.problem}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">Solution: </span>
                  {project.solution}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                {project.features.map((feature, featureIndex) => (
                  <span key={featureIndex} className="text-xs text-muted-foreground">
                    • {feature}
                  </span>
                ))}
              </div>

              {/* Highlights */}
              <div className="flex gap-4 pt-4 border-t border-border">
                {project.highlights.map((highlight, highlightIndex) => (
                  <div key={highlightIndex} className="flex items-center gap-2">
                    <highlight.icon className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">{highlight.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button variant="heroOutline" size="lg" asChild>
            <a href="https://github.com/Aman-Bam" target="_blank" rel="noopener noreferrer">
              View All Projects on GitHub
              <Github className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
