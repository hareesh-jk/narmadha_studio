import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Camera, Heart, Award, Users } from "lucide-react";

const stats = [
  { icon: Camera, value: "10,000+", label: "Photos Delivered" },
  { icon: Heart, value: "500+", label: "Happy Clients" },
  { icon: Award, value: "50+", label: "Awards Won" },
  { icon: Users, value: "8+", label: "Years Experience" },
];

const teamMembers = [
  {
    name: "Arjun Mehta",
    role: "Lead Photographer & Founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "With over 10 years of experience, Arjun brings artistic vision and technical excellence to every shoot.",
  },
  {
    name: "Neha Sharma",
    role: "Wedding Specialist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    bio: "Neha's eye for capturing emotional moments has made her a favorite among wedding couples.",
  },
  {
    name: "Vikram Singh",
    role: "Portrait Artist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Vikram's studio portraits are known for their dramatic lighting and artistic composition.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              About Us
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl font-semibold mt-3 mb-6">
              Capturing Life's Most
              <span className="text-primary"> Beautiful Moments</span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              At Lumière Photography, we believe every moment tells a story. 
              Our passion is to capture those fleeting instances and transform them 
              into timeless memories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80"
                  alt="Our studio"
                  className="rounded-2xl shadow-large"
                />
                <div className="absolute -bottom-8 -right-8 bg-primary text-primary-foreground p-6 rounded-xl shadow-large">
                  <div className="font-serif text-4xl font-semibold">8+</div>
                  <div className="text-sm opacity-90">Years of Excellence</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-medium text-sm tracking-wider uppercase">
                Our Story
              </span>
              <h2 className="font-serif text-4xl font-semibold mt-3 mb-6">
                A Journey of Passion & Creativity
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2016, Lumière Photography began with a simple dream — 
                  to capture the essence of human connections through the lens of a camera.
                </p>
                <p>
                  What started as a one-person operation has grown into a team of talented 
                  photographers, each bringing their unique perspective and expertise to our work.
                </p>
                <p>
                  Today, we're proud to have served over 500 clients, capturing weddings, 
                  birthdays, family portraits, and countless special moments across India.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="font-serif text-4xl font-semibold text-foreground">
                  {stat.value}
                </div>
                <div className="text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Our Team
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold mt-3 mb-4">
              Meet the Artists
            </h2>
            <p className="text-muted-foreground text-lg">
              Our talented team of photographers brings passion and expertise to every project.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative rounded-2xl overflow-hidden mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-serif text-xl font-semibold">{member.name}</h3>
                <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
