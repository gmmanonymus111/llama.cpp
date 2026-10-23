import { DEFAULT_AGENTIC_CONFIG } from './agentic.constants';
import { CLI_FLAGS } from './cli-flags.constants';
import { DEFAULT_MCP_CONFIG } from './mcp.constants';
import { SETTINGS_KEYS } from './settings-keys.constants';
import { TITLE_GENERATION } from './title-generation.constants';
import { FILE_GLOB_SEARCH_PICKERS } from './working-directory.constants';
import {
	Code,
	Database,
	Funnel,
	ListRestart,
	Monitor,
	Moon,
	PencilRuler,
	SlidersVertical,
	Sun
} from '@lucide/svelte';
import { SyncableParameterType } from '$lib/enums';
import { SettingsFieldType } from '$lib/enums/settings.enums';
import { ColorMode } from '$lib/enums/ui.enums';
import type {
	SettingsConfigValue,
	SettingsEntry,
	SettingsFieldConfig,
	SettingsSection,
	SettingsSectionEntry
} from '$lib/types';

/** Settings sections — slug is the routing identity, title is the display label. */
export const SETTINGS_SECTIONS = {
	AGENTIC: { slug: 'agentic', title: 'settings.agentic' },
	DEVELOPER: { slug: 'developer', title: 'settings.developer' },
	DISPLAY: { slug: 'display', title: 'settings.display' },
	GENERAL: { slug: 'general', title: 'settings.general' },
	IMPORT_EXPORT: { slug: 'import-export', title: 'settings.import_export' },
	SAMPLING_PENALTIES: { slug: 'sampling-penalties', title: 'settings.sampling_penalties' },
	TOOLS: { slug: 'tools', title: 'settings.tools' }
} as const;

export const SETTINGS_SECTION_SLUGS = {
	AGENTIC: SETTINGS_SECTIONS.AGENTIC.slug,
	DEVELOPER: SETTINGS_SECTIONS.DEVELOPER.slug,
	DISPLAY: SETTINGS_SECTIONS.DISPLAY.slug,
	GENERAL: SETTINGS_SECTIONS.GENERAL.slug,
	IMPORT_EXPORT: SETTINGS_SECTIONS.IMPORT_EXPORT.slug,
	SAMPLING_PENALTIES: SETTINGS_SECTIONS.SAMPLING_PENALTIES.slug,
	TOOLS: SETTINGS_SECTIONS.TOOLS.slug
} as const;

export const SETTINGS_SECTION_TITLES = {
	AGENTIC: SETTINGS_SECTIONS.AGENTIC.title,
	DEVELOPER: SETTINGS_SECTIONS.DEVELOPER.title,
	DISPLAY: SETTINGS_SECTIONS.DISPLAY.title,
	GENERAL: SETTINGS_SECTIONS.GENERAL.title,
	IMPORT_EXPORT: SETTINGS_SECTIONS.IMPORT_EXPORT.title,
	SAMPLING_PENALTIES: SETTINGS_SECTIONS.SAMPLING_PENALTIES.title,
	TOOLS: SETTINGS_SECTIONS.TOOLS.title
} as const;

