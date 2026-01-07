import { ArrowRight, Calendar, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-8 md:p-16 text-center">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-glow opacity-50" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Let's Build Something<br />
              <span className="text-gradient">Powerful Together</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Ready to transform your idea into a scalable, high-performance web application? 
              Let's discuss how I can help you achieve your goals.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <a href="#contact" className="group">
                  <Mail className="w-5 h-5" />
                  Contact Me
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a href="#contact">
                  <Calendar className="w-5 h-5" />
                  Book a Call
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
