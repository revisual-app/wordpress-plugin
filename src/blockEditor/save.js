/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 * @param {Object} attributes Attributes of the block.
 * @param {string} attributes.widgetType Type of widget.
 * @param {string} attributes.uuid Unique identifier of widget.
 * @param {string} attributes.template Template of widget.
 *
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	console.log("save props", attributes);

	return (
		<div {...useBlockProps.save()}>
			<div
				className={`dce-${attributes.widgetType}`}
				id={attributes.uuid}
				data-wt={attributes.template}
			></div>
		</div>
	);
}
