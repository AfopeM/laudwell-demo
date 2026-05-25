import type { Tone, Length, Connector, EngineInput, EngineOutput, PoolKey } from '../types';
import { mapAnswersToPools } from './mapping';
import { openingPool } from '../pools/opening';
import { peoplePool } from '../pools/people';
import { experiencePool } from '../pools/experience';
import { outcomePool } from '../pools/outcome';
import { closingPool } from '../pools/closing';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TONES: Tone[] = ['warm', 'reassuring', 'conversational'];

// Short removed — a 3-part review skips Q2 entirely, wasting the user's
// second answer. Medium and long both include both Q-derived phrases.
const LENGTHS: Length[] = ['medium', 'long'];

const CONNECTORS: Connector[] = ['period', 'and', 'plus', 'onTopOfThat'];

// When the long length needs a third middle component that Q1/Q2 didn't cover,
// fall back to a representative key for that component type.
const TYPE_FALLBACK: Record<'people' | 'experience' | 'outcome', PoolKey> = {
  people: 'people.professional',
  experience: 'experience.smooth',
  outcome: 'outcome.quality',
};

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Pick one item at random from an array. */
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Derive the component type from a pool key prefix.
 */
function getComponentType(poolKey: PoolKey): 'people' | 'experience' | 'outcome' {
  if (poolKey.startsWith('people.')) return 'people';
  if (poolKey.startsWith('experience.')) return 'experience';
  return 'outcome';
}

/**
 * For the long length, find the one component type not represented by either
 * Q-derived pool key and return the fallback key for it.
 *
 * There are exactly 3 types and at most 2 can be occupied by Q1/Q2, so the
 * loop always finds a match — no random fallback needed.
 */
function getThirdPoolKey(q1Pool: PoolKey, q2Pool: PoolKey): PoolKey {
  const q1Type = getComponentType(q1Pool);
  const q2Type = getComponentType(q2Pool);
  const allTypes: Array<'people' | 'experience' | 'outcome'> = ['people', 'experience', 'outcome'];

  for (const type of allTypes) {
    if (type !== q1Type && type !== q2Type) {
      return TYPE_FALLBACK[type];
    }
  }

  // Unreachable: with 3 types and at most 2 occupied, the loop always returns.
  // TypeScript requires an explicit return here.
  return TYPE_FALLBACK['outcome'];
}

/**
 * Look up one random phrase from the correct pool for a given pool key and tone.
 * Throws if the key or tone is missing — a silent empty string is worse than
 * a visible error during development.
 */
function getPhrase(poolKey: PoolKey, tone: Tone): string {
  let toneMap: Record<Tone, string[]> | undefined;

  if (poolKey.startsWith('people.')) {
    toneMap = peoplePool[poolKey];
  } else if (poolKey.startsWith('experience.')) {
    toneMap = experiencePool[poolKey];
  } else if (poolKey.startsWith('outcome.')) {
    toneMap = outcomePool[poolKey];
  }

  if (!toneMap) throw new Error(`Missing pool for key: "${poolKey}"`);
  const phrases = toneMap[tone];
  if (!phrases || phrases.length === 0) throw new Error(`Empty phrase list: "${poolKey}[${tone}]"`);

  return pick(phrases);
}

/**
 * Join an ordered array of phrases using the selected connector style.
 *
 * "period" — phrases separated by a space; each already ends with punctuation.
 * Other connectors — insert a transition word before the closing phrase only.
 *
 * When a connector is used, the closing phrase's first character is lowercased
 * so it reads as a continuation rather than a new sentence. Example:
 *   "...great people. And saved their number." (not "...And Saved their number.")
 */
function joinWithConnector(parts: string[], connector: Connector): string {
  if (parts.length === 0) return '';

  if (connector === 'period') {
    return parts.join(' ');
  }

  const connectorText: Record<Exclude<Connector, 'period'>, string> = {
    and: 'And',
    plus: 'Plus,',
    onTopOfThat: 'On top of that,',
  };

  const body = parts.slice(0, -1).join(' ');
  const closing = parts[parts.length - 1];

  // Lowercase the first character so the closing reads as a continuation,
  // not a new capitalised sentence after the connector word.
  const adjustedClosing = closing.charAt(0).toLowerCase() + closing.slice(1);

  return `${body} ${connectorText[connector]} ${adjustedClosing}`;
}

// ---------------------------------------------------------------------------
// Pool depth guard
// ---------------------------------------------------------------------------

const MIN_DEPTH = 3;

/**
 * Validate that every pool contains at least MIN_DEPTH phrases for every tone.
 * Call this at startup so under-filled pools surface immediately rather than
 * at generation time.
 */
export function validatePoolDepth(): void {
  const tones: Tone[] = ['warm', 'reassuring', 'conversational'];

  for (const tone of tones) {
    const openPhrases = openingPool['default'][tone];
    if (!openPhrases || openPhrases.length < MIN_DEPTH) {
      throw new Error(
        `Pool depth violation: opening.default[${tone}] has ${openPhrases?.length ?? 0} phrases (min ${MIN_DEPTH})`,
      );
    }
    const closePhrases = closingPool['default'][tone];
    if (!closePhrases || closePhrases.length < MIN_DEPTH) {
      throw new Error(
        `Pool depth violation: closing.default[${tone}] has ${closePhrases?.length ?? 0} phrases (min ${MIN_DEPTH})`,
      );
    }
  }

  const middlePools: Array<[string, Record<string, Record<Tone, string[]>>]> = [
    ['people', peoplePool],
    ['experience', experiencePool],
    ['outcome', outcomePool],
  ];

  for (const [poolName, pool] of middlePools) {
    for (const [variantKey, toneMap] of Object.entries(pool)) {
      for (const tone of tones) {
        const phrases = toneMap[tone];
        if (!phrases || phrases.length < MIN_DEPTH) {
          throw new Error(
            `Pool depth violation: ${poolName}["${variantKey}"][${tone}] has ${phrases?.length ?? 0} phrases (min ${MIN_DEPTH})`,
          );
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface EngineOverrides {
  tone?: Tone;
  length?: Length;
  connector?: Connector;
}

/**
 * Build the ordered array of component phrases for a given input and overrides.
 *
 * Exported so tests can assert on component count directly, without parsing
 * the assembled string — which breaks when phrases contain '. ' internally.
 */
export function buildParts(input: EngineInput, overrides: EngineOverrides = {}): string[] {
  const { q1Pool, q2Pool } = mapAnswersToPools(input.q1Answer, input.q2Answer);

  const tone = overrides.tone ?? pick(TONES);
  const length = overrides.length ?? pick(LENGTHS);

  const opening = pick(openingPool['default'][tone]);
  const closing = pick(closingPool['default'][tone]);
  const q1Phrase = getPhrase(q1Pool, tone);
  const q2Phrase = getPhrase(q2Pool, tone);

  if (length === 'medium') {
    return [opening, q1Phrase, q2Phrase, closing];
  }

  // long — add a third middle component from the uncovered pool type
  const thirdPool = getThirdPoolKey(q1Pool, q2Pool);
  const thirdPhrase = getPhrase(thirdPool, tone);
  return [opening, q1Phrase, q2Phrase, thirdPhrase, closing];
}

/**
 * Generate one review string from a Q1/Q2 input pair.
 *
 * Pure function — no side effects, no external calls. Safe to call from any
 * environment including a Node.js test runner with no browser or framework context.
 */
export function generateReview(input: EngineInput, overrides: EngineOverrides = {}): EngineOutput {
  const connector = overrides.connector ?? pick(CONNECTORS);
  return joinWithConnector(buildParts(input, overrides), connector);
}
