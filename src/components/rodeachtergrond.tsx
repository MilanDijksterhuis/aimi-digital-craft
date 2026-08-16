// src/components/RedDiagonalBackground.tsx
import { useEffect, useRef } from "react";

export function RedDiagonalBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        // Canvas en context ophalen met null checks
        const canvas = canvasRef.current;
        if (!canvas) {
            console.warn("Canvas not found");
            return;
        }

        const context = canvas.getContext("2d");
        if (!context) {
            console.warn("Canvas context not available");
            return;
        }

        // TypeScript weet nu dat canvas en context bestaan
        const ctx = context;
        const canvasElement = canvas;

        let w: number = window.innerWidth;
        let h: number = window.innerHeight;
        let t: number = 0;
        let animationId: number | null = null;

        const reducedMotion =
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        function resize(): void {
            w = window.innerWidth;
            h = window.innerHeight;
            canvasElement.width = w;
            canvasElement.height = h;
        }

        function drawFrame(): void {
            // ctx en canvasElement zijn beschikbaar in deze scope
            t += 0.008;

            // Donkere achtergrond
            ctx.fillStyle = "#1a1310";
            ctx.fillRect(0, 0, w, h);

            // Diagonalen tekenen
            for (let i = 0; i < 30; i++) {
                const offset = (i / 29) * 100;
                const alpha = 0.02 + Math.sin(t * 0.2 + i * 0.4) * 0.02 + 0.02;

                // Eerste diagonaal (linksboven naar rechtsonder)
                ctx.strokeStyle = `rgba(210, 50, 50, ${alpha})`;
                ctx.lineWidth = 1.5 + Math.sin(t * 0.3 + i * 0.5) * 0.5 + 0.5;

                const x1 = -50 + offset * 10 + Math.sin(t * 0.2 + i) * 20;
                const y1 = 0;
                const x2 = w + 50 + Math.sin(t * 0.3 + i * 0.7) * 20;
                const y2 = h;

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();

                // Tweede diagonaal (linksonder naar rechtsboven)
                const x3 = -50 + offset * 10 + Math.sin(t * 0.25 + i * 0.6) * 20;
                const y3 = h;
                const x4 = w + 50 + Math.sin(t * 0.35 + i * 0.8) * 20;
                const y4 = 0;

                ctx.strokeStyle = `rgba(210, 50, 50, ${alpha * 0.6})`;
                ctx.lineWidth = 1 + Math.sin(t * 0.4 + i * 0.3) * 0.5 + 0.5;
                ctx.beginPath();
                ctx.moveTo(x3, y3);
                ctx.lineTo(x4, y4);
                ctx.stroke();
            }

            // Volgende frame aanvragen, tenzij het tabblad verborgen is
            if (!document.hidden) {
                animationId = requestAnimationFrame(drawFrame);
            }
        }

        function stop(): void {
            if (animationId !== null) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        }

        function start(): void {
            if (animationId === null && !document.hidden) {
                animationId = requestAnimationFrame(drawFrame);
            }
        }

        // Initialiseren
        resize();
        if (reducedMotion) {
            // reduced motion: teken één statisch frame, geen doorlopende loop.
            drawFrame();
            stop();
        } else {
            start();
        }

        // Event listener voor resize
        const handleResize = (): void => {
            resize();
        };
        window.addEventListener("resize", handleResize);

        // Pauzeer de rAF-loop zodra het tabblad niet zichtbaar is (bespaart
        // CPU/batterij op de 5 belangrijkste landingspagina's).
        const handleVisibility = (): void => {
            if (reducedMotion) return;
            if (document.hidden) {
                stop();
            } else {
                start();
            }
        };
        document.addEventListener("visibilitychange", handleVisibility);

        // Cleanup functie
        return (): void => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("visibilitychange", handleVisibility);
            stop();
        };
    }, []); // Empty dependency array

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full"
            style={{
                display: "block",
                pointerEvents: "none",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 1,  // Verhoogd van -10 naar 1
                opacity: 1
            }}
        />
    );
}