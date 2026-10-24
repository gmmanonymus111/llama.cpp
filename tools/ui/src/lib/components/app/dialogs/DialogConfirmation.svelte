<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { KeyboardKey } from '$lib/enums';
	import { i18nStore } from '$lib/i18n';
	import type { Component, Snippet } from 'svelte';

	interface Props {
		open: boolean;
		title: string;
		description: string;
		confirmText?: string;
		cancelText?: string;
		variant?: 'default' | 'destructive';
		icon?: Component;
		onConfirm: () => void;
		onCancel: () => void;
		onKeydown?: (event: KeyboardEvent) => void;
		children?: Snippet;
	}

	let {
		cancelText,
		children,
		confirmText,
		description,
		icon,
		onCancel,
		onConfirm,
		onKeydown,
		open = $bindable(),
		title,
		variant = 'default'
	}: Props = $props();

	let t = $derived.by(() => {
    void i18nStore.locale;
    return i18nStore.t.bind(i18nStore);
});

	const resolvedCancelText = $derived(cancelText ?? t('dialogs.cancel'));
	const resolvedConfirmText = $derived(confirmText ?? t('dialogs.confirm'));

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === KeyboardKey.ENTER) {
			event.preventDefault();

			onConfirm();
		}

		onKeydown?.(event);
	}

	function handleOpenChange(newOpen: boolean) {
		if (!newOpen) {
			onCancel();
		}
	}
</script>

<AlertDialog.Root onOpenChange={handleOpenChange} {open}>
	<AlertDialog.Content onkeydown={handleKeydown}>
		<AlertDialog.Header>
			<AlertDialog.Title class="flex items-center gap-2">
				{#if icon}
					{@const IconComponent = icon}

					<IconComponent class="h-5 w-5 {variant === 'destructive' ? 'text-destructive' : ''}" />
				{/if}
				{title}
			</AlertDialog.Title>

			<AlertDialog.Description>
				{description}
			</AlertDialog.Description>
		</AlertDialog.Header>

		{#if children}
			{@render children()}
		{/if}

		<AlertDialog.Footer>
			<AlertDialog.Cancel onclick={onCancel}>{resolvedCancelText}</AlertDialog.Cancel>

							<AlertDialog.Action
								class={variant === 'destructive' ? 'bg-destructive text-white hover:bg-destructive/80' : ''}
								onclick={onConfirm}
							>
								{resolvedConfirmText}
							</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
