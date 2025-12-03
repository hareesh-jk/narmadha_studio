import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Camera,
  Users,
  Cake,
  TreePine,
  Image,
  Sparkles,
  CalendarIcon,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  MessageSquare,
  Check,
  ArrowRight,
  ArrowLeft,
  Upload,
} from "lucide-react";

const services = [
  { id: "wedding", icon: Camera, name: "Wedding Photography", duration: "8-12 hours" },
  { id: "kids", icon: Users, name: "Kids & Family", duration: "2-3 hours" },
  { id: "events", icon: Cake, name: "Birthday & Events", duration: "4-6 hours" },
  { id: "outdoor", icon: TreePine, name: "Outdoor Sessions", duration: "2 hours" },
  { id: "studio", icon: Image, name: "Studio Portraits", duration: "1 hour" },
  { id: "editing", icon: Sparkles, name: "Photo Editing", duration: "Per photo" },
];

const packages = {
  wedding: [
    { id: "essential", name: "Essential", price: 75000, duration: "8 hours" },
    { id: "premium", name: "Premium", price: 125000, duration: "10 hours" },
    { id: "luxe", name: "Luxe", price: 200000, duration: "12 hours" },
  ],
  kids: [
    { id: "mini", name: "Mini Session", price: 8000, duration: "1 hour" },
    { id: "standard", name: "Standard", price: 15000, duration: "2 hours" },
    { id: "deluxe", name: "Deluxe", price: 25000, duration: "3 hours" },
  ],
  events: [
    { id: "basic", name: "Basic", price: 20000, duration: "4 hours" },
    { id: "standard", name: "Standard", price: 35000, duration: "6 hours" },
    { id: "premium", name: "Premium", price: 50000, duration: "8 hours" },
  ],
  outdoor: [
    { id: "golden", name: "Golden Hour", price: 10000, duration: "1 hour" },
    { id: "extended", name: "Extended", price: 18000, duration: "2 hours" },
  ],
  studio: [
    { id: "headshot", name: "Headshot", price: 5000, duration: "30 min" },
    { id: "portrait", name: "Portrait", price: 8000, duration: "1 hour" },
    { id: "fashion", name: "Fashion", price: 15000, duration: "2 hours" },
  ],
  editing: [
    { id: "basic", name: "Basic Edit", price: 300, duration: "Per photo" },
    { id: "advanced", name: "Advanced Retouch", price: 500, duration: "Per photo" },
    { id: "composite", name: "Composite", price: 1500, duration: "Per photo" },
  ],
};

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30",
];

