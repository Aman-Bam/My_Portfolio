import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Founder, TechStart",
      content: "Aman delivered exactly what we needed—a scalable platform that handles our growing user base without breaking a sweat. His attention to security and performance was exceptional.",
      rating: 5,
    },
    {
      name: "Sarah Mitchell",
      role: "CEO, DataFlow",
      content: "Working with Aman was a game-changer for our startup. He didn't just build our app; he helped us think through the architecture in a way that saved us months of refactoring.",
      rating: 5,
    },
    {
      name: "Michael Roberts",
      role: "CTO, ScaleUp Inc",
      content: "Rare to find a developer who understands both the technical and business side. Aman's code is clean, well-documented, and built to last. Highly recommend.",
      rating: 5,
    },
  ];

  return (
    <section className="section-padding bg-secondary/20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 mb-6">
            <span className="text-xs text-primary font-medium">TESTIMONIALS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What <span className="text-gradient">Clients</span> Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it—hear from the founders and 
            businesses I've had the pleasure of working with.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover-lift"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
