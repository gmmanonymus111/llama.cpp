<script lang="ts">
	import { RotateCcw } from '@lucide/svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import { settingsStore } from '$lib/stores';
	import { i18nStore } from '$lib/i18n';

	interface Props {
		onReset?: () => void;
		onSave?: () => void;
	}

	let { onReset, onSave }: Props = $props();
	let showResetDialog = $state(false);
	let t = $derived.by(() => {
		void i18nStore.locale;
		return i18nStore.t.bind(i18nStore);
	});

	function handleResetClick() {
		showResetDialog = true;
	}

	function handleConfirmReset() {
		settingsStore.forceSyncWithServerDefaults();
		onReset?.();

		showResetDialog = false;
	}

	function handleSave() {
		onSave?.();
	}
</script>

<div class="sticky bottom-0 mx-auto mt-4 flex w-full justify-between pb-4 md:pb-0">
	<div class="flex gap-2">
		<Button onclick={handleResetClick} variant="outline">
			<RotateCcw class="h-3 w-3" />

			{t('settings.reset_to_default')}
		</Button>
	</div>

	<Button onclick={handleSave}>{t('settings.save_settings')}</Button>
</div>

<AlertDialog.Root bind:open={showResetDialog}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{t('settings.reset_settings_title')}</AlertDialog.Title>

			<AlertDialog.Description>
				{t('settings.reset_settings_description')}
			</AlertDialog.Description>
		</AlertDialog.Header>

		<AlertDialog.Footer>
			<AlertDialog.Cancel>{t('settings.cancel')}</AlertDialog.Cancel>

			<AlertDialog.Action onclick={handleConfirmReset}>{t('settings.reset')}</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
