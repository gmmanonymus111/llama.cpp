<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { i18nStore } from '$lib/i18n';

	interface Props {
		onPrev: () => void;
		onNext: () => void;
		show: boolean;
	}

	let { onNext, onPrev, show }: Props = $props();

	let t = $derived.by(() => {
    void i18nStore.locale;
    return i18nStore.t.bind(i18nStore);
});
</script>

{#if show}
	<Button
		aria-label={t('chat.previous')}
		class="absolute top-1/2 left-4 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background/5 p-0 text-white!"
		onclick={onPrev}
		size="icon"
		variant="secondary"
	>
		<ChevronLeft class="size-4" />
	</Button>

	<Button
		aria-label={t('chat.next')}
		class="absolute top-1/2 right-4 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background/5 p-0 text-white!"
		onclick={onNext}
		size="icon"
		variant="secondary"
	>
		<ChevronRight class="size-4" />
	</Button>
{/if}
