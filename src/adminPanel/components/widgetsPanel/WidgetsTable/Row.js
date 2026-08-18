/**
 * One calendar row: name + status dot, template, inline shortcode, timestamp,
 * overflow menu. Copy is right next to the shortcode it copies.
 */

import React from "react";
import { useCallback, useEffect, useState } from "@wordpress/element";
import { toast } from "sonner";
import appConfig from "../../../../config/appConfig";
import {
	copyTextToClipboard,
	getShortCode,
	ucFirst,
} from "../../../../utils";
import { AvailableTemplates } from "../../../../consts";
import { Copy01, DotsHorizontal, Edit01, ArrowUpRight } from "../../../../icons";

const dateFormatter = new Intl.DateTimeFormat(window.navigator.language, {
	day: "numeric",
	month: "short",
	hour: "2-digit",
	minute: "2-digit",
});

/**
 * @param {object} row
 * @returns {{label: string, tone: string}} availability, spelled out
 */
const statusOf = (row) => {
	if (!row.integration) {
		return { label: "Not integrated", tone: "warning" };
	}
	if (row.available !== 1) {
		return { label: "Not published", tone: "error" };
	}
	return { label: "Published", tone: "success" };
};

const templateLabel = (row) =>
	(AvailableTemplates[row.widget_type] || []).find(
		(i) => i.template === row.template
	)?.label || row.template;

const Row = ({ row, onSelect }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const status = statusOf(row);
	const shortcode = getShortCode(row.widget_type, row.uuid, row.template);
	const appLink = `${appConfig.appUrl}/${row.widget_type}/${row.uuid}`;

	useEffect(() => {
		if (!menuOpen) {
			return undefined;
		}
		const onDocumentClick = (e) => {
			if (!e.target.closest(".rev--row-menu-wrap")) {
				setMenuOpen(false);
			}
		};
		const onKeyDown = (e) => e.key === "Escape" && setMenuOpen(false);
		document.addEventListener("click", onDocumentClick);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("click", onDocumentClick);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [menuOpen]);

	const onCopyShortcode = useCallback(
		(e) => {
			e.preventDefault();
			copyTextToClipboard(shortcode);
			toast("Shortcode copied to clipboard.");
		},
		[shortcode]
	);

	const onCopyShareableUrl = useCallback(() => {
		setMenuOpen(false);
		copyTextToClipboard(appLink);
		toast(`${ucFirst(row.widget_type)}'s link copied to clipboard.`);
	}, [appLink, row.widget_type]);

	// Picker mode (block editor): no shortcode cell, Insert instead of the menu.
	if (onSelect) {
		return (
			<tr>
				<td className={"rev--col-name"}>
					<span className={"rev--row-name"}>
						<i className={"rev--dot rev--dot_success"} aria-hidden={true} />
						<span className={"rev--row-name-text"} title={row.name}>
							{row.name}
						</span>
					</span>
				</td>
				<td className={"rev--col-template"}>{templateLabel(row)}</td>
				<td className={"rev--col-updated"}>
					{dateFormatter.format(new Date(row.modified * 1000))}
				</td>
				<td className={"rev--col-insert"}>
					<button
						type={"button"}
						className={"rev--btn rev--btn_secondary rev--btn_sm"}
						onClick={() => onSelect(row)}
					>
						Insert
					</button>
				</td>
			</tr>
		);
	}

	return (
		<tr>
			<td className={"rev--col-name"}>
				<span className={"rev--row-name"}>
					<i
						className={`rev--dot rev--dot_${status.tone}`}
						aria-hidden={true}
					/>
					<span className={"rev--row-name-text"} title={row.name}>
						{row.name}
					</span>
					<span className={"screen-reader-text"}>{status.label}</span>
				</span>
				{status.tone !== "success" ? (
					<span className={`rev--badge rev--badge_${status.tone}`}>
						{status.label}
					</span>
				) : null}
			</td>

			<td className={"rev--col-template"}>{templateLabel(row)}</td>

			<td className={"rev--col-shortcode"}>
				<span className={"rev--shortcode"}>
					<code className={"rev--shortcode-text"} title={shortcode}>
						{shortcode}
					</code>
					<button
						type={"button"}
						className={"rev--icon-btn rev--icon-btn_sm"}
						onClick={onCopyShortcode}
						aria-label={`Copy shortcode for ${row.name}`}
					>
						<Copy01 size={14} />
					</button>
				</span>
			</td>

			<td className={"rev--col-updated"}>
				{dateFormatter.format(new Date(row.modified * 1000))}
			</td>

			<td className={"rev--col-actions"}>
				<span className={"rev--row-menu-wrap"}>
					<button
						type={"button"}
						className={"rev--icon-btn"}
						aria-haspopup={"menu"}
						aria-expanded={menuOpen}
						onClick={() => setMenuOpen((v) => !v)}
						aria-label={`Actions for ${row.name}`}
					>
						<DotsHorizontal size={18} />
					</button>
					{menuOpen ? (
						<div className={"rev--menu rev--menu_end"} role={"menu"}>
							<a
								className={"rev--menu-item"}
								role={"menuitem"}
								href={appLink}
								target={`_edit-${row.uuid}`}
								onClick={() => setMenuOpen(false)}
							>
								<Edit01 size={16} />
								Edit in {appConfig.appName}
							</a>
							<button
								type={"button"}
								className={"rev--menu-item"}
								role={"menuitem"}
								onClick={onCopyShareableUrl}
							>
								<ArrowUpRight size={16} />
								Copy shareable URL
							</button>
						</div>
					) : null}
				</span>
			</td>
		</tr>
	);
};

export default Row;
