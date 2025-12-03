import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export function WhatsAppButton({
  phoneNumber = "919876543210",
  message = "Hello! I'm interested in your photography services.",
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <Button
          variant="whatsapp"
          size="icon-lg"
          className="rounded-full shadow-large hover:shadow-glow"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </a>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
        className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full border-2 border-background"
      />
    </motion.div>
  );
}
