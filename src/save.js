import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		beforeImage,
		afterImage,
		beforeLabel,
		afterLabel,
		showLabels,
		beforeLabelPosition,
		afterLabelPosition,
		dividerColor,
		handleColor,
		arrowColor,
		handleSize,
		dividerWidth,
		heightDesktop,
		heightTablet,
		heightMobile,
		defaultPosition,
		imageFit,
		labelBgColor,
		labelTextColor,
		labelFontSize,
		labelPadding,
		labelBorderRadius,
		showArrow,
		borderRadius,
		shadow,
		animate,
	} = attributes;

	const style = {
		'--ba-divider-color': dividerColor,
		'--ba-handle-color': handleColor,
		'--ba-arrow-color': arrowColor,
		'--ba-handle-size': `${handleSize}px`,
		'--ba-divider-width': `${dividerWidth}px`,
		'--ba-height-desktop': heightDesktop,
		'--ba-height-tablet': heightTablet,
		'--ba-height-mobile': heightMobile,
		'--ba-label-bg': labelBgColor,
		'--ba-label-color': labelTextColor,
		'--ba-label-size': `${labelFontSize}px`,
		'--ba-label-padding': `${labelPadding}px`,
		'--ba-label-radius': `${labelBorderRadius}px`,
		'--ba-container-radius': `${borderRadius}px`,
		'--ba-img-fit': imageFit,
		'--ba-shadow': shadow ? '0 10px 30px rgba(0,0,0,0.2)' : 'none',
	};

	const blockProps = useBlockProps.save({
		className: `ba-compare ${animate ? 'ba-animate' : ''}`,
		style,
		'data-position': defaultPosition,
	});

	return (
		<div {...blockProps}>
			<div className="ba-image-container">
				{afterImage && (
					<div className="ba-image ba-after">
						<img
							src={afterImage.url}
							alt={afterImage.alt || afterLabel}
							loading="lazy"
							decoding="async"
						/>
						{showLabels && (
							<span className={`ba-label ba-label-${afterLabelPosition}`}>
								{afterLabel}
							</span>
						)}
					</div>
				)}
				{beforeImage && (
					<div
						className="ba-image ba-before"
						style={{ clipPath: `inset(0 ${100 - defaultPosition}% 0 0)` }}
					>
						<img
							src={beforeImage.url}
							alt={beforeImage.alt || beforeLabel}
							loading="lazy"
							decoding="async"
						/>
						{showLabels && (
							<span className={`ba-label ba-label-${beforeLabelPosition}`}>
								{beforeLabel}
							</span>
						)}
					</div>
				)}
			</div>

			<div
				className="ba-divider"
				style={{ left: `${defaultPosition}%` }}
			>
				<span className="ba-handle">
					{showArrow && (
						<svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" fill="currentColor" viewBox="0 0 256 256"><path d="M136,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0ZM96,120H35.31l18.35-18.34A8,8,0,0,0,42.34,90.34l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32L35.31,136H96a8,8,0,0,0,0-16Zm149.66,2.34-32-32a8,8,0,0,0-11.32,11.32L220.69,120H160a8,8,0,0,0,0,16h60.69l-18.35,18.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,245.66,122.34Z"></path></svg>
					)}
				</span>
			</div>
		</div>
	);
}
