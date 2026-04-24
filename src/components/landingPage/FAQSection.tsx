import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircleQuestion } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Is ProfileGen really free to use?",
    answer: "Yes! You can create and download up to 3 resumes completely free of charge. No credit card is required to start. If you need unlimited downloads and premium AI features, you can upgrade to our Pro or Elite plans starting at just $1."
  },
  {
    question: "Are the templates ATS-friendly?",
    answer: "Absolutely. Every template in our library is designed by career experts and tested against major Applicant Tracking Systems (ATS). We ensure your resume is readable by both AI scanners and human recruiters."
  },
  {
    question: "Can I download my resume in PDF format?",
    answer: "Yes, all users can export their resumes in high-definition PDF format. This ensures that your formatting remains perfect regardless of what device the recruiter uses to view it."
  },
  {
    question: "Do you offer AI-powered content suggestions?",
    answer: "Yes, our Elite plan includes a 'Smart Writer' that suggests professional bullet points based on your job title and helps you craft a compelling professional summary in seconds."
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Of course. There are no long-term contracts. You can cancel your Pro or Elite subscription at any time from your dashboard with a single click."
  }
];

const FAQSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -top-24 -left-24 max-w-7xl h-96 bg-[#DCA06D]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-[#4F1C51]/5 text-[#4F1C51]">
            <HelpCircle size={28} />
          </div>
          <h2 className="text-[#210F37] text-4xl md:text-5xl font-black mb-4">
            Common <span className="text-[#A55B4B]">Questions</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Everything you need to know about building your professional future with ProfileGen.
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <AccordionItem 
                value={`item-${index}`} 
                className="border border-gray-100 rounded-2xl px-6 bg-[#FAFAFA] hover:bg-white hover:shadow-xl hover:shadow-[#210F37]/5 transition-all duration-300 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-[#210F37] font-bold text-lg py-6 hover:no-underline hover:text-[#4F1C51]">
                  <div className="flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#DCA06D]/10 flex items-center justify-center text-[#DCA06D] text-sm">
                      ?
                    </span>
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed text-base pb-6 pl-12 border-t border-gray-50 pt-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

      </div>
    </section>
  );
};

export default FAQSection;