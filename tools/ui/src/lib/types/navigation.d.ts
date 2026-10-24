import type { SidebarAction } from '$lib/enums';
import type { Component } from 'svelte';

/**
 * A single clickable action in the desktop sidebar icon strip.
 */
export interface DesktopIconStripItem {
	icon: Component;
	/** i18n key for the tooltip text */
	tooltipKey: string;
	route?: string;
	/** Custom action handled by the sidebar, e.g. opening a new-chat tab */
	action?: SidebarAction;
	activeRouteId?: string;
	activeRoutePrefix?: string;
	activeUrlIncludes?: string;
	keys?: string[];
}
