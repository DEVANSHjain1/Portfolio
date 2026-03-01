import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiAward, FiBookOpen, FiCornerDownRight } from 'react-icons/fi';
import ScrollRevealText from './ScrollRevealText';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    institution: 'Indian Institute of Technology (IIT) Delhi',
    degree: 'Bachelor of Technology',
    years: '2019 - 2023',
    description: 'Built a rigorous foundation in software engineering, specializing in Java and C++. Honed algorithmic problem-solving skills through active competitive programming, achieving a top 247 rank among 100k+ candidates in the AICTE IICC. Secured 1st place out of 29,600+ teams nationwide at the Smart India Hackathon by developing a VR simulator for the coal industry with Unity and C#.',
  },
//   {
//     institution: 'CBSE',
//     degree: 'High School Diploma',
//     years: '2017 - 2018',
//     description: 'Specialized in science and mathematics, laying the groundwork for my technical education.',
//   },
];

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const educationItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      }
      if (educationItemsRef.current) {
        gsap.from(educationItemsRef.current.children, {
          scrollTrigger: { trigger: educationItemsRef.current, start: 'top 80%' },
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-24 md:py-32 bg-white dark:bg-black font-sans text-black dark:text-white"
    >
      <div className="max-w-8xl mx-auto px-6 md:px-16 relative z-10">
        <div
          ref={titleRef}
          className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-black/20 dark:border-white/20 pb-8"
        >
          <div className="md:col-span-8">
            <div className="flex items-center gap-4 mb-4">
              <FiCornerDownRight className="text-red-500 w-6 h-6" />
              <span className="font-mono text-xs uppercase tracking-widest text-red-500">
                ACADEMIC_BACKGROUND
              </span>
            </div>
            <h2 className="text-[15vw] md:text-[8vw] leading-[0.8] font-bold uppercase tracking-tighter text-transparent text-stroke-responsive opacity-60 select-none pointer-events-none">
              <ScrollRevealText text="EDUCATION" />
            </h2>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end">
            <p className="text-sm md:text-base font-light text-zinc-600 dark:text-zinc-400 text-justify max-w-xs ml-auto">
              My academic journey and key qualifications.
            </p>
          </div>
        </div>

        <div ref={educationItemsRef} className="space-y-12">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              <div className="md:col-span-4">
                <div className="flex items-center gap-4">
                  <div className="text-red-500">
                    {edu.degree.includes('Bachelor') ? <FiAward size={24} /> : <FiBookOpen size={24} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">{edu.institution}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{edu.years}</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-8">
                <h4 className="text-lg font-semibold mb-2">{edu.degree}</h4>
                <p className="text-zinc-600 dark:text-zinc-400 font-light">
                  {edu.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;