/**
 * i18nStore - Internationalization store for the llama.cpp WebUI
 *
 * Provides reactive translation function `t()` that resolves keys from
 * locale JSON files. Supports nested keys, named interpolation, and
 * fallback to English for missing translations.
 *
 * Usage:
 *   import { i18nStore } from '$lib/i18n';
 *   let t = $derived.by(() => {
    void i18nStore.locale;
    return i18nStore.t.bind(i18nStore);
});
 *   {t('settings.title')}
 *   {t('model.loaded', { name: 'llama-3' })}
 */

import { browser } from '$app/environment';
import en from './locales/en.json';
import hu from './locales/hu.json';

const LOCALES: Record<string, Record<string, unknown>> = { en, hu };

export type Locale = 'en' | 'hu';

function resolveKey(
	obj: Record<string, unknown>,
	key: string
): string | undefined {
	const parts = key.split('.');
	let current: unknown = obj;

	for (const part of parts) {
		if (current === null || current === undefined || typeof current !== 'object') {
			return undefined;
		}
		current = (current as Record<string, unknown>)[part];
	}

	return typeof current === 'string' ? current : undefined;
}

function interpolate(template: string, params?: Record<string, string>): string {
	if (!params) return template;

	return template.replace(/\{(\w+)\}/g, (match, key) => {
		return params[key] !== undefined ? params[key] : match;
	});
}

class I18nStore {
	locale = $state<Locale>('en');

	constructor() {
		this.t = this.t.bind(this);
		this.setLocale = this.setLocale.bind(this);
		this.applyLanguageSetting = this.applyLanguageSetting.bind(this);
		if (browser) {
			this.detectAndSetLocale();
		}
	}

	/**
	 * Translate a key, with optional interpolation params.
	 * Falls back to English if the key is missing in the current locale.
	 */
	t(key: string, params?: Record<string, string>): string {
		const current = resolveKey(LOCALES[this.locale], key);

		if (current !== undefined) {
			return interpolate(current, params);
		}

		// Fallback to English
		const english = resolveKey(LOCALES.en, key);

		if (english !== undefined) {
			if (browser && this.locale !== 'en') {
				console.warn(`[i18n] Missing key in ${this.locale}: ${key}`);
			}
			return interpolate(english, params);
		}

		// Key not found anywhere — return the key itself (visible in dev)
		if (browser) {
			console.warn(`[i18n] Unknown key: ${key}`);
		}
		return key;
	}

	/**
	 * Switch the active locale.
	 */
	setLocale(locale: Locale): void {
		if (LOCALES[locale]) {
			this.locale = locale;
		}
	}

	/**
	 * Apply a language setting value ('en' | 'hu' | 'auto').
	 * 'auto' resolves to the browser's language if supported, else English.
	 */
	applyLanguageSetting(setting: string): void {
		if (setting === 'auto') {
			this.detectAndSetLocale();
		} else if (LOCALES[setting]) {
			this.locale = setting as Locale;
		}
	}

	/**
	 * Detect locale from browser settings and apply.
	 * Called once on construction.
	 */
	private detectAndSetLocale(): void {
		const browserLang = navigator.language?.split('-')[0]?.toLowerCase() ?? 'en';

		if (LOCALES[browserLang]) {
			this.locale = browserLang as Locale;
		}
	}
}

export const i18nStore = new I18nStore();
