import type { Tone, Length, Connector, EngineInput, EngineOutput, PoolKey } from '../types';
import { mapAnswersToPools } from './mapping';
import { openingPool } from '../pools/opening';
import { staffPool } from '../pools/staff';
import { waitTimePool } from '../pools/waitTime';
import { servicePool } from '../pools/service';
import { closingPool } from '../pools/closing';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TONES: Tone[] = ['warm', 'reassuring', 'conversational'];
const LENGTHS: Length[] = ['short', 'medium', 'long'];
const CONNECTORS: Connector[] = ['period', 'also', 'additionally', 'whatsMore'];

// When the long length needs a third middle component that Q1/Q2 didn't cover,
// we fall back to a representative key for that component type.
const TYPE_FALLBACK: Record<'staff' | 'waitTime' | 'service', PoolKey> = {
  staff: 'staff.professional',
  waitTime: 'waitTime.short',
  service: 'service.smooth',
};

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Pick one item at random from an array. */
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Derive the component type (staff / waitTime / service) from a pool key.
 * The prefix before the first dot determines the type.
 */
function getComponentType(poolKey: PoolKey): 'staff' | 'waitTime' | 'service' {
  if (poolKey.startsWith('staff.')) return 'staff';
  if (poolKey.startsWith('waitTime.')) return 'waitTime';
  return 'service';
}

/**
 * For the long length, determine which component type is not yet represented
 * by the two Q-derived pool keys and return a fallback key for it.
 *
 * If Q1 and Q2 are the same type (e.g. both staff), the other two types are
 * both unrepresented — pick one at random.
 */
function getThirdPoolKey(q1Pool: PoolKey, q2Pool: PoolKey): PoolKey {
  const q1Type = getComponentType(q1Pool);
  const q2Type = getComponentType(q2Pool);
  const allTypes: Array<'staff' | 'waitTime' | 'service'> = ['staff', 'waitTime', 'service'];

  for (const type of allTypes) {
    if (type !== q1Type && type !== q2Type) {
      return TYPE_FALLBACK[type];
    }
  }

  // Q1 and Q2 share a type — both other types are uncovered; pick randomly.
  const uncovered = allTypes.filter((t) => t !== q1Type);
  return TYPE_FALLBACK[pick(uncovered)];
}

/**
 * Look up one random phrase from the correct pool for a given pool key and tone.
 * Throws if the key or tone is missing — a silent empty string is worse than
 * a visible error during development.
 */
function getPhrase(poolKey: PoolKey, tone: Tone): string {
  let toneMap: Record<Tone, string[]> | undefined;

  if (poolKey.startsWith('staff.')) {
    toneMap = staffPool[poolKey];
  } else if (poolKey.startsWith('waitTime.')) {
    toneMap = waitTimePool[poolKey];
  } else if (poolKey.startsWith('service.')) {
    toneMap = servicePool[poolKey];
  }

  if (!toneMap) throw new Error(`Missing pool for key: "${poolKey}"`);
  const phrases = toneMap[tone];
  if (!phrases || phrases.length === 0) throw new Error(`Empty phrase list: "${poolKey}[${tone}]"`);

  return pick(phrases);
}

/**
 * Join an ordered array of phrases using the selected connector style.
 * "period" = each phrase separated by a space (phrases already end with a full stop).
 * The other three styles insert a transition word before the closing phrase only.
 */
function joinWithConnector(parts: string[], connector: Connector): string {
  if (parts.length === 0) return '';

  if (connector === 'period') {
    return parts.join(' ');
  }

  const connectorText: Record<Exclude<Connector, 'period'>, string> = {
    also: 'Also,',
    additionally: 'Additionally,',
    whatsMore: "What's more,",
  };

  const body = parts.slice(0, -1).join(' ');
  const closing = parts[parts.length - 1];
  return `${body} ${connectorText[connector]} ${closing}`;
}

// ---------------------------------------------------------------------------
// Pool depth guard
// ---------------------------------------------------------------------------

const MIN_DEPTH = 3;

/**
 * Validate that every pool contains at least MIN_DEPTH phrases for every tone.
 * Call this at startup so under-filled pools are caught immediately rather than
 * surfacing as missing phrases at generation time.
 */
export function validatePoolDepth(): void {
  const tones: Tone[] = ['warm', 'reassuring', 'conversational'];

  // Bookend pools (keyed by 'default')
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

  // Middle pools (keyed by pool key string)
  const middlePools: Array<[string, Record<string, Record<Tone, string[]>>]> = [
    ['staff', staffPool],
    ['waitTime', waitTimePool],
    ['service', servicePool],
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

/**
 * Optional overrides used in tests to pin tone, length, and connector to
 * specific values without mocking Math.random globally.
 */
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

  if (length === 'short') {
    return [opening, q1Phrase, closing];
  }

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
