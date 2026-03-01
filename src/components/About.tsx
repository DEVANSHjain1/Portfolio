import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCornerDownRight } from 'react-icons/fi';
import ScrollRevealText from './ScrollRevealText';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const AwardWinningAbout: React.FC = () => {
    const { isDark } = useTheme();
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const stackContainerRef = useRef<HTMLDivElement>(null);
    const lastTimeRef = useRef<number>(0);
    const [isTouch, setIsTouch] = useState(false);

    const lightImages = Array.from({ length: 1 }, (_, i) => `/public/images/light/${i + 1}.png`);
    const darkImages = Array.from({ length: 1 }, (_, i) => `/public/images/dark/${i + 1}.png`);

    useEffect(() => {
        const checkTouch = () => {
            setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        checkTouch();
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const now = Date.now();
        if (now - lastTimeRef.current < 50) return;
        lastTimeRef.current = now;

        if (!sectionRef.current || !stackContainerRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

//         const images = isDark ? darkImages : lightImages;
//         const segment = rect.width / images.length;
//         const index = Math.min(Math.floor(x / segment), images.length - 1);
//
//         const img = document.createElement('img');
//         img.src = images[index];
//         img.alt = `Trail image ${index}`;
//         img.className = ' absolute w-30 h-40 object-cover grayscale brightness-125 contrast-125 pointer-events-none z-[60]';
//         img.style.left = `${x}px`;
//         img.style.top = `${y}px`;
//         img.style.transform = `translate(-50%, -50%) scale(0.8)`;
//         img.style.opacity = '0';
//
//         stackContainerRef.current.appendChild(img);
//
//         gsap.to(img, {
//             opacity: 0.8,
//             scale: 1,
//             rotation: gsap.utils.random(-5, 5),
//             duration: 0.2,
//             ease: 'power2.out',
//             onComplete: () => {
//                 gsap.to(img, {
//                     opacity: 0,
//                     scale: 0.5,
//                     duration: 0.3,
//                     ease: 'power2.in',
//                     onComplete: () => img.remove()
//                 });
//             }
//         });
    };

    const handleMouseLeave = () => {
        if (!stackContainerRef.current) return;
        gsap.to(stackContainerRef.current.children, {
            opacity: 0,
            scale: 0.5,
            duration: 0.3,
            ease: "power2.in",
            stagger: 0.05,
            onComplete: () => {
                if (stackContainerRef.current) {
                    stackContainerRef.current.innerHTML = '';
                }
            }
        });
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>('.stat-value').forEach((el) => {
                const originalText = el.innerText || "";
                if (!originalText.trim()) return;
                const isNumber = /^[0-9]/.test(originalText);
                ScrollTrigger.create({
                    trigger: el,
                    start: "top 85%",
                    once: true,
                    onEnter: () => {
                        if (isNumber) {
                            const numericPart = originalText.replace(/[^0-9]/g, '');
                            const val = parseInt(numericPart, 10);
                            const suffix = originalText.replace(/[0-9]/g, '');
                            const proxy = { val: 0 };
                            gsap.to(proxy, {
                                val: val,
                                duration: 2,
                                ease: "power3.out",
                                onUpdate: () => {
                                    el.innerText = Math.floor(proxy.val).toString().padStart(2, '0') + suffix;
                                }
                            });
                        } else {
                            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                            const proxy = { val: 0 };
                            gsap.to(proxy, {
                                val: 1,
                                duration: 1,
                                ease: "none",
                                onUpdate: () => {
                                    const progress = proxy.val;
                                    const len = originalText.length;
                                    const revealNum = Math.floor(progress * len);
                                    const revealPart = originalText.substring(0, revealNum);
                                    let randomPart = "";
                                    if (revealNum < len) {
                                        for (let i = 0; i < len - revealNum; i++) {
                                            randomPart += chars[Math.floor(Math.random() * chars.length)];
                                        }
                                    }
                                    el.innerText = revealPart + randomPart;
                                },
                                onComplete: () => {
                                    el.innerText = originalText;
                                }
                            });
                        }
                    }
                });
            });
        }, sectionRef);
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);
        return () => {
            ctx.revert();
            clearTimeout(timer);
        };
    }, []);

    const stats = [
        { label: "EXP_YRS", value: "02+", desc: "Years Experience" },
        { label: "PRJ_CMP", value: "10+", desc: "Projects Completed" },
        { label: "CLOUD", value: "GCP", desc: "Native Solutions" },
        { label: "AVAIL", value: "OPEN", desc: "For New Opportunities", active: true },
    ];

    return (
        <section
            ref={sectionRef}
            id="about"
            onMouseMove={!isTouch ? handleMouseMove : undefined}
            onMouseLeave={!isTouch ? handleMouseLeave : undefined}
            className="relative font-sans py-24 md:py-32 overflow-hidden cursor-crosshair min-h-75vh flex flex-col justify-center"
        >
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 flex justify-between px-6 md:px-12 max-w-[1800px] mx-auto w-full h-full">
                    {[...Array(6)].map((_, i) => (
                        <div key={`v-${i}`} className="relative h-full">
                            <div className="grid-line w-px h-full bg-black/5 dark:bg-white/10"></div>
                            {[...Array(5)].map((_, j) => (
                                <div key={`ch-${i}-${j}`} className="grid-crosshair absolute -left-[3px] w-[7px] h-[7px] border-l border-t border-black/20 dark:border-white/20" style={{ top: `${(j + 1) * 20}%` }}></div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="absolute inset-0 flex flex-col justify-between py-24 h-full">
                    {[...Array(5)].map((_, i) => (
                        <div key={`h-${i}`} className="grid-line h-px w-full bg-black/5 dark:bg-white/5"></div>
                    ))}
                </div>
            </div>

            {!isTouch && <div ref={stackContainerRef} className="absolute inset-0 z-[50] pointer-events-none" />}

            <div ref={contentRef} className="relative z-10 max-w-[1800px] mx-auto w-full px-6 md:px-12">

                <div className="mb-16 md:mb-24 relative">
                    <div className="flex items-center gap-4 mb-4">
                        <FiCornerDownRight className="text-red-500 w-6 h-6" />
                        <span className="font-mono text-xs uppercase tracking-widest text-red-500">Identity // Bio</span>
                    </div>
                    <h2 ref={titleRef} className="text-[25vw] md:text-[10vw] leading-[0.8] font-bold uppercase tracking-tighter text-transparent text-stroke-responsive opacity-60 select-none pointer-events-none break-words">
                        <ScrollRevealText text="WHO_" />
                    </h2>
                    <div className="about-content-item relative md:absolute md:top-1/2 left-0 md:left-1/4 mt-12 md:mt-0 ml-0 md:ml-20 transform md:-translate-y-1/2 w-full md:w-2/3 pl-6 border-l-2 border-red-500">
                        <p className="text-lg md:text-2xl font-light leading-relaxed text-black dark:text-white mix-blend-difference">
                            I architect <span className="font-bold">high-performance backend ecosystems</span> using <span className="font-bold text-red-500">Java</span> and <span className="font-bold text-red-500">Spring Boot</span>. My expertise lies in leveraging <span className="font-bold">Temporal</span>, <span className="font-bold">Kafka</span>, and <span className="font-bold">AI integrations</span> to engineer fault-tolerant distributed systems and build intelligent, autonomous pipelines for complex data extraction and analysis.
                        </p>
                        <p className="text-lg md:text-2xl font-light leading-relaxed text-black dark:text-white mix-blend-difference mt-6">
                            Beyond key-strokes, I leverage <span className="font-bold">DevOps</span> principles to bridge development and operations. I utilize <span className="font-bold">CI/CD</span>, <span className="font-bold">Terraform</span>, and <span className="font-bold">GCP</span> alongside <span className="font-bold">GKE</span> to orchestrate resilient resilient, zero-downtime infrastructure, ensuring seamless, automated delivery for scalable microservices.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-black/10 dark:border-white/10">
                    {stats.map((stat, index) => (
                        <div key={index} className="about-content-item border-r border-b border-black/10 dark:border-white/10 p-6 md:p-8 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300 group">
                            <div className="flex justify-between items-start mb-4">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-red-500 transition-colors">{stat.label}</span>
                                {stat.active && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>}
                            </div>
                            <div className="stat-value text-4xl md:text-5xl font-mono font-light mb-2 text-black dark:text-white" data-value={stat.value}>{stat.value}</div>
                            <div className="text-xs font-mono uppercase text-gray-400">{stat.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                 .text-stroke-responsive {
                    -webkit-text-stroke: 1px black;
                 }
                 .dark .text-stroke-responsive {
                    -webkit-text-stroke: 1px white;
                 }
            `}</style>
        </section>
    );
};

export default AwardWinningAbout;
