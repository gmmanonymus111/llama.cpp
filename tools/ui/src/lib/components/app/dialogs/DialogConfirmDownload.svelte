<script lang="ts">
	import DialogConfirmation from '$lib/components/app/dialogs/DialogConfirmation.svelte';
	import { ModelDownloadConfirmAction } from '$lib/enums';
	import { i18nStore } from '$lib/i18n';
	import { modelsStore } from '$lib/stores';

	interface Props {
		/** Action being confirmed; drives the wording. */
		action: ModelDownloadConfirmAction;
		/** `<repo>:<tag>` the action targets. */
		repoWithTag: string;
		onClose: () => void;
		/** Overrides the default store removal; defaults to removing the entry. */
		onConfirm?: (repoWithTag: string) => void;
		open?: boolean;
	}

	let { action, onClose, onConfirm, open = true, repoWithTag }: Props = $props();

	let t = $derived.by(() => {
    void i18nStore.locale;
    return i18nStore.t.bind(i18nStore);
});

	// Both actions resolve through the same store removal (cancelDownload drops a
	// running download's partial files or a cached model's files); only the copy
	// differs. One component so the discover chips and the selector rows word the
	// destructive confirmations identically.
	const COPY = {
		[ModelDownloadConfirmAction.CANCEL]: {
			cancelText: () => t('dialogs.keep_downloading'),
			confirmText: () => t('dialogs.cancel_download'),
			description: (name: string) =>
				t('dialogs.cancel_download_description', { name }),
			title: () => t('dialogs.cancel_download_title')
		},
		[ModelDownloadConfirmAction.DELETE]: {
			cancelText: () => t('dialogs.keep_model'),
			confirmText: () => t('dialogs.delete'),
			description: (name: string) =>
				t('dialogs.delete_model_description', { name }),
			title: () => t('dialogs.delete_model_title')
		}
	} as const;

	let copy = $derived(COPY[action]);
	let displayName = $derived(modelsStore.toDisplayName(repoWithTag));

	function confirm() {
		if (onConfirm) onConfirm(repoWithTag);
		else void modelsStore.status.cancelDownload(repoWithTag);

		onClose();
	}
</script>

<DialogConfirmation
	cancelText={copy.cancelText()}
	confirmText={copy.confirmText()}
	description={copy.description(displayName)}
	onCancel={onClose}
	onConfirm={confirm}
	{open}
	title={copy.title()}
	variant="destructive"
/>
