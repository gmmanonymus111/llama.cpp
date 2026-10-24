<script lang="ts">
	import { Video } from '@lucide/svelte';
	import { i18nStore } from '$lib/i18n';

	interface Props {
		currentItem: { name?: string } | null;
		videoSrc: string | null;
	}

	let { currentItem, videoSrc }: Props = $props();
	let t = $derived.by(() => {
		void i18nStore.locale;
		return i18nStore.t.bind(i18nStore);
	});
</script>

<div class="flex flex-1 items-center justify-center p-8">
	<div class="w-full max-w-md text-center">
		<Video class="mx-auto mb-4 h-16 w-16 text-white/50" />

		{#if videoSrc}
			<video class="mb-4 w-full" controls src={videoSrc}>
				<track kind="captions" src="" />
				Your browser does not support the video element.
			</video>
		{:else}
			<p class="mb-4 text-white/70">{t('chat.video_preview_unavailable')}</p>
		{/if}

		<p class="text-sm text-white/50">{currentItem?.name || 'Video'}</p>
	</div>
</div>
