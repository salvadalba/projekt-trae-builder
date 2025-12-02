'use strict';

function initParticles() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    let canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const styles = getComputedStyle(document.documentElement);
    const baseAccent = styles.getPropertyValue('--color-primary-light').trim() || styles.getPropertyValue('--color-primary').trim();
    function withAlpha(color, alpha) {
        if (!color) return `rgba(72, 202, 228, ${alpha})`;
        if (color.startsWith('rgb(')) {
            return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
        }
        if (color.startsWith('hsl(')) {
            return color.replace('hsl(', 'hsla(').replace(')', `, ${alpha})`);
        }
        return color;
    }
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const density = Math.min(120, Math.floor((width * height) / 18000));
    const particles = new Array(density).fill(0).map(() => createParticle(width, height));
    let rafId;
    function createParticle(w, h) {
        const speed = Math.random() * 0.6 + 0.2;
        const angle = Math.random() * Math.PI * 2;
        return {
            x: Math.random() * w,
            y: Math.random() * h,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 2 + 1,
            alpha: Math.random() * 0.8 + 0.2,
            color: withAlpha(baseAccent, Math.random() * 0.5 + 0.2)
        };
    }
    function draw() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        }
        connectLines();
        rafId = requestAnimationFrame(draw);
    }
    function connectLines() {
        const maxDist = 120;
        ctx.strokeStyle = withAlpha(baseAccent, 0.12);
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < maxDist) {
                    ctx.globalAlpha = 1 - d / maxDist;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    draw();
}

document.addEventListener('DOMContentLoaded', initParticles);
