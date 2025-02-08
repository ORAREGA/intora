import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaPlus, FaMinus, FaSearch } from 'react-icons/fa';

const Faq = () => {
  const faqs = [
    {
      question: "What services do you offer?",
      answer: "INTORA provides a wide range of interior design services, including full home interiors, wardrobes, furniture works, modular kitchens, lighting, electrical and civil work, false ceilings, painting, wall design, flooring, and plumbing."
    },
    {
      question: "How do I start a project with INTORA?",
      answer: "Contact us via our form or call us directly. We’ll arrange an initial consultation to discuss your needs, style, and budget, and then create a customized design plan for you."
    },
    {
      question: "What is your design process?",
      answer: "Our process includes: initial consultation, concept development, design presentation, project implementation, and final review. We work closely with you throughout to ensure the design meets your expectations."
    },
    {
      question: "How much do your services cost?",
      answer: "Costs depend on the project’s scope and complexity. We offer various packages and provide detailed quotes after the initial consultation, aiming to deliver value within your budget."
    },
    {
      question: "Do you offer design packages or hourly rates?",
      answer: "We offer both design packages and hourly rates, based on your project needs. We’ll discuss the best pricing structure during our consultation."
    },
    {
      question: "Do you manage the entire project?",
      answer: "Yes, we provide full-service project management, including contractor coordination, material sourcing, and design implementation, ensuring a seamless and stress-free experience."
    },
    {
      question: "How long will my project take?",
      answer: "The timeline depends on the project's size and complexity. We’ll provide a detailed schedule during the planning phase so you can plan accordingly."
    },
    {
      question: "Can I be involved in the design process?",
      answer: "Absolutely! We value your input and encourage your involvement throughout the design process to ensure the results align with your vision."
    },
    {
      question: "Do you offer custom furniture or fixtures?",
      answer: "Yes, we design and source custom furniture and fixtures to suit your space and style, working with artisans and suppliers to provide unique, high-quality pieces."
    },
    {
      question: "What happens after the project is completed?",
      answer: "We conduct a final walkthrough to ensure your satisfaction and offer post-installation support for any questions or assistance with your new space."
    },
    {
      question: "Do you offer maintenance or follow-up services?",
      answer: "Yes, we provide follow-up services for any concerns or adjustments needed after project completion, ensuring your complete satisfaction with the final result."
    }
  ];

  const [visibleIndex, setVisibleIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const answerRefs = useRef([]);

  const toggleAnswer = (index) => {
    if (visibleIndex === index) {
      gsap.to(answerRefs.current[index], { height: 0, opacity: 0, duration: 0.3, ease: "power2.out" });
      setVisibleIndex(null);
    } else {
      setVisibleIndex(index);
      gsap.to(answerRefs.current[index], { height: 'auto', opacity: 1, duration: 0.3, ease: "power2.out" });
    }
  };

  useEffect(() => {
    answerRefs.current.forEach((ref) => {
      if (ref) {
        gsap.set(ref, { height: 0, opacity: 0 });
      }
    });
  }, []);

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="faq-section">
      <div className="search-container" style={{marginTop:"5rem"}}>
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
      </div>
      <div>
        {filteredFaqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3
              className="faq-item-header playfont"
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
              {visibleIndex === index ? <FaMinus /> : <FaPlus />}
            </h3>
            <div
              ref={el => answerRefs.current[index] = el}
              className={`answer ${visibleIndex === index ? 'open' : ''}`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
