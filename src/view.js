/**
 * Frontend script for Before After Image Compare Block.
 */

const initBlock = (block) => {
	const beforeImage = block.querySelector('.ba-before');
	const divider = block.querySelector('.ba-divider');
	const container = block.querySelector('.ba-image-container');
	let isDragging = false;
	let position = parseFloat(block.dataset.position) || 50;

	// Update UI
	const updateUI = (pos) => {
		divider.style.left = `${pos}%`;
		beforeImage.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
		block.setAttribute('aria-valuenow', Math.round(pos));
	};

	// Performance-optimized update
	let rafId = null;
	const setPosition = (newPos) => {
		position = Math.max(0, Math.min(100, newPos));
		if (rafId) cancelAnimationFrame(rafId);
		rafId = requestAnimationFrame(() => {
			updateUI(position);
		});
	};

	const onMove = (e) => {
		if (!isDragging) return;
		const rect = container.getBoundingClientRect();
		const clientX = e.clientX || (e.pointerType === 'touch' ? e.pageX : e.clientX);
		const x = ((clientX - rect.left) / rect.width) * 100;
		setPosition(x);
	};

	const onStart = (e) => {
		isDragging = true;
		block.classList.add('is-dragging');
		onMove(e);
		// Prevent scrolling on touch
		if (e.pointerType === 'touch') {
			block.style.touchAction = 'none';
		}
	};

	const onEnd = () => {
		isDragging = false;
		block.classList.remove('is-dragging');
		block.style.touchAction = '';
	};

	// Pointer Events (Support Mouse, Touch, Pen)
	block.addEventListener('pointerdown', onStart);
	window.addEventListener('pointermove', onMove);
	window.addEventListener('pointerup', onEnd);
	window.addEventListener('pointercancel', onEnd);

	// Keyboard Support
	block.setAttribute('tabindex', '0');
	block.setAttribute('role', 'slider');
	block.setAttribute('aria-label', 'Image comparison slider');
	block.setAttribute('aria-valuemin', '0');
	block.setAttribute('aria-valuemax', '100');
	block.setAttribute('aria-valuenow', Math.round(position));

	block.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowLeft') {
			setPosition(position - 1);
		} else if (e.key === 'ArrowRight') {
			setPosition(position + 1);
		} else if (e.key === 'Home') {
			setPosition(0);
		} else if (e.key === 'End') {
			setPosition(100);
		}
	});

	// Lazy reveal if requested
	if (block.dataset.hover === 'true') {
		block.addEventListener('mouseenter', () => (isDragging = true));
		block.addEventListener('mouseleave', () => (isDragging = false));
	}
};

// Intersection Observer for performance
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				initBlock(entry.target);
				observer.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.1 }
);

document.addEventListener('DOMContentLoaded', () => {
	const blocks = document.querySelectorAll('.ba-compare');
	blocks.forEach((block) => observer.observe(block));
});
