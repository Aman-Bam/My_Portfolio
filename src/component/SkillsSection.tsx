import { Code2, Server, Database, Wrench } from "lucide-react";

const SkillsSection = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend",
      description: "Building responsive, performant user interfaces",
      skills: [
        { name: "React", level: 95 },
        { name: "JavaScript (ES6+)", level: 95 },
        { name: "TypeScript", level: 85 },
        { name: "Tailwind CSS", level: 95 },
        { name: "HTML5 / CSS3", level: 95 },
        { name: "Bootstrap", level: 90 },
      ],
    },
    {
      icon: Server,
      title: "Backend",
      description: "Architecting secure, scalable server systems",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Express.js", level: 90 },
        { name: "REST APIs", level: 95 },
        { name: "Authentication", level: 90 },
        { name: "Python", level: 80 },
        { name: "MVC Architecture", level: 90 },
      ],
    },
    {
      icon: Database,
      title: "Databases",
      description: "Designing efficient data structures",
      skills: [
        { name: "MongoDB", level: 90 },
        { name: "SQL", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "Data Modeling", level: 85 },
        { name: "Query Optimization", level: 80 },
        { name: "Database Security", level: 85 },
      ],
    },
    {
      icon: Wrench,
      title: "Tools & DevOps",
      description: "Streamlining development workflows",
      skills: [
        { name: "Git & GitHub", level: 95 },
        { name: "API Security", level: 85 },
        { name: "Performance Optimization", level: 85 },
        { name: "C / C++", level: 75 },
        { name: "Testing", level: 80 },
        { name: "CI/CD", level: 75 },
      ],
    },
  ];

  return (
    <section id="skills" className="section-padding bg-secondary/20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 mb-6">
            <span className="text-xs text-primary font-medium">SKILLS & EXPERTISE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive skill set honed through years of building production-grade 
            applications with focus on performance, security, and clean architecture.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="border-gradient p-6 rounded-2xl bg-card hover-lift"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
