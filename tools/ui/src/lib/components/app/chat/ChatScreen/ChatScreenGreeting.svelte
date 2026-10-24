<script lang="ts">
	import { serverStore } from '$lib/stores';
	import { i18nStore } from '$lib/i18n';

	interface Props {
		isEmpty: boolean;
	}

	let { isEmpty = false }: Props = $props();
	let t = $derived.by(() => {
		void i18nStore.locale;
		return i18nStore.t.bind(i18nStore);
	});
</script>

<div
	class={[
		'pointer-events-none mb-4 hidden px-4 text-center text-balance',
		isEmpty && 'mb-[calc(50dvh-8rem)] md:mb-8 pointer-events-auto block!'
	]}
>
	<h1 class="mb-2 text-2xl font-semibold tracking-tight md:text-3xl">{t('chat.greeting_title')}</h1>

	<p class="text-muted-foreground md:text-lg">
		{serverStore.props?.modalities?.audio
			? t('chat.greeting_subtitle_audio')
			: t('chat.greeting_subtitle')}
	</p>
</div>