export default function Booking() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    notes: "",
  });

  const currentPackages = selectedService
    ? packages[selectedService as keyof typeof packages]
    : [];

  const selectedPkg = currentPackages.find((p) => p.id === selectedPackage);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    // Validate
    if (!selectedService || !selectedPackage || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please provide your contact details.",
        variant: "destructive",
      });
      return;
    }

    // Simulate booking submission
    toast({
      title: "Booking Submitted!",
      description: "We'll confirm your booking within 24 hours.",
    });
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedService !== null;
      case 2:
        return selectedPackage !== null;
      case 3:
        return selectedDate !== undefined && selectedTime !== null;
      case 4:
        return formData.name && formData.phone && formData.email;
      default:
        return false;
    }
  };

  return (
    <Layout showWhatsApp={false}>
      {/* Hero */}
      <section className="relative pt-32 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Book Your Session
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl font-semibold mt-3 mb-6">
              Let's Create
              <span className="text-primary"> Magic Together</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex items-center gap-4">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all",
                      step >= s
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {step > s ? <Check className="h-5 w-5" /> : s}
                  </div>
                  {s < 4 && (
                    <div
                      className={cn(
                        "w-12 h-1 rounded-full transition-all",
                        step > s ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex gap-8 text-sm">
              <span className={step >= 1 ? "text-foreground" : "text-muted-foreground"}>
                Service
              </span>
              <span className={step >= 2 ? "text-foreground" : "text-muted-foreground"}>
                Package
              </span>
              <span className={step >= 3 ? "text-foreground" : "text-muted-foreground"}>
                Date & Time
              </span>
              <span className={step >= 4 ? "text-foreground" : "text-muted-foreground"}>
                Details
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <AnimatePresence mode="wait">
            {/* Step 1: Select Service */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="font-serif text-2xl font-semibold text-center mb-8">
                  Choose Your Service
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service.id);
                        setSelectedPackage(null);
                      }}
                      className={cn(
                        "p-6 rounded-xl border-2 text-left transition-all",
                        selectedService === service.id
                          ? "border-primary bg-primary/5 shadow-soft"
                          : "border-border hover:border-primary/50 bg-card"
                      )}
                    >
                      <service.icon
                        className={cn(
                          "h-8 w-8 mb-4",
                          selectedService === service.id
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      />
                      <h3 className="font-semibold mb-1">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.duration}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Select Package */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="font-serif text-2xl font-semibold text-center mb-8">
                  Choose Your Package
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentPackages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={cn(
                        "p-6 rounded-xl border-2 text-left transition-all",
                        selectedPackage === pkg.id
                          ? "border-primary bg-primary/5 shadow-soft"
                          : "border-border hover:border-primary/50 bg-card"
                      )}
                    >
                      <h3 className="font-semibold mb-2">{pkg.name}</h3>
                      <div className="text-2xl font-serif font-semibold text-primary mb-2">
                        ₹{pkg.price.toLocaleString("en-IN")}
                      </div>
                      <p className="text-sm text-muted-foreground">{pkg.duration}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Select Date & Time */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="font-serif text-2xl font-semibold text-center mb-8">
                  Pick Date & Time
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Calendar */}
                  <div className="bg-card rounded-xl p-6 shadow-soft">
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Select Date</h3>
                    </div>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) =>
                        date < new Date() || date.getDay() === 0
                      }
                      className="rounded-md border pointer-events-auto"
                    />
                  </div>

                  {/* Time Slots */}
                  <div className="bg-card rounded-xl p-6 shadow-soft">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Select Time</h3>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "py-2 px-3 rounded-lg text-sm font-medium transition-all",
                            selectedTime === time
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted hover:bg-muted/80 text-muted-foreground"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      * Studio hours: Mon-Sat 9:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Contact Details */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="font-serif text-2xl font-semibold text-center mb-8">
                  Your Details
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Form */}
                  <div className="bg-card rounded-xl p-6 shadow-soft space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4" /> Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" /> Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" /> Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> Event Location
                      </Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="Venue address or 'Studio'"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" /> Additional Notes
                      </Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        placeholder="Any special requests or requirements..."
                        rows={3}
                      />
                    </div>
                    <div className="pt-4">
                      <Label className="flex items-center gap-2 cursor-pointer">
                        <Upload className="h-4 w-4" /> Upload Reference Photos (Optional)
                      </Label>
                      <Input type="file" multiple accept="image/*" className="mt-2" />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-card rounded-xl p-6 shadow-soft">
                    <h3 className="font-semibold mb-4">Booking Summary</h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Service</span>
                        <span className="font-medium">
                          {services.find((s) => s.id === selectedService)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Package</span>
                        <span className="font-medium">{selectedPkg?.name}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium">
                          {selectedDate ? format(selectedDate, "PPP") : "-"}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Time</span>
                        <span className="font-medium">{selectedTime || "-"}</span>
                      </div>
                      <div className="flex justify-between py-4">
                        <span className="font-semibold">Total</span>
                        <span className="font-serif text-2xl font-semibold text-primary">
                          ₹{selectedPkg?.price.toLocaleString("en-IN") || 0}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        * 25% advance payment required to confirm booking
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-12">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className={step === 1 ? "invisible" : ""}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            {step < 4 ? (
              <Button
                variant="hero"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="gold"
                size="lg"
                onClick={handleSubmit}
                disabled={!canProceed()}
              >
                Confirm Booking
                <Check className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
