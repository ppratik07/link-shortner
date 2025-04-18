import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "What is LinkSnap?",
      answer: "LinkSnap is a modern URL shortening service that transforms long, unwieldy links into concise, memorable ones. Perfect for social media, marketing campaigns, or any situation where shorter links are preferred."
    },
    {
      question: "Is LinkSnap free to use?",
      answer: "Yes! LinkSnap offers a free tier that includes basic link shortening features. For advanced analytics and custom branded links, check out our premium plans."
    },
    {
      question: "Are shortened links permanent?",
      answer: "Yes, all shortened links are permanent and will not expire. You can trust that your links will continue working as long as you need them."
    },
    {
      question: "Can I customize my shortened links?",
      answer: "Yes, premium users can create custom branded links that reflect their brand or content, making links more trustworthy and memorable."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Have questions? Were here to help.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border px-4">
              <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-purple-600">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};