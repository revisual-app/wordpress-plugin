/**
 * Client-side pagination. The whole collection arrives in one fetch, so this
 * only slices what is already in the store.
 */

import React from "react";
import { ChevronLeft, ChevronRight } from "../../../../icons";

const Pagination = ({ page, pageCount, onChange }) => {
	const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

	return (
		<nav className={"rev--pagination"} aria-label={"Calendars pages"}>
			<span className={"rev--pagination-status"}>
				Page {page} of {pageCount}
			</span>

			<div className={"rev--pagination-pages"}>
				{pages.map((n) => (
					<button
						key={n}
						type={"button"}
						className={`rev--page-btn${n === page ? " is-active" : ""}`}
						aria-current={n === page ? "page" : undefined}
						onClick={() => onChange(n)}
					>
						{n}
					</button>
				))}
			</div>

			<div className={"rev--pagination-steps"}>
				<button
					type={"button"}
					className={"rev--btn rev--btn_secondary rev--btn_sm"}
					disabled={page === 1}
					onClick={() => onChange(page - 1)}
				>
					<ChevronLeft size={16} />
					Previous
				</button>
				<button
					type={"button"}
					className={"rev--btn rev--btn_secondary rev--btn_sm"}
					disabled={page === pageCount}
					onClick={() => onChange(page + 1)}
				>
					Next
					<ChevronRight size={16} />
				</button>
			</div>
		</nav>
	);
};

export default Pagination;
