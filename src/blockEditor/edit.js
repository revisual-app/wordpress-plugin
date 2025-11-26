/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./../scss/editor.scss";
import { useWidgetsStore } from "../hooks/useWidgets";
import { useEffect, useMemo } from "@wordpress/element";
import { useWPSettingsStore } from "../hooks/useWPSettings";
import AxiosConfig from "../AxiosConfig";
import WidgetPreview from "./WidgetPreview";
import { attachLoaderScript, hasWidgetSelected } from "../utils";
import SettingsPanel from "./SettingsPanel";
import CanvasPlaceholder from "./CanvasPlaceholder";
import NoWidgetsPlaceholder from "./NoWidgetsPlaceholder";
import SetupMissingPlaceholder from "./SetupMissingPlaceholder";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, isSelected, setAttributes }) {
  const blockProps = useBlockProps();
  const { widgets, fetchWidgets } = useWidgetsStore();
  const { wpSettings, fetchWpSettings } = useWPSettingsStore();

  const isWidgetSelected = hasWidgetSelected(attributes);

  const hasApiKey = wpSettings?.model?.apiKey ? true : false;
  const hasWidgets = widgets.collection.length ? true : false;

  useEffect(() => {
    fetchWpSettings();

    const dom =
      document.querySelector("iframe[name='editor-canvas']")?.contentWindow
        ?.document?.head ||
      document.querySelector(".editor-canvas__iframe")?.contentWindow?.document
        ?.head ||
      window.document.head;

    if (dom) {
      attachLoaderScript(dom);
    }
  }, []);

  useEffect(() => {
    if (!AxiosConfig.getApiKey() && wpSettings?.model?.apiKey) {
      AxiosConfig.setApiKey(wpSettings?.model?.apiKey);
      fetchWidgets();
    }
  }, [fetchWpSettings.fetchSuccess, wpSettings.model]);

  const widgetPreview = useMemo(
    () =>
      isWidgetSelected ? (
        <WidgetPreview
          widgetType={attributes.widgetType}
          uuid={attributes.uuid}
          key={`${attributes.widgetType}-${attributes.uuid}`}
          template={attributes.template}
          widgetSlug={attributes.widgetSlug}
        />
      ) : null,
    [attributes.uuid, isWidgetSelected],
  );

  const initialStep =
    hasApiKey && hasWidgets && !isWidgetSelected ? (
      <CanvasPlaceholder
        setAttributes={setAttributes}
        widgetType={attributes.widgetType}
      />
    ) : null;

  const noWidgetsCTA =
    hasApiKey && !hasWidgets && !isWidgetSelected ? (
      <NoWidgetsPlaceholder widgetType={attributes.widgetType} />
    ) : null;

  const setupStep = !hasApiKey ? <SetupMissingPlaceholder /> : null;
  return (
    <>
      <SettingsPanel
        setAttributes={setAttributes}
        hasWidgets={hasWidgets}
        isLoading={widgets.fetch}
        isRevisualSetupComplete={hasApiKey}
      />
      <div {...useBlockProps()}>
        {setupStep}
        {initialStep}
        {noWidgetsCTA}
        {widgetPreview}
      </div>
    </>
  );
}
