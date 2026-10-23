<script lang="ts">
	import { SearchInput } from '$lib/components/app';
	import { i18nStore } from '$lib/i18n';

	interface Props {
		value?: string;
		placeholder?: string;
		onInput?: (value: string) => void;
		class?: string;
	}

	let {
		class: className,
		onInput,
		placeholder,
		value = $bindable('')
	}: Props = $props();

	let { t } = $derived(i18nStore);

	let resolvedPlaceholder = $derived(placeholder ?? t('navigation.search_conversations'));
</script>

<div class="mb-4 px-2 {className}">
	<SearchInput bind:value {onInput} placeholder={resolvedPlaceholder} />
</div>