export const SETTINGS_REGISTRY: SettingsSectionEntry[] = [
	// General
	{
		icon: SlidersVertical,
		settings: [
			{
				defaultValue: ColorMode.SYSTEM,
				help: 'settings.theme_help',
				key: SETTINGS_KEYS.THEME,
				label: 'settings.theme',
				options: [
					{ icon: Monitor, label: 'System', value: ColorMode.SYSTEM },
					{ icon: Sun, label: 'Light', value: ColorMode.LIGHT },
					{ icon: Moon, label: 'Dark', value: ColorMode.DARK }
				],
				type: SettingsFieldType.SELECT
			},
			{
				defaultValue: 'auto',
				help: 'settings.language_help',
				key: SETTINGS_KEYS.LANGUAGE,
				label: 'settings.language',
				options: [
					{ label: 'settings.language_auto', value: 'auto' },
					{ label: 'settings.language_en', value: 'en' },
					{ label: 'settings.language_hu', value: 'hu' }
				],
				type: SettingsFieldType.SELECT
			},
			{
				defaultValue: '',
				help: 'settings.api_key_help',
				isPrivate: true,
				key: SETTINGS_KEYS.API_KEY,
				label: 'settings.api_key',
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: '',
				help: 'settings.system_message_help',
				key: SETTINGS_KEYS.SYSTEM_MESSAGE,
				label: 'settings.system_message',
				type: SettingsFieldType.TEXTAREA
			},
			{
				defaultValue: true,
				help: 'settings.show_system_message_help',
				key: SETTINGS_KEYS.SHOW_SYSTEM_MESSAGE,
				label: 'settings.show_system_message',
				standaloneField: false,
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: 2500,
				help: 'settings.paste_long_text_to_file_len_help',
				key: SETTINGS_KEYS.PASTE_LONG_TEXT_TO_FILE_LEN,
				label: 'settings.paste_long_text_to_file_len',
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: true,
				help: 'settings.send_on_enter_help',
				key: SETTINGS_KEYS.SEND_ON_ENTER,
				label: 'settings.send_on_enter',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: true,
				help: 'settings.auto_mic_on_empty_help',
				key: SETTINGS_KEYS.AUTO_MIC_ON_EMPTY,
				label: 'settings.auto_mic_on_empty',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				help: 'settings.enable_continue_generation_help',
				isExperimental: true,
				key: SETTINGS_KEYS.ENABLE_CONTINUE_GENERATION,
				label: 'settings.enable_continue_generation',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				help: 'settings.enable_discover_models_help',
				key: SETTINGS_KEYS.ENABLE_DISCOVER_MODELS,
				label: 'settings.enable_discover_models',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				help: 'settings.use_hugging_face_hub_help',
				key: SETTINGS_KEYS.USE_HUGGING_FACE_HUB,
				label: 'settings.use_hugging_face_hub',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: true,
				help: 'settings.conversation_title_help',
				key: SETTINGS_KEYS.TITLE_GENERATION_USE_FIRST_LINE,
				label: 'settings.conversation_title',
				radioOptions: [
					{
						key: SETTINGS_KEYS.TITLE_GENERATION_USE_FIRST_LINE,
						label: 'settings.title_first_line',
						value: 'firstLine'
					},
					{
						isExperimental: true,
						key: SETTINGS_KEYS.TITLE_GENERATION_USE_LLM,
						label: 'settings.title_llm',
						value: 'llm'
					}
				],
				type: SettingsFieldType.RADIO
			},
			{
				defaultValue: TITLE_GENERATION.DEFAULT_PROMPT,
				dependsOn: SETTINGS_KEYS.TITLE_GENERATION_USE_LLM,
				help: 'settings.title_generation_prompt_help',
				key: SETTINGS_KEYS.TITLE_GENERATION_PROMPT,
				label: 'settings.title_generation_prompt',
				type: SettingsFieldType.TEXTAREA
			},
			{
				defaultValue: false,
				help: 'Counterpart of the conversation title radio; stored and synced without a dedicated UI field.',
				key: SETTINGS_KEYS.TITLE_GENERATION_USE_LLM,
				label: 'settings.title_llm',
				standaloneField: false,
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				help: 'settings.copy_text_attachments_as_plain_text_help',
				key: SETTINGS_KEYS.COPY_TEXT_ATTACHMENTS_AS_PLAIN_TEXT,
				label: 'settings.copy_text_attachments_as_plain_text',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				help: 'settings.pdf_as_image_help',
				key: SETTINGS_KEYS.PDF_AS_IMAGE,
				label: 'settings.pdf_as_image',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: 0,
				help: 'settings.max_image_resolution_help',
				key: SETTINGS_KEYS.MAX_IMAGE_RESOLUTION,
				label: 'settings.max_image_resolution',
				type: SettingsFieldType.INPUT
			}
		],
		slug: SETTINGS_SECTION_SLUGS.GENERAL,
		title: SETTINGS_SECTION_TITLES.GENERAL
	},
	// Display
	{
		icon: Monitor,
		settings: [
			{
				defaultValue: true,
				help: 'settings.show_message_stats_help',
				key: SETTINGS_KEYS.SHOW_MESSAGE_STATS,
				label: 'settings.show_message_stats',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				dependsOn: SETTINGS_KEYS.SHOW_MESSAGE_STATS,
				help: 'settings.show_agentic_turn_stats_help',
				key: SETTINGS_KEYS.SHOW_AGENTIC_TURN_STATS,
				label: 'settings.show_agentic_turn_stats',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: true,
				help: 'settings.show_thought_in_progress_help',
				key: SETTINGS_KEYS.SHOW_THOUGHT_IN_PROGRESS,
				label: 'settings.show_thought_in_progress',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: true,
				help: 'settings.show_tool_call_in_progress_help',
				key: SETTINGS_KEYS.SHOW_TOOL_CALL_IN_PROGRESS,
				label: 'settings.show_tool_call_in_progress',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				help: 'settings.always_show_tool_call_content_help',
				key: SETTINGS_KEYS.ALWAYS_SHOW_TOOL_CALL_CONTENT,
				label: 'settings.always_show_tool_call_content',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: true,
				help: 'settings.render_user_content_as_markdown_help',
				key: SETTINGS_KEYS.RENDER_USER_CONTENT_AS_MARKDOWN,
				label: 'settings.render_user_content_as_markdown',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: true,
				help: 'settings.render_thinking_as_markdown_help',
				key: SETTINGS_KEYS.RENDER_THINKING_AS_MARKDOWN,
				label: 'settings.render_thinking_as_markdown',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				help: 'settings.full_height_code_blocks_help',
				key: SETTINGS_KEYS.FULL_HEIGHT_CODE_BLOCKS,
				label: 'settings.full_height_code_blocks',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				help: 'settings.disable_auto_scroll_help',
				key: SETTINGS_KEYS.DISABLE_AUTO_SCROLL,
				label: 'settings.disable_auto_scroll',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				help: 'settings.always_show_sidebar_on_desktop_help',
				key: SETTINGS_KEYS.ALWAYS_SHOW_SIDEBAR_ON_DESKTOP,
				label: 'settings.always_show_sidebar_on_desktop',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: true,
				help: 'settings.conversation_tabs_help',
				key: SETTINGS_KEYS.CONVERSATION_TABS,
				label: 'settings.conversation_tabs',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				help: 'settings.show_raw_model_names_help',
				key: SETTINGS_KEYS.SHOW_RAW_MODEL_NAMES,
				label: 'settings.show_raw_model_names',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: true,
				help: 'settings.show_model_quantization_help',
				key: SETTINGS_KEYS.SHOW_MODEL_QUANTIZATION,
				label: 'settings.show_model_quantization',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: true,
				help: 'settings.show_model_tags_help',
				key: SETTINGS_KEYS.SHOW_MODEL_TAGS,
				label: 'settings.show_model_tags',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				help: 'settings.show_model_capabilities_in_selector_help',
				key: SETTINGS_KEYS.SHOW_MODEL_CAPABILITIES_IN_SELECTOR,
				label: 'settings.show_model_capabilities_in_selector',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: true,
				help: 'settings.show_model_org_name_help',
				key: SETTINGS_KEYS.SHOW_MODEL_ORG_NAME,
				label: 'settings.show_model_org_name',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				help: 'settings.show_build_version_help',
				key: SETTINGS_KEYS.SHOW_BUILD_VERSION,
				label: 'settings.show_build_version',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				help: 'settings.show_full_path_in_mentions_help',
				key: SETTINGS_KEYS.SHOW_FULL_PATH_IN_MENTIONS,
				label: 'settings.show_full_path_in_mentions',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: true,
				help: 'settings.group_models_by_family_help',
				key: SETTINGS_KEYS.GROUP_MODELS_BY_FAMILY,
				label: 'settings.group_models_by_family',
				type: SettingsFieldType.CHECKBOX
			}
		],
		slug: SETTINGS_SECTION_SLUGS.DISPLAY,
		title: SETTINGS_SECTION_TITLES.DISPLAY
	},
	// MCP Servers (non-UI config object)
	{
		icon: PencilRuler,
		settings: [
			{
				defaultValue: '[]',
				help: 'settings.mcp_servers_help',
				key: SETTINGS_KEYS.MCP_SERVERS,
				label: 'settings.mcp_servers',
				standaloneField: false,
				type: SettingsFieldType.INPUT
			}
		],
		slug: SETTINGS_SECTION_SLUGS.TOOLS,
		title: SETTINGS_SECTION_TITLES.TOOLS
	},
	// Tools
	{
		icon: ListRestart,
		settings: [
			{
				defaultValue: DEFAULT_AGENTIC_CONFIG.maxTurns,
				help: 'settings.agentic_max_turns_help',
				isPositiveInteger: true,
				key: SETTINGS_KEYS.AGENTIC_MAX_TURNS,
				label: 'settings.agentic_max_turns',
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: DEFAULT_MCP_CONFIG.requestTimeoutSeconds,
				help: 'settings.mcp_request_timeout_help',
				isPositiveInteger: true,
				key: SETTINGS_KEYS.MCP_REQUEST_TIMEOUT_SECONDS,
				label: 'settings.mcp_request_timeout',
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: FILE_GLOB_SEARCH_PICKERS.DEFAULT_SEARCH_DEPTH,
				help: 'settings.mention_search_depth_help',
				isPositiveInteger: true,
				key: SETTINGS_KEYS.MENTION_SEARCH_MAX_DEPTH,
				label: 'settings.mention_search_depth',
				max: FILE_GLOB_SEARCH_PICKERS.MAX_SEARCH_DEPTH,
				min: 1,
				placeholder: `${FILE_GLOB_SEARCH_PICKERS.DEFAULT_SEARCH_DEPTH}`,
				type: SettingsFieldType.INPUT
			}
		],
		slug: SETTINGS_SECTION_SLUGS.AGENTIC,
		title: SETTINGS_SECTION_TITLES.AGENTIC
	},
	// Import/Export
	{
		icon: Database,
		settings: [],
		slug: SETTINGS_SECTION_SLUGS.IMPORT_EXPORT,
		title: SETTINGS_SECTION_TITLES.IMPORT_EXPORT
	},
	// Sampling
	{
		icon: Funnel,
		settings: [
			{
				defaultValue: undefined,
				help: 'settings.temperature_help',
				key: SETTINGS_KEYS.TEMPERATURE,
				label: 'settings.temperature',
				sync: {
					paramType: SyncableParameterType.NUMBER,
					serverKey: SETTINGS_KEYS.TEMPERATURE
				},
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: undefined,
				help: 'settings.dynatemp_range_help',
				key: SETTINGS_KEYS.DYNATEMP_RANGE,
				label: 'settings.dynatemp_range',
				sync: {
					paramType: SyncableParameterType.NUMBER,
					serverKey: SETTINGS_KEYS.DYNATEMP_RANGE
				},
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: undefined,
				help: 'settings.dynatemp_exponent_help',
				key: SETTINGS_KEYS.DYNATEMP_EXPONENT,
				label: 'settings.dynatemp_exponent',
				sync: {
					paramType: SyncableParameterType.NUMBER,
					serverKey: SETTINGS_KEYS.DYNATEMP_EXPONENT
				},
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: undefined,
				help: 'settings.top_k_help',
				key: SETTINGS_KEYS.TOP_K,
				label: 'settings.top_k',
				sync: { paramType: SyncableParameterType.NUMBER, serverKey: SETTINGS_KEYS.TOP_K },
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: undefined,
				help: 'settings.top_p_help',
				key: SETTINGS_KEYS.TOP_P,
				label: 'settings.top_p',
				sync: { paramType: SyncableParameterType.NUMBER, serverKey: SETTINGS_KEYS.TOP_P },
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: undefined,
				help: 'settings.min_p_help',
				key: SETTINGS_KEYS.MIN_P,
				label: 'settings.min_p',
				sync: { paramType: SyncableParameterType.NUMBER, serverKey: SETTINGS_KEYS.MIN_P },
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: undefined,
				help: 'settings.xtc_probability_help',
				key: SETTINGS_KEYS.XTC_PROBABILITY,
				label: 'settings.xtc_probability',
				sync: {
					paramType: SyncableParameterType.NUMBER,
					serverKey: SETTINGS_KEYS.XTC_PROBABILITY
				},
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: undefined,
				help: 'settings.xtc_threshold_help',
				key: SETTINGS_KEYS.XTC_THRESHOLD,
				label: 'settings.xtc_threshold',
				sync: {
					paramType: SyncableParameterType.NUMBER,
					serverKey: SETTINGS_KEYS.XTC_THRESHOLD
				},
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: undefined,
				help: 'settings.typ_p_help',
				key: SETTINGS_KEYS.TYP_P,
				label: 'settings.typ_p',
				sync: { paramType: SyncableParameterType.NUMBER, serverKey: SETTINGS_KEYS.TYP_P },
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: undefined,
				help: 'settings.max_tokens_help',
				key: SETTINGS_KEYS.MAX_TOKENS,
				label: 'settings.max_tokens',
				sync: {
					paramType: SyncableParameterType.NUMBER,
					serverKey: SETTINGS_KEYS.MAX_TOKENS
				},
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: '',
				help: 'settings.samplers_help',
				key: SETTINGS_KEYS.SAMPLERS,
				label: 'settings.samplers',
				sync: { paramType: SyncableParameterType.STRING, serverKey: SETTINGS_KEYS.SAMPLERS },
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: false,
				help: 'settings.backend_sampling_help',
				key: SETTINGS_KEYS.BACKEND_SAMPLING,
				label: 'settings.backend_sampling',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: undefined,
				help: 'settings.repeat_last_n_help',
				key: SETTINGS_KEYS.REPEAT_LAST_N,
				label: 'settings.repeat_last_n',
				sync: {
					paramType: SyncableParameterType.NUMBER,
					serverKey: SETTINGS_KEYS.REPEAT_LAST_N
				},
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: undefined,
				help: 'settings.repeat_penalty_help',
				key: SETTINGS_KEYS.REPEAT_PENALTY,
				label: 'settings.repeat_penalty',
				sync: {
					paramType: SyncableParameterType.NUMBER,
					serverKey: SETTINGS_KEYS.REPEAT_PENALTY
				},
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: undefined,
				help: 'settings.presence_penalty_help',
				key: SETTINGS_KEYS.PRESENCE_PENALTY,
				label: 'settings.presence_penalty',
				sync: {
					paramType: SyncableParameterType.NUMBER,
					serverKey: SETTINGS_KEYS.PRESENCE_PENALTY
				},
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: undefined,
				help: 'settings.frequency_penalty_help',
				key: SETTINGS_KEYS.FREQUENCY_PENALTY,
				label: 'settings.frequency_penalty',
				sync: {
					paramType: SyncableParameterType.NUMBER,
					serverKey: SETTINGS_KEYS.FREQUENCY_PENALTY
				},
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: undefined,
				help: 'settings.dry_multiplier_help',
				key: SETTINGS_KEYS.DRY_MULTIPLIER,
				label: 'settings.dry_multiplier',
				sync: {
					paramType: SyncableParameterType.NUMBER,
					serverKey: SETTINGS_KEYS.DRY_MULTIPLIER
				},
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: undefined,
				help: 'settings.dry_base_help',
				key: SETTINGS_KEYS.DRY_BASE,
				label: 'settings.dry_base',
				sync: { paramType: SyncableParameterType.NUMBER, serverKey: SETTINGS_KEYS.DRY_BASE },
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: undefined,
				help: 'settings.dry_allowed_length_help',
				key: SETTINGS_KEYS.DRY_ALLOWED_LENGTH,
				label: 'settings.dry_allowed_length',
				sync: {
					paramType: SyncableParameterType.NUMBER,
					serverKey: SETTINGS_KEYS.DRY_ALLOWED_LENGTH
				},
				type: SettingsFieldType.INPUT
			},
			{
				defaultValue: undefined,
				help: 'settings.dry_penalty_last_n_help',
				key: SETTINGS_KEYS.DRY_PENALTY_LAST_N,
				label: 'settings.dry_penalty_last_n',
				sync: {
					paramType: SyncableParameterType.NUMBER,
					serverKey: SETTINGS_KEYS.DRY_PENALTY_LAST_N
				},
				type: SettingsFieldType.INPUT
			}
		],
		slug: SETTINGS_SECTION_SLUGS.SAMPLING_PENALTIES,
		title: SETTINGS_SECTION_TITLES.SAMPLING_PENALTIES
	},
	// Developer
	{
		icon: Code,
		settings: [
			{
				defaultValue: false,
				help: 'settings.pre_encode_conversation_help',
				key: SETTINGS_KEYS.PRE_ENCODE_CONVERSATION,
				label: 'settings.pre_encode_conversation',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				help: 'settings.disable_reasoning_parsing_help',
				key: SETTINGS_KEYS.DISABLE_REASONING_PARSING,
				label: 'settings.disable_reasoning_parsing',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				help: 'settings.exclude_reasoning_from_context_help',
				key: SETTINGS_KEYS.EXCLUDE_REASONING_FROM_CONTEXT,
				label: 'settings.exclude_reasoning_from_context',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				help: 'settings.show_raw_output_switch_help',
				key: SETTINGS_KEYS.SHOW_RAW_OUTPUT_SWITCH,
				label: 'settings.show_raw_output_switch',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				help: 'settings.js_sandbox_enabled_help',
				key: SETTINGS_KEYS.JS_SANDBOX_ENABLED,
				label: 'settings.js_sandbox_enabled',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: false,
				dependsOn: SETTINGS_KEYS.JS_SANDBOX_ENABLED,
				help: 'settings.symbolic_math_enabled_help',
				key: SETTINGS_KEYS.SYMBOLIC_MATH_ENABLED,
				label: 'settings.symbolic_math_enabled',
				type: SettingsFieldType.CHECKBOX
			},
			{
				defaultValue: '',
				help: 'settings.custom_json_help',
				key: SETTINGS_KEYS.CUSTOM_JSON,
				label: 'settings.custom_json',
				type: SettingsFieldType.TEXTAREA
			},
			{
				defaultValue: '',
				help: 'settings.custom_css_help',
				key: SETTINGS_KEYS.CUSTOM_CSS,
				label: 'settings.custom_css',
				type: SettingsFieldType.TEXTAREA
			}
		],
		slug: SETTINGS_SECTION_SLUGS.DEVELOPER,
		title: SETTINGS_SECTION_TITLES.DEVELOPER
	}
];

