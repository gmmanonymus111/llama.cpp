<script lang="ts">
	import { ArrowRight, Copy, Edit, GitBranch, RefreshCw, Trash2 } from '@lucide/svelte';
	import {
		ActionIcon,
		ChatMessageActionIconsBranchingControls,
		DialogConfirmation
	} from '$lib/components/app';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Switch } from '$lib/components/ui/switch';
	import { getChatMessageActionsContext, getChatMessageEditContext } from '$lib/contexts';
	import { MessageRole } from '$lib/enums';
	import { i18nStore } from '$lib/i18n';
	import { conversationsStore } from '$lib/stores';

	interface Props {
		role: MessageRole.USER | MessageRole.ASSISTANT;
		justify: 'start' | 'end';
		actionsPosition: 'left' | 'right';
		onRegenerate?: () => void;
		onContinue?: () => void;
		showRawOutputSwitch?: boolean;
		rawOutputEnabled?: boolean;
		onRawOutputToggle?: (enabled: boolean) => void;
	}

	let {
		actionsPosition,
		justify,
		onContinue,
		onRawOutputToggle,
		onRegenerate,
		rawOutputEnabled = false,
		role,
		showRawOutputSwitch = false
	}: Props = $props();

	const messageActions = getChatMessageActionsContext();
	const editCtx = getChatMessageEditContext();

	let t = $derived.by(() => {
    void i18nStore.locale;
    return i18nStore.t.bind(i18nStore);
});

	let showForkDialog = $state(false);
	let forkName = $state('');
	let forkIncludeAttachments = $state(true);

	function handleConfirmDelete() {
		messageActions.confirmDelete();
		messageActions.setShowDeleteDialog(false);
	}

	function handleOpenForkDialog() {
		const conv = conversationsStore.activeConversation;

		forkName = `Fork of ${conv?.name ?? 'Conversation'}`;
		forkIncludeAttachments = true;
		showForkDialog = true;
	}

	function handleConfirmFork() {
		messageActions.forkConversation?.({
			includeAttachments: forkIncludeAttachments,
			name: forkName.trim()
		});
		showForkDialog = false;
	}
</script>

<div class="relative {justify === 'start' ? 'mt-2' : ''} flex h-6 items-center justify-between">
	<div
		class="{actionsPosition === 'left'
			? 'left-0'
			: 'right-0'} flex items-center gap-2 opacity-100 transition-opacity"
	>
		{#if messageActions.siblingInfo && messageActions.siblingInfo.totalSiblings > 1}
			<ChatMessageActionIconsBranchingControls />
		{/if}

		<div
			class="pointer-events-auto inset-0 flex items-center gap-1 opacity-100 transition-all duration-150"
		>
			<ActionIcon icon={Copy} onclick={messageActions.copy} tooltip={t('chat.copy_tooltip')} />

			<ActionIcon icon={Edit} onclick={editCtx.startEdit} tooltip={t('chat.edit_tooltip')} />

			{#if role === MessageRole.ASSISTANT && onRegenerate}
				<ActionIcon icon={RefreshCw} onclick={() => onRegenerate()} tooltip={t('chat.regenerate_tooltip')} />
			{/if}

			{#if role === MessageRole.ASSISTANT && onContinue}
				<ActionIcon icon={ArrowRight} onclick={onContinue} tooltip={t('chat.continue_tooltip')} />
			{/if}

			{#if messageActions.forkConversation}
				<ActionIcon icon={GitBranch} onclick={handleOpenForkDialog} tooltip={t('chat.fork_conversation_tooltip')} />
			{/if}

			<ActionIcon icon={Trash2} onclick={messageActions.requestDelete} tooltip={t('chat.delete_tooltip')} />
		</div>
	</div>

	{#if showRawOutputSwitch}
		<div class="flex items-center gap-2">
			<span class="text-xs text-muted-foreground">{t('chat.show_raw_output')}</span>

			<Switch
				checked={rawOutputEnabled}
				onCheckedChange={(checked) => onRawOutputToggle?.(checked)}
			/>
		</div>
	{/if}
</div>

<DialogConfirmation
	cancelText={t('common.cancel')}
	confirmText={messageActions.deletionInfo && messageActions.deletionInfo.totalCount > 1
		? t('chat.delete_count_messages', { count: String(messageActions.deletionInfo.totalCount) })
		: t('chat.delete')}
	description={messageActions.deletionInfo && messageActions.deletionInfo.totalCount > 1
		? t('chat.delete_multiple_description', {
			count: String(messageActions.deletionInfo.totalCount),
			user: String(messageActions.deletionInfo.userMessages),
			users: messageActions.deletionInfo.userMessages > 1 ? 's' : '',
			assistant: String(messageActions.deletionInfo.assistantMessages),
			assistants: messageActions.deletionInfo.assistantMessages > 1 ? 's' : ''
		})
		: t('chat.delete_single_description')}
	icon={Trash2}
	onCancel={() => messageActions.setShowDeleteDialog(false)}
	onConfirm={handleConfirmDelete}
	open={messageActions.showDeleteDialog}
	title={t('chat.delete_message_title')}
	variant="destructive"
/>

<DialogConfirmation
	bind:open={showForkDialog}
	cancelText={t('common.cancel')}
	confirmText={t('chat.fork')}
	description={t('chat.fork_description')}
	icon={GitBranch}
	onCancel={() => (showForkDialog = false)}
	onConfirm={handleConfirmFork}
	title={t('chat.fork_conversation_title')}
>
	<div class="flex flex-col gap-4 py-2">
		<div class="flex flex-col gap-2">
			<Label for="fork-name">{t('chat.title')}</Label>

			<Input
				bind:value={forkName}
				class="text-foreground"
				id="fork-name"
				placeholder={t('chat.enter_fork_name')}
				type="text"
			/>
		</div>

		<div class="flex items-center gap-2">
			<Checkbox
				checked={forkIncludeAttachments}
				id="fork-attachments"
				onCheckedChange={(checked) => {
					forkIncludeAttachments = checked === true;
				}}
			/>

			<Label class="cursor-pointer text-sm font-normal" for="fork-attachments">
				{t('chat.include_all_attachments')}
			</Label>
		</div>
	</div>
</DialogConfirmation>
