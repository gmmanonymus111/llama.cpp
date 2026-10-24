<script lang="ts">
	import { ConversationSelection } from '$lib/components/app';
	import * as Dialog from '$lib/components/ui/dialog';
	import { i18nStore } from '$lib/i18n';

	interface Props {
		conversations: DatabaseConversation[];
		messageCountMap?: Map<string, number>;
		mode: 'export' | 'import';
		onCancel: () => void;
		onConfirm: (selectedConversations: DatabaseConversation[]) => void;
		open?: boolean;
	}

	let {
		conversations,
		messageCountMap = new Map(),
		mode,
		onCancel,
		onConfirm,
		open = $bindable(false)
	}: Props = $props();

	let { t } = $derived(i18nStore);

	let conversationSelectionRef: ConversationSelection | undefined = $state();

	let previousOpen = $state(false);

	$effect(() => {
		if (open && !previousOpen && conversationSelectionRef) {
			conversationSelectionRef.reset();
		} else if (!open && previousOpen) {
			onCancel();
		}

		previousOpen = open;
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Portal>
		<Dialog.Overlay class="z-1000000" />

		<Dialog.Content class="z-1000001 max-w-2xl">
			<Dialog.Header>
				<Dialog.Title>
					{mode === 'export'
						? t('dialogs.select_conversations_to_export')
						: t('dialogs.select_conversations_to_import')}
				</Dialog.Title>

				<Dialog.Description>
					{#if mode === 'export'}
						{t('dialogs.export_selection_description')}
					{:else}
						{t('dialogs.import_selection_description')}
					{/if}
				</Dialog.Description>
			</Dialog.Header>

			<ConversationSelection
				bind:this={conversationSelectionRef}
				{conversations}
				isOpen={open}
				{messageCountMap}
				{mode}
				{onCancel}
				{onConfirm}
			/>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
