import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Send, Sparkles, Star, Code2, Rocket, Download, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import sparklesDecor from "@/assets/sparkles-decor.jpg";
import profilePhoto from "@/assets/profile-photo.png";
import floatingShapes from "@/assets/floating-shapes.jpg";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      });

      if (error) throw error;

      toast({
        title: "Message sent! ✨",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const skills = [
    "C/C++",
    "Python",
    "Java",
    "HTML/CSS/JavaScript",
    "React",
    "TypeScript",
    "Docker & Kubernetes",
    "MySQL & MongoDB",
    "Cloud Computing (AWS/GCP)",
    "Cryptography",
    "IoT & Embedded Systems",
    "STM32 Microcontrollers",
    "Git & GitHub",
    "Linux",
    "Selenium Testing",
    "REST APIs",
    "OOPS",
    "Data Structures & Algorithms",
    "System Design",
    "Agile/Scrum",
    "Problem Solving",
    "Team Leadership",
  ];

  const projects = [
    {
      title: "Post-Quantum Cryptography – Kyber Implementation",
      description: "Implemented Kyber algorithm on STM32F411CEU6 with NTT and SHAKE 128-based RNG for secure key generation",
      tags: ["Cryptography", "Embedded Systems", "C/C++"],
    },
    {
      title: "VoiceSense – AI Powered IoT Data Summarizer",
      description: "GenAI-powered Smart Home Voice Assistant with speech recognition, real-time monitoring, and AI-generated insights",
      tags: ["AI/ML", "IoT", "Python", "Dashboard"],
    },
    {
      title: "Nature's Basket – Organic Farm Tech Portal",
      description: "Web platform connecting farmers and buyers with product listings, cart management, checkout system with live stock updates, and Selenium-based automated testing",
      tags: ["HTML/CSS/JavaScript", "Selenium", "Web Development"],
    },
    {
      title: "Vehicle Rental Management System",
      description: "C++ OOP-based rental system with admin and customer modules, featuring persistent data storage",
      tags: ["C++", "OOP", "File Handling"],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-10 right-10 w-32 h-32 opacity-40 animate-float"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <Star className="w-full h-full text-primary" fill="currentColor" />
        </div>
        <div 
          className="absolute bottom-20 left-10 w-24 h-24 opacity-40 animate-float"
          style={{ animationDelay: "1s", transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <Sparkles className="w-full h-full text-secondary" />
        </div>
        <div 
          className="absolute top-1/3 left-1/4 w-20 h-20 opacity-30 animate-spin-slow"
        >
          <Code2 className="w-full h-full text-accent" />
        </div>
        <div 
          className="absolute bottom-1/3 right-1/4 w-16 h-16 opacity-30 animate-bounce-subtle"
        >
          <Rocket className="w-full h-full text-primary" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative z-10">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={sparklesDecor} 
            alt="" 
            className="w-full h-full object-cover animate-shimmer"
            style={{ 
              backgroundImage: `url(${sparklesDecor})`,
              backgroundSize: '200% 100%',
            }}
          />
        </div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center md:text-left animate-fade-in-left">
            <div className="inline-block mb-6 animate-bounce-subtle">
              <Sparkles className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-scale-in">
              Hi, I'm Sanjana Hosmath
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light leading-relaxed">
              ECE Student & Developer | Cryptography Enthusiast | Building Secure & Innovative Solutions
            </p>
            <div className="flex gap-4 justify-center md:justify-start flex-wrap">
              <Button 
                size="lg" 
                className="shadow-soft hover:shadow-elevated transition-smooth hover:scale-110 group"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Rocket className="w-4 h-4 mr-2 group-hover:animate-bounce-subtle" />
                View My Work
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="shadow-soft hover:shadow-elevated transition-smooth hover:scale-110"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="shadow-soft hover:shadow-elevated transition-smooth hover:scale-110 group"
                asChild
              >
                <a 
                  href="https://drive.google.com/file/d/1jFUz5bDAwNA2wFAZV32Vkjd1XgNdPXLn/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2 group-hover:animate-bounce-subtle" />
                  View Resume
                </a>
              </Button>
            </div>
          </div>
          
          <div className="relative animate-fade-in-right">
            <div className="absolute inset-0 gradient-pastel opacity-30 blur-3xl animate-glow"></div>
            <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto">
              <img 
                src={profilePhoto} 
                alt="Sanjana Hosmath" 
                className="rounded-3xl shadow-elevated hover:scale-105 transition-smooth w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Decorative Section */}
      <div className="relative py-12 overflow-hidden">
        <img 
          src={floatingShapes} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-10 animate-float"
        />
      </div>

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center animate-fade-in flex items-center justify-center gap-3">
            <Star className="w-10 h-10 text-primary animate-spin-slow" />
            About Me
            <Star className="w-10 h-10 text-secondary animate-spin-slow" style={{ animationDirection: 'reverse' }} />
          </h2>
          <Card className="shadow-elevated border-2 border-primary/20 hover:border-primary/40 transition-smooth hover:scale-[1.02] animate-scale-in">
            <CardContent className="pt-6">
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                I am a Electronics and Communication Engineering student at KLE Technological University (2026), 
                with a strong interest in software development, web technologies, cryptography, and AI-powered 
                systems. I focus on building secure, scalable, and efficient software solutions, with an emphasis 
                on system design and performance.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                I have received recognition at GENIFY 2024–25 and published research at IEEE INSPIRE 2025. 
                My technical skill set includes C/C++, Python, Java, modern web development, and hands-on 
                experience with Docker, Kubernetes, and cloud platforms, enabling me to work effectively 
                across the full software stack.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Beyond academics, I enjoy solving complex problems, collaborating in agile team environments, 
                and continuously learning emerging technologies to develop robust, production-ready software systems.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-muted/30 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center animate-fade-in">
            Skills & Expertise ✨
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-base px-6 py-3 shadow-soft hover:shadow-elevated transition-smooth hover:scale-110 cursor-default animate-fade-in"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center animate-fade-in flex items-center justify-center gap-3">
            <Code2 className="w-10 h-10 text-primary" />
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="shadow-soft hover:shadow-elevated transition-smooth hover:scale-105 cursor-pointer border-2 border-primary/10 hover:border-primary/30 group animate-fade-in overflow-hidden relative"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  animationFillMode: 'both'
                }}
              >
                <div className="absolute inset-0 gradient-pastel opacity-0 group-hover:opacity-10 transition-smooth"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-2xl group-hover:text-primary transition-smooth">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge 
                        key={i} 
                        variant="outline" 
                        className="text-xs hover:bg-primary hover:text-primary-foreground transition-smooth"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section id="social" className="py-20 px-6 bg-muted/30 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-in">
            Let's Connect 💫
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Find me on these platforms
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              variant="outline"
              size="lg"
              className="shadow-soft hover:shadow-elevated transition-smooth hover:scale-110 group animate-fade-in-left"
              onClick={() => window.open('https://github.com/Sanjanahosmath', '_blank')}
            >
              <Github className="w-5 h-5 mr-2 group-hover:animate-spin-slow" />
              GitHub
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="shadow-soft hover:shadow-elevated transition-smooth hover:scale-110 group animate-fade-in"
              style={{ animationDelay: '0.1s' }}
              onClick={() => window.open('https://www.linkedin.com/in/sanjana-hosmath-9112b531a/', '_blank')}
            >
              <Linkedin className="w-5 h-5 mr-2 group-hover:animate-bounce-subtle" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="shadow-soft hover:shadow-elevated transition-smooth hover:scale-110 group animate-fade-in-right"
              style={{ animationDelay: '0.2s' }}
              onClick={() => window.open('mailto:sanjanahosmath31@gmail.com', '_blank')}
            >
              <Mail className="w-5 h-5 mr-2 group-hover:animate-bounce-subtle" />
              Email
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in">
            Get In Touch 📮
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-center">
            Have a project in mind? Let's chat!
          </p>
          <Card className="shadow-elevated border-2 border-primary/20 hover:border-primary/40 transition-smooth animate-scale-in">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="shadow-soft focus:shadow-elevated transition-smooth"
                  />
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="shadow-soft focus:shadow-elevated transition-smooth"
                  />
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="shadow-soft focus:shadow-elevated transition-smooth resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full shadow-soft hover:shadow-elevated transition-smooth hover:scale-105 group animate-fade-in"
                  style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
                >
                  <Send className="w-4 h-4 mr-2 group-hover:animate-bounce-subtle" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t border-border/50 relative z-10">
        <p className="text-muted-foreground animate-fade-in">
          © 2025 Sanjana Hosmath. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
