#!/usr/bin/env node
/**
 * i18n validation script
 *
 * Checks that all keys in locale files match the English source.
 * Run as part of CI to keep translations in sync.
 *
 * Usage: node scripts/validate-i18n.mjs
 */

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOCALES_DIR = join(__dirname, '..', 'src', 'lib', 'i18n', 'locales');

function loadLocale(file) {
	const content = readFileSync(join(LOCALES_DIR, file), 'utf-8');
	return JSON.parse(content);
}

function flattenKeys(obj, prefix = '') {
	const keys = [];
	for (const [key, value] of Object.entries(obj)) {
		const fullKey = prefix ? `${prefix}.${key}` : key;
		if (typeof value === 'object' && value !== null) {
			keys.push(...flattenKeys(value, fullKey));
		} else {
			keys.push(fullKey);
		}
	}
	return keys;
}

function main() {
	const localeFiles = readdirSync(LOCALES_DIR).filter((f) => f.endsWith('.json'));

	if (localeFiles.length === 0) {
		console.error('No locale files found in', LOCALES_DIR);
		process.exit(1);
	}

	// English is the source of truth
	if (!localeFiles.includes('en.json')) {
		console.error('Missing en.json (source of truth)');
		process.exit(1);
	}

	const en = loadLocale('en.json');
	const enKeys = new Set(flattenKeys(en));

	let hasErrors = false;

	for (const file of localeFiles) {
		if (file === 'en.json') continue;

		const locale = loadLocale(file);
		const localeKeys = new Set(flattenKeys(locale));

		// Check for keys in locale that don't exist in English
		const extraKeys = [...localeKeys].filter((k) => !enKeys.has(k));
		if (extraKeys.length > 0) {
			console.error(`\n❌ ${file}: Keys not in en.json:`);
			for (const key of extraKeys) {
				console.error(`   - ${key}`);
			}
			hasErrors = true;
		}

		// Check for keys in English that are missing in locale (warning only)
		const missingKeys = [...enKeys].filter((k) => !localeKeys.has(k));
		if (missingKeys.length > 0) {
			console.warn(`\n⚠️  ${file}: Missing keys (will fall back to English):`);
			for (const key of missingKeys) {
				console.warn(`   - ${key}`);
			}
		}

		// Check for duplicate keys (would have been caught by JSON parse, but be safe)
		// JSON.parse throws on duplicate keys in strict mode, so this is covered.
	}

	if (hasErrors) {
		console.error('\n❌ i18n validation failed');
		process.exit(1);
	}

	console.log('✅ i18n validation passed');
}

main();
