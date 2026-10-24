<script lang="ts">
	import { FileX } from '@lucide/svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { i18nStore } from '$lib/i18n';

	interface Props {
		open: boolean;
		emptyFiles: string[];
		onOpenChange?: (open: boolean) => void;
	}

	let { emptyFiles, onOpenChange, open = $bindable() }: Props = $props();

	let { t } = $derived(i18nStore);

	function handleOpenChange(newOpen: boolean) {
		open = newOpen;
		onOpenChange?.(newOpen);
	}
</script>

<AlertDialog.Root onOpenChange={handleOpenChange} {open}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title class="flex items-center gap-2">
				<FileX class="h-5 w-5 text-destructive" />

				{t('dialogs.empty_files_detected')}
			</AlertDialog.Title>

			<AlertDialog.Description>
				{t('dialogs.empty_files_description')}
			</AlertDialog.Description>
		</AlertDialog.Header>

		<div class="space-y-3 text-sm">
			<div class="rounded-lg bg-muted p-3">
				<div class="mb-2 font-medium">{t('dialogs.empty_files_label')}</div>

				<ul class="list-inside list-disc space-y-1 text-muted-foreground">
					{#each emptyFiles as fileName (fileName)}
						<li class="font-mono text-sm">{fileName}</li>
					{/each}
				</ul>
			</div>

			<div>
				<div class="mb-2 font-medium">{t('dialogs.what_happened')}</div>

				<ul class="list-inside list-disc space-y-1 text-muted-foreground">
					<li>{t('dialogs.empty_files_cannot_process')}</li>

					<li>{t('dialogs.empty_files_removed')}</li>

					<li>{t('dialogs.try_uploading_with_content')}</li>
				</ul>
			</div>
		</div>

		<AlertDialog.Footer>
			<AlertDialog.Action onclick={() => handleOpenChange(false)}>{t('dialogs.got_it')}</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
