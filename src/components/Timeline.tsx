import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight } from 'react-icons/fi';
import ScrollRevealText from './ScrollRevealText';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
    {
        year: '2022',
        title: 'Applied Analytics',
        description: 'Began with data-heavy problem-solving. Deployed machine learning regression models to analyze pharmaceutical datasets, establishing a foundation in Python and optimization.',
        tags: ['Python', 'Machine Learning', 'Data Processing']
    },
    {
        year: '2023',
        title: 'Operations & Observability',
        description: 'Transitioned to enterprise software. Focused on system reliability by engineering real-time PromQL dashboards, building chaos testing workflows, and optimizing Kubernetes CI/CD pipelines.',
        tags: ['Kubernetes', 'CI/CD', 'Grafana']
    },
    {
        year: '2024',
        title: 'High-Concurrency Systems',
        description: 'Scaled up backend expertise. Designed distributed ID generation services utilizing MongoDB and Redis to successfully handle 100k+ RPM with 99.99% idempotency.',
        tags: ['Spring Boot', 'Redis', 'MongoDB']
    },
    {
        year: '2025',
        title: 'Event-Driven Orchestration',
        description: 'Mastered fault-tolerant architectures. Integrated Temporal.io and Kafka to build highly concurrent, asynchronous bank settlement systems with massive reductions in transaction latency.',
        tags: ['Temporal.io', 'Kafka', 'Java']
    },
    {
        year: '2025',
        title: 'Cloud-Native Infrastructure',
        description: 'Took ownership of complex cloud environments. Automated zero-downtime deployments for 20+ microservices on GCP using Terraform, Helm, and Istio service mesh mTLS.',
        tags: ['GCP', 'Terraform', 'Istio', 'Docker']
    },
    {
        year: '2026',
        title: 'Autonomous AI Platforms',
        description: 'Currently architecting intelligent, asynchronous ecosystems. Orchestrating LLMs and Google Pub/Sub to create event-driven communication analyzers and automated financial data extraction pipelines.',
        tags: ['AI Pipelines', 'LLMs', 'Event-Driven'   ]
    },
];

