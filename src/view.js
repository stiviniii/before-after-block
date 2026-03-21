/**
 * Frontend script for Before After Image Compare Block.
 *
 * @package before-after-block
 */

const initBlock = ( block ) => {
	const beforeImage = block.querySelector( '.ba-before' );
	const divider = block.querySelector( '.ba-divider' );
	const container = block.querySelector( '.ba-image-container' );

	if ( ! beforeImage || ! divider || ! container ) {
		return;
	}

	// Remove title attributes from images to prevent hover tooltips
	// (often injected by SEO plugins or themes)
	block.querySelectorAll( 'img' ).forEach( ( img ) => img.removeAttribute( 'title' ) );


	let isDragging = false;
	let position = parseFloat( block.dataset.position ) || 50;
	let rafId = null;

	// Abort controller for clean listener management
	const controller = new AbortController();
	const { signal } = controller;

	/**
	 * Update divider and clip-path positions.
	 *
	 * @param {number} pos - Position percentage (0–100).
	 */
	const updateUI = ( pos ) => {
		divider.style.left = `${ pos }%`;
		beforeImage.style.clipPath = `inset(0 ${ 100 - pos }% 0 0)`;
		block.setAttribute( 'aria-valuenow', Math.round( pos ) );
	};

	/**
	 * Clamp and schedule a position update via rAF.
	 *
	 * @param {number} newPos - Desired position percentage.
	 */
	const setPosition = ( newPos ) => {
		position = Math.max( 0, Math.min( 100, newPos ) );
		if ( rafId ) {
			cancelAnimationFrame( rafId );
		}
		rafId = requestAnimationFrame( () => updateUI( position ) );
	};

	/**
	 * Handle pointer / touch move.
	 *
	 * @param {PointerEvent} e
	 */
	const onMove = ( e ) => {
		if ( ! isDragging ) {
			return;
		}
		const rect = container.getBoundingClientRect();
		const clientX = e.clientX ?? e.pageX;
		const x = ( ( clientX - rect.left ) / rect.width ) * 100;
		setPosition( x );
	};

	/**
	 * Handle pointer / touch start.
	 *
	 * @param {PointerEvent} e
	 */
	const onStart = ( e ) => {
		isDragging = true;
		block.classList.add( 'is-dragging' );
		block.setPointerCapture( e.pointerId );
		onMove( e );
	};

	/**
	 * Handle pointer / touch end.
	 */
	const onEnd = () => {
		isDragging = false;
		block.classList.remove( 'is-dragging' );
	};

	// Pointer events — using pointer capture instead of global window listeners.
	block.addEventListener( 'pointerdown', onStart, { signal } );
	block.addEventListener( 'pointermove', onMove, { signal } );
	block.addEventListener( 'pointerup', onEnd, { signal } );
	block.addEventListener( 'pointercancel', onEnd, { signal } );

	// Prevent image drag ghost
	block.addEventListener(
		'dragstart',
		( e ) => e.preventDefault(),
		{ signal }
	);

	// Keyboard accessibility
	block.setAttribute( 'tabindex', '0' );
	block.setAttribute( 'role', 'slider' );
	block.setAttribute( 'aria-label', 'Image comparison slider' );
	block.setAttribute( 'aria-valuemin', '0' );
	block.setAttribute( 'aria-valuemax', '100' );
	block.setAttribute( 'aria-valuenow', Math.round( position ) );

	block.addEventListener(
		'keydown',
		( e ) => {
			const step = e.shiftKey ? 10 : 1;
			switch ( e.key ) {
				case 'ArrowLeft':
					setPosition( position - step );
					e.preventDefault();
					break;
				case 'ArrowRight':
					setPosition( position + step );
					e.preventDefault();
					break;
				case 'Home':
					setPosition( 0 );
					e.preventDefault();
					break;
				case 'End':
					setPosition( 100 );
					e.preventDefault();
					break;
			}
		},
		{ signal }
	);

	// Store cleanup function for potential future use
	block._baCleanup = () => {
		controller.abort();
		if ( rafId ) {
			cancelAnimationFrame( rafId );
		}
	};
};

// Intersection Observer — lazy-initialise blocks only when they scroll into view.
const observer = new IntersectionObserver(
	( entries ) => {
		entries.forEach( ( entry ) => {
			if ( entry.isIntersecting ) {
				initBlock( entry.target );
				observer.unobserve( entry.target );
			}
		} );
	},
	{ threshold: 0.1 }
);

document.addEventListener( 'DOMContentLoaded', () => {
	const blocks = document.querySelectorAll( '.ba-compare' );
	blocks.forEach( ( block ) => observer.observe( block ) );
} );
