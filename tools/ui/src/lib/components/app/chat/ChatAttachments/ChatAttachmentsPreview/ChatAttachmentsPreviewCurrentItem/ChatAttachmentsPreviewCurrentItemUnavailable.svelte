<script lang="ts">
	import type { Component } from 'svelte';
	import { i18nStore } from '$lib/i18n';

	interface Props {
		IconComponent: Component;
	}

	let { IconComponent }: Props = $props();
	let t = $derived.by(() => {
		void i18nStore.locale;
		return i18nStore.t.bind(i18nStore);
	});
</script>

<div class="flex flex-1 items-center justify-center p-8">
	<div class="text-center">
		<IconComponent class="mx-auto mb-4 h-16 w-16 text-white/50" />

		<p class="text-white/70">{t('chat.preview_unavailable')}</p>
	</div>
</div>
