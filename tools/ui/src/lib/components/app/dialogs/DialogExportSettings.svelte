<script lang="ts">
	import { Shield, ShieldOff } from '@lucide/svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import Label from '$lib/components/ui/label/label.svelte';
	import { i18nStore } from '$lib/i18n';

	let {
		includeSensitiveData = $bindable(false),
		onCancel,
		onConfirm,
		open = $bindable()
	}: {
		open: boolean;
		includeSensitiveData: boolean;
		onCancel: () => void;
		onConfirm: () => void;
	} = $props();

	let { t } = $derived(i18nStore);

	function handleOpenChange(newOpen: boolean) {
		if (!newOpen) {
			onCancel();
		}
	}
</script>

<AlertDialog.Root onOpenChange={handleOpenChange} {open}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title class="flex items-center gap-2">
								{#if includeSensitiveData}
									<ShieldOff class="h-5 w-5 text-destructive" />
								{:else}
									<Shield class="h-5 w-5 text-destructive" />
								{/if}
								{t('dialogs.export_settings')}
							</AlertDialog.Title>

			<AlertDialog.Description>
				{#if includeSensitiveData}
					<p class="text-amber-500">
						{t('dialogs.export_sensitive_warning')}
					</p>
				{:else}
					<p>
						{t('dialogs.export_no_sensitive')}
					</p>
				{/if}
			</AlertDialog.Description>
		</AlertDialog.Header>

		<div class="flex items-center gap-2 py-2">
			<Checkbox bind:checked={includeSensitiveData} id="include-sensitive" />

			<Label
				class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				for="include-sensitive"
			>
				{#if includeSensitiveData}
					<span class="text-destructive">{t('dialogs.include_sensitive_not_recommended')}</span>
				{:else}
					<span>{t('dialogs.include_sensitive')}</span>
				{/if}
			</Label>
		</div>

		<AlertDialog.Footer>
			<AlertDialog.Cancel onclick={onCancel}>{t('dialogs.cancel')}</AlertDialog.Cancel>

			<AlertDialog.Action
				class="bg-destructive text-white hover:bg-destructive/80"
				onclick={onConfirm}
			>
				{#if includeSensitiveData}
					{t('dialogs.export_anyway')}
				{:else}
					{t('dialogs.export_without_sensitive')}
				{/if}
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
