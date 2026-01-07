import { Building2, Rocket, Users2, Briefcase } from "lucide-react";

const TrustStrip = () => {
  const clients = [
    { icon: Rocket, label: "Startups" },
    { icon: Building2, label: "Businesses" },
    { icon: Users2, label: "SaaS Founders" },
    { icon: Briefcase, label: "Agencies" },
  ];

  return (
    <section className="py-12 border-y border-border bg-secondary/30">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Trust Statement */}
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              Trusted by founders and businesses to build
            </p>
            <p className="text-foreground font-semibold">
              secure, scalable web systems
            </p>
          </div>

          {/* Client Types */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {clients.map((client, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <client.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{client.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
