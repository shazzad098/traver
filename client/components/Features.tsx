
import React, { useRef } from 'react';
import { Globe, ShieldCheck, Zap, Download } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Features: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const features = [
    {
      title: "Vast Horizons",
      desc: "Explore a curated selection of breathtaking destinations from hidden gems to world-renowned landmarks.",
      icon: <Globe className="w-8 h-8 text-white" />,
      gradient: "from-blue-600 to-cyan-500",
      shadow: "shadow-blue-200",
      delay: 0.1
    },
    {
      title: "Expert Curation",
      desc: "Our travel experts hand-pick every experience, ensuring authentic cultural immersion and professional guidance.",
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      gradient: "from-orange-600 to-amber-500",
      shadow: "shadow-orange-200",
      delay: 0.2
    },
    {
      title: "Seamless Journey",
      desc: "From rapid booking to on-the-ground support, we leverage cutting-edge technology for a stress-free experience.",
      icon: <Zap className="w-8 h-8 text-white" />,
      gradient: "from-purple-600 to-fuchsia-500",
      shadow: "shadow-purple-200",
      delay: 0.3
    }
  ];

  const downloadPDF = () => {
    try {
      const doc = new jsPDF();

      // Header
      doc.setFillColor(255, 114, 53); // Traver Orange
      doc.rect(0, 0, 210, 40, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('TRAVER', 105, 20, { align: 'center' });
      doc.setFontSize(12);
      doc.text('Premium Travel Feature List', 105, 30, { align: 'center' });

      // Content
      doc.setTextColor(40, 40, 40);
      doc.setFontSize(18);
      doc.text('Our Elite Services', 20, 55);

      let yPos = 70;
      features.forEach((feature, index) => {
        // Feature Title
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 114, 53);
        doc.text(`${index + 1}. ${feature.title}`, 20, yPos);

        // Feature Description
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        const splitDesc = doc.splitTextToSize(feature.desc, 170);
        doc.text(splitDesc, 20, yPos + 8);

        yPos += 25;
      });

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text('© 2025 Traver. All rights reserved.', 105, 280, { align: 'center' });
      doc.text('www.traver.com', 105, 285, { align: 'center' });

      doc.save('Traver-Features-List.pdf');
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Something went wrong while generating the PDF. Please try again.");
    }
  };

  return (
    <section id="features" ref={containerRef} className="relative py-32 overflow-hidden bg-[#fafafa]">
      {/* Parallax Background Elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-[10%] w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 right-[15%] w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-[2px] w-8 bg-[#ff7235]"></div>
            <span className="text-[#ff7235] font-black tracking-[0.2em] text-xs uppercase">Elite Experiences</span>
            <div className="h-[2px] w-8 bg-[#ff7235]"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-8 font-heading px-4"
          >
            Travel Reimagined <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff7235] to-[#ff9800]">
              Just For You.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed px-4 mb-8"
          >
            We don't just plan trips; we craft lifelong memories with precision and passion.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadPDF}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-[#ff7235] transition-all duration-300 shadow-xl shadow-gray-200 group"
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            Download Feature List
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -15 }}
              className="relative group h-full"
            >
              <div className="bg-white rounded-[3rem] p-10 h-full border border-gray-100/50 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500 flex flex-col items-center text-center">
                <div className={`mb-10 p-5 rounded-[2rem] bg-gradient-to-br ${feature.gradient} shadow-2xl ${feature.shadow} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-6 font-heading">
                  {feature.title}
                </h3>

                <p className="text-gray-500 text-[15px] leading-relaxed font-semibold">
                  {feature.desc}
                </p>

                <motion.div
                  className="mt-10 w-12 h-1 bg-gray-100 rounded-full group-hover:w-24 group-hover:bg-[#ff7235] transition-all duration-500"
                />
              </div>

              {/* Parallax Floating Accent */}
              <motion.div
                style={{ y: idx === 1 ? y3 : y1 }}
                className={`absolute -z-10 -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