const Timeline: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray('.timeline-item');

            items.forEach((item: any) => {
                const content = item.querySelector('.timeline-content');
                const title = item.querySelector('.timeline-title');
                const year = item.querySelector('.timeline-year-text');
                const line = item.querySelector('.timeline-progress-line');

                // Initial State
                gsap.set(content, { height: 0, autoAlpha: 0 });
                if (title) gsap.set(title, { opacity: 1, x: 0 });
                gsap.set(year, { opacity: 1, color: 'inherit' });
                gsap.set(line, { height: '0%', opacity: 0 });

                // Hover Logic
                item.addEventListener('mouseenter', () => expandItem(item));
                item.addEventListener('mouseleave', () => collapseItem(item));
            });

            function expandItem(item: HTMLElement) {
                const content = item.querySelector('.timeline-content');
                const arrow = item.querySelector('.timeline-arrow');
                const title = item.querySelector('.timeline-title');
                const year = item.querySelector('.timeline-year-text');
                const line = item.querySelector('.timeline-progress-line');

                gsap.to(content, { height: "auto", autoAlpha: 1, duration: 0.4, ease: "power3.out" }); // Faster
                gsap.to(arrow, { rotation: 45, opacity: 1, duration: 0.3 });

                // Hollow Title Effect
                if (title) {
                    title.classList.add('text-stroke-responsive');
                    gsap.to(title, {
                        color: 'transparent',
                        opacity: 0.75,
                        x: 10,
                        scale: 1.05,
                        originLeft: 0,
                        duration: 0.3
                    });
                }

                gsap.to(year, { opacity: 0.8, scale: 1.5, color: "#ef4444", duration: 0.3 });
                gsap.to(line, { height: "100%", opacity: 1, duration: 0.4, ease: "power2.out" });

                gsap.to(item, {
                    backgroundColor: document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                    duration: 0.3
                });
            }

            function collapseItem(item: HTMLElement) {
                const content = item.querySelector('.timeline-content');
                const arrow = item.querySelector('.timeline-arrow');
                const title = item.querySelector('.timeline-title');
                const year = item.querySelector('.timeline-year-text');
                const line = item.querySelector('.timeline-progress-line');

                gsap.to(content, { height: 0, autoAlpha: 0, duration: 0.3, ease: "power3.in" });
                gsap.to(arrow, { rotation: 0, opacity: 0.3, duration: 0.3 });

                // Revert Title
                if (title) {
                    title.classList.remove('text-stroke-responsive');
                    gsap.to(title, {
                        color: 'inherit',
                        opacity: 0.8,
                        x: 0,
                        scale: 1,
                        duration: 0.3
                    });
                }

                gsap.to(year, { opacity: 0.8, scale: 1, color: "inherit", duration: 0.3 });
                gsap.to(line, { height: "0%", opacity: 0, duration: 0.3 });

                gsap.to(item, { backgroundColor: 'transparent', duration: 0.3 });
            }

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="timeline" className="bg-white dark:bg-black font-sans text-black dark:text-white py-24 md:py-32">
            {/* Header: Skills Style (Right Aligned) */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-0 border-b border-black dark:border-white/40 pb-12">
                <div className="flex flex-col items-end">
                    <h2 className="text-[18vw] md:text-[8vw] leading-[0.8] font-bold uppercase tracking-tighter text-transparent text-stroke-responsive opacity-60 select-none pointer-events-none">
                        <ScrollRevealText text="DIGITAL" />
                    </h2>
                    <div className="flex flex-col md:flex-row w-full justify-between items-end md:items-end gap-6">
                        {/* Description (Left Side now) */}
                        <p className="font-mono text-sm max-w-sm text-neutral-500 dark:text-neutral-400 text-left order-2 md:order-1 self-start md:self-end pb-2">
                             // SYSTEM_LOGS_V3.0<br />
                            COMMITS_&_MILESTONES
                        </p>

                        <span className="text-[15vw] md:text-[8vw] leading-[0.8] font-bold uppercase tracking-tighter text-black dark:text-white order-1 md:order-2">
                            <ScrollRevealText text="EVOLUTION_" />
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto">
                {milestones.map((item, index) => (
                    <div key={index} className="timeline-item border-b border-black/10 dark:border-white/10 group cursor-default transition-colors overflow-hidden relative">
                        <div className="py-4 md:py-8 px-4 md:px-12 flex flex-col md:flex-row items-start md:items-baseline gap-2 md:gap-8 relative z-10 w-full">

                            {/* Year Column / Eyebrow Label */}
                            {/* Mobile: Small Red Label above Title | Desktop: Static Left Column */}
                            <div className="w-full md:w-20 shrink-0 pt-1 relative md:h-full md:min-h-[2rem]">
                                <span className="timeline-year-text font-mono font-bold
                                    text-sm text-red-500 mb-1 block
                                    md:text-sm md:font-normal md:tracking-widest md:text-inherit md:text-stroke-0 md:opacity-60 md:mb-0
                                    transition-colors duration-300 origin-left">
                                    {item.year}
                                </span>
                                {/* Vertical Progress Line - Desktop Only */}
                                <div className="timeline-progress-line absolute left-0 top-0 w-[2px] bg-red-500 h-0 opacity-0 md:-left-6 hidden md:block"></div>
                            </div>

                            {/* Content Column */}
                            <div className="flex-grow w-full z-10 relative">
                                <div className="flex items-center justify-between w-full">
                                    <h3 className="timeline-title text-xl md:text-4xl font-bold uppercase tracking-tight leading-[0.9] md:leading-tight transition-all duration-300 origin-left mb-2 md:mb-0">
                                        {item.title}
                                    </h3>
                                    <FiArrowUpRight className="timeline-arrow w-5 h-5 shrink-0 transition-transform duration-300 opacity-30" />
                                </div>

                                {/* Expandable Content Area */}
                                <div className="timeline-content h-0 overflow-hidden opacity-0 will-change-[height,opacity]">
                                    <div className="pt-2 md:pt-6 max-w-2xl">
                                        <p className="font-sans text-sm md:text-lg opacity-100 leading-relaxed mb-4 font-light">
                                            {item.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 pb-2">
                                            {item.tags.map(t => (
                                                <span key={t} className="text-[10px] md:text-xs font-mono uppercase tracking-wider border border-black/20 dark:border-white/20 px-2 py-0.5 md:px-3 md:py-1 rounded-full opacity-60">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Timeline;
