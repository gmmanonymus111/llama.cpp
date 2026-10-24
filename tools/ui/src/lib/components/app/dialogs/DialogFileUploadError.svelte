<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { i18nStore } from '$lib/i18n';

	interface Props {
		open: boolean;
		fileErrorData: {
			generallyUnsupported: File[];
			modalityUnsupported: File[];
			modalityReasons: Record<string, string>;
			supportedTypes: string[];
		};
		onOpenChange?: (open: boolean) => void;
	}

	let { fileErrorData, onOpenChange, open = $bindable() }: Props = $props();

	let { t } = $derived(i18nStore);

	function handleOpenChange(newOpen: boolean) {
		open = newOpen;

		onOpenChange?.(newOpen);
	}
</script>

<AlertDialog.Root onOpenChange={handleOpenChange} {open}>
	<AlertDialog.Portal>
		<AlertDialog.Overlay />

		<AlertDialog.Content class="flex max-w-md flex-col">
			<AlertDialog.Header>
				<AlertDialog.Title>{t('dialogs.file_upload_error')}</AlertDialog.Title>

				<AlertDialog.Description class="text-sm text-muted-foreground">
					{t('dialogs.file_upload_error_description')}
				</AlertDialog.Description>
			</AlertDialog.Header>

			<div class="!max-h-[50vh] min-h-0 flex-1 space-y-4 overflow-y-auto">
				{#if fileErrorData.generallyUnsupported.length > 0}
					<div class="space-y-2">
						<h4 class="text-sm font-medium text-destructive">{t('dialogs.unsupported_file_types')}</h4>

						<div class="space-y-1">
							{#each fileErrorData.generallyUnsupported as file (file.name)}
								<div class="rounded-md bg-destructive/10 px-3 py-2">
									<p class="font-mono text-sm break-all text-destructive">
										{file.name}
									</p>

									<p class="mt-1 text-xs text-muted-foreground">{t('dialogs.file_type_not_supported')}</p>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				{#if fileErrorData.modalityUnsupported.length > 0}
					<div class="space-y-2">
						<div class="space-y-1">
							{#each fileErrorData.modalityUnsupported as file (file.name)}
								<div class="rounded-md bg-destructive/10 px-3 py-2">
									<p class="font-mono text-sm break-all text-destructive">
										{file.name}
									</p>

									<p class="mt-1 text-xs text-muted-foreground">
										{fileErrorData.modalityReasons[file.name] || t('dialogs.not_supported_by_current_model')}
									</p>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<div class="rounded-md bg-muted/50 p-3">
				<h4 class="mb-2 text-sm font-medium">{t('dialogs.model_supports')}</h4>

				<p class="text-sm text-muted-foreground">
					{fileErrorData.supportedTypes.join(', ')}
				</p>
			</div>

			<AlertDialog.Footer>
				<AlertDialog.Action onclick={() => handleOpenChange(false)}>{t('dialogs.got_it')}</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
