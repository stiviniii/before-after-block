import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	ColorPalette,
	TextControl,
	SelectControl,
	Button,
	Placeholder,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import { useEffect, useRef, useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
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

	const containerRef = useRef();

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

	const blockProps = useBlockProps({
		className: `ba-compare ${animate ? 'ba-animate' : ''}`,
		style,
	});

	if (!beforeImage || !afterImage) {
		const icon = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M136,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0ZM96,120H35.31l18.35-18.34A8,8,0,0,0,42.34,90.34l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32L35.31,136H96a8,8,0,0,0,0-16Zm149.66,2.34-32-32a8,8,0,0,0-11.32,11.32L220.69,120H160a8,8,0,0,0,0,16h60.69l-18.35,18.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,245.66,122.34Z"></path></svg>;

		return (
			<div {...blockProps}>
				<Placeholder
					icon={icon}
					label={__('Before After Image Compare', 'before-after-block')}
					instructions={__('Select both images to start comparing.', 'before-after-block')}
				>
					<div className="ba-placeholder-grid">
						<div className={`ba-placeholder-item ${beforeImage ? 'has-image' : ''}`}>
							<div className="ba-placeholder-preview">
								{beforeImage ? (
									<img src={beforeImage.url} alt="" />
								) : (
									<div className="ba-placeholder-empty">
										<span className="dashicons dashicons-image-flip-horizontal"></span>
										<span>{__('Before Image', 'before-after-block')}</span>
									</div>
								)}
							</div>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => setAttributes({ beforeImage: { id: media.id, url: media.url, alt: media.alt } })}
									allowedTypes={['image']}
									value={beforeImage?.id}
									render={({ open }) => (
										<Button isSecondary onClick={open}>
											{beforeImage ? __('Change Before', 'before-after-block') : __('Select Before', 'before-after-block')}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						</div>

						<div className={`ba-placeholder-item ${afterImage ? 'has-image' : ''}`}>
							<div className="ba-placeholder-preview">
								{afterImage ? (
									<img src={afterImage.url} alt="" />
								) : (
									<div className="ba-placeholder-empty">
										<span className="dashicons dashicons-image-flip-horizontal"></span>
										<span>{__('After Image', 'before-after-block')}</span>
									</div>
								)}
							</div>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => setAttributes({ afterImage: { id: media.id, url: media.url, alt: media.alt } })}
									allowedTypes={['image']}
									value={afterImage?.id}
									render={({ open }) => (
										<Button isSecondary onClick={open}>
											{afterImage ? __('Change After', 'before-after-block') : __('Select After', 'before-after-block')}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						</div>
					</div>
				</Placeholder>
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Image Settings', 'before-after-block')}>
					<SelectControl
						label={__('Image Fit', 'before-after-block')}
						value={imageFit}
						options={[
							{ label: __('Cover', 'before-after-block'), value: 'cover' },
							{ label: __('Contain', 'before-after-block'), value: 'contain' },
						]}
						onChange={(val) => setAttributes({ imageFit: val })}
					/>
					<TextControl
						label={__('Desktop Height', 'before-after-block')}
						value={heightDesktop}
						onChange={(val) => setAttributes({ heightDesktop: val })}
					/>
					<TextControl
						label={__('Tablet Height', 'before-after-block')}
						value={heightTablet}
						onChange={(val) => setAttributes({ heightTablet: val })}
					/>
					<TextControl
						label={__('Mobile Height', 'before-after-block')}
						value={heightMobile}
						onChange={(val) => setAttributes({ heightMobile: val })}
					/>
				</PanelBody>

				<PanelBody title={__('Slider Settings', 'before-after-block')} initialOpen={false}>
					<RangeControl
						label={__('Default Position (%)', 'before-after-block')}
						value={defaultPosition}
						onChange={(val) => setAttributes({ defaultPosition: val })}
						min={0}
						max={100}
					/>
					<ToggleControl
						label={__('Smooth Animation', 'before-after-block')}
						checked={animate}
						onChange={(val) => setAttributes({ animate: val })}
					/>
				</PanelBody>

				<PanelBody title={__('Labels', 'before-after-block')} initialOpen={false}>
					<ToggleControl
						label={__('Show Labels', 'before-after-block')}
						checked={showLabels}
						onChange={(val) => setAttributes({ showLabels: val })}
					/>
					{showLabels && (
						<>
							<TextControl
								label={__('Before Label', 'before-after-block')}
								value={beforeLabel}
								onChange={(val) => setAttributes({ beforeLabel: val })}
							/>
							<TextControl
								label={__('After Label', 'before-after-block')}
								value={afterLabel}
								onChange={(val) => setAttributes({ afterLabel: val })}
							/>
							<SelectControl
								label={__('Before Label Position', 'before-after-block')}
								value={beforeLabelPosition}
								options={[
									{ label: __('Top Left', 'before-after-block'), value: 'top-left' },
									{ label: __('Top Right', 'before-after-block'), value: 'top-right' },
									{ label: __('Bottom Left', 'before-after-block'), value: 'bottom-left' },
									{ label: __('Bottom Right', 'before-after-block'), value: 'bottom-right' },
								]}
								onChange={(val) => setAttributes({ beforeLabelPosition: val })}
							/>
							<SelectControl
								label={__('After Label Position', 'before-after-block')}
								value={afterLabelPosition}
								options={[
									{ label: __('Top Left', 'before-after-block'), value: 'top-left' },
									{ label: __('Top Right', 'before-after-block'), value: 'top-right' },
									{ label: __('Bottom Left', 'before-after-block'), value: 'bottom-left' },
									{ label: __('Bottom Right', 'before-after-block'), value: 'bottom-right' },
								]}
								onChange={(val) => setAttributes({ afterLabelPosition: val })}
							/>
							<ColorPalette
								label={__('Label Background', 'before-after-block')}
								value={labelBgColor}
								onChange={(val) => setAttributes({ labelBgColor: val })}
							/>
							<ColorPalette
								label={__('Label Text Color', 'before-after-block')}
								value={labelTextColor}
								onChange={(val) => setAttributes({ labelTextColor: val })}
							/>
							<RangeControl
								label={__('Font Size', 'before-after-block')}
								value={labelFontSize}
								onChange={(val) => setAttributes({ labelFontSize: val })}
								min={10}
								max={30}
							/>
							<RangeControl
								label={__('Padding', 'before-after-block')}
								value={labelPadding}
								onChange={(val) => setAttributes({ labelPadding: val })}
								min={0}
								max={40}
							/>
							<RangeControl
								label={__('Border Radius', 'before-after-block')}
								value={labelBorderRadius}
								onChange={(val) => setAttributes({ labelBorderRadius: val })}
								min={0}
								max={50}
							/>
						</>
					)}
				</PanelBody>

				<PanelBody title={__('Divider & Handle', 'before-after-block')} initialOpen={false}>
					<ColorPalette
						label={__('Divider Color', 'before-after-block')}
						value={dividerColor}
						onChange={(val) => setAttributes({ dividerColor: val })}
					/>
					<RangeControl
						label={__('Divider Width', 'before-after-block')}
						value={dividerWidth}
						onChange={(val) => setAttributes({ dividerWidth: val })}
						min={1}
						max={10}
					/>
					<ColorPalette
						label={__('Handle Color', 'before-after-block')}
						value={handleColor}
						onChange={(val) => setAttributes({ handleColor: val })}
					/>
					<ColorPalette
						label={__('Arrow Color', 'before-after-block')}
						value={arrowColor}
						onChange={(val) => setAttributes({ arrowColor: val })}
					/>
					<RangeControl
						label={__('Handle Size', 'before-after-block')}
						value={handleSize}
						onChange={(val) => setAttributes({ handleSize: val })}
						min={20}
						max={80}
					/>
					<ToggleControl
						label={__('Show Arrows', 'before-after-block')}
						checked={showArrow}
						onChange={(val) => setAttributes({ showArrow: val })}
					/>
				</PanelBody>

				<PanelBody title={__('Block Style', 'before-after-block')} initialOpen={false}>
					<RangeControl
						label={__('Border Radius', 'before-after-block')}
						value={borderRadius}
						onChange={(val) => setAttributes({ borderRadius: val })}
						min={0}
						max={100}
					/>
					<ToggleControl
						label={__('Shadow', 'before-after-block')}
						checked={shadow}
						onChange={(val) => setAttributes({ shadow: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<ToolbarGroup>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ beforeImage: { id: media.id, url: media.url, alt: media.alt } })}
							allowedTypes={['image']}
							value={beforeImage?.id}
							render={({ open }) => (
								<ToolbarButton icon="image-flip-horizontal" label={__('Edit Before Image', 'before-after-block')} onClick={open} />
							)}
						/>
						<MediaUpload
							onSelect={(media) => setAttributes({ afterImage: { id: media.id, url: media.url, alt: media.alt } })}
							allowedTypes={['image']}
							value={afterImage?.id}
							render={({ open }) => (
								<ToolbarButton icon="image-flip-vertical" label={__('Edit After Image', 'before-after-block')} onClick={open} />
							)}
						/>
					</MediaUploadCheck>
				</ToolbarGroup>
			</BlockControls>

			<div {...blockProps} ref={containerRef}>
				<div className="ba-image-container">
					<div className="ba-image ba-after">
						<img src={afterImage.url} alt={afterImage.alt} />
						{showLabels && (
							<span className={`ba-label ba-label-${afterLabelPosition}`}>
								{afterLabel}
							</span>
						)}
					</div>
					<div
						className="ba-image ba-before"
						style={{ clipPath: `inset(0 ${100 - defaultPosition}% 0 0)` }}
					>
						<img src={beforeImage.url} alt={beforeImage.alt} />
						{showLabels && (
							<span className={`ba-label ba-label-${beforeLabelPosition}`}>
								{beforeLabel}
							</span>
						)}
					</div>
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
		</>
	);
}