function getAllSettings(): SettingsEntry[] {
	const result: SettingsEntry[] = [];

	for (const section of SETTINGS_REGISTRY) {
		result.push(...section.settings);
	}

	return result;
}

/** Flat config object stored in localStorage. */
export const SETTING_CONFIG_DEFAULT: Record<string, SettingsConfigValue> = Object.fromEntries(
	getAllSettings().map((s) => [s.key, s.defaultValue])
) as Record<string, SettingsConfigValue>;

/** Help text for every setting (including non-UI). */
export const SETTING_CONFIG_INFO: Record<string, string> = Object.fromEntries(
	getAllSettings().map((s) => [s.key, s.help])
) as Record<string, string>;

/** Sidebar sections + field configs (as consumed by UI). */
function toSettingsSection(section: SettingsSectionEntry): SettingsSection {
	return {
		fields: section.settings
			.filter((s) => s.standaloneField !== false)
			.map((s) => ({
				dependsOn: s.dependsOn,
				help: s.help,
				isExperimental: s.isExperimental,
				isPositiveInteger: s.isPositiveInteger,
				isPrivate: s.isPrivate,
				key: s.key,
				label: s.label,
				max: s.max,
				min: s.min,
				options: s.options as SettingsFieldConfig['options'],
				placeholder: s.placeholder,
				radioOptions: s.radioOptions,
				type: s.type
			})),
		icon: section.icon,
		slug: section.slug,
		title: section.title
	};
}

/** Sidebar sections in custom display order (the registry array order). */
export const SETTINGS_CHAT_SECTIONS: SettingsSection[] = SETTINGS_REGISTRY.map(toSettingsSection);

/** INPUT-type settings whose value is a number. */
export const NUMERIC_FIELDS = getAllSettings()
	.filter((s) => s.type === SettingsFieldType.INPUT && typeof s.defaultValue !== 'string')
	.map((s) => s.key) as readonly string[];

/** Numeric fields clamped to >= 1 and rounded. */
export const POSITIVE_INTEGER_FIELDS = getAllSettings()
	.filter((s) => s.isPositiveInteger)
	.map((s) => s.key) as readonly string[];
